CREATE TABLE public.compliance_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text,
  role text,
  email text NOT NULL,
  phone text,
  building_count int NOT NULL,
  addresses text NOT NULL,
  square_footage text,
  tenants_pay_utilities text,
  filed_before text,
  dbids text,
  notes text,
  consent boolean NOT NULL DEFAULT false,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
GRANT INSERT ON public.compliance_checks TO anon, authenticated;
GRANT ALL ON public.compliance_checks TO service_role;
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a compliance check" ON public.compliance_checks FOR INSERT TO anon, authenticated
WITH CHECK (consent = true AND length(name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255 AND building_count BETWEEN 1 AND 10000 AND length(addresses) BETWEEN 1 AND 5000 AND coalesce(length(notes),0) <= 5000);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a contact message" ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (length(name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255 AND length(message) BETWEEN 1 AND 5000);