
-- Grant Data API access (RLS still applies)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT SELECT, INSERT ON public.leads TO anon; -- public website submits leads
GRANT ALL ON public.leads TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.loan_cases TO authenticated;
GRANT ALL ON public.loan_cases TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.insurance_cases TO authenticated;
GRANT ALL ON public.insurance_cases TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.mutual_funds TO authenticated;
GRANT ALL ON public.mutual_funds TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.activities TO authenticated;
GRANT ALL ON public.activities TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
