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
    subtitle: 'Graphing Intersections, Step-by-Step Solutions, Solution Types & Real-World Modeling',
    instructor: 'Mr. Edgar Pinilla',
    description:
      'Explore these video walkthroughs to master systems of linear equations: graph lines to find their intersection point, follow step-by-step solving methods, classify solution types with animations, and model real-world break-even scenarios.',
    keyTakeaways: [
      'The solution to a system is the single ordered pair (x, y) where both lines intersect on the coordinate plane.',
      'Lines with different slopes (m₁ ≠ m₂) intersect at exactly ONE unique solution.',
      'Parallel lines have equal slopes and different intercepts (m₁ = m₂, b₁ ≠ b₂) with NO solution.',
      'Real-world systems model two changing quantities to reveal the break-even decision point.',
    ],
    lessons: [
      {
        id: 'lesson-systems-graphing',
        title: 'Graph It! Find the Intersection',
        subtitle: 'Solving Systems of Equations by Graphing | 8th Grade Math',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/1LcUdEBNPk0',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=1LcUdEBNPk0',
        description:
          'Graph two linear equations on a coordinate plane and find where they cross to identify the solution point (x, y).',
        badge: 'Graphing',
      },
      {
        id: 'lesson-systems-step-by-step',
        title: 'Solve It Step by Step',
        subtitle: 'Solving Systems of Equations Step-by-Step',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/9MPUSWUyaYU',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=9MPUSWUyaYU',
        description:
          'Follow a clear step-by-step method to solve systems of equations and check that your solution works in both equations.',
        badge: 'Step-by-Step',
      },
      {
        id: 'lesson-systems-solution-types',
        title: 'One, None, or Infinite?',
        subtitle: 'Inconsistent, Dependent, & Independent Systems | MyWhyU',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/bQjtwc6DZeA',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=bQjtwc6DZeA',
        description:
          'Watch a fun animated guide to easily recognize whether a system has one solution, no solution (parallel lines), or infinitely many solutions.',
        badge: 'Solution Types',
      },
      {
        id: 'lesson-systems-real-world',
        title: 'Systems in the Real World',
        subtitle: 'Modeling Real World Situations with Systems | 8th Grade Math',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/byv41FLCJqw',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=byv41FLCJqw',
        description:
          'See how systems of equations can model situations you encounter every day.',
        badge: 'Real-World',
        directWatchOnly: true,
        customThumbnailUrl: 'https://img.youtube.com/vi/byv41FLCJqw/maxresdefault.jpg',
      },
    ],
  },
  practiceApp: {
    buttonText: 'Practice Systems of Linear Equations',
    appTitle: 'Systems of Linear Equations Practice Lab',
    placeholderUrl: '',
    appDescription:
      'Test your mastery of solving systems of linear equations by graphing, substitution, classifying solution types, and modeling real-world break-even applications.',
    features: [
      'Testing whether ordered pairs satisfy systems',
      'Solving systems by coordinate graph intersection',
      'Algebraic substitution step-by-step',
      'Classifying one, none (parallel), and infinite solutions',
      'Real-world break-even and comparison word problems',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: [
      // STRAND 1: Understanding Systems & Testing Ordered Pairs (sys-sc-q1, sys-sc-q7, sys-sc-q13)
      {
        id: 'sys-sc-q1',
        category: 'understanding-systems',
        question:
          'What does it mean for an ordered pair (x, y) to be a solution to a system of two linear equations?',
        options: [
          'It makes both equations true statements at the same time.',
          'It makes at least one of the two equations true.',
          'It is the y-intercept of the first equation.',
          'It is the point where one of the lines crosses the x-axis.',
        ],
        correctIndex: 0,
        explanation:
          'A solution to a system of linear equations is an ordered pair (x, y) that satisfies BOTH equations simultaneously. On a coordinate plane, this corresponds to the point where both lines intersect.',
        hint: 'Think about what "system" means in math: both equations work together simultaneously. The solution must satisfy both.',
      },
      {
        id: 'sys-sc-q7',
        category: 'understanding-systems',
        question:
          'Which of the following ordered pairs is a solution to the system of linear equations below?',
        context: 'Equation 1: y = 3x - 1  |  Equation 2: x + y = 7',
        options: ['(2, 5)', '(1, 2)', '(3, 4)', '(4, 3)'],
        correctIndex: 0,
        explanation:
          'Check (2, 5) in both equations: In Equation 1: 3(2) - 1 = 6 - 1 = 5 ✓ (y = 5). In Equation 2: 2 + 5 = 7 ✓. Since (2, 5) satisfies both equations, it is the solution to the system. The other pairs only satisfy one equation.',
        hint: 'Substitute x and y into BOTH equations. (2, 5) gives 5 = 3(2) - 1 and 2 + 5 = 7. Test each option!',
      },
      {
        id: 'sys-sc-q13',
        category: 'understanding-systems',
        question:
          'Marcus tested the point (3, 1) in the system below and claimed it was the solution. Is Marcus correct? Why or why not?',
        context: 'Equation 1: y = x - 2  |  Equation 2: 2x + y = 10',
        options: [
          'Marcus is incorrect: (3, 1) satisfies y = x - 2 (since 1 = 3 - 2), but fails 2x + y = 10 because 2(3) + 1 = 7, not 10.',
          'Marcus is correct: substituting x = 3 and y = 1 satisfies both equations.',
          'Marcus is incorrect: (3, 1) does not satisfy either equation.',
          'Marcus is correct: a point only needs to satisfy one equation to be the solution to a system.',
        ],
        correctIndex: 0,
        explanation:
          'Test (3, 1) in both equations: In y = x - 2: 1 = 3 - 2 = 1 ✓ (True). In 2x + y = 10: 2(3) + 1 = 6 + 1 = 7 ≠ 10 ✗ (False). Because an ordered pair must make BOTH equations true simultaneously, Marcus is incorrect.',
        hint: 'Calculate 2(3) + 1 for Equation 2. Does it equal 10? Remember, a solution to a system MUST satisfy BOTH equations.',
      },

      // STRAND 2: Solving by Graphing & Coordinate Plane Intersections (sys-sc-q2, sys-sc-q8, sys-sc-q14)
      {
        id: 'sys-sc-q2',
        category: 'graphing-systems',
        question:
          'Line 1 and Line 2 are graphed on the coordinate plane below. What is the solution to this system of linear equations?',
        context: 'Line 1: y = 2x + 1 (blue)  |  Line 2: y = -x + 7 (purple)',
        graphData: {
          title: 'Graph of the System',
          xMin: -1,
          xMax: 7,
          yMin: -1,
          yMax: 9,
          lines: [
            {
              label: 'Line 1: y = 2x + 1',
              slope: 2,
              intercept: 1,
              color: '#2563eb',
              equation: 'y = 2x + 1',
            },
            {
              label: 'Line 2: y = -x + 7',
              slope: -1,
              intercept: 7,
              color: '#9333ea',
              equation: 'y = -x + 7',
            },
          ],
          intersectionPoint: { x: 2, y: 5, label: '(2, 5)' },
        },
        options: ['(2, 5)', '(5, 2)', '(0, 1)', '(0, 7)'],
        correctIndex: 0,
        explanation:
          'The solution to a system on a graph is the coordinate point where both lines intersect. In the graph, the lines cross at (2, 5). Checking algebraically: 2(2) + 1 = 5 ✓ and -(2) + 7 = 5 ✓.',
        hint: 'Find the single point on the coordinate plane where the blue line and purple line cross each other.',
      },
      {
        id: 'sys-sc-q8',
        category: 'graphing-systems',
        question:
          'Line A and Line B are graphed on the grid below. What are the coordinates of their point of intersection?',
        context: 'Line A: y = x + 3 (teal)  |  Line B: y = -2x + 6 (rose)',
        graphData: {
          title: 'Intersection of Line A & Line B',
          xMin: -2,
          xMax: 6,
          yMin: -1,
          yMax: 8,
          lines: [
            {
              label: 'Line A: y = x + 3',
              slope: 1,
              intercept: 3,
              color: '#0d9488',
              equation: 'y = x + 3',
            },
            {
              label: 'Line B: y = -2x + 6',
              slope: -2,
              intercept: 6,
              color: '#e11d48',
              equation: 'y = -2x + 6',
            },
          ],
          intersectionPoint: { x: 1, y: 4, label: '(1, 4)' },
        },
        options: ['(1, 4)', '(4, 1)', '(0, 3)', '(2, 5)'],
        correctIndex: 0,
        explanation:
          'At the point of intersection, x = 1 and y = 4. Checking algebraically: For Line A: y = 1 + 3 = 4 ✓. For Line B: y = -2(1) + 6 = 4 ✓. Both equations equal 4 when x = 1, so the intersection point is (1, 4).',
        hint: 'Look at the coordinates where the teal line and rose line intersect: trace down to the x-axis and across to the y-axis.',
      },
      {
        id: 'sys-sc-q14',
        category: 'graphing-systems',
        question:
          'Line 1 has the equation y = x - 2 and Line 2 has the equation y = -x + 4. In which quadrant of the coordinate plane do the two lines intersect?',
        context: 'Line 1: y = x - 2  |  Line 2: y = -x + 4',
        options: [
          'Quadrant I, at (3, 1)',
          'Quadrant II, at (-3, 1)',
          'Quadrant IV, at (3, -1)',
          'Quadrant III, at (-3, -1)',
        ],
        correctIndex: 0,
        explanation:
          'Find the intersection: x - 2 = -x + 4 → 2x = 6 → x = 3. Substitute x = 3 into y = x - 2: y = 3 - 2 = 1. The intersection point is (3, 1). Because both x and y are positive (x > 0, y > 0), this point is located in Quadrant I.',
        hint: 'Find the intersection point first by setting x - 2 = -x + 4. Then recall: Quadrant I has positive x and positive y (+, +).',
      },

      // STRAND 3: Solving by Substitution - Mechanics & Variable Isolations (sys-sc-q3, sys-sc-q9, sys-sc-q15)
      {
        id: 'sys-sc-q3',
        category: 'substitution-mechanics',
        question:
          'Given the system of equations below, which expression correctly replaces y in the second equation when solving by substitution?',
        context: 'Equation 1: y = 4x  |  Equation 2: 2x + y = 18',
        options: [
          '2x + (4x) = 18',
          '2(4x) + y = 18',
          '2x + 4 = 18',
          '4x + y = 18',
        ],
        correctIndex: 0,
        explanation:
          'Since Equation 1 gives y = 4x, you replace the variable y in Equation 2 with the expression (4x). This gives 2x + (4x) = 18, which simplifies to 6x = 18.',
        hint: 'Equation 1 tells you that y is equal to 4x. In Equation 2, substitute 4x in place of the variable y.',
      },
      {
        id: 'sys-sc-q9',
        category: 'substitution-mechanics',
        question:
          'Use substitution to find the value of x in this system of equations:',
        context: 'Equation 1: y = 2x + 1  |  Equation 2: 3x + y = 16',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 2'],
        correctIndex: 0,
        explanation:
          'Substitute (2x + 1) for y into Equation 2: 3x + (2x + 1) = 16 → 5x + 1 = 16. Subtract 1 from both sides: 5x = 15. Divide by 5: x = 3. (If asked for y, y = 2(3) + 1 = 7).',
        hint: 'Substitute (2x + 1) in place of y into 3x + y = 16: 3x + (2x + 1) = 16. Combine like terms.',
      },
      {
        id: 'sys-sc-q15',
        category: 'substitution-mechanics',
        question:
          'A student correctly used substitution to find that x = 4 for the system below. What is the value of y, and what is the complete ordered pair solution?',
        context: 'Equation 1: y = 3x - 5  |  Equation 2: x + 2y = 18',
        options: [
          'y = 7, so the solution is (4, 7)',
          'y = 5, so the solution is (4, 5)',
          'y = 12, so the solution is (4, 12)',
          'y = 7, so the solution is (7, 4)',
        ],
        correctIndex: 0,
        explanation:
          'Substitute x = 4 into y = 3x - 5: y = 3(4) - 5 = 12 - 5 = 7. Verify in Equation 2: 4 + 2(7) = 4 + 14 = 18 ✓. The complete solution is (x, y) = (4, 7). Watch out for distractor (7, 4), which reverses the x and y coordinates!',
        hint: 'Substitute x = 4 into Equation 1: y = 3(4) - 5. Remember to write the ordered pair as (x, y).',
      },

      // STRAND 4: Solving by Substitution - Full Solutions (sys-sc-q4, sys-sc-q10, sys-sc-q16)
      {
        id: 'sys-sc-q4',
        category: 'substitution-solution',
        question:
          'Use substitution to solve the system of linear equations below. What is the solution (x, y)?',
        context: 'Equation 1: y = x + 2  |  Equation 2: 2x + y = 11',
        options: ['(3, 5)', '(5, 3)', '(2, 4)', '(4, 6)'],
        correctIndex: 0,
        explanation:
          'Substitute (x + 2) for y in Equation 2: 2x + (x + 2) = 11 → 3x + 2 = 11 → 3x = 9 → x = 3. Then find y: y = 3 + 2 = 5. Check in Equation 2: 2(3) + 5 = 6 + 5 = 11 ✓. The solution is (3, 5).',
        hint: 'Substitute (x + 2) in place of y into 2x + y = 11. Solve for x first, then substitute x back to find y.',
      },
      {
        id: 'sys-sc-q10',
        category: 'substitution-solution',
        question:
          'What is the solution (x, y) to the system of equations where both equations are solved for y?',
        context: 'Equation 1: y = 5x - 3  |  Equation 2: y = 2x + 9',
        options: ['(4, 17)', '(2, 7)', '(4, 13)', '(17, 4)'],
        correctIndex: 0,
        explanation:
          'Set the equations equal: 5x - 3 = 2x + 9. Subtract 2x from both sides: 3x - 3 = 9. Add 3: 3x = 12 → x = 4. Substitute x = 4 into Equation 2: y = 2(4) + 9 = 8 + 9 = 17. Check in Equation 1: y = 5(4) - 3 = 17 ✓. The solution is (4, 17).',
        hint: 'Since both equal y, set them equal to each other: 5x - 3 = 2x + 9. Subtract 2x from both sides and add 3.',
      },
      {
        id: 'sys-sc-q16',
        category: 'substitution-solution',
        question:
          'Solve the system of linear equations below using substitution:',
        context: 'Equation 1: x = 2y - 1  |  Equation 2: 3x - 4y = 5',
        options: ['(7, 4)', '(4, 7)', '(5, 3)', '(9, 5)'],
        correctIndex: 0,
        explanation:
          'Substitute (2y - 1) for x into Equation 2: 3(2y - 1) - 4y = 5. Distribute: 6y - 3 - 4y = 5 → 2y - 3 = 5 → 2y = 8 → y = 4. Now find x: x = 2(4) - 1 = 8 - 1 = 7. Check: 3(7) - 4(4) = 21 - 16 = 5 ✓. The solution is (7, 4).',
        hint: 'Substitute (2y - 1) in place of x into 3x - 4y = 5: 3(2y - 1) - 4y = 5. Distribute the 3 to both terms inside the parentheses.',
      },

      // STRAND 5: Types of Solutions - One, None, Infinite (sys-sc-q5, sys-sc-q11, sys-sc-q17)
      {
        id: 'sys-sc-q5',
        category: 'solution-types',
        question:
          'Examine the system of linear equations shown below. How many solutions does this system have?',
        context: 'Line 1: y = 3x + 4  |  Line 2: y = 3x - 2',
        graphData: {
          title: 'Graph of Parallel Lines',
          xMin: -3,
          xMax: 3,
          yMin: -3,
          yMax: 7,
          lines: [
            {
              label: 'Line 1: y = 3x + 4',
              slope: 3,
              intercept: 4,
              color: '#2563eb',
              equation: 'y = 3x + 4',
            },
            {
              label: 'Line 2: y = 3x - 2',
              slope: 3,
              intercept: -2,
              color: '#d97706',
              equation: 'y = 3x - 2',
            },
          ],
        },
        options: [
          'No solution (the lines are parallel and will never intersect)',
          'Exactly one solution at (4, -2)',
          'Infinitely many solutions (the lines are identical)',
          'Two solutions (one for each equation)',
        ],
        correctIndex: 0,
        explanation:
          'Both equations have the identical slope (m = 3) but different y-intercepts (b = 4 and b = -2). Lines with the same slope and different intercepts are parallel lines that never intersect. Therefore, the system has NO SOLUTION.',
        hint: 'Notice that both lines have the exact same slope (m = 3), but different y-intercepts (4 and -2). Parallel lines never cross.',
      },
      {
        id: 'sys-sc-q11',
        category: 'solution-types',
        question:
          'Consider the system of equations below. Which statement is completely accurate?',
        context: 'Equation 1: y = -2x + 5  |  Equation 2: 2x + y = 5',
        options: [
          'The system has infinitely many solutions because rearranging Equation 2 gives y = -2x + 5, showing both equations represent the exact same line.',
          'The system has no solution because the slopes are opposite signs.',
          'The system has exactly one solution at (0, 5) only.',
          'The system has exactly one solution at (2.5, 0) only.',
        ],
        correctIndex: 0,
        explanation:
          'Subtract 2x from both sides of 2x + y = 5 to isolate y: y = -2x + 5. This is identical to Equation 1! Because both equations have the same slope (m = -2) and the same y-intercept (b = 5), they represent the exact same line. Every point on the line is a shared solution, giving INFINITELY MANY SOLUTIONS.',
        hint: 'Rearrange Equation 2 by subtracting 2x from both sides. Compare the resulting equation with Equation 1.',
      },
      {
        id: 'sys-sc-q17',
        category: 'solution-types',
        question:
          'Without graphing, which of the following systems of equations has EXACTLY ONE solution?',
        options: [
          'y = 4x + 1 and y = -x + 6',
          'y = 2x + 3 and y = 2x - 5',
          'y = -3x + 2 and 3x + y = 2',
          'y = x - 4 and y = x + 1',
        ],
        correctIndex: 0,
        explanation:
          'A system of two linear equations has exactly one solution if and only if the lines have different slopes (m₁ ≠ m₂). In "y = 4x + 1 and y = -x + 6", the slopes are m = 4 and m = -1. Since 4 ≠ -1, the lines must intersect at exactly one point. In the other choices, the lines have equal slopes (either parallel or identical).',
        hint: 'Compare the slopes (m). A linear system has exactly ONE solution if and only if the two lines have DIFFERENT slopes.',
      },

      // STRAND 6: Real-World Applications & Context Interpretation (sys-sc-q6, sys-sc-q12, sys-sc-q18)
      {
        id: 'sys-sc-q6',
        category: 'real-world-systems',
        question:
          'FitGym charges a $20 sign-up fee plus $15 per month (y = 15x + 20). PowerGym charges $0 sign-up fee plus $20 per month (y = 20x). After how many months (x) will the total cost (y) for both gyms be the same, and what is that cost?',
        context: 'FitGym: y = 15x + 20  |  PowerGym: y = 20x',
        options: [
          '4 months, with a total cost of $80',
          '5 months, with a total cost of $100',
          '3 months, with a total cost of $65',
          '4 months, with a total cost of $60',
        ],
        correctIndex: 0,
        explanation:
          'Set the cost equations equal: 20x = 15x + 20. Subtract 15x from both sides: 5x = 20 → x = 4 months. Calculate the total cost: y = 20(4) = $80 (or y = 15(4) + 20 = $80). At 4 months, both gyms cost exactly $80.',
        hint: 'Set the two total cost equations equal: 20x = 15x + 20. Subtract 15x from both sides to solve for months (x).',
      },
      {
        id: 'sys-sc-q12',
        category: 'real-world-systems',
        question:
          'A middle school drama club sold student tickets for $3 each and adult tickets for $5 each. They sold a total of 100 tickets and collected $380. How many student tickets (s) and adult tickets (a) were sold?',
        context: 'Ticket count: s + a = 100  |  Revenue: 3s + 5a = 380',
        options: [
          '60 student tickets and 40 adult tickets',
          '40 student tickets and 60 adult tickets',
          '50 student tickets and 50 adult tickets',
          '70 student tickets and 30 adult tickets',
        ],
        correctIndex: 0,
        explanation:
          'Express s in terms of a: s = 100 - a. Substitute into the revenue equation: 3(100 - a) + 5a = 380 → 300 - 3a + 5a = 380 → 300 + 2a = 380 → 2a = 80 → a = 40 adult tickets. Then s = 100 - 40 = 60 student tickets. Check revenue: 3(60) + 5(40) = 180 + 200 = $380 ✓.',
        hint: 'From s + a = 100, we get s = 100 - a. Substitute (100 - a) into 3s + 5a = 380: 3(100 - a) + 5a = 380.',
      },
      {
        id: 'sys-sc-q18',
        category: 'real-world-systems',
        question:
          'Runner A starts 10 meters ahead and runs at 3 m/s (y = 3x + 10). Runner B starts at the line and runs at 5 m/s (y = 5x), where x is time in seconds and y is distance in meters. What does the solution (5, 25) mean in this situation?',
        context: 'Runner A: y = 3x + 10  |  Runner B: y = 5x',
        options: [
          'After 5 seconds, Runner B catches Runner A at a distance of 25 meters from the starting line.',
          'After 25 seconds, both runners have traveled a total of 5 meters.',
          'Runner A finishes the race 5 seconds ahead of Runner B at the 25-meter mark.',
          'Runner B runs 5 meters per second and Runner A runs 25 meters per second.',
        ],
        correctIndex: 0,
        explanation:
          'In this context, x represents elapsed time in seconds and y represents total distance in meters. The solution (x = 5, y = 25) means that after 5 seconds, both runners are at the exact same location: 25 meters from the starting line, meaning Runner B has caught up to Runner A.',
        hint: 'Identify what x and y stand for: x is time in seconds (5 seconds) and y is distance in meters (25 meters).',
      },
    ],
  },
};
