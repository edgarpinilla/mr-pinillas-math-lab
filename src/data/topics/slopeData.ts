import { TopicData } from '../../types';

export const TOPIC_3_SLOPE: TopicData = {
  id: 'slope-linear-equations',
  number: 3,
  title: 'Slope & Linear Equations',
  shortTitle: 'Slope & Equations',
  subtitle: 'Rate of Change, Rise/Run, Slope Formula & y = mx + b',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.4.A, 8.4.B, 8.4.C, 8.5.I',
  unit: 'Unit 3: Linear Relationships & Functions',
  summary:
    'Master the mathematical concept of slope as a constant rate of change. Calculate slope using rise over run and the slope formula m = (y₂ - y₁) / (x₂ - x₁), analyze positive, negative, zero, and undefined slopes, and formulate linear equations in slope-intercept form y = mx + b.',
  themeColor: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    gradient: 'from-blue-600 to-indigo-700',
  },
  learnOverview:
    'Linear equations describe relationships that graph as straight lines with a constant rate of change called slope (m). In Grade 8, you learn how slope connects similar right triangles, tables of values, coordinate points, and verbal situations. The slope-intercept form y = mx + b reveals both the steepness and direction of the line (m) and its starting point on the y-axis (b).',
  concepts: [
    {
      id: 'slope-rate-of-change',
      title: '1. Slope as Constant Rate of Change & Rise over Run',
      summary:
        'Slope measures the steepness and direction of a straight line. It is the ratio of vertical change (rise, Δy) to horizontal change (run, Δx).',
      ruleFormula: 'm = rise / run = Δy / Δx',
      ruleExplanation:
        'Rise is the change in the vertical y-direction (up = positive, down = negative). Run is the change in the horizontal x-direction (right = positive, left = negative).',
      keyPoints: [
        'On any straight line, the ratio rise / run is constant between ANY two points.',
        'Similar right triangles drawn along the same line always produce equivalent ratios (rise / run).',
        'In real-world contexts, slope represents the unit rate of change (e.g., miles per hour, dollars per gallon).',
      ],
      visualType: 'proportional-comparison',
    },
    {
      id: 'four-types-of-slope',
      title: '2. The Four Types of Slope',
      summary:
        'The direction of a line on the coordinate grid determines whether its slope is positive, negative, zero, or undefined.',
      ruleFormula: 'Positive (+)  |  Negative (-)  |  Zero (0)  |  Undefined (Ø)',
      ruleExplanation:
        'Positive slopes rise from left to right. Negative slopes fall from left to right. Horizontal lines have m = 0. Vertical lines have undefined slope.',
      keyPoints: [
        'Positive Slope (m > 0): Slants uphill from left to right (y increases as x increases).',
        'Negative Slope (m < 0): Slants downhill from left to right (y decreases as x increases).',
        'Zero Slope (m = 0): Horizontal line y = b (no vertical rise: 0 / run = 0).',
        'Undefined Slope: Vertical line x = a (division by zero: rise / 0 = undefined).',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'slope-formula',
      title: '3. The Slope Formula from Two Points',
      summary:
        'When given two coordinate points (x₁, y₁) and (x₂, y₂), compute slope algebraically using the subtraction formula.',
      ruleFormula: 'm = (y₂ - y₁) / (x₂ - x₁)',
      ruleExplanation:
        'Subtract the y-coordinates in the numerator and subtract the x-coordinates in the exact same order in the denominator.',
      keyPoints: [
        'Always keep order consistent: if starting with y₂ on top, you MUST start with x₂ on bottom.',
        'Watch for double negatives: subtracting a negative number becomes addition (e.g., 5 - (-3) = 8).',
        'From a table: pick any two rows (x₁, y₁) and (x₂, y₂) to apply the formula.',
      ],
      visualType: 'proportional-comparison',
    },
    {
      id: 'slope-intercept-form',
      title: '4. Slope-Intercept Form: y = mx + b',
      summary:
        'Slope-intercept form expresses a linear equation in terms of its slope (m) and its y-intercept (b).',
      ruleFormula: 'y = mx + b',
      ruleExplanation:
        'm is the slope (rate of change multiplying the input x). b is the y-intercept, which is the coordinate (0, b) where the line crosses the y-axis.',
      keyPoints: [
        'If b = 0, the equation is y = mx (proportional line passing through the origin).',
        'If b ≠ 0, the equation is non-proportional with an initial starting value of b at x = 0.',
        'In word problems: m is the recurring per-unit rate; b is the one-time flat fee or initial value.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'writing-linear-equations',
      title: '5. Writing Equations from Graphs, Tables & Verbal Models',
      summary:
        'To write the equation of any straight line, identify the slope m and the y-intercept b, then substitute into y = mx + b.',
      ruleFormula: 'Step 1: Find m  →  Step 2: Find b  →  Step 3: Write y = mx + b',
      ruleExplanation:
        'From a graph: locate (0, b) and count rise/run. From a table: find the constant change in y over change in x, and look for row x = 0. From a word problem: locate fixed cost (b) and variable rate (m).',
      keyPoints: [
        'To find b algebraically when (0, b) is not given: substitute m and a known point (x, y) into y = mx + b, then solve for b.',
        'Always check your completed equation by plugging in an ordered pair to verify equality.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'Slope (m)',
      definition:
        'A measure of the steepness and direction of a line, defined as the ratio of the vertical change (rise) to the horizontal change (run).',
      symbolOrFormula: 'm = rise / run = Δy / Δx',
      example: 'In y = 4x - 7, the slope is 4 (the line rises 4 units for every 1 unit right).',
      tip: 'Think of "m" as the Mountain or Move rate!',
      category: 'Rate of Change',
    },
    {
      term: 'Rate of Change',
      definition:
        'A comparison showing how a dependent quantity (y) changes with respect to an independent quantity (x). On a linear graph, rate of change is equal to slope.',
      symbolOrFormula: 'Rate of Change = Change in y / Change in x',
      example: 'A car traveling at 65 miles per hour has a rate of change of 65 mph.',
      tip: 'Always put output units (y) over input units (x).',
      category: 'Rate of Change',
    },
    {
      term: 'Rise',
      definition:
        'The vertical change along the y-axis between two points on a line. Moving up is positive; moving down is negative.',
      symbolOrFormula: 'Rise = y₂ - y₁ = Δy',
      example: 'Going from (2, 3) to (5, 9) gives a rise of 9 - 3 = 6.',
      tip: 'Elevators rise up and down along the y-axis.',
      category: 'Coordinate Geometry',
    },
    {
      term: 'Run',
      definition:
        'The horizontal change along the x-axis between two points on a line. Moving right is positive; moving left is negative.',
      symbolOrFormula: 'Run = x₂ - x₁ = Δx',
      example: 'Going from (2, 3) to (5, 9) gives a run of 5 - 2 = 3.',
      tip: 'You run horizontally along the flat ground (x-axis).',
      category: 'Coordinate Geometry',
    },
    {
      term: 'Slope Formula',
      definition:
        'The algebraic formula used to calculate the slope of a line passing through any two given points (x₁, y₁) and (x₂, y₂).',
      symbolOrFormula: 'm = (y₂ - y₁) / (x₂ - x₁)',
      example: 'Points (1, 5) and (3, 11): m = (11 - 5) / (3 - 1) = 6 / 2 = 3.',
      tip: 'Keep the coordinate order identical on top and bottom!',
      category: 'Formulas',
    },
    {
      term: 'y-Intercept (b)',
      definition:
        'The y-coordinate of the point where a line crosses or intersects the vertical y-axis. It always has an x-coordinate of 0: (0, b).',
      symbolOrFormula: 'Point: (0, b)  |  In y = mx + b, b is the constant',
      example: 'For the equation y = -3x + 8, the y-intercept is (0, 8).',
      tip: 'The y-intercept is your Starting Point (b = "Begin" on the y-axis).',
      category: 'Linear Equations',
    },
    {
      term: 'Slope-Intercept Form',
      definition:
        'A linear equation written in the standard form y = mx + b, where m represents the slope and b represents the y-intercept.',
      symbolOrFormula: 'y = mx + b',
      example: 'y = 2.5x + 15 represents a slope of 2.5 and y-intercept of 15.',
      tip: 'm is attached to x (the multiplier); b stands alone (the constant starting value).',
      category: 'Linear Equations',
    },
    {
      term: 'Zero Slope (m = 0)',
      definition:
        'The slope of a completely flat, horizontal line. There is zero vertical change (rise = 0), regardless of horizontal run.',
      symbolOrFormula: 'm = 0 / run = 0  →  Equation: y = b',
      example: 'The line y = 4 is horizontal across y = 4 with a slope of 0.',
      tip: 'Think of cross-country skiing on flat ground: zero slope = zero effort!',
      category: 'Slope Types',
    },
    {
      term: 'Undefined Slope',
      definition:
        'The slope of a perfectly vertical line. Because there is zero horizontal change (run = 0), calculating slope requires division by zero, which is mathematically undefined.',
      symbolOrFormula: 'm = rise / 0 = Undefined  →  Equation: x = a',
      example: 'The line x = -3 is vertical through x = -3 with an undefined slope.',
      tip: 'Think of skiing off a vertical cliff: you can’t ski it = Undefined!',
      category: 'Slope Types',
    },
    {
      term: 'Initial Value',
      definition:
        'The starting value of the dependent variable (y) before any input change occurs (when x = 0). In a linear model, this is the y-intercept b.',
      symbolOrFormula: 'y-value when x = 0',
      example: 'A $25 membership signup fee before paying $10 per class is the initial value.',
      tip: 'Initial means "at the beginning" (time = 0 or units = 0).',
      category: 'Real-World Modeling',
    },
  ],
  workedExamples: [
    {
      id: 'we-slope-1',
      title: 'Worked Example 1: Finding Slope from a Coordinate Graph using Rise/Run',
      problem:
        'A straight line graphed on a coordinate grid passes through the points (1, 2) and (4, 8). Determine the slope of the line using rise over run.',
      given: 'Point A = (1, 2), Point B = (4, 8)',
      strategy:
        'Count or calculate the vertical change (rise) and the horizontal change (run) between Point A and Point B, then simplify the fraction m = rise / run.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate the vertical rise (Δy)',
          explanation: 'Subtract the y-coordinate of Point A from the y-coordinate of Point B.',
          mathDetail: 'Rise = 8 - 2 = +6 units up',
        },
        {
          stepNumber: 2,
          title: 'Calculate the horizontal run (Δx)',
          explanation: 'Subtract the x-coordinate of Point A from the x-coordinate of Point B.',
          mathDetail: 'Run = 4 - 1 = +3 units right',
        },
        {
          stepNumber: 3,
          title: 'Form and simplify the slope ratio',
          explanation: 'Divide rise by run to find the constant rate of change m.',
          mathDetail: 'm = rise / run = 6 / 3 = 2',
        },
      ],
      conclusion: 'The slope of the line is m = 2 (or 2/1). For every 1 unit moved to the right, the line rises 2 units up.',
      teacherTip: 'Notice the line goes uphill from left to right, confirming the slope must be positive!',
      commonMistake: 'Flipping the ratio as run / rise (3 / 6 = 1/2). Remember: y is always on top (Rise over Run)!',
    },
    {
      id: 'we-slope-2',
      title: 'Worked Example 2: Finding Slope from a Table of Values',
      problem:
        'The table below shows a linear relationship between hours worked (x) and total earnings in dollars (y). Find the constant rate of change (slope).',
      given: 'Table values: (2, 35), (5, 80), (8, 125), (10, 155)',
      strategy:
        'Pick any two convenient ordered pairs from the table and apply the slope formula m = (y₂ - y₁) / (x₂ - x₁).',
      steps: [
        {
          stepNumber: 1,
          title: 'Select two pairs of coordinates',
          explanation: 'Let (x₁, y₁) = (2, 35) and (x₂, y₂) = (5, 80).',
          mathDetail: 'x₁ = 2, y₁ = 35  and  x₂ = 5, y₂ = 80',
        },
        {
          stepNumber: 2,
          title: 'Calculate change in y (Δy) and change in x (Δx)',
          explanation: 'Subtract corresponding values.',
          mathDetail: 'Δy = 80 - 35 = 45  |  Δx = 5 - 2 = 3',
        },
        {
          stepNumber: 3,
          title: 'Divide Δy by Δx',
          explanation: 'Simplify the rate of change.',
          mathDetail: 'm = 45 / 3 = 15 dollars per hour',
        },
      ],
      conclusion: 'The rate of change is $15 per hour (slope m = 15).',
      teacherTip: 'Test a second pair to double-check: (125 - 80)/(8 - 5) = 45/3 = 15. The constant rate confirms linearity!',
      commonMistake: 'Calculating y / x for just one row (e.g. 35/2 = 17.5). That only works for proportional lines with b = 0. Always calculate Δy / Δx!',
    },
    {
      id: 'we-slope-3',
      title: 'Worked Example 3: Slope Formula with Negative Numbers',
      problem:
        'Find the slope of the line that passes through the coordinate points (-3, 7) and (5, -9).',
      given: '(x₁, y₁) = (-3, 7) and (x₂, y₂) = (5, -9)',
      strategy:
        'Substitute carefully into m = (y₂ - y₁) / (x₂ - x₁), paying close attention to integer subtraction and signs.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set up the slope formula',
          explanation: 'Substitute x₁ = -3, y₁ = 7, x₂ = 5, y₂ = -9.',
          mathDetail: 'm = (-9 - 7) / (5 - (-3))',
        },
        {
          stepNumber: 2,
          title: 'Simplify the numerator and denominator',
          explanation: '-9 - 7 = -16. In the denominator, 5 - (-3) becomes 5 + 3 = 8.',
          mathDetail: 'Numerator: -16  |  Denominator: 5 + 3 = 8',
        },
        {
          stepNumber: 3,
          title: 'Divide to find m',
          explanation: 'Divide -16 by 8.',
          mathDetail: 'm = -16 / 8 = -2',
        },
      ],
      conclusion: 'The slope is m = -2. The line falls 2 units down for every 1 unit to the right.',
      teacherTip: 'Watch out for double negatives! Subtracting a negative always becomes addition.',
      commonMistake: 'Making sign errors like 5 - (-3) = 2. Use parentheses around negative coordinates: 5 - (-3) = 8.',
    },
    {
      id: 'we-slope-4',
      title: 'Worked Example 4: Writing y = mx + b from a Graph',
      problem:
        'A linear graph crosses the vertical y-axis at (0, -4) and passes through the point (3, 2). Write the equation of the line in slope-intercept form.',
      given: 'y-intercept point = (0, -4), second point = (3, 2)',
      strategy:
        'Identify the y-intercept b directly from (0, -4), calculate the slope m between (0, -4) and (3, 2), and combine into y = mx + b.',
      steps: [
        {
          stepNumber: 1,
          title: 'Identify the y-intercept (b)',
          explanation: 'The line crosses the y-axis at (0, -4), so b = -4.',
          mathDetail: 'b = -4',
        },
        {
          stepNumber: 2,
          title: 'Calculate the slope (m)',
          explanation: 'Rise from -4 to 2 is 2 - (-4) = 6. Run from 0 to 3 is 3 - 0 = 3.',
          mathDetail: 'm = (2 - (-4)) / (3 - 0) = 6 / 3 = 2',
        },
        {
          stepNumber: 3,
          title: 'Substitute m and b into y = mx + b',
          explanation: 'Replace m with 2 and b with -4.',
          mathDetail: 'y = 2x + (-4)  →  y = 2x - 4',
        },
      ],
      conclusion: 'The equation of the line in slope-intercept form is y = 2x - 4.',
      teacherTip: 'Verify by plugging in x = 3: y = 2(3) - 4 = 6 - 4 = 2. It matches the point (3, 2) perfectly!',
      commonMistake: 'Writing y = -4x + 2 by mixing up the slope and the y-intercept.',
    },
    {
      id: 'we-slope-5',
      title: 'Worked Example 5: Writing a Linear Equation from a Real-World Problem',
      problem:
        'A plumber charges a $60 house-call diagnostic fee plus $45 for each hour of labor. Write a linear equation representing the total cost C for h hours of plumbing work.',
      given: 'Initial house-call fee = $60, Hourly labor rate = $45/hour',
      strategy:
        'Identify the constant starting amount (b = 60) and the rate of change per hour (m = 45), then write in slope-intercept form C = mh + b.',
      steps: [
        {
          stepNumber: 1,
          title: 'Identify the rate of change (slope m)',
          explanation: 'The cost increases by $45 for every 1 additional hour worked.',
          mathDetail: 'm = 45 (dollars per hour)',
        },
        {
          stepNumber: 2,
          title: 'Identify the initial starting value (y-intercept b)',
          explanation: 'Before any hours are worked (h = 0), the plumber charges a flat $60 fee.',
          mathDetail: 'b = 60 (initial fee)',
        },
        {
          stepNumber: 3,
          title: 'Construct the linear equation',
          explanation: 'Total Cost C = (rate × hours) + initial fee.',
          mathDetail: 'C = 45h + 60',
        },
      ],
      conclusion: 'The linear equation is C = 45h + 60 (or in standard variables: y = 45x + 60).',
      teacherTip: 'Words like "per hour", "each", and "every" indicate the slope (m). One-time fees indicate the y-intercept (b).',
      commonMistake: 'Writing C = 60h + 45. Remember: the multiplier goes with the recurring rate, not the one-time flat fee!',
    },
  ],
  videoLesson: {
    title: 'Slope & Linear Equations: Comprehensive Video Masterclass',
    subtitle: 'Rise over Run, Slope Formula, Types of Slope, and y = mx + b',
    duration: '18 min',
    instructor: 'Mr. Pinilla',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description:
      'Join Mr. Pinilla as he breaks down everything Grade 8 students need to know about slope and linear equations: geometric rise/run triangles on graphs, the algebraic slope formula, horizontal & vertical special lines, and formulating y = mx + b equations from tables and real-world scenarios.',
    chapters: [
      { time: '0:00', title: 'Introduction to Slope & Rate of Change' },
      { time: '3:15', title: 'Rise over Run & Similar Right Triangles' },
      { time: '7:30', title: 'Four Types of Slope: Positive, Negative, Zero, Undefined' },
      { time: '11:10', title: 'The Slope Formula m = (y₂ - y₁) / (x₂ - x₁)' },
      { time: '14:40', title: 'Slope-Intercept Form y = mx + b & Real-World Modeling' },
    ],
    keyTakeaways: [
      'Slope is the constant ratio of vertical change (rise, Δy) to horizontal change (run, Δx).',
      'The slope formula is m = (y₂ - y₁) / (x₂ - x₁) — always keep coordinate order consistent.',
      'Horizontal lines have m = 0 (y = b); vertical lines have undefined slope (x = a).',
      'In y = mx + b, m is the rate of change and b is the y-intercept (0, b).',
    ],
    lessons: [
      {
        id: 'lesson-slope-1',
        title: 'Finding Slope from a Graph & Rise over Run',
        subtitle: 'Counting vertical change and horizontal change',
        youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Learn how to count rise and run between grid intersections on a coordinate plane.',
        badge: 'Rise / Run',
      },
      {
        id: 'lesson-slope-2',
        title: 'The Slope Formula from Two Coordinate Points',
        subtitle: 'Using m = (y₂ - y₁) / (x₂ - x₁)',
        youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Step-by-step algebra for computing slope with positive, negative, and fraction coordinates.',
        badge: 'Slope Formula',
      },
      {
        id: 'lesson-slope-3',
        title: 'Writing Linear Equations in Slope-Intercept Form (y = mx + b)',
        subtitle: 'Connecting graphs, tables, and word problems',
        youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Identify slope m and y-intercept b from graphs, data tables, and real-world word problems.',
        badge: 'y = mx + b',
      },
    ],
  },
  practiceApp: {
    buttonText: 'Practice Slope & Linear Equations',
    appTitle: 'Interactive Slope & Linear Equation Explorer',
    placeholderUrl: '',
    appDescription:
      'An interactive coordinate graphing lab to manipulate slope (m) and y-intercept (b), visualize rise/run slope triangles, test the four slope classifications, and formulate linear equations in real time.',
    features: [
      'Interactive Slope & Intercept Sliders (m and b)',
      'Dynamic Rise/Run Triangle with Δy and Δx Visualizers',
      'Two-Point Slope Calculator with Full Algebraic Steps',
      'Instant Equation Builder & Coordinate Point Verifier',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: [
      {
        id: 'slope-sc-q1',
        category: 'proportional',
        question: 'What is the slope of a line that passes through the points (2, 5) and (6, 17)?',
        options: ['m = 3', 'm = 1/3', 'm = 4', 'm = 12'],
        correctIndex: 0,
        explanation:
          'Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁) = (17 - 5) / (6 - 2) = 12 / 4 = 3.',
        hint: 'Subtract y-values on top (17 - 5) and x-values on bottom (6 - 2).',
      },
      {
        id: 'slope-sc-q2',
        category: 'mixed',
        question: 'Which of the following describes a line with an UNDEFINED slope?',
        options: [
          'A vertical line with equation x = 4',
          'A horizontal line with equation y = 4',
          'A diagonal line with equation y = 4x',
          'A line passing through the origin (0, 0)',
        ],
        correctIndex: 0,
        explanation:
          'A vertical line has zero horizontal run (Δx = 0). Division by zero is undefined, so vertical lines (x = a) have an undefined slope.',
        hint: 'Vertical lines go straight up and down and have no horizontal run.',
      },
      {
        id: 'slope-sc-q3',
        category: 'non-proportional',
        question:
          'What are the slope (m) and y-intercept (b) of the linear equation y = -4x + 9?',
        options: [
          'Slope m = -4, y-intercept b = (0, 9)',
          'Slope m = 9, y-intercept b = (0, -4)',
          'Slope m = 4, y-intercept b = (0, 9)',
          'Slope m = -4/9, y-intercept b = (0, 0)',
        ],
        correctIndex: 0,
        explanation:
          'In slope-intercept form y = mx + b, m is the coefficient of x (m = -4) and b is the constant term (b = 9, coordinate (0, 9)).',
        hint: 'Match y = mx + b: m is multiplied by x, and b is added.',
      },
      {
        id: 'slope-sc-q4',
        category: 'mixed',
        question:
          'What is the slope of the horizontal line shown by the equation y = -7?',
        options: ['m = 0', 'm = -7', 'm = Undefined', 'm = 1'],
        correctIndex: 0,
        explanation:
          'A horizontal line has zero vertical rise (rise = 0), so m = 0 / run = 0. The equation can be written as y = 0x - 7.',
        hint: 'Horizontal lines are completely flat. What is their rate of vertical climb?',
      },
      {
        id: 'slope-sc-q5',
        category: 'non-proportional',
        question:
          'A gym charges a $30 registration fee plus $25 per month. Which linear equation models the total cost y for x months?',
        options: ['y = 25x + 30', 'y = 30x + 25', 'y = 55x', 'y = 25x - 30'],
        correctIndex: 0,
        explanation:
          'The monthly rate ($25/month) is the slope m, and the one-time registration fee ($30) is the initial value / y-intercept b. Therefore, y = 25x + 30.',
        hint: 'The recurring monthly cost multiplies x, while the one-time fee is added once.',
      },
      {
        id: 'slope-sc-q6',
        category: 'proportional',
        question:
          'A table contains the points (0, 0), (2, 8), (4, 16), and (6, 24). What is the equation of this linear relationship?',
        options: ['y = 4x', 'y = 8x', 'y = 2x + 8', 'y = 4x + 2'],
        correctIndex: 0,
        explanation:
          'The line passes through (0, 0), so b = 0. The slope is m = (8 - 0) / (2 - 0) = 4. The equation is y = 4x.',
        hint: 'Find the rate of change Δy / Δx: (8 - 0) / (2 - 0) = 4.',
      },
    ],
  },
};
