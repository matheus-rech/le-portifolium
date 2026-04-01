# Data Profile: rhc14.csv

## Overview

This is a **Brazilian Hospital Cancer Registry (Registro Hospitalar de Cancer - RHC)** dataset, containing oncology case records from hospitals across Brazil. The data appears to be sourced from the INCA/SUS SISRHC system for the year 2014 (with some records extending to 2019).

- **Total rows**: 845,414
- **Valid rows** (non-empty): 658,959 (77.9% of total)
- **Empty/null rows**: 186,455 (22.1%) -- these rows are entirely blank across all 46 columns and should be excluded from any analysis
- **Columns**: 46
- **Encoding**: Latin-1 (ISO-8859-1)
- **Date range**: Primarily 2014-2016 diagnoses, with some records as early as 1960s and as late as 2019
- **Geographic scope**: All 27 Brazilian states; heaviest representation from SP (24.0%), MG (17.5%), RS (8.7%), PR (7.4%)

---

## Column Classification

### Identifiers and Administrative

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| TPCASO | Case type (analytic/non-analytic) | 2 | 0% | 1 = analytic (75.4%), 2 = non-analytic (24.6%) |
| CNES | Hospital registration number | 321 | 0% | Links to CNES hospital registry |
| UFUH | State of treatment center | 27 | 0% | Brazilian state abbreviation |
| MUUH | Municipality of treatment center | 169 | 0% | IBGE municipality code |
| VALOR_TOT | Total value | 1 | 0% | All values = "1" -- not informative |

### Demographics

| Column | Description | Distinct | Missing % | Top Values |
|--------|-------------|----------|-----------|------------|
| SEXO | Sex | 3 | 0% | 2=female (52.3%), 1=male (47.7%) |
| IDADE | Age at diagnosis | 121 | 0% | Range 0-120 (valid); mean=59.8, median=62 |
| RACACOR | Race/skin color | 7 | 0% | 1=white (34.1%), 4=pardo (30.8%), 9=unknown (30.9%) |
| INSTRUC | Education level | 7 | 0% | 2=fundamental incompleto (32.5%), 9=unknown (23.8%) |
| ESTCONJ | Marital status | 7 | 0% | 2=married (34.2%), 0=not collected (24.0%) |
| OCUPACAO | Occupation (CBO code) | 352 | 0% | 9999=unknown (42.6%) |
| LOCALNAS | State of birth | 31 | 0% | Brazilian state abbreviation |
| ESTADRES | State of residence | 29 | 0% | Brazilian state abbreviation |
| PROCEDEN | Municipality of origin (IBGE) | 5,525 | 0% | IBGE 7-digit code |

### Clinical History

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| HISTFAMC | Family history of cancer | 4 | 0% | 1=yes (18.3%), 2=no (19.1%), 9=unknown (38.7%) |
| ALCOOLIS | Alcohol use | 7 | 0% | 1=never (26.2%), 9=unknown (29.7%) |
| TABAGISM | Tobacco use | 7 | 0% | 1=never (24.8%), 9=unknown (26.5%) |
| DIAGANT | Prior diagnosis | 5 | 0% | 1=without, 2=with prior diagnosis |

### Tumor Characteristics

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| LOCTUDET | Tumor site (ICD-O topography, 3-char) | 82 | 0% | Top: C44 (skin, 17.4%), C50 (breast, 15.4%), C61 (prostate, 12.5%) |
| LOCTUPRI | Primary tumor site (ICD-O, detailed) | 399 | 0% | Full ICD-O topography code (e.g., C50.9) |
| TIPOHIST | Histological type (ICD-O morphology) | 755 | 0% | 8140/3 = adenocarcinoma (21.5%), 8070/3 = squamous cell (15.6%) |
| LATERALI | Laterality | 5 | 0% | 8=N/A (47.6%), 9=unknown (26.4%) |
| MAISUMTU | Multiple tumors | 4 | 0% | 1=single tumor (64.9%), 2=multiple (6.1%) |
| LOCTUPRO | Metastatic tumor location | 197 | 24.0% | "." = no metastasis |

### Staging

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| TNM | Clinical TNM | 251 | 0% | Combined T+N+M codes; 999=unknown (35.1%) |
| ESTADIAM | Clinical stage | 41 | 0% | Stages 1-4 with substages; 99=unknown (27.7%), 88=N/A (16.6%) |
| OUTROESTA | Other staging system | 1,516 | 23.2% | Mixed coding systems |
| PTNM | Pathological TNM | 282 | 17.2% | Pathological staging; many unknowns |

