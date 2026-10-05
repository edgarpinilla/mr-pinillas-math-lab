// src/data/staar/unit7StaarReferenceData.ts
// Fixed Teacher-Only STAAR Historical Reference Metadata for Unit 7 (Questions 1–36)
// Display / Print Metadata ONLY — never modifies or affects student question banks.

export type Unit7StaarMatchLevel =
  | 'STRONG MATCH'
  | 'MODERATE MATCH'
  | 'TEKS HISTORY'
  | 'NO DIRECT MATCH IDENTIFIED';

export interface Unit7StaarReferenceEntry {
  questionNumber: number; // 1..36
  matchLevel: Unit7StaarMatchLevel;
  teks: '8.8D';
  questionSkill: string;
  comparableReleasedStaar: string;
  additionalHistoricalEvidence?: string;
  evidenceType: string;
  whyComparable: string;
  mathLabAdaptation: string;
}

export const UNIT_7_STAAR_REFERENCE_HEADER = {
  title: 'STAAR Historical Reference — Unit 7',
  subtitle: 'Understanding Angle Relationships in Parallel Lines and Triangles',
  teks: 'TEKS 8.8D',
  historicalTeksFrequency: '4 of 8 released administrations reviewed (50%)',
  yearsIdentified: '2018, 2019, 2021, 2024',
};

export const UNIT_7_STAAR_REFERENCE_NOTICE: string[] = [
  "The questions in Mr. Pinilla's Math Lab are original questions and are not official STAAR questions.",
  'The STAAR references shown here identify released STAAR items with similar TEKS, mathematical skills, reasoning, structure, or item style that were used as historical reference when evaluating the Math Lab practice bank.',
  'Numerical values, wording, diagrams, contexts, answer choices, and/or response formats may differ from official released STAAR items.',
  'These classifications describe similarity, not question origin.',
  'No Math Lab question should be interpreted as an official STAAR question.',
];

export const UNIT_7_STAAR_MATCH_LEVEL_GUIDE: {
  level: Unit7StaarMatchLevel;
  paragraphs: string[];
}[] = [
  {
    level: 'STRONG MATCH',
    paragraphs: [
      'A released STAAR item was identified that assesses substantially the same mathematical skill and uses a similar reasoning process or problem structure.',
      'This does NOT mean the Math Lab question is copied from or identical to the STAAR item.',
      'Numbers, wording, diagrams, contexts, answer choices, and response formats may differ.',
    ],
  },
  {
    level: 'MODERATE MATCH',
    paragraphs: [
      'A released STAAR item was identified that assesses the same or a closely related mathematical skill, but the reasoning process, representation, context, or problem structure differs more significantly from the Math Lab question.',
    ],
  },
  {
    level: 'TEKS HISTORY',
    paragraphs: [
      'Released STAAR materials reviewed provide evidence that the TEKS or related content was assessed, but no released item was identified that is sufficiently similar to this particular Math Lab question to classify it as a Strong or Moderate Match.',
    ],
  },
  {
    level: 'NO DIRECT MATCH IDENTIFIED',
    paragraphs: [
      'No sufficiently comparable released STAAR item was found in the materials and years reviewed.',
      'This does NOT mean the skill has never appeared on STAAR.',
      'It means that a sufficiently comparable item was not identified in the publicly released materials reviewed.',
    ],
  },
];

export const UNIT_7_STAAR_FREQUENCY_GUIDE = {
  teksHistoricalFrequency:
    'How often the TEKS was identified in the released STAAR administrations reviewed.',
  questionSkillFrequency:
    'How often the specific mathematical skill or reasoning represented by the Math Lab question was identified in the released materials reviewed.',
  importantNotes: [
    'Historical frequency describes past publicly released materials only.',
    'It does not represent every STAAR form administered statewide.',
    'It does not predict future STAAR questions.',
  ],
};

export const UNIT_7_STAAR_SOURCE_STATEMENT = {
  source:
    'Texas Education Agency (TEA) — STAAR Released Test Questions, Answer Keys, Item Rationales, and Student Expectations Tested.',
  notes: [
    'Historical analysis is based only on publicly released STAAR materials reviewed.',
    'Historical frequency does not represent every STAAR form administered statewide and does not predict future STAAR questions.',
  ],
};

