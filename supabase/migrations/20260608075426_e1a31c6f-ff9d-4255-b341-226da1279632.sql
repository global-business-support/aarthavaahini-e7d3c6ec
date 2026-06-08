DROP POLICY IF EXISTS "Admin reads all roles" ON public.user_roles;

ALTER FUNCTION public.has_role(uuid, public.app_role) SECURITY INVOKER;
ALTER FUNCTION public.is_staff(uuid) SECURITY INVOKER;