import { CalculatorLessonModule, CalculatorChallengeQuestion, CalculatorLevel } from './calculatorLabTypes';

export const CALCULATOR_LEVELS: CalculatorLevel[] = [
  {
    id: 1,
    title: 'Level 1: Calculator Basics',
    subtitle: 'Hardware, Operations, Negatives, Fractions & Display Rules',
    status: 'active',
    description: 'Master keyboard orientation, addition, subtraction vs. (-), order of operations, fractions, roots, and numerical precision rules.',
    modulesCount: 16,
  },
  {
    id: 2,
    title: 'Level 2: Graphing & Linear Relationships',
    subtitle: 'Functions, Tables, Tracing & Linear Regression',
    status: 'active',
    description: 'Enter equations into f1(x), trace graphs, locate intercepts, build function tables, and calculate linear regression (mx + b).',
    modulesCount: 14,
  },
  {
    id: 3,
    title: 'Level 3: Systems of Linear Equations',
    subtitle: 'Algebraic linSolve & Graphical Intersection Workflows',
    status: 'active',
    description: 'Solve systems of two linear equations algebraically using linSolve and graphically by graphing, scaling with Zoom-Fit, and tracing intersections.',
    modulesCount: 1,
  },
];

export const CALCULATOR_LEVEL_1_MODULES: CalculatorLessonModule[] = [
  // 1. Getting to Know Your TI-Nspire CX
  {
    id: 'nspire-intro',
    moduleNumber: 1,
    title: 'Getting to Know Your TI-Nspire CX',
    subtitle: 'Powering on, Home screen, Calculator Scratchpad & enter key',
    estimatedMinutes: 5,
    badge: 'Calculator Essentials',
    learn: {
      summary:
        'The TI-Nspire CX is a handheld graphing computer. For everyday 8th-grade calculations, we use the Scratchpad Calculate screen or a standard Calculator document page.',
      keyConcept:
        'The [on / home] button turns the calculator on and returns to the home screen. The [enter] key (bottom right) evaluates expressions and confirms commands.',
      tiNspireProcedure: [
        '1. Press [on] at the top right to wake your calculator.',
        '2. Press the Scratchpad key [A] (or icon) or select "1: New Document" → "1: Add Calculator".',
        '3. Type any calculation using the keypad and press [enter] to evaluate.',
        '4. To clear your current line or start fresh, press [clear] or [doc] → Page Options.',
      ],
      visualDisplay: {
        screenLine1: 'Scratchpad - Calculate',
        screenLine2: '45 + 15',
        screenLine3: '= 60',
        highlightedKeys: ['on', 'enter', 'esc', 'clear'],
        notes: 'The enter key is in the bottom right corner. Press it whenever you finish entering an expression.',
      },
      specialWarning:
        'Notice that the TI-Nspire CX has both an [enter] key and an [esc] key. When in doubt or stuck in a popup menu, pressing [esc] backs you out safely!',
      mathRule:
        'Calculators do not make mistakes; they do exactly what you tell them. Always double-check your screen entry before writing down an answer.',
    },
    guidedPractice: {
      title: 'Turning On & Evaluating',
      scenario: 'You sit down at your classroom desk with your TI-Nspire CX turned off.',
      steps: [
        {
          prompt: 'Which physical key at the upper right powers on your TI-Nspire CX handheld?',
          options: ['[esc]', '[on / home]', '[ctrl]', '[doc]'],
          correctIndex: 1,
          explanation: 'Correct! The [on / home] button in the upper right turns on the handheld and opens the home screen.',
          targetKey: 'on',
          targetKeyAliases: ['home', 'on/home', 'power'],
          targetKeyDisplayName: '[on / home]',
          initialScreen: {
            screenLine1: 'TI-Nspire CX • Powered Off',
            screenLine2: 'Press [on] at the upper right to power on the handheld.',
            screenLine3: '',
            screenOff: true,
          },
          successScreen: {
            screenLine1: 'TI-Nspire CX • Home Screen',
            screenLine2: '1: New Document   |   A: Calculate',
            screenLine3: 'Handheld Powered On ✓',
          },
        },
        {
          prompt: 'After typing a mathematical expression on the calculation screen, which key evaluates it and computes the answer?',
          options: ['[esc]', '[tab]', '[menu]', '[enter]'],
          correctIndex: 3,
          explanation: 'Exactly! The [enter] key in the bottom-right corner submits and calculates the result.',
          targetKey: 'enter',
          targetKeyAliases: ['enter', 'exe', 'return', '≈'],
          targetKeyDisplayName: '[enter]',
          initialScreen: {
            screenLine1: 'Scratchpad - Calculate',
            screenLine2: '45 + 15',
            screenLine3: '',
          },
          successScreen: {
            screenLine1: 'Scratchpad - Calculate',
            screenLine2: '45 + 15',
            screenLine3: '= 60',
          },
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'On your physical classroom TI-Nspire CX, open a calculation screen, type 125 + 85, and press [enter].',
      targetExpression: '125 + 85',
      studentInputPrompt: 'What value did your TI-Nspire CX display?',
      correctExpectedResult: '210',
      acceptedAlternates: ['210.0'],
      hint: 'Type 1, 2, 5, then [+], then 8, 5, and press the [enter] key at the bottom right.',
      successMessage: 'Outstanding! You powered on, entered numbers, and evaluated your first expression.',
      solutionSteps: [
        'Press [1] [2] [5]',
        'Press the [+] key on the right column',
        'Press [8] [5]',
        'Press [enter] → Output displays 210',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'If a menu pops up accidentally or you get trapped in a dialog box on the TI-Nspire CX, which button is the universal cancel/back button?',
      options: [
        '[enter] — to confirm everything',
        '[esc] — at the upper left to cancel and back out safely',
        '[on] — hold for 10 seconds to reboot',
        '[del] — to erase the calculator operating system',
      ],
      correctIndex: 1,
      explanation: 'The [esc] (Escape) button in the upper left corner cancels popups and closes dialogs without making unwanted changes.',
      misconceptionTip: 'Remember: [esc] backs you out. [enter] confirms.',
    },
  },

  // 2. Addition
  {
    id: 'nspire-addition',
    moduleNumber: 2,
    title: 'Addition',
    subtitle: 'Using the [+] operator key and combining positive quantities',
    estimatedMinutes: 4,
    badge: 'Basic Operations',
    learn: {
      summary:
        'Addition on the TI-Nspire CX is entered using the dedicated [+] key on the right-hand operator column.',
      keyConcept:
        'Enter multi-term sums naturally from left to right. The TI-Nspire displays standard mathematical typography on its high-resolution screen.',
      tiNspireProcedure: [
        '1. Enter the first quantity using the numeric keypad.',
        '2. Press the [+] key on the right operator strip.',
        '3. Enter the second quantity.',
        '4. Press [enter] to calculate the sum.',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '48.5 + 23.75',
        screenLine3: '= 72.25',
        highlightedKeys: ['+', 'enter'],
      },
      mathRule:
        'The Commutative Property of Addition states that a + b = b + a. The order does not change the sum.',
    },
    guidedPractice: {
      title: 'Constructing an Addition Expression',
      scenario: 'You need to add 342 and 189.',
      steps: [
        {
          prompt: 'Where is the physical [+] operator key located on the TI-Nspire CX keypad?',
          options: [
            'Along the right-hand column next to the numeric keys',
            'Above the screen in the solar strip',
            'Inside the [menu] button under settings',
            'At the very bottom left corner',
          ],
          correctIndex: 0,
          explanation: 'The basic arithmetic operators [÷], [×], [-], [+] are stacked along the right edge of the numeric keypad.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this perimeter sum on your physical TI-Nspire CX: 46.8 + 19.45',
      targetExpression: '46.8 + 19.45',
      studentInputPrompt: 'Enter the sum shown on your calculator:',
      correctExpectedResult: '66.25',
      acceptedAlternates: ['66.250'],
      hint: 'Type 46.8 [+] 19.45 and press [enter]. Use the decimal point [.] at the bottom of the keypad.',
      successMessage: 'Great job! You calculated 66.25 accurately.',
      solutionSteps: [
        'Type 46.8',
        'Press [+] on the right side',
        'Type 19.45',
        'Press [enter] → 66.25',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Which property guarantees that entering 15 + 47 gives the exact same result as 47 + 15?',
      options: [
        'Distributive Property',
        'Commutative Property of Addition',
        'Zero Product Property',
        'Associative Property of Division',
      ],
      correctIndex: 1,
      explanation: 'The Commutative Property states that the order of terms in addition does not affect the sum.',
      misconceptionTip: 'Order matters for subtraction and division, but never for addition or multiplication.',
    },
  },

  // 3. Subtraction
  {
    id: 'nspire-subtraction',
    moduleNumber: 3,
    title: 'Subtraction',
    subtitle: 'Using the binary subtraction operator key between two numbers',
    estimatedMinutes: 4,
    badge: 'Basic Operations',
    learn: {
      summary:
        'Subtraction is an operation between two numbers (a binary operator). On the TI-Nspire CX, use the [-] key on the right column.',
      keyConcept:
        'The subtraction key [-] requires a number BEFORE it and a number AFTER it. Example: 85 - 29.',
      tiNspireProcedure: [
        '1. Enter the starting amount (minuend).',
        '2. Press the [-] subtraction operator on the right column.',
        '3. Enter the amount to subtract (subtrahend).',
        '4. Press [enter].',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '150 - 64',
        screenLine3: '= 86',
        highlightedKeys: ['-', 'enter'],
      },
      specialWarning:
        'Do NOT use the subtraction key [-] to make a number negative when starting a line! Subtraction means taking away.',
    },
    guidedPractice: {
      title: 'Identifying the Subtraction Operator',
      scenario: 'You want to subtract 45 from 100 on your calculator.',
      steps: [
        {
          prompt: 'What keystroke sequence correctly calculates 100 minus 45?',
          options: [
            '[1][0][0] followed by [-] on the right column, then [4][5], then [enter]',
            '[(-)] then [1][0][0] then [4][5]',
            '[1][0][0] then [4][5] then [-]',
            '[menu] → Algebra → Subtraction',
          ],
          correctIndex: 0,
          explanation: 'Standard infix notation: enter the first number, press the subtraction key [-], enter the second number, then press [enter].',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Use your TI-Nspire CX to evaluate: 324 - 179',
      targetExpression: '324 - 179',
      studentInputPrompt: 'Enter the difference from your calculator screen:',
      correctExpectedResult: '145',
      acceptedAlternates: ['145.0'],
      hint: 'Type 324, press the minus key [-] on the right, type 179, and press [enter].',
      successMessage: 'Correct! 324 - 179 = 145.',
      solutionSteps: [
        'Enter 324',
        'Press the right-column [-] key',
        'Enter 179',
        'Press [enter] → 145',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Unlike addition, subtraction is NOT commutative. What is the difference between 20 - 5 and 5 - 20?',
      options: [
        'Both equal 15',
        '20 - 5 = 15, while 5 - 20 = -15',
        'Both equal -15',
        'The calculator will give a Syntax Error for 5 - 20',
      ],
      correctIndex: 1,
      explanation: 'Order matters in subtraction! 20 - 5 = 15, but 5 - 20 = -15. The calculator handles negative results seamlessly.',
      misconceptionTip: 'Always enter the minuend first and the subtrahend second.',
    },
  },

  // 4. Multiplication
  {
    id: 'nspire-multiplication',
    moduleNumber: 4,
    title: 'Multiplication',
    subtitle: 'Using the [×] key and multiplying decimals and integers',
    estimatedMinutes: 4,
    badge: 'Basic Operations',
    learn: {
      summary:
        'Multiplication is entered using the [×] key on the right column of the keypad.',
      keyConcept:
        'On the TI-Nspire CX screen, multiplication is displayed as a clean dot (·) or cross (×). You can also multiply decimals, whole numbers, and parenthesis groups.',
      tiNspireProcedure: [
        '1. Enter the first factor.',
        '2. Press the [×] key on the right column.',
        '3. Enter the second factor.',
        '4. Press [enter].',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '16 · 12.5',
        screenLine3: '= 200',
        highlightedKeys: ['×', 'enter'],
      },
      mathRule:
        'Remember the sign rules: positive × positive = positive, negative × negative = positive, and positive × negative = negative.',
    },
    guidedPractice: {
      title: 'Multiplying on the Handheld',
      scenario: 'You are calculating total cost: 18 items at $4.75 each.',
      steps: [
        {
          prompt: 'Which operator key do you press between 18 and 4.75?',
          options: ['[+]', '[×] on the right keypad column', '[x] letter variable key at bottom', '[^] exponent'],
          correctIndex: 1,
          explanation: 'Use the arithmetic [×] key on the right column. Notice there is also an alphabetical [x] letter key at the bottom for variables — do not mix them up!',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Calculate the total on your TI-Nspire CX: 24 × 18.5',
      targetExpression: '24 × 18.5',
      studentInputPrompt: 'Enter the product from your screen:',
      correctExpectedResult: '444',
      acceptedAlternates: ['444.0'],
      hint: 'Type 24 [×] 18.5 [enter].',
      successMessage: 'Spot on! 24 × 18.5 = 444.',
      solutionSteps: [
        'Type 24',
        'Press [×] (multiplication)',
        'Type 18.5',
        'Press [enter] → 444',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What is the crucial difference between the [×] multiplication key and the [x] letter key at the bottom of the TI-Nspire?',
      options: [
        'They are identical and can be used interchangeably',
        '[×] is the arithmetic multiplication operator; [x] is the algebraic variable letter x',
        '[x] multiplies; [×] divides',
        '[×] only works in geometry documents',
      ],
      correctIndex: 1,
      explanation: 'This is a common beginner trap: [×] on the right is the math operation, while [x] in the alphabet keyboard represents variable x.',
      misconceptionTip: 'Never use the variable letter x when you want to multiply numbers!',
    },
  },

  // 5. Division
  {
    id: 'nspire-division',
    moduleNumber: 5,
    title: 'Division',
    subtitle: 'Using the [÷] key and understanding division vs. fraction notation',
    estimatedMinutes: 5,
    badge: 'Basic Operations',
    learn: {
      summary:
        'Division is entered using the [÷] key located above multiplication on the right operator column.',
      keyConcept:
        'The TI-Nspire CX displays division as either a standard division bar or a slash. By default, it preserves exact values when possible.',
      tiNspireProcedure: [
        '1. Type the dividend (numerator).',
        '2. Press the [÷] key on the right column.',
        '3. Type the divisor (denominator).',
        '4. Press [enter].',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '84 / 6',
        screenLine3: '= 14',
        highlightedKeys: ['÷', 'enter'],
      },
      specialWarning:
        'Division by zero is undefined in mathematics! If you divide by 0, the TI-Nspire will display "Error: Division by zero".',
    },
    guidedPractice: {
      title: 'Evaluating Division',
      scenario: 'You are splitting $168 equally among 8 classroom groups.',
      steps: [
        {
          prompt: 'How do you enter 168 divided by 8 on your handheld?',
          options: [
            '[8] [÷] [1][6][8] [enter]',
            '[1][6][8] [÷] [8] [enter]',
            '[1][6][8] [-] [8] [enter]',
            '[ctrl] [÷] [1][6][8] [8]',
          ],
          correctIndex: 1,
          explanation: 'The dividend (the total being split, 168) comes first, followed by [÷], then the divisor (8).',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this unit rate on your physical TI-Nspire CX: 468 ÷ 12',
      targetExpression: '468 ÷ 12',
      studentInputPrompt: 'Enter the quotient from your calculator screen:',
      correctExpectedResult: '39',
      acceptedAlternates: ['39.0'],
      hint: 'Type 468 [÷] 12 and press [enter].',
      successMessage: 'Terrific! 468 ÷ 12 = 39.',
      solutionSteps: [
        'Type 468',
        'Press [÷] key on right strip',
        'Type 12',
        'Press [enter] → 39',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What does your calculator display if you attempt to calculate 25 ÷ 0?',
      options: [
        '0',
        '25',
        'Error: Division by zero (undefined)',
        'Infinity',
      ],
      correctIndex: 2,
      explanation: 'Dividing by zero is impossible in mathematics because no number times zero equals 25. The calculator flags an error.',
      misconceptionTip: '0 ÷ 25 = 0, but 25 ÷ 0 is UNDEFINED.',
    },
  },

  // 6. Positive and Negative Numbers
  {
    id: 'nspire-pos-neg',
    moduleNumber: 6,
    title: 'Positive and Negative Numbers',
    subtitle: 'Understanding signed numbers and integer operations',
    estimatedMinutes: 5,
    badge: 'Signed Numbers',
    learn: {
      summary:
        'Negative numbers represent quantities below zero, debts, or opposite directions. On the TI-Nspire CX, every negative number uses the special (-) key.',
      keyConcept:
        'When entering a negative number such as -14, you MUST use the dedicated [(-)] key (to the left of [enter]), NOT the minus sign [-].',
      tiNspireProcedure: [
        '1. Press the white [(-)] key at the bottom row (left of [enter]).',
        '2. Type the number, e.g., [1][4].',
        '3. The screen renders a small, elevated negative sign: ⁻14.',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '-14 + 20',
        screenLine3: '= 6',
        highlightedKeys: ['(-)', '+', 'enter'],
        notes: 'Notice the negative sign is slightly shorter and elevated compared to the subtraction symbol.',
      },
      mathRule:
        'Adding a positive to a negative moves RIGHT on the number line. Example: -14 + 20 = +6.',
    },
    guidedPractice: {
      title: 'Entering a Negative Value',
      scenario: 'You want to enter the starting temperature of -8°F.',
      steps: [
        {
          prompt: 'Which key on the TI-Nspire CX keypad enters the negative sign for -8?',
          options: [
            'The [(-)] key in parentheses at the bottom row next to [enter]',
            'The [-] subtraction key on the right column',
            'The [del] key',
            'The [on] key',
          ],
          correctIndex: 0,
          explanation: 'The dedicated [(-)] key at the bottom row is specifically designed for negative numbers.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'On your physical TI-Nspire CX, evaluate: -15 + 9',
      targetExpression: '-15 + 9',
      studentInputPrompt: 'Enter the result from your calculator:',
      correctExpectedResult: '-6',
      acceptedAlternates: ['-6.0'],
      hint: 'Press [(-)], type 15, press [+], type 9, then press [enter].',
      successMessage: 'Great work! -15 + 9 = -6.',
      solutionSteps: [
        'Press [(-)] key',
        'Type 15',
        'Press [+] key',
        'Type 9',
        'Press [enter] → -6',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'If you have -25 and you add 30, why is the result positive?',
      options: [
        'Because two negatives make a positive',
        'Because 30 has a greater absolute value than -25, so the positive quantity dominates',
        'Because the calculator always rounds to positive',
        'Because addition always produces positive numbers',
      ],
      correctIndex: 1,
      explanation: 'Since |30| > |-25|, the sum lies to the right of zero on the number line: -25 + 30 = +5.',
      misconceptionTip: 'The "two negatives make a positive" rule ONLY applies to multiplication and division, not addition!',
    },
  },

  // 7. Subtraction vs. the (-) Negative Key (SPECIAL EMPHASIS)
  {
    id: 'nspire-subtraction-vs-negative',
    moduleNumber: 7,
    title: 'Subtraction vs. the (-) Negative Key',
    subtitle: 'CRUCIAL SKILL: Mastering the difference between 5 - 8 and -8',
    estimatedMinutes: 6,
    badge: 'Classroom Priority',
    learn: {
      summary:
        'This is the single most common student error on the TI-Nspire CX! Subtraction [-] is an operation between two numbers. The negative key [(-)] defines the sign of a single number.',
      keyConcept:
        'Compare these two expressions: 5 - 8 (five minus eight) uses the operator [-]. But -8 (negative eight) uses the unary negative key [(-)].',
      tiNspireProcedure: [
        '• SUBTRACTION [-] : Located on the right-hand column. Use when taking one number away from another: [5] [-] [8].',
        '• NEGATIVE KEY [(-)] : Located at the very bottom row, enclosed in parentheses. Use when starting a negative quantity or writing a negative factor: [(-)] [8].',
        '• IF YOU CONFUSE THEM : Starting a line with [-] will automatically insert "Ans -", subtracting from your previous answer instead of creating a negative number!',
      ],
      visualDisplay: {
        screenLine1: 'Comparison on TI-Nspire CX:',
        screenLine2: '5 - 8  →  Subtraction key [-] on right',
        screenLine3: '-8 + 5 →  Negative key [(-)] at bottom',
        highlightedKeys: ['-', '(-)'],
        notes: 'Notice [(-)] has parentheses around it on the physical button: (-). The subtraction key [-] is plain.',
      },
      specialWarning:
        'CRITICAL WARNING: If you press the subtraction key [-] at the very beginning of a blank line, the TI-Nspire CX will insert "Ans -", assuming you want to subtract from your previous answer. Always use [(-)] for negative numbers!',
      mathRule:
        'Subtracting a negative is the same as adding: 5 - (-3) = 5 + 3 = 8. Notice how both keys are used together: [5] [-] [(-)] [3].',
    },
    guidedPractice: {
      title: 'Choosing the Right Key',
      scenario: 'You need to evaluate the expression: -12 - 7',
      steps: [
        {
          prompt: 'Which key must you press to enter the negative sign on -12 at the start?',
          options: [
            'The [(-)] key at the bottom row',
            'The [-] subtraction key on the right column',
            'The [del] key',
            'The [ctrl] key',
          ],
          correctIndex: 0,
          explanation: 'Correct! Since -12 is a negative quantity at the start of the expression, you MUST use the [(-)] key.',
        },
        {
          prompt: 'Now, which key do you press to subtract 7 from -12?',
          options: [
            'The [(-)] key at the bottom row',
            'The [-] subtraction key on the right column',
            'The [÷] key',
            'The [tab] key',
          ],
          correctIndex: 1,
          explanation: 'Exactly! The second symbol is the subtraction operation, so you press the right-column [-] key.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this combined expression on your physical TI-Nspire CX: 14 - (-6)',
      targetExpression: '14 - (-6)',
      studentInputPrompt: 'Enter the value displayed on your calculator:',
      correctExpectedResult: '20',
      acceptedAlternates: ['20.0'],
      hint: 'Press [1][4], then the right-column subtraction key [-], then the bottom negative key [(-)], then [6], and press [enter].',
      successMessage: 'Incredible! You correctly differentiated between subtraction and the negative key. 14 - (-6) = 20.',
      solutionSteps: [
        'Type 14',
        'Press [-] (subtraction on right)',
        'Press [(-)] (negative at bottom)',
        'Type 6',
        'Press [enter] → 20',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What happens on the TI-Nspire CX if you accidentally press the subtraction key [-] on an empty calculation line?',
      options: [
        'The calculator powers off',
        'It inserts "Ans -", subtracting from the previous calculation result',
        'It automatically switches to graphing mode',
        'Nothing happens',
      ],
      correctIndex: 1,
      explanation: 'The TI-Nspire CX assumes you want to take the previous answer ("Ans") and subtract from it. If you intended a negative number, use [(-)] instead!',
      misconceptionTip: 'Watch your screen carefully: if you see "Ans -", you pressed the wrong key!',
    },
  },

  // 8. Parentheses
  {
    id: 'nspire-parentheses',
    moduleNumber: 8,
    title: 'Parentheses',
    subtitle: 'Using the ( ) keys to group expressions and protect negative numbers',
    estimatedMinutes: 5,
    badge: 'Grouping Symbols',
    learn: {
      summary:
        'Parentheses are located above the numeric keypad on the TI-Nspire CX. They group terms to override default precedence.',
      keyConcept:
        'Always use parentheses when multiplying by a negative number or grouping a numerator. Example: 4 · (-5) or (18 + 6) ÷ 3.',
      tiNspireProcedure: [
        '1. Press the [(] open parenthesis key.',
        '2. Type the inner expression.',
        '3. Press the [)] close parenthesis key.',
        '4. Every open parenthesis must have a matching closing parenthesis!',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '(18 + 6) / 3',
        screenLine3: '= 8',
        highlightedKeys: ['(', ')', 'enter'],
      },
      mathRule:
        'Without parentheses, 18 + 6 ÷ 3 = 18 + 2 = 20. WITH parentheses, (18 + 6) ÷ 3 = 24 ÷ 3 = 8. Grouping changes everything!',
    },
    guidedPractice: {
      title: 'Parentheses and Grouping',
      scenario: 'You are computing the average of three quiz scores: 80, 90, and 100.',
      steps: [
        {
          prompt: 'How must you enter the sum of the scores so the division applies to all three?',
          options: [
            '80 + 90 + 100 / 3',
            '(80 + 90 + 100) / 3 using parentheses around the whole numerator',
            '80 / 3 + 90 + 100',
            '(80) + (90) + (100) / 3',
          ],
          correctIndex: 1,
          explanation: 'Wrapping the entire sum in parentheses ensures the addition happens first, before dividing by 3.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this grouped expression on your TI-Nspire CX: 5 · (12 - 4)',
      targetExpression: '5 · (12 - 4)',
      studentInputPrompt: 'Enter the result from your calculator:',
      correctExpectedResult: '40',
      acceptedAlternates: ['40.0'],
      hint: 'Type 5 [×] [(] 12 [-] 4 [)] and press [enter].',
      successMessage: 'Well done! 5 · (8) = 40.',
      solutionSteps: [
        'Type 5',
        'Press [×] (or press [(] directly)',
        'Type 12 [-] 4',
        'Press [)]',
        'Press [enter] → 40',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What error message will the TI-Nspire display if you open a parenthesis "(" but forget to close it before pressing enter?',
      options: [
        '"Error: Low Battery"',
        '"Error: Open Parenthesis" or "Error: Syntax"',
        '"Error: Divide by Zero"',
        'The screen will freeze forever',
      ],
      correctIndex: 1,
      explanation: 'Every open parenthesis requires a closed partner. The TI-Nspire will flag a Syntax error if parentheses are unbalanced.',
      misconceptionTip: 'Count your open and closed parentheses: they must always match in quantity.',
    },
  },

  // 9. Order of Operations
  {
    id: 'nspire-pemdas',
    moduleNumber: 9,
    title: 'Order of Operations',
    subtitle: 'How the TI-Nspire CX strictly follows PEMDAS / GEMDAS',
    estimatedMinutes: 5,
    badge: 'Math Structure',
    learn: {
      summary:
        'The TI-Nspire CX uses algebraic logic and strictly follows PEMDAS: Parentheses, Exponents, Multiplication & Division (left to right), Addition & Subtraction (left to right).',
      keyConcept:
        'The calculator will NEVER just calculate left to right blindly. In 8 + 3 · 4, it multiplies 3 · 4 = 12 first, then adds 8 to get 20.',
      tiNspireProcedure: [
        '1. Type the expression exactly as written in your textbook.',
        '2. Verify that grouping symbols are in place.',
        '3. Press [enter] — the calculator automatically resolves operations in proper mathematical order.',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '8 + 3 · 4',
        screenLine3: '= 20  (not 44!)',
        highlightedKeys: ['+', '×', 'enter'],
      },
      mathRule:
        'Multiplication and division have EQUAL priority and are evaluated left-to-right. Same for addition and subtraction.',
    },
    guidedPractice: {
      title: 'Predicting the Calculator Output',
      scenario: 'You enter: 20 - 4 · 2 + 6',
      steps: [
        {
          prompt: 'Which operation will the TI-Nspire CX perform first?',
          options: [
            '20 - 4 (subtraction)',
            '4 · 2 (multiplication)',
            '2 + 6 (addition)',
            'All at the same time',
          ],
          correctIndex: 1,
          explanation: 'Multiplication comes before addition and subtraction in PEMDAS. 4 · 2 = 8 is calculated first, leaving 20 - 8 + 6 = 18.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Type this exact expression into your physical TI-Nspire CX: 36 ÷ 6 · 2 + 5',
      targetExpression: '36 ÷ 6 · 2 + 5',
      studentInputPrompt: 'Enter the value calculated by your handheld:',
      correctExpectedResult: '17',
      acceptedAlternates: ['17.0'],
      hint: 'Type 36 [÷] 6 [×] 2 [+] 5 and press [enter]. Note: 36 ÷ 6 is 6, then 6 · 2 = 12, then 12 + 5 = 17.',
      successMessage: 'Outstanding! The calculator evaluated 36÷6=6, then 6·2=12, then 12+5=17.',
      solutionSteps: [
        '36 ÷ 6 = 6 (left to right division/multiplication)',
        '6 · 2 = 12',
        '12 + 5 = 17',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Why does 10 - 3 + 2 equal 9 and NOT 5?',
      options: [
        'Because addition always comes before subtraction in PEMDAS',
        'Because subtraction and addition have equal priority and must be worked from LEFT to RIGHT: (10 - 3) = 7, then 7 + 2 = 9',
        'Because the calculator made a software glitch',
        'Because 3 + 2 must be evaluated first',
      ],
      correctIndex: 1,
      explanation: 'Addition and Subtraction are tied in priority. When operations of equal rank appear, evaluate strictly from left to right.',
      misconceptionTip: 'The "A" coming before "S" in the acronym PEMDAS does NOT mean addition beats subtraction! They are equal partners from left to right.',
    },
  },

  // 10. Fractions
  {
    id: 'nspire-fractions',
    moduleNumber: 10,
    title: 'Fractions',
    subtitle: 'Using the [ctrl] [÷] fraction template to enter stacked fractions',
    estimatedMinutes: 6,
    badge: 'Classroom Priority',
    learn: {
      summary:
        'The TI-Nspire CX can display beautiful, stacked vertical fractions (numerator directly over denominator) just like a math textbook!',
      keyConcept:
        'Press [ctrl] then [÷] to insert a stacked fraction template. Use the arrow pad or [tab] to move between numerator and denominator.',
      tiNspireProcedure: [
        '1. Press the blue [ctrl] key in the upper left.',
        '2. Press the [÷] division key on the right. A stacked fraction template [ ▢ / ▢ ] appears!',
        '3. Type your numerator in the top box.',
        '4. Press the [▼] down arrow (or [tab]) to move to the bottom box.',
        '5. Type your denominator.',
        '6. Press the [▶] right arrow to move out of the fraction before adding another term.',
        '7. Press [enter]. The calculator simplifies the fraction automatically!',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '3/4 + 1/6',
        screenLine3: '= 11/12  (stacked fraction)',
        highlightedKeys: ['ctrl', '÷', 'tab', 'enter'],
      },
      mathRule:
        'The TI-Nspire CX automatically finds common denominators and reduces fractions to lowest terms.',
    },
    guidedPractice: {
      title: 'Inserting a Stacked Fraction',
      scenario: 'You need to add 2/5 and 1/3 as exact fractions.',
      steps: [
        {
          prompt: 'What key combination creates the vertical stacked fraction template on the TI-Nspire CX?',
          options: [
            '[ctrl] followed by [÷]',
            '[menu] → [8] → [Fractions]',
            '[on] + [enter]',
            'Type three slashes ///',
          ],
          correctIndex: 0,
          explanation: 'Pressing [ctrl] then [÷] accesses the blue fraction template directly above the division key.',
        },
        {
          prompt: 'After typing the numerator 2 in the top box, which key moves your cursor down to the denominator box?',
          options: [
            'The [▼] down arrow on the touchpad, or the [tab] key',
            'The [esc] key',
            'The [on] key',
            'The [ctrl] key',
          ],
          correctIndex: 0,
          explanation: 'Use the down arrow on the directional pad or press [tab] to hop smoothly down to the denominator.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Use stacked fraction templates on your physical TI-Nspire CX to compute: 3/8 + 1/4',
      targetExpression: '3/8 + 1/4',
      studentInputPrompt: 'Enter the reduced fraction result (e.g. 5/8):',
      correctExpectedResult: '5/8',
      acceptedAlternates: ['5 / 8', '0.625'],
      hint: 'Press [ctrl][÷], type 3, down arrow, 8, right arrow, [+], [ctrl][÷], 1, down arrow, 4, [enter].',
      successMessage: 'Brilliant! The TI-Nspire reduced 3/8 + 2/8 to 5/8 automatically.',
      solutionSteps: [
        '[ctrl] [÷] → 3 / 8',
        'Press [▶] to exit fraction',
        'Press [+] key',
        '[ctrl] [÷] → 1 / 4',
        'Press [enter] → 5/8',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Why is pressing the [▶] right arrow important after typing the denominator of a fraction?',
      options: [
        'It changes the color of the screen',
        'It moves the cursor out of the denominator so the next operation isn\'t trapped inside the bottom of the fraction',
        'It automatically multiplies by 2',
        'It restarts the calculator',
      ],
      correctIndex: 1,
      explanation: 'If you do not press [▶], the next plus sign and number will be typed inside the denominator box instead of next to the fraction!',
      misconceptionTip: 'Always tap [▶] to step out of a fraction before continuing your expression.',
    },
  },

  // 11. Fractions to Decimals
  {
    id: 'nspire-frac-to-dec',
    moduleNumber: 11,
    title: 'Fractions to Decimals',
    subtitle: 'Using [ctrl] [enter] to force a decimal approximation',
    estimatedMinutes: 5,
    badge: 'Classroom Priority',
    learn: {
      summary:
        'By default, the TI-Nspire CX gives exact fraction answers. To see the decimal approximation, use the magical [ctrl] [enter] command!',
      keyConcept:
        'Notice the wavy squiggly equal sign (≈) in blue above the [enter] key. Pressing [ctrl] [enter] forces a decimal answer.',
      tiNspireProcedure: [
        'METHOD 1: Enter the fraction (e.g., 7/8). Instead of regular [enter], press [ctrl] then [enter]. Result: 0.875.',
        'METHOD 2: Add a decimal point to any number in your expression (e.g., 7. / 8 or 7 / 8.). The calculator detects the decimal point and gives a decimal output automatically!',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '7/8  [ctrl][enter]',
        screenLine3: '≈ 0.875',
        highlightedKeys: ['ctrl', 'enter'],
        notes: 'Notice the blue ≈ symbol right above the enter key. [ctrl] activates all blue secondary features.',
      },
      mathRule:
        'A fraction bar literally means division: 7/8 = 7 ÷ 8 = 0.875.',
    },
    guidedPractice: {
      title: 'Converting Fractions to Decimals',
      scenario: 'You entered 5/16 and got 5/16 on your screen, but your test asks for a decimal.',
      steps: [
        {
          prompt: 'What keystroke shortcut forces the TI-Nspire CX to display a decimal approximation?',
          options: [
            '[ctrl] followed by [enter]',
            '[esc] + [del]',
            '[on] + [1]',
            'Shake the calculator',
          ],
          correctIndex: 0,
          explanation: 'Pressing [ctrl] then [enter] tells the calculator: "Give me the decimal estimate (≈)!"',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'On your physical TI-Nspire CX, convert the fraction 9/16 into a decimal using [ctrl] [enter].',
      targetExpression: '9/16',
      studentInputPrompt: 'Enter the decimal value shown on your screen:',
      correctExpectedResult: '0.5625',
      acceptedAlternates: ['.5625'],
      hint: 'Type 9 [÷] 16, then press [ctrl] followed by [enter].',
      successMessage: 'Excellent! 9/16 = 0.5625.',
      solutionSteps: [
        'Type 9 [÷] 16 (or [ctrl][÷] 9 / 16)',
        'Press [ctrl] then [enter]',
        'Screen displays 0.5625',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What is the "decimal trick" that avoids having to press [ctrl] [enter]?',
      options: [
        'Typing a decimal point after any number (like 3. / 4)',
        'Pressing the [on] key twice',
        'Erasing the denominator',
        'Holding down the [clear] button',
      ],
      correctIndex: 0,
      explanation: 'If ANY number in your entry contains a decimal point, the TI-Nspire switches to decimal mode automatically.',
      misconceptionTip: 'Remember: 3. / 4 immediately yields 0.75 without extra buttons.',
    },
  },

  // 12. Decimals to Fractions
  {
    id: 'nspire-dec-to-frac',
    moduleNumber: 12,
    title: 'Decimals to Fractions',
    subtitle: 'Converting terminating and repeating decimals into simplified fractions',
    estimatedMinutes: 5,
    badge: 'Number Conversions',
    learn: {
      summary:
        'Need to convert a decimal back into a simplified fraction? The TI-Nspire CX has a built-in "►ApproxFraction" conversion command.',
      keyConcept:
        'You can convert any decimal into its simplest fractional equivalent using the menu command: [menu] → 2: Number → 2: Approximate Fraction.',
      tiNspireProcedure: [
        '1. Type your decimal number, e.g. 0.375.',
        '2. Press [menu].',
        '3. Choose 2: Number.',
        '4. Choose 2: Approximate Fraction (or 1: Convert to Fraction).',
        '5. Press [enter]. The screen displays 3/8!',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '0.375 ►ApproxFraction()',
        screenLine3: '= 3/8',
        highlightedKeys: ['menu', 'enter'],
      },
      mathRule:
        'Every terminating decimal can be written as an integer over a power of 10: 0.375 = 375/1000 = 3/8.',
    },
    guidedPractice: {
      title: 'Navigating the Menu for Fraction Conversion',
      scenario: 'You want to convert 0.65 into a simplified fraction.',
      steps: [
        {
          prompt: 'Which primary menu category holds the Fraction conversion tools?',
          options: [
            '[menu] → 2: Number',
            '[menu] → 4: Calculus',
            '[menu] → 8: Geometry',
            '[menu] → 9: Settings',
          ],
          correctIndex: 0,
          explanation: 'Press [menu] and select 2: Number to access all fraction, decimal, and factor tools.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'On your TI-Nspire CX, convert the decimal 0.625 into a simplified fraction.',
      targetExpression: '0.625 ►Fraction',
      studentInputPrompt: 'Enter the simplified fraction (e.g. a/b):',
      correctExpectedResult: '5/8',
      acceptedAlternates: ['5 / 8'],
      hint: 'Type 0.625, press [menu] → 2: Number → 2: Approximate Fraction, and press [enter].',
      successMessage: 'Nice job! 0.625 simplifies to 5/8.',
      solutionSteps: [
        'Type 0.625',
        'Press [menu] → 2: Number → 2: Approximate Fraction',
        'Press [enter] → 5/8',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What fraction does 0.85 simplify to?',
      options: [
        '85/10',
        '17/20',
        '8/5',
        '13/15',
      ],
      correctIndex: 1,
      explanation: '0.85 = 85/100. Dividing numerator and denominator by 5 gives 17/20.',
      misconceptionTip: 'Always make sure your fraction is in simplest form.',
    },
  },

  // 13. Exponents / Powers
  {
    id: 'nspire-exponents',
    moduleNumber: 13,
    title: 'Exponents / Powers',
    subtitle: 'Using the [x²] key for squares and the [^] caret key for any power',
    estimatedMinutes: 5,
    badge: 'Powers & Roots',
    learn: {
      summary:
        'The TI-Nspire CX has two exponent keys: a dedicated [x²] key for squaring numbers and a caret [^] key for any power.',
      keyConcept:
        'For squares (power of 2), use the [x²] key to the left of the number 4. For any other power (like 2⁵ or 10³), use the [^] key above the division key.',
      tiNspireProcedure: [
        'TO SQUARE A NUMBER: Type base number, press [x²], press [enter]. Example: [7] [x²] [enter] → 49.',
        'FOR ANY POWER: Type base number, press [^], type the exponent, press [▶] to exit the exponent box, then press [enter]. Example: [2] [^] [5] [enter] → 32.',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '7²  → 49',
        screenLine3: '2⁵  → 32',
        highlightedKeys: ['x²', '^', 'enter'],
      },
      specialWarning:
        'BEWARE OF NEGATIVES AND EXPONENTS: (-4)² is NOT the same as -4²! On your calculator, (-4)² = 16, but -4² = -16. Use parentheses if the negative is inside the base!',
      mathRule:
        'An exponent represents repeated multiplication: 2⁵ = 2 · 2 · 2 · 2 · 2 = 32.',
    },
    guidedPractice: {
      title: 'Choosing the Right Exponent Key',
      scenario: 'You need to calculate 4³ (four to the third power).',
      steps: [
        {
          prompt: 'Which physical key allows you to enter an exponent of 3?',
          options: [
            'The [^] caret key (located above division)',
            'The [x²] key',
            'The [+] key',
            'The [doc] key',
          ],
          correctIndex: 0,
          explanation: 'The [^] caret key raises any base to any exponent. Type 4, press [^], type 3, and press [enter].',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this power on your physical TI-Nspire CX: 3⁴',
      targetExpression: '3⁴',
      studentInputPrompt: 'Enter the value calculated by your handheld:',
      correctExpectedResult: '81',
      acceptedAlternates: ['81.0'],
      hint: 'Type 3, press the [^] caret key, type 4, and press [enter].',
      successMessage: 'Awesome! 3⁴ = 3 · 3 · 3 · 3 = 81.',
      solutionSteps: [
        'Type 3',
        'Press [^] caret key',
        'Type 4',
        'Press [enter] → 81',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Why does entering (-5)² give 25 on the TI-Nspire, but entering -5² gives -25?',
      options: [
        'The calculator has a software bug',
        'Order of operations: without parentheses, exponent comes first (5² = 25), then the negative is applied (-25). With parentheses, the negative is squared (-5 · -5 = 25)',
        'Because 5 is an odd number',
        'Because -25 is the same as 25',
      ],
      correctIndex: 1,
      explanation: 'PEMDAS rule: exponents apply ONLY to the base directly preceding them. To square the negative sign, wrap it in parentheses: (-5)².',
      misconceptionTip: 'Always write parentheses around negative bases: (-b)².',
    },
  },

  // 14. Square Roots
  {
    id: 'nspire-square-roots',
    moduleNumber: 14,
    title: 'Square Roots',
    subtitle: 'Using [ctrl] [x²] to calculate exact and decimal roots',
    estimatedMinutes: 5,
    badge: 'Powers & Roots',
    learn: {
      summary:
        'Square roots are the inverse operation of squaring. On the TI-Nspire CX, the square root symbol √ is located in blue above the [x²] key.',
      keyConcept:
        'Press [ctrl] then [x²] to insert a square root radical: √( ▢ ). Type the radicand inside, press [▶] to step outside, and press [enter].',
      tiNspireProcedure: [
        '1. Press the blue [ctrl] key.',
        '2. Press the [x²] key. A square root symbol √( ) appears on screen.',
        '3. Type the number inside the radical, e.g. 144.',
        '4. Press [enter] → 12.',
        '5. For non-perfect squares like √50, press [ctrl] [enter] to see the decimal approximation.',
      ],
      visualDisplay: {
        screenLine1: 'Calculate',
        screenLine2: '√(144)  = 12',
        screenLine3: '√(50)   ≈ 7.07107',
        highlightedKeys: ['ctrl', 'x²', 'enter'],
      },
      mathRule:
        'The square root of a number x is the non-negative value y such that y² = x. Example: √81 = 9 because 9² = 81.',
    },
    guidedPractice: {
      title: 'Entering a Square Root',
      scenario: 'You need to find the hypotenuse length by calculating √64.',
      steps: [
        {
          prompt: 'What keystrokes insert the square root radical symbol on the TI-Nspire CX?',
          options: [
            '[ctrl] followed by [x²]',
            '[ctrl] followed by [÷]',
            '[menu] → [9] → [Root]',
            'Type the word "sqrt"',
          ],
          correctIndex: 0,
          explanation: 'The radical symbol √ is printed in blue above the [x²] key. Press [ctrl] then [x²] to activate it.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Evaluate this radical expression on your TI-Nspire CX: √(196)',
      targetExpression: '√(196)',
      studentInputPrompt: 'Enter the square root from your screen:',
      correctExpectedResult: '14',
      acceptedAlternates: ['14.0'],
      hint: 'Press [ctrl] then [x²], type 196, and press [enter].',
      successMessage: 'Perfect! √196 = 14 because 14 × 14 = 196.',
      solutionSteps: [
        'Press [ctrl] [x²]',
        'Type 196',
        'Press [enter] → 14',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Between which two whole numbers does the value of √30 lie?',
      options: [
        'Between 4 and 5',
        'Between 5 and 6 (since 5² = 25 and 6² = 36)',
        'Between 6 and 7',
        'Between 14 and 16',
      ],
      correctIndex: 1,
      explanation: 'Since 25 < 30 < 36, √30 is between √25 (5) and √36 (6). Test it on your TI-Nspire: √30 ≈ 5.477.',
      misconceptionTip: 'Square roots are NOT divided by 2! √30 is not 15.',
    },
  },

  // 15. Display Settings / Numerical Precision
  {
    id: 'nspire-display-settings',
    moduleNumber: 15,
    title: 'Display Settings / Numerical Precision',
    subtitle: 'Working with approximately 6 digits & preventing premature rounding',
    estimatedMinutes: 6,
    badge: 'Precision Rules',
    learn: {
      summary:
        'In 8th-grade math and STAAR testing, intermediate rounding errors can cause your final answer to be marked completely wrong. Proper calculator display settings keep values precise.',
      keyConcept:
        '“Do not round during intermediate calculations. Keep the calculator value and round only when the problem tells you to.”',
      tiNspireProcedure: [
        '• GOLDEN PRECISION RULE: Keep full precision in the calculator memory throughout all intermediate steps. Only round your FINAL answer at the very last step!',
        '• DISPLAY PRECISION SETTING: In our classroom, the handhelds are configured to show approximately 6 displayed digits (Float 6) to avoid clutter while maintaining high mathematical accuracy.',
        '• TEACHER PROCEDURE: [Teacher procedure to be inserted.]',
        '• USING PREVIOUS ANSWERS: Never write down a rounded number on paper and re-type it. Instead, press [ans] ([ctrl] [(-)]) or use the up arrow to bring down the full, unrounded value!',
      ],
      visualDisplay: {
        screenLine1: 'Settings / Document Settings',
        screenLine2: 'Display Digits: Float 6',
        screenLine3: 'Calculation Mode: Auto / Exact',
        highlightedKeys: ['doc', 'ctrl', '(-)'],
        notes: 'Teacher procedure to be inserted. We will configure and verify the exact classroom menu path together.',
      },
      specialWarning:
        'PREMATURE ROUNDING TRAP: Suppose you calculate 7 ÷ 23 ≈ 0.304348. If you prematurely round to 0.3 on paper and multiply by 1000, you get 300. But the true value is 304.35! That 4.35 error will cost you points on state tests.',
      mathRule:
        '“Do not round during intermediate calculations. Keep the calculator value and round only when the problem tells you to.”',
    },
    guidedPractice: {
      title: 'Precision and Intermediate Rounding',
      scenario: 'You are solving a multi-step geometry problem with π and volume.',
      steps: [
        {
          prompt: 'When is the ONLY time you should round a number during a math problem?',
          options: [
            'At every single intermediate calculation step',
            'Only at the very final step, as directed by the problem prompt',
            'Before typing anything into the calculator',
            'Never round, even on your answer document',
          ],
          correctIndex: 1,
          explanation: 'Always maintain full precision in the calculator during multi-step work. Round ONLY the final answer!',
        },
        {
          prompt: 'What is the exact classroom status for the detailed menu configuration path in this lesson?',
          options: [
            '“Teacher procedure to be inserted.” (We will verify the exact TI-Nspire CX menu sequence later)',
            'Invent a random menu path',
            'Delete the document settings',
            'Always set to Float 1',
          ],
          correctIndex: 0,
          explanation: 'Exactly as requested, the exact classroom menu sequence is marked "Teacher procedure to be inserted" pending teacher verification.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Try this precision test on your TI-Nspire CX: Calculate 10 ÷ 7, keep the full unrounded answer, and multiply directly by 7.',
      targetExpression: '(10 ÷ 7) × 7',
      studentInputPrompt: 'What exact value does the TI-Nspire CX return?',
      correctExpectedResult: '10',
      acceptedAlternates: ['10.0'],
      hint: 'Type 10 [÷] 7, press [enter], then immediately press [×] 7 and [enter]. Notice it returns 10, not 9.9999!',
      successMessage: 'Brilliant! Because the calculator maintained exact rational precision, it returned 10 exactly.',
      solutionSteps: [
        'Type 10 / 7 [enter]',
        'Press [×] 7 (screen says Ans · 7)',
        'Press [enter] → 10',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'What is the official classroom golden rule regarding rounding during intermediate calculations?',
      options: [
        'Round everything to the nearest tenth immediately',
        '“Do not round during intermediate calculations. Keep the calculator value and round only when the problem tells you to.”',
        'Round to whole numbers only',
        'Never use decimals on the TI-Nspire CX',
      ],
      correctIndex: 1,
      explanation: 'Memorize this rule! Premature rounding causes cumulative compounding errors.',
      misconceptionTip: 'Always let the handheld store the full precision in memory.',
    },
  },

  // 16. Calculator Basics Challenge (Comprehensive Mixed Assessment)
  {
    id: 'nspire-basics-challenge',
    moduleNumber: 16,
    title: 'Calculator Basics Challenge',
    subtitle: 'Comprehensive Mixed Skills Assessment (No operational hints provided)',
    estimatedMinutes: 10,
    badge: 'Mastery Challenge',
    learn: {
      summary:
        'In this final Level 1 module, you test your complete mastery across all 15 skills! You will evaluate mixed expressions independently without being told which buttons or operations to use.',
      keyConcept:
        'A confident mathematician chooses the right tool independently. Review parentheses, signed numbers, exponents, fractions, and order of operations before starting.',
      tiNspireProcedure: [
        '1. Read each mathematical expression carefully.',
        '2. Identify whether it requires [(-)] or [-], [ctrl][÷] or [/], [x²] or [^], etc.',
        '3. Enter the expression on your physical TI-Nspire CX.',
        '4. Verify the display matches mathematical typography before pressing [enter].',
        '5. Complete all 5 challenge questions to achieve Level 1 Calculator Certification!',
      ],
      visualDisplay: {
        screenLine1: 'Level 1 Calculator Challenge',
        screenLine2: '5 Mixed Real-World Problems',
        screenLine3: 'Target: 100% Mastery',
        highlightedKeys: ['(-)', '-', 'ctrl', '÷', 'x²', '^'],
        notes: 'Independent decision making: decide which keys to use without guidance.',
      },
      mathRule:
        'Mathematics is about clear thinking, attention to detail, and knowing your tools inside and out.',
    },
    guidedPractice: {
      title: 'Preparing for the Challenge',
      scenario: 'You are about to begin the 5-item mixed assessment.',
      steps: [
        {
          prompt: 'When evaluating an expression with both a negative sign and subtraction, which key comes first in -9 - 4?',
          options: [
            '[(-)] for the negative 9, then [-] for the subtraction of 4',
            '[-] for both',
            '[(-)] for both',
            '[+] for both',
          ],
          correctIndex: 0,
          explanation: 'Always start with the [(-)] negative key for signed numbers, and use the [-] operator between terms.',
        },
      ],
    },
    tryItYourself: {
      taskPrompt: 'Solve this warm-up challenge on your TI-Nspire CX: 4² + √81',
      targetExpression: '4² + √81',
      studentInputPrompt: 'Enter the combined value:',
      correctExpectedResult: '25',
      acceptedAlternates: ['25.0'],
      hint: '4² is 16, and √81 is 9. 16 + 9 = 25.',
      successMessage: 'Great job! 4² = 16, √81 = 9, so 16 + 9 = 25.',
      solutionSteps: [
        '4 [x²] = 16',
        '[ctrl] [x²] 81 = 9',
        '16 + 9 = 25',
      ],
    },
    checkUnderstanding: {
      conceptualQuestion: 'Which key combination on the TI-Nspire CX is used to force a fraction like 5/8 to display as a decimal?',
      options: [
        '[ctrl] followed by [enter]',
        '[esc] followed by [on]',
        '[del] followed by [clear]',
        '[menu] followed by [0]',
      ],
      correctIndex: 0,
      explanation: '[ctrl] [enter] yields the decimal approximation (≈) for any exact fractional expression.',
      misconceptionTip: 'Ready to tackle the 5 challenge problems? Click the Final Challenge tab above!',
    },
  },
];

// The 5 mixed assessment problems specifically named in the prompt
export const CALCULATOR_BASICS_CHALLENGE_QUESTIONS: CalculatorChallengeQuestion[] = [
  {
    id: 'challenge-q1',
    questionNumber: 1,
    category: 'Signed Numbers & Addition',
    prompt: 'Evaluate the expression using your physical TI-Nspire CX:',
    expression: '-7 + 12',
    acceptedAnswers: ['5', '+5', '5.0'],
    displayFormattedAnswer: '5',
    hint: 'Use the [(-)] negative key at the bottom row for -7, then [+] and 12.',
    explanation: '-7 + 12 = 5. Adding 12 moves 12 units to the right on the number line starting from -7.',
    calculatorTip: 'Remember: start with the bottom-row [(-)] key, not the right-column subtraction key.',
  },
  {
    id: 'challenge-q2',
    questionNumber: 2,
    category: 'Division & Negative Divisors',
    prompt: 'Evaluate the expression using your physical TI-Nspire CX:',
    expression: '18 ÷ (-3)',
    acceptedAnswers: ['-6', '-6.0'],
    displayFormattedAnswer: '-6',
    hint: 'Type 18 [÷] [(] [(-)] 3 [)]. A positive divided by a negative yields a negative result.',
    explanation: '18 ÷ (-3) = -6. Since the signs are different, the quotient is negative.',
    calculatorTip: 'Using parentheses around (-3) makes your work clean and avoids syntax confusion.',
  },
  {
    id: 'challenge-q3',
    questionNumber: 3,
    category: 'Powers & Square Roots',
    prompt: 'Evaluate the expression using your physical TI-Nspire CX:',
    expression: '3² + √49',
    acceptedAnswers: ['16', '16.0'],
    displayFormattedAnswer: '16',
    hint: 'Use [x²] to square 3, then [+] and [ctrl][x²] for the square root of 49.',
    explanation: '3² = 9 and √49 = 7. Therefore, 9 + 7 = 16.',
    calculatorTip: 'Remember to press the [▶] right arrow to step out of the radical before pressing enter.',
  },
  {
    id: 'challenge-q4',
    questionNumber: 4,
    category: 'Parentheses & Order of Operations',
    prompt: 'Evaluate the expression using your physical TI-Nspire CX:',
    expression: '(14 - 6) ÷ 4',
    acceptedAnswers: ['2', '2.0'],
    displayFormattedAnswer: '2',
    hint: 'Type [(] 14 [-] 6 [)] [÷] 4. Evaluate inside parentheses first!',
    explanation: '(14 - 6) = 8, then 8 ÷ 4 = 2.',
    calculatorTip: 'Parentheses override default order of operations so subtraction occurs before division.',
  },
  {
    id: 'challenge-q5',
    questionNumber: 5,
    category: 'Fraction to Decimal Conversion',
    prompt: 'Convert this fraction to a decimal using your physical TI-Nspire CX:',
    expression: 'Convert 3/8 to decimal',
    acceptedAnswers: ['0.375', '.375', '0.3750'],
    displayFormattedAnswer: '0.375',
    hint: 'Enter 3/8 using [ctrl][÷] or 3 ÷ 8, then press [ctrl] [enter] to force a decimal.',
    explanation: '3/8 is equivalent to 3 ÷ 8 = 0.375.',
    calculatorTip: 'Use [ctrl] [enter] (≈) to get the decimal approximation of any fraction on the TI-Nspire.',
  },
];
