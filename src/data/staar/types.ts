/**
 * Official STAAR Item Types supported by TEA
 */
export type StaarItemType =
  | 'Multiple Choice'
  | 'Multiselect'
  | 'Drag and Drop'
  | 'Match Table Grid'
  | 'Inline Choice'
  | 'Equation Editor'
  | 'Hot Spot';

/**
 * Standardized Math Instructional Topic Identifiers
 */
export type MathTopic =
  | 'transformations'
  | 'proportional-relationships'
  | 'non-proportional-relationships'
  | 'linear-equations-systems'
  | 'pythagorean-theorem'
  | 'surface-area-volume'
  | 'financial-literacy'
  | 'scatterplots-data';

/**
 * Standardized TEKS Metadata Alignment
 */
export interface TeksReference {
  code: string; // e.g. "8.3.C", "8.10.C", "8.4.B"
  rawTeksNumber?: string; // e.g. "8.3.3.C"
  standardType: 'Readiness' | 'Supporting';
  reportingCategory: 1 | 2 | 3 | 4;
}

/**
 * Reusable STAAR Released Item Metadata Record
 */
export interface StaarReleasedItem {
  id: string; // Unique Local ID e.g., "staar-2026-g8-m03"
  year: number; // e.g., 2026
  grade: number; // 8
  itemNumber: number; // 1 - 40
  teks: TeksReference;
  officialItemType: StaarItemType;
  maxPoints: number;
  correctAnswer: string | string[] | Record<string, string>;

  // Instructional Taxonomy
  primaryTopic: MathTopic;
  secondaryTopics?: MathTopic[];
  pedagogicalTags: string[]; // e.g., ["Slope Foundation", "Similar Triangles"]
  subtopic: string; // Granular concept
  skillDescription: string; // Short skill summary without reproducing copyrighted question text

  // Quality & Provenance
  source: 'STAAR Released';
  reviewedByTeacher: boolean;
  teacherNotes?: string;
}

/**
 * Schema for an Entire STAAR Released Year Set
 */
export interface StaarYearRelease {
  year: number;
  grade: number;
  subject: 'Mathematics';
  totalExamItems: number;
  indexedItems: StaarReleasedItem[];
}
