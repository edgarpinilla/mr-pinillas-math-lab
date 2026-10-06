export type Unit2MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit2SkillCategory =
  | 'Unit Rate & Constant of Proportionality (y = kx)'
  | 'Proportional vs. Non-Proportional Graphs'
  | 'Proportional vs. Non-Proportional Tables'
  | 'Proportional vs. Non-Proportional Equations'
  | 'Slope & Non-Zero y-Intercept (y = mx + b)'
  | 'Direct Variation Problem Solving'
  | 'Similar Right Triangles & Slope Foundation'
  | 'Real-World Verbal Scenarios & Comparisons'
  | 'Multiple Representations Synthesis';

export interface Unit2StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // 'staar-p-q01' .. 'staar-p-q36'
  relationshipType: 'Proportional' | 'Non-Proportional';
  representationCategory:
    | 'Graph'
    | 'Table'
    | 'Equation'
    | 'Word Problem'
    | 'Multiple Representation';
  teks: 'TEKS 8.4B' | 'TEKS 8.4C' | 'TEKS 8.5E' | 'TEKS 8.5F' | 'TEKS 8.5H' | 'TEKS 8.5I' | 'TEKS 8.4A';
  skillCategory: Unit2SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit2MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit2StaarHistoricalSummary {
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
    name: Unit2SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_2_STAAR_HISTORICAL_SUMMARY: Unit2StaarHistoricalSummary = {
  unitTitle: 'Unit 2 — Proportional vs. Non-Proportional Relationships: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions (18 Proportional & 18 Non-Proportional).',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.4B',
      standardType: 'Readiness',
      description:
        'Graph proportional relationships, interpreting the unit rate as the slope of the line that models the relationship.',
      frequencySummary:
        'Readiness standard assessed across reviewed released administrations; verified items in project repository include 2026 (Items 6, 32).',
    },
    {
      code: 'TEKS 8.4C',
      standardType: 'Readiness',
      description:
        'Use data from a table or graph to determine the rate of change or slope and y-intercept in mathematical and real-world problems.',
      frequencySummary:
        'Readiness standard assessed across reviewed released administrations; verified items in project repository include 2026 (Items 8, 25).',
    },
    {
      code: 'TEKS 8.5I',
      standardType: 'Readiness',
      description:
        'Write an equation in the form y = mx + b to model a linear relationship between two quantities using verbal, numerical, tabular, and graphical representations.',
      frequencySummary:
        'Readiness standard assessed across reviewed released administrations; verified items in project repository include 2026 (Items 4, 23).',
    },
    {
      code: 'TEKS 8.5F',
      standardType: 'Supporting',
      description:
        'Distinguish between proportional and non-proportional situations using tables, graphs, and equations in the form y = kx or y = mx + b, where b ≠ 0.',
      frequencySummary:
        'Supporting standard assessed on released forms; verified item in project repository includes 2026 (Item 36).',
    },
    {
      code: 'TEKS 8.5H',
      standardType: 'Supporting',
      description:
        'Identify examples of proportional and non-proportional functions that arise from mathematical and real-world problems.',
      frequencySummary:
        'Supporting standard assessed on released forms; verified item in project repository includes 2026 (Item 10 Match Table Grid).',
    },
    {
      code: 'TEKS 8.5E',
      standardType: 'Supporting',
      description: 'Solve problems involving direct variation.',
      frequencySummary:
        'Supporting standard assessed on released forms; verified item in project repository includes 2026 (Item 12).',
    },
    {
      code: 'TEKS 8.4A',
      standardType: 'Supporting',
      description:
        'Use similar right triangles to develop an understanding that slope, m, given as the rate comparing the change in y-values to the change in x-values, (y₂ - y₁)/(x₂ - x₁), is the same for any two points on the same line.',
      frequencySummary:
        'Supporting standard assessed on released forms; verified item in project repository includes 2026 (Item 17).',
    },
  ],
  skillCategories: [
    {
      name: 'Unit Rate & Constant of Proportionality (y = kx)',
      description:
        'Determining unit rate k = y/x from proportional coordinate graphs through (0, 0), identifying the unit rate point (1, r), and comparing unit rates.',
    },
    {
      name: 'Proportional vs. Non-Proportional Graphs',
      description:
        'Distinguishing proportional lines passing through the origin (0, 0) from non-proportional lines with non-zero vertical intercepts (0, b).',
    },
    {
      name: 'Proportional vs. Non-Proportional Tables',
      description:
        'Testing data tables for a constant ratio y/x across all ordered pairs versus tables with non-zero starting values at x = 0.',
    },
    {
      name: 'Proportional vs. Non-Proportional Equations',
      description:
        'Classifying linear equations in direct variation form y = kx (b = 0) versus slope-intercept form y = mx + b (b ≠ 0) and equivalent factored forms.',
    },
    {
      name: 'Slope & Non-Zero y-Intercept (y = mx + b)',
      description:
        'Calculating constant rates of change m and interpreting initial values b from non-proportional tables, graphs, ordered pairs, and real-world contexts.',
    },
    {
      name: 'Direct Variation Problem Solving',
      description:
        'Calculating the constant of proportionality k = y/x in direct variation relationships and solving for missing input or output values.',
    },
    {
      name: 'Similar Right Triangles & Slope Foundation',
      description:
        'Setting up equivalent rise-over-run proportions from similar right triangles along a graphed line to prove slope is constant.',
    },
    {
      name: 'Real-World Verbal Scenarios & Comparisons',
      description:
        'Classifying real-world membership fees, hourly wages, transportation fares, and comparing competing linear pricing plans.',
    },
    {
      name: 'Multiple Representations Synthesis',
      description:
        'Connecting and comparing tables, coordinate graphs, verbal descriptions, and equations across proportional and non-proportional models.',
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

const TEKS_84B_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items in repository: 2026 Items 6 & 32)';
const TEKS_84C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items in repository: 2026 Items 8 & 25)';
const TEKS_85I_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items in repository: 2026 Items 4 & 23)';
const TEKS_85F_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item in repository: 2026 Item 36)';
const TEKS_85H_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item in repository: 2026 Item 10)';
const TEKS_85E_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item in repository: 2026 Item 12)';
const TEKS_84A_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item in repository: 2026 Item 17)';

