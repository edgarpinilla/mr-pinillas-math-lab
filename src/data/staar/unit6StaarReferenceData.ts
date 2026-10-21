export type Unit6MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit6RepresentationCategory =
  | 'Symbolic Equation (ax + b = cx + d)'
  | 'Word Problem → Equation / Inequality'
  | 'Equation / Inequality → Real-World Story'
  | 'Symbolic Inequality & Solution Set'
  | 'Number Line Representation'
  | 'Step-by-Step Error Analysis'
  | 'Geometric Perimeter Model';

export type Unit6SkillCategory =
  | 'Solving Equations with Variables on Both Sides (TEKS 8.8C)'
  | 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)'
  | 'Distributive Property & Multi-Step Equations (TEKS 8.8C)'
  | 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)'
  | 'Writing Real-World Problems from Equations & Inequalities (TEKS 8.8B)'
  | 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)'
  | 'Multi-Step Equation & Inequality Error Analysis (TEKS 8.8C)';

export interface Unit6StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // 'u6-staar-q01' .. 'u6-staar-q36'
  round: 1 | 2 | 3;
  strand: string;
  representationCategory: Unit6RepresentationCategory;
  teks: 'TEKS 8.8C' | 'TEKS 8.8A' | 'TEKS 8.8B';
  skillCategory: Unit6SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit6MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit6StaarHistoricalSummary {
  unitTitle: string;
  unitSubtitle: string;
  administrationsReviewed: number[];
  teksBreakdown: {
    code: string;
    standardType: 'Readiness' | 'Supporting';
    description: string;
    frequencySummary: string;
  }[];
  skillCategories: {
    name: Unit6SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_6_STAAR_HISTORICAL_SUMMARY: Unit6StaarHistoricalSummary = {
  unitTitle: 'Unit 6 — Linear Equations & Inequalities: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions across Rounds 1–3 covering one-variable equations and inequalities with variables on both sides (TEKS 8.8C, 8.8A, and 8.8B).',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.8C',
      standardType: 'Readiness',
      description:
        'Model and solve one-variable equations with variables on both sides of the equal sign that represent mathematical and real-world problems using rational number coefficients and constants.',
      frequencySummary:
        'Readiness standard documented across reviewed released administrations; verified released items include 2018 (Items 9, 22), 2019 (Items 16, 28), 2021 (Items 12, 30), 2022 (Items 10, 34), 2023 (Item 15), and 2024 (Item 19). Note: TEKS 8.8C officially focuses on equations with variables on both sides; solving one-variable inequalities in this bank is explicitly documented where no direct released 8.8C match is identified.',
    },
    {
      code: 'TEKS 8.8A',
      standardType: 'Supporting',
      description:
        'Write one-variable equations or inequalities with variables on both sides that represent problems using rational number coefficients and constants.',
      frequencySummary:
        'Supporting standard documented across reviewed released administrations; verified released items include 2018 (Item 27), 2019 (Item 6), 2021 (Item 21), 2022 (Item 17), and 2023 (Item 29).',
    },
    {
      code: 'TEKS 8.8B',
      standardType: 'Supporting',
      description:
        'Write a corresponding real-world problem when given a one-variable equation or inequality with variables on both sides of the equal sign using rational number coefficients and constants.',
      frequencySummary:
        'Supporting standard documented across reviewed released administrations; verified released items include 2018 (Item 14), 2019 (Item 33), 2021 (Item 8), and 2022 (Item 24).',
    },
  ],
  skillCategories: [
    {
      name: 'Solving Equations with Variables on Both Sides (TEKS 8.8C)',
      description:
        'Solving ax + b = cx + d equations with integer and negative coefficients, combining like terms, and finding real-world break-even solutions.',
    },
    {
      name: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
      description:
        'Solving one-variable equations with fractional and decimal coefficients on both sides using least common multiples (LCD) or decimal isolation.',
    },
    {
      name: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
      description:
        'Expanding expressions with positive and negative multipliers on one or both sides of an equation before isolating the variable.',
    },
    {
      name: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
      description:
        'Translating verbal cost comparisons, savings plans, geometric perimeters, and capacity constraints into one-variable equations or inequalities.',
    },
    {
      name: 'Writing Real-World Problems from Equations & Inequalities (TEKS 8.8B)',
      description:
        'Matching a given symbolic equation or inequality with variables on both sides to a corresponding real-world verbal scenario.',
    },
    {
      name: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
      description:
        'Solving multi-step inequalities, reversing the inequality symbol when dividing by a negative coefficient, graphing on number lines, and testing solution sets.',
    },
    {
      name: 'Multi-Step Equation & Inequality Error Analysis (TEKS 8.8C)',
      description:
        'Auditing written algebraic solution steps to identify inverse-operation, constant-isolation, or inequality symbol-reversal errors.',
    },
  ],
  disclaimers: {
    primaryDisclaimer:
      'The questions in Mr. Pinilla’s Math Lab are original questions and are not official STAAR questions. The STAAR references shown here identify released STAAR items with similar TEKS, mathematical skills, reasoning, structure, or item style that were used as guidance when developing the Math Lab practice bank. Numerical values, wording, diagrams, contexts, answer choices, and/or item formats may differ from the official released STAAR items.',
    classificationDisclaimer:
      'These classifications describe similarity—not question origin. No Math Lab question should be interpreted as an official STAAR question.',
    frequencyDisclaimer:
      'Historical Frequency is based only on publicly released STAAR materials reviewed. It does not represent all STAAR forms administered statewide and does not predict future STAAR questions.',
  },
};

