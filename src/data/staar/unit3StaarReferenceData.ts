export type Unit3MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit3SkillCategory =
  | 'Slope from Graph (Rise / Run)'
  | 'Slope & Rate of Change from Table'
  | 'Slope from Two Coordinate Points'
  | 'Positive, Negative, Zero & Undefined Slope'
  | 'Similar Right Triangles & Slope'
  | 'Slope-Intercept Form (y = mx + b) & y-Intercept'
  | 'Writing Linear Equations from Graphs'
  | 'Writing Linear Equations from Tables & Points'
  | 'Interpreting & Predicting with Linear Models'
  | 'Comparing Linear Relationships';

export interface Unit3StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // 'staar-slope-01' .. 'staar-slope-36'
  subtopicBank: 'Finding Slope & Rate of Change' | 'Linear Equations (y = mx + b)';
  representationCategory:
    | 'Graph'
    | 'Table'
    | 'Equation / Points'
    | 'Word Problem'
    | 'Multiple Representation';
  teks: 'TEKS 8.4A' | 'TEKS 8.4B' | 'TEKS 8.4C' | 'TEKS 8.5I';
  skillCategory: Unit3SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit3MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit3StaarHistoricalSummary {
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
    name: Unit3SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_3_STAAR_HISTORICAL_SUMMARY: Unit3StaarHistoricalSummary = {
  unitTitle: 'Unit 3 — Slope & Linear Equations: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions (18 Finding Slope & Rate of Change and 18 Linear Equations in y = mx + b form).',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.4C',
      standardType: 'Readiness',
      description:
        'Use data from a table or graph to determine the rate of change or slope and y-intercept in mathematical and real-world problems.',
      frequencySummary:
        'Readiness standard documented across reviewed released administrations; verified items include 2018 (Item 38), 2021 (Item 34), 2025 (Item 5), and 2026 (Items 8, 25).',
    },
    {
      code: 'TEKS 8.5I',
      standardType: 'Readiness',
      description:
        'Write an equation in the form y = mx + b to model a linear relationship between two quantities using verbal, numerical, tabular, and graphical representations.',
      frequencySummary:
        'Readiness standard documented across reviewed released administrations; verified items include 2023 (Item 20), 2024 (Item 5), and 2026 (Items 4, 23).',
    },
    {
      code: 'TEKS 8.4B',
      standardType: 'Readiness',
      description:
        'Graph proportional relationships, interpreting the unit rate as the slope of the line that models the relationship.',
      frequencySummary:
        'Readiness standard documented across reviewed released administrations; verified items in project repository include 2026 (Items 6, 32).',
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
      name: 'Slope from Graph (Rise / Run)',
      description:
        'Determining positive and negative integer or fractional slopes of lines graphed on a coordinate plane using vertical change over horizontal change.',
    },
    {
      name: 'Slope & Rate of Change from Table',
      description:
        'Calculating constant rates of change Δy/Δx from tabular data, including decreasing quantities, decimals, and cumulative tables.',
    },
    {
      name: 'Slope from Two Coordinate Points',
      description:
        'Applying the slope formula m = (y₂ - y₁)/(x₂ - x₁) to ordered pairs across all four quadrants and simplifying fractional ratios.',
    },
    {
      name: 'Positive, Negative, Zero & Undefined Slope',
      description:
        'Distinguishing positive and negative slopes from horizontal lines (m = 0) and vertical lines (undefined slope due to division by zero).',
    },
    {
      name: 'Similar Right Triangles & Slope',
      description:
        'Setting up proportions and difference-quotient expressions from right slope triangles whose hypotenuses lie along the same line.',
    },
    {
      name: 'Slope-Intercept Form (y = mx + b) & y-Intercept',
      description:
        'Identifying slope m and y-intercept (0, b) directly from equations, tables, and graphs, including negative intercepts.',
    },
    {
      name: 'Writing Linear Equations from Graphs',
      description:
        'Constructing y = mx + b equations from coordinate graphs with positive, negative, or fractional slopes and non-zero y-intercepts.',
    },
    {
      name: 'Writing Linear Equations from Tables & Points',
      description:
        'Determining slope m and solving for y-intercept b when x = 0 is omitted from a table, given two points, or given slope and one point.',
    },
    {
      name: 'Interpreting & Predicting with Linear Models',
      description:
        'Interpreting slope and initial value in real-world contexts and using linear models to predict outputs or determine when a quantity reaches zero.',
    },
    {
      name: 'Comparing Linear Relationships',
      description:
        'Comparing rates of change (slopes) and initial values (y-intercepts) across equations, tables, and verbal descriptions.',
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

const TEKS_84C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2018 Item 38, 2021 Item 34, 2025 Item 5, 2026 Items 8 & 25)';
const TEKS_85I_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2023 Item 20, 2024 Item 5, 2026 Items 4 & 23)';
const TEKS_84B_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2026 Items 6 & 32)';
const TEKS_84A_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item: 2026 Item 17)';

