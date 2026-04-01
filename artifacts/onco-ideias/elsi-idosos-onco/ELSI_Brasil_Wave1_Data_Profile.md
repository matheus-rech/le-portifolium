# Data Profile: ELSI-Brasil, 1a Onda (Wave 1)

**Dataset**: ELSI_Portugues_1a_onda.csv
**Study**: Estudo Longitudinal da Saude dos Idosos Brasileiros (Brazilian Longitudinal Study of Aging)

---

## Overview

- **Rows**: 9,412 participants
- **Columns**: 1,082 (740 integer, 340 float, 2 string)
- **Memory**: ~82.6 MB
- **Grain**: One row per participant (unique `id` confirmed -- zero duplicates)
- **Population**: Community-dwelling adults aged 50+ in Brazil

---

## Questionnaire Sections

The column naming follows a structured questionnaire with lettered sections:

| Prefix | Columns | Likely Content |
|--------|---------|----------------|
| ar     | 46      | Household roster / household composition |
| a      | 20      | Demographics, self-rated health |
| b      | 39      | Functional capacity, ADLs/IADLs |
| c      | 18      | Healthcare utilization |
| d / dr | 255 / 18 | Chronic diseases and conditions (self-reported diagnoses) |
| e      | 30      | Social/economic characteristics, education |
| f      | 21      | Labor and employment |
| g      | 14      | Social participation, religion |
| h      | 26      | Health behaviors (smoking, alcohol, physical activity) |
| i      | 46      | Falls, violence, caregiving |
| k      | 11      | Pain, disability |
| l      | 43      | Medication use |
| m      | 16      | Women's health |
| mf     | 42      | Physical measurements (anthropometry, blood pressure) |
| n      | 79      | Cognitive function, memory tests |
| o      | 30      | Physical performance tests |
| p      | 80      | Blood tests, biomarkers |
| q / qp | 21 / 55 | Mental health, depression screening, psychological well-being |
| r      | 9       | Sleep |
| s      | 54      | Social networks and support |
| t      | 7       | Oral health |
| u      | 81      | Food security, nutrition |
| ci     | 8       | Interviewer / data collection info |

---

## Key Demographics

### Age (`idade`)
- **Range**: 50--105 years (no nulls)
- **Mean**: 63.6, **Median**: 62.0, **SD**: 10.2
- **Distribution**: Right-skewed with most participants in the 50--64 range

| Age Group | Count | % |
|-----------|-------|---|
| 50--54    | 2,197 | 23.3% |
| 55--59    | 1,783 | 18.9% |
| 60--64    | 1,572 | 16.7% |
| 65--69    | 1,303 | 13.8% |
| 70--74    | 997   | 10.6% |
| 75--79    | 784   | 8.3% |
| 80--84    | 438   | 4.7% |
| 85--89    | 225   | 2.4% |
| 90+       | 113   | 1.2% |

### Sex (`sexo`)
- **0 (Female)**: 5,314 (56.5%)
- **1 (Male)**: 4,098 (43.5%)

### Region (`regiao`)
- 1 = Norte: 743 (7.9%)
- 2 = Nordeste: 2,549 (27.1%)
- 3 = Sudeste: 3,922 (41.7%)
- 4 = Sul: 1,278 (13.6%)
- 5 = Centro-Oeste: 920 (9.8%)

### Urban/Rural (`zona`)
- 1 = Urban: 7,935 (84.3%)
- 2 = Rural: 1,477 (15.7%)

### Survey Weight (`peso_calibrado`)
- Range: 0.05--11.24, Mean: 1.0, Median: 0.82
- Available for all 9,412 participants (complex survey design)

---

## Income Variables

| Variable | Description | Mean | Median | Max | Zeros |
|----------|-------------|------|--------|-----|-------|
| `rendadom` | Household income (R$) | 2,951 | 2,000 | 248,060 | 276 |
| `rendadompc` | Per-capita household income (R$) | 1,130 | 788 | 144,299 | 276 |
| `rendaind` | Individual income (R$) | 1,434 | 880 | 248,060 | 1,685 |

