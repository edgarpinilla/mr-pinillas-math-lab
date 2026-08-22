import { STAAR_2026_GRADE_8_ITEMS, STAAR_2026_RELEASE } from './staar2026';
import { MathTopic, StaarReleasedItem, StaarYearRelease } from './types';

// Re-export all type declarations
export * from './types';
export * from './staar2026';

/**
 * Master Registry of all Indexed STAAR Releases
 */
export const ALL_STAAR_RELEASES: StaarYearRelease[] = [STAAR_2026_RELEASE];

/**
 * Master Flat List of all Indexed STAAR Items
 */
export const ALL_STAAR_ITEMS: StaarReleasedItem[] = [...STAAR_2026_GRADE_8_ITEMS];

// ==========================================
// LOCAL REUSABLE SELECTOR & QUERY HELPERS
// ==========================================

/**
 * Retrieves all indexed STAAR items that belong to a specific instructional group.
 * @param topic The primary or secondary math topic identifier
 * @param includeSecondary Whether to include items where the topic is a secondary classification (default: true)
 */
export function getStaarItemsByTopic(
  topic: MathTopic,
  includeSecondary: boolean = true
): StaarReleasedItem[] {
  return ALL_STAAR_ITEMS.filter((item) => {
    if (item.primaryTopic === topic) return true;
    if (includeSecondary && item.secondaryTopics && item.secondaryTopics.includes(topic)) {
      return true;
    }
    return false;
  });
}

/**
 * Retrieves STAAR items aligned to a specific TEKS code (e.g. "8.3.C", "8.4.B").
 */
export function getStaarItemsByTeks(teksCode: string): StaarReleasedItem[] {
  const normalized = teksCode.trim().toLowerCase();
  return ALL_STAAR_ITEMS.filter(
    (item) =>
      item.teks.code.toLowerCase() === normalized ||
      (item.teks.rawTeksNumber && item.teks.rawTeksNumber.toLowerCase() === normalized)
  );
}

/**
 * Retrieves all indexed STAAR items for a given release year.
 */
export function getStaarItemsByYear(year: number): StaarReleasedItem[] {
  return ALL_STAAR_ITEMS.filter((item) => item.year === year);
}

/**
 * Retrieves a single STAAR item by its unique ID.
 */
export function getStaarItemById(id: string): StaarReleasedItem | undefined {
  return ALL_STAAR_ITEMS.find((item) => item.id === id);
}

/**
 * Returns a count breakdown of active items across the three primary instructional topics.
 */
export function getStaarItemCountsByGroup(): {
  transformations: number;
  proportionalRelationships: number;
  nonProportionalRelationships: number;
  totalUniqueItems: number;
} {
  const transformations = getStaarItemsByTopic('transformations', true).length;
  const proportional = getStaarItemsByTopic('proportional-relationships', false).length;
  const nonProportional = getStaarItemsByTopic('non-proportional-relationships', true).length;

  return {
    transformations,
    proportionalRelationships: proportional,
    nonProportionalRelationships: nonProportional,
    totalUniqueItems: ALL_STAAR_ITEMS.length,
  };
}