### Treatment

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| CLIATEN | Referring clinic | 66 | 0% | 99=not specified (24.8%) |
| CLITRAT | Treatment clinic | 52 | 0% | Specialty code |
| ORIENC | Referral source | 6 | 0% | 1=SUS (53.5%), 0=not collected (24.0%) |
| PRITRATH | First treatment modalities | 1,150 | 0% | Combination codes: 2=surgery (29.7%), 1=none (14.4%), 4=chemo (13.0%) |
| RZNTR | Reason for no treatment | 9 | 0% | 8=treatment received (82.3%) |
| BASMAIMP | Basis of diagnosis | 8 | 24.0% | 7=histology of primary (92.3% of non-null) |

### Dates

| Column | Description | Valid Dates | Placeholder/Missing | Format |
|--------|-------------|-------------|---------------------|--------|
| ANOPRIDI | Year of first diagnosis | 97.8% | 9999=unknown (2.1%) | YYYY |
| DTDIAGNO | Diagnosis date | 97.8% | 99/99/9999 (2.2%) | DD/MM/YYYY |
| DTTRIAGE | Triage date | 71.4% | "/  /" and "88/88/8888" common | DD/MM/YYYY |
| DATAPRICON | First consultation date | 100% | None | DD/MM/YYYY |
| DATAINITRT | Treatment initiation date | 84.3% | 88/88/8888 (10.8%) | DD/MM/YYYY |
| DATAOBITO | Death date | 20.3% | "/  /" (63.3%) -- most patients alive or lost | DD/MM/YYYY |
| DTINITRT | Year of treatment initiation | 65.5% | Higher missing rate | YYYY |
| DTPRICON | Year of first consultation | 100% | -- | YYYY |
| ANTRI | Year of referral | 28.6% | High missing | YYYY |

### Outcome

| Column | Description | Distinct | Missing % | Notes |
|--------|-------------|----------|-----------|-------|
| ESTDFIMT | Status at end of first treatment | 8 | 0% | 9=unknown (42.8%), 1=disease-free (16.6%), 3=alive with disease (12.7%) |
| BASDIAGSP | Basis of diagnosis (specific) | 4 | 0% | 3=histology (94.7% of non-null) |
| EXDIAG | Diagnostic exam | 7 | 42.2% | 4=histopathology (75.7% of non-null) |

---

## Data Quality Issues

### CRITICAL -- Empty Rows

**186,455 rows (22.1%) are completely empty** across all 46 columns. These appear to be padding or artifacts from the data export. They must be filtered out before any analysis (`df.dropna(how='all')`).

### HIGH -- Sentinel Values Masking Real Missingness

Many columns use coded sentinel values rather than true nulls, which significantly understates real missingness:

| Pattern | Example Columns | Impact |
|---------|-----------------|--------|
| Code "9" = unknown/not stated | RACACOR, INSTRUC, HISTFAMC, ALCOOLIS, TABAGISM, LATERALI | 20-39% of valid records |
| Code "99" or "999" = unknown | ESTADIAM (27.7%), CLIATEN (24.8%), TNM (35.1%) | Critical staging data sparse |
| Code "88" or "88/88/8888" = N/A | ESTADIAM (16.6%), date columns | Meaningful for some, needs context |
| "9999" = unknown | OCUPACAO (42.6%), ANOPRIDI (2.1%) | Occupation data very sparse |
| Code "0" = not collected | ESTCONJ (24.0%), ORIENC (24.0%), CLIATEN (4.6%) | Appears to be one data source submitting differently |
| "/  /" = empty date | DTTRIAGE, DATAOBITO | Mostly means "not applicable" |
| "XXX", "YYY" | TNM | Unknown components |

**Effective completeness** (after accounting for sentinel values) is significantly lower than the raw null counts suggest. For example, RACACOR appears 100% complete but only ~69% have real race data.

### MEDIUM -- Date Quality

- 14,203 records have diagnosis date "99/99/9999" (placeholder)
- 86,782 records have treatment initiation date "88/88/8888" or "99/99/9999"
- Date format is DD/MM/YYYY but some dates are clearly invalid
- DTTRIAGE has 64,239 placeholder dates (12.9% of valid records)

### MEDIUM -- Age Outliers

- 121 records have age > 120 (including 115 with age = 999, a sentinel value)
- 6 records show ages 121-130, which are likely errors

### LOW -- Sex-Site Inconsistencies

Minor but notable data integrity issues:

- 4 records list female sex (SEXO=2) with prostate cancer (C61) -- likely coding errors
- 2 records list male sex (SEXO=1) with cervical cancer (C53)
- 1,137 male breast cancer records (C50) -- this is clinically valid (~1% of breast cancers occur in men)

### LOW -- VALOR_TOT Column Uninformative

All 658,959 valid records have VALOR_TOT = "1". This column carries no analytical value.

