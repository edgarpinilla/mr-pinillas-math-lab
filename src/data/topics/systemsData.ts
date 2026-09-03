import { TopicData } from '../../types';

export const TOPIC_4_SYSTEMS: TopicData = {
  id: 'systems-of-linear-equations',
  number: 4,
  title: 'Systems of Linear Equations',
  shortTitle: 'Systems of Equations',
  subtitle: 'Graphing, Substitution & Real-World Applications',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.9.A, 8.8.C',
  unit: 'Unit 4: Linear Systems & Multi-Step Reasoning',
  summary:
    'Discover how two linear equations work together to model real-world relationships. Learn to find the simultaneous solution (x, y) graphically where lines intersect, algebraically by substitution, and classify systems with one solution, no solution, or infinitely many solutions.',
  themeColor: {
    primary: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-700',
    lightBg: 'bg-violet-50',
    border: 'border-violet-200',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-800',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700',
  },
  learnOverview:
    'A system of linear equations consists of two linear equations that use the same set of variables (typically x and y). Each linear equation graphs as a straight line on the coordinate plane. The solution to a system is the single ordered pair (x, y) that satisfies BOTH equations at the exact same time. Visually, the solution is the point where the two lines intersect. In Grade 8, you will master solving systems by graphing on coordinate planes, solving algebraically using substitution, classifying whether a system has one solution, no solution, or infinitely many solutions, and modeling real-world situations like comparing cellphone plans, break-even costs, and travel rates.',
  concepts: [
    {
      id: 'what-is-a-system',
      title: 'A. What is a System of Linear Equations?',
      summary:
        'A system of linear equations is a set of two or more linear equations considered together at the same time.',
      ruleFormula: 'System: { y = m₁x + b₁  and  y = m₂x + b₂ }',
      ruleExplanation:
        'Each equation represents a straight line on the coordinate plane. A solution is an ordered pair (x, y) that makes BOTH equations true statements simultaneously. Visually, this solution is the exact point of intersection where the two lines cross.',
      keyPoints: [
        'Two linear equations considered together form a system.',
        'Each individual equation graphs as a continuous straight line.',
        'The solution is the ordered pair (x, y) that satisfies BOTH equations.',
        'Visually, the solution is the point where the two lines intersect on the coordinate plane.',
        'If an ordered pair makes one equation true but not the other, it is NOT a solution to the system.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'solving-by-graphing',
      title: 'B. Solving Systems by Graphing',
      summary:
        'Graphing is a visual method to find the point where two linear graphs cross each other.',
      ruleFormula: 'Intersection Point = (x, y) Solution',
      ruleExplanation:
        'Graph both equations on the same coordinate plane using slope-intercept form (y = mx + b). The point (x, y) where the two lines cross is the unique solution that satisfies both equations.',
      keyPoints: [
        'Step 1: Graph the first line using its y-intercept (0, b₁) and slope (m₁ = rise/run).',
        'Step 2: Graph the second line on the same grid using its y-intercept (0, b₂) and slope (m₂ = rise/run).',
        'Step 3: Locate the exact point (x, y) where the lines intersect.',
        'Step 4: Check your solution by substituting the x and y values into both original equations to verify that both sides remain equal.',
      ],
      visualType: 'transformation-grid',
    },
    {
      id: 'solving-by-substitution',
      title: 'C. Solving Systems by Substitution',
      summary:
        'Substitution is an algebraic method where one variable is replaced with an equivalent algebraic expression from the other equation.',
      ruleFormula: 'If y = expression, substitute that expression into the other equation in place of y.',
      ruleExplanation:
        'When one equation gives an isolated variable (such as y = 2x or x = y + 3), substitute that expression into the other equation to create a single-variable equation. Solve for that variable, then substitute back to find the second variable.',
      keyPoints: [
        'Step 1: Solve one equation for one variable (x or y) if not already isolated.',
        'Step 2: Substitute that algebraic expression into the other equation in place of that variable.',
        'Step 3: Solve the resulting one-variable equation.',
        'Step 4: Substitute the discovered value back into either original equation to find the second variable.',
        'Step 5: Write the solution as an ordered pair (x, y) and check both original equations.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'types-of-solutions',
      title: 'D. Types of Solutions (One, None, Infinite)',
      summary:
        'Linear systems can have exactly one solution, no solution, or infinitely many solutions depending on their slopes and y-intercepts.',
      ruleFormula: 'One Solution: m₁ ≠ m₂  |  No Solution: m₁ = m₂, b₁ ≠ b₂  |  Infinitely Many: m₁ = m₂, b₁ = b₂',
      ruleExplanation:
        'Different slopes mean the lines must intersect at one point. Equal slopes with different y-intercepts mean parallel lines that never intersect. Equal slopes with identical y-intercepts mean the equations describe the exact same line.',
      keyPoints: [
        'One Solution: Lines have different slopes (m₁ ≠ m₂). They intersect at exactly one point (x, y).',
        'No Solution: Lines have the same slope (m₁ = m₂) but different y-intercepts (b₁ ≠ b₂). The lines are parallel and never cross.',
        'Infinitely Many Solutions: Lines have the exact same slope (m₁ = m₂) AND the same y-intercept (b₁ = b₂). They are identical lines; every point on the line is a solution.',
        'Algebraic clue for No Solution: Variables cancel out, leaving a false statement like 0 = 5.',
        'Algebraic clue for Infinite Solutions: Variables cancel out, leaving a true identity like 4 = 4 or 0 = 0.',
      ],
      visualType: 'proportional-comparison',
    },
    {
      id: 'real-world-applications',
      title: 'E. Real-World Applications & Break-Even Points',
      summary:
        'Systems of linear equations model situations where two different conditions, rates, or plans are compared to find when they are equal.',
      ruleFormula: 'Cost Plan A = Cost Plan B  →  Intersection = Break-Even Point',
      ruleExplanation:
        'In real life, systems model comparing two subscription plans, calculating ticket sales, distance-rate-time problems, and finding the break-even point where costs or revenues balance.',
      keyPoints: [
        'Comparing Plans: Finding how many gigabytes, gym visits, or months make two service options cost the exact same amount.',
        'Ticket & Quantity Problems: Setting up two equations—one for the total quantity of items (e.g., student + adult tickets) and one for total money collected.',
        'Distance & Rate: Determining when two travelers moving at different speeds will meet or cover the same total distance.',
        'The intersection point represents the critical transition point where one option becomes cheaper or better than the other.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'System of Linear Equations',
      definition:
        'A collection of two or more linear equations involving the same set of variables that are considered together at the same time.',
      symbolOrFormula: '{ y = m₁x + b₁ , y = m₂x + b₂ }',
      example: '{ y = 2x + 1 and y = -x + 4 } form a system with variables x and y.',
      tip: 'Think of "system" as a team: both equations must be satisfied together, not individually.',
      category: 'Core Concept',
    },
    {
      term: 'Solution of a System',
      definition:
        'An ordered pair (x, y) that satisfies BOTH equations in the system at the exact same time, making both equations true statements.',
      symbolOrFormula: '(x, y) makes both Equation 1 & Equation 2 true',
      example: 'For { y = x + 1 and y = -x + 3 }, the solution is (1, 2) because 2 = 1 + 1 and 2 = -1 + 3.',
      tip: 'Always plug (x, y) into BOTH equations to verify your answer—one true equation is not enough!',
      category: 'Core Concept',
    },
    {
      term: 'Intersection',
      definition:
        'The single coordinate point (x, y) on a graph where two or more lines cross each other.',
      symbolOrFormula: 'Point (x, y) where Line 1 meets Line 2',
      example: 'Line A and Line B intersect at the coordinate point (3, 7).',
      tip: 'Intersection on a graph is the visual twin of the algebraic solution!',
      category: 'Graphing',
    },
    {
      term: 'Substitution',
      definition:
        'An algebraic method of solving systems by replacing a variable in one equation with an equivalent expression from the other equation.',
      symbolOrFormula: 'If y = 3x, replace y in the other equation with (3x)',
      example: 'If y = 2x and x + y = 12, substitute 2x for y: x + 2x = 12 → 3x = 12 → x = 4.',
      tip: 'Use parentheses when you substitute an expression to avoid negative sign mistakes!',
      category: 'Algebraic Method',
    },
    {
      term: 'Ordered Pair',
      definition:
        'A pair of numbers (x, y) written in a specific order used to locate a point on a coordinate plane, where x is the horizontal coordinate and y is the vertical coordinate.',
      symbolOrFormula: '(x, y)',
      example: '(4, -2) represents 4 units right on the x-axis and 2 units down on the y-axis.',
      tip: 'Remember alphabetical order: x comes before y in the alphabet and in an ordered pair.',
      category: 'Coordinate Geometry',
    },
    {
      term: 'One Solution',
      definition:
        'A system whose lines have different slopes and cross at exactly one unique point (x, y).',
      symbolOrFormula: 'm₁ ≠ m₂  (Unique intersection at (x, y))',
      example: 'y = 3x + 1 and y = -2x + 6 have slopes 3 and -2 (different), so they intersect once.',
      tip: 'If slopes are different, there is ALWAYS exactly one solution—no matter what the y-intercepts are!',
      category: 'Solution Types',
    },
    {
      term: 'No Solution',
      definition:
        'A system whose lines have the same slope but different y-intercepts; the lines are parallel and never intersect.',
      symbolOrFormula: 'm₁ = m₂ and b₁ ≠ b₂  (Lines never cross: ∅)',
      example: 'y = 4x + 2 and y = 4x - 5 both have slope m = 4 but different y-intercepts (2 and -5).',
      tip: 'Parallel railroad tracks never touch: equal slopes + different starting points = 0 solutions.',
      category: 'Solution Types',
    },
    {
      term: 'Infinitely Many Solutions',
      definition:
        'A system whose equations represent the exact same line, having identical slopes and identical y-intercepts; every point on the line is a solution.',
      symbolOrFormula: 'm₁ = m₂ and b₁ = b₂  (Coincident lines: ∞)',
      example: 'y = 2x + 3 and 2y = 4x + 6 represent the exact same line when simplified.',
      tip: 'If simplifying both equations gives the exact same formula, every point on the line is shared!',
      category: 'Solution Types',
    },
    {
      term: 'Parallel Lines',
      definition:
        'Lines in the same plane that never intersect, no matter how far they are extended, because they have the exact same steepness (slope) but different y-intercepts.',
      symbolOrFormula: 'm₁ = m₂ and b₁ ≠ b₂',
      example: 'The lines y = -3x + 4 and y = -3x - 1 are parallel lines.',
      tip: 'Parallel lines have the same rate of change (rise/run) but different starting values.',
      category: 'Geometry & Slope',
    },
  ],
  workedExamples: [
    {
      id: 'ex-graphing-one-solution',
      title: 'Example 1: Solving a System by Graphing',
      problem:
        'Solve the following system of linear equations by graphing on the coordinate plane:\nEquation 1: y = 2x - 1\nEquation 2: y = -x + 5',
      given: 'Line 1: y = 2x - 1 (m = 2, b = -1) | Line 2: y = -x + 5 (m = -1, b = 5)',
      strategy:
        'Graph both lines on the same coordinate grid using their slopes and y-intercepts. Find their point of intersection, and check that point in both equations.',
      steps: [
        {
          stepNumber: 1,
          title: 'Graph Equation 1: y = 2x - 1',
          explanation:
            'Plot the y-intercept at (0, -1). Since the slope m = 2 = 2/1, count rise 2 units up and run 1 unit right to plot the next point at (1, 1), then (2, 3). Draw a straight line through these points.',
          mathDetail: 'm₁ = 2, b₁ = -1 → Points: (0, -1), (1, 1), (2, 3), (3, 5)',
        },
        {
          stepNumber: 2,
          title: 'Graph Equation 2: y = -x + 5',
          explanation:
            'Plot the y-intercept at (0, 5). Since the slope m = -1 = -1/1, count rise 1 unit down and run 1 unit right to plot points at (1, 4), (2, 3), and (3, 2). Draw a straight line through these points.',
          mathDetail: 'm₂ = -1, b₂ = 5 → Points: (0, 5), (1, 4), (2, 3), (3, 2)',
        },
        {
          stepNumber: 3,
          title: 'Identify the Intersection Point',
          explanation:
            'Look at the grid where the two lines cross. Both lines pass through the exact same coordinate point (2, 3).',
          mathDetail: 'Intersection = (2, 3)',
        },
        {
          stepNumber: 4,
          title: 'Check the Solution in BOTH Equations',
          explanation:
            'Substitute x = 2 and y = 3 into both original equations:\nFor Eq 1: 3 = 2(2) - 1 → 3 = 4 - 1 → 3 = 3 (True!)\nFor Eq 2: 3 = -(2) + 5 → 3 = 3 (True!)',
          mathDetail: 'Equation 1: 3 = 3 ✓  |  Equation 2: 3 = 3 ✓',
        },
      ],
      conclusion:
        'The lines intersect at the point (2, 3). The unique solution to the system is (2, 3).',
      teacherTip:
        'Always plot at least three points for each line using rise/run so you can catch graphing errors before looking for the intersection.',
      commonMistake:
        'Students sometimes stop after graphing without writing down the ordered pair (x, y) as the final answer.',
    },
    {
      id: 'ex-substitution-step-by-step',
      title: 'Example 2: Solving a System by Substitution',
      problem:
        'Solve the following system algebraically using the substitution method:\nEquation 1: y = 3x\nEquation 2: 2x + y = 15',
      given: 'y is already isolated in Equation 1 as 3x. Equation 2 is 2x + y = 15.',
      strategy:
        'Substitute the expression (3x) from Equation 1 in place of y in Equation 2. Solve for x, then substitute x back to find y.',
      steps: [
        {
          stepNumber: 1,
          title: 'Identify the Isolated Expression',
          explanation:
            'Equation 1 already tells us that y is equal to 3x. We can replace y anywhere it appears.',
          mathDetail: 'y = 3x',
        },
        {
          stepNumber: 2,
          title: 'Substitute into Equation 2',
          explanation:
            'In Equation 2 (2x + y = 15), replace y with (3x):',
          mathDetail: '2x + (3x) = 15',
        },
        {
          stepNumber: 3,
          title: 'Solve for x',
          explanation:
            'Combine like terms: 2x + 3x = 5x. Then divide both sides by 5.',
          mathDetail: '5x = 15 → x = 15 / 5 → x = 3',
        },
        {
          stepNumber: 4,
          title: 'Substitute x = 3 back to find y',
          explanation:
            'Use Equation 1 to find y: y = 3x = 3(3) = 9.',
          mathDetail: 'y = 3(3) = 9',
        },
        {
          stepNumber: 5,
          title: 'Verify in Equation 2',
          explanation:
            'Check (3, 9) in Equation 2: 2(3) + 9 = 6 + 9 = 15. It matches!',
          mathDetail: '2(3) + 9 = 15 → 15 = 15 ✓',
        },
      ],
      conclusion:
        'The solution to the system is the ordered pair (3, 9).',
      teacherTip:
        'When one equation already has y = ... or x = ..., substitution is usually faster and cleaner than graphing or elimination.',
      commonMistake:
        'Students sometimes find x = 3 and forget to find y. A system solution must ALWAYS be an ordered pair (x, y).',
    },
    {
      id: 'ex-one-solution-comparison',
      title: 'Example 3: System with Exactly One Solution',
      problem:
        'Determine whether the system has one solution, no solution, or infinitely many solutions, and solve:\nEquation 1: y = x + 2\nEquation 2: y = 3x - 4',
      given: 'Line 1: m₁ = 1, b₁ = 2 | Line 2: m₂ = 3, b₂ = -4',
      strategy:
        'Compare the slopes first. Since m₁ = 1 and m₂ = 3 are different, the lines MUST intersect at exactly one point. Set the two equations equal to each other to solve for x.',
      steps: [
        {
          stepNumber: 1,
          title: 'Compare the Slopes',
          explanation:
            'Line 1 has slope m₁ = 1. Line 2 has slope m₂ = 3. Because m₁ ≠ m₂, the lines are not parallel and will cross at exactly one unique point.',
          mathDetail: 'm₁ = 1 ≠ m₂ = 3 → Exactly One Solution',
        },
        {
          stepNumber: 2,
          title: 'Set the Expressions Equal',
          explanation:
            'Since both equations equal y, set them equal to each other: x + 2 = 3x - 4.',
          mathDetail: 'x + 2 = 3x - 4',
        },
        {
          stepNumber: 3,
          title: 'Solve for x',
          explanation:
            'Subtract x from both sides: 2 = 2x - 4. Then add 4 to both sides: 6 = 2x. Divide by 2: x = 3.',
          mathDetail: '2 = 2x - 4 → 6 = 2x → x = 3',
        },
        {
          stepNumber: 4,
          title: 'Find y',
          explanation:
            'Substitute x = 3 into Equation 1: y = (3) + 2 = 5.',
          mathDetail: 'y = 3 + 2 = 5',
        },
        {
          stepNumber: 5,
          title: 'Check in Equation 2',
          explanation:
            'Substitute x = 3 into Equation 2: y = 3(3) - 4 = 9 - 4 = 5. Both equations give y = 5!',
          mathDetail: 'y = 3(3) - 4 = 5 ✓',
        },
      ],
      conclusion:
        'Because the lines have different slopes, the system has exactly ONE solution: (3, 5).',
      teacherTip:
        'You can predict the number of solutions before doing any math: if slopes are different, there is always 1 solution!',
    },
    {
      id: 'ex-no-solution-parallel',
      title: 'Example 4: System with No Solution (Parallel Lines)',
      problem:
        'Determine the number of solutions for the system:\nEquation 1: y = 2x + 3\nEquation 2: y = 2x - 4',
      given: 'Line 1: m₁ = 2, b₁ = 3 | Line 2: m₂ = 2, b₂ = -4',
      strategy:
        'Analyze the slopes and y-intercepts. If the slopes are identical and y-intercepts are different, the lines are parallel and will never cross.',
      steps: [
        {
          stepNumber: 1,
          title: 'Examine the Slopes',
          explanation:
            'Equation 1 has slope m₁ = 2. Equation 2 also has slope m₂ = 2. Both lines rise at the exact same rate (2 units up for every 1 unit right).',
          mathDetail: 'm₁ = 2, m₂ = 2 (Equal Slopes)',
        },
        {
          stepNumber: 2,
          title: 'Examine the y-Intercepts',
          explanation:
            'Equation 1 crosses the y-axis at (0, 3). Equation 2 crosses the y-axis at (0, -4). Since 3 ≠ -4, the lines start at different positions.',
          mathDetail: 'b₁ = 3 ≠ b₂ = -4 (Different Intercepts)',
        },
        {
          stepNumber: 3,
          title: 'What Happens Algebraically?',
          explanation:
            'If we try substitution by setting them equal: 2x + 3 = 2x - 4. Subtract 2x from both sides: 3 = -4. This is a FALSE statement (a mathematical contradiction)!',
          mathDetail: '2x + 3 = 2x - 4 → 3 = -4 (False statement!)',
        },
      ],
      conclusion:
        'The lines are parallel and never intersect. Therefore, the system has NO SOLUTION (∅).',
      teacherTip:
        'Whenever the variables cancel out and leave a false statement like 3 = -4 or 0 = 7, the answer is always No Solution.',
      commonMistake:
        'Do not write "(0, 0)" for no solution! (0, 0) is an actual point on the graph, while "No Solution" means no point works.',
    },
    {
      id: 'ex-infinite-solutions-identical',
      title: 'Example 5: System with Infinitely Many Solutions',
      problem:
        'Determine the number of solutions for the system:\nEquation 1: y = -2x + 4\nEquation 2: 2x + y = 4',
      given: 'Equation 1 is in slope-intercept form. Equation 2 is in standard form.',
      strategy:
        'Rewrite Equation 2 in slope-intercept form (y = mx + b) and compare its slope and y-intercept to Equation 1.',
      steps: [
        {
          stepNumber: 1,
          title: 'Convert Equation 2 to y = mx + b',
          explanation:
            'In Equation 2 (2x + y = 4), isolate y by subtracting 2x from both sides: y = -2x + 4.',
          mathDetail: '2x + y = 4 → y = -2x + 4',
        },
        {
          stepNumber: 2,
          title: 'Compare the Two Equations',
          explanation:
            'Equation 1 is y = -2x + 4. Equation 2 simplifies to y = -2x + 4. Both equations have the exact same slope (m = -2) and the exact same y-intercept (b = 4).',
          mathDetail: 'Line 1: y = -2x + 4  |  Line 2: y = -2x + 4 (Identical!)',
        },
        {
          stepNumber: 3,
          title: 'What Happens Algebraically?',
          explanation:
            'If we substitute Equation 1 into Equation 2: 2x + (-2x + 4) = 4 → 4 = 4. This is a TRUE statement for every real number x!',
          mathDetail: '4 = 4 (Always True Identity)',
        },
      ],
      conclusion:
        'Because both equations represent the exact same line, they overlap completely. The system has INFINITELY MANY SOLUTIONS.',
      teacherTip:
        'When the variables cancel out and leave a true statement like 4 = 4 or 0 = 0, the lines coincide and have infinitely many solutions.',
    },
    {
      id: 'ex-real-world-plans',
      title: 'Example 6: Real-World Application (Comparing Subscription Plans)',
      problem:
        'A student is choosing between two digital music streaming memberships:\n• Plan A charges a $10 initial setup fee plus $2 per month.\n• Plan B charges $0 setup fee plus $4 per month.\nAfter how many months will both plans cost the exact same amount, and what will that total cost be?',
      given: 'Plan A: y = 2x + 10  |  Plan B: y = 4x  (where x = months, y = total cost in dollars)',
      strategy:
        'Write a linear equation for each plan in y = mx + b form, set up a system of equations, and solve using substitution to find the break-even month (intersection point).',
      steps: [
        {
          stepNumber: 1,
          title: 'Define Variables and Write Equations',
          explanation:
            'Let x = number of months, and let y = total cost in dollars.\nPlan A: y = 2x + 10 (m = 2, b = 10)\nPlan B: y = 4x (m = 4, b = 0)',
          mathDetail: 'Plan A: y = 2x + 10  |  Plan B: y = 4x',
        },
        {
          stepNumber: 2,
          title: 'Set the Two Cost Equations Equal',
          explanation:
            'To find when both plans cost the same, set the total cost expressions equal: 4x = 2x + 10.',
          mathDetail: '4x = 2x + 10',
        },
        {
          stepNumber: 3,
          title: 'Solve for Months (x)',
          explanation:
            'Subtract 2x from both sides: 2x = 10. Divide by 2: x = 5 months.',
          mathDetail: '4x - 2x = 10 → 2x = 10 → x = 5',
        },
        {
          stepNumber: 4,
          title: 'Calculate the Total Cost (y)',
          explanation:
            'Substitute x = 5 into Plan B: y = 4(5) = $20. Check in Plan A: y = 2(5) + 10 = 10 + 10 = $20. Both equal $20!',
          mathDetail: 'Plan B: 4(5) = $20  |  Plan A: 2(5) + 10 = $20 ✓',
        },
      ],
      conclusion:
        'At 5 months, both streaming plans will cost the exact same total of $20. The solution to the system is (5, 20).',
      teacherTip:
        'Real-world connection: Before month 5, Plan B is cheaper (no setup fee). After month 5, Plan A is cheaper because its monthly fee ($2) is lower! The intersection (5, 20) is the break-even decision point.',
    },
  ],
  videoLesson: {
    title: 'Video Library: Systems of Linear Equations',
    subtitle: 'Video walkthrough lessons coming in the next stage',
    duration: 'Coming Soon',
    instructor: 'Mr. Edgar Pinilla',
    description:
      'Curated video walkthrough lessons explaining how to solve systems of linear equations by graphing, substitution, and real-world modeling are being prepared for the next stage.',
    keyTakeaways: [
      'A system of linear equations is a set of two lines considered simultaneously.',
      'The solution (x, y) is the coordinates of the point where both lines intersect.',
      'If slopes are different (m₁ ≠ m₂), the system has exactly 1 solution.',
      'If slopes are equal but y-intercepts differ (m₁ = m₂, b₁ ≠ b₂), the lines are parallel and there is NO solution.',
      'If slopes and y-intercepts are identical (m₁ = m₂, b₁ = b₂), there are INFINITELY MANY solutions.',
    ],
    lessons: [],
  },
  practiceApp: {
    buttonText: 'Practice Coming Soon',
    appTitle: 'Systems of Linear Equations Practice Lab',
    placeholderUrl: 'https://math-lab-systems.web.app',
    appDescription:
      'Interactive practice and STAAR assessments for Systems of Linear Equations are arriving in the next development phase. Use the Learn guide, Vocabulary, and Worked Examples tabs to build your foundation!',
    features: [
      'Graphing coordinate systems',
      'Solving by substitution',
      'Analyzing solution types (one, none, infinite)',
      'Real-world break-even & comparison scenarios',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: [],
  },
};
