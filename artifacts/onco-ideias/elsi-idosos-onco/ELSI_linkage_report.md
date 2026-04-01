# ELSI-Brazil Longitudinal Linkage Analysis
## Final Report (Updated with Portal and Literature Review)

### Data Sources
- **Baseline** (Stata13 + CSV): 9,412 participants, 1,082 variables, collected 2015-2016
- **2nd Wave** (Stata13 + CSV): 9,949 participants, 975 variables, collected 2019-2021
- Source: ELSI-Brazil official data portal (elsi.cpqrr.fiocruz.br)

### Key Finding

The ELSI portal explicitly states that only **"cross-sectional data from the first and the second waves"** are available for download. These are separate snapshots -- not linked longitudinal records. The portal provides no crosswalk file, no persistent individual identifier, and no merge instructions.

This is confirmed by our technical analysis: the baseline uses `id` (labeled "Interviewer ID," sequential 1-9,412) and the 2nd wave uses `id2` (labeled "Interviewee ID," sequential 20,200,001-20,209,949). These are independent row identifiers, not persistent participant IDs.

### Linkage Attempts

| Strategy | Result | Why it failed |
|----------|--------|---------------|
| Direct ID match (id == id2) | 0 matches | Completely different numbering schemes |
| Prefix-stripping (id2 - 20200000) | Spurious | 49% sex mismatch, age diffs -50 to +51 |
| Household ID match | Spurious | PSU consistency <1%, stratum 0% |
| Probabilistic (sex + region + area + age) | Infeasible | 10.5M candidate pairs, only 48 unique matches |

### What the Cohort Profile Paper Says

According to the 2023 cohort profile (Lima-Costa et al., *International Journal of Epidemiology*):
- Of 9,412 baseline participants, **6,172 were re-interviewed** in wave 2
- **2,270 were lost to follow-up**
- **970 died** between waves
- The study maintains internal linkage (including mortality system linkage)

This confirms ELSI-Brazil is a true longitudinal study with individual tracking -- but the publicly downloadable cross-sectional files do not expose the linkage key.

### Portal Documentation Summary

From the ELSI data access page:
- Files available in Stata 13 and CSV formats
- **Only cross-sectional data** released for each wave
- Sentinel codes: 8/88/888/8888 = Not Applicable; 9/99/999/9999 = Missing
- Complex survey design requires: `svyset psu, strata(stratum) weight(calibrated_weight)`
- Questions "remain the same throughout the waves" with minor exceptions
- Monetary values between waves need inflation adjustment

### Recommended Next Steps

1. **Contact the ELSI-Brazil team** (elsi@fiocruz.br) to request a crosswalk/linkage file mapping baseline IDs to wave 2 IDs, or a merged longitudinal dataset with persistent participant identifiers.

2. **Check the Gateway to Global Aging Data** (g2aging.org) for a harmonized ELSI-Brazil dataset that may include cross-wave identifiers.

3. **Use the data as repeated cross-sections** for now. This is valid for comparing population-level prevalence across waves (weighted), examining secular trends in health/income/healthcare, and age-period analyses.

### Repeated Cross-Section Comparison (Weighted Estimates)

| Metric | Baseline (2015-16) | Wave 2 (2019-21) |
|--------|---------------------|-------------------|
| Weighted mean age | 62.5 years | 63.3 years |
| Female (%) | 53.9% | 54.4% |
| Household income (R$) | 3,204 | 2,973 |
| Per-capita income (R$) | 1,175 | 1,376 |
| Individual income (R$) | 1,508 | 1,543 |

### Citation Requirements (per ELSI portal)

- Ethics approval: CAAE 34649814.3.0000.5091
- Cite cohort profiles: Lima-Costa MF et al., *Am J Epidemiol* 2018; Lima-Costa MF et al., *Int J Epidemiol* 2023
- Notify elsi@fiocruz.br of publications