---

## Key Patterns Discovered

### Age Distribution

The patient population is predominantly elderly, consistent with cancer epidemiology:

| Age Group | Count | Percentage |
|-----------|-------|------------|
| 0-18 | 12,749 | 1.9% |
| 19-40 | 67,842 | 10.3% |
| 41-60 | 230,169 | 34.9% |
| 61-80 | 295,246 | 44.8% |
| 81-120 | 51,960 | 7.9% |

### Top Cancer Sites (ICD-O Topography)

| Code | Site | Cases | % |
|------|------|-------|---|
| C44 | Skin (non-melanoma) | 114,722 | 17.4% |
| C50 | Breast | 101,248 | 15.4% |
| C61 | Prostate | 82,120 | 12.5% |
| C53 | Cervix uteri | 41,172 | 6.2% |
| C34 | Lung/bronchus | 27,965 | 4.2% |
| C18 | Colon | 25,982 | 3.9% |
| C16 | Stomach | 24,792 | 3.8% |

### Staging at Diagnosis

Among the 366,859 records with valid staging (55.7% of valid rows):

| Stage | Cases | % of staged |
|-------|-------|-------------|
| Stage 0 | 19,229 | 5.2% |
| Stage I | 96,470 | 26.3% |
| Stage II | 88,868 | 24.2% |
| Stage III | 79,009 | 21.5% |
| Stage IV | 83,168 | 22.7% |

Nearly 23% of staged patients present at Stage IV, indicating late-stage diagnosis is common.

### Mortality

- 134,093 records (20.3%) have a recorded death date
- This is a lower bound -- many deaths may not be captured in the registry

### Treatment Modalities (PRITRATH, first treatment)

| Code | Modality | Cases | % |
|------|----------|-------|---|
| 2 | Surgery alone | 195,780 | 29.7% |
| 1 | No treatment | 94,647 | 14.4% |
| 4 | Chemotherapy alone | 85,623 | 13.0% |
| 3 | Radiotherapy alone | 68,452 | 10.4% |
| 24 | Surgery + chemotherapy | 30,348 | 4.6% |

### Geographic Concentration

Sao Paulo state alone accounts for 24% of all records, followed by Minas Gerais (17.5%). The Southeast region dominates, reflecting both population density and hospital infrastructure concentration.

---

## Recommended Follow-Up Analyses

1. **Survival analysis by tumor site and stage** -- Parse DTDIAGNO and DATAOBITO into proper dates, compute time-to-death, and run Kaplan-Meier curves stratified by LOCTUDET and ESTADIAM. This is the highest-value analysis for this dataset.

2. **Treatment access disparities by state/region** -- Compare time-from-diagnosis-to-treatment (DTDIAGNO to DATAINITRT) across UFUH states. Investigate whether patients from less-resourced states (North/Northeast) face longer delays.

3. **Stage at diagnosis by cancer site and demographics** -- Investigate whether late-stage presentation (Stage III-IV) is associated with race (RACACOR), education (INSTRUC), or geography (ESTADRES). This addresses health equity questions.

4. **Data quality investigation for the "code 0" subpopulation** -- The ~158,000 records with CLIATEN=0, ESTCONJ=0, etc., appear to come from a distinct data submission process. Profile these records separately to understand if they require different treatment.

5. **Trend analysis by year of diagnosis** -- Using ANOPRIDI, track changes in case volume, stage distribution, and treatment patterns across 2014-2019 to identify system-level improvements or deterioration.

6. **Histology-stratified treatment patterns** -- Combine TIPOHIST and PRITRATH to assess whether treatment modalities align with clinical guidelines for specific histological subtypes (e.g., adenocarcinoma vs. squamous cell).

---

## Technical Notes for Working with This Data

- **Encoding**: Use `encoding='latin-1'` when reading with pandas
- **Row filtering**: Drop rows where all columns are null (`df.dropna(how='all')`) to get 658,959 valid records
- **Sentinel handling**: Recode sentinel values (9, 99, 999, 9999, 88, 88/88/8888, 99/99/9999, "/  /", "XXX", "YYY") as NaN for accurate missingness rates
- **Date parsing**: Use `pd.to_datetime(col, format='%d/%m/%Y', errors='coerce')` after filtering out placeholder dates
- **Age cleaning**: Filter IDADE > 120 as invalid
- **ICD-O codes**: LOCTUDET and LOCTUPRI follow ICD-O-3 topography coding; TIPOHIST follows ICD-O-3 morphology
- **PRITRATH decoding**: Each digit represents a treatment modality (1=none, 2=surgery, 3=radiotherapy, 4=chemotherapy, 5=hormone therapy, etc.); multi-digit values indicate combination therapies