export const UNIT_2_STAAR_REFERENCE_DATA: Unit2StaarQuestionReference[] = [
  // =========================================================================
  // SECTION 1: GRAPH-BASED QUESTIONS (Q1–Q8)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'staar-p-q01',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4B',
    skillCategory: 'Unit Rate & Constant of Proportionality (y = kx)',
    questionSkill:
      'Determine the unit rate (miles per hour) from a proportional coordinate graph passing through the origin (0, 0)',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 6 & Item 32 (TEKS 8.4B Unit Rate as Slope on a Proportional Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Items 6 and 32, where students connect a proportional coordinate graph passing through (0, 0) to the unit rate k = y/x.',
    mathLabAdaptation:
      'Original cyclist training distance graph passing through (0, 0), (1, 14), and (4, 56) to find the unit rate of 14 miles per hour.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Interpreting unit rate as slope on a proportional graph verified in 2026 (Items 6 & 32) released administration reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'staar-p-q02',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Graphs',
    questionSkill:
      'Compare two graphed lines to explain why only the line passing through the origin (0, 0) represents a proportional relationship',
    itemFormat: 'Multiple Choice (Dual-Line Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 6 (TEKS 8.4B Origin Rule) & Item 36 (TEKS 8.5F Proportional vs. Non-Proportional Contrast)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines TEKS 8.5F (distinguishing proportional vs. non-proportional representations) with the graphical origin criterion from 2026 Item 6 by contrasting y = 3x through (0, 0) against y = 3x + 6 through (0, 6).',
    mathLabAdaptation:
      'Original dual-line coordinate plane comparing Line A (y = 3x) passing through (0, 0) and parallel Line B (y = 3x + 6) with y-intercept (0, 6).',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Graphical origin requirement (0, 0) vs. non-zero y-intercept verified in 2026 (Items 6, 25, 36)',
  },
  {
    questionNumber: 3,
    questionId: 'staar-p-q03',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Determine the slope and non-zero y-intercept from a real-world coordinate graph to identify the linear equation y = mx + b',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 25 (TEKS 8.4C Slope & y-Intercept from Graph) & Item 23 (TEKS 8.5I y = mx + b)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 25 (reading slope and non-zero y-intercept from a coordinate graph) combined with writing the slope-intercept equation y = mx + b.',
    mathLabAdaptation:
      'Original lakeside kayak rental graph passing through (0, 20), (2, 40), (4, 60), and (6, 80) modeled by y = 10x + 20.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Reading slope and non-zero y-intercept from a linear graph verified in 2026 (Item 25) released administration reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'staar-p-q04',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4A',
    skillCategory: 'Similar Right Triangles & Slope Foundation',
    questionSkill:
      'Identify the rise-over-run proportion from two similar right triangles along a graphed line that demonstrates constant slope',
    itemFormat: 'Multiple Choice (Coordinate Graph with Slope Triangles)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 17 (TEKS 8.4A Similar Right Triangles & Constant Slope Proportion)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches 2026 STAAR Item 17, where students set up a proportion comparing vertical change to horizontal change across two similar right triangles drawn along the same line.',
    mathLabAdaptation:
      'Original graphed line y = 2.5x with two similar right slope triangles (Rise = 5, Run = 2 and Rise = 10, Run = 4) forming the proportion 5/2 = 10/4.',
    teksFrequency: TEKS_84A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Similar right triangle slope proportions verified in 2026 (Item 17) released administration reviewed',
  },
  {
    questionNumber: 5,
    questionId: 'staar-p-q05',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4B',
    skillCategory: 'Unit Rate & Constant of Proportionality (y = kx)',
    questionSkill:
      'Calculate and compare the unit rates (speeds) of two proportional lines graphed on the same coordinate plane',
    itemFormat: 'Multiple Choice (Dual-Line Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 6 & Item 32 (TEKS 8.4B Unit Rate as Slope on a Coordinate Graph)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Extends the TEKS 8.4B unit-rate-as-slope skill verified in 2026 Items 6 and 32 by having students calculate two proportional slopes on the same grid and compare their rates.',
    mathLabAdaptation:
      'Original coordinate graph comparing two motorized robot cars—Car 1 through (5, 30) at 6 m/s and Car 2 through (8, 32) at 4 m/s.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Unit rate from proportional graphs verified in 2026 (Items 6 & 32) released administration reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'staar-p-q06',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Interpret the real-world meaning of the non-zero y-intercept (0, b) on a linear coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 & Item 25 (TEKS 8.4C Initial Value / y-Intercept Interpretation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Parallels 2026 STAAR Item 8 (identifying the original starting amount at x = 0) and Item 25 (locating the y-intercept on a coordinate graph).',
    mathLabAdaptation:
      'Original rainwater harvesting tank graph starting at (0, 40) and rising through (4, 100) and (8, 160), interpreting (0, 40) as the 40 gallons already in the tank before the storm.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Initial value (y-intercept) and graphical intercept identification verified in 2026 (Items 8 & 25)',
  },
  {
    questionNumber: 7,
    questionId: 'staar-p-q07',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Graphs',
    questionSkill:
      'Explain why a real-world linear graph with a non-zero initial fee at (0, 30) represents a non-proportional relationship',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 25 (TEKS 8.4C Non-Zero y-Intercept Graph) & Item 36 (TEKS 8.5F Non-Proportional Criteria)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes TEKS 8.5F non-proportional classification (2026 Item 36) with reading a non-zero vertical intercept on a coordinate grid (2026 Item 25).',
    mathLabAdaptation:
      'Original appliance repair technician graph starting at (0, 30) with $10/hr slope, demonstrating why b = 30 ≠ 0 makes y/x non-constant.',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Distinguishing proportional vs. non-proportional relationships verified in 2026 (Items 10 & 36)',
  },
  {
    questionNumber: 8,
    questionId: 'staar-p-q08',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4B',
    skillCategory: 'Unit Rate & Constant of Proportionality (y = kx)',
    questionSkill:
      'Identify and interpret the unit rate ordered pair (1, r) on a proportional coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 6 & Item 32 (TEKS 8.4B Unit Rate on a Proportional Graph)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the TEKS 8.4B graphical unit rate concept tested in 2026 Items 6 and 32, focusing specifically on identifying the point (1, 15) as the unit rate per 1 dozen.',
    mathLabAdaptation:
      'Original gourmet bakery cookie pricing graph passing through (0, 0), (1, 15), (3, 45), and (5, 75), highlighting (1, 15) as $15 for 1 dozen cookies.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Graphical unit rate interpretation verified in 2026 (Items 6 & 32) released administration reviewed',
  },

  // =========================================================================
  // SECTION 2: TABLE / DATA QUESTIONS (Q9–Q14)
  // =========================================================================
  {
    questionNumber: 9,
    questionId: 'staar-p-q09',
    relationshipType: 'Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Tables',
    questionSkill:
      'Identify which table of values represents a proportional relationship by verifying a constant ratio y/x across all rows',
    itemFormat: 'Multiple Choice (Multi-Table Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 36 (TEKS 8.5F Identifying Proportional Relationships in Tabular Data)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches 2026 STAAR Item 36, where students evaluate four data tables to identify the table with a constant quotient y/x while rejecting non-proportional additive distractors.',
    mathLabAdaptation:
      'Original 4-column table comparison where Table A has constant ratio y/x = 3.5 across x = [2, 4, 6, 8] and y = [7, 14, 21, 28].',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Identifying proportional relationships in tables verified in 2026 (Item 36) released administration reviewed',
  },
  {
    questionNumber: 10,
    questionId: 'staar-p-q10',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Determine the slope (m) and y-intercept (b) directly from a table representing a non-proportional linear relationship',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate of Change & Initial Value from Table) & Item 4 (TEKS 8.5I)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 8 and Item 4, where students calculate the constant rate of change m = Δy/Δx and identify the initial value b at x = 0 from a linear table.',
    mathLabAdaptation:
      'Original data table with ordered pairs (0, 14), (2, 24), (5, 39), and (8, 54) yielding slope m = 5 and y-intercept b = 14.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining rate of change and initial value from a linear table verified in 2026 (Items 4 & 8)',
  },
  {
    questionNumber: 11,
    questionId: 'staar-p-q11',
    relationshipType: 'Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.5E',
    skillCategory: 'Direct Variation Problem Solving',
    questionSkill:
      'Calculate the constant of proportionality k = y/x from a real-world table with decimal inputs',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 12 (TEKS 8.5E Direct Variation Constant of Proportionality) & Item 36 (TEKS 8.5F)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses calculating the constant of proportionality k = y/x in a direct variation relationship (2026 Item 12) presented in a tabular format.',
    mathLabAdaptation:
      'Original agricultural irrigation table with decimal time values (2.5, 4.0, 7.5, 10.0 min) and water volumes (45, 72, 135, 180 gal) yielding k = 18 gal/min.',
    teksFrequency: TEKS_85E_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Constant of proportionality calculation verified in 2026 (Items 12 & 36) released administration reviewed',
  },
  {
    questionNumber: 12,
    questionId: 'staar-p-q12',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Determine the slope and initial value from a non-proportional linear table to extrapolate a missing output value',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate of Change & Initial Value from Linear Table)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the exact table-analysis workflow of 2026 STAAR Item 8—finding rate of change m = (17 - 11)/(3 - 1) = 3 and initial value b = 8 from non-zero x-entries—then evaluates y at x = 10.',
    mathLabAdaptation:
      'Original non-proportional table with (1, 11), (3, 17), (6, 26), and (10, ?) modeled by y = 3x + 8 to find y = 38.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Finding slope and initial value from a table without x = 0 given verified in 2026 (Item 8)',
  },
  {
    questionNumber: 13,
    questionId: 'staar-p-q13',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Tables',
    questionSkill:
      'Explain why a decreasing linear table with a non-zero starting balance at x = 0 is non-proportional',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 36 (TEKS 8.5F Tabular Proportionality) & Item 8 (TEKS 8.4C Initial Value)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects TEKS 8.5F tabular proportionality testing (2026 Item 36) with recognizing a non-zero initial value at x = 0 (b = 50), proving y/x is not constant.',
    mathLabAdaptation:
      'Original prepaid student meal account table starting at (0, 50) and decreasing by $4 per meal through (2, 42), (5, 30), and (8, 18).',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Tabular proportionality analysis verified in 2026 (Item 36) released administration reviewed',
  },
  {
    questionNumber: 14,
    questionId: 'staar-p-q14',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Calculate a negative rate of change from a non-proportional linear table with decimal values',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate of Change from Table) & Item 25 (Negative Slope)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 8 (calculating rate of change Δy/Δx from a real-world linear table) combined with negative rate of change interpretation (2026 Item 25).',
    mathLabAdaptation:
      'Original backup generator fuel table with points (3, 38.5), (6, 29.5), (10, 17.5), and (14, 5.5) yielding m = -3 gallons per hour.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Rate of change from a linear table verified in 2026 (Item 8) released administration reviewed',
  },

  // =========================================================================
  // SECTION 3: EQUATION-FOCUSED QUESTIONS (Q15–Q22)
  // =========================================================================
  {
    questionNumber: 15,
    questionId: 'staar-p-q15',
    relationshipType: 'Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Equations',
    questionSkill:
      'Identify which linear equation represents a proportional relationship in direct variation form y = kx (b = 0)',
    itemFormat: 'Multiple Choice (Equation Classification)',
    comparableReleasedStaar:
      'TEKS 8.5F Released Equation Classification Pattern & 2026 Item 36 (Proportional vs. Non-Proportional Forms)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses the explicit TEKS 8.5F expectation of distinguishing equations in the form y = kx from non-proportional equations in the form y = mx + b (where b ≠ 0).',
    mathLabAdaptation:
      'Original equation set contrasting y = (5/8)x against y = (5/8)x + 3, y = 5x - 8, and inverse variation y = 5/(8x).',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.5F skill distinguishing y = kx from y = mx + b (b ≠ 0)',
  },
  {
    questionNumber: 16,
    questionId: 'staar-p-q16',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Interpret the real-world meaning of the negative slope (m) and positive y-intercept (b) in a given linear equation y = mx + b',
    itemFormat: 'Multiple Choice (Contextual Equation Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate & Initial Value) & Item 23 (TEKS 8.5I Contextual y = mx + b)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects the contextual meaning of rate of change m and initial value b assessed in 2026 Items 8 and 23 to interpreting the parameters of y = -2.5x + 75.',
    mathLabAdaptation:
      'Original cooling chemical solution equation y = -2.5x + 75, interpreting m = -2.5°F/min cooling rate and b = 75°F initial temperature.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Contextual rate of change and initial value verified in 2026 (Items 8 & 23) released administration reviewed',
  },
  {
    questionNumber: 17,
    questionId: 'staar-p-q17',
    relationshipType: 'Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.5E',
    skillCategory: 'Direct Variation Problem Solving',
    questionSkill:
      'Solve a direct variation problem by finding k = y/x from a given pair and evaluating y for a new x-value',
    itemFormat: 'Multiple Choice (Direct Variation Calculation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 12 (TEKS 8.5E Solving Direct Variation Problems)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches the structure of 2026 STAAR Item 12, where y varies directly with x, a pair (x, y) is given to find k = y/x, and students compute y for a second input x.',
    mathLabAdaptation:
      'Original direct variation problem where y = 36 when x = 8 (k = 4.5), solving for y = 63 when x = 14.',
    teksFrequency: TEKS_85E_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving direct variation equations for an unknown value verified in 2026 (Item 12) released administration reviewed',
  },
  {
    questionNumber: 18,
    questionId: 'staar-p-q18',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Write a linear equation in slope-intercept form C = mh + b from a verbal description with an hourly rate and one-time fee',
    itemFormat: 'Multiple Choice (Verbal-to-Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I Writing y = mx + b from Verbal Fixed + Per-Unit Costs)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 23, where students write a linear equation in the form y = mx + b from a real-world scenario combining a per-unit rate and a fixed initial fee.',
    mathLabAdaptation:
      'Original plumber pricing scenario with a $55 diagnostic service fee plus $45 per hour of repair work, modeled by C = 45h + 55.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b from verbal fixed cost + unit rate verified in 2026 (Item 23) released administration reviewed',
  },
  {
    questionNumber: 19,
    questionId: 'staar-p-q19',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.5F',
    skillCategory: 'Proportional vs. Non-Proportional Equations',
    questionSkill:
      'Distinguish a non-proportional linear equation in factored form y = 3(x + 2) from equivalent proportional equations',
    itemFormat: 'Multiple Choice (Algebraic Equivalence & Classification)',
    comparableReleasedStaar:
      'TEKS 8.5F Released Algebraic Form Classification Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses TEKS 8.5F by requiring students to simplify algebraic forms (distributing y = 3(x + 2) to y = 3x + 6) to determine whether b = 0 or b ≠ 0.',
    mathLabAdaptation:
      'Original 4-equation comparison contrasting y = 3(x + 2) = 3x + 6 against proportional forms y = (2/5)x, y/x = 7.5, and 4y = 12x.',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.5F equation classification skill across equivalent algebraic forms',
  },
  {
    questionNumber: 20,
    questionId: 'staar-p-q20',
    relationshipType: 'Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.5E',
    skillCategory: 'Direct Variation Problem Solving',
    questionSkill:
      'Evaluate a direct variation equation y = kx with a fractional constant of proportionality for a given input x',
    itemFormat: 'Multiple Choice (Direct Variation Evaluation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 12 (TEKS 8.5E Fractional Direct Variation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Parallels the fractional direct-variation computation in 2026 STAAR Item 12 (where k = 8/27 is multiplied by x to find y).',
    mathLabAdaptation:
      'Original direct variation equation y = (4/9)x evaluated at x = 63 to find y = 28.',
    teksFrequency: TEKS_85E_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Direct variation with fractional rate verified in 2026 (Item 12) released administration reviewed',
  },
  {
    questionNumber: 21,
    questionId: 'staar-p-q21',
    relationshipType: 'Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Proportional vs. Non-Proportional Equations',
    questionSkill:
      'Compare the rates of change, initial values, and proportionality of two linear equations y = 6x and y = 4x + 15',
    itemFormat: 'Multiple Choice (Comparative Equation Analysis)',
    comparableReleasedStaar:
      'TEKS 8.4C & TEKS 8.5F Comparative Linear Equations Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Synthesizes TEKS 8.4C (identifying slope m and y-intercept b) with TEKS 8.5F (distinguishing proportional y = kx from non-proportional y = mx + b).',
    mathLabAdaptation:
      'Original side-by-side comparison of Equation 1 (y = 6x, proportional, m = 6, b = 0) and Equation 2 (y = 4x + 15, non-proportional, m = 4, b = 15).',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.4C / 8.5F skill comparing slope and y-intercept across linear equations',
  },
  {
    questionNumber: 22,
    questionId: 'staar-p-q22',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Equation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Write a non-proportional linear equation y = mx + b given two ordered pairs including the y-intercept (0, b)',
    itemFormat: 'Multiple Choice (Ordered Pairs to Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 (TEKS 8.5I Equation from Points Including (0, b)) & Item 8 (TEKS 8.4C)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 4, where students use ordered pairs including (0, b) to compute slope m = (y₂ - y₁)/(x₂ - x₁) and write y = mx + b.',
    mathLabAdaptation:
      'Original ordered pairs (0, 18) and (5, 48) yielding b = 18 and m = (48 - 18)/(5 - 0) = 6 for the equation y = 6x + 18.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b from coordinate pairs including (0, b) verified in 2026 (Item 4) released administration reviewed',
  },

  // =========================================================================
  // SECTION 4: REAL-WORLD WORD PROBLEMS (Q23–Q32)
  // =========================================================================
  {
    questionNumber: 23,
    questionId: 'staar-p-q23',
    relationshipType: 'Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5H',
    skillCategory: 'Real-World Verbal Scenarios & Comparisons',
    questionSkill:
      'Identify which real-world membership pricing plan represents a proportional relationship with zero upfront fee',
    itemFormat: 'Multiple Choice (Verbal Scenario Classification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 10 (TEKS 8.5H Classifying Proportional vs. Non-Proportional Real-World Situations)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 10, where students evaluate four real-world pricing descriptions and classify which represent proportional relationships (constant rate per unit, $0 fixed fee) versus non-proportional relationships.',
    mathLabAdaptation:
      'Original comparison of four fitness gym plans where Gym 1 charges $29/month with $0 enrollment fee (y = 29x).',
    teksFrequency: TEKS_85H_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Classifying real-world pricing scenarios as proportional vs. non-proportional verified in 2026 (Item 10) released administration reviewed',
  },
  {
    questionNumber: 24,
    questionId: 'staar-p-q24',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Calculate total cost in a real-world non-proportional linear scenario with a daily base fee and per-mile rate',
    itemFormat: 'Multiple Choice (Real-World Linear Problem Solving)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I Base Fee + Unit Rate Model)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same real-world linear structure as 2026 STAAR Item 23 (fixed base fee plus constant per-unit charge) and evaluates the total cost for a given input.',
    mathLabAdaptation:
      'Original moving truck rental with a $29.95 daily fee plus $0.45/mile evaluated for 120 miles ($83.95).',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Fixed fee plus unit rate linear modeling verified in 2026 (Item 23) released administration reviewed',
  },
  {
    questionNumber: 25,
    questionId: 'staar-p-q25',
    relationshipType: 'Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5H',
    skillCategory: 'Real-World Verbal Scenarios & Comparisons',
    questionSkill:
      'Identify which employee wage structure represents total weekly pay that is directly proportional to hours worked',
    itemFormat: 'Multiple Choice (Verbal Scenario Classification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 10 (TEKS 8.5H Real-World Proportional vs. Non-Proportional Classification)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 10 by evaluating four verbal payment policies to distinguish a constant hourly rate through (0, 0) from base salaries, tiered rates, or flat deductions.',
    mathLabAdaptation:
      'Original comparison of four employee pay structures where Elena earns a flat $17.50 per hour (y = 17.50x) with no base salary or fee.',
    teksFrequency: TEKS_85H_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verbal proportional vs. non-proportional situation classification verified in 2026 (Item 10) released administration reviewed',
  },
  {
    questionNumber: 26,
    questionId: 'staar-p-q26',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Determine the negative rate of change and positive y-intercept from a decreasing linear coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 25 (TEKS 8.4C Negative Slope & Positive y-Intercept from a Coordinate Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 25, where a decreasing line is graphed from its y-intercept (0, b) down to its x-intercept (a, 0) and students identify the negative slope and y-intercept without confusing the two intercepts.',
    mathLabAdaptation:
      'Original delivery van fuel graph passing through (0, 24) and (8, 0) with rate of change -3 gal/hr and y-intercept (0, 24), including the x-intercept (8, 0) distractor.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Identifying negative slope and non-zero y-intercept from a graph verified in 2026 (Item 25) released administration reviewed',
  },
  {
    questionNumber: 27,
    questionId: 'staar-p-q27',
    relationshipType: 'Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5E',
    skillCategory: 'Direct Variation Problem Solving',
    questionSkill:
      'Solve a real-world direct variation problem for the unknown input value given a proportional pair',
    itemFormat: 'Multiple Choice (Real-World Direct Variation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 12 (TEKS 8.5E Solving Direct Variation Problems)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 12 by requiring students to determine the constant of proportionality from a given pair in a direct variation situation and solve for the unknown quantity.',
    mathLabAdaptation:
      'Original Hooke’s Law spring context where 16 kg stretches a spring 5.6 cm (k = 0.35 cm/kg), solving for the 30 kg mass needed to stretch it 10.5 cm.',
    teksFrequency: TEKS_85E_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Direct variation problem solving verified in 2026 (Item 12) released administration reviewed',
  },
  {
    questionNumber: 28,
    questionId: 'staar-p-q28',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Write a linear equation with a negative rate of change and positive initial value from a verbal draining scenario',
    itemFormat: 'Multiple Choice (Verbal-to-Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I Verbal to Linear Equation) & Item 25 (Negative Rate of Change)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Combines verbal-to-equation linear modeling (2026 Item 23) with a decreasing rate of change from an initial starting quantity (2026 Item 25).',
    mathLabAdaptation:
      'Original swimming pool draining problem starting at 12,000 gallons and draining at 400 gallons/hour, modeled by W = 12,000 - 400t.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing linear equations from verbal descriptions verified in 2026 (Item 23) released administration reviewed',
  },
  {
    questionNumber: 29,
    questionId: 'staar-p-q29',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5H',
    skillCategory: 'Real-World Verbal Scenarios & Comparisons',
    questionSkill:
      'Classify a real-world taxi fare with an initial pickup fee plus per-mile rate as non-proportional and justify why',
    itemFormat: 'Multiple Choice (Verbal Scenario Classification & Justification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 10 (TEKS 8.5H Real-World Proportional vs. Non-Proportional Situations)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the core TEKS 8.5H concept tested in 2026 Item 10—recognizing that a fixed upfront fee ($3.75 at 0 miles) creates a non-zero y-intercept and a non-proportional relationship.',
    mathLabAdaptation:
      'Original city taxi scenario ($3.75 pickup fee + $2.40/mile) explaining why b = 3.75 ≠ 0 makes the relationship non-proportional.',
    teksFrequency: TEKS_85H_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Real-world proportional vs. non-proportional classification verified in 2026 (Item 10) released administration reviewed',
  },
  {
    questionNumber: 30,
    questionId: 'staar-p-q30',
    relationshipType: 'Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4B',
    skillCategory: 'Unit Rate & Constant of Proportionality (y = kx)',
    questionSkill:
      'Calculate and compare unit prices (dollars per pound) from two proportional store pricing offers',
    itemFormat: 'Multiple Choice (Unit Rate Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 32 (TEKS 8.4B Calculating Unit Rate from Verbal Quantities)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the unit-rate calculation skill from 2026 STAAR Item 32 (dividing total quantity by units to find the unit rate) to compare two proportional bulk pricing options.',
    mathLabAdaptation:
      'Original almond pricing comparison between Store A (6 lbs for $27.00 → $4.50/lb) and Store B (10 lbs for $42.50 → $4.25/lb).',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Unit rate calculation from verbal rate verified in 2026 (Items 6 & 32) released administration reviewed',
  },
  {
    questionNumber: 31,
    questionId: 'staar-p-q31',
    relationshipType: 'Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4B',
    skillCategory: 'Unit Rate & Constant of Proportionality (y = kx)',
    questionSkill:
      'Determine the constant of proportionality k and direct variation equation y = kx from a proportional coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 6 & Item 32 (TEKS 8.4B Unit Rate / Slope on a Proportional Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Items 6 and 32, where students connect a proportional line through (0, 0) to its constant rate of change k = y/x and direct variation equation y = kx.',
    mathLabAdaptation:
      'Original solar panel production graph passing through (0, 0), (2, 48), (4, 96), and (6, 144) with k = 24 panels/hr and equation y = 24x.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Proportional graph unit rate and slope verified in 2026 (Items 6 & 32) released administration reviewed',
  },
  {
    questionNumber: 32,
    questionId: 'staar-p-q32',
    relationshipType: 'Proportional',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4C',
    skillCategory: 'Real-World Verbal Scenarios & Comparisons',
    questionSkill:
      'Determine the break-even input value x where a non-proportional plan (y = mx + b) and a proportional plan (y = kx) charge the same total',
    itemFormat: 'Multiple Choice (Comparative Linear Plans)',
    comparableReleasedStaar:
      'TEKS 8.4C / 8.5I / 8.8C Multi-Standard Linear Comparison Synthesis',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes modeling a non-proportional plan (y = 6x + 25) and a proportional plan (y = 11x) with finding their equal-cost point (x = 5 GB).',
    mathLabAdaptation:
      'Original mobile carrier comparison setting Carrier X (6x + 25) equal to Carrier Y (11x) to find x = 5 gigabytes.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Multi-standard synthesis connecting Unit 2 proportional/non-proportional models to linear equation comparison',
  },

  // =========================================================================
  // SECTION 5: MULTIPLE-REPRESENTATION & COMPARISON QUESTIONS (Q33–Q36)
  // =========================================================================
  {
    questionNumber: 33,
    questionId: 'staar-p-q33',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Slope & Non-Zero y-Intercept (y = mx + b)',
    questionSkill:
      'Write a linear equation in the form y = mx + b to model a non-proportional relationship shown on a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph to Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 & Item 23 (TEKS 8.5I Writing y = mx + b) & Item 25 (TEKS 8.4C Graph Slope/Intercept)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly combines 2026 STAAR Item 25 (extracting slope m and non-zero y-intercept b from a coordinate graph) with TEKS 8.5I (writing the linear equation y = mx + b, as in 2026 Items 4 and 23).',
    mathLabAdaptation:
      'Original lawn aerator daily rental graph passing through (0, 25), (2, 45), (4, 65), and (6, 85) modeled by y = 10x + 25.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b and reading graph slope/intercept verified in 2026 (Items 4, 23, 25) released administration reviewed',
  },
  {
    questionNumber: 34,
    questionId: 'staar-p-q34',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.5F',
    skillCategory: 'Multiple Representations Synthesis',
    questionSkill:
      'Identify which of four mathematical representations (equation, ordered pairs, verbal description, table) describes a non-proportional relationship',
    itemFormat: 'Multiple Choice (Multi-Representation Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 36 (TEKS 8.5F) & Item 10 (TEKS 8.5H)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes the TEKS 8.5F multi-representation standard (tables, graphs, equations) with 2026 Items 10 and 36 by testing proportionality across an equation, ordered pairs, verbal scenario, and table simultaneously.',
    mathLabAdaptation:
      'Original 4-representation display contrasting proportional models (y = 4.5x; pairs with y/x = 5; $0.40/oz oats) against Representation 4 (table starting at (0, 10)).',
    teksFrequency: TEKS_85F_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Distinguishing proportional vs. non-proportional representations verified in 2026 (Items 10 & 36)',
  },
  {
    questionNumber: 35,
    questionId: 'staar-p-q35',
    relationshipType: 'Non-Proportional',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Multiple Representations Synthesis',
    questionSkill:
      'Connect a paired data table and coordinate graph of the same non-proportional relationship to its linear equation y = mx + b',
    itemFormat: 'Multiple Choice (Paired Table & Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 (TEKS 8.5I Table to Equation) & Item 25 (TEKS 8.4C Graph Slope/Intercept)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 4 (writing y = mx + b from a table containing the y-intercept) and Item 25 (reading slope and y-intercept from a graph).',
    mathLabAdaptation:
      'Original paired table and graph passing through (0, 5), (2, 11), (4, 17), and (6, 23) modeled by y = 3x + 5.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Connecting tables, graphs, and y = mx + b equations verified in 2026 (Items 4, 8, 25)',
  },
  {
    questionNumber: 36,
    questionId: 'staar-p-q36',
    relationshipType: 'Proportional',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.5H',
    skillCategory: 'Multiple Representations Synthesis',
    questionSkill:
      'Compare two real-world savings plans modeled by y = 15x + 40 and y = 25x to explain why only the plan starting at (0, 0) is proportional',
    itemFormat: 'Multiple Choice (Comparative Verbal & Equation Analysis)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 10 (TEKS 8.5H) & Item 23 (TEKS 8.5I)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Connects TEKS 8.5H real-world proportionality classification (2026 Item 10) with comparing a non-proportional equation y = 15x + 40 (b = 40) against a proportional equation y = 25x (b = 0).',
    mathLabAdaptation:
      'Original comparison of Sofia’s savings plan (y = 15x + 40, non-proportional) and Mateo’s savings plan (y = 25x, proportional).',
    teksFrequency: TEKS_85H_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Distinguishing proportional vs. non-proportional real-world models verified in 2026 (Items 10 & 36)',
  },
];
