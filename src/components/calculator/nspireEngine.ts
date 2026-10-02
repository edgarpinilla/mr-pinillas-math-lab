/**
 * TI-Nspire CX School Property - Reusable Calculator Engine
 * Handles keypad token accumulation, physical key behaviors, LCD formatting,
 * and safe mathematical expression evaluation.
 */

export type NspireMenuLevel = 'none' | 'root' | 'number';

export interface NspireEngineState {
  expression: string;
  evaluatedResult: string;
  isOff: boolean;
  ctrlActive: boolean;
  lastEvaluatedExpr: string;
  isInitialSeed?: boolean;
  menuLevel: NspireMenuLevel;
  selectedMenuIndex: number;
  isTemplateOpen?: boolean;
  selectedTemplate?: string;
  selectedTemplateIndex?: number;
  templateType?: 'fraction' | 'sqrt' | null;
  radicand?: string;
  cursorRegion?: 'radicand' | 'num' | 'den' | null;
  activeFractionSlot?: 'num' | 'den' | null;
  fractionNum?: string;
  fractionDen?: string;
}

export const PALETTE_GRID_COLS = 4;
export const PALETTE_GRID_ROWS = 2;

export interface PaletteTemplateDef {
  id: string;
  name: string;
}

export const PALETTE_TEMPLATES: readonly PaletteTemplateDef[] = [
  { id: 'fraction', name: 'Fraction' },       // Index 0 (Row 0, Col 0)
  { id: 'exp', name: 'e^▫' },                 // Index 1 (Row 0, Col 1)
  { id: 'log', name: 'log_▫▫' },              // Index 2 (Row 0, Col 2)
  { id: 'sqrt', name: 'Square Root' },        // Index 3 (Row 0, Col 3)
  { id: 'nthroot', name: 'ⁿ√▫' },             // Index 4 (Row 1, Col 0)
  { id: 'abs', name: '|▫|' },                 // Index 5 (Row 1, Col 1)
  { id: 'piecewise', name: '{▫' },            // Index 6 (Row 1, Col 2)
  { id: 'matrix', name: '[▫]' },              // Index 7 (Row 1, Col 3)
] as const;

export const INITIAL_NSPIRE_STATE: NspireEngineState = {
  expression: '',
  evaluatedResult: '',
  isOff: false,
  ctrlActive: false,
  lastEvaluatedExpr: '',
  isInitialSeed: false,
  menuLevel: 'none',
  selectedMenuIndex: 0,
  isTemplateOpen: false,
  selectedTemplate: 'fraction',
  selectedTemplateIndex: 0,
  templateType: null,
  radicand: '',
  cursorRegion: null,
  activeFractionSlot: null,
  fractionNum: '',
  fractionDen: '',
};

/**
 * Converts a floating point number to its simplified fraction string representation (e.g. 0.6 -> 3/5).
 * Uses continued fraction algorithm with high precision.
 */
export function toFraction(val: number, maxDenominator: number = 10000): string {
  if (Number.isInteger(val)) {
    return val.toString();
  }
  const isNeg = val < 0;
  const absVal = Math.abs(val);

  let bestH = Math.round(absVal);
  let bestK = 1;
  let minError = Math.abs(absVal - bestH);

  let p0 = 0, q0 = 1;
  let p1 = 1, q1 = 0;
  let currentVal = absVal;

  for (let i = 0; i < 25; i++) {
    const a = Math.floor(currentVal);
    const p2 = a * p1 + p0;
    const q2 = a * q1 + q0;

    if (q2 > maxDenominator) break;

    const approx = p2 / q2;
    const error = Math.abs(absVal - approx);
    if (error < minError) {
      minError = error;
      bestH = p2;
      bestK = q2;
    }

    if (error < 1e-10) {
      bestH = p2;
      bestK = q2;
      break;
    }

    const remainder = currentVal - a;
    if (remainder < 1e-10) break;
    currentVal = 1 / remainder;
    p0 = p1; p1 = p2;
    q0 = q1; q1 = q2;
  }

  if (bestK === 1) {
    return (isNeg ? '-' : '') + bestH;
  }
  return (isNeg ? '-' : '') + bestH + '/' + bestK;
}

/**
 * Evaluates mathematical expressions according to standard PEMDAS order of operations.
 * Supports:
 * - Basic operations (+, -, ×, ÷)
 * - Exponents (^ and ²)
 * - Parentheses ((, ))
 * - Distinct unary negative (⁻ or (-)) vs binary subtraction (-)
 * - Floating point decimal precision
 * - Fraction conversion directives (►Fraction, ►Decimal)
 */
