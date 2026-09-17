export type QuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'numeric-input'
  | 'inequality-entry'
  | 'number-line-select';

export interface NumberLineConfig {
  min: number;
  max: number;
  step?: number;
  boundary: number;
  isClosed: boolean; // true for <= or >=, false for < or >
  direction: 'left' | 'right'; // 'left' for < or <=, 'right' for > or >=
  label?: string;
}

export interface PracticeOption {
  id: string;
  text: string;
  mathFormatted?: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface EquationsLabQuestion {
  id: string;
  tabId: string; // 'tab-1' to 'tab-10'
  type: QuestionType;
  prompt: string;
  equationDisplay?: string;
  context?: string;
  options?: PracticeOption[];
  correctAnswer?: string | number | string[]; // depending on type
  acceptedEquivalents?: string[]; // strings like 'x > 5', '5 < x', 'x>5'
  numericAnswer?: number;
  tolerance?: number;
  inequalityConfig?: {
    variable: string;
    symbol: '<' | '<=' | '>' | '>=';
    value: number;
  };
  numberLineData?: NumberLineConfig;
  hint: string;
  misconceptionFeedback: string;
  correctExplanation: string;
  teks: string;
}

export interface PracticeTabInfo {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  teks: string;
  iconName: string;
  color: string;
}

export const PRACTICE_TABS: PracticeTabInfo[] = [
  {
    id: 'tab-1',
    number: 1,
    title: 'Variables on Both Sides',
    shortTitle: 'Variables on Both Sides',
    description: 'Solve multi-step linear equations by using inverse operations to gather variable terms on one side and constants on the other.',
    teks: 'TEKS 8.8.C',
    iconName: 'Scale',
    color: 'blue',
  },
  {
    id: 'tab-2',
    number: 2,
    title: 'Combining Like Terms First',
    shortTitle: 'Combining Like Terms',
    description: 'Simplify each side of the equation by combining variable terms and constant terms before applying inverse operations.',
    teks: 'TEKS 8.8.C',
    iconName: 'Layers',
    color: 'indigo',
  },
  {
    id: 'tab-3',
    number: 3,
    title: 'Negative Coefficients & Constants',
    shortTitle: 'Negative Coefficients',
    description: 'Maintain precision when subtracting negative values and dividing both sides by negative coefficients.',
    teks: 'TEKS 8.8.C',
    iconName: 'MinusCircle',
    color: 'purple',
  },
  {
    id: 'tab-4',
    number: 4,
    title: 'Equations with Fractions / LCM',
    shortTitle: 'Fractions & LCM',
    description: 'Clear denominators in a single step by multiplying every term on both sides by the least common multiple (LCM).',
    teks: 'TEKS 8.8.C',
    iconName: 'Divide',
    color: 'teal',
  },
  {
    id: 'tab-5',
    number: 5,
    title: 'Equations with Decimals',
    shortTitle: 'Decimals',
    description: 'Solve linear equations with decimal rates and constants, applying inverse operations with decimal precision.',
    teks: 'TEKS 8.8.C',
    iconName: 'Hash',
    color: 'emerald',
  },
  {
    id: 'tab-6',
    number: 6,
    title: 'Real-World Equations',
    shortTitle: 'Real-World Equations',
    description: 'Model real-world scenarios comparing two changing plans (m₁x + b₁ = m₂x + b₂) and determine the break-even quantity.',
    teks: 'TEKS 8.8.A / 8.8.B',
    iconName: 'Briefcase',
    color: 'amber',
  },
  {
    id: 'tab-7',
    number: 7,
    title: 'Inequalities with Variables on Both Sides',
    shortTitle: 'Inequalities Both Sides',
    description: 'Solve one-variable linear inequalities and represent solutions algebraically and on coordinate number lines.',
    teks: 'TEKS 8.8.C',
    iconName: 'Sliders',
    color: 'orange',
  },
  {
    id: 'tab-8',
    number: 8,
    title: 'Inequalities — Negative Number / Symbol Flip',
    shortTitle: 'Negative Symbol Flip',
    description: 'Master the critical rule: when multiplying or dividing both sides of an inequality by a negative number, the symbol must flip direction.',
    teks: 'TEKS 8.8.C',
    iconName: 'ArrowLeftRight',
    color: 'rose',
  },
  {
    id: 'tab-9',
    number: 9,
    title: 'Inequalities with Fractions',
    shortTitle: 'Inequalities w/ Fractions',
    description: 'Clear fraction denominators by multiplying by positive LCMs and graph boundary values with open or closed circles.',
    teks: 'TEKS 8.8.C',
    iconName: 'Percent',
    color: 'cyan',
  },
  {
    id: 'tab-10',
    number: 10,
    title: 'STAAR-Style Challenge',
    shortTitle: 'STAAR Challenge',
    description: 'Authentic multi-step Grade 8 STAAR-style questions integrating equations, inequalities, rational numbers, and real-world representations.',
    teks: 'TEKS 8.8.A, 8.8.B, 8.8.C',
    iconName: 'Award',
    color: 'red',
  },
];

/**
 * Normalizes an inequality string for mathematical equivalence checking.
 * Handles: 'x > 5', '5 < x', 'x >= -2', '-2 <= x', 'x ≥ 3', '3 ≤ x'
 * Also handles fractions like '1/2' vs '0.5'.
 */
export function normalizeAndCheckInequality(
  input: string,
  expectedVar: string,
  expectedSymbol: '<' | '<=' | '>' | '>=',
  expectedValue: number
): boolean {
  if (!input || typeof input !== 'string') return false;

  // Clean input
  const clean = input
    .trim()
    .toLowerCase()
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/\s+/g, '');