Income is heavily right-skewed (SD > mean), with 276 households reporting zero income (2.9%) and 1,685 individuals (17.9%) with zero individual income.

---

## Chronic Disease Prevalence (`dr` columns)

Reported diseases (1 = yes, among non-null respondents):

| Code | Condition (Probable) | Prevalence |
|------|---------------------|------------|
| dr4  | Hypertension        | 56.2% |
| dr1  | Diabetes            | 31.6% |
| dr3  | Heart disease       | 10.6% |
| dr7  | Arthritis/Rheumatism | 8.8% |
| dr16 | Depression          | 6.2% |
| dr9  | Stroke/CVA          | 5.3% |
| dr22 | Cancer              | 3.5% |
| dr6  | Asthma/COPD         | 3.4% |
| dr18 | Osteoporosis        | 3.2% |
| dr25 | Kidney disease      | 2.3% |
| dr24 | Alzheimer's/Dementia | 1.3% |
| dr27 | Liver disease       | 0.5% |

Note: 306 participants (~3.3%) have null values across all `dr` columns. Several `dr` columns (dr2, dr5, dr8, dr17, dr23, dr26) have 0% "yes" responses, indicating either not-applicable conditions or structural missingness.

---

## Data Quality Issues

### High-Null Columns (267 columns >80% null)
Most of these are in the `d` section (disease detail sub-questions), particularly items d*_9 through d*_14 which are 100% null. These likely correspond to disease-specific follow-up items for conditions with very few or no respondents.

### Constant Columns
60 columns have only a single unique value (or are entirely null). These carry no analytical information and can be dropped.

### Special Codes
The dataset uses coded missing/not-applicable values that should be handled carefully:

- **8** or **88** or **8888888**: "Not applicable" / skip pattern
- **9** or **99** or **9999999**: "Don't know" / refused
- These are NOT true missing values -- they are encoded in the numeric data and must be recoded to NaN before analysis

### String Columns
Only 2 columns are non-numeric:
- `ar4`: Interview date (format: "12may2015", stored as text)
- `q5`: A date field in the mental health section

---

## Cardinality Overview

| Cardinality | Columns | Notes |
|-------------|---------|-------|
| 1 (constant) | 60 | Drop before analysis |
| 2 (binary)   | 58 | Yes/no flags, sex |
| 3--10         | 656 | Most questionnaire items (Likert scales, coded responses) |
| 11--50        | 129 | Multi-option items |
| 51--100       | 46 | Semi-continuous measures |
| >100          | 58 | IDs, income, biomarkers, physical measurements |

---

## Recommended Follow-Up Analyses

1. **Chronic disease burden by demographics**: Cross-tabulate hypertension (dr4), diabetes (dr1), and depression (dr16) rates by age group, sex, region, and income quintile using survey weights.

2. **Income inequality and health gradient**: Analyze self-rated health (a3), functional capacity (k1/k5), and disease prevalence across income per-capita quintiles, stratified by urban/rural zone.

3. **Multimorbidity patterns**: Count co-occurring conditions per person using the `dr` columns and examine clusters (e.g., cardiometabolic: hypertension + diabetes + heart disease).

4. **Cognitive function by age and education**: Profile the cognitive test scores in the `n` section across age groups and education levels (likely in `e` section), controlling for sex.

5. **Physical performance and disability**: Correlate physical performance tests (`o` section) with functional disability (`k` section) and falls (`i` section) to identify high-risk profiles.

6. **Depression screening**: Analyze the `q` section depression items by sex, age, social support (`s` section), and chronic disease burden.

7. **Data cleaning pipeline**: Recode special values (8/88/8888888 and 9/99/9999999) to NaN, drop the 60 constant columns, and parse the date columns (`ar4`, `q5`) before any substantive analysis.
