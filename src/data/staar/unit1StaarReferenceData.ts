export type Unit1MatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export type Unit1SkillCategory =
  | 'Translations'
  | 'Reflections'
  | 'Rotations'
  | 'Dilations'
  | 'Coordinate Rules'
  | 'Congruence / Rigid Transformations'
  | 'Similarity / Dilations'
  | 'Composite Transformations'
  | 'Transformation Properties';

export interface Unit1StaarQuestionReference {
  questionNumber: number; // 1..36
  questionId: string; // e.g., 'staar-t-q01'
  round: 1 | 2 | 3; // Round 1 (Q1–Q12), Round 2 (Q13–Q24), Round 3 (Q25–Q36)
  teks: 'TEKS 8.10C' | 'TEKS 8.10A' | 'TEKS 8.10B' | 'TEKS 8.3C';
  skillCategory: Unit1SkillCategory;
  questionSkill: string;
  itemFormat: string;
  comparableReleasedStaar: string;
  matchLevel: Unit1MatchLevel;
  whyItIsComparable: string;
  mathLabAdaptation: string;
  teksFrequency: string;
  questionSkillFrequency: string;
}

export interface Unit1StaarHistoricalSummary {
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
    name: Unit1SkillCategory;
    description: string;
  }[];
  disclaimers: {
    primaryDisclaimer: string;
    classificationDisclaimer: string;
    frequencyDisclaimer: string;
  };
}