  const normVar = expectedVar.toLowerCase();

  // Pattern 1: Variable on left (e.g., x > 5, x >= -3, x < 2/3)
  const leftRegex = new RegExp(`^${normVar}(<=|>=|<|>)(.+)$`);
  const leftMatch = clean.match(leftRegex);

  if (leftMatch) {
    const symbol = leftMatch[1];
    const valStr = leftMatch[2];
    const numVal = parseFractionOrDecimal(valStr);
    if (numVal === null) return false;

    return symbol === expectedSymbol && Math.abs(numVal - expectedValue) < 0.001;
  }

  // Pattern 2: Variable on right (e.g., 5 < x, -3 <= x)
  const rightRegex = new RegExp(`^(.+)(<=|>=|<|>)${normVar}$`);
  const rightMatch = clean.match(rightRegex);

  if (rightMatch) {
    const valStr = rightMatch[1];
    const symbol = rightMatch[2];
    const numVal = parseFractionOrDecimal(valStr);
    if (numVal === null) return false;

    // Flip symbol to compare from variable's perspective
    let invertedSymbol: '<' | '<=' | '>' | '>=';
    if (symbol === '<') invertedSymbol = '>';
    else if (symbol === '>') invertedSymbol = '<';
    else if (symbol === '<=') invertedSymbol = '>=';
    else invertedSymbol = '<=';

    return invertedSymbol === expectedSymbol && Math.abs(numVal - expectedValue) < 0.001;
  }

  return false;
}

/**
 * Parses numeric strings including integers, decimals, and fractions (e.g., '3/4', '-5/2', '0.75').
 */
export function parseFractionOrDecimal(str: string): number | null {
  if (!str) return null;
  const clean = str.trim();

  if (clean.includes('/')) {
    const parts = clean.split('/');
    if (parts.length !== 2) return null;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return num / den;
  }

  const val = parseFloat(clean);
  return isNaN(val) ? null : val;
}

/**
 * Checks numeric equivalence allowing fraction or decimal forms.
 */
export function checkNumericEquivalence(input: string | number, expected: number, tolerance: number = 0.001): boolean {
  if (typeof input === 'number') {
    return Math.abs(input - expected) <= tolerance;
  }
  const parsed = parseFractionOrDecimal(input);
  if (parsed === null) return false;
  return Math.abs(parsed - expected) <= tolerance;
}
