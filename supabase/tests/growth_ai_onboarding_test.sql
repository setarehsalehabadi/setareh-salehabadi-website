begin;

create extension if not exists pgtap
with schema extensions;

select plan(11);


-- =========================================================
-- TEST USERS
-- =========================================================

insert into auth.users (
  id,
  email
)
values
(
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
  'growth-ai-onboarding-c@example.com'
),
(
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd1',
  'growth-ai-onboarding-d@example.com'
),
(
  'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1',
  'growth-ai-onboarding-e@example.com'
);


-- =========================================================
-- TEST-ONLY FAILURE TRIGGER
-- =========================================================
--
-- This trigger deliberately fails one specific business
-- insert so we can verify that organization + membership
-- are rolled back when business creation fails.
--
-- Everything in this test is rolled back at the end.
-- =========================================================

create or replace function public.__growth_ai_test_force_business_failure()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.name = '__FORCE_ROLLBACK__' then
    raise exception
      'Forced business creation failure';
  end if;

  return new;
end;
$$;


create trigger growth_ai_test_force_business_failure
before insert on public.businesses
for each row
execute function public.__growth_ai_test_force_business_failure();


-- =========================================================
-- USER C
-- SUCCESSFUL INITIAL ONBOARDING
-- =========================================================

set local role authenticated;

select set_config(
  'request.jwt.claim.sub',
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
  true
);

select set_config(
  'request.jwt.claims',
  '{"sub":"cccccccc-cccc-4ccc-8ccc-ccccccccccc1","role":"authenticated"}',
  true
);


-- TEST 1
-- Complete onboarding succeeds.

select lives_ok(
  $$
    select *
    from public.create_growth_ai_workspace(
      '  Acme Organization  ',
      '  Acme Growth  ',
      '  https://example.com  '
    )
  $$,
  'authenticated user can create the initial Growth AI workspace'
);


-- =========================================================
-- VERIFY CREATED DATA AS DATABASE OWNER
-- =========================================================

reset role;


-- TEST 2
-- Organization is created and normalized.

select results_eq(
  $$
    select count(*)
    from public.organizations
    where created_by =
      'cccccccc-cccc-4ccc-8ccc-ccccccccccc1'
    and name =
      'Acme Organization'
  $$,
  array[1::bigint],
  'workspace onboarding creates one normalized organization'
);


-- TEST 3
-- Owner membership is created.

select results_eq(
  $$
    select count(*)
    from public.organization_members
    where user_id =
      'cccccccc-cccc-4ccc-8ccc-ccccccccccc1'
    and role =
      'owner'
  $$,
  array[1::bigint],
  'workspace onboarding creates the initial owner membership'
);


-- TEST 4
-- Business is created and normalized.

select results_eq(
  $$
    select count(*)
    from public.businesses
    where created_by =
      'cccccccc-cccc-4ccc-8ccc-ccccccccccc1'
    and name =
      'Acme Growth'
    and website_url =
      'https://example.com'
  $$,
  array[1::bigint],
  'workspace onboarding creates one normalized business'
);


-- =========================================================
-- USER C
-- DUPLICATE ONBOARDING MUST FAIL
-- =========================================================

set local role authenticated;

select set_config(
  'request.jwt.claim.sub',
  'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
  true
);

select set_config(
  'request.jwt.claims',
  '{"sub":"cccccccc-cccc-4ccc-8ccc-ccccccccccc1","role":"authenticated"}',
  true
);


-- TEST 5
-- Same user cannot create another initial workspace.

select throws_ok(
  $$
    select *
    from public.create_growth_ai_workspace(
      'Second Organization',
      'Second Business',
      'https://second.example.com'
    )
  $$,
  'P0001',
  'Growth AI workspace already exists',
  'duplicate initial onboarding is rejected'
);


reset role;


-- TEST 6
-- Duplicate attempt did not create another business.

select results_eq(
  $$
    select count(*)
    from public.businesses
    where created_by =
      'cccccccc-cccc-4ccc-8ccc-ccccccccccc1'
  $$,
  array[1::bigint],
  'duplicate onboarding does not create additional business records'
);


-- =========================================================
-- USER D
-- INVALID WEBSITE URL
-- =========================================================

set local role authenticated;

select set_config(
  'request.jwt.claim.sub',
  'dddddddd-dddd-4ddd-8ddd-ddddddddddd1',
  true
);

select set_config(
  'request.jwt.claims',
  '{"sub":"dddddddd-dddd-4ddd-8ddd-ddddddddddd1","role":"authenticated"}',
  true
);


-- TEST 7
-- Invalid URL is rejected.

select throws_ok(
  $$
    select *
    from public.create_growth_ai_workspace(
      'Invalid URL Organization',
      'Invalid URL Business',
      'ftp://example.com'
    )
  $$,
  'P0001',
  'Website URL must use HTTP or HTTPS',
  'workspace onboarding rejects non-HTTP website URLs'
);


reset role;


-- TEST 8
-- Validation failure leaves no workspace data.

select results_eq(
  $$
    select
      (
        (
          select count(*)
          from public.organizations
          where created_by =
            'dddddddd-dddd-4ddd-8ddd-ddddddddddd1'
        )
        +
        (
          select count(*)
          from public.organization_members
          where user_id =
            'dddddddd-dddd-4ddd-8ddd-ddddddddddd1'
        )
        +
        (
          select count(*)
          from public.businesses
          where created_by =
            'dddddddd-dddd-4ddd-8ddd-ddddddddddd1'
        )
      )::bigint
  $$,
  array[0::bigint],
  'invalid website validation leaves no partial workspace data'
);


-- =========================================================
-- USER E
-- FORCED FAILURE AFTER ORGANIZATION CREATION
-- =========================================================

set local role authenticated;

select set_config(
  'request.jwt.claim.sub',
  'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1',
  true
);

select set_config(
  'request.jwt.claims',
  '{"sub":"eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1","role":"authenticated"}',
  true
);


-- TEST 9
-- Business creation fails after organization creation begins.

select throws_ok(
  $$
    select *
    from public.create_growth_ai_workspace(
      'Rollback Organization',
      '__FORCE_ROLLBACK__',
      'https://rollback.example.com'
    )
  $$,
  'P0001',
  'Forced business creation failure',
  'business failure aborts workspace onboarding'
);


reset role;


-- TEST 10
-- Organization created earlier in the function was rolled back.

select results_eq(
  $$
    select count(*)
    from public.organizations
    where created_by =
      'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1'
  $$,
  array[0::bigint],
  'business failure rolls back organization creation'
);


-- TEST 11
-- Membership and business are also absent.

select results_eq(
  $$
    select
      (
        (
          select count(*)
          from public.organization_members
          where user_id =
            'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1'
        )
        +
        (
          select count(*)
          from public.businesses
          where created_by =
            'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeee1'
        )
      )::bigint
  $$,
  array[0::bigint],
  'business failure leaves no owner membership or business'
);


-- =========================================================
-- FINISH
-- =========================================================

select * from finish();

rollback;