export const UNIT_1_STAAR_HISTORICAL_SUMMARY: Unit1StaarHistoricalSummary = {
  unitTitle: 'Unit 1 — Transformations: STAAR Analysis',
  unitSubtitle:
    'Historical STAAR alignment and reference analysis for the 36 original Math Lab STAAR Practice questions.',
  administrationsReviewed: [2018, 2019, 2021, 2022, 2023, 2024, 2025, 2026],
  teksBreakdown: [
    {
      code: 'TEKS 8.10C',
      standardType: 'Readiness',
      description:
        'Explain the effect of translations, reflections over the x- or y-axis, and rotations limited to 90°, 180°, 270°, and 360° as applied to two-dimensional shapes on a coordinate plane using an algebraic representation.',
      frequencySummary:
        'Assessed across reviewed released administrations; verified items in project repository include 2024 (Item 35), 2025 (Item 6), and 2026 (Items 16, 40).',
    },
    {
      code: 'TEKS 8.3C',
      standardType: 'Readiness',
      description:
        'Use an algebraic representation to explain the effect of a given positive rational scale factor applied to two-dimensional figures on a coordinate plane with the origin as the center of dilation.',
      frequencySummary:
        'Assessed across reviewed released administrations; verified items in project repository include 2026 (Items 3, 26).',
    },
    {
      code: 'TEKS 8.10B',
      standardType: 'Supporting',
      description:
        'Differentiate between transformations that preserve congruence and those that do not.',
      frequencySummary:
        'Supporting standard assessed on released forms; verified item in project repository includes 2026 (Item 29 Match Table Grid).',
    },
    {
      code: 'TEKS 8.10A',
      standardType: 'Supporting',
      description:
        'Generalize the properties of orientation and congruence of rotations, reflections, translations, and dilations of two-dimensional shapes on a coordinate plane.',
      frequencySummary:
        'Supporting standard assessed in historical released STAAR materials (orientation, congruence, similarity, and angle preservation).',
    },
  ],
  skillCategories: [
    {
      name: 'Translations',
      description:
        'Horizontal and vertical coordinate shifts on graphs, tables, and real-world coordinate grids.',
    },
    {
      name: 'Reflections',
      description:
        'Reflections across the x-axis and y-axis using coordinate graphs, ordered pairs, and symmetry.',
    },
    {
      name: 'Rotations',
      description:
        '90°, 180°, and 270° clockwise and counterclockwise rotations centered at the origin.',
    },
    {
      name: 'Dilations',
      description:
        'Enlargements (k > 1) and reductions (0 < k < 1) centered at the origin to determine scale factors and image coordinates.',
    },
    {
      name: 'Coordinate Rules',
      description:
        'Writing and interpreting algebraic mapping rules (x, y) → (x + a, y + b), (x, -y), (-x, y), (-y, x), (y, -x), (-x, -y), and (kx, ky).',
    },
    {
      name: 'Congruence / Rigid Transformations',
      description:
        'Distinguishing isometric transformations (translations, reflections, rotations) that preserve congruence and analyzing vertex orientation.',
    },
    {
      name: 'Similarity / Dilations',
      description:
        'Connecting non-isometric dilations (k ≠ 1) to similar figures, linear scaling by k, and area scaling by k².',
    },
    {
      name: 'Composite Transformations',
      description:
        'Applying multi-step transformation sequences (e.g., reflection followed by translation, or translation followed by dilation).',
    },
    {
      name: 'Transformation Properties',
      description:
        'Generalizing invariance of interior angle measures and parallelism across rigid transformations and dilations.',
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

const TEKS_810C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2024 Item 35, 2025 Item 6, 2026 Items 16 & 40)';
const TEKS_83C_FREQ =
  'Readiness standard documented across released administrations reviewed (Verified released items: 2026 Items 3 & 26)';
const TEKS_810B_FREQ =
  'Supporting standard documented in released administrations reviewed (Verified released item: 2026 Item 29)';
const TEKS_810A_FREQ =
  'Supporting standard documented in historical TEKS 8.10A released STAAR materials (Complete multi-year item count not fully indexed in local repository)';

export const UNIT_1_STAAR_REFERENCE_DATA: Unit1StaarQuestionReference[] = [
  // =========================================================================
  // ROUND 1 (Q1–Q12 in STAAR_TRANSFORMATIONS_QUESTIONS array order)
  // =========================================================================
  {
    questionNumber: 1,
    questionId: 'staar-t-q01',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Translations',
    questionSkill:
      'Determine image vertex coordinates after a horizontal and vertical translation on a coordinate plane',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2025 Grade 8 Mathematics Item 6 & 2026 Item 40 (TEKS 8.10C Translation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Released TEKS 8.10C items assess horizontal and vertical translations of polygons on a coordinate grid, while this question asks for a specific translated vertex coordinate A\' rather than selecting the algebraic rule.',
    mathLabAdaptation:
      'Original △ABC with A(1, 2), B(5, 2), C(3, 6) translated 4 units left and 5 units down to find A\'(-3, -3).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Coordinate translation verified in 2025 (Item 6) and 2026 (Item 40) released items reviewed',
  },
  {
    questionNumber: 2,
    questionId: 'staar-t-q02',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Determine the algebraic translation rule (x, y) → (x + a, y + b) from a graphed pre-image and image',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2025 Grade 8 Mathematics Item 6 — (x, y) → (x + 6, y - 2) & 2026 Item 40 — (x, y) → (x - 2, y + 4)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2025 STAAR Item 6 and 2026 STAAR Item 40, where students analyze a translated polygon on the coordinate plane and identify the algebraic rule (x, y) → (x + a, y + b).',
    mathLabAdaptation:
      'Original quadrilateral ABCD with A(-5, 4) translated 6 units right and 3 units down to A\'(1, 1), modeled by (x, y) → (x + 6, y - 3).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic translation rule identification verified in 2025 (Item 6) and 2026 (Item 40) released items reviewed',
  },
  {
    questionNumber: 3,
    questionId: 'staar-t-q03',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Translations',
    questionSkill:
      'Apply a given algebraic translation rule to a graphed vertex to determine its image coordinates',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2025 Grade 8 Mathematics Item 6 & 2026 Item 40 (TEKS 8.10C Translation Rule)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects the algebraic translation representation (x, y) → (x + 7, y - 4) to reading pre-image vertex coordinates from a coordinate grid and computing the translated ordered pair.',
    mathLabAdaptation:
      'Original trapezoid EFGH with vertex F(-2, 5) mapped under (x, y) → (x + 7, y - 4) to F\'(5, 1).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Translation coordinate rules verified in 2025 (Item 6) and 2026 (Item 40) released items reviewed',
  },
  {
    questionNumber: 4,
    questionId: 'staar-t-q04',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Write the algebraic representation (x, y) → (x + a, y + b) from a verbal description of horizontal and vertical shifts',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 40 & 2025 Item 6 (TEKS 8.10C Translation Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 40 and 2025 STAAR Item 6 by translating directional shifts (units right/left and up/down) into the coordinate mapping rule (x, y) → (x + a, y + b) while rejecting multiplicative distractors.',
    mathLabAdaptation:
      'Original verbal prompt shifting a hexagon 8 units right and 6 units down to form (x, y) → (x + 8, y - 6).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic translation rule representation verified in 2025 (Item 6) and 2026 (Item 40) released items reviewed',
  },
  {
    questionNumber: 5,
    questionId: 'staar-t-q05',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Interpret an algebraic translation rule (x, y) → (x - 9, y + 4) as directional horizontal and vertical shifts',
    itemFormat: 'Multiple Choice (Rule Interpretation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2025 Grade 8 Mathematics Item 6 & 2026 Item 40 (TEKS 8.10C)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the inverse direction of 2025 Item 6 and 2026 Item 40—interpreting the signs in (x - 9, y + 4) as 9 units left and 4 units up.',
    mathLabAdaptation:
      'Original rule (x, y) → (x - 9, y + 4) with sign-reversal and axis-swap distractors.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Translation rule interpretation aligned to 2025 (Item 6) and 2026 (Item 40) released items reviewed',
  },
  {
    questionNumber: 6,
    questionId: 'staar-t-q06',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Translations',
    questionSkill:
      'Work backwards from translated image coordinates and an algebraic rule to determine the pre-image ordered pair',
    itemFormat: 'Multiple Choice (Coordinate Reasoning)',
    comparableReleasedStaar:
      'TEKS 8.10C Historical Released Pattern (Inverse Translation Coordinate Reasoning)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses TEKS 8.10C coordinate translation fluency by requiring inverse operations (solving x - 5 = 2 and y + 4 = -3) to recover the original pre-image point.',
    mathLabAdaptation:
      'Original image point P\'(2, -3) under (x, y) → (x - 5, y + 4), recovering P(7, -7) with forward-application distractor (-3, 1).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C skill pattern; no single direct inverse-translation item isolated in the subset of released items indexed',
  },
  {
    questionNumber: 7,
    questionId: 'staar-t-q07',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Translations',
    questionSkill:
      'Determine a translation rule from a coordinate table of pre-image and image vertices and find a missing image vertex',
    itemFormat: 'Multiple Choice (Coordinate Table)',
    comparableReleasedStaar:
      'TEKS 8.10C Released Coordinate Representation Pattern (Tabular Vertex Mapping)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies TEKS 8.10C translation rules in a tabular representation by deducing Δx = +5 and Δy = -4 from pairs A → A\' and B → B\' and applying it to vertex C.',
    mathLabAdaptation:
      'Original 3-row vertex table with A(-3, 6) → A\'(2, 2), B(1, 4) → B\'(6, 0), and C(-2, -1) → C\'(3, -5).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C skill pattern; tabular translation representation',
  },
  {
    questionNumber: 8,
    questionId: 'staar-t-q08',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Composite Transformations',
    questionSkill:
      'Combine two sequential translations to determine the net algebraic rule and final coordinate position',
    itemFormat: 'Multiple Choice (Real-World Application)',
    comparableReleasedStaar:
      'TEKS 8.10C Multi-Step Translation Synthesis (No Single Direct Released Item)',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'Integrated Skill Evidence: Extends TEKS 8.10C translation rules to combining two consecutive horizontal/vertical shifts (+5 right, +7 up followed by -2 left, -3 down).',
    mathLabAdaptation:
      'Original warehouse automated robot scenario starting at (3, -4) with net rule (x, y) → (x + 3, y + 4) and final location (6, 0).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'No direct released match identified in reviewed administrations; multi-step TEKS 8.10C extension',
  },
  {
    questionNumber: 9,
    questionId: 'staar-t-q10',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Identify the algebraic rule (x, y) → (x, -y) and image vertex coordinates for a reflection across the x-axis',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 16 (TEKS 8.10C x-Axis Reflection Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly aligns with 2026 STAAR Item 16, which assesses the x-axis reflection coordinate rule (x, y) → (x, -y) mapping a figure from Quadrant I into Quadrant IV.',
    mathLabAdaptation:
      'Original △ABC with A(2, 3), B(6, 1), C(4, 7) reflected across the x-axis to A\'(2, -3) using (x, y) → (x, -y).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Reflection across the x-axis rule (x, y) → (x, -y) verified in 2026 (Item 16) released administration reviewed',
  },
  {
    questionNumber: 10,
    questionId: 'staar-t-q11',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Identify the algebraic rule (x, y) → (-x, y) for a reflection across the y-axis from a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 16 (TEKS 8.10C Coordinate Reflection Rules)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses the companion TEKS 8.10C axis-reflection rule (x, y) → (-x, y) across the y-axis between Quadrant II and Quadrant I.',
    mathLabAdaptation:
      'Original quadrilateral PQRS with P(-7, 2) reflected across the y-axis to P\'(7, 2).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Axis reflection coordinate rules verified in 2026 (Item 16) and historical TEKS 8.10C releases',
  },
  {
    questionNumber: 11,
    questionId: 'staar-t-q12',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Determine image vertex coordinates after reflecting a Quadrant III triangle across the y-axis',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: TEKS 8.10C Axis Reflection Coordinate Mapping (cf. 2026 Item 16)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Requires applying the y-axis reflection rule (x, y) → (-x, y) to a graphed pre-image vertex X(-6, -2) to find X\'(6, -2).',
    mathLabAdaptation:
      'Original △XYZ in Quadrant III reflected across the y-axis into Quadrant IV.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Axis reflection coordinate mapping verified in TEKS 8.10C released materials',
  },
  {
    questionNumber: 12,
    questionId: 'staar-t-q13',
    round: 1,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Identify the algebraic coordinate rule (x, y) → (x, -y) representing a reflection across the x-axis',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 16 (TEKS 8.10C Reflection Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly tests selecting the algebraic representation (x, y) → (x, -y) for an x-axis reflection, matching one of the two correct rules in 2026 STAAR Item 16.',
    mathLabAdaptation:
      'Original single-select algebraic rule item contrasting (x, -y), (-x, y), (-x, -y), and (y, x).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: x-axis reflection rule (x, y) → (x, -y) verified in 2026 (Item 16) released administration reviewed',
  },

  // =========================================================================
  // ROUND 2 (Q13–Q24 in STAAR_TRANSFORMATIONS_QUESTIONS array order)
  // =========================================================================
  {
    questionNumber: 13,
    questionId: 'staar-t-q14',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Work backwards from an image vertex reflected across the x-axis to find the pre-image coordinates',
    itemFormat: 'Multiple Choice (Coordinate Reasoning)',
    comparableReleasedStaar:
      'TEKS 8.10C Axis Reflection Pre-Image Coordinate Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies the x-axis reflection rule (x, y) → (x, -y) in reverse to determine pre-image vertex K(-6, 8) from image K\'(-6, -8).',
    mathLabAdaptation:
      'Original ordered-pair reversal item with K\'(-6, -8) and sign-combination distractors.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C axis-reflection coordinate skill',
  },
  {
    questionNumber: 14,
    questionId: 'staar-t-q16',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Determine the resulting quadrant and coordinates when a point in Quadrant IV is reflected across the y-axis',
    itemFormat: 'Multiple Choice (Quadrant & Coordinate Reasoning)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 16 (TEKS 8.10C Quadrant Transition)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Connects coordinate reflection rules with quadrant transitions on the coordinate plane, similar to 2026 STAAR Item 16’s quadrant-mapping focus.',
    mathLabAdaptation:
      'Original point M(5, -6) in Quadrant IV reflected over the y-axis to M\'(-5, -6) in Quadrant III.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Quadrant transition under reflection/rotation verified in 2026 (Item 16) released administration reviewed',
  },
  {
    questionNumber: 15,
    questionId: 'staar-t-q17',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Reflections',
    questionSkill:
      'Apply y-axis reflection symmetry to determine the reflected coordinate in a real-world design context',
    itemFormat: 'Multiple Choice (Real-World Application)',
    comparableReleasedStaar:
      'TEKS 8.10C Reflection Coordinate Application Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies the TEKS 8.10C y-axis reflection rule (x, y) → (-x, y) to map (7, 4) to (-7, 4) within a contextual grid scenario.',
    mathLabAdaptation:
      'Original corporate logo symmetry context with anchor point (7, 4) reflected across the y-axis to (-7, 4).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C y-axis reflection coordinate skill',
  },
  {
    questionNumber: 16,
    questionId: 'staar-t-q18',
    round: 2,
    teks: 'TEKS 8.10B',
    skillCategory: 'Congruence / Rigid Transformations',
    questionSkill:
      'Analyze congruence preservation and vertex orientation reversal under a reflection across the y-axis',
    itemFormat: 'Multiple Choice (Conceptual Properties)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 29 (TEKS 8.10B Congruence Preservation) & TEKS 8.10A',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Evaluates whether a reflection preserves congruence (as in 2026 STAAR Item 29) while also addressing vertex orientation reversal (TEKS 8.10A/8.10B).',
    mathLabAdaptation:
      'Original conceptual statement item contrasting congruence preservation and flipped vertex orientation against similarity and negative-area misconceptions.',
    teksFrequency: TEKS_810B_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Congruence preservation under rigid transformations verified in 2026 (Item 29) released administration reviewed',
  },
  {
    questionNumber: 17,
    questionId: 'staar-t-q19',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Identify the algebraic rule (x, y) → (-y, x) for a 90° counterclockwise rotation about the origin from a graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 35 & 2026 Item 16 (TEKS 8.10C 90°/270° Rotation Rules)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses identifying the 90° counterclockwise rotation coordinate rule (x, y) → (-y, x) from a graphed pre-image and image, closely related to 2024 Item 35 and 2026 Item 16.',
    mathLabAdaptation:
      'Original △ABC in Quadrant I with A(2, 5) rotated 90° counterclockwise to A\'(-5, 2) in Quadrant II.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: 90°/270° origin rotation coordinate rules verified in 2024 (Item 35) and 2026 (Item 16) released administrations reviewed',
  },
  {
    questionNumber: 18,
    questionId: 'staar-t-q20',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Determine image vertex coordinates after a 180° rotation about the origin on a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: TEKS 8.10C 180° Origin Rotation Pattern (cf. 2026 Item 29)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies the TEKS 8.10C 180° rotation rule (x, y) → (-x, -y) to a graphed rectangle PQRS to find R\'(2, -5) from R(-2, 5).',
    mathLabAdaptation:
      'Original rectangle PQRS in Quadrant II rotated 180° about the origin into Quadrant IV.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C 180° rotation skill; 180° rotation also referenced in 2026 Item 29',
  },
  {
    questionNumber: 19,
    questionId: 'staar-t-q21',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Apply the 90° clockwise rotation rule (x, y) → (y, -x) to a graphed triangle to find image vertex coordinates',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 35 & 2026 Item 16 — Rule (x, y) → (y, -x)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the exact algebraic transformation rule (x, y) → (y, -x) assessed in 2024 STAAR Item 35 (270° CCW / 90° CW) and 2026 STAAR Item 16 (90° CW rotation).',
    mathLabAdaptation:
      'Original △JKL in Quadrant II with vertex J(-3, 6) rotated 90° clockwise about the origin to J\'(6, 3).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Rule (x, y) → (y, -x) verified in 2024 (Item 35) and 2026 (Item 16) released administrations reviewed',
  },
  {
    questionNumber: 20,
    questionId: 'staar-t-q22',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Identify the algebraic representation (x, y) → (-y, x) for a 270° clockwise rotation about the origin',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2024 Grade 8 Mathematics Item 35 (TEKS 8.10C 270° Rotation Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2024 STAAR Item 35 by requiring students to connect a 270° rotation about the origin with its equivalent 90° opposite-direction coordinate rule.',
    mathLabAdaptation:
      'Original 270° clockwise rotation prompt matching (x, y) → (-y, x) with standard rotation/reflection rule distractors.',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: 270° rotation algebraic rule verified in 2024 (Item 35) released administration reviewed',
  },
  {
    questionNumber: 21,
    questionId: 'staar-t-q23',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Identify the algebraic coordinate rule (x, y) → (-x, -y) for a 180° rotation about the origin',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'TEKS 8.10C Released 180° Origin Rotation Rule Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses direct recognition of the TEKS 8.10C 180° origin rotation rule (x, y) → (-x, -y) versus coordinate-swapping distractors.',
    mathLabAdaptation:
      'Original rule identification item contrasting (-y, -x), (-x, -y), (-y, x), and (y, -x).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C 180° rotation coordinate rule skill',
  },
  {
    questionNumber: 22,
    questionId: 'staar-t-q24',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Calculate the image ordered pair of a vertex after a 180° rotation about the origin',
    itemFormat: 'Multiple Choice (Coordinate Reasoning)',
    comparableReleasedStaar:
      'TEKS 8.10C 180° Rotation Ordered-Pair Application Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Applies the 180° rotation rule (x, y) → (-x, -y) to a specific vertex W(-4, -7) in Quadrant III to find W\'(4, 7) in Quadrant I.',
    mathLabAdaptation:
      'Original △WXY vertex W(-4, -7) rotated 180° about the origin to (4, 7).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C 180° rotation coordinate calculation skill',
  },
  {
    questionNumber: 23,
    questionId: 'staar-t-q26',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Apply a 90° counterclockwise rotation rule (x, y) → (-y, x) to an ordered pair in a real-world context',
    itemFormat: 'Multiple Choice (Real-World Application)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: TEKS 8.10C 90° Rotation Coordinate Rule (cf. 2024 Item 35 & 2026 Item 16)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses applying the 90° rotation coordinate mapping (x, y) → (-y, x) to a given ordered pair (-5, 12), framed in a wind turbine rotor context.',
    mathLabAdaptation:
      'Original wind turbine rotor blade tip at (-5, 12) rotated 90° counterclockwise about (0, 0) to (-12, -5).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: 90°/270° rotation coordinate rules verified in 2024 (Item 35) and 2026 (Item 16) released administrations reviewed',
  },
  {
    questionNumber: 24,
    questionId: 'staar-t-q27',
    round: 2,
    teks: 'TEKS 8.10C',
    skillCategory: 'Rotations',
    questionSkill:
      'Determine a missing image vertex in a coordinate table representing a 180° rotation about the origin',
    itemFormat: 'Multiple Choice (Coordinate Table)',
    comparableReleasedStaar:
      'TEKS 8.10C Tabular Coordinate Rotation Pattern',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Uses a coordinate table of pre-image and image vertices for quadrilateral ABCD under a 180° rotation (x, y) → (-x, -y) to find C\'(-4, -1).',
    mathLabAdaptation:
      'Original 4-vertex coordinate table with C(4, 1) mapping to C\'(-4, -1).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10C tabular rotation skill',
  },

  // =========================================================================
  // ROUND 3 (Q25–Q36 in STAAR_TRANSFORMATIONS_QUESTIONS array order)
  // =========================================================================
  {
    questionNumber: 25,
    questionId: 'staar-t-q28',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Dilations',
    questionSkill:
      'Determine the algebraic dilation rule (x, y) → (kx, ky) for an enlargement centered at the origin from a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 — Dilation Rule (x, y) → (2x, 2y)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly mirrors 2026 STAAR Item 3, where students evaluate pre-image and image vertex coordinates on a coordinate grid to identify the dilation mapping rule (x, y) → (2x, 2y).',
    mathLabAdaptation:
      'Original △ABC with vertices A(2, 1), B(4, 1), C(2, 4) dilated to A\'(4, 2), B\'(8, 2), C\'(4, 8) yielding (x, y) → (2x, 2y).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic dilation rule from a graph verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 26,
    questionId: 'staar-t-q29',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Dilations',
    questionSkill:
      'Determine the fractional scale factor (0 < k < 1) of a reduction dilation centered at the origin from a coordinate graph',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 & Item 26 (TEKS 8.3C Coordinate Dilation)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate-ratio reasoning as 2026 STAAR Item 3 (k = x\' / x = y\' / y), asking directly for the reduction scale factor k = 1/2.',
    mathLabAdaptation:
      'Original quadrilateral PQRS with P(-8, 4) reduced to P\'(-4, 2), yielding scale factor 1/2 (0.5).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Coordinate ratio scale-factor evaluation verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 27,
    questionId: 'staar-t-q30',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Dilations',
    questionSkill:
      'Calculate a non-integer enlargement scale factor (k = 3/2) from graphed pre-image and image coordinates',
    itemFormat: 'Multiple Choice (Coordinate Graph)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 (TEKS 8.3C Coordinate Dilation Ratio)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Assesses finding the rational scale factor k = x\' / x from a coordinate graph of a dilated trapezoid, contrasting k = 3/2 against its reciprocal 2/3.',
    mathLabAdaptation:
      'Original trapezoid ABCD with A(-4, 4) and B(2, 4) dilated to A\'(-6, 6) and B\'(3, 6) with k = 3/2 (1.5).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Rational scale factor coordinate ratio verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 28,
    questionId: 'staar-t-q31',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Identify the algebraic coordinate rule (x, y) → (kx, ky) for a dilation with a given rational scale factor',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 & Item 26 (TEKS 8.3C Dilation Rule)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly aligns with 2026 STAAR Items 3 and 26 by translating a given scale factor k centered at the origin into the multiplicative coordinate rule (x, y) → (kx, ky).',
    mathLabAdaptation:
      'Original scale factor k = 3/4 producing (x, y) → (3/4 x, 3/4 y) with reciprocal and additive distractors.',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Algebraic dilation rule (kx, ky) verified in 2026 (Items 3 & 26) released administration reviewed',
  },
  {
    questionNumber: 29,
    questionId: 'staar-t-q32',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Coordinate Rules',
    questionSkill:
      'Distinguish an enlargement dilation rule (k > 1) from reduction and additive translation rules',
    itemFormat: 'Multiple Choice (Algebraic Rule)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 & Item 29 (TEKS 8.3C / 8.10B)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Requires recognizing both the multiplicative structure (kx, ky) of a dilation and the condition k > 1 for an enlargement.',
    mathLabAdaptation:
      'Original rule comparison contrasting (3.5x, 3.5y) against reduction (0.6x, 0.6y) and translation (x + 3.5, y + 3.5).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Dilation vs. additive rule structure verified in 2026 (Items 3 & 29) released administration reviewed',
  },
  {
    questionNumber: 30,
    questionId: 'staar-t-q33',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Dilations',
    questionSkill:
      'Apply a fractional scale factor to pre-image coordinates to calculate the dilated image ordered pair',
    itemFormat: 'Multiple Choice (Coordinate Calculation)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 26 (TEKS 8.3C Applying Scale Factor to Coordinates)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Directly parallels 2026 STAAR Item 26, where students apply scale factor k multiplicatively to both coordinates of an ordered pair centered at the origin.',
    mathLabAdaptation:
      'Original point P(-6, 9) dilated by scale factor k = 2/3 to produce P\'(-4, 6).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Applying scale factor k to ordered-pair coordinates verified in 2026 (Item 26) released administration reviewed',
  },
  {
    questionNumber: 31,
    questionId: 'staar-t-q35',
    round: 3,
    teks: 'TEKS 8.3C',
    skillCategory: 'Dilations',
    questionSkill:
      'Determine the algebraic dilation rule from pre-image and image coordinates in a real-world blueprint scaling context',
    itemFormat: 'Multiple Choice (Real-World Application)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 3 & Item 26 (TEKS 8.3C Dilation Rule)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Uses the same coordinate-ratio calculation (x\' / x = 3 / 12 = 1/4) as 2026 STAAR Item 3 to identify (x, y) → (1/4 x, 1/4 y) within an architectural floor-plan scenario.',
    mathLabAdaptation:
      'Original floor-plan column at (12, 16) scaled to (3, 4) via (x, y) → (1/4 x, 1/4 y).',
    teksFrequency: TEKS_83C_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Dilation coordinate rule identification verified in 2026 (Item 3) released administration reviewed',
  },
  {
    questionNumber: 32,
    questionId: 'staar-t-q36',
    round: 3,
    teks: 'TEKS 8.10B',
    skillCategory: 'Similarity / Dilations',
    questionSkill:
      'Model the effect of dilation scale factor k on linear side lengths (k), area (k²), and similarity vs. congruence',
    itemFormat: 'Multiple Choice (Conceptual Properties)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 29 (TEKS 8.10B Congruence) & TEKS 8.10D Linear/Area Scaling',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines TEKS 8.10B (dilations with k ≠ 1 produce similar, non-congruent figures, as assessed in 2026 Item 29) with TEKS 8.10D (side lengths scale by k = 3 and area scales by k² = 9).',
    mathLabAdaptation:
      'Original rectangle ABCD dilated by k = 3 comparing side-length scaling (3×), area scaling (9×), and similarity.',
    teksFrequency: TEKS_810B_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Congruence vs. dilation verified in 2026 (Item 29); linear/area scaling aligned to TEKS 8.10D',
  },
  {
    questionNumber: 33,
    questionId: 'staar-t-q09',
    round: 3,
    teks: 'TEKS 8.10C',
    skillCategory: 'Composite Transformations',
    questionSkill:
      'Determine final coordinates after a two-step sequence: reflection across the x-axis followed by a translation',
    itemFormat: 'Multiple Choice (Multi-Step Coordinate Sequence)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: Synthesizes 2026 Item 16 (x-Axis Reflection) & 2025 Item 6 — (x, y) → (x + 6, y - 2)',
    matchLevel: 'MODERATE MATCH',
    whyItIsComparable:
      'Integrated Skill Evidence: Combines two verified released transformation rules—reflection across the x-axis (2026 Item 16) followed by the translation rule (x, y) → (x + 6, y - 2) (2025 Item 6)—into a two-step sequence.',
    mathLabAdaptation:
      'Original starting point A(-3, 5) reflected across the x-axis to A\'(-3, -5) and translated by (x + 6, y - 2) to A\'\'(3, -7).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'Integrated Skill Evidence: Multi-step synthesis of reflection and translation rules verified individually in 2025 (Item 6) and 2026 (Item 16)',
  },
  {
    questionNumber: 34,
    questionId: 'staar-t-q15',
    round: 3,
    teks: 'TEKS 8.10C',
    skillCategory: 'Composite Transformations',
    questionSkill:
      'Determine final coordinates after a two-step sequence: translation followed by a dilation centered at the origin',
    itemFormat: 'Multiple Choice (Multi-Step Coordinate Sequence)',
    comparableReleasedStaar:
      'TEKS 8.10C & TEKS 8.3C Multi-Step Transformation Sequence Synthesis',
    matchLevel: 'NO DIRECT MATCH IDENTIFIED',
    whyItIsComparable:
      'Integrated Skill Evidence: Synthesizes a TEKS 8.10C translation (x, y) → (x - 2, y + 5) with a TEKS 8.3C origin dilation (k = 3) to test order-of-operations in composite transformations.',
    mathLabAdaptation:
      'Original polygon vertex (4, -2) translated to (2, 3) and dilated by k = 3 to (6, 9), with order-reversal distractor (12, -6).',
    teksFrequency: TEKS_810C_FREQ,
    questionSkillFrequency:
      'No single direct composite translation-then-dilation item identified in reviewed releases; multi-standard synthesis',
  },
  {
    questionNumber: 35,
    questionId: 'staar-t-q25',
    round: 3,
    teks: 'TEKS 8.10A',
    skillCategory: 'Congruence / Rigid Transformations',
    questionSkill:
      'Classify four algebraic transformation rules according to whether they produce congruent figures or similar non-congruent figures',
    itemFormat: 'Multiple Choice (Multi-Rule Classification)',
    comparableReleasedStaar:
      'Comparable Released STAAR Item: 2026 Grade 8 Mathematics Item 29 (TEKS 8.10B Match Table Grid: Preserves Congruence)',
    matchLevel: 'STRONG MATCH',
    whyItIsComparable:
      'Direct Skill Evidence: Closely parallels 2026 STAAR Item 29, where students evaluate four transformation descriptions/rules and classify which preserve congruence (rigid motions) versus which do not (dilation with k ≠ 1).',
    mathLabAdaptation:
      'Original 4-rule set comparing (x + 5, y - 7), (-x, y), (-y, x), and (2.5x, 2.5y) in a multiple-choice classification format.',
    teksFrequency: TEKS_810A_FREQ,
    questionSkillFrequency:
      'Direct Skill Evidence: Classifying congruence preservation across multiple transformation rules verified in 2026 (Item 29) released administration reviewed',
  },
  {
    questionNumber: 36,
    questionId: 'staar-t-q34',
    round: 3,
    teks: 'TEKS 8.10A',
    skillCategory: 'Transformation Properties',
    questionSkill:
      'Generalize the preservation of interior angle measures and line parallelism across translations, reflections, rotations, and dilations',
    itemFormat: 'Multiple Choice (Conceptual Invariance)',
    comparableReleasedStaar:
      'TEKS 8.10A Released Conceptual Invariance Pattern (Angle Measure & Orientation Properties)',
    matchLevel: 'TEKS HISTORY',
    whyItIsComparable:
      'Assesses the core generalization of TEKS 8.10A—understanding that all four Grade 8 coordinate transformations preserve interior angle measures (42° remains 42°) and parallel relationships, even when dilations change side lengths.',
    mathLabAdaptation:
      'Original △PQR with a 42° interior angle addressing the common misconception that dilations multiply angle measures by the scale factor.',
    teksFrequency: TEKS_810A_FREQ,
    questionSkillFrequency:
      'Historical TEKS 8.10A conceptual property skill',
  },
];