export const UNIT_3_STAAR_REFERENCE_DATA: Unit3StaarQuestionReference[] = [
  // =========================================================================
  // SUBTOPIC 1: FINDING SLOPE & RATE OF CHANGE (Q1–Q18)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'staar-slope-01',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope from Graph (Rise / Run)',
    questionSkill:
      'Determine the slope of a line from a coordinate graph using vertical rise over horizontal run between two plotted points',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2021 Grade 8 Mathematics Item 34 & 2018 Item 38 (TEKS 8.4C Slope from a Coordinate Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2021 STAAR Item 34 and 2018 Item 38, where students determine the slope of a line graphed on a coordinate plane by computing vertical change divided by horizontal change.',
    mathLabAdaptation:
      'Original coordinate graph with plotted points (1, 2) and (5, 10) and visual slope triangle (Rise = 8, Run = 4) yielding m = 2.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining slope from a coordinate graph verified in 2018 (Item 38), 2021 (Item 34), 2025 (Item 5), and 2026 (Item 25) released administrations reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'staar-slope-02',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Rate of Change from Table',
    questionSkill:
      'Calculate a negative rate of change from a table representing a decreasing real-world linear relationship',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 38 & 2026 Item 8 (TEKS 8.4C Rate of Change from a Table)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2018 STAAR Item 38 and 2026 Item 8, where students calculate the constant rate of change Δy/Δx between ordered pairs in a real-world table.',
    mathLabAdaptation:
      'Original descending research drone altitude table with points (4, 142), (7, 127), (10, 112), and (13, 97) yielding -5 meters per second.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Rate of change from a linear table verified in 2018 (Item 38) and 2026 (Item 8) released administrations reviewed',
  },
  {
    questionNumber: 3,
    questionId: 'staar-slope-03',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4A',
    skillCategory: 'Similar Right Triangles & Slope',
    questionSkill:
      'Set up a proportion from two similar right triangles positioned along the same graphed line to represent constant slope',
    itemFormat: 'Multiple Choice (Coordinate Graph with Slope Triangles)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 17 (TEKS 8.4A Similar Right Triangles & Constant Slope Proportion)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches 2026 STAAR Item 17, where two similar right triangles share hypotenuses along the same line and students equate their vertical-to-horizontal leg ratios.',
    mathLabAdaptation:
      'Original coordinate graph with right triangles ABC (vertical = 6, horizontal = 4) and DEF (vertical = v, horizontal = 10) forming 6 / 4 = v / 10.',
    teksFrequency: TEKS_84A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Similar right triangle slope proportions verified in 2026 (Item 17) released administration reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'staar-slope-04',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Equation / Points',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope from Two Coordinate Points',
    questionSkill:
      'Calculate the slope of a line given two ordered pairs with negative coordinates using m = (y₂ - y₁)/(x₂ - x₁)',
    itemFormat: 'Multiple Choice (Coordinate Pairs)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2023 Grade 8 Mathematics Item 20 & 2021 Item 34 (Slope Formula between Two Ordered Pairs)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Isolates the exact two-point slope calculation m = (y₂ - y₁)/(x₂ - x₁) required in 2023 STAAR Item 20 and coordinate slope items.',
    mathLabAdaptation:
      'Original ordered pairs (-3, 11) and (5, -5) testing integer subtraction with negatives to find m = -16 / 8 = -2.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Two-point slope computation verified in 2021 (Item 34) and 2023 (Item 20) released administrations reviewed',
  },
  {
    questionNumber: 5,
    questionId: 'staar-slope-05',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4B',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Determine the slope of a linear graph from a real-world proportional production rate',
    itemFormat: 'Multiple Choice (Real-World Verbal Rate)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 32 & Item 6 (TEKS 8.4B Unit Rate as Slope of a Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 32 (dividing 17.5 lbs by 5 hrs to find slope 3.5) and Item 6 by converting a verbal multi-unit production rate into the slope of the corresponding graph.',
    mathLabAdaptation:
      'Original commercial printing press scenario (150 concert posters every 4 minutes and 375 every 10 minutes) yielding a slope of 37.5 posters per minute.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Unit rate as slope from verbal rate descriptions verified in 2026 (Items 6 & 32) released administration reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'staar-slope-06',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Positive, Negative, Zero & Undefined Slope',
    questionSkill:
      'Identify and justify that a horizontal line on a coordinate plane has a slope of zero',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'TEKS 8.4C Released Coordinate Slope Pattern (Horizontal Line / Zero Vertical Change)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies TEKS 8.4C slope reasoning (rise / run) to the special case of a horizontal line where y₂ - y₁ = 0, distinguishing zero slope from undefined slope and the y-intercept.',
    mathLabAdaptation:
      'Original horizontal line passing through (0, -4) and (5, -4), explaining why 0 / 5 = 0.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.4C special-case slope skill (zero vs. undefined slope)',
  },
  {
    questionNumber: 7,
    questionId: 'staar-slope-07',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Rate of Change from Table',
    questionSkill:
      'Calculate a negative decimal rate of change from a real-world linear table',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 38 & 2026 Item 8 (TEKS 8.4C Rate of Change from a Table)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2018 STAAR Item 38 and 2026 Item 8 by computing the constant rate of change Δy/Δx from a table of real-world values.',
    mathLabAdaptation:
      'Original bakery flour storage table with points (2, 44.5), (5, 34.0), (8, 23.5), and (11, 13.0) yielding -3.5 pounds per batch.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Tabular rate of change verified in 2018 (Item 38) and 2026 (Item 8) released administrations reviewed',
  },
  {
    questionNumber: 8,
    questionId: 'staar-slope-08',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Equation / Points',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope from Two Coordinate Points',
    questionSkill:
      'Calculate the slope of a line passing through two given coordinate points and express it as a simplified fraction',
    itemFormat: 'Multiple Choice (Coordinate Pairs)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2021 Grade 8 Mathematics Item 34 & 2023 Item 20 (Fractional Slope from Coordinate Points)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate difference ratio m = (y₂ - y₁)/(x₂ - x₁) and fraction simplification required in 2021 Item 34 and 2023 Item 20.',
    mathLabAdaptation:
      'Original coordinate points (-2, -3) and (6, 1) yielding (1 - (-3)) / (6 - (-2)) = 4/8 = 1/2.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Fractional slope calculation verified in 2021 (Item 34), 2023 (Item 20), and 2026 (Items 4 & 25) released administrations reviewed',
  },
  {
    questionNumber: 9,
    questionId: 'staar-slope-09',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4C',
    skillCategory: 'Comparing Linear Relationships',
    questionSkill:
      'Compare the hourly rates of change of two linear relationships represented by an equation and a pair of table points',
    itemFormat: 'Multiple Choice (Cross-Representation Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate from Table) & Item 32 (TEKS 8.4B Unit Rate)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines finding the rate of change from tabular points (2026 Item 8) with interpreting the slope coefficient in a linear equation to compare two services.',
    mathLabAdaptation:
      'Original comparison between Landscaper A (c = 28h → $28/hr) and Landscaper B (points (3, 96) and (7, 224) → $32/hr).',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Rate of change calculation from tables and equations verified in 2018 (Item 38) and 2026 (Item 8)',
  },
  {
    questionNumber: 10,
    questionId: 'staar-slope-10',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope from Graph (Rise / Run)',
    questionSkill:
      'Determine a negative fractional slope of a decreasing line from a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2021 Grade 8 Mathematics Item 34, 2025 Item 5 & 2026 Item 25 (TEKS 8.4C Negative Slope from a Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2021 STAAR Item 34, 2025 Item 5, and 2026 Item 25, where students determine the negative fractional slope of a downward-sloping line on a coordinate grid.',
    mathLabAdaptation:
      'Original decreasing linear graph passing through (1, 8), (4, 6), and (7, 4) with Rise = -4 and Run = +6, simplifying to m = -2/3.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Negative fractional slope from a coordinate graph verified in 2021 (Item 34), 2025 (Item 5), and 2026 (Item 25)',
  },
  {
    questionNumber: 11,
    questionId: 'staar-slope-11',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.4B',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Identify the constant rate of change as the slope in a real-world verbal description while distinguishing it from the initial value',
    itemFormat: 'Multiple Choice (Verbal Linear Model)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate vs. Initial Value) & Item 23 (TEKS 8.5I)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Parallels 2026 STAAR Item 8 and Item 23 by requiring students to distinguish the per-minute rate of change (slope m = 45) from the starting value (y-intercept b = 1,200).',
    mathLabAdaptation:
      'Original weather balloon scenario released at 1,200 feet and ascending at 45 feet per minute.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Distinguishing rate of change from initial value verified in 2026 (Items 8 & 23) released administration reviewed',
  },
  {
    questionNumber: 12,
    questionId: 'staar-slope-12',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Rate of Change from Table',
    questionSkill:
      'Extend a linear table using its constant rate of change and y-intercept to find a missing output value',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate & Initial Value from Table) & 2018 Item 38',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the tabular slope and initial-value determination from 2026 STAAR Item 8 (m = 3, b = -5) to extend the linear pattern to x = 10.',
    mathLabAdaptation:
      'Original linear table with (-2, -11), (1, -2), (4, 7), and (10, k) modeled by y = 3x - 5 to find k = 25.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Tabular rate of change and linear rule extension verified in 2018 (Item 38) and 2026 (Item 8)',
  },
  {
    questionNumber: 13,
    questionId: 'staar-slope-13',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4C',
    skillCategory: 'Positive, Negative, Zero & Undefined Slope',
    questionSkill:
      'Identify that a vertical line on a coordinate grid has an undefined slope because the horizontal change is zero',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'TEKS 8.4C Released Coordinate Slope Pattern (Vertical Line / Undefined Slope)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses the conceptual TEKS 8.4C slope definition m = (y₂ - y₁)/(x₂ - x₁) when x₂ - x₁ = 0 on a vertical line, resulting in division by zero (undefined).',
    mathLabAdaptation:
      'Original vertical line x = -4 passing through (-4, -2) and (-4, 4), contrasting undefined slope with 0 and -4 distractors.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.4C special-case slope skill (vertical line undefined slope)',
  },
  {
    questionNumber: 14,
    questionId: 'staar-slope-14',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.4C',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Calculate the constant rate of decrease from real-world data points and determine when the remaining quantity reaches zero',
    itemFormat: 'Multiple Choice (Multi-Step Real-World Problem)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate & Initial Value) & Item 25 (Zero Intercept)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines finding the constant rate of change from two time-volume pairs (2026 Item 8) with solving for the time when the remaining volume equals 0.',
    mathLabAdaptation:
      'Original swimming pool drainage problem starting at 9,600 gallons with (3 hrs, 7,800 gal) and (7 hrs, 5,400 gal) draining at 600 gal/hr to empty in 16 hours.',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Multi-step rate of change and intercept reasoning aligned to TEKS 8.4C',
  },
  {
    questionNumber: 15,
    questionId: 'staar-slope-15',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.4C',
    skillCategory: 'Comparing Linear Relationships',
    questionSkill:
      'Compare the rates of change and proportionality of a linear equation y = 4.5x and a linear table',
    itemFormat: 'Multiple Choice (Equation vs. Table Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Table Rate/Initial Value) & Item 36 (TEKS 8.5F Proportionality)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes finding slope and initial value from a table (2026 Item 8) with distinguishing proportional (b = 0) from non-proportional (b = 2) relationships (2026 Item 36).',
    mathLabAdaptation:
      'Original comparison of Relationship P (y = 4.5x, m = 4.5, b = 0) and Relationship Q (table with (2, 11) and (6, 29) → m = 4.5, b = 2).',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Comparing rate of change and initial value across representations verified in 2026 (Items 8 & 36)',
  },
  {
    questionNumber: 16,
    questionId: 'staar-slope-16',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Table',
    teks: 'TEKS 8.4C',
    skillCategory: 'Slope & Rate of Change from Table',
    questionSkill:
      'Determine the constant rate of change from a cumulative-distance training table with non-zero starting value',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2018 Grade 8 Mathematics Item 38 & 2026 Item 8 (TEKS 8.4C Rate of Change from a Linear Table)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2018 STAAR Item 38 and 2026 Item 8, where students compute Δy/Δx from a table with non-proportional cumulative entries and avoid dividing y by x directly.',
    mathLabAdaptation:
      'Original marathon runner training table with (3, 26), (6, 47), (9, 68), and (12, 89) yielding m = 21 / 3 = 7 miles per week (with 26/3 = 8.67 distractor).',
    teksFrequency: TEKS_84C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Rate of change from a non-proportional table verified in 2018 (Item 38) and 2026 (Item 8) released administrations reviewed',
  },
  {
    questionNumber: 17,
    questionId: 'staar-slope-17',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Graph',
    teks: 'TEKS 8.4A',
    skillCategory: 'Similar Right Triangles & Slope',
    questionSkill:
      'Identify the difference-quotient expression (y₂ - y₁)/(x₂ - x₁) that calculates the slope of a line from a graphed right slope triangle',
    itemFormat: 'Multiple Choice (Coordinate Graph with Right Triangle)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 17 (TEKS 8.4A Right Triangle Slope Ratio on a Coordinate Plane)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the TEKS 8.4A right-triangle slope ratio structure tested in 2026 Item 17 by matching the vertical leg difference (15 - 3) over the horizontal leg difference (8 - 2).',
    mathLabAdaptation:
      'Original right triangle JKL on a coordinate grid with J(2, 3), L(8, 3), and K(8, 15) yielding (15 - 3) / (8 - 2) = 2.',
    teksFrequency: TEKS_84A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Right-triangle coordinate slope ratio verified in 2026 (Item 17) released administration reviewed',
  },
  {
    questionNumber: 18,
    questionId: 'staar-slope-18',
    subtopicBank: 'Finding Slope & Rate of Change',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.4B',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Interpret the meaning of the slope coefficient m in a real-world linear cost equation y = mx + b',
    itemFormat: 'Multiple Choice (Contextual Equation Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I) & Item 8 (TEKS 8.4C Rate of Change vs. Initial Value)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects the per-unit rate of change and fixed initial cost structure of 2026 STAAR Items 8 and 23 to interpreting the slope coefficient 3.25 in c = 3.25w + 14.',
    mathLabAdaptation:
      'Original package shipping equation c = 3.25w + 14, distinguishing the $3.25 per pound rate of change from the $14 fixed fee.',
    teksFrequency: TEKS_84B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Contextual rate of change vs. fixed fee verified in 2026 (Items 8 & 23) released administration reviewed',
  },

  // =========================================================================
  // SUBTOPIC 2: LINEAR EQUATIONS (y = mx + b FORM) (Q19–Q36)
  // =========================================================================
  {
    questionNumber: 19,
    questionId: 'staar-slope-19',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Graphs',
    questionSkill:
      'Identify the linear equation in y = mx + b form that represents a line graphed on a coordinate plane with a positive slope and positive y-intercept',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5 & 2025 Item 5 (TEKS 8.5I / 8.4C Slope & y-Intercept from Graph to y = mx + b)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2024 STAAR Item 5 and 2025 Item 5, where students determine the slope m and y-intercept b from a graphed line and construct the equation in y = mx + b form.',
    mathLabAdaptation:
      'Original coordinate graph passing through (0, 4), (3, 10), and (6, 16) with y-intercept b = 4 and slope m = 2, modeled by y = 2x + 4.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining slope and y-intercept from a graph to form y = mx + b verified in 2024 (Item 5), 2025 (Item 5), and 2026 (Item 25)',
  },
  {
    questionNumber: 20,
    questionId: 'staar-slope-20',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Table',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Tables & Points',
    questionSkill:
      'Write a linear equation in y = mx + b form from a table of values where x = 0 is not explicitly given',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 (TEKS 8.5I Table to y = mx + b) & Item 8 (TEKS 8.4C Extrapolating Initial Value)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 4 (writing y = mx + b from a table) and Item 8 (finding rate of change and working backward to x = 0 when (0, b) is omitted).',
    mathLabAdaptation:
      'Original table with ordered pairs (3, 17), (5, 27), (7, 37), and (9, 47) yielding m = 5 and b = 2 for y = 5x + 2.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b from a data table verified in 2026 (Items 4 & 8) released administration reviewed',
  },
  {
    questionNumber: 21,
    questionId: 'staar-slope-21',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Graphs',
    questionSkill:
      'Write a linear equation in y = mx + b form to model a real-world equipment rental graph with an initial fee and hourly rate',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5, 2025 Item 5 & 2026 Item 23 (TEKS 8.5I Linear Equation Modeling)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2024 STAAR Item 5 and 2025 Item 5 (finding m and b from a graph to write y = mx + b) in a real-world cost context similar to 2026 Item 23.',
    mathLabAdaptation:
      'Original power washer rental cost graph passing through (0, 25), (2, 55), (4, 85), and (6, 115) modeled by y = 15x + 25.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Graph-to-equation modeling in y = mx + b verified in 2024 (Item 5) and 2025 (Item 5) released administrations reviewed',
  },
  {
    questionNumber: 22,
    questionId: 'staar-slope-22',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Equation / Points',
    teks: 'TEKS 8.5I',
    skillCategory: 'Slope-Intercept Form (y = mx + b) & y-Intercept',
    questionSkill:
      'Identify the slope m and y-intercept ordered pair (0, b) directly from a linear equation with negative fractional slope and negative intercept',
    itemFormat: 'Multiple Choice (Algebraic Equation Analysis)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2025 Grade 8 Mathematics Item 5 & 2026 Item 25 (Slope and y-Intercept Identification)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses identifying the slope m and y-intercept (0, b) in y = mx + b form and distinguishing (0, -6) from the x-intercept distractor (-6, 0), as tested graphically in 2025 Item 5 and 2026 Item 25.',
    mathLabAdaptation:
      'Original equation y = -5/2 x - 6 identifying slope = -5/2 and y-intercept = (0, -6).',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Slope and y-intercept parameter identification verified in 2024 (Item 5), 2025 (Item 5), and 2026 (Item 25)',
  },
  {
    questionNumber: 23,
    questionId: 'staar-slope-23',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Graphs',
    questionSkill:
      'Write a linear equation in y = mx + b form from a decreasing coordinate graph with a negative fractional slope',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5, 2025 Item 5 & 2026 Item 25 (Negative Fractional Slope & Positive y-Intercept from Graph)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2024 Item 5, 2025 Item 5, and 2026 Item 25, where a downward-sloping line is graphed on a coordinate plane and students determine the negative fractional slope and positive y-intercept.',
    mathLabAdaptation:
      'Original downward-sloping line through (0, 9), (4, 6), and (8, 3) with m = -3/4 and b = 9, modeled by y = -3/4 x + 9.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Decreasing linear graph to slope/y-intercept/equation verified in 2024 (Item 5), 2025 (Item 5), and 2026 (Item 25)',
  },
  {
    questionNumber: 24,
    questionId: 'staar-slope-24',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Table',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Tables & Points',
    questionSkill:
      'Write a linear equation in slope-intercept form y = mx + b from a table containing negative x- and y-values',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 & 2023 Item 20 (TEKS 8.5I Linear Equation from Coordinates/Table)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 4 (table with negative inputs to y = mx + b) and 2023 Item 20 (finding slope and solving for b from coordinate pairs).',
    mathLabAdaptation:
      'Original coordinate table with (-4, -19), (-1, -7), (2, 5), and (5, 17) yielding m = 4 and b = -3 for y = 4x - 3.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b from tabular/coordinate data with negative values verified in 2023 (Item 20) and 2026 (Item 4)',
  },
  {
    questionNumber: 25,
    questionId: 'staar-slope-25',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5I',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Write a linear equation in y = mx + b form to model a real-world decreasing balance with an initial starting value',
    itemFormat: 'Multiple Choice (Verbal-to-Equation Modeling)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I Writing y = mx + b from a Verbal Scenario)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 23 by translating a verbal scenario with a starting amount and a constant per-item rate into a slope-intercept equation.',
    mathLabAdaptation:
      'Original $120 movie gift card scenario decreasing by $12.50 per ticket, modeled by b = -12.50t + 120.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Verbal description to y = mx + b equation verified in 2026 (Item 23) released administration reviewed',
  },
  {
    questionNumber: 26,
    questionId: 'staar-slope-26',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Tables & Points',
    questionSkill:
      'Determine the equation of a linear function in y = mx + b form given two coordinate points by finding the slope and y-intercept',
    itemFormat: 'Multiple Choice (Two Points to Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2023 Grade 8 Mathematics Item 20 (TEKS 8.5I Linear Equation from Two Ordered Pairs)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches 2023 STAAR Item 20, where students are given two ordered pairs on a line, compute the slope m = (y₂ - y₁)/(x₂ - x₁), solve for the y-intercept b, and write y = mx + b.',
    mathLabAdaptation:
      'Original coordinate points (-2, -9) and (4, 9) yielding slope m = 18 / 6 = 3 and y-intercept b = -3 for the equation y = 3x - 3.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b from two coordinate points verified in 2023 (Item 20) released administration reviewed',
  },
  {
    questionNumber: 27,
    questionId: 'staar-slope-27',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Determine the linear equation y = mx + b from a real-world coordinate graph and use it to predict the output for a given input',
    itemFormat: 'Multiple Choice (Coordinate Graph Prediction)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5 & 2025 Item 5 (Graph to Linear Model y = mx + b)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Extends the graph-to-equation skill of 2024 Item 5 and 2025 Item 5 (finding y = 4x + 15 from (0, 15) and (5, 35)) by evaluating the model at x = 24 guests.',
    mathLabAdaptation:
      'Original catering cost graph passing through (0, 15), (5, 35), and (10, 55) modeled by y = 4x + 15 to predict $111 for 24 guests.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Constructing y = mx + b from a graph verified in 2024 (Item 5) and 2025 (Item 5) with linear evaluation',
  },
  {
    questionNumber: 28,
    questionId: 'staar-slope-28',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Table',
    teks: 'TEKS 8.5I',
    skillCategory: 'Comparing Linear Relationships',
    questionSkill:
      'Extrapolate and compare the initial values (y-intercepts) of two linear membership plans presented in a side-by-side table',
    itemFormat: 'Multiple Choice (Comparative Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Extrapolating Initial Value at x = 0 from a Table)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Applies the exact initial-value extrapolation method of 2026 STAAR Item 8 (working backward from x = 2 to x = 0 using the rate of change) across two parallel plans and compares their starting fees.',
    mathLabAdaptation:
      'Original two-plan fitness table where both Plan A and Plan B charge $15/month, with initial sign-up fees of $20 (Plan A) and $30 (Plan B).',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Extrapolating initial value (y-intercept) from a table verified in 2026 (Item 8) released administration reviewed',
  },
  {
    questionNumber: 29,
    questionId: 'staar-slope-29',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5I',
    skillCategory: 'Slope-Intercept Form (y = mx + b) & y-Intercept',
    questionSkill:
      'Interpret the real-world meaning of the y-intercept constant b in a linear equation y = mx + b',
    itemFormat: 'Multiple Choice (Contextual Equation Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (Original Amount / Initial Value) & Item 23 (TEKS 8.5I)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects the initial-value concept tested in 2026 STAAR Item 8 ("original amount" at time 0) and Item 23 to interpreting the constant term 9 in h = -0.75t + 9.',
    mathLabAdaptation:
      'Original burning test candle equation h = -0.75t + 9, identifying 9 as the initial height in inches before burning began.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Initial value / y-intercept interpretation verified in 2026 (Items 8 & 23) released administration reviewed',
  },
  {
    questionNumber: 30,
    questionId: 'staar-slope-30',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Graphs',
    questionSkill:
      'Identify the slope-intercept equation y = mx + b from a coordinate graph with a positive fractional slope and non-zero y-intercept',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5 & 2025 Item 5 (TEKS 8.5I / 8.4C Graph to y = mx + b)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2024 STAAR Item 5 and 2025 Item 5, where students read a fractional slope m = rise/run and non-zero y-intercept b from a coordinate graph to select y = mx + b.',
    mathLabAdaptation:
      'Original coordinate graph passing through (0, 2), (4, 5), and (8, 8) with Rise = 3, Run = 4 (m = 3/4) and b = 2, modeled by y = 3/4 x + 2.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Graph with fractional slope and non-zero intercept to y = mx + b verified in 2024 (Item 5), 2025 (Item 5), and 2026 (Item 25)',
  },
  {
    questionNumber: 31,
    questionId: 'staar-slope-31',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Table',
    teks: 'TEKS 8.5I',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Determine the slope-intercept equation y = mx + b from a real-world decimal table and use it to predict the cost for a new input',
    itemFormat: 'Multiple Choice (Data Table & Prediction)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 (TEKS 8.5I Table to Equation) & Item 8 (TEKS 8.4C Table Rate/Initial Value)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines finding the rate of change (m = 40) and initial fee (b = 35) from a table (2026 Items 4 and 8) with evaluating y = 40x + 35 at x = 5 hours.',
    mathLabAdaptation:
      'Original appliance technician table with (1.5, 95), (3.0, 155), (4.5, 215), and (6.0, 275) yielding y = 40x + 35 and $235 for 5 hours.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Table-to-equation modeling verified in 2026 (Items 4 & 8) combined with linear prediction',
  },
  {
    questionNumber: 32,
    questionId: 'staar-slope-32',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Graph',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Graphs',
    questionSkill:
      'Identify the linear equation in y = mx + b form from a coordinate graph with a negative y-intercept',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 5 & 2025 Item 5 (TEKS 8.5I / 8.4C Graph to y = mx + b)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2024 STAAR Item 5 and 2025 Item 5 by requiring students to identify a negative vertical intercept (0, -4) and positive slope (m = 2) from a graph to form y = 2x - 4.',
    mathLabAdaptation:
      'Original coordinate graph passing through (0, -4), (2, 0), (4, 4), and (6, 8) modeled by y = 2x - 4.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Constructing y = mx + b from a coordinate graph verified in 2024 (Item 5) and 2025 (Item 5) released administrations reviewed',
  },
  {
    questionNumber: 33,
    questionId: 'staar-slope-33',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Equation / Points',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Tables & Points',
    questionSkill:
      'Determine the linear equation in slope-intercept form y = mx + b given the slope m and one coordinate point on the line',
    itemFormat: 'Multiple Choice (Slope & Point to Equation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2023 Grade 8 Mathematics Item 20 (TEKS 8.5I Solving for y-Intercept b to Write y = mx + b)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Isolates the second step of 2023 STAAR Item 20—substituting a known slope m and an ordered pair (x, y) into y = mx + b to solve for the y-intercept b.',
    mathLabAdaptation:
      'Original line with slope m = -3/5 passing through (10, -2), solving -2 = (-3/5)(10) + b for b = 4 to get y = -3/5 x + 4.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Solving for y-intercept b from slope and point verified in 2023 (Item 20) released administration reviewed',
  },
  {
    questionNumber: 34,
    questionId: 'staar-slope-34',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Word Problem',
    teks: 'TEKS 8.5I',
    skillCategory: 'Interpreting & Predicting with Linear Models',
    questionSkill:
      'Construct a decreasing real-world linear equation y = mx + b and determine the time when the quantity reaches zero',
    itemFormat: 'Multiple Choice (Verbal Modeling & Zero-Intercept Prediction)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 23 (TEKS 8.5I Verbal to y = mx + b) & Item 25 (Zero Intercept)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines writing a linear equation from a verbal description (2026 Item 23) with finding the x-intercept where the output reaches 0.',
    mathLabAdaptation:
      'Original aircraft descent model starting at 32,000 ft and descending at 1,600 ft/min (A = -1,600m + 32,000), landing at A = 0 in 20 minutes.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Verbal linear modeling verified in 2026 (Item 23) combined with solving for zero output',
  },
  {
    questionNumber: 35,
    questionId: 'staar-slope-35',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Table',
    teks: 'TEKS 8.5I',
    skillCategory: 'Writing Linear Equations from Tables & Points',
    questionSkill:
      'Write a linear equation in y = mx + b form from a coordinate table with a fractional slope and negative x-values',
    itemFormat: 'Multiple Choice (Data Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 4 (TEKS 8.5I Linear Table with Fractional Slope & Negative x-Values to y = mx + b)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 4, where a table of values starting at x = -6 has a positive fractional slope (m = 1/3 in Item 4; m = 1/2 here) and students determine the equation in y = mx + b form.',
    mathLabAdaptation:
      'Original coordinate table with (-6, -1), (-2, 1), (2, 3), and (6, 5) yielding fractional slope m = 1/2 and y-intercept b = 2 for y = 1/2 x + 2.',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Writing y = mx + b with fractional slope from a coordinate table verified in 2026 (Item 4) released administration reviewed',
  },
  {
    questionNumber: 36,
    questionId: 'staar-slope-36',
    subtopicBank: 'Linear Equations (y = mx + b)',
    representationCategory: 'Multiple Representation',
    teks: 'TEKS 8.5I',
    skillCategory: 'Comparing Linear Relationships',
    questionSkill:
      'Compare both the monthly rate of change (slope) and initial registration fee (y-intercept) of two real-world linear relationships given as an equation and a table',
    itemFormat: 'Multiple Choice (Cross-Representation Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 8 (TEKS 8.4C Rate & Initial Value from Table) & Item 23 (TEKS 8.5I)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes 2026 STAAR Item 8 (extracting both rate of change m = 21 and initial value b = 22 from table points (2, 64) and (5, 127)) with comparing those parameters against a slope-intercept equation y = 15x + 25.',
    mathLabAdaptation:
      'Original comparison of Subscription Service A (y = 15x + 25) and Subscription Service B (table with (2, 64) and (5, 127) → m = $21/mo, b = $22).',
    teksFrequency: TEKS_85I_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Determining and comparing both rate of change and initial value verified in 2026 (Items 4, 8, 23)',
  },
];
