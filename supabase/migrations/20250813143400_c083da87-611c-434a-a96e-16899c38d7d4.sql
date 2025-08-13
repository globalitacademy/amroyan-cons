-- Update document categories to match new categorization
ALTER TABLE documents ALTER COLUMN category TYPE text;

DROP TYPE IF EXISTS document_category_enum CASCADE;

-- Create new enum with updated categories
CREATE TYPE document_category_enum AS ENUM (
  'standards',                    -- ՀՀՄՍ / ՖՀՄՍ
  'pek_notifications',           -- ՊԵԿ իրազեկումներ
  'discussions',                 -- Քննարկումներ
  'clarifications_tax',          -- Պաշտոնական պարզաբանումներ › Հարկային օրենսդրություն
  'clarifications_labor',        -- Պաշտոնական պարզաբանումներ › Աշխատանքային օրենսդրություն
  'tests_accounting_finance',    -- Թեստեր › Հաշվապահական և ֆինանսական ոլորտ
  'tests_hr'                     -- Թեստեր › HR, կադրային ոլորտ
);

-- Update the column to use the new enum
ALTER TABLE documents ALTER COLUMN category TYPE document_category_enum USING 
  CASE 
    WHEN category = 'tax_laws' THEN 'standards'::document_category_enum
    WHEN category = 'tax_clarifications' THEN 'clarifications_tax'::document_category_enum
    WHEN category = 'tax_discussions' THEN 'discussions'::document_category_enum
    WHEN category = 'tax_hhms' THEN 'standards'::document_category_enum
    WHEN category = 'tax_fhms' THEN 'standards'::document_category_enum
    WHEN category = 'personnel_laws' THEN 'tests_hr'::document_category_enum
    WHEN category = 'personnel_clarifications' THEN 'clarifications_labor'::document_category_enum
    WHEN category = 'personnel_discussions' THEN 'discussions'::document_category_enum
    WHEN category = 'personnel_hhms' THEN 'standards'::document_category_enum
    WHEN category = 'personnel_fhms' THEN 'standards'::document_category_enum
    ELSE 'standards'::document_category_enum
  END;