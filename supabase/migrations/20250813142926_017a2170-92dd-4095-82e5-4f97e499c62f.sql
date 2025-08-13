-- Update document categories to match Archive page expectations
DO $$ 
BEGIN
  -- First update the enum type if it exists
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_category_enum') THEN
    -- Drop the old enum and create new one
    ALTER TABLE documents ALTER COLUMN category TYPE text;
    DROP TYPE IF EXISTS document_category_enum;
  END IF;
  
  -- Create new enum with updated categories
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
  
  -- Update the column to use the new enum
  ALTER TABLE documents ALTER COLUMN category TYPE document_category_enum USING category::document_category_enum;
  
  -- Set default for is_published if not set
  UPDATE documents SET is_published = false WHERE is_published IS NULL;
  
  -- Set default for view_count if not set  
  UPDATE documents SET view_count = 0 WHERE view_count IS NULL;
END $$;