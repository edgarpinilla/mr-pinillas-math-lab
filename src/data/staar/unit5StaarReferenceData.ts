export type Unit5MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit5RepresentationCategory =
  | 'Coordinate Pairs / Vertices'
  | 'Algebraic Rule (kx, ky)'
  | 'Coordinate Graph'
  | 'Data Table'
  | 'Geometric Properties & Similarity'
  | 'Perimeter & Area Scaling'
  | 'Real-World Application';

export type Unit5SkillCategory =
  | 'Identifying Scale Factor (k = Image / Pre-Image)'
  | 'Algebraic Dilation Rules (x, y) → (kx, ky)'
  | 'Coordinate Graph Dilations & Center of Dilation'
  | 'Proportionality of Corresponding Sides & Similar Figures'
  | 'Angle Preservation, Orientation & Congruence vs. Similarity'
  | 'Perimeter (k) & Area (k²) Scaling Under Dilations'
  | 'Real-World Scale Drawings, Indirect Measurement & Magnification';

export interface Unit5StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // 'staar-dil-01' .. 'staar-dil-36'
  subtopicSection:
    | 'Identify Scale Factor'
    | 'Algebraic Representation'
    | 'Coordinate Graph'
    | 'Similarity Properties'
    | 'Perimeter & Area'
    | 'Real-World Applications';
  representationCategory: Unit5RepresentationCategory;
  teks: 'TEKS 8.3C' | 'TEKS 8.3B' | 'TEKS 8.3A' | 'TEKS 8.10D' | 'TEKS 8.10A' | 'TEKS 8.10B';
  skillCategory: Unit5SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit5MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit5StaarHistoricalSummary {
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
    name: Unit5SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_5_STAAR_HISTORICAL_SUMMARY: Unit5StaarHistoricalSummary = {
  unitTitle: 'Unit 5 — Dilations & Similarity: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions covering scale factors, algebraic rules, coordinate dilations, similarity properties, perimeter/area scaling, and real-world applications.',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.3C',
      standardType: 'Readiness',
      description:
        'Use an algebraic representation to explain the effect of a given positive rational scale factor applied to two-dimensional figures on a coordinate plane with the origin as the center of dilation.',
      frequencySummary:
        'Readiness standard documented across reviewed released administrations; verified items in project repository include 2026 Grade 8 Mathematics (Items 3, 26).',
    },
    {
      code: 'TEKS 8.10D',
      standardType: 'Supporting',
      description:
        'Model the effect on linear and area measurements of dilated two-dimensional shapes.',
      frequencySummary:
        'Supporting standard documented in released administrations reviewed; verified historical reference includes 2019 Grade 8 Mathematics (Item 22 — perimeter scaling by k = 3/4).',
    },
    {
      code: 'TEKS 8.3A',
      standardType: 'Supporting',
      description:
        'Generalize that the ratio of corresponding sides of similar shapes are proportional, including a shape and its dilation.',
      frequencySummary:
        'Supporting standard documented in released administrations reviewed; verified historical reference includes 2019 Grade 8 Mathematics (Item 4 — identifying true proportions between corresponding sides of similar hexagons).',
    },
    {
      code: 'TEKS 8.3B',
      standardType: 'Supporting',
      description:
        'Compare and contrast the attributes of a shape and its dilation(s) on a coordinate plane.',
      frequencySummary:
        'Supporting standard documented in released administrations reviewed; verified historical reference includes 2022 Grade 8 Mathematics (Item 29 — proportional corresponding side lengths and attributes under dilation).',
    },
    {
      code: 'TEKS 8.10A / 8.10B',
      standardType: 'Supporting',
      description:
        'Generalize the properties of orientation and congruence of transformations (8.10A) and differentiate between transformations that preserve congruence and those that do not (8.10B).',
      frequencySummary:
        'Supporting standards documented in released administrations reviewed: TEKS 8.10A historical reference includes 2022 Grade 8 Mathematics (Item 19 — angle preservation under rotation); TEKS 8.10B reference includes 2026 Grade 8 Mathematics (Item 29 Match Table Grid — differentiating congruence-preserving transformations from dilations).',
    },
  ],
  skillCategories: [
    {
      name: 'Identifying Scale Factor (k = Image / Pre-Image)',
      description:
        'Calculating scale factor k from corresponding ordered pairs, side lengths, vertex tables, and distinguishing enlargements (k > 1) from reductions (0 < k < 1).',
    },
    {
      name: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
      description:
        'Writing and applying coordinate dilation rules centered at the origin, and distinguishing multiplicative dilation rules from additive translation rules.',
    },
    {
      name: 'Coordinate Graph Dilations & Center of Dilation',
      description:
        'Interpreting graphed pre-images and images, ray projections converging at the center of dilation (0, 0), and scaling distance from the origin.',
    },
    {
      name: 'Proportionality of Corresponding Sides & Similar Figures',
      description:
        'Setting up and solving proportions for corresponding side lengths of similar triangles and polygons produced by dilations.',
    },
    {
      name: 'Angle Preservation, Orientation & Congruence vs. Similarity',
      description:
        'Verifying that dilations preserve interior angle measures, vertex orientation, and parallelism while producing similar (non-congruent for k ≠ 1) figures.',
    },
    {
      name: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
      description:
        'Modeling how dilating a figure by scale factor k multiplies linear perimeter by k and two-dimensional area by k².',
    },
    {
      name: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
      description:
        'Applying dilation and similarity reasoning to architectural blueprints, shadow indirect measurement, map scales, and magnification.',
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

const TEKS_83C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items in repository: 2026 Grade 8 Mathematics Items 3 & 26)';
const TEKS_810D_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified TEKS 8.10D reference: 2019 Grade 8 Mathematics Item 22 — perimeter scaling by k = 3/4)';
const TEKS_83A_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified TEKS 8.3A reference: 2019 Grade 8 Mathematics Item 4 — identifying true proportions between corresponding sides of similar hexagons)';
const TEKS_83B_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified TEKS 8.3B reference: 2022 Grade 8 Mathematics Item 29 — proportional corresponding side lengths and attributes under dilation)';
const TEKS_810AB_FREQ =
  'Supporting standards documented in released administrations reviewed (TEKS 8.10A reference: 2022 Grade 8 Mathematics Item 19 — angle preservation under rotation; TEKS 8.10B reference: 2026 Grade 8 Mathematics Item 29 — congruence vs. dilation)';

