import { TopicData } from '../../types';
import { UNIT_6_PRACTICE_QUESTIONS } from '../unit6SelfCheckQuestions';

export const TOPIC_6_EQUATIONS_INEQUALITIES: TopicData = {
  id: 'equations-inequalities',
  number: 6,
  title: 'Equations & Inequalities',
  shortTitle: 'Equations & Inequalities',
  subtitle: 'Equations and Inequalities with Variables on Both Sides',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.8.A, 8.8.B, 8.8.C',
  unit: 'Unit 6: Equations & Inequalities',
  summary:
    'Master writing, modeling, representing, and solving one-variable equations and inequalities with variables on both sides. Discover how equations maintain balance through inverse operations, clear fractions with least common multiples, apply decimals with precision, and understand why multiplying or dividing an inequality by a negative number reverses the symbol on the number line.',
  themeColor: {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-800',
    gradient: 'from-teal-600 via-cyan-700 to-blue-800',
  },
  learnOverview:
    'In Grade 8 Mathematics (TEKS 8.8), an equation represents a state of perfect balance between two algebraic expressions. Just like a balanced physical scale, whatever operation you perform on one side must also be performed on the other side to preserve equality. When an equation or inequality has variables on both sides (such as x + 5 = 3x - 1), your strategic goal is to use inverse operations to collect all variable terms onto one side and all constant numbers onto the other side. You will master working with rational numbers—including negative coefficients, clearing fraction denominators using the least common multiple (LCM), and calculating with decimals. In inequalities (<, >, ≤, ≥), you will explore the critical rule: multiplying or dividing both sides by a negative number reflects the values across zero on the number line, requiring the inequality symbol to reverse direction. Finally, you will connect these mathematical models to real-world comparisons, such as competitive gym memberships, service plans, travel rates, and budget limits.',
  concepts: [
    {
      id: 'equations-balance-concept',
      title: 'A. Equations with Variables on Both Sides as a Balance',
      summary:
        'An equation states that two algebraic expressions have the exact same value. Think of the equals sign (=) as the fulcrum of a balance scale.',
      ruleFormula: 'Expression A = Expression B   (e.g., x + 5 = 3x - 1)',
      ruleExplanation:
        'Because both sides are in perfect balance, you must apply the Golden Rule of Algebra: whatever operation you perform on one side, you MUST perform on the opposite side to keep the scale level.',
      keyPoints: [
        'An equation represents balance: the quantity on the left equals the quantity on the right.',
        'Performing an operation on only one side tips the scale and destroys equality.',
        'Properties of Equality: You can add, subtract, multiply, or divide both sides by the same non-zero quantity without changing the solution.',
        'Equations like x + 5 = 3x - 1 have variable terms on both sides of the equals sign.',
        'Visualizing variable boxes and unit weights on balance pans makes the isolation process intuitive.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'solving-procedure-steps',
      title: 'B. Systematic Procedure for Solving Equations',
      summary:
        'Follow a reliable five-step strategy to isolate the unknown variable cleanly and accurately.',
      ruleFormula: 'Step 1: Simplify ➔ Step 2: Move Variables ➔ Step 3: Move Constants ➔ Step 4: Isolate ➔ Step 5: Check',
      ruleExplanation:
        'Simplify both sides first, strategically collect variable terms on one side (usually by eliminating the smaller coefficient), isolate the variable using inverse operations, and verify by substitution.',
      keyPoints: [
        '1. Simplify Each Side: Distribute if needed and combine like terms on each individual side before moving across the equals sign.',
        '2. Move Variable Terms: Use addition or subtraction to collect all variable terms onto one side (e.g., subtract x from both sides of x + 5 = 3x - 1 to get 5 = 2x - 1).',
        '3. Move Constant Terms: Use inverse operations to move all constants to the opposite side (e.g., add 1 to both sides to get 6 = 2x).',
        '4. Isolate the Variable: Multiply or divide by the coefficient to find the value of 1x (e.g., divide by 2 to get x = 3).',
        '5. Check the Solution: Substitute your answer back into the ORIGINAL equation to confirm both sides evaluate to identical numbers: 3 + 5 = 8 and 3(3) - 1 = 8.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'equations-rational-numbers',
      title: 'C. Equations with Rational Numbers (Fractions & Decimals)',
      summary:
        'Grade 8 equations include positive and negative integers, fractions, and decimals as coefficients and constants.',
      ruleFormula: 'Clear Fractions: Multiply all terms by LCM  |  Clear Decimals: Multiply all terms by 10, 100, etc.',
      ruleExplanation:
        'When an equation contains fractions, finding the Least Common Multiple (LCM) of all denominators allows you to clear every fraction in one step, producing a simpler integer equation.',
      keyPoints: [
        'Integer & Negative Coefficients: Remember that subtracting a negative is equivalent to adding a positive: -3x - (-5) = -3x + 5.',
        'Clearing Fractions with LCM: Identify all denominators in the equation. Multiply EVERY term on BOTH sides by their LCM to cancel the denominators.',
        'Example with Fractions: For (1/2)x + 3 = (3/4)x - 1, the LCM of 2 and 4 is 4. Multiplying all four terms by 4 yields 2x + 12 = 3x - 4.',
        'Decimal Strategies: You can solve with decimals directly or multiply every term by 10 (tenths) or 100 (hundredths) to work with whole numbers.',
        'Decimal Example: 0.4x + 5.2 = 0.9x + 1.2 multiplied by 10 becomes 4x + 52 = 9x + 12, yielding 5x = 40, so x = 8.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'real-world-equation-modeling',
      title: 'D. Real-World Equation Modeling (Two Changing Plans)',
      summary:
        'Model real-world situations comparing two options with starting fees and recurring rates to find the break-even decision point.',
      ruleFormula: 'Option A Total Cost = Option B Total Cost   ➔   m₁x + b₁ = m₂x + b₂',
      ruleExplanation:
        'Identify the independent variable (e.g., months, hours, miles), write expressions for each option using Rate × Variable + Starting Fee, and set them equal to solve.',
      keyPoints: [
        'Recognize comparison situations: gym memberships, streaming plans, car rentals, service repairs, and traveling distances.',
        'Translate words to algebra: "Plan A charges $30 per month plus a $20 sign-up fee" translates to 30m + 20.',
        '"Plan B charges $25 per month plus a $45 sign-up fee" translates to 25m + 45.',
        'Set equal to find when costs match: 30m + 20 = 25m + 45 ➔ 5m = 25 ➔ m = 5 months.',
        'Reverse Translation: Given an equation like 15h + 50 = 20h + 20, create a scenario: "Plumber A charges $50 service fee + $15/hr; Plumber B charges $20 service fee + $20/hr."',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'inequalities-variables-both-sides',
      title: 'E. Inequalities with Variables on Both Sides',
      summary:
        'An inequality compares two expressions that are not necessarily equal, using the relational symbols <, >, ≤, and ≥.',
      ruleFormula: '< (less than) | > (greater than) | ≤ (less than or equal to) | ≥ (greater than or equal to)',
      ruleExplanation:
        'Solving an inequality follows the exact same inverse operation steps as solving an equation, but the solution is an entire set of values rather than a single number.',
      keyPoints: [
        '< (Less Than): Strict inequality; graphed on a number line with an OPEN circle pointing left.',
        '> (Greater Than): Strict inequality; graphed on a number line with an OPEN circle pointing right.',
        '≤ (Less Than or Equal To): Inclusive inequality (at most, no more than); graphed with a CLOSED/SOLID circle pointing left.',
        '≥ (Greater Than or Equal To): Inclusive inequality (at least, no less than); graphed with a CLOSED/SOLID circle pointing right.',
        'The solution represents a range of infinite possibilities that make the inequality true.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'critical-inequality-reversal-rule',
      title: 'F. CRITICAL INEQUALITY RULE: The Negative Reversal',
      summary:
        'When you MULTIPLY or DIVIDE both sides of an inequality by a NEGATIVE number, the inequality symbol MUST REVERSE direction.',
      ruleFormula: 'If  -ax < b   then   x > -b/a   (The symbol flips!)',
      ruleExplanation:
        'Why does it flip? On the number line, positive numbers get larger as you move right, but negative numbers with larger magnitudes are further left. Multiplying by a negative reflects every number across zero, reversing their relative order.',
      keyPoints: [
        'Geometric Proof: Consider 2 < 5 (2 is to the left of 5). Multiply both by -1: -2 is now to the RIGHT of -5, so -2 > -5! The symbol flipped!',
        'Division Example: For -6x ≤ -24, divide both sides by -6: x ≥ 4. The ≤ reverses to ≥.',
        'CRITICAL DISTINCTION: Adding or subtracting a negative number does NOT reverse the symbol! Only multiplication and division by a negative cause the flip.',
        'Example of No Flip: In x - 8 > 12, adding 8 does NOT flip the symbol (x > 20). In 3x + 10 < 4, subtracting 10 does NOT flip the symbol (3x < -6 ➔ x < -2).',
        'Test your result: Always substitute a test number from your solution set back into the original inequality to verify the direction.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'inequalities-rational-numbers',
      title: 'G. Inequalities with Rational Numbers',
      summary:
        'Solve multi-step inequalities involving fractions, decimals, and negative coefficients with precision.',
      ruleFormula: 'LCM clears fraction denominators  |  Watch coefficient sign before final division',
      ruleExplanation:
        'Just like equations, multiply all terms by the positive LCM to clear fraction denominators. Because the LCM is positive, the inequality symbol retains its direction during clearing.',
      keyPoints: [
        'Multiply by positive LCM: If you multiply by a positive LCM (like 6), the inequality symbol does NOT flip.',
        'Example: (2/3)x - 5 < (1/6)x + 1. Multiply all 4 terms by 6: 4x - 30 < x + 6. Subtract x: 3x - 30 < 6. Add 30: 3x < 36. Divide by +3: x < 12.',
        'Decimal Inequalities: For -0.5x + 3.5 ≥ 1.5x - 4.5, subtract 1.5x: -2.0x + 3.5 ≥ -4.5. Subtract 3.5: -2.0x ≥ -8.0. Divide by -2.0 (FLIP SYMBOL): x ≤ 4.0.',
        'Always inspect the sign of the variable coefficient right before the final division step.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'real-world-inequality-applications',
      title: 'H. Real-World Inequality Applications & Thresholds',
      summary:
        'Translate Grade 8 real-world constraints—budgets, maximum spending limits, minimum score thresholds, and savings goals—into algebraic inequalities.',
      ruleFormula: 'Real-World Key Words ➔ Key Symbols (≤ "at most", ≥ "at least", < "less than", > "exceeds")',
      ruleExplanation:
        'Identify whether a problem establishes a ceiling (maximum ≤), a floor (minimum ≥), or a comparison between two changing plans (Plan A < Plan B).',
      keyPoints: [
        '"At most", "cannot exceed", "maximum budget of": use ≤.',
        '"At least", "minimum required", "no less than": use ≥.',
        '"Fewer than", "cheaper than", "below": use <.',
        '"More than", "greater than", "exceeds": use >.',
        'Example: "When is Delivery Service B cheaper than Service A?" ➔ Cost B < Cost A.',
        'Two-way translation: Practice both translating verbal descriptions into inequalities AND writing a story scenario to match an inequality.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'Algebraic Expression',
      definition:
        'A mathematical phrase that contains numbers, variables, and operational symbols (+, -, ×, ÷), but does NOT contain an equals sign or inequality sign.',
      symbolOrFormula: '3x + 5  or  7y - 12',
      example: 'In the equation 2x + 6 = 4x - 8, the parts "2x + 6" and "4x - 8" are algebraic expressions.',
      tip: 'An expression has NO equals sign; think of it as a phrase, while an equation is a complete sentence!',
      category: 'Equations & Expressions',
    },
    {
      term: 'Coefficient',
      definition:
        'The numerical factor multiplied by a variable in an algebraic term. It tells you how many units of that variable you have.',
      symbolOrFormula: 'In -5x, the coefficient is -5. In x, the coefficient is 1.',
      example: 'In the term (3/4)x, the coefficient is the rational number 3/4.',
      tip: 'The number "co-operates" with the variable by sticking right next to it!',
      category: 'Equations & Expressions',
    },
    {
      term: 'Constant',
      definition:
        'A fixed numerical value that does not change because it is not attached to any variable.',
      symbolOrFormula: 'In 4x - 9, the constant is -9.',
      example: 'A flat $25 gym registration fee is a constant because it is paid only once regardless of months.',
      tip: 'Constant means "staying the same"—no variable letter can change its value!',
      category: 'Equations & Expressions',
    },
    {
      term: 'Equation',
      definition:
        'A mathematical statement asserting that two expressions are equal, joined by an equals sign (=).',
      symbolOrFormula: 'x + 5 = 3x - 1',
      example: '5x + 3 = 2x + 15 is an equation with variables on both sides.',
      tip: 'Look for the "=" sign! "Equa" comes from the word equal.',
      category: 'Equations & Expressions',
    },
    {
      term: 'Inequality',
      definition:
        'A mathematical statement that compares two expressions using an inequality symbol (<, >, ≤, ≥, or ≠) rather than an equals sign.',
      symbolOrFormula: '7x - 4 > 3x + 16',
      example: '-2x + 8 ≤ 14 indicates that -2x + 8 is less than or equal to 14.',
      tip: 'Inequality means "not necessarily equal"—the solution is an entire range of numbers!',
      category: 'Inequalities & Symbols',
    },
    {
      term: 'Variable',
      definition:
        'A letter or symbol used to represent an unknown quantity that can change or take on different values.',
      symbolOrFormula: 'x, y, m, t, s',
      example: 'In the monthly plan equation 30m + 25 = 205, the variable m represents the number of months.',
      tip: 'Variable means "able to vary" or change.',
      category: 'Equations & Expressions',
    },
    {
      term: 'Solution',
      definition:
        'Any numerical value that, when substituted for the variable, makes an equation or inequality a true mathematical statement.',
      symbolOrFormula: 'For x + 5 = 3x - 1, the solution is x = 3 because 3 + 5 = 3(3) - 1 (8 = 8).',
      example: 'For x > 4, numbers like 5, 6, and 10.5 are all solutions in the solution set.',
      tip: 'Always plug your solution back into the original problem to check your work!',
      category: 'Foundations',
    },
    {
      term: 'Rational Number',
      definition:
        'Any number that can be expressed as the ratio of two integers a/b, where b ≠ 0. Includes whole numbers, integers, fractions, and terminating or repeating decimals.',
      symbolOrFormula: 'a/b  where a, b are integers and b ≠ 0 (e.g., -4, 0.75, 2/3, -1.5)',
      example: 'In -0.5x + 3 = (2/3)x - 1, the coefficients -0.5 and 2/3 are rational numbers.',
      tip: 'Notice the root word: RATIO-nal numbers can be written as a ratio/fraction!',
      category: 'Number Operations',
    },
    {
      term: 'Integer',
      definition:
        'The set of whole numbers, their opposites (negative whole numbers), and zero: {..., -3, -2, -1, 0, 1, 2, 3, ...}.',
      symbolOrFormula: '..., -2, -1, 0, 1, 2, ...',
      example: 'The integers -8, 0, and 15 have no fractional or decimal parts.',
      tip: 'Integers are "clean" counting numbers and their negative counterparts—no fractions allowed!',
      category: 'Number Operations',
    },
    {
      term: 'Inverse Operations',
      definition:
        'Opposite mathematical operations that undo each other: addition undoes subtraction, and multiplication undoes division.',
      symbolOrFormula: '+ undoes -  |  × undoes ÷',
      example: 'To undo adding 5 in x + 5 = 12, subtract 5 from both sides: x = 7.',
      tip: 'Inverse means opposite; use inverse operations to peel layers away from the variable!',
      category: 'Number Operations',
    },
    {
      term: 'Like Terms',
      definition:
        'Terms in an algebraic expression that have the exact same variable raised to the exact same power. Only their numerical coefficients may differ.',
      symbolOrFormula: '4x and 2x are like terms; 7 and -3 are like constant terms.',
      example: 'In 4x + 6 + 2x = 3x + 24, combine 4x + 2x on the left side to get 6x.',
      tip: 'You can only combine items that are the same "species"—x terms with x terms, numbers with numbers!',
      category: 'Equations & Expressions',
    },
    {
      term: 'Least Common Multiple (LCM)',
      definition:
        'The smallest positive integer that is a multiple of two or more given numbers. Used to eliminate fractions in equations.',
      symbolOrFormula: 'LCM(2, 4) = 4;  LCM(3, 6) = 6;  LCM(4, 6) = 12',
      example: 'For (1/3)x + 2 = (1/4)x + 5, multiply every term by LCM(3, 4) = 12 to clear the denominators.',
      tip: 'Multiplying by the LCM clears all denominators in ONE single step!',
      category: 'Number Operations',
    },
    {
      term: 'Common Denominator',
      definition:
        'A shared multiple of the denominators of several fractions, allowing them to be added, subtracted, or cleared from an algebraic equation.',
      symbolOrFormula: 'For denominators 3 and 4, a common denominator is 12.',
      example: 'Multiplying both sides of (2/3)x = (3/4)x - 2 by common denominator 12 produces 8x = 9x - 24.',
      tip: 'The least common denominator (LCD) is simply the LCM of the denominators.',
      category: 'Number Operations',
    },
    {
      term: 'Greater Than',
      definition:
        'An inequality relation showing that the value on the left is strictly larger than the value on the right.',
      symbolOrFormula: 'a > b  (e.g., x > 5)',
      example: 'The inequality x > 5 is graphed with an OPEN circle at 5 and an arrow pointing to the right.',
      tip: 'The wide open side of > faces the larger quantity!',
      category: 'Inequalities & Symbols',
    },
    {
      term: 'Less Than',
      definition:
        'An inequality relation showing that the value on the left is strictly smaller than the value on the right.',
      symbolOrFormula: 'a < b  (e.g., x < 12)',
      example: 'The inequality x < 12 is graphed with an OPEN circle at 12 and an arrow pointing to the left.',
      tip: 'The symbol < points to the left, just like the smaller numbers on a number line!',
      category: 'Inequalities & Symbols',
    },
    {
      term: 'Greater Than or Equal To',
      definition:
        'An inequality relation indicating that the value on the left is larger than or equal to the value on the right (at least, no less than).',
      symbolOrFormula: 'a ≥ b  (e.g., x ≥ 4)',
      example: 'A student must be at least 14 years old to enter: age ≥ 14. Graphed with a CLOSED/SOLID circle at 14.',
      tip: 'The horizontal bar underneath represents the equals sign (=)—the boundary number IS included!',
      category: 'Inequalities & Symbols',
    },
    {
      term: 'Less Than or Equal To',
      definition:
        'An inequality relation indicating that the value on the left is smaller than or equal to the value on the right (at most, maximum, no more than).',
      symbolOrFormula: 'a ≤ b  (e.g., x ≤ 10)',
      example: 'A budget allows at most $150 in spending: cost ≤ 150. Graphed with a CLOSED/SOLID circle at 150.',
      tip: 'Think: "At most"—you can touch the ceiling value, but you cannot go above it!',
      category: 'Inequalities & Symbols',
    },
    {
      term: 'Properties of Equality',
      definition:
        'Fundamental algebraic rules stating that if you add, subtract, multiply, or divide both sides of an equation by the same quantity, the equality remains true.',
      symbolOrFormula: 'If a = b, then a + c = b + c, a - c = b - c, a·c = b·c, and a/c = b/c (c ≠ 0)',
      example: 'Subtracting 2x from both sides of 5x + 3 = 2x + 15 uses the Subtraction Property of Equality.',
      tip: 'This is the golden law of balance—keep both scale pans identical!',
      category: 'Foundations',
    },
    {
      term: 'Symbol Reversal Rule',
      definition:
        'The rule stating that multiplying or dividing both sides of an inequality by a negative number reverses the direction of the inequality symbol (< becomes >, ≤ becomes ≥, etc.).',
      symbolOrFormula: 'If -3x < 15, divide by -3 ➔ x > -5 (Symbol flips from < to >)',
      example: '-6x ≤ -24 divided by -6 yields x ≥ 4.',
      tip: 'NEGATIVE division or multiplication FLIPS the inequality direction across 0!',
      category: 'Inequalities & Symbols',
    },
  ],
  workedExamples: [
    {
      id: 'ex-1-simple-equation-both-sides',
      title: 'Example 1: Simple Equation with Variables on Both Sides',
      problem: 'Solve the equation for x:  5x + 3 = 2x + 15',
      given: '5x + 3 = 2x + 15',
      strategy:
        'Collect the variable terms on the left side by subtracting the smaller variable term (2x) from both sides. Then use inverse operations to isolate x.',
      steps: [
        {
          stepNumber: 1,
          title: 'Subtract 2x from both sides to collect variable terms',
          explanation:
            'Subtract 2x from both sides so that the variable x appears only on the left side of the equation.',
          mathDetail: '5x + 3 - 2x = 2x + 15 - 2x\n3x + 3 = 15',
          visualNote: 'Scale visualization: Removing 2x boxes from both pans leaves 3x boxes and 3 units on the left, and 15 units on the right.',
        },
        {
          stepNumber: 2,
          title: 'Subtract 3 from both sides to isolate the variable term',
          explanation:
            'Use the Subtraction Property of Equality to remove the constant +3 from the left side.',
          mathDetail: '3x + 3 - 3 = 15 - 3\n3x = 12',
          visualNote: 'Removing 3 units from both pans leaves 3x boxes balancing 12 units.',
        },
        {
          stepNumber: 3,
          title: 'Divide both sides by 3 to isolate x',
          explanation:
            'Use the Division Property of Equality to divide both sides by the coefficient 3.',
          mathDetail: '(3x) / 3 = 12 / 3\nx = 4',
          visualNote: 'Dividing into 3 equal groups reveals that 1x box balances exactly 4 units.',
        },
        {
          stepNumber: 4,
          title: 'Check the solution by substitution',
          explanation:
            'Substitute x = 4 back into the original equation to verify that both sides evaluate to identical values.',
          mathDetail: 'Left side:  5(4) + 3 = 20 + 3 = 23\nRight side: 2(4) + 15 = 8 + 15 = 23\n23 = 23  ✔ True!',
          visualNote: 'Both sides evaluate to 23, proving x = 4 is the exact solution.',
        },
      ],
      conclusion: 'x = 4',
      teacherTip:
        'Subtracting the smaller variable term (2x instead of 5x) keeps the coefficient of x positive (+3x), avoiding the need to divide by a negative number later.',
      commonMistake:
        'Students often accidentally add 2x to both sides instead of subtracting, or forget to subtract 2x from BOTH sides.',
    },
    {
      id: 'ex-2-combining-like-terms-first',
      title: 'Example 2: Equation Requiring Combining Like Terms First',
      problem: 'Solve the equation for x:  4x + 6 + 2x = 3x + 24',
      given: '4x + 6 + 2x = 3x + 24',
      strategy:
        'Simplify the left side first by combining like terms (4x and 2x). Once each side is simplified, use inverse operations to collect variables and isolate x.',
      steps: [
        {
          stepNumber: 1,
          title: 'Combine like terms on the left side',
          explanation:
            'Notice that 4x and 2x are like terms on the same side of the equals sign. Add them together: 4x + 2x = 6x.',
          mathDetail: '(4x + 2x) + 6 = 3x + 24\n6x + 6 = 3x + 24',
          visualNote: 'Always simplify everything on the left and right pans before moving items between pans.',
        },
        {
          stepNumber: 2,
          title: 'Subtract 3x from both sides',
          explanation:
            'Collect all variable terms on the left side by subtracting 3x from both sides.',
          mathDetail: '6x - 3x + 6 = 3x - 3x + 24\n3x + 6 = 24',
        },
        {
          stepNumber: 3,
          title: 'Subtract 6 from both sides',
          explanation:
            'Isolate the variable term 3x by subtracting the constant 6 from both sides.',
          mathDetail: '3x + 6 - 6 = 24 - 6\n3x = 18',
        },
        {
          stepNumber: 4,
          title: 'Divide both sides by 3',
          explanation:
            'Divide both sides by the coefficient 3 to find the value of x.',
          mathDetail: '(3x) / 3 = 18 / 3\nx = 6',
        },
        {
          stepNumber: 5,
          title: 'Verify the solution in the original equation',
          explanation:
            'Substitute x = 6 into every occurrence of x in the original equation.',
          mathDetail: 'Left side:  4(6) + 6 + 2(6) = 24 + 6 + 12 = 42\nRight side: 3(6) + 24 = 18 + 24 = 42\n42 = 42  ✔ True!',
        },
      ],
      conclusion: 'x = 6',
      teacherTip:
        'Never cross the equals sign when combining like terms on the same side! Combine terms on the left pan first, combine terms on the right pan second, and only then use inverse operations across the equals sign.',
      commonMistake:
        'Students sometimes subtract 2x from 4x because they confuse combining like terms on one side with inverse operations across the equals sign.',
    },
    {
      id: 'ex-3-negative-coefficients-constants',
      title: 'Example 3: Equation Involving Negative Coefficients and Constants',
      problem: 'Solve the equation for x:  -3x + 7 = 2x - 18',
      given: '-3x + 7 = 2x - 18',
      strategy:
        'Eliminate the negative coefficient by adding 3x to both sides. Then isolate the variable term by adding 18 to both sides, and divide by 5.',
      steps: [
        {
          stepNumber: 1,
          title: 'Add 3x to both sides',
          explanation:
            'The inverse of -3x is +3x. Adding 3x to both sides moves all variable terms to the right side and produces a positive coefficient (+5x).',
          mathDetail: '-3x + 3x + 7 = 2x + 3x - 18\n7 = 5x - 18',
          visualNote: 'Adding 3x to both sides cancels -3x on the left and gives 5x on the right.',
        },
        {
          stepNumber: 2,
          title: 'Add 18 to both sides',
          explanation:
            'The inverse of subtracting 18 is adding 18. Add 18 to both sides to isolate the 5x term.',
          mathDetail: '7 + 18 = 5x - 18 + 18\n25 = 5x',
        },
        {
          stepNumber: 3,
          title: 'Divide both sides by 5',
          explanation:
            'Divide both sides by the coefficient 5 to solve for x.',
          mathDetail: '25 / 5 = (5x) / 5\n5 = x   ➔   x = 5',
        },
        {
          stepNumber: 4,
          title: 'Check with original negative values',
          explanation:
            'Substitute x = 5 back into the original equation and carefully track signs.',
          mathDetail: 'Left side:  -3(5) + 7 = -15 + 7 = -8\nRight side: 2(5) - 18 = 10 - 18 = -8\n-8 = -8  ✔ True!',
        },
      ],
      conclusion: 'x = 5',
      teacherTip:
        'Remember that x can be on either side of the equals sign: 5 = x means the exact same thing as x = 5 (Symmetric Property of Equality).',
      commonMistake:
        'Students often drop the negative sign on -18 when writing the next step, accidentally writing 5x + 18 instead of 5x - 18.',
    },
    {
      id: 'ex-4-fractions-lcm-clearing',
      title: 'Example 4: Equation Involving Fractions (Clearing Denominators with LCM)',
      problem: 'Solve the equation for x:  (1/2)x + 3 = (3/4)x - 1',
      given: '(1/2)x + 3 = (3/4)x - 1',
      strategy:
        'The denominators are 2 and 4. The least common multiple (LCM) is 4. Multiply EVERY term on both sides by 4 to eliminate all fractions in one step.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find the LCM and multiply every term by 4',
          explanation:
            'The denominators are 2 and 4. Since 4 is a multiple of 2, the LCM is 4. Multiply every single term on both sides by 4.',
          mathDetail: '4 · ((1/2)x) + 4 · (3) = 4 · ((3/4)x) - 4 · (1)\n2x + 12 = 3x - 4',
          visualNote: 'Notice that 4 · (1/2) = 2, 4 · 3 = 12, 4 · (3/4) = 3, and 4 · 1 = 4. No more fractions!',
        },
        {
          stepNumber: 2,
          title: 'Subtract 2x from both sides',
          explanation:
            'Collect variable terms on the right side by subtracting 2x from both sides.',
          mathDetail: '2x - 2x + 12 = 3x - 2x - 4\n12 = x - 4',
        },
        {
          stepNumber: 3,
          title: 'Add 4 to both sides to isolate x',
          explanation:
            'Add 4 to both sides to solve for x.',
          mathDetail: '12 + 4 = x - 4 + 4\n16 = x   ➔   x = 16',
        },
        {
          stepNumber: 4,
          title: 'Verify in the original fraction equation',
          explanation:
            'Substitute x = 16 into the original fractional equation.',
          mathDetail: 'Left side:  (1/2)(16) + 3 = 8 + 3 = 11\nRight side: (3/4)(16) - 1 = 12 - 1 = 11\n11 = 11  ✔ True!',
        },
      ],
      conclusion: 'x = 16',
      teacherTip:
        'The most common error in fraction equations is forgetting to multiply the whole-number constants (3 and -1) by the LCM. Every single term must be multiplied by 4 to preserve equality!',
      commonMistake:
        'Students often multiply only the fractions by 4, incorrectly writing 2x + 3 = 3x - 1 instead of 2x + 12 = 3x - 4.',
    },
    {
      id: 'ex-5-decimals-equations',
      title: 'Example 5: Equation Involving Decimals',
      problem: 'Solve the equation for x:  0.4x + 5.2 = 0.9x + 1.2',
      given: '0.4x + 5.2 = 0.9x + 1.2',
      strategy:
        'Multiply every term by 10 to eliminate the decimal tenths and convert all numbers into integers, then solve using standard inverse operations.',
      steps: [
        {
          stepNumber: 1,
          title: 'Multiply every term by 10 to clear decimals',
          explanation:
            'All coefficients and constants have one decimal place (tenths). Multiplying every term by 10 shifts every decimal point one place to the right.',
          mathDetail: '10 · (0.4x) + 10 · (5.2) = 10 · (0.9x) + 10 · (1.2)\n4x + 52 = 9x + 12',
          visualNote: 'Clearing decimals gives clean whole numbers, making calculations easier and less error-prone.',
        },
        {
          stepNumber: 2,
          title: 'Subtract 4x from both sides',
          explanation:
            'Move the smaller variable term (4x) to the right side by subtracting 4x from both sides.',
          mathDetail: '4x - 4x + 52 = 9x - 4x + 12\n52 = 5x + 12',
        },
        {
          stepNumber: 3,
          title: 'Subtract 12 from both sides',
          explanation:
            'Subtract 12 from both sides to isolate the 5x term.',
          mathDetail: '52 - 12 = 5x + 12 - 12\n40 = 5x',
        },
        {
          stepNumber: 4,
          title: 'Divide both sides by 5',
          explanation:
            'Divide both sides by 5 to isolate x.',
          mathDetail: '40 / 5 = (5x) / 5\n8 = x   ➔   x = 8',
        },
        {
          stepNumber: 5,
          title: 'Check with original decimal values',
          explanation:
            'Substitute x = 8 back into the original decimal equation.',
          mathDetail: 'Left side:  0.4(8) + 5.2 = 3.2 + 5.2 = 8.4\nRight side: 0.9(8) + 1.2 = 7.2 + 1.2 = 8.4\n8.4 = 8.4  ✔ True!',
        },
      ],
      conclusion: 'x = 8',
      teacherTip:
        'If an equation has numbers with two decimal places (hundredths), multiply every term by 100 instead of 10.',
      commonMistake:
        'Students calculating directly with decimals sometimes misalign decimal points during subtraction (e.g., confusing 5.2 - 1.2 = 4.0 with 0.4).',
    },
    {
      id: 'ex-6-real-world-equation-modeling',
      title: 'Example 6: Real-World Equation Modeling (Break-Even Plans)',
      problem:
        'Gym Alpha charges a $20 one-time registration fee plus $30 per month. Gym Beta charges a $45 one-time registration fee plus $25 per month. For how many months m will the total cost at both gyms be exactly the same, and what will that cost be?',
      given: 'Gym Alpha: Cost = 30m + 20  |  Gym Beta: Cost = 25m + 45',
      strategy:
        'Set the total cost expressions equal to each other to write the equation 30m + 20 = 25m + 45. Solve for the number of months m, then evaluate the cost.',
      steps: [
        {
          stepNumber: 1,
          title: 'Write the equation equating both gym costs',
          explanation:
            'Let m be the number of months. Set Gym Alpha total cost equal to Gym Beta total cost.',
          mathDetail: 'Cost Alpha = Cost Beta\n30m + 20 = 25m + 45',
          visualNote: 'Rate (slope) attaches to m; one-time fee is the constant.',
        },
        {
          stepNumber: 2,
          title: 'Subtract 25m from both sides',
          explanation:
            'Collect monthly rate terms on the left side by subtracting 25m from both sides.',
          mathDetail: '30m - 25m + 20 = 25m - 25m + 45\n5m + 20 = 45',
        },
        {
          stepNumber: 3,
          title: 'Subtract 20 from both sides',
          explanation:
            'Isolate the 5m term by subtracting 20 from both sides.',
          mathDetail: '5m + 20 - 20 = 45 - 20\n5m = 25',
        },
        {
          stepNumber: 4,
          title: 'Divide both sides by 5',
          explanation:
            'Divide both sides by 5 to find the number of months.',
          mathDetail: '(5m) / 5 = 25 / 5\nm = 5 months',
        },
        {
          stepNumber: 5,
          title: 'Calculate the total cost at 5 months and interpret',
          explanation:
            'Substitute m = 5 into both gym cost formulas to find the total cost.',
          mathDetail: 'Gym Alpha: 30(5) + 20 = 150 + 20 = $170\nGym Beta:  25(5) + 45 = 125 + 45 = $170\nBoth cost $170 at month 5!',
        },
      ],
      conclusion: 'm = 5 months (total cost = $170 at both gyms)',
      teacherTip:
        'Real-world insight: For fewer than 5 months, Gym Alpha is cheaper because of its lower sign-up fee ($20 vs $45). For more than 5 months, Gym Beta is cheaper because its monthly fee ($25 vs $30) saves money over time.',
      commonMistake:
        'Students often reverse rates and constants, accidentally writing 20m + 30 = 45m + 25. Remember: the rate of change is the number that repeats every month!',
    },
    {
      id: 'ex-7-inequality-variables-both-sides',
      title: 'Example 7: Inequality with Variables on Both Sides',
      problem: 'Solve the inequality for x:  7x - 4 > 3x + 16',
      given: '7x - 4 > 3x + 16',
      strategy:
        'Subtract 3x from both sides, add 4 to both sides, and divide by positive 4. Because 4 is positive, the inequality symbol retains its direction (>).',
      steps: [
        {
          stepNumber: 1,
          title: 'Subtract 3x from both sides',
          explanation:
            'Collect variable terms on the left by subtracting 3x from both sides.',
          mathDetail: '7x - 3x - 4 > 3x - 3x + 16\n4x - 4 > 16',
        },
        {
          stepNumber: 2,
          title: 'Add 4 to both sides',
          explanation:
            'Isolate the 4x term by adding 4 to both sides.',
          mathDetail: '4x - 4 + 4 > 16 + 4\n4x > 20',
        },
        {
          stepNumber: 3,
          title: 'Divide both sides by positive 4 (Symbol does NOT flip)',
          explanation:
            'Divide both sides by positive 4. Since 4 is positive, the > symbol stays >.',
          mathDetail: '(4x) / 4 > 20 / 4\nx > 5',
          visualNote: 'Dividing by positive numbers preserves the relative order on the number line.',
        },
        {
          stepNumber: 4,
          title: 'Test a value in the solution set',
          explanation:
            'Pick a test value greater than 5, such as x = 6, to check the original inequality.',
          mathDetail: 'Test x = 6:\nLeft side:  7(6) - 4 = 42 - 4 = 38\nRight side: 3(6) + 16 = 18 + 16 = 34\n38 > 34  ✔ True statement!',
        },
      ],
      conclusion: 'x > 5 (Graphed with an open circle at 5 shading right)',
      teacherTip:
        'When graphing x > 5, use an OPEN circle at 5 because 5 is not included (5 is not greater than 5). Shade all numbers to the right.',
      commonMistake:
        'Students sometimes mistakenly flip the symbol during subtraction in Step 1 or Step 2. Subtraction NEVER flips the inequality symbol!',
    },
    {
      id: 'ex-8-inequality-negative-division-flip',
      title: 'Example 8: Inequality Requiring Division by a Negative Number (Symbol Flip)',
      problem: 'Solve the inequality for x:  -4x + 9 ≤ 2x - 15',
      given: '-4x + 9 ≤ 2x - 15',
      strategy:
        'Subtract 2x from both sides, subtract 9 from both sides, and divide by negative 6. REVERSE the inequality symbol from ≤ to ≥ at the exact moment of dividing by -6.',
      steps: [
        {
          stepNumber: 1,
          title: 'Subtract 2x from both sides',
          explanation:
            'Collect variable terms on the left by subtracting 2x from both sides.',
          mathDetail: '-4x - 2x + 9 ≤ 2x - 2x - 15\n-6x + 9 ≤ -15',
        },
        {
          stepNumber: 2,
          title: 'Subtract 9 from both sides',
          explanation:
            'Subtract 9 from both sides to isolate the -6x term. Remember: -15 - 9 = -24.',
          mathDetail: '-6x + 9 - 9 ≤ -15 - 9\n-6x ≤ -24',
        },
        {
          stepNumber: 3,
          title: 'CRITICAL STEP: Divide by -6 and REVERSE the symbol',
          explanation:
            'Divide both sides by -6. Because we are dividing by a NEGATIVE number, the inequality symbol MUST flip from ≤ to ≥!',
          mathDetail: '(-6x) / (-6)  ≥  (-24) / (-6)    ◄── SYMBOL FLIPS FROM ≤ TO ≥\nx ≥ 4',
          visualNote: 'Dividing by a negative reflects values across 0 on the number line, reversing their order.',
        },
        {
          stepNumber: 4,
          title: 'Verify with a test point',
          explanation:
            'Test a number in the solution set (x ≥ 4), such as x = 5, in the original inequality.',
          mathDetail: 'Test x = 5:\nLeft side:  -4(5) + 9 = -20 + 9 = -11\nRight side: 2(5) - 15 = 10 - 15 = -5\nSince -11 is to the left of -5 on the number line, -11 ≤ -5 is TRUE!  ✔',
        },
      ],
      conclusion: 'x ≥ 4 (Symbol reversed from ≤ to ≥; graphed with solid circle at 4 shading right)',
      teacherTip:
        'Memorize this trigger: The moment your pencil draws the fraction bar with a negative denominator, IMMEDIATELY turn the inequality symbol around!',
      commonMistake:
        'Forgetting to reverse the inequality symbol is the single most frequent mistake on Grade 8 STAAR tests for TEKS 8.8.C.',
    },
    {
      id: 'ex-9-inequalities-fractions',
      title: 'Example 9: Inequality Involving Fractions',
      problem: 'Solve the inequality for x:  (2/3)x - 5 < (1/6)x + 1',
      given: '(2/3)x - 5 < (1/6)x + 1',
      strategy:
        'The denominators are 3 and 6. The least common multiple (LCM) is 6. Multiply every term by positive 6 to clear the fractions without flipping the inequality symbol, then solve.',
      steps: [
        {
          stepNumber: 1,
          title: 'Multiply every term by LCM = 6',
          explanation:
            'Multiply all 4 terms by positive 6 to clear the denominators. Since 6 is positive, the inequality symbol remains <.',
          mathDetail: '6 · ((2/3)x) - 6 · (5) < 6 · ((1/6)x) + 6 · (1)\n4x - 30 < x + 6',
          visualNote: '6 · (2/3) = 4, 6 · 5 = 30, 6 · (1/6) = 1, 6 · 1 = 6. All fractions cleared!',
        },
        {
          stepNumber: 2,
          title: 'Subtract x from both sides',
          explanation:
            'Collect all variable terms on the left side by subtracting x from both sides.',
          mathDetail: '4x - x - 30 < x - x + 6\n3x - 30 < 6',
        },
        {
          stepNumber: 3,
          title: 'Add 30 to both sides',
          explanation:
            'Isolate the 3x term by adding 30 to both sides.',
          mathDetail: '3x - 30 + 30 < 6 + 30\n3x < 36',
        },
        {
          stepNumber: 4,
          title: 'Divide both sides by positive 3',
          explanation:
            'Divide both sides by positive 3. Since 3 is positive, the symbol does NOT flip.',
          mathDetail: '(3x) / 3 < 36 / 3\nx < 12',
        },
        {
          stepNumber: 5,
          title: 'Test with x = 0',
          explanation:
            'Since 0 is in our solution set (0 < 12), test x = 0 in the original inequality.',
          mathDetail: 'Left side:  (2/3)(0) - 5 = -5\nRight side: (1/6)(0) + 1 = 1\n-5 < 1  ✔ True!',
        },
      ],
      conclusion: 'x < 12 (Graphed with open circle at 12 shading left)',
      teacherTip:
        'Testing with x = 0 is often the fastest and easiest way to check inequalities whenever 0 is included in your solution set!',
      commonMistake:
        'Students sometimes forget to multiply the constants (-5 and 1) by 6, producing incorrect terms.',
    },
    {
      id: 'ex-10-real-world-inequality-modeling',
      title: 'Example 10: Real-World Inequality / Budget Comparison Problem',
      problem:
        'A school club has a budget constraint and needs to choose a banquet catering company. Catering Company A charges a $40 flat setup fee plus $8.50 per student. Catering Company B charges a $60 flat setup fee plus $6.50 per student. For what number of students s will Catering Company B be cheaper than or equal in cost to Catering Company A?',
      given: 'Company A: Cost = 8.50s + 40  |  Company B: Cost = 6.50s + 60\nCondition: Cost B ≤ Cost A',
      strategy:
        'Write the inequality representing "Cost B is less than or equal to Cost A": 6.50s + 60 ≤ 8.50s + 40. Solve for the number of students s and interpret.',
      steps: [
        {
          stepNumber: 1,
          title: 'Translate the problem into an algebraic inequality',
          explanation:
            '"Company B is cheaper than or equal to Company A" translates directly to Cost B ≤ Cost A.',
          mathDetail: 'Cost B ≤ Cost A\n6.50s + 60 ≤ 8.50s + 40',
        },
        {
          stepNumber: 2,
          title: 'Subtract 6.50s from both sides',
          explanation:
            'Subtract 6.50s from both sides so that the coefficient of s remains positive on the right.',
          mathDetail: '6.50s - 6.50s + 60 ≤ 8.50s - 6.50s + 40\n60 ≤ 2.00s + 40',
        },
        {
          stepNumber: 3,
          title: 'Subtract 40 from both sides',
          explanation:
            'Subtract the constant 40 from both sides.',
          mathDetail: '60 - 40 ≤ 2.00s + 40 - 40\n20 ≤ 2s',
        },
        {
          stepNumber: 4,
          title: 'Divide both sides by 2 and interpret direction',
          explanation:
            'Divide both sides by 2: 10 ≤ s. Reading with the variable first, this means s ≥ 10.',
          mathDetail: '20 / 2 ≤ (2s) / 2\n10 ≤ s   ➔   s ≥ 10',
          visualNote: '10 ≤ s means "10 is less than or equal to s," which is identical to "s is greater than or equal to 10."',
        },
        {
          stepNumber: 5,
          title: 'Verify with boundary and test points',
          explanation:
            'Check s = 10 (equal cost) and s = 12 (greater than 10).',
          mathDetail: 'At s = 10:\nCompany A: 8.50(10) + 40 = $125\nCompany B: 6.50(10) + 60 = $125\n$125 ≤ $125 (Equal!)\n\nAt s = 12:\nCompany A: 8.50(12) + 40 = $142\nCompany B: 6.50(12) + 60 = $138\n$138 ≤ $142 (Company B is cheaper by $4!)  ✔',
        },
      ],
      conclusion: 's ≥ 10 students (Company B is cheaper or equal whenever 10 or more students attend)',
      teacherTip:
        'When the variable ends up on the right side (10 ≤ s), flip the entire statement around so the variable is on the left: s ≥ 10. Notice the pointed tip still points toward the 10!',
      commonMistake:
        'Misinterpreting 10 ≤ s as s ≤ 10. Always remember that 10 ≤ s means the number of students s must be at least 10.',
    },
  ],
  videoLesson: {
    title: 'Video Library: Equations & Inequalities',
    subtitle: 'TEKS 8.8 Instructional Walkthroughs, Balance Models, Rational Numbers & Symbol Rules',
    instructor: 'Mr. Edgar Pinilla · Grade 8 Mathematics',
    duration: '4 Comprehensive Video Lessons',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/eZsyV0ISzV8',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=eZsyV0ISzV8',
    description:
      'Explore these video lessons aligned to Texas Grade 8 Mathematics (TEKS 8.8.A, 8.8.B, 8.8.C). Learn how equations maintain balance, clear fraction denominators using LCM, master decimal strategies, and discover why multiplying or dividing by a negative number reverses an inequality symbol.',
    keyTakeaways: [
      'An equation is a balanced scale: whatever you perform on one side, you must also perform on the other side.',
      'To clear fraction denominators in multi-step equations, multiply all terms on both sides by the positive LCM.',
      'When multiplying or dividing an inequality by a negative number, the inequality symbol MUST reverse direction.',
      'Real-world equations and inequalities model two changing plans (m₁x + b₁ and m₂x + b₂) to identify break-even decision points and threshold limits.',
    ],
    lessons: [
      {
        id: 'lesson-equations-both-sides',
        title: 'Equations with Variables on Both Sides',
        subtitle: 'An Intro to Solving Equations with Variables on Both Sides | Multi-Step Equations',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/eZsyV0ISzV8',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=eZsyV0ISzV8',
        description:
          'Join Math with Mr. J to explore solving multi-step equations with variables on both sides. Understand the balance model, use inverse operations to isolate variables, and check your final solution.',
        badge: 'Balance Model',
      },
      {
        id: 'lesson-equations-rational-numbers',
        title: 'Equations with Rational Numbers (Fractions & Decimals)',
        subtitle: 'Solving Equations with Fractions | Expressions & Equations | Grade 8',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/GtgVXaJ4t8A',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=GtgVXaJ4t8A',
        description:
          'Learn how to solve equations involving fractional coefficients with Math is Simple! Master clearing denominators and applying inverse operations to find the solution with confidence.',
        badge: 'Rational Numbers',
      },
      {
        id: 'lesson-inequalities-both-sides',
        title: 'Inequalities with Variables on Both Sides',
        subtitle: 'How to Solve Inequalities with Variables on Both Sides',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/Dug_SB85ndQ',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=Dug_SB85ndQ',
        description:
          'Follow Math with Mr. J through step-by-step inequalities with variables on both sides. Master isolating variables and remember the key rule: multiplying or dividing by a negative number reverses the inequality symbol.',
        badge: 'Negative Flip Rule',
      },
      {
        id: 'lesson-inequalities-real-world',
        title: 'Real-World Equations & Inequalities',
        subtitle: 'Writing inequalities to represent real-world problems',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/J0tRjEi4pBw',
        youtubeWatchUrl:
          'https://www.khanacademy.org/math/grade-8-math-tx/x42e41b058fcf4059%3Aone-variable-equations-inequalities-and/x42e41b058fcf4059%3Arepresenting-problems-with-equations-inequalities/v/writing-inequalities-to-represent-real-world-problems',
        description:
          'Watch this Texas Grade 8 aligned Khan Academy lesson to translate real-world scenarios into inequalities, interpret rates and constants, identify comparison relationships, and evaluate solutions in context.',
        badge: 'Real-World Modeling',
      },
    ],
  },
  practiceApp: {
    buttonText: 'Launch Equations & Inequalities Practice Lab',
    appTitle: 'Equations & Inequalities Practice Lab',
    placeholderUrl: 'https://equations-inequalities-practice-lab.edgarpinilla.workers.dev',
    appDescription:
      'Master one-variable linear equations and inequalities with variables on both sides, rational coefficients, negative symbol flips, and real-world models across 10 interactive domains.',
    features: [
      'Interactive balance scale models for equations with variables on both sides',
      'Step-by-step fraction denominator clearing with LCM tools',
      'Decimal equation precision exercises',
      'Inequality symbol flip alerts and number line verification',
      'Real-world break-even and budget comparison word problems',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: UNIT_6_PRACTICE_QUESTIONS,
  },
};