const TEKS_88C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2018 Items 9 & 22, 2019 Items 16 & 28, 2021 Items 12 & 30, 2022 Items 10 & 34, 2023 Item 15, 2024 Item 19)';
const TEKS_88A_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released items: 2018 Item 27, 2019 Item 6, 2021 Item 21, 2022 Item 17, 2023 Item 29)';
const TEKS_88B_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released items: 2018 Item 14, 2019 Item 33, 2021 Item 8, 2022 Item 24)';

export const UNIT_6_STAAR_REFERENCE_DATA: Unit6StaarQuestionReference[] = [
  // =========================================================================
  // ROUND 1 (Questions 1–12)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'u6-staar-q01',
    round: 1,
    strand: 'Equations with Variables on Both Sides',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Equations with Variables on Both Sides (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable linear equation with integer coefficients and variables on both sides (7x + 18 = 3x + 42)',
    itemFormat: 'Multiple Choice (Symbolic Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 9 & 2021 Item 12 (TEKS 8.8C Solving Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C items where students solve a symbolic equation of the form ax + b = cx + d for the value of x that makes the equation true.',
    mathLabAdaptation:
      'Original integer equation 7x + 18 = 3x + 42 yielding x = 6, with sign and inverse-operation distractors (x = 15, x = -6, x = 2.4).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving symbolic equations with variables on both sides verified across 2018, 2019, 2021, 2022, 2023, and 2024 released administrations reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'u6-staar-q02',
    round: 1,
    strand: 'Writing Equations from Real-World Situations',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable equation with variables on both sides to find when two car wash pricing plans have equal total cost',
    itemFormat: 'Multiple Choice (Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2022 Grade 8 Mathematics, Item 3 (Official TEKS 8.8A — Answer Key: https://tea.texas.gov/data-reports/staar/released-test-questions/may-2022-staar-math-8-answerkey-final-2.pdf | Rationale: https://tea.texas.gov/data-reports/staar/released-test-questions/2022-staar-may-grade-8-math-rationales.pdf)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Both tasks require writing an equation with variables on both sides. The bank compares car-wash costs; the released item represents equal perimeters with 17x = 30 + 7x. The equation-writing demand is comparable, but the contextual structures differ.',
    mathLabAdaptation:
      'Original car wash comparison (Sparkle: $12 flat + $3/min vs. Clean Wheels: $6 flat + $5/min) modeling 3m + 12 = 5m + 6 with reversed rate/fee distractors.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Principal reference 2022 Grade 8 Mathematics Item 3 (TEKS 8.8A); both tasks require writing an equation with variables on both sides, while contextual structures differ (car-wash cost comparison vs. equal perimeters 17x = 30 + 7x).',
  },
  {
    questionNumber: 3,
    questionId: 'u6-staar-q03',
    round: 1,
    strand: 'Solving with Negative Coefficients',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Equations with Variables on Both Sides (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with negative coefficients and constants on both sides (-5x + 9 = 2x - 26)',
    itemFormat: 'Numeric Entry (Equation Solution)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 16 & 2022 Item 10 (TEKS 8.8C Solving Equations with Signed Coefficients)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches released TEKS 8.8C numeric/griddable items requiring students to isolate x across positive and negative variable terms and constants.',
    mathLabAdaptation:
      'Original equation -5x + 9 = 2x - 26 formatted for numeric entry (x = 5), testing signed inverse operations (35 = 7x).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving equations with signed coefficients and numeric entry verified in 2019 (Item 16), 2021 (Item 30), and 2022 (Item 10) released administrations reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'u6-staar-q04',
    round: 1,
    strand: 'Inequalities with Symbol Reversal',
    representationCategory: 'Number Line Representation',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve a two-step linear inequality with a negative coefficient (-4x + 15 < 3) and identify its graph on a number line',
    itemFormat: 'Multiple Choice (Number Line)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Solving & Graphing One-Variable Inequalities)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8A/8.8B include writing and interpreting inequalities, while TEKS 8.8C focuses on solving equations (and Grade 7 TEKS 7.10B/7.11A cover two-step inequality number lines). No released Grade 8 8.8C item directly tests graphing an inequality solution on a number line.',
    mathLabAdaptation:
      'Original instructional bridge item (-4x + 15 < 3 → x > 3) reinforcing inequality symbol reversal and open-circle number line representation.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; included as a foundational algebra readiness extension',
  },
  {
    questionNumber: 5,
    questionId: 'u6-staar-q05',
    round: 1,
    strand: 'Writing Real-World Problems from Equations',
    representationCategory: 'Equation / Inequality → Real-World Story',
    teks: 'TEKS 8.8B',
    skillCategory: 'Writing Real-World Problems from Equations & Inequalities (TEKS 8.8B)',
    questionSkill:
      'Identify the real-world verbal problem that corresponds to the given one-variable equation 20x + 45 = 15x + 75',
    itemFormat: 'Multiple Choice (Equation to Verbal Context)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 14 & 2021 Item 8 (TEKS 8.8B Matching Equations to Real-World Problems)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8B items where a symbolic equation ax + b = cx + d is given and students select the four-option real-world story that correctly pairs rates with x and initial fees with constants.',
    mathLabAdaptation:
      'Original equation 20x + 45 = 15x + 75 matched to a two-gym membership comparison ($45 fee + $20/month vs. $75 fee + $15/month), with swapped rate/constant and subtraction distractors.',
    teksFrequency: TEKS_88B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Matching an equation with variables on both sides to a real-world story verified in 2018 (Item 14), 2019 (Item 33), 2021 (Item 8), and 2022 (Item 24)',
  },
  {
    questionNumber: 6,
    questionId: 'u6-staar-q06',
    round: 1,
    strand: 'Solving Multi-Step Inequalities',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable inequality with variables on both sides (6x - 14 ≥ 2x + 18) and enter the comparison symbol and boundary',
    itemFormat: 'Inequality Entry (Symbol & Boundary)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Solving Inequalities with Variables on Both Sides)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: While TEKS 8.8A assesses writing inequalities with variables on both sides and TEKS 8.8C assesses solving equations with variables on both sides, released Grade 8 STAAR forms do not directly assess solving symbolic inequalities with variables on both sides.',
    mathLabAdaptation:
      'Original interactive inequality-entry item 6x - 14 ≥ 2x + 18 → x ≥ 8 extending variable-on-both-sides solving fluency to inequalities.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; bridges TEKS 8.8A inequality structure and Algebra I readiness',
  },
  {
    questionNumber: 7,
    questionId: 'u6-staar-q07',
    round: 1,
    strand: 'Decimal Equations with Variables on Both Sides',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with decimal coefficients and constants on both sides (1.2x + 4.8 = 0.4x + 9.6)',
    itemFormat: 'Multiple Choice (Decimal Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 22 & 2022 Item 34 (TEKS 8.8C Solving Rational/Decimal Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C items that assess solving ax + b = cx + d with rational decimal coefficients and constants on both sides of the equal sign.',
    mathLabAdaptation:
      'Original decimal equation 1.2x + 4.8 = 0.4x + 9.6 (0.8x = 4.8 → x = 6) with place-value division distractor x = 0.6.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving decimal-coefficient equations with variables on both sides verified in 2018 (Item 22), 2019 (Item 28), 2022 (Item 34), and 2024 (Item 19)',
  },
  {
    questionNumber: 8,
    questionId: 'u6-staar-q08',
    round: 1,
    strand: 'Multi-Step Equation Error Analysis',
    representationCategory: 'Step-by-Step Error Analysis',
    teks: 'TEKS 8.8C',
    skillCategory: 'Multi-Step Equation & Inequality Error Analysis (TEKS 8.8C)',
    questionSkill:
      'Identify the first algebraic step containing an inverse-operation error when solving 4(x - 3) = 2x + 10',
    itemFormat: 'Multiple Choice (Step-by-Step Error Analysis)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2023 Grade 8 Mathematics Item 15 & 2024 Item 19 (TEKS 8.8C Multi-Step Equation Solving Process)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Assesses the exact multi-step algebraic manipulation required by TEKS 8.8C (distributing and isolating constants across the equal sign), adapted into a diagnostic step-by-step error-analysis format.',
    mathLabAdaptation:
      'Original four-step work sample for 4(x - 3) = 2x + 10 where Step 3 subtracts 12 from 10 (2x = -2) instead of adding 12 to 10 (2x = 22).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Multi-step equation solving verified across released TEKS 8.8C items; step-by-step error diagnosis is a Math Lab instructional adaptation',
  },
  {
    questionNumber: 9,
    questionId: 'u6-staar-q09',
    round: 1,
    strand: 'Writing Inequalities from Word Problems',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable inequality with variables on both sides (50 + 3v < 8v) to model when a summer pool pass costs less than paying per visit',
    itemFormat: 'Multiple Choice (Inequality Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 6 & 2023 Item 29 (TEKS 8.8A Writing Inequalities with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8A items where students translate a verbal comparison ("cost less than") between two linear rate structures into a one-variable inequality with variables on both sides.',
    mathLabAdaptation:
      'Original pool admission comparison ($50 pass + $3/visit vs. $8/visit non-member) modeling 50 + 3v < 8v with reversed inequality and misplaced-variable distractors.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing one-variable inequalities with variables on both sides from word problems verified in 2019 (Item 6), 2022 (Item 17), and 2023 (Item 29)',
  },
  {
    questionNumber: 10,
    questionId: 'u6-staar-q10',
    round: 1,
    strand: 'Distributive Property with Equations',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a multi-step linear equation requiring the distributive property on one side and variables on both sides: 3(2x + 5) = 4x + 29',
    itemFormat: 'Numeric Entry (Multi-Step Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2021 Grade 8 Mathematics Item 30 & 2023 Item 15 (TEKS 8.8C Multi-Step Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Aligns to TEKS 8.8C solving equations with variables on both sides while incorporating parenthetical distribution 3(2x + 5) prior to collecting like terms.',
    mathLabAdaptation:
      'Original numeric-entry equation 3(2x + 5) = 4x + 29 → 6x + 15 = 4x + 29 → x = 7.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Core TEKS 8.8C equation solving verified in all reviewed administrations, extended here with explicit distributive expansion',
  },
  {
    questionNumber: 11,
    questionId: 'u6-staar-q11',
    round: 1,
    strand: 'Identifying Values in Solution Sets',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve the inequality 5x - 7 > 2x + 8 and select all candidate values of x that belong to the solution set (x > 5)',
    itemFormat: 'Multiselect (Solution Set Verification)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Multiselect Inequality Solution Set)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C focuses on solving equations with variables on both sides; evaluating multiple candidate values in the solution set of an inequality with variables on both sides is a curriculum extension.',
    mathLabAdaptation:
      'Original 6-option multiselect item for 5x - 7 > 2x + 8 (x > 5) testing boundary exclusion (x = 5 is not a solution) and selecting x = 6, 9, and 5.5.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; reinforces strict inequality boundary reasoning in digital multiselect format',
  },
  {
    questionNumber: 12,
    questionId: 'u6-staar-q12',
    round: 1,
    strand: 'Combining Like Terms on One Side',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation requiring combining like variable terms on one side before isolating the variable across both sides (9x - 4 - 3x = 2x + 24)',
    itemFormat: 'Multiple Choice (Multi-Step Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2019 Grade 8 Mathematics Item 28 & 2023 Item 15 (TEKS 8.8C Solving Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Assesses TEKS 8.8C solving for x with variables on both sides after first simplifying 9x - 3x = 6x on the left side of the equation.',
    mathLabAdaptation:
      'Original equation 9x - 4 - 3x = 2x + 24 simplifying to 6x - 4 = 2x + 24 → 4x = 28 → x = 7.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Extends standard TEKS 8.8C ax + b = cx + d solving with a pre-simplification like-terms step',
  },

  // =========================================================================
  // ROUND 2 (Questions 13–24)
  // =========================================================================
  {
    questionNumber: 13,
    questionId: 'u6-staar-q13',
    round: 2,
    strand: 'Rational Coefficient Equations with LCM',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with fractional coefficients on both sides: (1/3)x + 5 = (5/6)x - 1',
    itemFormat: 'Multiple Choice (Fractional Coefficient Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 28 & 2021 Item 30 (TEKS 8.8C Rational Fractional Coefficient Equations)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C items featuring rational fractional coefficients on both sides of the equal sign, solved by clearing denominators or subtracting rational terms.',
    mathLabAdaptation:
      'Original fractional equation (1/3)x + 5 = (5/6)x - 1 (LCD = 6 → 2x + 30 = 5x - 6 → x = 12) with partial-multiplication distractors.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving fractional-coefficient equations with variables on both sides verified in 2019 (Item 28), 2021 (Item 30), and 2023 (Item 15)',
  },
  {
    questionNumber: 14,
    questionId: 'u6-staar-q14',
    round: 2,
    strand: 'Modeling Plan Comparisons with Tables',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable equation with variables on both sides (25h + 30 = 20h + 50) comparing two repair shops’ diagnostic fees and hourly labor rates',
    itemFormat: 'Multiple Choice (Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 27 & 2022 Item 17 (TEKS 8.8A Writing Two-Plan Comparison Equations)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches released TEKS 8.8A items where two linear fee structures are presented and students identify the equation that determines when both total charges are equal.',
    mathLabAdaptation:
      'Original electronics repair comparison (Shop A: $30 fee + $25/hr vs. Shop B: $50 fee + $20/hr) yielding 25h + 30 = 20h + 50.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing equations with variables on both sides from two-plan descriptions verified in 2018 (Item 27), 2021 (Item 21), and 2022 (Item 17)',
  },
  {
    questionNumber: 15,
    questionId: 'u6-staar-q15',
    round: 2,
    strand: 'Inequalities with Variables on Both Sides',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve an inequality with variables on both sides (-3x + 14 > 5x - 18) requiring division by a negative coefficient and symbol reversal',
    itemFormat: 'Inequality Entry (Symbol & Boundary)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Solving Inequalities with Variables on Both Sides)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C tests solving equations with variables on both sides; solving an inequality with variables on both sides and reversing the inequality symbol is an instructional extension.',
    mathLabAdaptation:
      'Original inequality-entry item -3x + 14 > 5x - 18 → -8x > -32 → x < 4.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; extends variable-on-both-sides solving to negative-division inequalities',
  },
  {
    questionNumber: 16,
    questionId: 'u6-staar-q16',
    round: 2,
    strand: 'Decimal Precision with Constant Isolation',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with decimal coefficients on both sides (0.75x - 6 = 0.25x + 4)',
    itemFormat: 'Numeric Entry (Decimal Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 22 & 2024 Item 19 (TEKS 8.8C Solving Decimal Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C items requiring students to solve equations with decimal coefficients (hundredths) and signed constants on both sides.',
    mathLabAdaptation:
      'Original numeric-entry equation 0.75x - 6 = 0.25x + 4 → 0.50x = 10 → x = 20, addressing the common misconception of multiplying vs. dividing by 0.5.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving decimal equations with variables on both sides verified in 2018 (Item 22), 2022 (Item 34), and 2024 (Item 19)',
  },
  {
    questionNumber: 17,
    questionId: 'u6-staar-q17',
    round: 2,
    strand: 'Number Line Inequalities with Reversal',
    representationCategory: 'Number Line Representation',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve the inequality 2x - 7 ≤ 6x + 9 and select the number line that represents the solution set x ≥ -4',
    itemFormat: 'Multiple Choice (Number Line)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Graphing Solutions to Inequalities with Variables on Both Sides)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C covers solving equations with variables on both sides; solving an inequality with variables on both sides and graphing its ray on a number line is not directly tested on released Grade 8 STAAR forms.',
    mathLabAdaptation:
      'Original number-line multiple-choice item for 2x - 7 ≤ 6x + 9 → -4x ≤ 16 → x ≥ -4 (closed circle at -4, shaded right).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; connects Grade 7 number-line graphing with Grade 8 variables on both sides',
  },
  {
    questionNumber: 18,
    questionId: 'u6-staar-q18',
    round: 2,
    strand: 'Situations with Decreasing Rates',
    representationCategory: 'Equation / Inequality → Real-World Story',
    teks: 'TEKS 8.8B',
    skillCategory: 'Writing Real-World Problems from Equations & Inequalities (TEKS 8.8B)',
    questionSkill:
      'Identify the real-world problem with decreasing rates that matches the equation 120 - 15w = 80 - 10w',
    itemFormat: 'Multiple Choice (Equation to Verbal Context)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 33 & 2022 Item 24 (TEKS 8.8B Matching Equations with Subtraction/Decreasing Rates to Real-World Stories)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8B items that test whether students recognize negative variable terms (-15w and -10w) as decreasing/draining rates from initial starting amounts (120 and 80).',
    mathLabAdaptation:
      'Original equation 120 - 15w = 80 - 10w matched to two draining water tanks, contrasting against filling/increasing rate distractors.',
    teksFrequency: TEKS_88B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Matching equations with decreasing rates to real-world problems verified in 2018 (Item 14), 2019 (Item 33), 2021 (Item 8), and 2022 (Item 24)',
  },
  {
    questionNumber: 19,
    questionId: 'u6-staar-q19',
    round: 2,
    strand: 'Distributive Property on Both Sides',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a multi-step equation requiring the distributive property on both sides of the equal sign: 2(3x - 4) = 5(x + 1) + 3',
    itemFormat: 'Multiple Choice (Multi-Step Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2021 Grade 8 Mathematics Item 30 & 2023 Item 15 (TEKS 8.8C Multi-Step Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Grounded in TEKS 8.8C variable-on-both-sides solving while adding distribution on both sides and constant combination prior to isolating x.',
    mathLabAdaptation:
      'Original multi-step equation 2(3x - 4) = 5(x + 1) + 3 → 6x - 8 = 5x + 8 → x = 16, including the common zero-cancellation distractor x = 0.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Builds on released TEKS 8.8C equation solving with dual-side distributive expansion for Algebra I readiness',
  },
  {
    questionNumber: 20,
    questionId: 'u6-staar-q20',
    round: 2,
    strand: '"At Least" Inequality Modeling',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable inequality with variables on both sides (20w + 35 ≥ 15w + 65) to model when one savings balance is "at least" another',
    itemFormat: 'Multiple Choice (Inequality Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 6 & 2023 Item 29 (TEKS 8.8A Writing One-Variable Inequalities with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8A items where students translate two initial amounts and weekly rates along with an inequality relational phrase ("at least" → ≥) into a symbolic inequality.',
    mathLabAdaptation:
      'Original savings comparison (Leo: $35 + $20/week vs. Kendra: $65 + $15/week) modeling 20w + 35 ≥ 15w + 65 with ≤, >, and swapped-coefficient distractors.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing one-variable inequalities with variables on both sides verified in 2019 (Item 6), 2022 (Item 17), and 2023 (Item 29)',
  },
  {
    questionNumber: 21,
    questionId: 'u6-staar-q21',
    round: 2,
    strand: 'Rational Equations with Common Multiples',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with fractional coefficients on both sides: (3/4)x - 2 = (1/2)x + 3',
    itemFormat: 'Numeric Entry (Fractional Coefficient Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 28 & 2021 Item 30 (TEKS 8.8C Solving Rational Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches released TEKS 8.8C items where fractional coefficients (halves and fourths) appear on both sides of the equal sign.',
    mathLabAdaptation:
      'Original numeric-entry equation (3/4)x - 2 = (1/2)x + 3 → (1/4)x = 5 → x = 20.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving fractional-coefficient equations with variables on both sides verified in 2019 (Item 28), 2021 (Item 30), and 2023 (Item 15)',
  },
  {
    questionNumber: 22,
    questionId: 'u6-staar-q22',
    round: 2,
    strand: 'Evaluating Solution Sets of Inequalities',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve the inequality -2x + 6 ≤ -10 and select all values of x that make the inequality true (x ≥ 8)',
    itemFormat: 'Multiselect (Solution Set Verification)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Multiselect Inequality Solution Set with Symbol Reversal)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C focuses on solving equations; solving a two-step inequality with negative division and selecting multiple valid solutions is an instructional extension.',
    mathLabAdaptation:
      'Original 6-option multiselect item for -2x + 6 ≤ -10 → x ≥ 8, testing inclusion of boundary x = 8 along with x = 10 and x = 12.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; reinforces inclusive boundary and sign-reversal checks',
  },
  {
    questionNumber: 23,
    questionId: 'u6-staar-q23',
    round: 2,
    strand: 'Inequality Step Error Analysis',
    representationCategory: 'Step-by-Step Error Analysis',
    teks: 'TEKS 8.8C',
    skillCategory: 'Multi-Step Equation & Inequality Error Analysis (TEKS 8.8C)',
    questionSkill:
      'Evaluate a student’s worked steps for -6x + 20 ≥ 50 and identify the failure to reverse the inequality symbol when dividing by -6',
    itemFormat: 'Multiple Choice (Step-by-Step Error Analysis)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Inequality Symbol-Reversal Error Analysis)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C assesses solving equations with variables on both sides; step-by-step error analysis of inequality symbol reversal when dividing by a negative coefficient is not directly assessed on released Grade 8 STAAR forms.',
    mathLabAdaptation:
      'Original diagnostic work sample (-6x + 20 ≥ 50 → Step 1: -6x ≥ 30 → Step 2: x ≥ -5) targeting the most common student misconception in inequality solving.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; included for targeted misconception diagnosis',
  },
  {
    questionNumber: 24,
    questionId: 'u6-staar-q24',
    round: 2,
    strand: 'Interpreting Solutions in Real-World Context',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Equations with Variables on Both Sides (TEKS 8.8C)',
    questionSkill:
      'Model and solve a real-world word problem with variables on both sides (18h + 14 = 12h + 32) to find the number of hours where two pet-care services cost the same',
    itemFormat: 'Multiple Choice (Real-World Equation Solution)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 9, 2022 Item 34 & 2024 Item 19 (TEKS 8.8C Modeling and Solving Real-World Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C word problems where students both formulate and solve a one-variable equation comparing two linear fee schedules to find the numerical value where they are equal.',
    mathLabAdaptation:
      'Original pet-care comparison (Paws & Whiskers: $14 + $18/hr vs. Happy Tails: $32 + $12/hr) solving 18h + 14 = 12h + 32 → 6h = 18 → h = 3 hours.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Modeling and solving real-world cost-equivalence problems verified in 2018 (Item 9), 2021 (Item 12), 2022 (Item 34), and 2024 (Item 19)',
  },

  // =========================================================================
  // ROUND 3 (Questions 25–36)
  // =========================================================================
  {
    questionNumber: 25,
    questionId: 'u6-staar-q25',
    round: 3,
    strand: 'Multi-Step Rational Number Equations',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with rational fractional coefficients on both sides: (2/5)x + 7 = (1/10)x + 19',
    itemFormat: 'Numeric Entry (Fractional Coefficient Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2019 Grade 8 Mathematics Item 28 & 2023 Item 15 (TEKS 8.8C Rational Fractional Equations with Variables on Both Sides)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches released TEKS 8.8C items requiring students to solve ax + b = cx + d with rational fractional coefficients (fifths and tenths) on both sides.',
    mathLabAdaptation:
      'Original numeric-entry equation (2/5)x + 7 = (1/10)x + 19 (multiply by LCD 10 → 4x + 70 = x + 190 → 3x = 120 → x = 40).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving fractional-coefficient equations with variables on both sides verified in 2019 (Item 28), 2021 (Item 30), and 2023 (Item 15)',
  },
  {
    questionNumber: 26,
    questionId: 'u6-staar-q26',
    round: 3,
    strand: '"No More Than" Maximum Capacity Constraints',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable inequality (75c + 180 ≤ 2,400) representing a maximum weight capacity constraint',
    itemFormat: 'Multiple Choice (Inequality Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2019 Grade 8 Mathematics Item 6 & 2023 Item 29 (TEKS 8.8A Inequality Modeling — Single-Variable Side Adaptation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Translates a real-world "maximum capacity" constraint into a linear inequality (≤), though the variable c appears on only one side (75c + 180 ≤ 2,400) rather than both sides as strictly specified in TEKS 8.8A.',
    mathLabAdaptation:
      'Original freight elevator scenario (180-lb operator + 75-lb crates ≤ 2,400-lb capacity) reinforcing ≤ vs. < and ≥ translation.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Real-world inequality translation aligned to TEKS 8.8A/7.10A with a single variable term against a fixed capacity limit',
  },
  {
    questionNumber: 27,
    questionId: 'u6-staar-q27',
    round: 3,
    strand: 'Negative Multipliers & Multi-Step Expansion',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a multi-step equation with negative distributive expansion on the left and distribution plus constant combining on the right: -3(2x - 5) = 4(x + 5) - 35',
    itemFormat: 'Multiple Choice (Multi-Step Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2021 Grade 8 Mathematics Item 30 & 2023 Item 15 (TEKS 8.8C Multi-Step Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Assesses TEKS 8.8C solving with variables on both sides after expanding -3(2x - 5) = -6x + 15 and simplifying 4(x + 5) - 35 = 4x - 15.',
    mathLabAdaptation:
      'Original multi-step equation -3(2x - 5) = 4(x + 5) - 35 → -6x + 15 = 4x - 15 → 30 = 10x → x = 3, testing negative-times-negative sign accuracy.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Extends released TEKS 8.8C equation solving with signed distributive expansion on both sides',
  },
  {
    questionNumber: 28,
    questionId: 'u6-staar-q28',
    round: 3,
    strand: 'Two-Step Inequality Reversals on Number Lines',
    representationCategory: 'Number Line Representation',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve the two-step inequality -5x + 8 ≥ -22 and identify the corresponding number line graph (x ≤ 6)',
    itemFormat: 'Multiple Choice (Number Line)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Two-Step Inequality Number Line Representation)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C focuses on solving equations with variables on both sides (while Grade 7 TEKS 7.10B covers graphing two-step inequality solutions on a number line). No released Grade 8 8.8C item directly tests number-line graphing.',
    mathLabAdaptation:
      'Original number-line multiple-choice item for -5x + 8 ≥ -22 → -5x ≥ -30 → x ≤ 6 (closed circle at 6, shaded left).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; reinforces closed-circle and negative-division reversal skills',
  },
  {
    questionNumber: 29,
    questionId: 'u6-staar-q29',
    round: 3,
    strand: 'Geometric Perimeter Modeling',
    representationCategory: 'Geometric Perimeter Model',
    teks: 'TEKS 8.8A',
    skillCategory: 'Writing Equations & Inequalities from Real-World Contexts (TEKS 8.8A)',
    questionSkill:
      'Write a one-variable equation with variables on both sides modeling equal perimeters of two rectangles: 2(3x + 4) + 10 = 2(x + 10) + 14',
    itemFormat: 'Multiple Choice (Geometric Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2018 Grade 8 Mathematics Item 22 & 2021 Item 21 (TEKS 8.8A / 8.8C Geometric Perimeter Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Connects geometric perimeter modeling (P = 2l + 2w) with TEKS 8.8A writing an equation with variables on both sides when two figures have equal perimeters.',
    mathLabAdaptation:
      'Original rectangle comparison (Rectangle A: length 3x + 4, width 5; Rectangle B: length x + 10, width 7) yielding 2(3x + 4) + 10 = 2(x + 10) + 14, with semi-perimeter and area distractors.',
    teksFrequency: TEKS_88A_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Equal-perimeter geometric modeling with variables on both sides documented in released TEKS 8.8A/8.8C contexts',
  },
  {
    questionNumber: 30,
    questionId: 'u6-staar-q30',
    round: 3,
    strand: 'Rational Coefficient Inequality Solving',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable inequality with fractional coefficients on both sides: (1/2)x - 6 > (3/4)x - 9',
    itemFormat: 'Inequality Entry (Symbol & Boundary)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Rational Coefficient Inequality with Variables on Both Sides)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C assesses solving rational-coefficient equations with variables on both sides, not solving rational-coefficient inequalities.',
    mathLabAdaptation:
      'Original inequality-entry item (1/2)x - 6 > (3/4)x - 9 (multiply by 4 → 2x - 24 > 3x - 36 → -x > -12 → x < 12).',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; combines LCD fraction clearing with inequality symbol reversal',
  },
  {
    questionNumber: 31,
    questionId: 'u6-staar-q31',
    round: 3,
    strand: 'Decimal Coefficients with Negative Constants',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Rational & Decimal Coefficient Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a one-variable equation with signed decimal coefficients and constants on both sides (-1.6x + 14.4 = 0.8x - 9.6)',
    itemFormat: 'Numeric Entry (Decimal Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 22, 2022 Item 34 & 2024 Item 19 (TEKS 8.8C Solving Signed Decimal Equations)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8C items requiring students to solve ax + b = cx + d with positive and negative decimal coefficients and constants.',
    mathLabAdaptation:
      'Original numeric-entry equation -1.6x + 14.4 = 0.8x - 9.6 → 24 = 2.4x → x = 10.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving signed decimal equations with variables on both sides verified in 2018 (Item 22), 2022 (Item 34), and 2024 (Item 19)',
  },
  {
    questionNumber: 32,
    questionId: 'u6-staar-q32',
    round: 3,
    strand: 'Interpreting Inequalities as Cost Comparisons',
    representationCategory: 'Equation / Inequality → Real-World Story',
    teks: 'TEKS 8.8B',
    skillCategory: 'Writing Real-World Problems from Equations & Inequalities (TEKS 8.8B)',
    questionSkill:
      'Identify the real-world cost comparison scenario that corresponds to the given inequality 15x + 40 ≤ 20x + 10',
    itemFormat: 'Multiple Choice (Inequality to Verbal Context)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 14, 2019 Item 33 & 2022 Item 24 (TEKS 8.8B Writing Real-World Problems from Inequalities)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors released TEKS 8.8B items where an inequality with variables on both sides is given and students select the real-world story that accurately interprets the rates, initial fees, and inequality direction ("no more expensive than" → ≤).',
    mathLabAdaptation:
      'Original inequality 15x + 40 ≤ 20x + 10 matched to Plan A ($40 signup + $15/session) being no more expensive than Plan B ($10 signup + $20/session).',
    teksFrequency: TEKS_88B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Matching one-variable inequalities/equations with variables on both sides to real-world stories verified in 2018 (Item 14), 2019 (Item 33), 2021 (Item 8), and 2022 (Item 24)',
  },
  {
    questionNumber: 33,
    questionId: 'u6-staar-q33',
    round: 3,
    strand: 'Negative Values in Inequality Solution Sets',
    representationCategory: 'Symbolic Inequality & Solution Set',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving & Graphing One-Variable Inequalities (TEKS 8.8C)',
    questionSkill:
      'Solve the multi-step inequality 4(x - 2) ≥ 6x + 8 and select all negative values belonging to the solution set (x ≤ -8)',
    itemFormat: 'Multiselect (Solution Set Verification)',
    comparableReleasedStaar:
      'No Direct Released Grade 8 STAAR Match Identified (Curriculum Extension: Multi-Step Inequality Solution Set with Negative Numbers)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'No Direct Released Match: Official Grade 8 TEKS 8.8C focuses on solving equations; solving a multi-step inequality with variables on both sides and ordering negative integers below -8 (-8, -10, -12) is an Algebra I readiness extension.',
    mathLabAdaptation:
      'Original 6-option multiselect item for 4(x - 2) ≥ 6x + 8 → -2x ≥ 16 → x ≤ -8, testing whether students recognize that -10 and -12 are less than -8.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'No direct released Grade 8 STAAR item identified; targets negative number sense in inequality solution sets',
  },
  {
    questionNumber: 34,
    questionId: 'u6-staar-q34',
    round: 3,
    strand: 'Multi-Step Real-World Cost Equivalence',
    representationCategory: 'Word Problem → Equation / Inequality',
    teks: 'TEKS 8.8C',
    skillCategory: 'Solving Equations with Variables on Both Sides (TEKS 8.8C)',
    questionSkill:
      'Model and solve a real-world t-shirt vendor comparison (12t + 150 = 15t + 60) to find the number of shirts for which both vendors charge the same total cost',
    itemFormat: 'Multiple Choice (Real-World Equation Solution)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 9, 2021 Item 12 & 2024 Item 19 (TEKS 8.8C Solving Real-World Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Parallels released TEKS 8.8C real-world break-even items requiring students to set up 12t + 150 = 15t + 60 from bulleted vendor rates and solve for t = 30 shirts.',
    mathLabAdaptation:
      'Original club t-shirt order comparison (Print Pro: $150 setup + $12/shirt vs. Custom Ink: $60 setup + $15/shirt) yielding 90 = 3t → t = 30 shirts.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Real-world cost-equivalence equation solving verified across 2018, 2021, 2022, and 2024 released administrations reviewed',
  },
  {
    questionNumber: 35,
    questionId: 'u6-staar-q35',
    round: 3,
    strand: 'Sign and Constant Isolation Error Analysis',
    representationCategory: 'Step-by-Step Error Analysis',
    teks: 'TEKS 8.8C',
    skillCategory: 'Multi-Step Equation & Inequality Error Analysis (TEKS 8.8C)',
    questionSkill:
      'Identify the step and specific inverse-operation error in a student’s solution of 3x - 11 = 8x + 19',
    itemFormat: 'Multiple Choice (Step-by-Step Error Analysis)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2019 Grade 8 Mathematics Item 16 & 2022 Item 10 (TEKS 8.8C Solving Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Tests the core TEKS 8.8C algebraic isolation steps for 3x - 11 = 8x + 19, framed as a step-by-step error audit to pinpoint subtracting 11 instead of adding 11.',
    mathLabAdaptation:
      'Original four-step work sample for 3x - 11 = 8x + 19 where Step 2 correctly reaches -5x - 11 = 19, but Step 3 writes -5x = 8 instead of -5x = 30.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Core TEKS 8.8C signed constant isolation verified in released items, adapted into an error-analysis format',
  },
  {
    questionNumber: 36,
    questionId: 'u6-staar-q36',
    round: 3,
    strand: 'Multi-Step Equation with Distributive Property & Like Terms',
    representationCategory: 'Symbolic Equation (ax + b = cx + d)',
    teks: 'TEKS 8.8C',
    skillCategory: 'Distributive Property & Multi-Step Equations (TEKS 8.8C)',
    questionSkill:
      'Solve a multi-step equation combining distribution on both sides and like-term simplification: 5(2x - 3) - 4x = 2(x + 8) + 1',
    itemFormat: 'Numeric Entry (Multi-Step Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Skill: 2021 Grade 8 Mathematics Item 30 & 2023 Item 15 (TEKS 8.8C Multi-Step Equations with Variables on Both Sides)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Moderate Skill Match: Extends TEKS 8.8C solving for x with variables on both sides by requiring students to distribute and combine like terms on both sides (10x - 15 - 4x = 2x + 16 + 1 → 6x - 15 = 2x + 17) before isolating x.',
    mathLabAdaptation:
      'Original numeric-entry capstone item 5(2x - 3) - 4x = 2(x + 8) + 1 → 4x = 32 → x = 8.',
    teksFrequency: TEKS_88C_FREQ,
    questionSkillFrequency:
      'Moderate Skill Match: Synthesizes TEKS 8.8C variable-on-both-sides solving with multi-step distributive and like-term simplification',
  },
];