export const UNIT_5_STAAR_REFERENCE_DATA: Unit5StaarQuestionReference[] = [
  // =========================================================================
  // SUBTOPIC 1: IDENTIFYING SCALE FACTOR (Q1–Q6)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'staar-dil-01',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Coordinate Pairs / Vertices',
    teks: 'TEKS 8.3C',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Determine the scale factor k of a dilation centered at the origin given a pre-image vertex and its corresponding image vertex',
    itemFormat: 'Multiple Choice (Coordinate Pairs)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Coordinate Dilation Ratio)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate-ratio reasoning as 2026 STAAR Item 3 (comparing image coordinates to pre-image coordinates to find scale factor k) while asking directly for the numerical scale factor k rather than the rule.',
    mathLabAdaptation:
      'Original triangle ABC with vertex A(4, 6) dilated to A\'(10, 15) yielding scale factor k = 10 / 4 = 2.5 (with reciprocal distractor 0.4 and additive distractor 6).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Evaluating vertex coordinate ratios for origin dilations verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'staar-dil-02',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3B',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Determine a fractional reduction scale factor k from corresponding side lengths of a pre-image rectangle and its dilated image',
    itemFormat: 'Multiple Choice (Side-Length Ratio)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C) & 2022 Grade 8 Mathematics Item 29 (TEKS 8.3B Proportional Side Lengths Under Dilation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Parallels the pre-image-to-image ratio comparison in 2026 STAAR Item 3 and the TEKS 8.3B proportional corresponding side-length relationship in 2022 STAAR Item 29, applied to corresponding side lengths (18 / 24 = 3/4 and 12 / 16 = 3/4) for a reduction.',
    mathLabAdaptation:
      'Original rectangle ABCD (24 by 16) dilated to A\'B\'C\'D\' (18 by 12) with k = 3/4 and reciprocal enlargement distractor 4/3.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Scale factor ratio from pre-image and image dimensions verified in 2026 (Item 3) and TEKS 8.3B side-length proportionality verified in 2022 (Item 29)',
  },
  {
    questionNumber: 3,
    questionId: 'staar-dil-03',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3B',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Identify which positive rational scale factor k (0 < k < 1) produces a reduction of a figure on a coordinate grid',
    itemFormat: 'Multiple Choice (Scale Factor Classification)',
    comparableReleasedStaar:
      'TEKS 8.3B Historical Reference: 2022 Grade 8 Mathematics Item 29 (Attributes of a Shape Under Dilation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2022 STAAR Item 29 verifies TEKS 8.3B attribute comparisons under dilation; this Math Lab item specifically isolates classifying rational scale factors into reductions (0 < k < 1) vs. enlargements (k > 1).',
    mathLabAdaptation:
      'Original comparison of four rational values (8/5, 5/8, 1.25, 7/4) identifying k = 5/8 = 0.625 as the only reduction.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3B verified in 2022 (Item 29); specific rational scale-factor reduction classification is a curriculum-aligned skill',
  },
  {
    questionNumber: 4,
    questionId: 'staar-dil-04',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Data Table',
    teks: 'TEKS 8.3C',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Determine the scale factor k of a dilation from a table of pre-image and image vertex coordinates across all four quadrants',
    itemFormat: 'Multiple Choice (Vertex Coordinate Table)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Determining Scale Factor k from Corresponding Coordinate Ratios)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate-ratio calculation (x\' / x and y\' / y) to determine scale factor k as 2026 STAAR Item 3, organized in a four-vertex coordinate table.',
    mathLabAdaptation:
      'Original polygon PQRS table with P(-6, 9) → P\'(-2, 3), Q(3, 12) → Q\'(1, 4), R(9, -3) → R\'(3, -1), and S(-3, -6) → S\'(-1, -2) yielding k = 1/3.',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining scale factor k from corresponding coordinate ratios verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 5,
    questionId: 'staar-dil-05',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Coordinate Pairs / Vertices',
    teks: 'TEKS 8.3C',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Determine the fractional scale factor k of a dilated line segment from its original and dilated endpoint coordinates',
    itemFormat: 'Multiple Choice (Coordinate Pairs)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Evaluating Coordinate Ratios for Scale Factor)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Parallels 2026 STAAR Item 3 by computing the ratio of dilated coordinates (6, 9) to original coordinates (8, 12) centered at the origin.',
    mathLabAdaptation:
      'Original segment with endpoint (8, 12) dilated to (6, 9) yielding k = 6/8 = 3/4.',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Coordinate ratio evaluation verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'staar-dil-06',
    subtopicSection: 'Identify Scale Factor',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3A',
    skillCategory: 'Identifying Scale Factor (k = Image / Pre-Image)',
    questionSkill:
      'Calculate the enlargement scale factor k from the diameters of a circle and its dilated image',
    itemFormat: 'Multiple Choice (Linear Dimension Ratio)',
    comparableReleasedStaar:
      'TEKS 8.3A Historical Reference: 2019 Grade 8 Mathematics Item 4 (Proportional Ratios of Corresponding Linear Dimensions)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 4 verifies TEKS 8.3A proportional ratios of corresponding dimensions in similar figures; this Math Lab item applies that ratio reasoning (k = image dimension / pre-image dimension) to circle diameters.',
    mathLabAdaptation:
      'Original Circle M (diameter 7.5 cm) dilated to Circle M\' (diameter 22.5 cm) yielding k = 22.5 / 7.5 = 3.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3A verified in 2019 (Item 4); circle-diameter scale factor calculation is a curriculum-aligned adaptation',
  },

  // =========================================================================
  // SUBTOPIC 2: ALGEBRAIC REPRESENTATIONS & COORDINATE RULES (Q7–Q12)
  // =========================================================================
  {
    questionNumber: 7,
    questionId: 'staar-dil-07',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Algebraic Rule (kx, ky)',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Identify the algebraic coordinate rule (x, y) → (kx, ky) that represents a dilation centered at the origin with a given fractional scale factor',
    itemFormat: 'Multiple Choice (Algebraic Mapping Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Algebraic Dilation Coordinate Mapping Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 3, where students identify the multiplicative algebraic rule (x, y) → (kx, ky) for a dilation centered at the origin and reject additive translation distractors.',
    mathLabAdaptation:
      'Original triangle JKL dilated by scale factor k = 5/2 represented by (x, y) → (5/2 x, 5/2 y), contrasting against additive rule (x + 5/2, y + 5/2) and reciprocal rule (2/5 x, 2/5 y).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic dilation rule identification verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 8,
    questionId: 'staar-dil-08',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Algebraic Rule (kx, ky)',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Distinguish a valid algebraic dilation rule (x, y) → (kx, ky) that preserves similarity from translations and non-uniform stretches',
    itemFormat: 'Multiple Choice (Rule Classification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C) & Item 29 (TEKS 8.10B Transformation Rules)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 3 and Item 29 by requiring students to recognize that a dilation multiplies both x and y by the exact same scale factor k.',
    mathLabAdaptation:
      'Original 4-rule comparison identifying (x, y) → (0.75x, 0.75y) over translation (x - 4, y + 6) and non-uniform stretch (0.75x, 1.25y).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Multiplicative dilation rule structure verified in 2026 (Items 3 & 29) released administration reviewed',
  },
  {
    questionNumber: 9,
    questionId: 'staar-dil-09',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Algebraic Rule (kx, ky)',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Apply an algebraic dilation rule (x, y) → (kx, ky) to a pre-image ordered pair to calculate the image vertex coordinates',
    itemFormat: 'Multiple Choice (Coordinate Calculation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 26 (TEKS 8.3C Applying Algebraic Dilation Scale Factors to Coordinates)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly matches 2026 STAAR Item 26, where students apply scale factor k multiplicatively to both coordinates of a pre-image ordered pair centered at the origin.',
    mathLabAdaptation:
      'Original rule (x, y) → (1.4x, 1.4y) applied to pre-image vertex (-5, 10) to find image vertex (-7, 14).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Applying scale factor k to ordered-pair coordinates verified in 2026 (Item 26) released administration reviewed',
  },
  {
    questionNumber: 10,
    questionId: 'staar-dil-10',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Coordinate Pairs / Vertices',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Determine a vertex of a dilated rectangle by multiplying pre-image coordinates by a fractional scale factor k = 1/4',
    itemFormat: 'Multiple Choice (Coordinate Calculation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 26 (TEKS 8.3C Applying Scale Factor to Vertex Coordinates)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 26 by applying a scale factor centered at the origin to polygon vertex coordinates.',
    mathLabAdaptation:
      'Original rectangle with vertices (0, 0), (12, 0), (12, 8), and (0, 8) dilated by k = 1/4 to identify image vertex (3, 2).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Applying scale factor k to vertex coordinates verified in 2026 (Item 26) released administration reviewed',
  },
  {
    questionNumber: 11,
    questionId: 'staar-dil-11',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Algebraic Rule (kx, ky)',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Write the algebraic dilation rule (x, y) → (kx, ky) from a known pre-image point and its dilated image point',
    itemFormat: 'Multiple Choice (Coordinate Pair to Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Determining Algebraic Dilation Rule from Coordinates)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 3, where students evaluate vertex coordinate ratios between pre-image and image to select the algebraic mapping rule (x, y) → (kx, ky).',
    mathLabAdaptation:
      'Original pre-image point W(-8, 12) mapped to W\'(-2, 3) via k = 1/4, represented by (x, y) → (1/4 x, 1/4 y).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Determining algebraic dilation rule from coordinates verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 12,
    questionId: 'staar-dil-12',
    subtopicSection: 'Algebraic Representation',
    representationCategory: 'Algebraic Rule (kx, ky)',
    teks: 'TEKS 8.3C',
    skillCategory: 'Algebraic Dilation Rules (x, y) → (kx, ky)',
    questionSkill:
      'Interpret a decimal coordinate rule (x, y) → (3.2x, 3.2y) as an origin-centered dilation resulting in an enlargement',
    itemFormat: 'Multiple Choice (Rule Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Explaining the Effect of an Algebraic Dilation Rule)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly addresses the TEKS 8.3C expectation ("use an algebraic representation to explain the effect of a given positive rational scale factor") as assessed in 2026 Item 3.',
    mathLabAdaptation:
      'Original digital logo transformation (x, y) → (3.2x, 3.2y), distinguishing an enlargement dilation from a translation or reduction.',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic dilation rule interpretation verified in 2026 (Item 3) released administration reviewed',
  },

  // =========================================================================
  // SUBTOPIC 3: COORDINATE GRAPH INTERPRETATION & DILATIONS (Q13–Q18)
  // =========================================================================
  {
    questionNumber: 13,
    questionId: 'staar-dil-13',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Coordinate Graph',
    teks: 'TEKS 8.3C',
    skillCategory: 'Coordinate Graph Dilations & Center of Dilation',
    questionSkill:
      'Determine the enlargement scale factor k of a dilated triangle graphed on a coordinate plane',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Graphed Polygon Dilation with k = 2)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 3, where a polygon and its dilated image are graphed on a coordinate plane and students compare corresponding vertex coordinates to find k = 2.',
    mathLabAdaptation:
      'Original coordinate graph of △ABC with vertices A(1, 1), B(4, 1), C(1, 3) dilated to △A\'B\'C\' at A\'(2, 2), B\'(8, 2), C\'(2, 6) with k = 2.',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Graphed coordinate dilation scale factor verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 14,
    questionId: 'staar-dil-14',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Coordinate Graph',
    teks: 'TEKS 8.3C',
    skillCategory: 'Coordinate Graph Dilations & Center of Dilation',
    questionSkill:
      'Determine the fractional reduction scale factor k of a dilated rectangle graphed on a coordinate plane',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Graphed Polygon Dilation on a Coordinate Plane)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate-graph vertex comparison as 2026 STAAR Item 3, applied to a graphical reduction from P(6, 4) to P\'(3, 2).',
    mathLabAdaptation:
      'Original coordinate graph of rectangle PQRS reduced to P\'Q\'R\'S\' with scale factor k = 1/2 (contrasting against reciprocal distractor 2).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Graphed coordinate dilation scale factor verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 15,
    questionId: 'staar-dil-15',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Coordinate Graph',
    teks: 'TEKS 8.3B',
    skillCategory: 'Coordinate Graph Dilations & Center of Dilation',
    questionSkill:
      'Identify that rays connecting corresponding vertices of a pre-image and its dilated image intersect at the center of dilation',
    itemFormat: 'Multiple Choice (Geometric Concept)',
    comparableReleasedStaar:
      'TEKS 8.3B Historical Reference: 2022 Grade 8 Mathematics Item 29 (Attributes of a Shape and Its Dilation on a Coordinate Plane)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2022 STAAR Item 29 verifies TEKS 8.3B coordinate-plane dilation attributes (evaluating proportional side lengths and dilated attributes); this Math Lab item specifically assesses ray convergence at the center of dilation.',
    mathLabAdaptation:
      'Original conceptual question on lines AA\', BB\', and CC\' intersecting at the center of dilation.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3B verified in 2022 (Item 29); ray convergence at the center of dilation is a curriculum-aligned conceptual skill',
  },
  {
    questionNumber: 16,
    questionId: 'staar-dil-16',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Coordinate Pairs / Vertices',
    teks: 'TEKS 8.3C',
    skillCategory: 'Coordinate Graph Dilations & Center of Dilation',
    questionSkill:
      'Determine the coordinates of a specific image vertex after a triangle is dilated about the origin by a decimal scale factor',
    itemFormat: 'Multiple Choice (Vertex Coordinate Calculation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 26 (TEKS 8.3C Finding Image Vertex Coordinates Under Scale Factor k)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 26, where students multiply the coordinates of a specific pre-image vertex by scale factor k centered at the origin.',
    mathLabAdaptation:
      'Original triangle DEF with E(6, 4) dilated by k = 1.5 about the origin to produce E\'(9, 6), with additive distractor (7.5, 5.5).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Finding image vertex coordinates under dilation verified in 2026 (Item 26) released administration reviewed',
  },
  {
    questionNumber: 17,
    questionId: 'staar-dil-17',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3B',
    skillCategory: 'Proportionality of Corresponding Sides & Similar Figures',
    questionSkill:
      'Compare the hypotenuse length and determine the scale factor between a right triangle and its dilation on a coordinate grid',
    itemFormat: 'Multiple Choice (Multi-Step Coordinate & Side Ratio)',
    comparableReleasedStaar:
      'TEKS 8.3B Historical Reference: 2022 Grade 8 Mathematics Item 29 (Proportional Corresponding Side Lengths Under Dilation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level & Integrated Skill Evidence: 2022 STAAR Item 29 verifies TEKS 8.3B proportional corresponding side lengths under dilation; this Math Lab item integrates right-triangle hypotenuse length (3-4-5 triangle) with side scaling (k = 15 / 5 = 3).',
    mathLabAdaptation:
      'Original right triangle ABC (legs 3 and 4, hypotenuse 5) dilated to A\'B\'C\' with hypotenuse 15 via scale factor k = 3.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3B proportional side lengths under dilation verified in 2022 (Item 29); integrated with right-triangle hypotenuse calculation',
  },
  {
    questionNumber: 18,
    questionId: 'staar-dil-18',
    subtopicSection: 'Coordinate Graph',
    representationCategory: 'Coordinate Pairs / Vertices',
    teks: 'TEKS 8.3B',
    skillCategory: 'Coordinate Graph Dilations & Center of Dilation',
    questionSkill:
      'Explain how a dilation centered at the origin scales a point’s distance from the origin multiplicatively by scale factor k',
    itemFormat: 'Multiple Choice (Coordinate Attribute Comparison)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 & Item 26 (TEKS 8.3C / 8.3B Multiplicative Coordinate Scaling)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Reinforces the multiplicative coordinate scaling principle tested in 2026 Items 3 and 26 by contrasting multiplicative distance scaling (× 1/4) against additive subtraction (- 6).',
    mathLabAdaptation:
      'Original point M(0, 8) dilated to M\'(0, 2), showing distance from the origin was multiplied by k = 1/4.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Multiplicative vs. additive dilation reasoning verified in 2026 (Items 3 & 26)',
  },

  // =========================================================================
  // SUBTOPIC 4: PROPERTIES OF SIMILAR FIGURES & PRESERVATION (Q19–Q24)
  // =========================================================================
  {
    questionNumber: 19,
    questionId: 'staar-dil-19',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3B',
    skillCategory: 'Angle Preservation, Orientation & Congruence vs. Similarity',
    questionSkill:
      'Determine the interior angle measures of a dilated triangle by recognizing that dilations preserve angle measures',
    itemFormat: 'Multiple Choice (Angle Invariance)',
    comparableReleasedStaar:
      'TEKS 8.3B Historical Reference: 2022 Grade 8 Mathematics Item 29 (Attributes of a Shape and Its Dilation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2022 STAAR Item 29 verifies TEKS 8.3B attribute comparisons under dilation (specifically proportional side lengths); this Math Lab item targets the complementary TEKS 8.3B attribute that interior angle measures remain congruent (42°, 68°, 70°) and are never multiplied by k.',
    mathLabAdaptation:
      'Original triangle GHI (42°, 68°, 70°) dilated by k = 3, addressing the common misconception of multiplying angles by 3 (126°, 204°, 210°).',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3B verified in 2022 (Item 29); angle invariance under dilation is a curriculum-aligned attribute comparison skill',
  },
  {
    questionNumber: 20,
    questionId: 'staar-dil-20',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3B',
    skillCategory: 'Angle Preservation, Orientation & Congruence vs. Similarity',
    questionSkill:
      'Compare and contrast the attributes of similar figures produced by a dilation (congruent corresponding angles and proportional side lengths)',
    itemFormat: 'Multiple Choice (Attribute Comparison)',
    comparableReleasedStaar:
      'TEKS 8.3B Historical Reference: 2022 Grade 8 Mathematics Item 29 (Proportional Corresponding Side Lengths and Attributes Under Dilation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Direct & TEKS-Level Evidence: Parallels 2022 STAAR Item 29 under TEKS 8.3B ("compare and contrast the attributes of a shape and its dilation(s)"), evaluating true statements about proportional corresponding side lengths and congruent angles.',
    mathLabAdaptation:
      'Original conceptual comparison contrasting "congruent angles and proportional sides" against swapped or all-congruent distractors.',
    teksFrequency: TEKS_83B_FREQ,
    questionSkillFrequency:
      'Direct & TEKS-Level Evidence: Attribute comparison of dilated shapes (proportional sides and angle attributes) verified in 2022 (Item 29)',
  },
  {
    questionNumber: 21,
    questionId: 'staar-dil-21',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.10B',
    skillCategory: 'Angle Preservation, Orientation & Congruence vs. Similarity',
    questionSkill:
      'Differentiate between rigid transformations that preserve congruence and a dilation (k ≠ 1) that produces a similar, non-congruent image',
    itemFormat: 'Multiple Choice (Transformation Classification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 29 (TEKS 8.10B Differentiating Transformations That Preserve Congruence)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 29, where students differentiate isometric transformations (translations, rotations, reflections) that preserve congruence from non-isometric dilations (k ≠ 1) that change size.',
    mathLabAdaptation:
      'Original 4-transformation comparison identifying a dilation with scale factor k = 2.5 as producing a similar but non-congruent figure.',
    teksFrequency: TEKS_810AB_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Congruence vs. dilation classification verified in 2026 (Item 29) released administration reviewed',
  },
  {
    questionNumber: 22,
    questionId: 'staar-dil-22',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3A',
    skillCategory: 'Proportionality of Corresponding Sides & Similar Figures',
    questionSkill:
      'Generalize that the ratios of corresponding sides of similar triangles form a true proportion',
    itemFormat: 'Multiple Choice (Symbolic Side Proportion)',
    comparableReleasedStaar:
      'TEKS 8.3A Historical Reference: 2019 Grade 8 Mathematics Item 4 (Identifying True Proportions Between Corresponding Sides of Similar Hexagons)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Direct & TEKS-Level Evidence: Parallels 2019 STAAR Item 4 under TEKS 8.3A ("generalize that the ratio of corresponding sides of similar shapes are proportional"), where students identify true proportions between corresponding sides of similar polygons.',
    mathLabAdaptation:
      'Original symbolic proportion AB / DE = BC / EF = AC / DF for △ABC ~ △DEF.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'Direct & TEKS-Level Evidence: Identifying true proportions between corresponding sides of similar shapes verified in 2019 (Item 4)',
  },
  {
    questionNumber: 23,
    questionId: 'staar-dil-23',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.3A',
    skillCategory: 'Proportionality of Corresponding Sides & Similar Figures',
    questionSkill:
      'Use proportional corresponding side ratios of a triangle and its dilation to solve for a missing side length',
    itemFormat: 'Multiple Choice (Missing Side Calculation)',
    comparableReleasedStaar:
      'TEKS 8.3A Historical Reference: 2019 Grade 8 Mathematics Item 4 (Proportional Corresponding Sides of Similar Shapes)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 4 verifies setting up true proportions between corresponding sides of similar polygons under TEKS 8.3A; this Math Lab item extends that proportion setup (RS / R\'S\' = ST / S\'T\') to solve for a missing side length.',
    mathLabAdaptation:
      'Original similar triangles △RST and △R\'S\'T\' with RS = 8 cm, ST = 12 cm, and R\'S\' = 20 cm (k = 2.5) solving for S\'T\' = 30 cm.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3A corresponding side proportions verified in 2019 (Item 4); solving for a missing side is a curriculum-aligned extension',
  },
  {
    questionNumber: 24,
    questionId: 'staar-dil-24',
    subtopicSection: 'Similarity Properties',
    representationCategory: 'Geometric Properties & Similarity',
    teks: 'TEKS 8.10A',
    skillCategory: 'Angle Preservation, Orientation & Congruence vs. Similarity',
    questionSkill:
      'Generalize that a dilation centered at the origin with a positive scale factor preserves figure orientation and parallelism of corresponding segments',
    itemFormat: 'Multiple Choice (Orientation & Parallelism Properties)',
    comparableReleasedStaar:
      'TEKS 8.10A Historical Reference: 2022 Grade 8 Mathematics Item 19 (Angle Preservation Under Rotation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2022 STAAR Item 19 provides historical TEKS 8.10A evidence (assessing angle preservation under rotation, whereas 2026 Item 29 is assigned to TEKS 8.10B). Positive-dilation orientation preservation and parallelism of corresponding segments in Q24 are curriculum-aligned TEKS 8.10A properties, not directly tested by that rotation item.',
    mathLabAdaptation:
      'Original conceptual item verifying that positive-scale-factor dilations preserve orientation and keep corresponding line segments parallel.',
    teksFrequency: TEKS_810AB_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10A verified in 2022 (Item 19 — angle preservation under rotation); positive-dilation orientation and parallelism are curriculum-aligned properties not directly tested by that item',
  },

  // =========================================================================
  // SUBTOPIC 5: PERIMETER & AREA RELATIONSHIPS UNDER DILATIONS (Q25–Q30)
  // =========================================================================
  {
    questionNumber: 25,
    questionId: 'staar-dil-25',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Model the effect of a fractional scale factor k on the linear perimeter of a dilated square (New Perimeter = k · Original Perimeter)',
    itemFormat: 'Multiple Choice (Linear Perimeter Scaling)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (Perimeter Scaling Under Fractional Scale Factor k = 3/4)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Direct & TEKS-Level Evidence: Parallels 2019 STAAR Item 22 under TEKS 8.10D, which verifies modeling the effect of a fractional scale factor (k = 3/4) on the linear perimeter of a dilated polygon.',
    mathLabAdaptation:
      'Original square with perimeter 36 inches dilated by k = 1/3 to produce a perimeter of 12 inches (with k² distractor 4 inches and reciprocal distractor 108 inches).',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'Direct & TEKS-Level Evidence: Linear perimeter scaling by a fractional scale factor k verified in 2019 (Item 22)',
  },
  {
    questionNumber: 26,
    questionId: 'staar-dil-26',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Model the effect of an enlargement scale factor k on the area of a dilated rectangle using the k² relationship (New Area = k² · Original Area)',
    itemFormat: 'Multiple Choice (Area Scaling by k²)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Linear Perimeter Scaling Reference; Area k² Component)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 verifies TEKS 8.10D via linear perimeter scaling (k = 3/4) rather than a direct area calculation; this Math Lab item assesses the complementary area-measurement half of TEKS 8.10D ("model the effect on linear and area measurements of dilated two-dimensional shapes").',
    mathLabAdaptation:
      'Original rectangle with area 20 cm² dilated by k = 4 to produce an area of 20 × 16 = 320 cm² (with linear 20 × 4 = 80 cm² distractor).',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D verified in 2019 (Item 22 for perimeter scaling); direct area scaling by k² is the complementary TEKS 8.10D skill',
  },
  {
    questionNumber: 27,
    questionId: 'staar-dil-27',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Compare how a decimal scale factor k simultaneously affects the perimeter (multiplied by k) and area (multiplied by k²) of a dilated triangle',
    itemFormat: 'Multiple Choice (Perimeter vs. Area Comparison)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Perimeter Scaling by k = 3/4; Extended to Area Comparison)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 verifies the linear perimeter scaling component of TEKS 8.10D; this Math Lab item contrasts one-dimensional perimeter scaling (k = 2.5) against two-dimensional area scaling (k² = 6.25) in the same problem.',
    mathLabAdaptation:
      'Original triangle ABC dilated by k = 2.5 comparing 2.5× perimeter and 6.25× area against 2k = 5 distractors.',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D perimeter scaling verified in 2019 (Item 22); combined perimeter (k) vs. area (k²) comparison is a TEKS 8.10D synthesis skill',
  },
  {
    questionNumber: 28,
    questionId: 'staar-dil-28',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Calculate the area of a geometric figure after a reduction dilation by a fractional scale factor k = 1/2',
    itemFormat: 'Multiple Choice (Fractional Area Scaling)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Linear Perimeter Scaling Reference; Area k² Component)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 verifies TEKS 8.10D for linear perimeter scaling (k = 3/4) rather than a direct area calculation; this Math Lab item assesses the area measurement component of TEKS 8.10D for a fractional reduction (k² = (1/2)² = 1/4).',
    mathLabAdaptation:
      'Original figure with area 72 square units dilated by k = 1/2 to produce 18 square units (with linear 36 square units distractor).',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D verified in 2019 (Item 22 for perimeter scaling); fractional area scaling by k² is the complementary TEKS 8.10D skill',
  },
  {
    questionNumber: 29,
    questionId: 'staar-dil-29',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Determine the linear scale factor k given the areas of a pre-image and its enlarged image by taking the square root of the area ratio (k = √(Area Ratio))',
    itemFormat: 'Multiple Choice (Reverse Area-to-Scale-Factor Reasoning)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Linear Scaling Reference; Reverse Area Ratio Extension)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 verifies TEKS 8.10D perimeter scaling (not a direct area-to-scale-factor calculation); this Math Lab item extends the TEKS 8.10D area relationship in reverse by finding k² = 216 / 24 = 9 and taking √9 = 3.',
    mathLabAdaptation:
      'Original 24 in² photograph enlarged to a 216 in² poster, distinguishing linear scale factor k = 3 from area ratio k² = 9.',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D verified in 2019 (Item 22 for perimeter scaling); reverse area-to-linear scale factor is a curriculum-aligned extension',
  },
  {
    questionNumber: 30,
    questionId: 'staar-dil-30',
    subtopicSection: 'Perimeter & Area',
    representationCategory: 'Perimeter & Area Scaling',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Calculate both the new perimeter and new area of a coordinate-grid rectangle dilated by a whole-number scale factor',
    itemFormat: 'Multiple Choice (Combined Perimeter & Area Calculation)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Perimeter Scaling Reference; Combined with Area k²)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 directly verifies the linear perimeter scaling component of TEKS 8.10D; this Math Lab item combines that perimeter scaling (14 × 3 = 42) with the TEKS 8.10D quadratic area scaling (12 × 3² = 108) on a coordinate grid.',
    mathLabAdaptation:
      'Original rectangle (perimeter 14, area 12) dilated by k = 3 to yield Perimeter = 42 units and Area = 108 square units.',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D perimeter scaling verified in 2019 (Item 22); combined perimeter and area calculation is a TEKS 8.10D synthesis skill',
  },

  // =========================================================================
  // SUBTOPIC 6: REAL-WORLD DILATION APPLICATIONS & WORD PROBLEMS (Q31–Q36)
  // =========================================================================
  {
    questionNumber: 31,
    questionId: 'staar-dil-31',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.10D',
    skillCategory: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
    questionSkill:
      'Apply a blueprint scale factor to determine the actual perimeter of a rectangular room',
    itemFormat: 'Multiple Choice (Real-World Scale Drawing)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (Perimeter Scaling Under Dilation)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 22 verifies linear perimeter scaling under TEKS 8.10D; this Math Lab item applies that linear perimeter scaling in an architectural blueprint context.',
    mathLabAdaptation:
      'Original classroom blueprint (4.5 in by 3.5 in, perimeter 16 in) scaled by 1 in = 8 ft to find an actual perimeter of 128 feet.',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: Linear perimeter scaling verified in 2019 (Item 22); architectural blueprint context is a curriculum-aligned application',
  },
  {
    questionNumber: 32,
    questionId: 'staar-dil-32',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.3A',
    skillCategory: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
    questionSkill:
      'Use proportional side ratios of similar right triangles (shadow indirect measurement) to determine an unknown height',
    itemFormat: 'Multiple Choice (Indirect Measurement Proportion)',
    comparableReleasedStaar:
      'TEKS 8.3A Historical Reference: 2019 Grade 8 Mathematics Item 4 (Proportional Corresponding Sides of Similar Figures)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 4 verifies setting up proportions between corresponding sides of similar polygons under TEKS 8.3A; this Math Lab item applies proportional side ratios to a real-world shadow indirect-measurement context.',
    mathLabAdaptation:
      'Original 6-foot person casting a 4.5-foot shadow next to a flagpole casting a 27-foot shadow (k = 6) to find a flagpole height of 36 feet.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3A corresponding side proportions verified in 2019 (Item 4); shadow indirect measurement is a curriculum-aligned application',
  },
  {
    questionNumber: 33,
    questionId: 'staar-dil-33',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.3A',
    skillCategory: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
    questionSkill:
      'Calculate a dilated linear dimension when a rectangular photo is enlarged by a decimal scale factor',
    itemFormat: 'Multiple Choice (Real-World Dilation Dimension)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 26 (TEKS 8.3C Multiplicative Scaling by k)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same multiplicative scaling by k tested in 2026 STAAR Item 26, applied to the height of a rectangular image zoomed by k = 2.25.',
    mathLabAdaptation:
      'Original 4 in by 6 in smartphone photo zoomed by scale factor k = 2.25 to reach a new height of 13.5 inches.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Multiplicative linear scaling by k verified in 2026 (Item 26) released administration reviewed',
  },
  {
    questionNumber: 34,
    questionId: 'staar-dil-34',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.3A',
    skillCategory: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
    questionSkill:
      'Determine the unit map scale ratio comparing map distance to actual distance',
    itemFormat: 'Multiple Choice (Scale Ratio Calculation)',
    comparableReleasedStaar:
      'TEKS 8.3A Historical Reference: 2019 Grade 8 Mathematics Item 4 (Proportional Ratios Between Similar Figures)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level Historical Evidence: 2019 STAAR Item 4 verifies proportional ratios of corresponding sides in similar polygons under TEKS 8.3A; this Math Lab item applies proportional ratio reasoning to a map unit-scale context.',
    mathLabAdaptation:
      'Original Texas map scale problem where 4 cm represents 120 km, simplifying to 1 cm represents 30 km.',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.3A proportional ratios verified in 2019 (Item 4); map scale unit ratio is a curriculum-aligned application',
  },
  {
    questionNumber: 35,
    questionId: 'staar-dil-35',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.3A',
    skillCategory: 'Real-World Scale Drawings, Indirect Measurement & Magnification',
    questionSkill:
      'Calculate the magnification scale factor k by dividing the dilated image diameter by the pre-image diameter',
    itemFormat: 'Multiple Choice (Real-World Scale Factor)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Image-to-Pre-Image Ratio k) & 2019 Grade 8 Mathematics Item 4 (TEKS 8.3A)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Applies the image-divided-by-pre-image scale factor ratio (k = 25 / 0.05 = 500) verified in 2026 STAAR Item 3 and TEKS 8.3A proportional ratio reasoning in 2019 STAAR Item 4 to a scientific magnification context.',
    mathLabAdaptation:
      'Original microscope magnification problem enlarging a 0.05 mm amoeba to a 25 mm monitor image (k = 500).',
    teksFrequency: TEKS_83A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Image-to-pre-image scale factor ratio verified in 2026 (Item 3) and TEKS 8.3A verified in 2019 (Item 4)',
  },
  {
    questionNumber: 36,
    questionId: 'staar-dil-36',
    subtopicSection: 'Real-World Applications',
    representationCategory: 'Real-World Application',
    teks: 'TEKS 8.10D',
    skillCategory: 'Perimeter (k) & Area (k²) Scaling Under Dilations',
    questionSkill:
      'Apply quadratic area scaling (k²) to determine the printing cost of a rectangular banner whose linear dimensions are dilated by scale factor k',
    itemFormat: 'Multiple Choice (Multi-Step Real-World Area Scaling)',
    comparableReleasedStaar:
      'TEKS 8.10D Historical Reference: 2019 Grade 8 Mathematics Item 22 (TEKS 8.10D Linear Perimeter Scaling Reference; Multi-Step Area k² Extension)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'TEKS-Level & Integrated Skill Evidence: 2019 STAAR Item 22 verifies TEKS 8.10D linear perimeter scaling (not a direct area-cost calculation); this Math Lab item synthesizes the area-measurement half of TEKS 8.10D (k² = 2² = 4) with a real-world unit cost per square foot ($30 × 4 = $120).',
    mathLabAdaptation:
      'Original 3 ft by 5 ft banner ($30 at $2/ft²) dilated by scale factor k = 2 to a 60 ft² banner costing $120.',
    teksFrequency: TEKS_810D_FREQ,
    questionSkillFrequency:
      'TEKS-Level Historical Evidence: TEKS 8.10D verified in 2019 (Item 22 for perimeter scaling); multi-step area-cost scaling is a curriculum-aligned application',
  },
];
