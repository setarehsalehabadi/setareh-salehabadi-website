-- Growth AI — Phase 3
-- Organization & Business Foundation
--
-- Scope:
-- 1. organizations
-- 2. organization_members
-- 3. businesses
-- 4. tenant-aware RLS policies
-- 5. atomic organization creation helper
--
-- Out of scope:
-- projects
-- onboarding
-- analyses
-- findings
-- recommendations
-- integrations
-- AI processing


-- =========================================================
-- PRIVATE SCHEMA
-- =========================================================

create schema if not exists private;

revoke all on schema private from public;


-- =========================================================
-- ORGANIZATIONS
-- =========================================================

create table public.organizations (
  id uuid primary key default gen_random_uuid(),

  name text not null
    check (
      char_length(btrim(name)) between 1 and 120
    ),

  created_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz not null
    default now(),

  updated_at timestamptz not null
    default now()
);


-- =========================================================
-- ORGANIZATION MEMBERS
-- =========================================================

create table public.organization_members (
  organization_id uuid not null
    references public.organizations(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  role text not null
    check (
      role in (
        'owner',
        'admin',
        'member'
      )
    ),

  created_at timestamptz not null
    default now(),

  primary key (
    organization_id,
    user_id
  )
);


-- Only one owner is allowed per organization.
create unique index organization_members_one_owner_idx
  on public.organization_members (
    organization_id
  )
  where role = 'owner';


-- Helpful for looking up all organizations for a user.
create index organization_members_user_id_idx
  on public.organization_members (
    user_id
  );


-- =========================================================
-- BUSINESSES
-- =========================================================

create table public.businesses (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references public.organizations(id)
    on delete cascade,

  name text not null
    check (
      char_length(btrim(name)) between 1 and 160
    ),

  website_url text,

  created_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz not null
    default now(),

  updated_at timestamptz not null
    default now()
);


create index businesses_organization_id_idx
  on public.businesses (
    organization_id
  );


-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


create trigger organizations_set_updated_at
before update on public.organizations
for each row
execute function private.set_updated_at();


create trigger businesses_set_updated_at
before update on public.businesses
for each row
execute function private.set_updated_at();


-- =========================================================
-- RLS HELPER FUNCTIONS
-- =========================================================
--
-- These functions intentionally live outside the public
-- API-exposed schema.
--
-- SECURITY DEFINER is used so policies can inspect the
-- membership table without triggering recursive RLS checks.
-- =========================================================


create or replace function private.is_org_member(
  target_organization_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members as membership
    where
      membership.organization_id =
        target_organization_id
      and membership.user_id =
        (select auth.uid())
  );
$$;


create or replace function private.is_org_admin(
  target_organization_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members as membership
    where
      membership.organization_id =
        target_organization_id
      and membership.user_id =
        (select auth.uid())
      and membership.role in (
        'owner',
        'admin'
      )
  );
$$;


create or replace function private.is_org_owner(
  target_organization_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members as membership
    where
      membership.organization_id =
        target_organization_id
      and membership.user_id =
        (select auth.uid())
      and membership.role = 'owner'
  );
$$;


create or replace function private.can_bootstrap_organization(
  target_organization_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    exists (
      select 1
      from public.organizations as organization
      where
        organization.id =
          target_organization_id
        and organization.created_by =
          (select auth.uid())
    )
    and not exists (
      select 1
      from public.organization_members as membership
      where
        membership.organization_id =
          target_organization_id
    );
$$;


-- Do not expose helper functions generally.
revoke all
  on function private.is_org_member(uuid)
  from public;

revoke all
  on function private.is_org_admin(uuid)
  from public;

revoke all
  on function private.is_org_owner(uuid)
  from public;

revoke all
  on function private.can_bootstrap_organization(uuid)
  from public;


grant usage
  on schema private
  to authenticated;

grant execute
  on function private.is_org_member(uuid)
  to authenticated;

grant execute
  on function private.is_org_admin(uuid)
  to authenticated;

grant execute
  on function private.is_org_owner(uuid)
  to authenticated;

grant execute
  on function private.can_bootstrap_organization(uuid)
  to authenticated;


-- =========================================================
-- ENABLE ROW LEVEL SECURITY
-- =========================================================

alter table public.organizations
  enable row level security;

alter table public.organization_members
  enable row level security;

alter table public.businesses
  enable row level security;


-- =========================================================
-- ORGANIZATION POLICIES
-- =========================================================


create policy "organization members can view organization"
on public.organizations
for select
to authenticated
using (
  (select private.is_org_member(id))
);


create policy "authenticated users can create organizations"
on public.organizations
for insert
to authenticated
with check (
  (select auth.uid()) is not null
  and created_by =
    (select auth.uid())
);


create policy "organization admins can update organization"
on public.organizations
for update
to authenticated
using (
  (select private.is_org_admin(id))
)
with check (
  (select private.is_org_admin(id))
);


create policy "organization owners can delete organization"
on public.organizations
for delete
to authenticated
using (
  (select private.is_org_owner(id))
);


-- =========================================================
-- ORGANIZATION MEMBER POLICIES
-- =========================================================


create policy "organization members can view memberships"
on public.organization_members
for select
to authenticated
using (
  (select private.is_org_member(organization_id))
);


create policy "organization membership can be created safely"
on public.organization_members
for insert
to authenticated
with check (
  (
    user_id =
      (select auth.uid())
    and role = 'owner'
    and (
      select private.can_bootstrap_organization(
        organization_id
      )
    )
  )
  or
  (
    (
      select private.is_org_admin(
        organization_id
      )
    )
    and role in (
      'admin',
      'member'
    )
  )
);


create policy "organization owners can update non-owner memberships"
on public.organization_members
for update
to authenticated
using (
  (select private.is_org_owner(organization_id))
  and role <> 'owner'
)
with check (
  (select private.is_org_owner(organization_id))
  and role in (
    'admin',
    'member'
  )
);


create policy "organization owners can delete non-owner memberships"
on public.organization_members
for delete
to authenticated
using (
  (select private.is_org_owner(organization_id))
  and role <> 'owner'
);


-- =========================================================
-- BUSINESS POLICIES
-- =========================================================


create policy "organization members can view businesses"
on public.businesses
for select
to authenticated
using (
  (
    select private.is_org_member(
      organization_id
    )
  )
);


create policy "organization admins can create businesses"
on public.businesses
for insert
to authenticated
with check (
  (
    select private.is_org_admin(
      organization_id
    )
  )
  and created_by =
    (select auth.uid())
);


create policy "organization admins can update businesses"
on public.businesses
for update
to authenticated
using (
  (
    select private.is_org_admin(
      organization_id
    )
  )
)
with check (
  (
    select private.is_org_admin(
      organization_id
    )
  )
);


create policy "organization admins can delete businesses"
on public.businesses
for delete
to authenticated
using (
  (
    select private.is_org_admin(
      organization_id
    )
  )
);


-- =========================================================
-- API PRIVILEGES
-- =========================================================
--
-- Anonymous users must never access Growth AI tenant data.
-- RLS still remains the primary row-level authorization
-- boundary for authenticated users.
-- =========================================================


revoke all
  on public.organizations
  from anon;

revoke all
  on public.organization_members
  from anon;

revoke all
  on public.businesses
  from anon;


grant select, insert, delete
  on public.organizations
  to authenticated;

grant update (name)
  on public.organizations
  to authenticated;


grant select, insert, delete
  on public.organization_members
  to authenticated;

grant update (role)
  on public.organization_members
  to authenticated;


grant select, insert, delete
  on public.businesses
  to authenticated;

grant update (
  name,
  website_url
)
  on public.businesses
  to authenticated;


-- =========================================================
-- ATOMIC ORGANIZATION CREATION RPC
-- =========================================================
--
-- The application should use this function rather than
-- manually performing two unrelated requests.
--
-- It creates:
--
-- Organization
--       +
-- Initial owner membership
--
-- in one PostgreSQL transaction.
-- =========================================================


create or replace function public.create_organization(
  organization_name text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_organization_id uuid :=
    gen_random_uuid();

  current_user_id uuid :=
    auth.uid();

  normalized_name text :=
    btrim(organization_name);
begin
  if current_user_id is null then
    raise exception
      'Authentication required';
  end if;

  if normalized_name is null
    or char_length(normalized_name) < 1
    or char_length(normalized_name) > 120
  then
    raise exception
      'Organization name must contain between 1 and 120 characters';
  end if;

  insert into public.organizations (
    id,
    name,
    created_by
  )
  values (
    new_organization_id,
    normalized_name,
    current_user_id
  );

  insert into public.organization_members (
    organization_id,
    user_id,
    role
  )
  values (
    new_organization_id,
    current_user_id,
    'owner'
  );

  return new_organization_id;
end;
$$;


revoke all
  on function public.create_organization(text)
  from public;

revoke all
  on function public.create_organization(text)
  from anon;

grant execute
  on function public.create_organization(text)
  to authenticated;