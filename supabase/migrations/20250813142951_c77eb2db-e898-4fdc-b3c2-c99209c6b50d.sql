-- Temporarily change category to text, then update to new values
ALTER TABLE documents ALTER COLUMN category TYPE text;

-- Drop the old enum if it exists  
DROP TYPE IF EXISTS document_category_enum CASCADE;

-- Create new enum with Archive page compatible categories
CREATE TYPE document_category_enum AS ENUM (
  'tax_laws',
  'tax_clarifications', 
  'tax_discussions',
  'tax_hhms',
  'tax_fhms',
  'personnel_laws',
  'personnel_clarifications',
  'personnel_discussions', 
  'personnel_hhms',
  'personnel_fhms'
);

-- Update the column to use the new enum (safe since table is empty)
ALTER TABLE documents ALTER COLUMN category TYPE document_category_enum USING 
  CASE 
    WHEN category = 'standards' THEN 'tax_hhms'::document_category_enum
    WHEN category = 'pek_notifications' THEN 'tax_clarifications'::document_category_enum
    WHEN category = 'clarifications_tax' THEN 'tax_clarifications'::document_category_enum
    WHEN category = 'clarifications_labor' THEN 'personnel_clarifications'::document_category_enum
    WHEN category = 'discussions' THEN 'tax_discussions'::document_category_enum
    WHEN category = 'tests_accounting_finance' THEN 'tax_laws'::document_category_enum
    WHEN category = 'tests_hr' THEN 'personnel_laws'::document_category_enum
    ELSE 'tax_laws'::document_category_enum
  END;

-- Set defaults
ALTER TABLE documents ALTER COLUMN is_published SET DEFAULT false;
ALTER TABLE documents ALTER COLUMN view_count SET DEFAULT 0;

-- Update any null values
UPDATE documents SET is_published = false WHERE is_published IS NULL;
UPDATE documents SET view_count = 0 WHERE view_count IS NULL;