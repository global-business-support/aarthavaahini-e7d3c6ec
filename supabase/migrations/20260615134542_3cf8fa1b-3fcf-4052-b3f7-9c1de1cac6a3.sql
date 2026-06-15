ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS bank_name text;
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS bank_name text;
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS note text;