export function evaluateNspireExpression(
  rawExpr: string,
  isApproximate: boolean = false
): {
  success: boolean;
  result: string;
  error?: string;
} {
  let cleaned = rawExpr.trim();
  if (!cleaned) {
    return { success: true, result: '' };
  }

  try {
    // Detect conversion directives
    let conversionMode: 'default' | 'fraction' | 'decimal' = isApproximate ? 'decimal' : 'default';

    if (
      /(►|▶|->|to\s*)(fraction|approxfrac|frac)/i.test(cleaned)
    ) {
      conversionMode = 'fraction';
      cleaned = cleaned.replace(/(►|▶|->|to\s*)(fraction|approxfrac|frac)/gi, '').trim();
    } else if (
      /(►|▶|->|to\s*)(decimal|dec)/i.test(cleaned)
    ) {
      conversionMode = 'decimal';
      cleaned = cleaned.replace(/(►|▶|->|to\s*)(decimal|dec)/gi, '').trim();
    }

    if (!cleaned) {
      return { success: true, result: '' };
    }

    // 1. Tokenize expression
    // Normalize characters
    let normalized = cleaned
      .replace(/=/g, '')
      .replace(/×/g, '*')
      .replace(/·/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '^2')
      .replace(/sqrt/gi, '√');

    // Token stream
    const tokens: string[] = [];
    let i = 0;

    while (i < normalized.length) {
      const ch = normalized[i];

      if (ch === ' ' || ch === '\t') {
        i++;
        continue;
      }

      // Dedicated physical negative sign: '⁻' (Unicode \u207B) or '(-)'
      if (ch === '⁻') {
        tokens.push('~'); // Unary negation token
        i++;
        continue;
      }

      if (normalized.startsWith('(-)', i)) {
        tokens.push('~');
        i += 3;
        continue;
      }

      // Square root unary operator: '√'
      if (ch === '√') {
        tokens.push('√');
        i++;
        continue;
      }

      // Numbers (including decimals)
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(normalized[i + 1] || ''))) {
        let numStr = '';
        let hasDot = false;
        while (i < normalized.length && (/[0-9]/.test(normalized[i]) || normalized[i] === '.')) {
          if (normalized[i] === '.') {
            if (hasDot) break;
            hasDot = true;
          }
          numStr += normalized[i];
          i++;
        }
        tokens.push(numStr);
        continue;
      }

      // Operators and Parentheses
      if (['+', '-', '*', '/', '^', '(', ')'].includes(ch)) {
        // Distinguish unary '-' from binary '-' if someone typed regular minus as leading negative
        if (ch === '-') {
          const prev = tokens[tokens.length - 1];
          if (!prev || ['+', '-', '*', '/', '^', '(', '~', '√'].includes(prev)) {
            tokens.push('~');
            i++;
            continue;
          }
        }
        tokens.push(ch);
        i++;
        continue;
      }

      // Unknown character
      i++;
    }

    if (tokens.length === 0) {
      return { success: true, result: '' };
    }

    // Auto-close any unclosed parentheses so expressions like √(49 evaluate cleanly without manual ')'
    let openCount = 0;
    for (const t of tokens) {
      if (t === '(') openCount++;
      else if (t === ')') {
        if (openCount > 0) openCount--;
      }
    }
    while (openCount > 0) {
      tokens.push(')');
      openCount--;
    }

    // Normalize valid implicit multiplication boundaries in the token stream (TI-Nspire architecture):
    // 1. Number followed by '(' -> e.g. 5(-8 + 13), 2(3 + 4), 3(5), 10(-2)
    // 2. ')' followed by '(' -> e.g. (-3)(4), 2(3)(4)
    // 3. ')' followed by a number -> e.g. (2+3)4
    // 4. Number or ')' followed by '√' -> e.g. 2√4, (3)√9
    // 5. Number or ')' followed by unary negation '~' -> e.g. 5⁻8 or (3)⁻2
    const isNumberToken = (t: string | undefined): boolean => {
      if (!t) return false;
      return !isNaN(Number(t)) && !['+', '-', '*', '/', '^', '(', ')', '~', '√'].includes(t);
    };

    const expandedTokens: string[] = [];
    for (let j = 0; j < tokens.length; j++) {
      expandedTokens.push(tokens[j]);
      if (j + 1 < tokens.length) {
        const left = tokens[j];
        const right = tokens[j + 1];

        const leftCanMultiply = isNumberToken(left) || left === ')';
        const rightCanBeMultiplied =
          right === '(' ||
          right === '√' ||
          right === '~' ||
          (left === ')' && isNumberToken(right));

        if (leftCanMultiply && rightCanBeMultiplied) {
          expandedTokens.push('*');
        }
      }
    }
    tokens.length = 0;
    tokens.push(...expandedTokens);

    // 2. Exact rational evaluation and recursive descent parser
    interface EvalValue {
      isExact: boolean;
      num: bigint;
      den: bigint;
      val: number;
    }

    function gcd(a: bigint, b: bigint): bigint {
      a = a < 0n ? -a : a;
      b = b < 0n ? -b : b;
      while (b > 0n) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a === 0n ? 1n : a;
    }

    function makeRational(num: bigint, den: bigint, val: number): EvalValue {
      if (den === 0n) {
        throw new Error('Division by 0');
      }
      if (den < 0n) {
        num = -num;
        den = -den;
      }
      const g = gcd(num, den);
      num = num / g;
      den = den / g;
      return {
        isExact: true,
        num,
        den,
        val,
      };
    }

    function integerSqrt(n: bigint): bigint | null {
      if (n < 0n) return null;
      if (n === 0n) return 0n;
      if (n === 1n) return 1n;
      if (n <= 9007199254740991n) {
        const s = BigInt(Math.floor(Math.sqrt(Number(n))));
        if (s * s === n) return s;
        if ((s + 1n) * (s + 1n) === n) return s + 1n;
        return null;
      }
      let x0 = n / 2n;
      if (x0 === 0n) x0 = 1n;
      let x1 = (x0 + n / x0) / 2n;
      while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + n / x0) / 2n;
      }
      if (x0 * x0 === n) return x0;
      return null;
    }

    function add(a: EvalValue, b: EvalValue): EvalValue {
      const val = a.val + b.val;
      if (a.isExact && b.isExact) {
        const num = a.num * b.den + b.num * a.den;
        const den = a.den * b.den;
        return makeRational(num, den, val);
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    function subtract(a: EvalValue, b: EvalValue): EvalValue {
      const val = a.val - b.val;
      if (a.isExact && b.isExact) {
        const num = a.num * b.den - b.num * a.den;
        const den = a.den * b.den;
        return makeRational(num, den, val);
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    function multiply(a: EvalValue, b: EvalValue): EvalValue {
      const val = a.val * b.val;
      if (a.isExact && b.isExact) {
        const num = a.num * b.num;
        const den = a.den * b.den;
        return makeRational(num, den, val);
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    function divide(a: EvalValue, b: EvalValue): EvalValue {
      if (b.val === 0 || (b.isExact && b.num === 0n)) {
        throw new Error('Division by 0');
      }
      const val = a.val / b.val;
      if (a.isExact && b.isExact) {
        const num = a.num * b.den;
        const den = a.den * b.num;
        return makeRational(num, den, val);
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    function power(a: EvalValue, b: EvalValue): EvalValue {
      const val = Math.pow(a.val, b.val);
      if (a.isExact && b.isExact && b.den === 1n) {
        const exp = Number(b.num);
        if (Number.isInteger(exp) && Math.abs(exp) <= 50) {
          if (exp >= 0) {
            const num = a.num ** BigInt(exp);
            const den = a.den ** BigInt(exp);
            return makeRational(num, den, val);
          } else {
            if (a.num === 0n) throw new Error('Division by 0');
            const posExp = BigInt(-exp);
            const num = a.den ** posExp;
            const den = a.num ** posExp;
            return makeRational(num, den, val);
          }
        }
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    function negate(a: EvalValue): EvalValue {
      return {
        isExact: a.isExact,
        num: -a.num,
        den: a.den,
        val: -a.val,
      };
    }

    function evalSqrt(a: EvalValue): EvalValue {
      if (a.val < 0) {
        throw new Error('Domain Error: Non-real result');
      }
      const val = Math.sqrt(a.val);
      if (a.isExact && a.num >= 0n) {
        const sqrtNum = integerSqrt(a.num);
        const sqrtDen = integerSqrt(a.den);
        if (sqrtNum !== null && sqrtDen !== null) {
          return makeRational(sqrtNum, sqrtDen, val);
        }
      }
      return { isExact: false, num: 0n, den: 1n, val };
    }

    let pos = 0;

    const peek = () => tokens[pos];
    const consume = () => tokens[pos++];

    function parseExpression(): EvalValue {
      let left = parseTerm();
      while (peek() === '+' || peek() === '-') {
        const op = consume();
        const right = parseTerm();
        if (op === '+') left = add(left, right);
        else left = subtract(left, right);
      }
      return left;
    }

    function parseTerm(): EvalValue {
      let left = parsePower();
      while (peek() === '*' || peek() === '/') {
        const op = consume();
        const right = parsePower();
        if (op === '*') {
          left = multiply(left, right);
        } else {
          left = divide(left, right);
        }
      }
      return left;
    }

    function parsePower(): EvalValue {
      let left = parseFactor();
      if (peek() === '^') {
        consume();
        const right = parsePower(); // Right-associative exponent
        left = power(left, right);
      }
      return left;
    }

    function parseFactor(): EvalValue {
      // Unary negation token
      if (peek() === '~') {
        consume();
        return negate(parseFactor());
      }

      // Unary square root token
      if (peek() === '√') {
        consume();
        const inner = parseFactor();
        return evalSqrt(inner);
      }

      // Parentheses
      if (peek() === '(') {
        consume(); // consume '('
        const val = parseExpression();
        if (peek() !== ')') {
          throw new Error('Mismatched parentheses');
        }
        consume(); // consume ')'
        return val;
      }

      // Number literal
      const token = peek();
      if (token && !isNaN(Number(token))) {
        consume();
        if (token.includes('.')) {
          const val = Number(token);
          return { isExact: false, num: 0n, den: 1n, val };
        } else {
          try {
            const num = BigInt(token);
            return { isExact: true, num, den: 1n, val: Number(token) };
          } catch {
            return { isExact: false, num: 0n, den: 1n, val: Number(token) };
          }
        }
      }

      throw new Error('Syntax Error');
    }

    const value = parseExpression();

    if (pos < tokens.length) {
      throw new Error('Syntax Error');
    }

    if (isNaN(value.val) || !isFinite(value.val)) {
      return { success: false, result: 'Error: Calculation Overflow', error: 'Overflow' };
    }

    if (conversionMode === 'fraction') {
      if (value.isExact) {
        if (value.den === 1n) {
          return { success: true, result: value.num.toString() };
        }
        return { success: true, result: `${value.num.toString()}/${value.den.toString()}` };
      }
      return { success: true, result: toFraction(value.val) };
    }

    // Normal ENTER exact rational preservation:
    // If all terms are exact rational quantities, return simplified fraction p/q (or integer p if q === 1)
    if (conversionMode === 'default' && value.isExact) {
      if (value.den === 1n) {
        return { success: true, result: value.num.toString() };
      }
      return { success: true, result: `${value.num.toString()}/${value.den.toString()}` };
    }

    // Format output cleanly (handling float precision artifacts)
    const rounded = Math.round((value.val + Number.EPSILON) * 1e10) / 1e10;
    const formatted = Number.isInteger(rounded)
      ? rounded.toString()
      : parseFloat(rounded.toFixed(6)).toString();

    return { success: true, result: formatted };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Syntax Error';
    if (message.includes('Division by 0')) {
      return { success: false, result: 'Error: Division by 0', error: message };
    }
    return { success: false, result: 'Syntax Error', error: message };
  }
}

/**
 * Core state transition function for the TI-Nspire CX keypad.
 */
export function applyNspireKey(
  prevState: NspireEngineState,
  keyId: string
): NspireEngineState {
  const normKey = keyId.toLowerCase().trim();

  // 1. Power / Home key
  if (normKey === 'on' || normKey === 'home') {
    if (prevState.ctrlActive) {
      // ctrl + on = power off
      return {
        ...prevState,
        isOff: true,
        ctrlActive: false,
        menuLevel: 'none',
      };
    }
    return {
      ...prevState,
      isOff: false,
      ctrlActive: false,
    };
  }

  // If powered off, keys do not alter LCD expression
  if (prevState.isOff) {
    return prevState;
  }

  // 2. Control Key modifier [ctrl]
  if (normKey === 'ctrl' || normKey === 'control') {
    return {
      ...prevState,
      ctrlActive: !prevState.ctrlActive,
    };
  }

  // 3. Clear Function (either ctrl + del, or explicit clear)
  if (normKey === 'clear' || (prevState.ctrlActive && normKey === 'del')) {
    return {
      ...prevState,
      expression: '',
      evaluatedResult: '',
      ctrlActive: false,
      lastEvaluatedExpr: '',
      menuLevel: 'none',
      isTemplateOpen: false,
      selectedTemplate: 'fraction',
      selectedTemplateIndex: 0,
      activeFractionSlot: null,
      fractionNum: '',
      fractionDen: '',
      templateType: null,
      radicand: '',
      cursorRegion: null,
      isInitialSeed: false,
    };
  }

  // 4. Math Templates Key [template]
  if (
    normKey === 'template' ||
    normKey === 'templates' ||
    normKey === '|▫|' ||
    normKey === '|▫|{' ||
    normKey === 'palette'
  ) {
    if (!prevState.isTemplateOpen) {
      return {
        ...prevState,
        isTemplateOpen: true,
        selectedTemplate: 'fraction',
        selectedTemplateIndex: 0,
        menuLevel: 'none',
        ctrlActive: false,
      };
    }
    // Pressing template key again closes palette
    return {
      ...prevState,
      isTemplateOpen: false,
      ctrlActive: false,
    };
  }

  // 5. Template Palette Active Interactions
  if (prevState.isTemplateOpen) {
    // Esc or Del closes template palette without altering expression
    if (normKey === 'esc' || normKey === 'escape' || normKey === 'del' || normKey === 'backspace') {
      return {
        ...prevState,
        isTemplateOpen: false,
        selectedTemplate: 'fraction',
        selectedTemplateIndex: 0,
        ctrlActive: false,
      };
    }

    const curIdx = prevState.selectedTemplateIndex ?? 0;

    // Touchpad arrow navigation between templates
    // RIGHT: move selection one template to the right
    if (normKey === 'right') {
      const nextIdx = curIdx + 1 < PALETTE_TEMPLATES.length ? curIdx + 1 : curIdx;
      return {
        ...prevState,
        selectedTemplateIndex: nextIdx,
        selectedTemplate: PALETTE_TEMPLATES[nextIdx].id,
        ctrlActive: false,
      };
    }

    // LEFT: move selection one template to the left
    if (normKey === 'left') {
      const nextIdx = curIdx > 0 ? curIdx - 1 : 0;
      return {
        ...prevState,
        selectedTemplateIndex: nextIdx,
        selectedTemplate: PALETTE_TEMPLATES[nextIdx].id,
        ctrlActive: false,
      };
    }

    // DOWN: move selection to the corresponding template in the next row, when applicable
    if (normKey === 'down') {
      const nextIdx = curIdx + PALETTE_GRID_COLS < PALETTE_TEMPLATES.length ? curIdx + PALETTE_GRID_COLS : curIdx;
      return {
        ...prevState,
        selectedTemplateIndex: nextIdx,
        selectedTemplate: PALETTE_TEMPLATES[nextIdx].id,
        ctrlActive: false,
      };
    }

    // UP: move selection to the corresponding template in the previous row, when applicable
    if (normKey === 'up') {
      const nextIdx = curIdx - PALETTE_GRID_COLS >= 0 ? curIdx - PALETTE_GRID_COLS : curIdx;
      return {
        ...prevState,
        selectedTemplateIndex: nextIdx,
        selectedTemplate: PALETTE_TEMPLATES[nextIdx].id,
        ctrlActive: false,
      };
    }

    const isSqrtKey = [
      'squareroot',
      'sqrt',
      'root',
      'square_root',
      'square root',
      '√',
      'squareroot_template',
      'root_template',
    ].includes(normKey);

    const isFractionKey = [
      'fraction',
      'frac',
      'fraction_template',
      '▫/▫',
    ].includes(normKey);

    // Template direct selection by ID
    if (isFractionKey) {
      return {
        ...prevState,
        selectedTemplate: 'fraction',
        selectedTemplateIndex: 0,
        ctrlActive: false,
      };
    }

    if (normKey === 'exp') {
      return {
        ...prevState,
        selectedTemplate: 'exp',
        selectedTemplateIndex: 1,
        ctrlActive: false,
      };
    }

    if (normKey === 'log') {
      return {
        ...prevState,
        selectedTemplate: 'log',
        selectedTemplateIndex: 2,
        ctrlActive: false,
      };
    }

    if (isSqrtKey) {
      return {
        ...prevState,
        selectedTemplate: 'sqrt',
        selectedTemplateIndex: 3,
        ctrlActive: false,
      };
    }

    if (normKey === 'nthroot') {
      return {
        ...prevState,
        selectedTemplate: 'nthroot',
        selectedTemplateIndex: 4,
        ctrlActive: false,
      };
    }

    if (normKey === 'abs') {
      return {
        ...prevState,
        selectedTemplate: 'abs',
        selectedTemplateIndex: 5,
        ctrlActive: false,
      };
    }

    if (normKey === 'piecewise') {
      return {
        ...prevState,
        selectedTemplate: 'piecewise',
        selectedTemplateIndex: 6,
        ctrlActive: false,
      };
    }

    if (normKey === 'matrix') {
      return {
        ...prevState,
        selectedTemplate: 'matrix',
        selectedTemplateIndex: 7,
        ctrlActive: false,
      };
    }

    // Confirmation via [enter], [click]
    if (
      normKey === 'enter' ||
      normKey === 'exe' ||
      normKey === 'return' ||
      normKey === 'click' ||
      normKey === 'newline'
    ) {
      const activeIdx = prevState.selectedTemplateIndex ?? 0;
      const activeTmpl = PALETTE_TEMPLATES[activeIdx]?.id || prevState.selectedTemplate || 'fraction';

      if (activeTmpl === 'sqrt') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          templateType: 'sqrt',
          radicand: '',
          cursorRegion: 'radicand',
          expression: '',
          evaluatedResult: '',
          ctrlActive: false,
          activeFractionSlot: null,
          fractionNum: '',
          fractionDen: '',
        };
      }

      if (activeTmpl === 'fraction') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          templateType: 'fraction',
          activeFractionSlot: 'num',
          cursorRegion: 'num',
          fractionNum: '',
          fractionDen: '',
          evaluatedResult: '',
          ctrlActive: false,
        };
      }

      if (activeTmpl === 'exp') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          expression: (prevState.expression || '') + 'e^(',
          ctrlActive: false,
        };
      }

      if (activeTmpl === 'log') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          expression: (prevState.expression || '') + 'log(',
          ctrlActive: false,
        };
      }

      if (activeTmpl === 'nthroot') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          templateType: 'sqrt',
          radicand: '',
          cursorRegion: 'radicand',
          expression: '',
          evaluatedResult: '',
          ctrlActive: false,
        };
      }

      if (activeTmpl === 'abs') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          expression: (prevState.expression || '') + '|',
          ctrlActive: false,
        };
      }

      return {
        ...prevState,
        isTemplateOpen: false,
        selectedTemplate: 'fraction',
        selectedTemplateIndex: 0,
        ctrlActive: false,
      };
    }

    // Direct digit entry while template is selected
    if (/^[0-9]$/.test(normKey)) {
      const activeIdx = prevState.selectedTemplateIndex ?? 0;
      const activeTmpl = PALETTE_TEMPLATES[activeIdx]?.id || prevState.selectedTemplate || 'fraction';

      if (activeTmpl === 'sqrt') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          templateType: 'sqrt',
          radicand: normKey,
          cursorRegion: 'radicand',
          expression: '',
          evaluatedResult: '',
          ctrlActive: false,
          activeFractionSlot: null,
          fractionNum: '',
          fractionDen: '',
        };
      } else if (activeTmpl === 'fraction') {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          templateType: 'fraction',
          activeFractionSlot: 'num',
          cursorRegion: 'num',
          fractionNum: normKey,
          fractionDen: '',
          evaluatedResult: '',
          ctrlActive: false,
        };
      } else {
        return {
          ...prevState,
          isTemplateOpen: false,
          selectedTemplate: 'fraction',
          selectedTemplateIndex: 0,
          expression: (prevState.expression || '') + normKey,
          ctrlActive: false,
        };
      }
    }

    return prevState;
  }

  // 6. Active Stacked Fraction Input Handling
  if (prevState.activeFractionSlot) {
    // Escape cancels/exits the fraction template
    if (normKey === 'esc' || normKey === 'escape') {
      return {
        ...prevState,
        activeFractionSlot: null,
        ctrlActive: false,
      };
    }

    // Down Arrow or Tab moves from numerator to denominator
    if (normKey === 'down' || normKey === 'tab') {
      return {
        ...prevState,
        activeFractionSlot: 'den',
        ctrlActive: false,
      };
    }

    // Up Arrow moves from denominator back to numerator
    if (normKey === 'up') {
      return {
        ...prevState,
        activeFractionSlot: 'num',
        ctrlActive: false,
      };
    }

    // Right Arrow or Enter when finished moves out or evaluates
    if (normKey === 'enter' || normKey === 'exe' || normKey === 'return') {
      const num = prevState.fractionNum || '0';
      const den = prevState.fractionDen || '1';
      const fractionExpr = `${num} ÷ ${den}`;
      const evalRes = evaluateNspireExpression(
        prevState.ctrlActive ? fractionExpr : `${fractionExpr} ►Fraction`,
        prevState.ctrlActive
      );
      return {
        ...prevState,
        expression: `${num}/${den}`,
        evaluatedResult: evalRes.result,
        lastEvaluatedExpr: `${num}/${den}`,
        activeFractionSlot: null,
        templateType: null,
        cursorRegion: null,
        fractionNum: '',
        fractionDen: '',
        ctrlActive: false,
      };
    }

    // Del / Backspace inside fraction slot
    if (normKey === 'del' || normKey === 'backspace') {
      if (prevState.activeFractionSlot === 'num') {
        return {
          ...prevState,
          fractionNum: prevState.fractionNum ? prevState.fractionNum.slice(0, -1) : '',
          ctrlActive: false,
        };
      }
      if (prevState.activeFractionSlot === 'den') {
        return {
          ...prevState,
          fractionDen: prevState.fractionDen ? prevState.fractionDen.slice(0, -1) : '',
          ctrlActive: false,
        };
      }
    }

    // Digit entry inside active fraction slot
    if (/^[0-9]$/.test(normKey)) {
      if (prevState.activeFractionSlot === 'num') {
        return {
          ...prevState,
          fractionNum: (prevState.fractionNum || '') + normKey,
          ctrlActive: false,
        };
      }
      if (prevState.activeFractionSlot === 'den') {
        return {
          ...prevState,
          fractionDen: (prevState.fractionDen || '') + normKey,
          ctrlActive: false,
        };
      }
    }

    // Negative sign inside fraction slot
    if (normKey === '(-)' || normKey === 'neg' || normKey === 'negative') {
      if (prevState.activeFractionSlot === 'num') {
        return {
          ...prevState,
          fractionNum: (prevState.fractionNum || '') + '⁻',
          ctrlActive: false,
        };
      }
      if (prevState.activeFractionSlot === 'den') {
        return {
          ...prevState,
          fractionDen: (prevState.fractionDen || '') + '⁻',
          ctrlActive: false,
        };
      }
    }

    // Decimal point inside fraction slot
    if (normKey === '.' || normKey === 'point') {
      if (prevState.activeFractionSlot === 'num' && !prevState.fractionNum?.includes('.')) {
        return {
          ...prevState,
          fractionNum: (prevState.fractionNum || '') + '.',
          ctrlActive: false,
        };
      }
      if (prevState.activeFractionSlot === 'den' && !prevState.fractionDen?.includes('.')) {
        return {
          ...prevState,
          fractionDen: (prevState.fractionDen || '') + '.',
          ctrlActive: false,
        };
      }
    }

    return prevState;
  }

  // 7. Active Square Root Template Input Handling
  if (prevState.templateType === 'sqrt') {
    // Escape exits the square root template
    if (normKey === 'esc' || normKey === 'escape') {
      return {
        ...prevState,
        templateType: null,
        cursorRegion: null,
        radicand: '',
        ctrlActive: false,
      };
    }

    // Del / Backspace inside radicand
    if (normKey === 'del' || normKey === 'backspace') {
      if (prevState.radicand && prevState.radicand.length > 0) {
        return {
          ...prevState,
          radicand: prevState.radicand.slice(0, -1),
          ctrlActive: false,
        };
      }
      return {
        ...prevState,
        templateType: null,
        cursorRegion: null,
        radicand: '',
        ctrlActive: false,
      };
    }

    // Enter evaluates the square root automatically without requiring closing parenthesis
    if (normKey === 'enter' || normKey === 'exe' || normKey === 'return') {
      const rad = prevState.radicand || '0';
      const cleanRad = rad.replace(/⁻/g, '-');
      const evalRes = evaluateNspireExpression(`√(${cleanRad})`, prevState.ctrlActive);
      return {
        ...prevState,
        templateType: null,
        cursorRegion: null,
        radicand: '',
        expression: `√(${rad})`,
        evaluatedResult: evalRes.result,
        lastEvaluatedExpr: `√(${rad})`,
        ctrlActive: false,
      };
    }

    // Right Arrow, Tab, or closing parenthesis ')' steps out of radical
    if (normKey === 'right' || normKey === 'tab' || normKey === ')' || normKey === 'rparen') {
      const rad = prevState.radicand || '';
      return {
        ...prevState,
        templateType: null,
        cursorRegion: null,
        radicand: '',
        expression: rad ? `√(${rad})` : '',
        ctrlActive: false,
      };
    }

    // Numeric digits 0 - 9 inside radicand
    if (/^[0-9]$/.test(normKey)) {
      return {
        ...prevState,
        radicand: (prevState.radicand || '') + normKey,
        ctrlActive: false,
      };
    }

    // Dedicated negative key inside radicand
    if (normKey === '(-)' || normKey === 'neg' || normKey === 'negative') {
      return {
        ...prevState,
        radicand: (prevState.radicand || '') + '⁻',
        ctrlActive: false,
      };
    }

    // Decimal point inside radicand
    if (normKey === '.' || normKey === 'point') {
      if (!prevState.radicand?.includes('.')) {
        return {
          ...prevState,
          radicand: (prevState.radicand || '') + '.',
          ctrlActive: false,
        };
      }
    }

    return prevState;
  }

  // 8. Menu Key [menu]
  if (normKey === 'menu') {
    if (prevState.menuLevel === 'none') {
      return {
        ...prevState,
        menuLevel: 'root',
        selectedMenuIndex: 0,
        ctrlActive: false,
      };
    }
    // Pressing menu again toggles menu closed
    return {
      ...prevState,
      menuLevel: 'none',
      ctrlActive: false,
    };
  }

  // 5. Escape Key [esc]
  if (normKey === 'esc' || normKey === 'escape') {
    if (prevState.menuLevel === 'number') {
      return {
        ...prevState,
        menuLevel: 'root',
        selectedMenuIndex: 1, // Focus back on '2: Number'
        ctrlActive: false,
      };
    }
    if (prevState.menuLevel === 'root') {
      return {
        ...prevState,
        menuLevel: 'none',
        ctrlActive: false,
      };
    }
    // When menu is already closed, [esc] does NOT destroy the expression
    return {
      ...prevState,
      ctrlActive: false,
    };
  }

  // 6. Navigation and Selection when Menu is active
  if (prevState.menuLevel !== 'none') {
    // Delete while menu is open backs out like esc
    if (normKey === 'del' || normKey === 'backspace') {
      if (prevState.menuLevel === 'number') {
        return {
          ...prevState,
          menuLevel: 'root',
          selectedMenuIndex: 1,
          ctrlActive: false,
        };
      }
      return {
        ...prevState,
        menuLevel: 'none',
        ctrlActive: false,
      };
    }

    // Touchpad arrow navigation
    if (normKey === 'up') {
      const max = prevState.menuLevel === 'root' ? 7 : 8;
      const nextIdx = prevState.selectedMenuIndex > 0 ? prevState.selectedMenuIndex - 1 : max;
      return {
        ...prevState,
        selectedMenuIndex: nextIdx,
        ctrlActive: false,
      };
    }

    if (normKey === 'down') {
      const max = prevState.menuLevel === 'root' ? 7 : 8;
      const nextIdx = prevState.selectedMenuIndex < max ? prevState.selectedMenuIndex + 1 : 0;
      return {
        ...prevState,
        selectedMenuIndex: nextIdx,
        ctrlActive: false,
      };
    }

    if (normKey === 'left') {
      if (prevState.menuLevel === 'number') {
        return {
          ...prevState,
          menuLevel: 'root',
          selectedMenuIndex: 1,
          ctrlActive: false,
        };
      }
      return prevState;
    }

    if (normKey === 'right') {
      if (prevState.menuLevel === 'root' && prevState.selectedMenuIndex === 1) {
        return {
          ...prevState,
          menuLevel: 'number',
          selectedMenuIndex: 0,
          ctrlActive: false,
        };
      }
      return prevState;
    }

    // Confirmation via [enter] or touchpad [click]
    if (normKey === 'enter' || normKey === 'exe' || normKey === 'return' || normKey === 'click') {
      if (prevState.menuLevel === 'root') {
        if (prevState.selectedMenuIndex === 1) {
          // '2: Number >' selected
          return {
            ...prevState,
            menuLevel: 'number',
            selectedMenuIndex: 0,
            ctrlActive: false,
          };
        }
        return prevState;
      }

      if (prevState.menuLevel === 'number') {
        if (prevState.selectedMenuIndex === 0) {
          // 1: Convert to Decimal
          const target = prevState.expression || prevState.evaluatedResult || '';
          return {
            ...prevState,
            expression: target ? `${target} ►Decimal` : 'Ans ►Decimal',
            evaluatedResult: '',
            menuLevel: 'none',
            ctrlActive: false,
          };
        }
        if (prevState.selectedMenuIndex === 1) {
          // 2: Approximate to Fraction
          const target = prevState.expression || prevState.evaluatedResult || '';
          return {
            ...prevState,
            expression: target ? `${target} ►Fraction` : 'Ans ►Fraction',
            evaluatedResult: '',
            menuLevel: 'none',
            ctrlActive: false,
          };
        }
        return prevState;
      }
    }

    // Numeric direct selection in Root Menu
    if (prevState.menuLevel === 'root') {
      if (normKey === '2') {
        // Option 2: Number >
        return {
          ...prevState,
          menuLevel: 'number',
          selectedMenuIndex: 0,
          ctrlActive: false,
        };
      }
      if (['1', '3', '4', '5', '6', '7', '8'].includes(normKey)) {
        return {
          ...prevState,
          selectedMenuIndex: Number(normKey) - 1,
          ctrlActive: false,
        };
      }
      return prevState;
    }

    // Numeric direct selection in Number Submenu
    if (prevState.menuLevel === 'number') {
      if (normKey === '1') {
        // Option 1: Convert to Decimal
        const target = prevState.expression || prevState.evaluatedResult || '';
        return {
          ...prevState,
          expression: target ? `${target} ►Decimal` : 'Ans ►Decimal',
          evaluatedResult: '',
          menuLevel: 'none',
          ctrlActive: false,
        };
      }
      if (normKey === '2') {
        // Option 2: Approximate to Fraction
        const target = prevState.expression || prevState.evaluatedResult || '';
        return {
          ...prevState,
          expression: target ? `${target} ►Fraction` : 'Ans ►Fraction',
          evaluatedResult: '',
          menuLevel: 'none',
          ctrlActive: false,
        };
      }
      if (['3', '4', '5', '6', '7', '8', '9'].includes(normKey)) {
        return {
          ...prevState,
          selectedMenuIndex: Number(normKey) - 1,
          ctrlActive: false,
        };
      }
      return prevState;
    }
  }

  // 7. Delete Key [del] when menu is closed
  if (normKey === 'del' || normKey === 'backspace') {
    let expr = prevState.expression;
    if (expr.endsWith(' ►Decimal')) {
      expr = expr.slice(0, -10);
    } else if (expr.endsWith(' ►Fraction')) {
      expr = expr.slice(0, -11);
    } else if (expr.endsWith(' + ') || expr.endsWith(' - ') || expr.endsWith(' × ') || expr.endsWith(' ÷ ')) {
      expr = expr.slice(0, -3);
    } else if (expr.length > 0) {
      expr = expr.slice(0, -1);
    }
    return {
      ...prevState,
      expression: expr,
      evaluatedResult: '', // Hide answer while editing
      ctrlActive: false,
    };
  }

  // 8. Enter Key [enter] when menu is closed
  if (normKey === 'enter' || normKey === 'exe' || normKey === 'return') {
    if (!prevState.expression) {
      return {
        ...prevState,
        ctrlActive: false,
      };
    }
    const evalRes = evaluateNspireExpression(prevState.expression, prevState.ctrlActive);
    return {
      ...prevState,
      evaluatedResult: evalRes.result,
      lastEvaluatedExpr: prevState.expression,
      ctrlActive: false,
    };
  }

  // If a result was just calculated, or if expression was an initial pre-seeded sample,
  // typing a new number or negative starts a fresh input line
  let currentExpr = prevState.expression;
  if (
    (prevState.evaluatedResult || prevState.isInitialSeed) &&
    !['+', '-', '×', '÷', '*', '/', 'del', 'backspace'].includes(normKey)
  ) {
    currentExpr = '';
  }

  // 6. Numeric digits 0 - 9
  if (/^[0-9]$/.test(normKey)) {
    return {
      ...prevState,
      expression: currentExpr + normKey,
      evaluatedResult: '', // Clear previous answer while typing new digits
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // 7. Arithmetic Operators (+, -, ×, ÷)
  if (normKey === '+' || normKey === 'plus' || normKey === 'add') {
    return {
      ...prevState,
      expression: (currentExpr || (prevState.evaluatedResult ? prevState.evaluatedResult : '')) + ' + ',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === '-' || normKey === 'minus' || normKey === 'subtraction' || normKey === 'subtract') {
    // Physical Subtraction Operator (-)
    return {
      ...prevState,
      expression: (currentExpr || (prevState.evaluatedResult ? prevState.evaluatedResult : '')) + ' - ',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === '×' || normKey === '*' || normKey === 'multiply' || normKey === 'times') {
    return {
      ...prevState,
      expression: (currentExpr || (prevState.evaluatedResult ? prevState.evaluatedResult : '')) + ' × ',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === '÷' || normKey === '/' || normKey === 'divide' || normKey === 'fraction') {
    return {
      ...prevState,
      expression: (currentExpr || (prevState.evaluatedResult ? prevState.evaluatedResult : '')) + ' ÷ ',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // 8. Decimal Point [.]
  if (normKey === '.' || normKey === 'point' || normKey === 'decimal') {
    return {
      ...prevState,
      expression: currentExpr + '.',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // 9. Dedicated Physical Negative Key [(-)]
  // Renders distinctly as raised negative sign '⁻' on TI-Nspire LCD
  if (normKey === '(-)' || normKey === 'neg' || normKey === 'negative' || normKey === '(- )') {
    return {
      ...prevState,
      expression: currentExpr + '⁻',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // 10. Parentheses and Exponents
  if (normKey === '(' || normKey === 'lparen') {
    return {
      ...prevState,
      expression: currentExpr + '(',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === ')' || normKey === 'rparen') {
    return {
      ...prevState,
      expression: currentExpr + ')',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === 'x²' || normKey === 'x^2' || normKey === 'square') {
    if (prevState.ctrlActive) {
      // ctrl + x² = authentic Square Root template
      return {
        ...prevState,
        templateType: 'sqrt',
        radicand: '',
        cursorRegion: 'radicand',
        expression: '',
        evaluatedResult: '',
        ctrlActive: false,
        isInitialSeed: false,
        activeFractionSlot: null,
        fractionNum: '',
        fractionDen: '',
      };
    }
    return {
      ...prevState,
      expression: currentExpr + '²',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // Direct square root key invocation
  if (normKey === '√' || normKey === 'sqrt' || normKey === 'squareroot' || normKey === 'root') {
    return {
      ...prevState,
      templateType: 'sqrt',
      radicand: '',
      cursorRegion: 'radicand',
      expression: '',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
      activeFractionSlot: null,
      fractionNum: '',
      fractionDen: '',
    };
  }

  if (normKey === '^' || normKey === 'power' || normKey === 'caret') {
    return {
      ...prevState,
      expression: currentExpr + '^',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  // 11. Variables & Alpha keys (x, y, z, etc.)
  if (/^[a-z]$/.test(normKey)) {
    return {
      ...prevState,
      expression: currentExpr + normKey,
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  if (normKey === 'space') {
    return {
      ...prevState,
      expression: currentExpr + ' ',
      evaluatedResult: '',
      ctrlActive: false,
      isInitialSeed: false,
    };
  }

  return {
    ...prevState,
    ctrlActive: false,
  };
}
