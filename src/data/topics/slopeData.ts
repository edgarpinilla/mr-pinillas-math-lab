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
    title: 'Video Library: Slope & Linear Equations',
    subtitle: 'Rise over Run, Slope-Intercept Form (y = mx + b), Tables, and Two-Point Equations',
    duration: '22 min',
    instructor: 'Mr. Edgar Pinilla',
    description:
      'Watch Mr. Pinilla walk through each key concept step-by-step: calculating slope visually on coordinate graphs with rise/run, understanding slope-intercept form y = mx + b, deriving linear equations from tables, and writing linear equations from two points.',
    keyTakeaways: [
      'Slope is the constant ratio of vertical change (rise, Δy) to horizontal change (run, Δx).',
      'In y = mx + b, m represents the constant rate of change (slope) and b is the y-intercept (0, b).',
      'From a table, compute the rate of change Δy/Δx and locate the starting value y when x = 0.',
      'From two points (x₁, y₁) and (x₂, y₂), compute m = (y₂ - y₁) / (x₂ - x₁), then substitute to solve for b.',
    ],
    lessons: [
      {
        id: 'lesson-slope-graph',
        title: 'Finding Slope from a Graph',
        subtitle: 'Rise/run and calculating slope visually from a coordinate graph',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/hkzV24Hmj_A',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=hkzV24Hmj_A',
        description:
          'Learn how to find slope visually on a coordinate plane by identifying grid intersections and calculating vertical rise over horizontal run.',
        badge: 'Rise / Run',
      },
      {
        id: 'lesson-slope-intercept',
        title: 'Understanding y = mx + b',
        subtitle: 'Slope-intercept form, identifying m as slope and b as the y-intercept',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/4w0rWUCk-N8',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=4w0rWUCk-N8',
        description:
          'Explore linear equations in slope-intercept form (y = mx + b), understanding what m and b represent both graphically and algebraically.',
        badge: 'y = mx + b',
      },
      {
        id: 'lesson-slope-tables',
        title: 'Writing Linear Equations from Tables',
        subtitle: 'Finding slope and y-intercept from a table and writing the equation y = mx + b',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/xgI8ppsfpuk',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=xgI8ppsfpuk',
        description:
          'Calculate the constant rate of change (Δy/Δx) from paired values in a data table, identify the starting value when x = 0, and write the linear equation.',
        badge: 'Data Tables',
      },
      {
        id: 'lesson-slope-two-points',
        title: 'Writing an Equation from Two Points',
        subtitle: 'Finding slope from two points, solving for the y-intercept, and writing y = mx + b',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/1IfLVLGWsEY',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=1IfLVLGWsEY',
        description:
          'Learn how to find the slope from two coordinate points, use one point and the slope to find the y-intercept, and write the final equation in y = mx + b form.',
        badge: 'Two Points',
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
      // STRAND 1: Slope from Two Points (m = (y₂ - y₁) / (x₂ - x₁))
      {
        id: 'slope-sc-q1',
        category: 'slope-formula',
        question: 'What is the slope of the line that passes through the points (2, 5) and (6, 17)?',
        options: ['m = 3', 'm = 1/3', 'm = 4', 'm = 12'],
        correctIndex: 0,
        explanation:
          'Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁) = (17 - 5) / (6 - 2) = 12 / 4 = 3.',
        hint: 'Subtract the y-values in the numerator (17 - 5) and the x-values in the denominator (6 - 2).',
      },
      {
        id: 'slope-sc-q7',
        category: 'slope-formula',
        question: 'What is the slope of the line passing through the points (-3, 11) and (2, -4)?',
        options: ['m = -3', 'm = 3', 'm = -1/3', 'm = -15'],
        correctIndex: 0,
        explanation:
          'Use the slope formula: m = (y₂ - y₁) / (x₂ - x₁) = (-4 - 11) / (2 - (-3)) = -15 / (2 + 3) = -15 / 5 = -3. The negative slope shows the line slants downwards.',
        hint: 'Be careful when subtracting negative numbers: 2 - (-3) = 2 + 3 = 5.',
      },
      {
        id: 'slope-sc-q13',
        category: 'slope-formula',
        question: 'A line passes through the points (4, -2) and (10, 1). What is the slope of this line in simplest fractional form?',
        options: ['m = 1/2', 'm = 2', 'm = -1/2', 'm = -2'],
        correctIndex: 0,
        explanation:
          'Use the slope formula: m = (1 - (-2)) / (10 - 4) = (1 + 2) / 6 = 3 / 6. Dividing both the numerator and denominator by 3 simplifies to m = 1/2.',
        hint: 'Remember: 1 - (-2) = 1 + 2 = 3. Then divide by 10 - 4 = 6 and reduce the fraction.',
      },

      // STRAND 2: Rise over Run & Visual / Graph Slope (Δy / Δx)
      {
        id: 'slope-sc-q2',
        category: 'rise-run',
        question: 'On a coordinate plane, a line climbs from point (1, 2) to point (4, 8). What are the rise, run, and slope of this line?',
        options: [
          'Rise = 6, Run = 3, Slope = 2',
          'Rise = 3, Run = 6, Slope = 1/2',
          'Rise = 6, Run = 3, Slope = 3',
          'Rise = -6, Run = 3, Slope = -2',
        ],
        correctIndex: 0,
        explanation:
          'Vertical change (Rise) is Δy = 8 - 2 = 6. Horizontal change (Run) is Δx = 4 - 1 = 3. Slope is Rise / Run = 6 / 3 = 2.',
        hint: 'Rise is the vertical change (y₂ - y₁) and Run is the horizontal change (x₂ - x₁). Divide Rise by Run.',
      },
      {
        id: 'slope-sc-q8',
        category: 'rise-run',
        question: 'Two similar right triangles are drawn along the same line on a coordinate plane. Triangle 1 has a vertical rise of 4 units and horizontal run of 6 units. Triangle 2 has a horizontal run of 15 units. What is the vertical rise of Triangle 2?',
        options: ['10 units', '12 units', '8 units', '15 units'],
        correctIndex: 0,
        explanation:
          'Because slope is constant along any straight line, similar slope triangles have equivalent ratios of rise to run (TEKS 8.4.A). Since 4/6 = 2/3, set up the proportion: rise / 15 = 2/3 → rise = (2/3) × 15 = 10 units.',
        hint: 'Set up a proportion: Rise₁ / Run₁ = Rise₂ / Run₂, which means 4 / 6 = Rise₂ / 15.',
      },
      {
        id: 'slope-sc-q14',
        category: 'rise-run',
        question: 'A line slants downward from left to right, dropping 9 units vertically for every 3 units it moves horizontally to the right. What is the slope of this line?',
        options: ['m = -3', 'm = 3', 'm = -1/3', 'm = -9'],
        correctIndex: 0,
        explanation:
          'Dropping vertically means the rise is negative (Rise = -9). Moving right is a positive run (Run = +3). Slope is Rise / Run = -9 / 3 = -3.',
        hint: 'Lines that slant downward from left to right have a negative slope. Divide vertical drop (-9) by horizontal run (3).',
      },

      // STRAND 3: Special Slopes (Zero & Undefined)
      {
        id: 'slope-sc-q3',
        category: 'special-slopes',
        question: 'Which of the following describes a line with an UNDEFINED slope?',
        options: [
          'A vertical line with equation x = 4',
          'A horizontal line with equation y = 4',
          'A diagonal line with equation y = 4x',
          'A line passing through the origin (0, 0)',
        ],
        correctIndex: 0,
        explanation:
          'A vertical line has zero horizontal run (Δx = 0). Since division by zero is undefined, vertical lines (equations in the form x = a) have an undefined slope.',
        hint: 'Vertical lines go straight up and down and have zero horizontal run.',
      },
      {
        id: 'slope-sc-q9',
        category: 'special-slopes',
        question: 'What is the slope of the horizontal line represented by the equation y = -7?',
        options: ['m = 0', 'm = -7', 'm is undefined', 'm = 1'],
        correctIndex: 0,
        explanation:
          'A horizontal line is completely flat and has zero vertical change (rise = 0). Since m = 0 / run = 0, any horizontal line has a slope of 0. In y = mx + b, this is y = 0x - 7.',
        hint: 'Horizontal lines have zero vertical rise. What is 0 divided by any number?',
      },
      {
        id: 'slope-sc-q15',
        category: 'special-slopes',
        question: 'A line passes through the coordinates (-5, 8) and (-5, -2). What is the slope of this line?',
        options: ['Undefined', 'm = 0', 'm = -10', 'm = 1'],
        correctIndex: 0,
        explanation:
          'Using the slope formula: m = (-2 - 8) / (-5 - (-5)) = -10 / (-5 + 5) = -10 / 0. Division by zero is undefined, which means this line is vertical (x = -5).',
        hint: 'Notice that both points have the same x-coordinate (-5). What happens when you subtract -5 - (-5) in the denominator?',
      },

      // STRAND 4: Slope-Intercept Form (Identifying m and b from y = mx + b)
      {
        id: 'slope-sc-q4',
        category: 'slope-intercept',
        question: 'What are the slope (m) and y-intercept (b) of the linear equation y = -4x + 9?',
        options: [
          'Slope m = -4, y-intercept b = (0, 9)',
          'Slope m = 9, y-intercept b = (0, -4)',
          'Slope m = 4, y-intercept b = (0, 9)',
          'Slope m = -4/9, y-intercept b = (0, 0)',
        ],
        correctIndex: 0,
        explanation:
          'In slope-intercept form y = mx + b, m is the coefficient of x (m = -4) and b is the constant term (b = 9, located at point (0, 9)).',
        hint: 'Match y = mx + b: m is the number multiplied by x, and b is the number added.',
      },
      {
        id: 'slope-sc-q10',
        category: 'slope-intercept',
        question: 'The equation of a line is y = (2/5)x - 3. What is the slope of the line and the coordinate of its y-intercept?',
        options: [
          'Slope m = 2/5; y-intercept (0, -3)',
          'Slope m = -3; y-intercept (0, 2/5)',
          'Slope m = 2/5; y-intercept (-3, 0)',
          'Slope m = 5/2; y-intercept (0, 3)',
        ],
        correctIndex: 0,
        explanation:
          'In y = mx + b, m = 2/5 is the slope and b = -3 is the y-intercept. The y-intercept always occurs where x = 0, so the point is (0, -3).',
        hint: 'The slope m is multiplied by x, and the y-intercept is the point (0, b).',
      },
      {
        id: 'slope-sc-q16',
        category: 'slope-intercept',
        question: 'A line has a slope of m = -1 and a y-intercept at the point (0, 5). What is the equation of this line in slope-intercept form?',
        options: ['y = -x + 5', 'y = x - 5', 'y = 5x - 1', 'y = -5x + 1'],
        correctIndex: 0,
        explanation:
          'Substitute m = -1 and b = 5 into slope-intercept form y = mx + b. This gives y = -1x + 5, which is written in standard algebraic form as y = -x + 5.',
        hint: 'In y = mx + b, replace m with -1 and b with 5.',
      },

      // STRAND 5: Linear Equations from Tables & Coordinate Pairs
      {
        id: 'slope-sc-q5',
        category: 'tables-coordinates',
        question: 'A table of values shows the coordinates below. What is the equation of this linear relationship in y = mx + b form?',
        tableData: {
          headers: ['x', 'y'],
          rows: [
            [0, 4],
            [1, 7],
            [2, 10],
            [3, 13],
          ],
        },
        options: ['y = 3x + 4', 'y = 4x + 3', 'y = 7x + 4', 'y = 3x + 7'],
        correctIndex: 0,
        explanation:
          'When x = 0, y = 4, so the y-intercept is b = 4. The rate of change is m = (7 - 4) / (1 - 0) = 3. In y = mx + b, the equation is y = 3x + 4.',
        hint: 'Identify the y-intercept where x = 0, then calculate the rate of change Δy / Δx.',
      },
      {
        id: 'slope-sc-q11',
        category: 'tables-coordinates',
        question: 'A linear function contains the table entries below. What are the slope and y-intercept of this linear function?',
        tableData: {
          headers: ['x', 'y'],
          rows: [
            [2, 11],
            [4, 17],
            [6, 23],
          ],
        },
        options: [
          'Slope m = 3, y-intercept b = 5',
          'Slope m = 6, y-intercept b = 11',
          'Slope m = 3, y-intercept b = 6',
          'Slope m = 2, y-intercept b = 5',
        ],
        correctIndex: 0,
        explanation:
          'Find slope m = (17 - 11) / (4 - 2) = 6 / 2 = 3. To find b, substitute point (2, 11): 11 = 3(2) + b → 11 = 6 + b → b = 5. The equation is y = 3x + 5.',
        hint: 'First find the rate of change m = Δy / Δx. Then substitute x = 2 and y = 11 into y = mx + b to solve for b.',
      },
      {
        id: 'slope-sc-q17',
        category: 'tables-coordinates',
        question: 'Which linear equation represents the line that passes through the points (0, -2) and (3, 4)?',
        options: ['y = 2x - 2', 'y = -2x + 2', 'y = (1/2)x - 2', 'y = 2x + 4'],
        correctIndex: 0,
        explanation:
          'The point (0, -2) gives the y-intercept directly: b = -2. The slope is m = (4 - (-2)) / (3 - 0) = (4 + 2) / 3 = 6 / 3 = 2. Writing in y = mx + b form produces y = 2x - 2.',
        hint: 'The point (0, -2) tells you b = -2. Find the slope m = (4 - (-2)) / (3 - 0).',
      },

      // STRAND 6: Real-World Linear Situations & Rates of Change
      {
        id: 'slope-sc-q6',
        category: 'real-world',
        question: 'A plumber charges a $45 house-call fee plus $60 for each hour of work. Which linear equation models the total cost y for working x hours?',
        options: ['y = 60x + 45', 'y = 45x + 60', 'y = 105x', 'y = 60x - 45'],
        correctIndex: 0,
        explanation:
          'The one-time house-call fee is the starting value or y-intercept (b = 45). The hourly rate is the constant rate of change or slope (m = 60). Therefore, y = 60x + 45.',
        hint: 'The hourly rate multiplies x (hours), while the one-time house-call fee is added once.',
      },
      {
        id: 'slope-sc-q12',
        category: 'real-world',
        question: 'A water storage tank holds 500 gallons of water and drains at a constant rate of 25 gallons per minute. Which linear equation represents the gallons of water remaining, y, after x minutes?',
        options: ['y = -25x + 500', 'y = 25x + 500', 'y = -500x + 25', 'y = -25x - 500'],
        correctIndex: 0,
        explanation:
          'Draining means the tank is losing water, so the rate of change (slope) is negative: m = -25. The initial amount in the tank is b = 500. Putting these into y = mx + b gives y = -25x + 500.',
        hint: 'When an amount decreases over time, the rate of change is negative. Initial amount is b.',
      },
      {
        id: 'slope-sc-q18',
        category: 'real-world',
        question: 'A phone plan charges a base monthly subscription of $20 plus $0.15 per text message sent over the limit. The linear equation is y = 0.15x + 20. What does the slope (0.15) represent in this real-world context?',
        options: [
          'The cost of $0.15 for each additional text message sent',
          'The monthly base fee of $20 for the phone plan',
          'The total monthly phone bill in dollars',
          'The maximum number of text messages allowed',
        ],
        correctIndex: 0,
        explanation:
          'In a real-world linear model y = mx + b, the slope m represents the unit rate of change. Here, m = 0.15 means each additional text message costs $0.15.',
        hint: 'Slope is the rate that multiplies x (the number of messages). What does $0.15 per message represent?',
      },
    ],
  },
};
