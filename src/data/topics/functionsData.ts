import { TopicData, PracticeQuestion } from '../../types';
import { UNIT_8_SELF_CHECK_QUESTIONS } from '../unit8SelfCheckQuestions';

export const TOPIC_8_FUNCTIONS: TopicData = {
  id: 'functions-linear-relationships',
  number: 8,
  title: 'Functions: Linear and Nonlinear Relationships',
  shortTitle: 'Functions',
  subtitle: 'Identifying, Representing, Describing & Comparing Functions',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.5G, 8.5H, 8.4C, 8.5A, 8.5B, 8.5F, 8.5I',
  unit: 'Unit 8: Functions',
  summary:
    'Master the concept of functions across three core areas: identifying relations that are functions using tables, mapping diagrams, and the vertical line test (TEKS 8.5G); describing and classifying linear and nonlinear functions with constant rates of change and initial values (TEKS 8.5G, 8.5H); and comparing functions across equations, graphs, tables, and verbal descriptions (TEKS 8.4C, 8.5A/B/F/H/I).',
  themeColor: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
  },
  learnOverview:
    'In Unit 8: Functions, you will explore the foundational concept of functions in mathematics. Section A introduces how to identify and represent functions across ordered pairs, tables, mapping diagrams, and graphs, applying the fundamental rule that every input (x) must be assigned to exactly one output (y), and demonstrating the vertical line test. Section B focuses on describing functions: distinguishing linear from nonlinear functions, calculating constant rates of change (Δy / Δx), contrasting proportional relationships (y = kx) with nonproportional linear models (y = mx + b, b ≠ 0), and understanding why a nonlinear relationship whose graph is not a straight line can still be a function even if it passes through the origin. Section C teaches you how to compare functions presented in different representations—equations, tables, graphs, and real-world verbal scenarios—by analyzing their slopes, initial values, and output values.',
  concepts: [
    {
      id: 'concept-8-a-identifying-representing-functions',
      title: 'A. Identifying and Representing Functions — TEKS 8.5G',
      summary:
        'A function is a special type of relation that assigns exactly one output to each input. Represent and test functions using ordered pairs, tables, mapping diagrams, and the vertical line test.',
      ruleFormula: 'Function Rule: Each Input (x) ➔ Exactly ONE Output (y)',
      ruleExplanation:
        'A relation is a function if no input is paired with two or more different outputs. Different inputs MAY share the same output value. Repeating an identical ordered pair does not violate the definition.',
      keyPoints: [
        'Inputs and Outputs: The input is the independent variable (x), and the output is the dependent variable (y).',
        'Definition of a Function: A mathematical rule or relation that assigns exactly one output (y) to each input (x).',
        'Different Inputs Sharing One Output: Two or more different inputs MAY share the exact same output (e.g., (−2, 4) and (2, 4)). This is completely valid and represents a true function.',
        'Conflicting Outputs Disqualify a Relation: If a single input is paired with two or more DIFFERENT outputs (e.g., (3, 5) and (3, 8)), the relation is NOT a function.',
        'Identical Repeated Pairs: Repeating an identical ordered pair (e.g., (4, 7) listed twice) does NOT make a relation a nonfunction because the input 4 is still paired with only one output value (7).',
        'Mapping Diagrams: In a mapping diagram, every input number in the domain must have exactly ONE departing arrow. If an input branches into two or more arrows, it is NOT a function.',
        'The Vertical Line Test: On a coordinate graph, a relation is a function if and only if NO vertical line intersects the graph at more than one point. If any vertical line touches two or more points, it fails the test and is not a function.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'concept-8-b-describing-functions',
      title: 'B. Describing Functions — TEKS 8.5G and 8.5H',
      summary:
        'Classify functions as linear or nonlinear, determine constant rate of change (slope) and initial value (y-intercept), and compare proportional (y = kx) versus nonproportional (y = mx + b) models.',
      ruleFormula:
        'Linear: Constant Rate of Change Δy/Δx = m  |  Proportional: y = kx (x ≠ 0)  |  Nonproportional: y = mx + b (b ≠ 0)',
      ruleExplanation:
        'Linear functions form a non-vertical straight line with a constant rate of change. Nonlinear functions have a variable rate of change and their graph is not a single straight line. Proportional linear functions (y = kx) pass through (0, 0) with a constant ratio y/x = k for all x ≠ 0 (passing through the origin alone is insufficient; the relationship must also be linear). Nonproportional linear functions have a non-zero initial value b (y = mx + b, b ≠ 0).',
      keyPoints: [
        'Linear Functions: Have a constant rate of change between any two points (Δy / Δx = constant m). Their graph is a non-vertical straight line.',
        'Nonlinear Functions: Have a rate of change that varies across intervals (e.g., quadratic y = x² or piecewise segments). Their graph is not a single straight line.',
        'A Nonlinear Relation Can Still Be a Function: A relationship whose graph is not a straight line (such as a parabola y = x²) is still a 100% valid function because every input has exactly one output and it passes the vertical line test.',
        'Constant Rate of Change Formula: m = (change in y) / (change in x) = (y₂ − y₁) / (x₂ − x₁).',
        'Initial Value (y-intercept): The output value when the input is zero (x = 0), represented by b in y = mx + b. It marks where the line crosses the y-axis (0, b).',
        'Slopes in Context: Positive slope means the dependent variable increases as input increases; negative slope means it decreases (e.g., draining water, spending savings); zero slope (y = c) is a horizontal line with constant output.',
        'Origin Misconception: Passing through the origin (0, 0) alone is insufficient to establish proportionality! A relationship must ALSO be linear with a constant ratio y/x = k for all x ≠ 0 (e.g., y = x² passes through (0, 0) but its graph is not a straight line, so it is nonlinear and nonproportional).',
        'Proportional vs. Nonproportional: Proportional functions have the linear form y = kx (b = 0), where the ratio y/x = k is constant for all x ≠ 0. Nonproportional linear functions have the form y = mx + b with b ≠ 0, where the ratio y/x varies for nonzero inputs.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'concept-8-c-comparing-functions',
      title: 'C. Comparing Functions — TEKS 8.4C, 8.5A/B/F/H/I',
      summary:
        'Compare two functions presented in different representations (tables, graphs, equations, and verbal descriptions) by calculating and analyzing their rates of change, initial values, and outputs.',
      ruleFormula:
        'Compare Slopes (m₁ vs. m₂)  |  Compare y-Intercepts (b₁ vs. b₂)  |  Evaluate f(x) at Specified Input x',
      ruleExplanation:
        'Extract slope and y-intercept from each given form. Write linear equations y = mx + b to model both relationships, evaluate outputs at target inputs, and determine break-even points.',
      keyPoints: [
        'Multi-Representation Translation: Convert tables, graphs, equations, and verbal stories into a common algebraic model y = mx + b to compare them directly.',
        'Comparing Rates of Change: Compare signed slopes to describe direction and rate. To compare how quickly quantities change, compare |m| using matching units. For example, a tank with slope −18 gal/min drains faster than one with slope −15 gal/min because 18 > 15. Only compare visual steepness on graphs when their coordinate scales match.',
        'Comparing Initial Values: Compare the starting amounts when x = 0 (upfront fees, initial elevation, starting balance, or initial tank volume).',
        'Writing Linear Equations: Find slope m = Δy/Δx from two points or table rows, determine initial value b when x = 0 (or solve b = y − mx), and write y = mx + b.',
        'Evaluating Target Inputs: Substitute a specified value of x into both functions to find which yields a greater output or lower cost in real-world decision-making.',
        'Finding Break-Even Points: Set two linear equations equal (m₁x + b₁ = m₂x + b₂) to solve for the input value where both functions produce identical outputs.',
        'Real-World Contexts: Apply function comparisons to phone plans, gym memberships, car rental pricing, travel distances, and quantities decreasing over time.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'Relation',
      definition:
        'A set of ordered pairs representing a relationship between an input set (domain) and an output set (range).',
      symbolOrFormula: '{(x₁, y₁), (x₂, y₂), ...}',
      example: '{(1, 5), (2, 8), (3, 11)} is a relation between hours worked and money earned.',
      tip: 'Every function is a relation, but not every relation is a function!',
      category: 'Section A: Foundations',
    },
    {
      term: 'Function',
      definition:
        'A rule or relation that assigns exactly one output value (y) to each input value (x).',
      symbolOrFormula: 'Each x ➔ Exactly ONE y',
      example: 'The equation y = 3x + 1 is a function because every x produces only one value for y.',
      tip: 'Think of a vending machine: pressing button B4 must give you one specific snack, never two different items!',
      category: 'Section A: Foundations',
    },
    {
      term: 'Input',
      definition:
        'The value supplied to a function, usually represented by x. An input is an element of the domain; the domain is the set of all allowed inputs.',
      symbolOrFormula: 'x (Independent Variable)',
      example: 'In y = 2x + 5, if you input x = 4, the output is y = 13.',
      tip: 'Input goes "IN" to the function machine first.',
      category: 'Section A: Foundations',
    },
    {
      term: 'Output',
      definition:
        'The value produced by a function for a given input, usually represented by y. An output is an element of the range; the range is the set of all actual outputs.',
      symbolOrFormula: 'y (Dependent Variable)',
      example: 'For input x = 3 in y = 5x, the output y is 15.',
      tip: 'Output comes "OUT" of the function machine after calculating.',
      category: 'Section A: Foundations',
    },
    {
      term: 'Ordered Pair',
      definition:
        'A pair of numbers (x, y) used to locate a point on a coordinate grid or represent a specific input-output pairing.',
      symbolOrFormula: '(x, y)',
      example: '(3, 7) means input x = 3 produces output y = 7.',
      tip: 'Remember alphabetical order: x comes before y!',
      category: 'Section A: Foundations',
    },
    {
      term: 'Mapping Diagram',
      definition:
        'A visual representation showing two parallel ovals (domain and range) with arrows connecting each input to its corresponding output.',
      symbolOrFormula: 'Domain Oval ──➔ Range Oval',
      example: 'An arrow drawn from 2 in the domain to 8 in the range represents the ordered pair (2, 8).',
      tip: 'Look at the arrows leaving the left oval: if any number has MORE than one arrow leaving it, it is NOT a function!',
      category: 'Section A: Foundations',
    },
    {
      term: 'Vertical Line Test',
      definition:
        'A visual test stating that a graph represents a function if and only if no vertical line can intersect the graph in more than one point.',
      symbolOrFormula: 'Vertical Line: x = c',
      example: 'A circle fails the vertical line test because a vertical line crosses it at two points. A straight non-vertical line passes.',
      tip: 'Slide a ruler or pencil vertically across the graph from left to right; if it ever touches 2 points at once, say "NOT a function!"',
      category: 'Section A: Foundations',
    },
    {
      term: 'Linear Function',
      definition:
        'A function whose graph forms a straight line and whose rate of change (slope) is constant throughout the entire domain.',
      symbolOrFormula: 'y = mx + b',
      example: 'y = 2x + 4 graphs as a straight line with a constant slope of 2.',
      tip: 'Look for "line" inside the word "linear"!',
      category: 'Section B: Describing',
    },
    {
      term: 'Nonlinear Function',
      definition:
        'A function whose rate of change is not constant throughout its domain and whose graph is not a single straight line (e.g., curves, parabolas, or piecewise segments).',
      symbolOrFormula: 'e.g., y = x², y = 2ˣ, y = 1/x',
      example: 'The function y = x² is a curve (parabola) whose rate of change increases as x increases.',
      tip: 'A relationship can be a valid function even if it is nonlinear—its graph simply is not a single straight line!',
      category: 'Section B: Describing',
    },
    {
      term: 'Rate of Change',
      definition:
        'The ratio that compares the vertical change in output (Δy) to the horizontal change in input (Δx) between two points on a relationship (where Δx ≠ 0).',
      symbolOrFormula: 'Rate of Change = Δy / Δx (where Δx ≠ 0)',
      example: 'If y increases by 12 when x increases by 3, the rate of change is 12 / 3 = 4.',
      tip: 'In a linear function, rate of change is identical to the slope m.',
      category: 'Section B: Describing',
    },
    {
      term: 'Slope',
      definition:
        'The measure of steepness and direction of a line, represented by the ratio of vertical rise to horizontal run between any two points with different x-coordinates (Δx ≠ 0).',
      symbolOrFormula: 'm = (y₂ − y₁) / (x₂ − x₁), where Δx ≠ 0',
      example: 'For points (1, 3) and (4, 9), slope m = (9 − 3)/(4 − 1) = 6/3 = 2.',
      tip: '"Rise over Run" — y goes on top because y rises into the sky! If Δx = 0, the line is vertical and slope is undefined.',
      category: 'Section B: Describing',
    },
    {
      term: 'Initial Value',
      definition:
        'The value of the output (y) when the input (x) equals zero; corresponds to the y-intercept of a function.',
      symbolOrFormula: 'y-value at x = 0 (b in y = mx + b)',
      example: 'A car rental company charging a $30 flat fee plus $0.20/mile has an initial value of $30.',
      tip: 'The initial value is your starting line before any miles, hours, or units are counted.',
      category: 'Section B: Describing',
    },
    {
      term: 'y-Intercept',
      definition:
        'The y-coordinate of the point (0, b) where a line or graph crosses the vertical y-axis.',
      symbolOrFormula: 'Point (0, b)',
      example: 'The line y = −3x + 7 crosses the y-axis at (0, 7), so the y-intercept is 7.',
      tip: 'To find the y-intercept from an equation, plug in x = 0 and solve for y.',
      category: 'Section B: Describing',
    },
    {
      term: 'Proportional Relationship',
      definition:
        'A linear relationship where the graph is a non-vertical straight line passing through the origin (0, 0). For x ≠ 0, y/x = k. At x = 0, y = 0, but y/x is undefined.',
      symbolOrFormula: 'y = kx',
      example: 'Earning $15 per hour: y = 15x. At x = 0, y = 0. For all x ≠ 0, y/x = 15.',
      tip: 'Must satisfy TWO conditions: (1) straight line (linear), and (2) passes through the origin (0, 0)!',
      category: 'Section B: Describing',
    },
    {
      term: 'Nonproportional Relationship',
      definition:
        'A relationship that cannot be represented by y = kx with one constant k. It may be linear or nonlinear.',
      symbolOrFormula: 'Linear: y = mx + b (b ≠ 0) | Nonlinear: e.g., y = x²',
      example:
        'Linear nonproportional: y = 10x + 20, with nonzero initial value. Nonlinear nonproportional: y = x², which passes through the origin but is not a straight line.',
      tip: 'Clarification: b ≠ 0 identifies nonproportional relationships within the linear family y = mx + b. In nonlinear models, varying rates of change or curves also make them nonproportional.',
      category: 'Section B: Describing',
    },
  ],
  workedExamples: [
    {
      id: 'ex-1-ordered-pairs-function',
      title: 'Example 1: Identifying Functions from Ordered Pairs',
      problem:
        'Determine whether each relation represents y as a function of x. Explain your mathematical reasoning.\nRelation A: {(−3, 4), (−1, 7), (0, 4), (2, 9)}\nRelation B: {(1, 5), (4, 8), (1, −2), (6, 11)}',
      given: 'Relation A: {(−3, 4), (−1, 7), (0, 4), (2, 9)}\nRelation B: {(1, 5), (4, 8), (1, −2), (6, 11)}',
      strategy:
        'Inspect the x-values (inputs). For a relation to be a function, each input must be paired with exactly one output. Check whether any x-value appears more than once with different y-values.',
      steps: [
        {
          stepNumber: 1,
          title: 'Analyze Relation A inputs and outputs',
          explanation:
            'List the input values: {−3, −1, 0, 2}. Notice that every input is distinct.',
          mathDetail: '−3 ➔ 4\n−1 ➔ 7\n 0 ➔ 4\n 2 ➔ 9',
          visualNote:
            'Inputs −3 and 0 both have output 4. This is allowed! Two different inputs sharing one output does NOT violate the definition of a function.',
        },
        {
          stepNumber: 2,
          title: 'Classify Relation A',
          explanation:
            'Since each input {−3, −1, 0, 2} is assigned to exactly one output, Relation A IS A FUNCTION.',
          mathDetail: 'Relation A: Function ✔',
        },
        {
          stepNumber: 3,
          title: 'Analyze Relation B inputs and outputs',
          explanation:
            'List the ordered pairs in Relation B and check the input values: (1, 5) and (1, −2).',
          mathDetail: 'Input 1 ➔ 5\nInput 1 ➔ −2    ◄── ONE INPUT, TWO DIFFERENT OUTPUTS!',
        },
        {
          stepNumber: 4,
          title: 'Classify Relation B',
          explanation:
            'The input x = 1 is assigned to two different outputs (5 and −2). Therefore, Relation B is NOT A FUNCTION.',
          mathDetail: 'Relation B: Not a Function ✖',
        },
      ],
      conclusion:
        'Relation A is a function because every input has exactly one output. Relation B is not a function because input 1 has two different outputs (5 and −2).',
      teacherTip:
        'Different inputs sharing the same output is like two different students receiving the same test grade (allowed!). One input having two different outputs is like one student receiving two different grades on the exact same test (impossible in a function!).',
      commonMistake:
        'Students often think Relation A is not a function because the output 4 repeats. Remember: outputs CAN repeat; inputs CANNOT pair with different outputs!',
    },
    {
      id: 'ex-2-table-repeated-vs-conflicting',
      title: 'Example 2: Analyzing Tables with Repeated Outputs vs. Conflicting Inputs',
      problem:
        'Examine the two tables below. Determine whether each table represents a function. Specifically explain why identical duplicate ordered pairs do not disqualify a relation.\nTable 1: {(2, 7), (4, 9), (2, 7), (6, 11)}\nTable 2: {(3, 5), (5, 8), (3, 12), (7, 15)}',
      given:
        'Table 1 inputs: {2, 4, 2, 6} with outputs {7, 9, 7, 11}\nTable 2 inputs: {3, 5, 3, 7} with outputs {5, 8, 12, 15}',
      strategy:
        'Distinguish between an identical duplicate ordered pair (which names the exact same coordinate point) and conflicting outputs for one input (which violates the function rule).',
      steps: [
        {
          stepNumber: 1,
          title: 'Inspect Table 1 for input-output assignments',
          explanation:
            'Look at the rows where x = 2: Row 1 gives (2, 7) and Row 3 gives (2, 7).',
          mathDetail: 'Row 1: (2, 7)\nRow 3: (2, 7)  ➔ Exact same output (7)!',
          visualNote:
            'Plotting (2, 7) twice on a graph lands on the exact same point. The input 2 is paired with only one value: 7.',
        },
        {
          stepNumber: 2,
          title: 'Classify Table 1',
          explanation:
            'Because every input in Table 1 has exactly one output, Table 1 IS A FUNCTION.',
          mathDetail: 'Table 1: Function ✔',
        },
        {
          stepNumber: 3,
          title: 'Inspect Table 2 for conflicting outputs',
          explanation:
            'Look at the rows where x = 3: Row 1 gives (3, 5) and Row 3 gives (3, 12).',
          mathDetail: 'Row 1: (3, 5)\nRow 3: (3, 12)  ➔ TWO DIFFERENT OUTPUTS (5 and 12)!',
        },
        {
          stepNumber: 4,
          title: 'Classify Table 2',
          explanation:
            'Because input x = 3 is assigned to two different outputs (5 and 12), Table 2 is NOT A FUNCTION.',
          mathDetail: 'Table 2: Not a Function ✖',
        },
      ],
      conclusion:
        'Table 1 is a function (identical duplicate rows do not create conflicting outputs). Table 2 is not a function because input 3 has two conflicting outputs (5 and 12).',
      teacherTip:
        'Tell students: Repeating an identical pair is like writing your name twice on your paper—it’s redundant, but you are still one person!',
      commonMistake:
        'Assuming any repeating number in the input column automatically makes a table a nonfunction. Check the output column first!',
    },
    {
      id: 'ex-3-mapping-diagram',
      title: 'Example 3: Evaluating Mapping Diagrams',
      problem:
        'A mapping diagram shows Domain = {−2, 0, 3, 5} and Range = {1, 6, 9}. Arrows are drawn as follows: −2 ➔ 6, 0 ➔ 1, 3 ➔ 6, and 5 ➔ 9. Determine whether this mapping diagram represents a function, and describe what would cause it to become a nonfunction.',
      given: 'Domain: {−2, 0, 3, 5}\nRange: {1, 6, 9}\nArrows: −2 ➔ 6, 0 ➔ 1, 3 ➔ 6, 5 ➔ 9',
      strategy:
        'Count the number of arrows originating from each element in the domain oval. Each domain element must have exactly one outgoing arrow.',
      steps: [
        {
          stepNumber: 1,
          title: 'Count outgoing arrows from each domain value',
          explanation:
            'Check each input in the left oval:\n• From −2: exactly 1 arrow (pointing to 6)\n• From 0: exactly 1 arrow (pointing to 1)\n• From 3: exactly 1 arrow (pointing to 6)\n• From 5: exactly 1 arrow (pointing to 9)',
          mathDetail: 'Total outgoing arrows per input: exactly 1 arrow for each number in the domain.',
        },
        {
          stepNumber: 2,
          title: 'Evaluate the shared output 6',
          explanation:
            'Notice that both −2 and 3 point to 6 in the range oval (two arrows point TO 6).',
          mathDetail: '−2 ──➔ 6\n 3  ──➔ 6    ◄── Two arrows arriving at one output is ALLOWED!',
        },
        {
          stepNumber: 3,
          title: 'Identify what would make it a nonfunction',
          explanation:
            'If an arrow were added from 0 pointing to 9, then input 0 would have TWO outgoing arrows (0 ➔ 1 and 0 ➔ 9), which would disqualify it as a function.',
          mathDetail: 'Nonfunction test: More than 1 arrow LEAVING any single domain element.',
        },
      ],
      conclusion:
        'The mapping diagram represents a function because exactly one arrow departs from each input in the domain.',
      teacherTip:
        'Focus student eyes exclusively on the left oval (domain). If any number on the left has "forked" arrows leaving it, it is not a function.',
      commonMistake:
        'Looking at the right oval (range) and seeing two incoming arrows arriving at 6, mistakenly concluding it is not a function.',
    },
    {
      id: 'ex-4-graph-vertical-line-test',
      title: 'Example 4: Applying the Vertical Line Test to Graphs',
      problem:
        'Use the vertical line test to determine whether each of the following graphs represents y as a function of x:\nGraph A: A parabola opening to the right with vertex at (0, 0) passing through (4, 2) and (4, −2).\nGraph B: A line with equation y = −2x + 5.',
      given:
        'Graph A: Horizontal parabola opening right (x = y²)\nGraph B: Linear graph y = −2x + 5',
      strategy:
        'Imagine drawing vertical lines x = c across the entire coordinate plane. If any vertical line intersects the graph at more than one point, the graph is not a function.',
      steps: [
        {
          stepNumber: 1,
          title: 'Test Graph A with a vertical line',
          explanation:
            'Draw a vertical line at x = 4. The vertical line intersects the curve at two distinct points: (4, 2) and (4, −2).',
          mathDetail: 'Vertical line x = 4 intersects Graph A at (4, 2) and (4, −2).\nTwo intersection points for one x-value!',
          visualNote: 'Because input 4 corresponds to two outputs (2 and −2), Graph A fails the vertical line test.',
        },
        {
          stepNumber: 2,
          title: 'Classify Graph A',
          explanation:
            'Graph A fails the vertical line test. Therefore, Graph A is NOT A FUNCTION.',
          mathDetail: 'Graph A: Not a Function ✖',
        },
        {
          stepNumber: 3,
          title: 'Test Graph B with vertical lines',
          explanation:
            'Draw vertical lines across the line y = −2x + 5 at x = −2, x = 0, x = 3, etc. Every vertical line intersects the line at exactly one single point.',
          mathDetail: 'At x = 0: intersects at (0, 5)\nAt x = 1: intersects at (1, 3)\nAt x = 3: intersects at (3, −1)\nEvery vertical line intersects at exactly ONE point.',
        },
        {
          stepNumber: 4,
          title: 'Classify Graph B',
          explanation:
            'Graph B passes the vertical line test. Therefore, Graph B IS A FUNCTION.',
          mathDetail: 'Graph B: Function ✔',
        },
      ],
      conclusion:
        'Graph A is not a function because vertical line x = 4 intersects it at two points. Graph B is a function because every vertical line intersects it at exactly one point.',
      teacherTip:
        'Remind students that any vertical line itself (such as x = 3) has an undefined slope and fails the vertical line test because the test line lands on infinitely many points.',
      commonMistake:
        'Confusing horizontal lines with vertical lines. A horizontal line (y = 4) passes the vertical line test and is a function!',
    },
    {
      id: 'ex-5-linear-vs-nonlinear',
      title: 'Example 5: Distinguishing Linear and Nonlinear Functions',
      problem:
        'Determine whether each table represents a linear function or a nonlinear function by calculating the rate of change (Δy / Δx) between consecutive points.\nTable A: (0, 3), (2, 7), (4, 11), (6, 15)\nTable B: (0, 0), (1, 1), (2, 4), (3, 9)',
      given:
        'Table A: (0, 3), (2, 7), (4, 11), (6, 15)\nTable B: (0, 0), (1, 1), (2, 4), (3, 9)',
      strategy:
        'Compute the ratio Δy / Δx for each interval. If the ratio is constant for all intervals, the function is linear. If the ratio varies, the function is nonlinear.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate Δy / Δx for Table A',
          explanation:
            'Find the changes in y and x between each pair of consecutive points:\n• Interval 1: Δy = 7 − 3 = 4, Δx = 2 − 0 = 2 ➔ Δy/Δx = 4/2 = 2\n• Interval 2: Δy = 11 − 7 = 4, Δx = 4 − 2 = 2 ➔ Δy/Δx = 4/2 = 2\n• Interval 3: Δy = 15 − 11 = 4, Δx = 6 − 4 = 2 ➔ Δy/Δx = 4/2 = 2',
          mathDetail: 'Rate of change is constant: m = 2 for all intervals.\nEquation: y = 2x + 3',
        },
        {
          stepNumber: 2,
          title: 'Classify Table A',
          explanation:
            'Because the rate of change is constant throughout, Table A represents a LINEAR FUNCTION.',
          mathDetail: 'Table A: Linear Function ✔',
        },
        {
          stepNumber: 3,
          title: 'Calculate Δy / Δx for Table B',
          explanation:
            'Find the changes in y and x between each pair of consecutive points:\n• Interval 1: Δy = 1 − 0 = 1, Δx = 1 − 0 = 1 ➔ Δy/Δx = 1/1 = 1\n• Interval 2: Δy = 4 − 1 = 3, Δx = 2 − 1 = 1 ➔ Δy/Δx = 3/1 = 3\n• Interval 3: Δy = 9 − 4 = 5, Δx = 3 − 2 = 1 ➔ Δy/Δx = 5/1 = 5',
          mathDetail: 'Rates of change: 1, 3, 5 (increasing rate of change!).\nEquation: y = x²',
        },
        {
          stepNumber: 4,
          title: 'Classify Table B',
          explanation:
            'The rate of change is not constant (it increases from 1 to 3 to 5). Therefore, Table B represents a NONLINEAR FUNCTION.',
          mathDetail: 'Table B: Nonlinear Function ✔ (Still a function, but nonlinear!)',
        },
      ],
      conclusion:
        'Table A represents a linear function with constant rate of change m = 2. Table B represents a nonlinear function because its rate of change varies.',
      teacherTip:
        'Emphasize that Table B is still a function! Students often equate "nonlinear" with "not a function." A function whose graph is not a straight line can still be a completely valid function.',
      commonMistake:
        'Only checking the change in y without dividing by the change in x. If x skips by 2 or 3, Δy will change even for a linear function!',
    },
    {
      id: 'ex-6-proportional-vs-nonproportional',
      title: 'Example 6: Comparing Proportional and Nonproportional Relationships',
      problem:
        'Compare the two linear situations below. Explain which is proportional and which is nonproportional using their equations, tables, and graphs.\nSituation 1: A car travels on cruise control at 65 miles per hour (d = 65t).\nSituation 2: A roadside emergency service charges a $40 dispatch fee plus $2.50 per mile towed (C = 2.50m + 40).',
      given:
        'Situation 1: d = 65t (speed = 65 mph)\nSituation 2: C = 2.50m + 40 (dispatch fee = $40, mileage rate = $2.50/mi)',
      strategy:
        'Check the conditions for proportionality: (1) Is the relationship linear and does its graph pass through the origin (0, 0)? Passing through the origin alone is insufficient. (2) Is the ratio of output to input (y/x) constant for all nonzero inputs (x ≠ 0)?',
      steps: [
        {
          stepNumber: 1,
          title: 'Analyze Situation 1 (d = 65t)',
          explanation:
            'Evaluate when t = 0: d = 65(0) = 0. The graph passes through the origin (0, 0).',
          mathDetail: 'At t = 0: d = 0 ➔ passes through (0, 0)\nRatio d/t for t ≠ 0: 65/1 = 130/2 = 195/3 = 65 (constant ratio k = 65)',
        },
        {
          stepNumber: 2,
          title: 'Classify Situation 1',
          explanation:
            'Because it is linear (d = 65t), passes through (0, 0), and has a constant ratio d/t = 65 for all t ≠ 0, Situation 1 is a PROPORTIONAL RELATIONSHIP.',
          mathDetail: 'Situation 1: Proportional (y = kx) ✔',
        },
        {
          stepNumber: 3,
          title: 'Analyze Situation 2 (C = 2.50m + 40)',
          explanation:
            'Evaluate when m = 0: C = 2.50(0) + 40 = 40. The graph has a y-intercept at (0, 40) and does NOT pass through (0, 0).',
          mathDetail: 'At m = 0: C = $40 (initial flat fee)\nRatio C/m at m = 10: (25 + 40)/10 = 65/10 = 6.5\nRatio C/m at m = 20: (50 + 40)/20 = 90/20 = 4.5 (ratios are NOT equal!)',
        },
        {
          stepNumber: 4,
          title: 'Classify Situation 2',
          explanation:
            'Because the y-intercept is b = 40 (non-zero) and the ratio C/m varies, Situation 2 is a NONPROPORTIONAL LINEAR RELATIONSHIP.',
          mathDetail: 'Situation 2: Nonproportional Linear (y = mx + b, b ≠ 0) ✔',
        },
      ],
      conclusion:
        'Situation 1 is proportional because d = 65t is a linear function passing through (0, 0) with a constant ratio 65 for all t ≠ 0. Situation 2 is nonproportional because C = 2.50m + 40 starts at (0, 40) with a flat fee.',
      teacherTip:
        'In any real-world problem, if there is a flat fee, starting deposit, or baseline penalty, the relationship is automatically nonproportional.',
      commonMistake:
        'Thinking Situation 2 is not linear. It IS linear (straight line with constant slope 2.50), but it is NONPROPORTIONAL because b = 40.',
    },
    {
      id: 'ex-7-slope-initial-value-table',
      title: 'Example 7: Finding Slope and Initial Value from a Table',
      problem:
        'A linear function is represented by the table below. Find the slope (rate of change) and the initial value (y-intercept), and write the equation of the function in slope-intercept form (y = mx + b).\nPoints: (2, 13), (4, 19), (6, 25), (8, 31)',
      given: 'Table points: (2, 13), (4, 19), (6, 25), (8, 31)',
      strategy:
        'Step 1: Calculate slope m = Δy / Δx using two points. Step 2: Use slope m and one point (x, y) to solve for y-intercept b in y = mx + b (or work backwards to x = 0). Step 3: Write y = mx + b.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate the slope (rate of change)',
          explanation:
            'Select two points: (2, 13) and (4, 19). Apply the slope formula:',
          mathDetail: 'm = (19 − 13) / (4 − 2) = 6 / 2 = 3\nRate of change: m = 3',
        },
        {
          stepNumber: 2,
          title: 'Method A: Find the initial value by solving for b',
          explanation:
            'Substitute m = 3 and point (2, 13) into the slope-intercept equation y = mx + b:',
          mathDetail: '13 = 3(2) + b\n13 = 6 + b\nb = 13 − 6 = 7',
        },
        {
          stepNumber: 3,
          title: 'Method B: Verify by working backward in the table to x = 0',
          explanation:
            'Since x increases by 2 and y increases by 6, subtract 2 from x and subtract 6 from y to reach x = 0:',
          mathDetail: 'From (2, 13) ➔ subtract 2 from x, subtract 6 from y:\n(2 − 2, 13 − 6) = (0, 7) ✔ Initial value b = 7',
        },
        {
          stepNumber: 4,
          title: 'Write the linear function equation',
          explanation:
            'Combine slope m = 3 and y-intercept b = 7 into y = mx + b.',
          mathDetail: 'y = 3x + 7',
        },
      ],
      conclusion:
        'The slope is 3, the initial value is 7 (point (0, 7)), and the equation of the function is y = 3x + 7.',
      teacherTip:
        'Always check the equation with a point not used in the calculation! For (6, 25): 3(6) + 7 = 18 + 7 = 25. Confirmed!',
      commonMistake:
        'Mistaking the first row in the table (2, 13) for the initial value. The initial value MUST be the y-value when x = 0!',
    },
    {
      id: 'ex-8-compare-table-equation',
      title: 'Example 8: Comparing a Table with an Equation',
      problem:
        'Two lawn mowing services offer seasonal plans. Mower A’s charges are given in the table below. Mower B’s total charge is represented by the equation C = 22h + 15, where h is hours worked.\nTable for Mower A: (1, 35), (3, 85), (5, 135), (7, 185)\nCompare their rates of change and initial values, and determine which service is cheaper for a 4-hour job.',
      given:
        'Mower A (table): (1, 35), (3, 85), (5, 135), (7, 185)\nMower B (equation): C = 22h + 15',
      strategy:
        'Find Mower A’s rate of change and initial value from the table. Compare with Mower B’s slope (22) and initial value (15). Then substitute h = 4 into both functions.',
      steps: [
        {
          stepNumber: 1,
          title: 'Find Mower A’s slope and equation',
          explanation:
            'Compute rate of change from (1, 35) and (3, 85):\nm = (85 − 35)/(3 − 1) = 50/2 = $25/hour.\nFind initial value b: 35 = 25(1) + b ➔ b = $10.\nEquation for Mower A: C = 25h + 10.',
          mathDetail: 'Mower A: Rate of change = $25/hr  |  Initial fee = $10',
        },
        {
          stepNumber: 2,
          title: 'Identify Mower B’s slope and initial value',
          explanation:
            'From the equation C = 22h + 15:\nSlope m = 22 ($22/hour)\nInitial value b = 15 ($15 upfront equipment fee).',
          mathDetail: 'Mower B: Rate of change = $22/hr  |  Initial fee = $15',
        },
        {
          stepNumber: 3,
          title: 'Compare rates and initial values',
          explanation:
            '• Rate of change: Mower A ($25/hr) > Mower B ($22/hr). Mower A charges $3 more per hour.\n• Initial value: Mower B ($15) > Mower A ($10). Mower B has a $5 higher upfront fee.',
          mathDetail: 'Rates: 25 vs 22  |  Initial values: 10 vs 15',
        },
        {
          stepNumber: 4,
          title: 'Evaluate costs at h = 4 hours',
          explanation:
            'Substitute h = 4 into each function:\n• Mower A: C = 25(4) + 10 = 100 + 10 = $110\n• Mower B: C = 22(4) + 15 = 88 + 15 = $103',
          mathDetail: 'Mower A at 4 hrs = $110\nMower B at 4 hrs = $103\nDifference = $110 − $103 = $7 savings with Mower B.',
        },
      ],
      conclusion:
        'Mower A has a higher rate of change ($25/hr vs $22/hr) but a lower initial fee ($10 vs $15). For a 4-hour job, Mower B is cheaper ($103 vs $110).',
      teacherTip:
        'Have students find the break-even point: 25h + 10 = 22h + 15 ➔ 3h = 5 ➔ h = 1.67 hours. For jobs under 1.67 hours, Mower A is cheaper; for jobs over 1.67 hours, Mower B is cheaper!',
      commonMistake:
        'Only comparing initial fees and assuming Mower A is always cheaper because its fee ($10) is lower.',
    },
    {
      id: 'ex-9-compare-graph-verbal',
      title: 'Example 9: Comparing a Graph with a Verbal Description',
      problem:
        'Water Tank 1 is represented on a graph with a line passing through (0, 180) and (4, 100), where x is time in minutes and y is gallons remaining. Water Tank 2 is described verbally: "Tank 2 starts with 210 gallons of water and drains at a constant rate of 25 gallons per minute."\nWhich tank starts with more water, which tank drains faster, and how much water is in each tank after 5 minutes?',
      given:
        'Tank 1 (graph): Line through (0, 180) and (4, 100)\nTank 2 (verbal): Initial volume = 210 gallons, draining rate = 25 gal/min',
      strategy:
        'Find the initial value and negative rate of change for Tank 1 from the graph. Compare them with Tank 2’s verbal parameters, and calculate the volume of both tanks at x = 5 minutes.',
      steps: [
        {
          stepNumber: 1,
          title: 'Determine Tank 1’s equation from the graph',
          explanation:
            '• Initial value at x = 0 is 180 gallons (y-intercept b = 180).\n• Rate of change: m = (100 − 180)/(4 − 0) = −80/4 = −20 gallons per minute (drains 20 gal/min).\n• Equation: y = −20x + 180.',
          mathDetail: 'Tank 1: Initial volume = 180 gal  |  Draining rate = 20 gal/min',
        },
        {
          stepNumber: 2,
          title: 'Analyze Tank 2 from the verbal description',
          explanation:
            '• Initial volume is 210 gallons (y-intercept b = 210).\n• Draining rate is 25 gallons per minute (slope m = −25).\n• Equation: y = −25x + 210.',
          mathDetail: 'Tank 2: Initial volume = 210 gal  |  Draining rate = 25 gal/min',
        },
        {
          stepNumber: 3,
          title: 'Compare initial volumes and draining speeds',
          explanation:
            '• Starting Volume: Tank 2 (210 gal) > Tank 1 (180 gal). Tank 2 starts with 30 more gallons.\n• Draining Speed: Compare |m|: |−25| = 25 gal/min and |−20| = 20 gal/min. Tank 2 drains faster than Tank 1 because 25 > 20.',
          mathDetail: 'Tank 2 starts with more water and drains faster (|−25| > |−20|).',
        },
        {
          stepNumber: 4,
          title: 'Calculate volumes at x = 5 minutes',
          explanation:
            'Substitute x = 5 into both equations:\n• Tank 1: y = −20(5) + 180 = −100 + 180 = 80 gallons\n• Tank 2: y = −25(5) + 210 = −125 + 210 = 85 gallons',
          mathDetail: 'At 5 minutes:\nTank 1 has 80 gallons\nTank 2 has 85 gallons\nTank 2 still has 5 more gallons than Tank 1.',
        },
      ],
      conclusion:
        'Tank 2 starts with more water (210 gal vs 180 gal) and drains faster (25 gal/min vs 20 gal/min). After 5 minutes, Tank 2 has 85 gallons and Tank 1 has 80 gallons.',
      teacherTip:
        'Point out that even though Tank 2 drains faster, it still has more water at 5 minutes because of its higher starting amount. Ask students: "When will Tank 1 overtake Tank 2?" (−20x + 180 = −25x + 210 ➔ 5x = 30 ➔ x = 6 minutes!).',
      commonMistake:
        'Forgetting that "draining" means negative slope in the linear equation (y = −20x + 180).',
    },
  ],
  videoLesson: {
    title: 'Video Library: Identifying & Understanding Functions',
    subtitle: 'Teacher-Selected Instructional Videos for Grade 8 Mathematics (TEKS 8.5G)',
    instructor: 'Mr. Edgar Pinilla · Grade 8 Mathematics',
    duration: '3 Video Lessons',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/aeWeL_4ecBw?autoplay=0',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=aeWeL_4ecBw',
    description:
      'Explore three teacher-selected video lessons covering TEKS 8.5G. Master the definition of a function, test relations across tables, mappings, and ordered pairs, and apply the vertical line test to graphs.',
    keyTakeaways: [
      'A function is a relation where each input is assigned to exactly one output. One input cannot have multiple outputs.',
      'On coordinate graphs, use the vertical line test: if any vertical line intersects more than one point, the relation is not a function.',
      'In tables, mappings, and ordered pairs, check whether any input value repeats with different output values.',
    ],
    lessons: [
      {
        id: 'lesson-8-1-identifying-functions-numberninja',
        title: 'Identifying Functions',
        subtitle: 'Identifying Functions from Tables, Graphs & Ordered Pairs | numberninja',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/aeWeL_4ecBw?autoplay=0',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=aeWeL_4ecBw',
        description:
          'Learn how to determine whether a mathematical relation represents a function from tables, graphs, and ordered pairs using the rule that every input must have exactly one output.',
        badge: 'numberninja',
      },
      {
        id: 'lesson-8-2-function-or-not-monica-clifton',
        title: 'Function or not a function',
        subtitle: 'Determining Functions Across Multiple Representations | Monica Clifton',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/xSQFPbhT4Yc?autoplay=0',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=xSQFPbhT4Yc',
        description:
          'Step-by-step walkthrough testing whether relations are functions across tables, coordinate graphs, mapping diagrams, and sets of points.',
        badge: 'Monica Clifton',
      },
      {
        id: 'lesson-8-3-what-are-functions-math-antics',
        title: 'Algebra Basics: What Are Functions?',
        subtitle: 'Algebra Basics: What Are Functions? | Math Antics',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/52tpYl2tTqk?autoplay=0',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=52tpYl2tTqk',
        description:
          'Join Math Antics to understand the fundamental definition of a function. Learn about input sets (domain), output sets (range), function tables, equations, and how the vertical line test works on graphs.',
        badge: 'Math Antics',
      },
    ],
  },
  practiceApp: {
    buttonText: 'Launch Functions Practice Lab',
    appTitle: 'Functions Practice Lab',
    placeholderUrl: 'https://functions-practice-lab.edgarpinilla.workers.dev',
    appDescription:
      'Practice functions across seven comprehensive interactive sections: Mapping Diagrams, Ordered Pairs, Tables (including four-choice visual tables), Graphs (with a movable vertical line test and retained Function Explorer), Word Problems (hourly earnings, registration fees, decreasing balances, and fuel rates), Comparing Functions (all four multi-representation types with step-by-step workflow), and Function or Not? (visual graph classification across ten curves with 1:1 aspect ratio grid).',
    features: [
      '1. Mapping Diagrams: Interactive relation testing with arrow counting and mathematical justifications',
      '2. Ordered Pairs: Functions vs. nonfunctions with fractional coordinates, duplicate pairs, and conflict identification',
      '3. Tables: Missing outputs, rate of change Δy/Δx with unequal intervals, initial value b, and 4-choice visual tables',
      '4. Graphs & Explorer: Movable vertical line test, discrete vs. continuous data, nonlinear curves, and synchronized slope/intercept explorer',
      '5. Word Problems: Real-world modeling of earnings, lesson fees, decreasing balances, and fuel consumption',
      '6. Comparing Functions: Step-by-step multi-representation comparisons covering all four types (Table vs. Graph, Table vs. Equation, Graph vs. Verbal, Equation vs. Verbal)',
      '7. Function or Not?: Visual graph classification across 10 mixed curves with movable vertical line test, 1:1 aspect ratio, and intersection highlighting',
      '18-Question Self-Check: Three progressive rounds of 6 questions with immediate pedagogical feedback and attempt tracking',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: UNIT_8_SELF_CHECK_QUESTIONS.map((q) => ({
      id: q.id,
      question: q.prompt,
      context: q.section,
      category: q.category,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      hint: q.hint,
      tableData: q.tableData,
      mappingData: q.mappingData,
      vltGraphOptions: q.vltGraphOptions,
      carAGraphData: q.carAGraphData,
      tableOptions: q.tableOptions,
    })) as PracticeQuestion[],
  },
};
