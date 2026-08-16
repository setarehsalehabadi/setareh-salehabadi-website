begin;

-- =========================================================
-- Growth AI — Phase 3
-- RLS & Tenant Isolation Tests
-- =========================================================

create extension if not exists pgtap
with schema extensions;

select plan(14);


-- =========================================================
-- TEST FIXTURES
--
-- These rows are created before switching to the
-- authenticated role so we can prepare two isolated tenants.
-- Everything is rolled back at the end of the test.
-- =========================================================

insert into auth.users (
  id,
  email
)
values
(
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  'growth-ai-user-a@test.local'
),
(
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
  'growth-ai-user-b@test.local'
);


insert into public.organizations (
  id,
  name,
  created_by
)
values
(
  '11111111-1111-4111-8111-111111111111',
  'Organization A',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'
),
(
  '22222222-2222-4222-8222-222222222222',
  'Organization B',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2'
);


insert into public.organization_members (
  organization_id,
  user_id,
  role
)
values
(
  '11111111-1111-4111-8111-111111111111',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  'owner'
),
(
  '22222222-2222-4222-8222-222222222222',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
  'owner'
);


insert into public.businesses (
  id,
  organization_id,
  name,
  website_url,
  created_by
)
values
(
  'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa',
  '11111111-1111-4111-8111-111111111111',
  'Business A',
  'https://business-a.example',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'
),
(
  'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb',
  '22222222-2222-4222-8222-222222222222',
  'Business B',
  'https://business-b.example',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2'
);


-- =========================================================
-- TEST 1
-- RLS must be enabled on every Growth AI tenant table.
-- =========================================================

select results_eq(
  $$
    select count(*)::bigint
    from pg_class as table_info
    join pg_namespace as namespace
      on namespace.oid = table_info.relnamespace
    where
      namespace.nspname = 'public'
      and table_info.relname in (
        'organizations',
        'organization_members',
        'businesses'
      )
      and table_info.relrowsecurity = true
  $$,
  array[3::bigint],
  'RLS is enabled on all Growth AI tenant tables'
);


-- =========================================================
-- AUTHENTICATE AS USER A
-- =========================================================

set local role authenticated;

set local request.jwt.claim.sub =
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';


-- =========================================================
-- TEST 2
-- User A can only see Organization A.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.organizations
  $$,
  array[1::bigint],
  'User A can only see their own organization'
);


-- =========================================================
-- TEST 3
-- User A can only see memberships in Organization A.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.organization_members
  $$,
  array[1::bigint],
  'User A can only see memberships in their organization'
);


-- =========================================================
-- TEST 4
-- User A can only see Business A.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.businesses
  $$,
  array[1::bigint],
  'User A can only see businesses in their organization'
);


-- =========================================================
-- TEST 5
-- Owner A can update their own business.
-- =========================================================

select lives_ok(
  $$
    update public.businesses
    set name = 'Business A Updated'
    where id =
      'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa'
  $$,
  'Organization owner can update their own business'
);


-- =========================================================
-- TEST 6
-- Verify User A business was actually updated.
-- =========================================================

select results_eq(
  $$
    select name
    from public.businesses
    where id =
      'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa'
  $$,
  array['Business A Updated'::text],
  'User A business update is persisted'
);


-- =========================================================
-- TEST 7
-- User A attempts to update Business B.
--
-- RLS should silently filter the foreign row,
-- resulting in no cross-tenant modification.
-- =========================================================

select lives_ok(
  $$
    update public.businesses
    set name = 'Compromised Business'
    where id =
      'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb'
  $$,
  'Cross-tenant update attempt does not modify inaccessible rows'
);


-- =========================================================
-- AUTHENTICATE AS USER B
-- =========================================================

set local request.jwt.claim.sub =
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2';


-- =========================================================
-- TEST 8
-- Verify Business B was not changed by User A.
-- =========================================================

select results_eq(
  $$
    select name
    from public.businesses
    where id =
      'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb'
  $$,
  array['Business B'::text],
  'User A cannot modify User B business'
);


-- =========================================================
-- AUTHENTICATE AS USER A AGAIN
-- =========================================================

set local request.jwt.claim.sub =
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';


-- =========================================================
-- TEST 9
-- User A attempts to delete Business B.
-- =========================================================

select lives_ok(
  $$
    delete from public.businesses
    where id =
      'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb'
  $$,
  'Cross-tenant delete attempt cannot access the foreign row'
);


-- =========================================================
-- AUTHENTICATE AS USER B
-- =========================================================

set local request.jwt.claim.sub =
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2';


-- =========================================================
-- TEST 10
-- Verify Business B still exists.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.businesses
    where id =
      'bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb'
  $$,
  array[1::bigint],
  'User A cannot delete User B business'
);


-- =========================================================
-- AUTHENTICATE AS USER A
-- =========================================================

set local request.jwt.claim.sub =
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1';


-- =========================================================
-- TEST 11
-- User A must not be able to create a business
-- inside Organization B.
-- =========================================================

select throws_ok(
  $$
    insert into public.businesses (
      organization_id,
      name,
      created_by
    )
    values (
      '22222222-2222-4222-8222-222222222222',
      'Unauthorized Business',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'
    )
  $$,
  '42501',
  'new row violates row-level security policy for table "businesses"',
  'User A cannot create a business inside User B organization'
);


-- =========================================================
-- TEST 12
-- create_organization() must work for an authenticated user.
-- =========================================================

select lives_ok(
  $$
    select public.create_organization(
      'RPC Organization A'
    )
  $$,
  'Authenticated user can create an organization atomically'
);


-- =========================================================
-- TEST 13
-- Newly-created organization must be visible to its owner.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.organizations
    where name = 'RPC Organization A'
  $$,
  array[1::bigint],
  'Created organization is visible to its owner'
);


-- =========================================================
-- TEST 14
-- create_organization() must also create the initial
-- owner membership in the same transaction.
-- =========================================================

select results_eq(
  $$
    select count(*)
    from public.organization_members as membership
    join public.organizations as organization
      on organization.id =
        membership.organization_id
    where
      organization.name =
        'RPC Organization A'
      and membership.user_id =
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'
      and membership.role =
        'owner'
  $$,
  array[1::bigint],
  'create_organization creates the initial owner membership'
);


select * from finish();

rollback;