export const UNIT_7_STAAR_REFERENCE_DATA: Record<number, Unit7StaarReferenceEntry> = {
  1: {
    questionNumber: 1,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Same-Side Interior Angles — Supplementary',
    comparableReleasedStaar: '2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Both assess angle relationships formed when parallel lines are cut by a transversal. The Math Lab question specifically requires recognizing that same-side interior angles are supplementary.',
    mathLabAdaptation:
      'Original Math Lab question with different values, wording, diagram, context, and answer choices.',
  },
  2: {
    questionNumber: 2,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Same-Side Interior Angles — Supplementary',
    comparableReleasedStaar: '2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Both assess angle relationships created by parallel lines and a transversal. The Math Lab item specifically applies the supplementary relationship of same-side interior angles.',
    mathLabAdaptation:
      'Original Math Lab question with different values, wording, diagram, and answer choices.',
  },
  3: {
    questionNumber: 3,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Alternate Interior Angles + Algebra',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'The released items provide evidence of reasoning with congruent angle relationships created by parallel lines and a transversal. The Math Lab question additionally requires solving an algebraic expression.',
    mathLabAdaptation:
      'Original Math Lab question combining the geometric relationship with algebra and using different values, wording, diagram, and answer choices.',
  },
  4: {
    questionNumber: 4,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Linear Pair + Algebra',
    comparableReleasedStaar: '2024 — Item 14',
    evidenceType: 'Integrated Skill Evidence',
    whyComparable:
      'The released item uses supplementary/linear-pair reasoning as part of a multi-step angle problem. The Math Lab item focuses directly on the linear-pair relationship and algebra.',
    mathLabAdaptation:
      'Original Math Lab question with different structure, values, diagram, wording, and response format.',
  },
  5: {
    questionNumber: 5,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Sum Theorem',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Both require using relationships among the interior angles of a triangle. The Math Lab item directly asks for a missing interior angle.',
    mathLabAdaptation:
      'Original Math Lab question with different values, diagram, wording, and answer choices.',
  },
  6: {
    questionNumber: 6,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Exterior Angle Theorem',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Direct Skill Evidence',
    whyComparable:
      'Both require using triangle angle relationships to determine an exterior angle from interior-angle information.',
    mathLabAdaptation:
      'Original Math Lab question with different values, wording, diagram, and answer choices.',
  },
  7: {
    questionNumber: 7,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Sum Theorem + Algebra',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Both depend on triangle interior-angle relationships. The Math Lab item additionally requires algebra.',
    mathLabAdaptation:
      'Original Math Lab question combining Triangle Sum reasoning with algebra and using different values, diagram, wording, and choices.',
  },
  8: {
    questionNumber: 8,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Exterior Angle Theorem + Algebra',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Direct Skill Evidence',
    whyComparable:
      'Both require reasoning with the relationship between triangle interior angles and an exterior angle. The Math Lab question extends that reasoning by requiring the student to solve for a variable.',
    mathLabAdaptation:
      'Original Math Lab question with different expressions, numerical values, diagram, wording, and answer choices.',
  },
  9: {
    questionNumber: 9,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity — Establish Similarity',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. The reviewed released materials establish historical assessment of TEKS 8.8D, but a sufficiently comparable released item for this specific AA Similarity reasoning was not identified.',
    mathLabAdaptation: 'Original Math Lab AA Similarity question.',
  },
  10: {
    questionNumber: 10,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'Similar Triangles + Missing Angle',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. The reviewed released materials establish historical assessment of TEKS 8.8D, but a sufficiently comparable released item for this specific AA Similarity reasoning was not identified.',
    mathLabAdaptation: 'Original Math Lab AA Similarity question.',
  },
  11: {
    questionNumber: 11,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'Similar Triangles + Algebra',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. The reviewed released materials establish historical assessment of TEKS 8.8D, but a sufficiently comparable released item for this specific AA Similarity reasoning was not identified.',
    mathLabAdaptation: 'Original Math Lab AA Similarity question.',
  },
  12: {
    questionNumber: 12,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity — Geometric Argument',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. The reviewed released materials establish historical assessment of TEKS 8.8D, but a sufficiently comparable released item for this specific AA Similarity reasoning was not identified.',
    mathLabAdaptation: 'Original Math Lab AA Similarity question.',
  },
  13: {
    questionNumber: 13,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Parallel Lines/Transversal + Algebra',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released items assess angle relationships produced by parallel lines and a transversal. Math Lab extends this reasoning through different structures and algebra where applicable.',
    mathLabAdaptation:
      'Original Math Lab questions with different expressions, values, diagrams, wording, and answer choices.',
  },
  14: {
    questionNumber: 14,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Parallel-Line Angle Relationships',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released items assess angle relationships produced by parallel lines and a transversal. Math Lab extends this reasoning through different structures and algebra where applicable.',
    mathLabAdaptation:
      'Original Math Lab questions with different expressions, values, diagrams, wording, and answer choices.',
  },
  15: {
    questionNumber: 15,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Angle Relationships + Algebra',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released items assess angle relationships produced by parallel lines and a transversal. Math Lab extends this reasoning through different structures and algebra where applicable.',
    mathLabAdaptation:
      'Original Math Lab questions with different expressions, values, diagrams, wording, and answer choices.',
  },
  16: {
    questionNumber: 16,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Parallel Lines + Algebraic Angle Measures',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released items assess angle relationships produced by parallel lines and a transversal. Math Lab extends this reasoning through different structures and algebra where applicable.',
    mathLabAdaptation:
      'Original Math Lab questions with different expressions, values, diagrams, wording, and answer choices.',
  },
  17: {
    questionNumber: 17,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Sum + Algebra',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle interior-angle and exterior-angle reasoning. Strong Match is used where the mathematical skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  18: {
    questionNumber: 18,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Exterior Angle + Algebra',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle interior-angle and exterior-angle reasoning. Strong Match is used where the mathematical skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  19: {
    questionNumber: 19,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Angle Relationships',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle interior-angle and exterior-angle reasoning. Strong Match is used where the mathematical skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  20: {
    questionNumber: 20,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Multi-Step Triangle/Exterior-Angle Reasoning',
    comparableReleasedStaar: '2019 — Item 36',
    additionalHistoricalEvidence: '2024 — Item 14',
    evidenceType: 'Direct + Integrated Skill Evidence',
    whyComparable:
      'Released evidence supports triangle interior-angle and exterior-angle reasoning. Strong Match is used where the mathematical skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  21: {
    questionNumber: 21,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity + Corresponding Angles',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  22: {
    questionNumber: 22,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity + Algebra',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  23: {
    questionNumber: 23,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'Justify AA Similarity',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  24: {
    questionNumber: 24,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity + Missing-Angle Reasoning',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  25: {
    questionNumber: 25,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Parallel Lines/Transversal Angle Reasoning',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence assesses angle relationships created by parallel lines and a transversal. Math Lab extends that reasoning through different structures and, where applicable, algebra or multiple steps.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, wording, diagrams, and answer choices.',
  },
  26: {
    questionNumber: 26,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Parallel Lines + Algebra',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence assesses angle relationships created by parallel lines and a transversal. Math Lab extends that reasoning through different structures and, where applicable, algebra or multiple steps.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, wording, diagrams, and answer choices.',
  },
  27: {
    questionNumber: 27,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Angle Relationships + Algebra',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence assesses angle relationships created by parallel lines and a transversal. Math Lab extends that reasoning through different structures and, where applicable, algebra or multiple steps.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, wording, diagrams, and answer choices.',
  },
  28: {
    questionNumber: 28,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Multi-Step Parallel-Line Angle Reasoning',
    comparableReleasedStaar: '2018 — Item 13; 2021 — Item 27',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence assesses angle relationships created by parallel lines and a transversal. Math Lab extends that reasoning through different structures and, where applicable, algebra or multiple steps.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, wording, diagrams, and answer choices.',
  },
  29: {
    questionNumber: 29,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Sum',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle-angle and exterior-angle reasoning. Strong Match is used only where the specific skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  30: {
    questionNumber: 30,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Exterior Angle Theorem',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle-angle and exterior-angle reasoning. Strong Match is used only where the specific skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  31: {
    questionNumber: 31,
    matchLevel: 'MODERATE MATCH',
    teks: '8.8D',
    questionSkill: 'Triangle Sum + Algebra',
    comparableReleasedStaar: '2019 — Item 36',
    evidenceType: 'Related Direct Skill Evidence',
    whyComparable:
      'Released evidence supports triangle-angle and exterior-angle reasoning. Strong Match is used only where the specific skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  32: {
    questionNumber: 32,
    matchLevel: 'STRONG MATCH',
    teks: '8.8D',
    questionSkill: 'Exterior Angle + Algebra/Multi-Step',
    comparableReleasedStaar: '2019 — Item 36',
    additionalHistoricalEvidence: '2024 — Item 14',
    evidenceType: 'Direct + Integrated Skill Evidence',
    whyComparable:
      'Released evidence supports triangle-angle and exterior-angle reasoning. Strong Match is used only where the specific skill and reasoning structure are substantially similar.',
    mathLabAdaptation:
      'Original Math Lab questions with different values, expressions, diagrams, wording, and answer choices.',
  },
  33: {
    questionNumber: 33,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  34: {
    questionNumber: 34,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity + Corresponding Angles',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  35: {
    questionNumber: 35,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity + Algebra',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
  36: {
    questionNumber: 36,
    matchLevel: 'TEKS HISTORY',
    teks: '8.8D',
    questionSkill: 'AA Similarity / Justification',
    comparableReleasedStaar:
      'No direct comparable item identified in the released materials reviewed.',
    evidenceType: 'TEKS History',
    whyComparable:
      'No Strong or Moderate Match is assigned. Historical evidence exists for TEKS 8.8D, but no sufficiently comparable released item was identified for the specific AA Similarity structure.',
    mathLabAdaptation: 'Original Math Lab AA Similarity questions.',
  },
};

export const UNIT_7_STAAR_REFERENCE_LIST: Unit7StaarReferenceEntry[] = Array.from(
  { length: 36 },
  (_, idx) => UNIT_7_STAAR_REFERENCE_DATA[idx + 1]
);
