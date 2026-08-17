-- =========================================================
-- GROWTH AI WORKSPACE ONBOARDING
-- =========================================================
--
-- Creates the initial Growth AI workspace atomically:
--
-- Organization
--       +
-- Initial owner membership
--       +
-- Business
--
-- This function is intended for the first Growth AI onboarding.
-- It runs with SECURITY INVOKER so the authenticated user's
-- existing RLS permissions remain in effect.
-- =========================================================


create or replace function public.create_growth_ai_workspace(
  organization_name text,
  business_name text,
  business_website_url text
)
returns table (
  organization_id uuid,
  business_id uuid
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_user_id uuid :=
    auth.uid();

  normalized_business_name text :=
    btrim(business_name);

  normalized_website_url text :=
    btrim(business_website_url);

  new_organization_id uuid;

  new_business_id uuid :=
    gen_random_uuid();

begin

  -- -------------------------------------------------------
  -- Authentication
  -- -------------------------------------------------------

  if current_user_id is null then
    raise exception
      'Authentication required';
  end if;


  -- -------------------------------------------------------
  -- Serialize onboarding attempts for the same user
  --
  -- Prevents two simultaneous requests from creating
  -- multiple initial Growth AI workspaces for one user.
  -- The lock is released automatically when the transaction
  -- completes or rolls back.
  -- -------------------------------------------------------

  perform pg_catalog.pg_advisory_xact_lock(
    20260817,
    pg_catalog.hashtext(
      current_user_id::text
    )
  );


  -- -------------------------------------------------------
  -- Prevent duplicate initial onboarding
  -- -------------------------------------------------------

  if exists (
    select 1
    from public.organization_members as membership
    where membership.user_id = current_user_id
  ) then
    raise exception
      'Growth AI workspace already exists';
  end if;


  -- -------------------------------------------------------
  -- Business name validation
  -- -------------------------------------------------------

  if normalized_business_name is null
    or char_length(normalized_business_name) < 1
    or char_length(normalized_business_name) > 160
  then
    raise exception
      'Business name must contain between 1 and 160 characters';
  end if;


  -- -------------------------------------------------------
  -- Website URL validation
  -- -------------------------------------------------------

  if normalized_website_url is null
    or char_length(normalized_website_url) < 1
  then
    raise exception
      'Website URL is required';
  end if;

  if char_length(normalized_website_url) > 2048 then
    raise exception
      'Website URL is too long';
  end if;

  if normalized_website_url !~* '^https?://[^[:space:]]+$' then
    raise exception
      'Website URL must use HTTP or HTTPS';
  end if;


  -- -------------------------------------------------------
  -- Create organization + initial owner membership
  --
  -- create_organization() performs both operations
  -- atomically under the authenticated user's RLS context.
  -- -------------------------------------------------------

  new_organization_id :=
    public.create_organization(
      organization_name
    );


  -- -------------------------------------------------------
  -- Create initial business
  -- -------------------------------------------------------

  insert into public.businesses (
    id,
    organization_id,
    name,
    website_url,
    created_by
  )
  values (
    new_business_id,
    new_organization_id,
    normalized_business_name,
    normalized_website_url,
    current_user_id
  );


  -- -------------------------------------------------------
  -- Return created resource IDs
  -- -------------------------------------------------------

  return query
  select
    new_organization_id,
    new_business_id;

end;
$$;


-- =========================================================
-- FUNCTION PERMISSIONS
-- =========================================================

revoke all
  on function public.create_growth_ai_workspace(
    text,
    text,
    text
  )
  from public;


revoke all
  on function public.create_growth_ai_workspace(
    text,
    text,
    text
  )
  from anon;


grant execute
  on function public.create_growth_ai_workspace(
    text,
    text,
    text
  )
  to authenticated;