create extension if not exists "pgcrypto";

create table source_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publisher text not null,
  url text not null unique,
  source_type text not null,
  source_tier text not null check (source_tier in ('tier_1', 'tier_2', 'tier_3')),
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table source_snapshots (
  id uuid primary key default gen_random_uuid(),
  source_document_id uuid not null references source_documents(id) on delete cascade,
  content_hash text not null,
  captured_at timestamptz not null default now(),
  storage_path text,
  raw_text text,
  unique (source_document_id, content_hash)
);

create table source_excerpts (
  id uuid primary key default gen_random_uuid(),
  source_snapshot_id uuid not null references source_snapshots(id) on delete cascade,
  excerpt_text text not null,
  start_offset integer,
  end_offset integer,
  page_label text,
  created_at timestamptz not null default now()
);

create table parties (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  website_url text,
  created_at timestamptz not null default now()
);

create table policy_areas (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table policy_positions (
  id uuid primary key default gen_random_uuid(),
  party_id uuid not null references parties(id) on delete cascade,
  policy_area_id uuid not null references policy_areas(id) on delete cascade,
  summary text not null,
  coverage_state text not null check (coverage_state in ('strong', 'partial', 'none')),
  last_checked_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (party_id, policy_area_id)
);

create table policy_position_sources (
  policy_position_id uuid not null references policy_positions(id) on delete cascade,
  source_excerpt_id uuid not null references source_excerpts(id) on delete restrict,
  primary key (policy_position_id, source_excerpt_id)
);

create table display_facts (
  id uuid primary key default gen_random_uuid(),
  subject_type text not null,
  subject_id uuid not null,
  summary_text text not null,
  coverage_state text not null check (coverage_state in ('strong', 'partial', 'none')),
  last_checked_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table display_fact_sources (
  display_fact_id uuid not null references display_facts(id) on delete cascade,
  source_excerpt_id uuid not null references source_excerpts(id) on delete restrict,
  primary key (display_fact_id, source_excerpt_id)
);

create table pollsters (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  website_url text,
  created_at timestamptz not null default now()
);

create table polls (
  id uuid primary key default gen_random_uuid(),
  pollster_id uuid not null references pollsters(id) on delete restrict,
  client text,
  fieldwork_start date not null,
  fieldwork_end date not null,
  published_at date,
  sample_size integer,
  population text,
  method text,
  geography text,
  question_wording text,
  full_tables_url text,
  source_document_id uuid references source_documents(id) on delete set null,
  retrieved_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table poll_results (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  party_id uuid not null references parties(id) on delete cascade,
  vote_share numeric(5, 2) not null check (vote_share >= 0 and vote_share <= 100),
  created_at timestamptz not null default now(),
  unique (poll_id, party_id)
);

create table ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  status text not null check (status in ('started', 'succeeded', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  records_seen integer not null default 0,
  records_changed integer not null default 0,
  error_message text
);

create index source_documents_source_tier_idx on source_documents(source_tier);
create index source_snapshots_document_idx on source_snapshots(source_document_id);
create index source_excerpts_snapshot_idx on source_excerpts(source_snapshot_id);
create index policy_positions_party_idx on policy_positions(party_id);
create index policy_positions_area_idx on policy_positions(policy_area_id);
create index polls_fieldwork_end_idx on polls(fieldwork_end desc);
