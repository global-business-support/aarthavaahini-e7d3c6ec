## Goal
End-to-end loan workflow (Lead → Customer → Loan) with CIBIL & approval, plus website cleanup (remove Banking, updated contact details, EMI calculator tenure UI fix, Apply Now loan type + sub-type).

## 1. Database migration
Add the missing fields needed for the workflow:
- `leads`: `cibil_score INT`, `loan_type TEXT`, `loan_sub_type TEXT`, `loan_amount NUMERIC`
- `customers`: `loan_type TEXT`, `loan_sub_type TEXT`, `loan_amount NUMERIC`, `cibil_score INT`, `stage TEXT DEFAULT 'New'`

Existing `loan_cases` table already supports the final loan stage.

## 2. CRM — Leads page (`src/routes/crm.leads.tsx`)
- Add **CIBIL Score** input on the New Lead form + column in table (color-coded: <650 red, 650-749 amber, ≥750 green).
- Add **Loan Type** + **Sub-Loan Type** dropdowns on lead form (sub-type list from `src/data/products.ts` loans).
- Table shows: Name, Mobile, Loan Type (sub), Loan Amount, CIBIL.
- Replace stage select with **Approve / Reject** action buttons:
  - **Approve** → mark `status='Approved'` and auto-insert into `customers` (with loan_type, loan_amount, cibil_score).
  - **Reject** → `status='Rejected'`.

## 3. CRM — Customers page (`src/routes/crm.customers.tsx`)
- Table shows: Name, Mobile, Loan Type, Loan Amount, CIBIL, **Stage** dropdown (Docs → Login → Sanction → Disbursement → Closed).
- On **Closed** → auto-insert into `loan_cases` (customer_id, loan_type, loan_amount, stage='Disbursement').

## 4. Website cleanup
- Remove `/banking` route + every "Banking" mention from Header, Products (`Products.tsx`), Footer, LeadForm, ProductPage, etc.
- Remove `banking` from PRODUCT_TYPES.

## 5. Contact details update
Update across **Footer**, **Contact page**, **Header** (and anywhere else):
- Phone: **+91 98276 79993**
- Email: **care@aarthvaahini.com**
- Address: **2nd Floor, Shrinath Tower, Opposite C3 Hospital, Behind C21 Mall, Vijay Nagar, Indore, MP 452010**

## 6. EMI Calculator (`src/components/site/EmiCalculator.tsx`)
- **Remove the Tenure slider** from the front (default 20 yr internal). EMI math stays.
- Keep "Tenure" calculation mode (so user can still calculate tenure) but standard EMI engine won't expose tenure input.
- Verify EMI formula (already correct PMT formula).

## 7. Home "Apply Now" form (`src/components/site/LeadForm.tsx`)
- Add **Loan Type** dropdown (Home / Personal / Business / Car / Education / LAP / Project / Credit Card / Gold) — only when productType is `loan` and no productName fixed.
- Add **Sub-Loan Type** (free text or specific variants).
- Persist into `loan_type` and `loan_sub_type` columns.

## 8. Technical notes
- All DB writes go through existing `supabase` client; RLS already permits staff/admin.
- Will run migration first (one tool call), then edit code.
- Types file `src/integrations/supabase/types.ts` regenerates after migration, so code changes follow.

This is large but mechanical. Approve and I'll start with the migration, then edits in parallel batches.