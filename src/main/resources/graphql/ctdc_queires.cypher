// SBG manifest for arm level files (assignment_report files)
MATCH (f:file)
WITH collect(f.uuid) AS all_files
MATCH(t:clinical_trial)<--(a:arm)<--(f:file)
  WHERE f.uuid IN CASE $file_ids WHEN [] THEN all_files
    ELSE $file_ids
    END
RETURN t.clinical_trial_id AS Trial_ID,
       t.clinical_trial_designation AS Trial_Code,
       a.arm_id AS Treatment_Arm,
       f.uuid AS File_UUID, f.file_name AS File_Name, f.file_type AS File_Type, f.file_size AS File_Size,
       f.md5sum AS md5sum, f.file_location AS File_Location, 'dg.4DFC/' + f.uuid AS GUID,
       f.acl AS acl
ORDER BY File_Name

// SBG manifest for case level files
MATCH (f:file)
WITH collect(f.uuid) AS all_files
MATCH(t:clinical_trial)<--(a:arm)<--(c:case)<--(s:specimen)<--(n:nucleic_acid)<--(sa:sequencing_assay)<--(f:file),
     (sa)<--(v:variant_report)
  WHERE f.uuid IN CASE $file_ids WHEN [] THEN all_files
    ELSE $file_ids
    END
OPTIONAL MATCH (s)<--(i_pten:ihc_assay_report)
  WHERE i_pten.ihc_test_gene = 'PTEN'
OPTIONAL MATCH (s)<--(i_msh2:ihc_assay_report)
  WHERE i_msh2.ihc_test_gene = 'MSH2'
OPTIONAL MATCH (s)<--(i_mlh1:ihc_assay_report)
  WHERE i_mlh1.ihc_test_gene = 'MLH1'
OPTIONAL MATCH (s)<--(i_rb:ihc_assay_report)
  WHERE i_rb.ihc_test_gene = 'RB'
WITH DISTINCT f, t, a, c, s, n, sa, v, i_pten, i_msh2, i_mlh1, i_rb
RETURN t.clinical_trial_id AS Trial_ID, t.clinical_trial_designation AS Trial_Code,
       a.arm_id AS Treatment_Arm,
       c.case_id AS Case_ID, c.gender AS Gender, c.race AS Race, c.ethnicity AS Ethnicity, c.disease AS Diagnosis,
       c.ctep_category AS CTEP_Category, c.ctep_subcategory AS CTEP_Sub_Category, c.meddra_code AS MedDRA_Code,
       c.prior_drugs AS Prior_Drugs,
       s.specimen_id AS Specimen_ID,
       s.specimen_type AS Specimen_Type,
       n.aliquot_id AS Aliquot_ID,
       coalesce(i_pten.ihc_test_result, 'UNKNOWN') AS PTEN_IHC_Status,
       coalesce(i_mlh1.ihc_test_result, 'UNKNOWN') AS MLH1_IHC_Status,
       coalesce(i_msh2.ihc_test_result, 'UNKNOWN') AS MSH2_IHC_Status,
       coalesce(i_rb.ihc_test_result, 'UNKNOWN') AS RB_IHC_Status,
       sa.experimental_method + ':' + CASE f.file_type
         WHEN 'Aligned DNA reads file' THEN ' DNA'
         WHEN 'Aligned RNA reads file' THEN ' RNA'
         WHEN 'Variants file' THEN ' DNA/RNA'
         WHEN 'DNA Index file' THEN ' DNA'
         WHEN 'RNA Index file' THEN ' RNA'
         END AS `Experimental_strategy`,
       sa.platform AS Platform,
       v.reference_genome AS Reference_genome,
       f.uuid AS File_UUID, f.file_name AS File_Name, f.file_type AS File_Type, f.file_size AS File_Size,
       f.md5sum AS md5sum, f.file_location AS File_Location, 'dg.4DFC/' + f.uuid AS GUID,
       f.acl AS acl
  ORDER BY Case_ID, File_Name