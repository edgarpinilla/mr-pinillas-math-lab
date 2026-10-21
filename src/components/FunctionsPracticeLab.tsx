import React, { useState, useRef } from 'react';
import {
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  Layers,
  HelpCircle,
  Scale,
  Equal,
  Table as TableIcon,
  Compass,
  FileText,
  Lightbulb,
  MousePointer,
} from 'lucide-react';

export type LabSection =
  | 'mapping'
  | 'ordered-pairs'
  | 'tables'
  | 'graphs'
  | 'word-problems'
  | 'comparing'
  | 'function-or-not';

export const FunctionsPracticeLab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LabSection>('mapping');

  // ===========================================================================
  // SECTION 1: MAPPING DIAGRAMS STATE
  // ===========================================================================
  const [mappingCaseIdx, setMappingCaseIdx] = useState<number>(0);
  const [mappingStep, setMappingStep] = useState<'classify' | 'reason'>('classify');
  const [mappingClassChoice, setMappingClassChoice] = useState<'function' | 'not-function' | null>(null);
  const [mappingReasonChoice, setMappingReasonChoice] = useState<number | null>(null);
  const [mappingFeedback, setMappingFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [mappingQuestionAttempts, setMappingQuestionAttempts] = useState<number>(0);

  const MAPPING_CASES = [
    {
      id: 'map-case-1',
      title: 'Mapping Diagram 1',
      inputs: [-3, 0, 2, 5],
      outputs: [1, 4, 7, 10],
      arrows: [
        [-3, 1],
        [0, 4],
        [2, 7],
        [5, 10],
      ] as [number, number][],
      isFunction: true,
      reasons: [
        'Each input in the domain has exactly one departing arrow pointing to an output.',
        'The outputs increase by 3 each time.',
        'All domain and range values are integers.',
        'There are equal numbers of inputs and outputs.',
      ],
      correctReasonIdx: 0,
      hintClass: 'Examine how many arrows depart from each number in the domain (left oval).',
      hintReason: 'Focus on the definition: does any input branch into multiple outputs, or does each have exactly one assignment?',
      explanation:
        'This relation is a FUNCTION because every input {-3, 0, 2, 5} in the domain has exactly one departing arrow pointing to a unique output in the range. No input is paired with multiple outputs.',
    },
    {
      id: 'map-case-2',
      title: 'Mapping Diagram 2',
      inputs: [-2, 1, 3],
      outputs: [5, 9],
      arrows: [
        [-2, 5],
        [1, 5],
        [3, 9],
      ] as [number, number][],
      isFunction: true,
      reasons: [
        'Two arrows point to output 5, which is allowed because each input still has only one outgoing arrow.',
        'The outputs are both odd numbers.',
        'The domain has three elements and the range has two.',
        'Input 3 points to the largest output.',
      ],
      correctReasonIdx: 0,
      hintClass: 'Notice outputs can be shared. Check whether any single input value departs with two arrows.',
      hintReason: 'Recall that a function permits different inputs to arrive at the same output (like two students getting the same score).',
      explanation:
        'This relation is a FUNCTION. Different inputs (-2 and 1) point to the exact same output (5). This is completely valid in a function! It only fails if a single input points to two or more different outputs.',
    },
    {
      id: 'map-case-3',
      title: 'Mapping Diagram 3',
      inputs: [1, 4, 6],
      outputs: [2, 8, 12],
      arrows: [
        [1, 2],
        [4, 8],
        [4, 12],
        [6, 12],
      ] as [number, number][],
      isFunction: false,
      reasons: [
        'Input 4 has two departing arrows pointing to both 8 and 12, so one input has multiple outputs.',
        'Output 12 receives arrows from both 4 and 6.',
        'The domain does not include negative numbers.',
        'The range values are all multiples of 2.',
      ],
      correctReasonIdx: 0,
      hintClass: 'Inspect each input number on the left. Does any input have more than one departing arrow?',
      hintReason: 'Which input value branches out with two different arrows, violating the one-output rule?',
      explanation:
        'This relation is NOT A FUNCTION. Look at input 4 in the domain: two arrows depart from 4, pointing to both 8 and 12. Because one input is assigned to two different outputs, it violates the definition of a function.',
    },
    {
      id: 'map-case-4',
      title: 'Mapping Diagram 4',
      inputs: [-4, -1, 3, 7],
      outputs: [6],
      arrows: [
        [-4, 6],
        [-1, 6],
        [3, 6],
        [7, 6],
      ] as [number, number][],
      isFunction: true,
      reasons: [
        'Every input has exactly one departing arrow, even though they all point to the same output 6 (constant function).',
        'Output 6 is an even number.',
        'The range has only one value.',
        'All inputs are greater than -5.',
      ],
      correctReasonIdx: 0,
      hintClass: 'Look at each input value individually. Does any single input have more than one outgoing arrow?',
      hintReason: 'Can all inputs share the same output in a constant function? Check how many arrows leave each input.',
      explanation:
        'This relation is a FUNCTION (a constant function). Each distinct input {-4, -1, 3, 7} has exactly one outgoing arrow. In a function, all inputs are allowed to share the same output value.',
    },
  ];

  const currentMapping = MAPPING_CASES[mappingCaseIdx];

  const resetMappingInput = () => {
    setMappingStep('classify');
    setMappingClassChoice(null);
    setMappingReasonChoice(null);
    setMappingFeedback('idle');
    setMappingQuestionAttempts(0);
  };

  const handleCheckMappingClass = () => {
    setMappingQuestionAttempts((c) => c + 1);
    const expected = currentMapping.isFunction ? 'function' : 'not-function';
    if (mappingClassChoice === expected) {
      setMappingStep('reason');
      setMappingFeedback('idle');
    } else {
      setMappingFeedback('hint');
    }
  };

  const handleCheckMappingReason = () => {
    setMappingQuestionAttempts((c) => c + 1);
    if (mappingReasonChoice === currentMapping.correctReasonIdx) {
      setMappingFeedback('correct');
    } else {
      setMappingFeedback('hint');
    }
  };

  // ===========================================================================
  // SECTION 2: ORDERED PAIRS STATE
  // ===========================================================================
  const [pairsCaseIdx, setPairsCaseIdx] = useState<number>(0);
  const [pairsStep, setPairsStep] = useState<'classify' | 'identify'>('classify');
  const [pairsClassChoice, setPairsClassChoice] = useState<'function' | 'not-function' | null>(null);
  const [pairsIdentifyChoice, setPairsIdentifyChoice] = useState<number | null>(null);
  const [pairsFeedback, setPairsFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [pairsQuestionAttempts, setPairsQuestionAttempts] = useState<number>(0);

  const ORDERED_PAIRS_CASES = [
    {
      id: 'pairs-case-1',
      title: 'Set 1',
      pairsString: '{(-2.5, 3), (0, 0), (1.5, 4.5), (3, -2), (4.5, 3)}',
      pairs: [
        [-2.5, 3],
        [0, 0],
        [1.5, 4.5],
        [3, -2],
        [4.5, 3],
      ] as [number, number][],
      isFunction: true,
      hasConflict: false,
      reasonPrompt: 'Why does this set of coordinates represent a function?',
      reasonOptions: [
        'Every x-value is unique, and inputs -2.5 and 4.5 sharing output 3 is completely allowed.',
        'The relation passes through the origin (0, 0).',
        'All coordinates are positive decimals.',
        'The x-values are ordered from least to greatest.',
      ],
      correctReasonIdx: 0,
      conflictOptions: [] as string[],
      correctConflictIdx: -1,
      hintClass: 'Examine each x-coordinate: -2.5, 0, 1.5, 3, 4.5. Does any x-value appear more than once with different y-values?',
      hintReason: 'Recall that different inputs can share the same output (3) without violating the definition of a function.',
      explanation:
        'This relation IS A FUNCTION. Every x-value in {-2.5, 0, 1.5, 3, 4.5} is unique. Notice that two different inputs (-2.5 and 4.5) both produce the output 3; this is completely valid.',
    },
    {
      id: 'pairs-case-2',
      title: 'Set 2',
      pairsString: '{(1/2, 4), (2, -3), (1/2, 9), (5, 1)}',
      pairs: [
        [0.5, 4],
        [2, -3],
        [0.5, 9],
        [5, 1],
      ] as [number, number][],
      isFunction: false,
      hasConflict: true,
      conflictPrompt: 'Which pair of coordinates causes the conflict that makes this relation a nonfunction?',
      conflictOptions: [
        '(1/2, 4) and (1/2, 9)',
        '(2, -3) and (5, 1)',
        '(1/2, 4) and (2, -3)',
        '(1/2, 9) and (5, 1)',
      ],
      correctConflictIdx: 0,
      hintClass: 'Look closely at the fractional coordinate 1/2 in the set. Does it appear more than once?',
      hintConflict: 'Find the two points that share the exact same x-coordinate but have different y-coordinates.',
      explanation:
        'This relation is NOT A FUNCTION. The input x = 1/2 appears in both (1/2, 4) and (1/2, 9). Because the input 1/2 is assigned to two different outputs (4 and 9), it fails the function test.',
    },
    {
      id: 'pairs-case-3',
      title: 'Set 3',
      pairsString: '{(-3, 5), (0, -1), (2, 7), (-3, 5), (4, 11)}',
      pairs: [
        [-3, 5],
        [0, -1],
        [2, 7],
        [-3, 5],
        [4, 11],
      ] as [number, number][],
      isFunction: true,
      hasConflict: false,
      reasonPrompt: 'Why is this set still a function even though (-3, 5) is listed twice?',
      reasonOptions: [
        'Repeating an identical ordered pair states the same point and still assigns input -3 to only one output (5).',
        'Duplicate pairs automatically cancel each other out.',
        'Negative inputs do not count toward function tests.',
        'The y-values increase across the set.',
      ],
      correctReasonIdx: 0,
      conflictOptions: [] as string[],
      correctConflictIdx: -1,
      hintClass: 'Look at the two instances where x = -3. Do they assign DIFFERENT outputs, or the EXACT SAME output?',
      hintReason: 'Does re-stating the exact same point (-3, 5) assign input -3 to a conflicting output? Compare with the definition of a function.',
      explanation:
        'This relation IS A FUNCTION. The ordered pair (-3, 5) appears twice, but both times input -3 is paired with the exact same output 5. Repeating an identical point does not violate the definition of a function.',
    },
    {
      id: 'pairs-case-4',
      title: 'Set 4',
      pairsString: '{(0, 2), (3, -1), (0, -2), (4, 0), (6, 5)}',
      pairs: [
        [0, 2],
        [3, -1],
        [0, -2],
        [4, 0],
        [6, 5],
      ] as [number, number][],
      isFunction: false,
      hasConflict: true,
      conflictPrompt: 'Which pair of coordinates causes the conflict that makes this relation a nonfunction?',
      conflictOptions: [
        '(0, 2) and (0, -2)',
        '(3, -1) and (4, 0)',
        '(0, 2) and (4, 0)',
        '(0, -2) and (6, 5)',
      ],
      correctConflictIdx: 0,
      hintClass: 'Check the input x = 0. Does it have multiple assignments in this set?',
      hintConflict: 'Identify the two coordinates where x = 0 has two conflicting y-values on the y-axis.',
      explanation:
        'This relation is NOT A FUNCTION. When input x = 0 is checked, it is paired with both 2 and -2. Graphically, this corresponds to two points on the same vertical line (the y-axis), failing the vertical line test.',
    },
  ];

  const currentPairs = ORDERED_PAIRS_CASES[pairsCaseIdx];

  const resetPairsInput = () => {
    setPairsStep('classify');
    setPairsClassChoice(null);
    setPairsIdentifyChoice(null);
    setPairsFeedback('idle');
    setPairsQuestionAttempts(0);
  };

  const handleCheckPairsClass = () => {
    setPairsQuestionAttempts((c) => c + 1);
    const expected = currentPairs.isFunction ? 'function' : 'not-function';
    if (pairsClassChoice === expected) {
      setPairsStep('identify');
      setPairsFeedback('idle');
    } else {
      setPairsFeedback('hint');
    }
  };

  const handleCheckPairsIdentify = () => {
    setPairsQuestionAttempts((c) => c + 1);
    const expectedIdx = currentPairs.hasConflict
      ? currentPairs.correctConflictIdx
      : currentPairs.correctReasonIdx;
    if (pairsIdentifyChoice === expectedIdx) {
      setPairsFeedback('correct');
    } else {
      setPairsFeedback('hint');
    }
  };

  // ===========================================================================
  // SECTION 3: TABLES STATE
  // ===========================================================================
  const [tableCaseIdx, setTableCaseIdx] = useState<number>(0);
  const [tableAnswerChoice, setTableAnswerChoice] = useState<number | null>(null);
  const [tableFeedback, setTableFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [tableQuestionAttempts, setTableQuestionAttempts] = useState<number>(0);

  const TABLE_CASES = [
    {
      id: 'table-case-1',
      title: 'Table Analysis 1 — Function Classification',
      prompt: 'Examine the table below. Does this table represent a function, and why?',
      tableData: {
        headers: ['Input (x)', 'Output (y)'],
        rows: [
          [2, 7],
          [5, 14],
          [2, 7],
          [9, 21],
        ],
      },
      options: [
        'No, because the input value 2 appears in two different rows.',
        'Yes, because both rows with input 2 assign the identical output 7, so each input has exactly one output.',
        'No, because the output values are not all prime numbers.',
        'Yes, only because the y-values increase from top to bottom.',
      ],
      correctIdx: 1,
      hint: 'Inspect the two rows where x = 2. Do they give different outputs, or the exact same coordinate (2, 7)?',
      explanation:
        'This table represents a FUNCTION. The row (2, 7) appears twice, but it assigns the exact same output 7 both times. Repeating an identical row does not create a conflict or violate the definition of a function.',
    },
    {
      id: 'table-case-2',
      title: 'Table Analysis 2 — Missing Output & Rate of Change (Unequal Intervals)',
      prompt:
        'The table represents a linear relationship with a constant rate of change. Find the rate of change (Δy / Δx), the missing output y when x = 8, and the initial value b.',
      tableData: {
        headers: ['x', 'y'],
        rows: [
          [2, 7],
          [5, 16],
          [8, '?'],
          [12, 37],
        ],
      },
      options: [
        'Rate of change = 3, missing output at x = 8 is 25, initial value b = 1 (equation y = 3x + 1).',
        'Rate of change = 9, missing output at x = 8 is 20, initial value b = 7.',
        'Rate of change = 2.5, missing output at x = 8 is 24, initial value b = 2.',
        'Rate of change = 3, missing output at x = 8 is 27, initial value b = 0.',
      ],
      correctIdx: 0,
      hint: 'Calculate Δy / Δx between (2, 7) and (5, 16): (16 − 7)/(5 − 2). Then use that rate of change to find y when x = 8.',
      explanation:
        '1. Rate of change: m = Δy / Δx = (16 − 7)/(5 − 2) = 9/3 = 3.\n2. When x = 8: y = 16 + 3(8 − 5) = 16 + 9 = 25. Check with (12, 37): 25 + 3(12 − 8) = 25 + 12 = 37. ✔\n3. Initial value: b = y − mx = 7 − 3(2) = 1. Equation is y = 3x + 1.',
    },
    {
      id: 'table-case-3',
      title: 'Table Analysis 3 — Proportional vs. Nonproportional & Linear vs. Nonlinear',
      prompt:
        'Two relationships are shown in the tables below. Both pass through (0, 0). Which statement correctly compares and classifies them?',
      comparisonTables: [
        {
          name: 'Table A',
          headers: ['x', 'y'],
          rows: [
            [0, 0],
            [2, 8],
            [4, 16],
            [6, 24],
          ],
        },
        {
          name: 'Table B',
          headers: ['x', 'y'],
          rows: [
            [0, 0],
            [1, 1],
            [2, 4],
            [3, 9],
          ],
        },
      ],
      options: [
        'Both tables represent proportional linear relationships because both contain (0, 0).',
        'Table A is proportional linear (y = 4x) because Δy/Δx is a constant 4; Table B is a nonlinear function (y = x²) because its rate of change is not constant.',
        'Table B is proportional linear because the y-values are perfect squares.',
        'Neither table represents a function because (0, 0) is not allowed in a function.',
      ],
      correctIdx: 1,
      hint: 'Passing through (0, 0) is required for proportionality, but the relationship must ALSO have a constant rate of change. Check Δy/Δx for both tables.',
      explanation:
        'In Table A: Δy / Δx = 8/2 = 4 everywhere, and ratio y/x = 4 at every point, making it a proportional linear relationship (y = 4x). In Table B: Δy / Δx changes (1/1 = 1, then 3/1 = 3, then 5/1 = 5), so even though it passes through (0, 0), it is a nonlinear function (y = x²). Passing through the origin alone is not enough to be proportional!',
    },
    {
      id: 'table-case-4',
      title: 'Table Analysis 4 — Four Visual Choice Tables',
      prompt:
        'Which of the four tables below represents a linear function with a constant negative rate of change?',
      fourChoiceTables: [
        {
          label: 'Table A',
          headers: ['x', 'y'],
          rows: [
            [2, 5],
            [4, 9],
            [2, 12],
            [6, 15],
          ],
        },
        {
          label: 'Table B',
          headers: ['x', 'y'],
          rows: [
            [0, 14],
            [3, 8],
            [6, 2],
            [9, -4],
          ],
        },
        {
          label: 'Table C',
          headers: ['x', 'y'],
          rows: [
            [5, -2],
            [5, 1],
            [5, 4],
            [5, 7],
          ],
        },
        {
          label: 'Table D',
          headers: ['x', 'y'],
          rows: [
            [1, 1],
            [2, 4],
            [3, 9],
            [4, 16],
          ],
        },
      ],
      options: [
        'Table A: (x: 2, y: 5), (x: 4, y: 9), (x: 2, y: 12), (x: 6, y: 15)',
        'Table B: (x: 0, y: 14), (x: 3, y: 8), (x: 6, y: 2), (x: 9, y: -4)',
        'Table C: (x: 5, y: -2), (x: 5, y: 1), (x: 5, y: 4), (x: 5, y: 7)',
        'Table D: (x: 1, y: 1), (x: 2, y: 4), (x: 3, y: 9), (x: 4, y: 16)',
      ],
      correctIdx: 1,
      hint: 'First ensure the table is a valid function (no repeating x with different y). Then check that Δy/Δx is negative and constant across intervals.',
      explanation:
        'Table B is a LINEAR FUNCTION with a constant negative rate of change:\n• Rate of change: (8 − 14)/(3 − 0) = −6/3 = −2. Between all consecutive rows, Δy/Δx = −2.\n• In Table A: input 2 pairs with both 5 and 12 (not a function).\n• In Table C: input 5 has four different outputs (vertical line, not a function).\n• In Table D: Δy/Δx changes (3, 5, 7), so it is nonlinear.',
    },
  ];

  const currentTableCase = TABLE_CASES[tableCaseIdx];

  const resetTableInput = () => {
    setTableAnswerChoice(null);
    setTableFeedback('idle');
    setTableQuestionAttempts(0);
  };

  const handleCheckTableAnswer = () => {
    setTableQuestionAttempts((c) => c + 1);
    if (tableAnswerChoice === currentTableCase.correctIdx) {
      setTableFeedback('correct');
    } else {
      setTableFeedback('hint');
    }
  };

  // ===========================================================================
  // SECTION 4: GRAPHS & FUNCTION EXPLORER STATE
  // ===========================================================================
  const [graphSubTab, setGraphSubTab] = useState<'practice' | 'explorer'>('practice');
  const [graphCaseIdx, setGraphCaseIdx] = useState<number>(0);
  const [graphVltSliderX, setGraphVltSliderX] = useState<number>(2);
  const [graphAnswerChoice, setGraphAnswerChoice] = useState<number | null>(null);
  const [graphFeedback, setGraphFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [graphQuestionAttempts, setGraphQuestionAttempts] = useState<number>(0);

  // Retained Function Explorer Controls
  const [explorerSlope, setExplorerSlope] = useState<number>(2);
  const [explorerIntercept, setExplorerIntercept] = useState<number>(1);
  const [isNonlinearExplorer, setIsNonlinearExplorer] = useState<boolean>(false);

  const GRAPH_CASES = [
    {
      id: 'graph-case-1',
      title: 'Graph Practice 1 — Discrete Data Points',
      description: 'Plotted points: {(-4, 2), (-1, -3), (0, 1), (2, 4), (5, -1)}. Intermediate values are not connected because the data is discrete.',
      type: 'discrete',
      points: [
        [-4, 2],
        [-1, -3],
        [0, 1],
        [2, 4],
        [5, -1],
      ] as [number, number][],
      prompt:
        'Use the movable vertical line test. Does this discrete relation represent y as a function of x, and why?',
      options: [
        'Yes, because no vertical line intersects more than one point anywhere on the grid.',
        'No, because the points are not connected by a continuous straight line.',
        'No, because two points share the y-value of -1.',
        'Yes, only because there is a point located at the origin (0, 0).',
      ],
      correctIdx: 0,
      hint: 'Move the vertical line slider across x = -4, -1, 0, 2, and 5. Does the vertical line ever touch two points at the same time?',
      explanation:
        'This discrete relation IS A FUNCTION. As you move the vertical line across the entire grid, it touches at most one point at any vertical position. Different points (like (-1, -3) and (5, -1) having y = -1) sharing an output is completely allowed. Discrete points should not be connected unless intermediate values have physical meaning.',
    },
    {
      id: 'graph-case-2',
      title: 'Graph Practice 2 — Discrete Points with Vertical Conflict',
      description: 'Plotted points: {(-3, 4), (-1, 2), (2, -1), (2, 5), (4, 3)}. Test each x-position with the vertical line.',
      type: 'discrete',
      points: [
        [-3, 4],
        [-1, 2],
        [2, -1],
        [2, 5],
        [4, 3],
      ] as [number, number][],
      prompt:
        'At which x-value does this relation fail the Vertical Line Test, proving it is NOT a function?',
      options: [
        'At x = 2, because the vertical line intersects both (2, -1) and (2, 5).',
        'At x = -3, because the y-value is positive.',
        'At x = 0, because there is no point on the y-axis.',
        'At x = 4, because it is the largest positive x-value.',
      ],
      correctIdx: 0,
      hint: 'Slide the vertical line to x = 2. Notice how many plotted points lie directly on that vertical line.',
      explanation:
        'This relation is NOT A FUNCTION. At x = 2, a vertical line passes through two distinct points: (2, -1) and (2, 5). Because a single input value (2) produces two different output values (-1 and 5), it fails the vertical line test.',
    },
    {
      id: 'graph-case-3',
      title: 'Graph Practice 3 — Continuous Line: Slope & Intercept Interpretation',
      description: 'Continuous line passing through (0, 3) and (4, 11).',
      type: 'linear',
      lineEq: 'y = 2x + 3',
      points: [
        [0, 3],
        [4, 11],
      ] as [number, number][],
      prompt:
        'Classify this graph and determine its slope (rate of change), initial value (y-intercept), and equation.',
      options: [
        'Linear function with slope m = 2, initial value b = 3, and equation y = 2x + 3.',
        'Nonlinear function with slope m = 3 and initial value b = 2.',
        'Proportional linear function with equation y = 3x.',
        'Nonfunction because it intersects the y-axis at a positive number.',
      ],
      correctIdx: 0,
      hint: 'Find the y-intercept where the line crosses the vertical axis at x = 0. Then calculate slope: (11 − 3)/(4 − 0).',
      explanation:
        '1. Function test: Every vertical line crosses the line at exactly one point, so it is a function.\n2. Initial value: Crosses the y-axis at (0, 3), so b = 3.\n3. Slope: m = (y₂ − y₁)/(x₂ − x₁) = (11 − 3)/(4 − 0) = 8/4 = 2.\n4. Equation: y = 2x + 3. Because b ≠ 0, it is a nonproportional linear function.',
    },
    {
      id: 'graph-case-4',
      title: 'Graph Practice 4 — Nonlinear Parabola Curve',
      description: 'Quadratic curve y = 0.5x² - 2 opening upward with vertex at (0, -2).',
      type: 'parabola',
      prompt:
        'Use the movable vertical line test. Which statement accurately classifies this curved relation?',
      options: [
        'It is a valid function, but it is nonlinear because its graph is curved and its rate of change is not constant.',
        'It is NOT a function because curves cannot be functions.',
        'It is a proportional linear function because it has a line of symmetry along the y-axis.',
        'It fails the vertical line test because it touches the x-axis twice.',
      ],
      correctIdx: 0,
      hint: 'Drag the vertical line across the entire curve. Does any single vertical line cross the curve twice? Does it have a straight constant slope?',
      explanation:
        'This curve IS A FUNCTION, but it is NONLINEAR. Every vertical line intersects the parabola at most once, so it passes the vertical line test. However, its rate of change varies across intervals, producing a smooth curve rather than a straight line. A relation does NOT need to be a straight line to be a function!',
    },
  ];

  const currentGraphCase = GRAPH_CASES[graphCaseIdx];

  const resetGraphInput = () => {
    setGraphAnswerChoice(null);
    setGraphFeedback('idle');
    setGraphQuestionAttempts(0);
  };

  const handleCheckGraphAnswer = () => {
    setGraphQuestionAttempts((c) => c + 1);
    if (graphAnswerChoice === currentGraphCase.correctIdx) {
      setGraphFeedback('correct');
    } else {
      setGraphFeedback('hint');
    }
  };

  // ===========================================================================
  // SECTION 5: WORD PROBLEMS STATE
  // ===========================================================================
  const [wordCaseIdx, setWordCaseIdx] = useState<number>(0);
  const [wordAnswerChoice, setWordAnswerChoice] = useState<number | null>(null);
  const [wordFeedback, setWordFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [wordQuestionAttempts, setWordQuestionAttempts] = useState<number>(0);

  const WORD_CASES = [
    {
      id: 'word-case-1',
      title: 'Problem 1: Hourly Earnings',
      category: 'Hourly Earnings (Proportional)',
      scenario:
        'Maya works as a community pool lifeguard. She earns $16.50 per hour. She wants to model her total earnings E based on the number of hours t she works in a month.',
      prompt:
        'Identify the input/output quantities, select the equation modeling her earnings, classify the relationship, and calculate her earnings for 24 hours of work.',
      options: [
        'Input: hours worked t; Output: total earnings E; Equation: E = 16.50t; Proportional linear relationship; Earnings for 24 hours: $396.00.',
        'Input: total earnings E; Output: hours worked t; Equation: E = 24t + 16.50; Nonproportional linear; Earnings for 24 hours: $412.50.',
        'Input: hours worked t; Output: hourly rate; Equation: E = 16.50 + t; Proportional; Earnings for 24 hours: $40.50.',
        'Input: hours worked t; Output: total earnings E; Equation: E = 16.50t; Nonproportional linear because earnings exceed $100.',
      ],
      correctIdx: 0,
      hint: 'The independent input is hours worked t, and the dependent output is total earnings E. Since there is no starting fee, b = 0 (proportional: y = kx). Multiply 16.50 × 24.',
      explanation:
        '1. Variables: Input is hours t, Output is earnings E in dollars.\n2. Equation: E = 16.50t.\n3. Classification: Proportional linear because b = 0 and passes through (0, 0).\n4. Calculation for t = 24 hours: E = 16.50(24) = $396.00.',
    },
    {
      id: 'word-case-2',
      title: 'Problem 2: Music Academy Lessons',
      category: 'Registration Fee + Cost per Lesson (Nonproportional)',
      scenario:
        'SoundWave Music Academy charges a one-time nonrefundable registration fee of $45 plus $30 per private piano lesson. Let n represent the number of lessons and C represent the total cost.',
      prompt:
        'Interpret the slope and initial value in context, write the equation, classify the model, and determine the total cost for 8 lessons.',
      options: [
        'Slope = $30/lesson (rate per lesson), Initial value = $45 (upfront registration fee); Equation: C = 30n + 45; Nonproportional linear; Total cost for 8 lessons: $285.',
        'Slope = $45/lesson, Initial value = $30; Equation: C = 45n + 30; Proportional linear; Total cost for 8 lessons: $390.',
        'Slope = $30/lesson, Initial value = $45; Equation: C = 30n + 45; Proportional linear because the rate is constant; Total cost: $240.',
        'Slope = $75/lesson, Initial value = $0; Equation: C = 75n; Nonproportional; Total cost: $600.',
      ],
      correctIdx: 0,
      hint: 'The slope is the cost per lesson ($30), while the initial value b is the upfront registration fee ($45) paid before any lessons are taken. Evaluate C = 30(8) + 45.',
      explanation:
        '1. Slope m = 30: Cost per lesson is $30.\n2. Initial value b = 45: One-time registration fee when n = 0 is $45.\n3. Equation: C = 30n + 45.\n4. Classification: Nonproportional linear because the y-intercept b = 45 ≠ 0.\n5. Calculation for n = 8: C = 30(8) + 45 = 240 + 45 = $285.',
    },
    {
      id: 'word-case-3',
      title: 'Problem 3: Laptop Purchase & Decreasing Balance',
      category: 'Decreasing Balance Model (Distinguishing Paid vs. Balance Remaining)',
      scenario:
        'Marcus purchases a laptop computer with a sticker price of $900. He makes a $150 down payment at the time of purchase. He agrees to pay off the remaining balance by paying $50 each month until the computer is completely paid off.',
      prompt:
        'What is the initial balance remaining immediately after the down payment? Write an equation for the balance remaining B after m months, calculate the balance after 6 months, and find the number of months required to reach a balance of $0.',
      options: [
        'Initial balance remaining = $750; Equation: B = -50m + 750; Balance after 6 months = $450; Fully paid off in 15 months (meaningful domain: 0 ≤ m ≤ 15).',
        'Initial balance remaining = $900; Equation: B = 50m + 900; Balance after 6 months = $1,200; Fully paid off in 18 months.',
        'Initial balance remaining = $150; Equation: B = -50m + 150; Balance after 6 months = -$150; Fully paid off in 3 months.',
        'Initial balance remaining = $750; Equation: B = 50m - 750; Balance after 6 months = -$450; Fully paid off in 20 months.',
      ],
      correctIdx: 0,
      hint: 'Subtract the down payment from the purchase price: $900 − $150 = $750 initial balance. Because payments reduce the balance, the rate of change is −$50 per month. Solve −50m + 750 = 0.',
      explanation:
        '1. Initial balance: Purchase price $900 minus $150 down payment = $750 initial balance remaining at m = 0.\n2. Equation for balance remaining: Payments reduce debt, so slope is negative: B = −50m + 750.\n3. Balance at 6 months: B = −50(6) + 750 = −300 + 750 = $450.\n4. Zero balance: 0 = −50m + 750 ➔ 50m = 750 ➔ m = 15 months. The realistic domain is 0 ≤ m ≤ 15.',
    },
    {
      id: 'word-case-4',
      title: 'Problem 4: Road Trip Fuel Consumption',
      category: 'Distance, Fuel Consumption & Rates',
      scenario:
        'A family starts a highway road trip with a full 18-gallon fuel tank. Their vehicle burns fuel at a constant rate of 0.04 gallons per mile driven. Let d represent miles driven and g represent gallons of fuel remaining in the tank.',
      prompt:
        'Interpret the slope and initial value, determine fuel remaining after driving 250 miles, and find the maximum distance the vehicle can travel on one full tank.',
      options: [
        'Slope = -0.04 gal/mile (rate of fuel consumption), Initial value = 18 gallons; Fuel remaining after 250 miles = 8.0 gallons; Maximum range on one tank = 450 miles.',
        'Slope = 0.04 gal/mile, Initial value = 18 gallons; Fuel remaining after 250 miles = 28.0 gallons; Maximum range = 500 miles.',
        'Slope = -18 gal/mile, Initial value = 0.04 gallons; Fuel remaining after 250 miles = 4.5 gallons; Maximum range = 400 miles.',
        'Slope = -0.04 gal/mile, Initial value = 18 gallons; Fuel remaining after 250 miles = 10.0 gallons; Maximum range = 350 miles.',
      ],
      correctIdx: 0,
      hint: 'The fuel burns, so slope is −0.04. The full tank starts at 18 gallons. Evaluate g = −0.04(250) + 18, and solve 0 = −0.04d + 18.',
      explanation:
        '1. Slope m = −0.04: Fuel level decreases by 0.04 gallons for each mile driven.\n2. Initial value b = 18: Full tank contains 18 gallons at 0 miles.\n3. Fuel at 250 miles: g = −0.04(250) + 18 = −10 + 18 = 8 gallons remaining.\n4. Maximum range: Set g = 0: 0 = −0.04d + 18 ➔ 0.04d = 18 ➔ d = 18 / 0.04 = 450 miles.',
    },
  ];

  const currentWordCase = WORD_CASES[wordCaseIdx];

  const resetWordInput = () => {
    setWordAnswerChoice(null);
    setWordFeedback('idle');
    setWordQuestionAttempts(0);
  };

  const handleCheckWordAnswer = () => {
    setWordQuestionAttempts((c) => c + 1);
    if (wordAnswerChoice === currentWordCase.correctIdx) {
      setWordFeedback('correct');
    } else {
      setWordFeedback('hint');
    }
  };

  // ===========================================================================
  // SECTION 6: COMPARING FUNCTIONS STATE (STEP-BY-STEP WORKFLOW)
  // ===========================================================================
  const [compareType, setCompareType] = useState<'type-a' | 'type-b' | 'type-c' | 'type-d'>('type-a');
  const [compareStepIdx, setCompareStepIdx] = useState<number>(0);
  const [compareStepAnswer, setCompareStepAnswer] = useState<number | null>(null);
  const [compareStepFeedback, setCompareStepFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [compareQuestionAttempts, setCompareQuestionAttempts] = useState<number>(0);

  interface CompareStepDef {
    stepTitle: string;
    question: string;
    options: string[];
    correctIdx: number;
    hint: string;
    explanation: string;
  }

  interface CompareScenarioDef {
    typeId: 'type-a' | 'type-b' | 'type-c' | 'type-d';
    title: string;
    topicName: string;
    leadPrompt: string;
    fn1Name: string;
    fn1Type: 'table' | 'graph' | 'equation';
    fn1Data?: { headers: [string, string]; rows: [number, number][] };
    fn1Equation?: string;
    fn1GraphType?: 'typing' | 'flexgym';
    fn2Name: string;
    fn2Type: 'table' | 'graph' | 'equation' | 'verbal';
    fn2GraphType?: 'typing' | 'flexgym';
    fn2Equation?: string;
    fn2Text?: string;
    steps: CompareStepDef[];
  }

  const COMPARE_SCENARIOS_DATA: Record<'type-a' | 'type-b' | 'type-c' | 'type-d', CompareScenarioDef> = {
    'type-a': {
      typeId: 'type-a',
      title: 'Type A: Table vs. Graph',
      topicName: 'Typing Rates (Words per Minute)',
      leadPrompt:
        'Determine both typists’ rates of change and initial values, calculate their total outputs after 8 minutes, and determine who is faster and by how many words.',
      fn1Name: 'Typist A (Table)',
      fn1Type: 'table',
      fn1Data: {
        headers: ['Time (min, t)', 'Words Typed (w)'],
        rows: [
          [2, 90],
          [4, 180],
          [6, 270],
        ],
      },
      fn2Name: 'Typist B (Graph)',
      fn2Type: 'graph',
      fn2GraphType: 'typing',
      steps: [
        {
          stepTitle: 'Step 1: Rates of Change (with units)',
          question: 'What are the rates of change for Typist A and Typist B?',
          options: [
            'Typist A = 90 words/min; Typist B = 165 words/min',
            'Typist A = 45 words/min; Typist B = 55 words/min',
            'Typist A = 45 words/min; Typist B = 45 words/min',
            'Typist A = 55 words/min; Typist B = 45 words/min',
          ],
          correctIdx: 1, // varied position
          hint: 'Use the slope formula: change in words divided by change in time (Δw / Δt). For Typist A, use two rows from the table. For Typist B, use the two plotted coordinates on the graph.',
          explanation:
            '• Typist A (table): Rate = (180 − 90)/(4 − 2) = 90/2 = 45 words per minute.\n• Typist B (graph): Rate = (165 − 0)/(3 − 0) = 55 words per minute.',
        },
        {
          stepTitle: 'Step 2: Initial Values',
          question: 'What are the initial values (words typed at t = 0) for both typists?',
          options: [
            'Typist A starts at 90 words; Typist B starts at 165 words.',
            'Typist A starts at 0 words; Typist B starts at 55 words.',
            'Both typists start at 0 words (b = 0), representing proportional relationships.',
            'Typist A starts at 45 words; Typist B starts at 0 words.',
          ],
          correctIdx: 2, // varied position
          hint: 'Find the starting output when time t = 0. For Typist B, identify the vertical intercept where the line crosses the w-axis.',
          explanation:
            'Both typists have an initial value of b = 0 words. At 0 minutes, 0 words are typed. Both functions have the proportional form w = kt.',
        },
        {
          stepTitle: 'Step 3: Output at Specified Input (t = 8 minutes)',
          question: 'How many words does each typist type in 8 minutes?',
          options: [
            'Typist A = 360 words; Typist B = 440 words',
            'Typist A = 440 words; Typist B = 360 words',
            'Typist A = 320 words; Typist B = 400 words',
            'Typist A = 720 words; Typist B = 880 words',
          ],
          correctIdx: 0, // varied position
          hint: 'Multiply each typist’s rate of change (words per minute) by the elapsed time of 8 minutes.',
          explanation:
            '• Typist A: w = 45(8) = 360 words.\n• Typist B: w = 55(8) = 440 words.',
        },
        {
          stepTitle: 'Step 4: Final Comparison & Conclusion',
          question: 'Which typist is faster, and how many more words does that typist produce in 8 minutes?',
          options: [
            'Typist A is faster by 10 words/min and produces 60 more words.',
            'Both typists produce the same number of words over 8 minutes.',
            'Typist B is faster by 10 words/min and produces 80 more words in 8 minutes.',
            'Typist B is faster by 20 words/min and produces 100 more words.',
          ],
          correctIdx: 2, // varied position
          hint: 'Compare the two rates of change to find who is faster and by how many words per minute. Then find the difference between their total 8-minute outputs.',
          explanation:
            'Typist B is faster by 55 − 45 = 10 words per minute. In 8 minutes, Typist B types 440 − 360 = 80 more words than Typist A.',
        },
      ],
    },
    'type-b': {
      typeId: 'type-b',
      title: 'Type B: Table vs. Equation',
      topicName: 'Music Download & Streaming Plans',
      leadPrompt:
        'Determine each plan’s rate of change per song and initial membership fee, calculate total costs at 20 songs, find the break-even song count, and determine which service is cheaper across each interval.',
      fn1Name: 'StreamMusic (Table)',
      fn1Type: 'table',
      fn1Data: {
        headers: ['Songs (s)', 'Total Cost ($)'],
        rows: [
          [0, 12],
          [10, 17],
          [20, 22],
          [30, 27],
        ],
      },
      fn2Name: 'MelodyPass (Equation)',
      fn2Type: 'equation',
      fn2Equation: 'C = 0.75s + 8',
      steps: [
        {
          stepTitle: 'Step 1: Rates of Change (Cost per song)',
          question: 'What is the rate of change per song downloaded for each service?',
          options: [
            'StreamMusic = $0.50 per song; MelodyPass = $0.75 per song',
            'StreamMusic = $5.00 per song; MelodyPass = $0.75 per song',
            'StreamMusic = $0.75 per song; MelodyPass = $0.50 per song',
            'StreamMusic = $1.70 per song; MelodyPass = $8.00 per song',
          ],
          correctIdx: 0,
          hint: 'For StreamMusic, calculate the rate of change using Δ(Cost) / Δ(Songs) from any two rows in the table. For MelodyPass, identify the coefficient of s in the cost equation.',
          explanation:
            '• StreamMusic (table): m = (17 − 12)/(10 − 0) = 5/10 = $0.50 per song.\n• MelodyPass (equation): m = $0.75 per song.',
        },
        {
          stepTitle: 'Step 2: Initial Values (Monthly Membership Fees)',
          question: 'What is the initial monthly membership fee (when songs s = 0) for each plan?',
          options: [
            'StreamMusic = $0; MelodyPass = $8',
            'StreamMusic = $12; MelodyPass = $8',
            'StreamMusic = $8; MelodyPass = $12',
            'StreamMusic = $17; MelodyPass = $0.75',
          ],
          correctIdx: 1,
          hint: 'For StreamMusic, check the cost when the number of songs is 0 in the table. For MelodyPass, identify the constant term b in the linear equation.',
          explanation:
            '• StreamMusic: At s = 0, cost is $12 (initial fee b = 12).\n• MelodyPass: In C = 0.75s + 8, the constant term is b = $8.',
        },
        {
          stepTitle: 'Step 3: Total Costs at s = 20 Songs',
          question: 'What is the total monthly cost for downloading 20 songs under each service?',
          options: [
            'StreamMusic = $20; MelodyPass = $20',
            'StreamMusic = $23; MelodyPass = $22',
            'StreamMusic = $22; MelodyPass = $23',
            'StreamMusic = $27; MelodyPass = $25',
          ],
          correctIdx: 2,
          hint: 'Find the cost corresponding to s = 20 in the StreamMusic table. For MelodyPass, substitute s = 20 into the equation and evaluate.',
          explanation:
            '• StreamMusic: from table at s = 20, C = $22.\n• MelodyPass: C = 0.75(20) + 8 = 15 + 8 = $23.\nStreamMusic is $1 cheaper at 20 songs.',
        },
        {
          stepTitle: 'Step 4: Break-Even Song Count',
          question: 'At what number of songs do both plans cost the exact same amount, and what is that cost?',
          options: [
            '12 songs, both costing $18',
            '16 songs, both costing $20',
            '20 songs, both costing $22',
            '24 songs, both costing $24',
          ],
          correctIdx: 1,
          hint: 'Write the cost equation for StreamMusic from its rate and starting fee, set it equal to the MelodyPass equation, and solve for s.',
          explanation:
            'Set the two cost functions equal:\n0.50s + 12 = 0.75s + 8\n12 − 8 = 0.75s − 0.50s\n4 = 0.25s\ns = 4 / 0.25 = 16 songs.\nAt 16 songs, StreamMusic costs 0.50(16) + 12 = $20, and MelodyPass costs 0.75(16) + 8 = $20.',
        },
        {
          stepTitle: 'Step 5: Interval Comparison & Conclusion',
          question: 'Which service is cheaper below the break-even point, and which is cheaper above it?',
          options: [
            'MelodyPass is cheaper below 16 songs; StreamMusic is cheaper above 16 songs.',
            'StreamMusic is cheaper below 16 songs; MelodyPass is cheaper above 16 songs.',
            'MelodyPass is always cheaper regardless of song count.',
            'StreamMusic is always cheaper regardless of song count.',
          ],
          correctIdx: 0,
          hint: 'Compare which plan costs less when starting out with very few songs due to its initial fee, and which plan becomes cheaper as song volume increases due to a lower per-song rate.',
          explanation:
            '• For fewer than 16 songs: MelodyPass is cheaper because its lower initial fee ($8 vs $12) outweighs its higher per-song rate.\n• For more than 16 songs: StreamMusic is cheaper because saving $0.25 per song ($0.50 vs $0.75) overcomes the higher initial fee.',
        },
      ],
    },
    'type-c': {
      typeId: 'type-c',
      title: 'Type C: Graph vs. Verbal Description',
      topicName: 'Gym Membership Plans',
      leadPrompt:
        'Find the equation for FlexGym, calculate both plans’ total costs after 6 months, and determine which plan is cheaper and by how much.',
      fn1Name: 'FlexGym (Graph)',
      fn1Type: 'graph',
      fn1GraphType: 'flexgym',
      fn2Name: 'IronClub (Verbal Description)',
      fn2Type: 'verbal',
      fn2Text:
        'IronClub has no upfront initiation fee ($0) and charges a flat membership rate of $35 per month.',
      steps: [
        {
          stepTitle: 'Step 1: FlexGym Equation from Graph',
          question:
            'Using the coordinate graph, what is the initial fee, monthly rate, and equation for FlexGym?',
          options: [
            'Initial fee = $25, monthly rate = $40; Equation: C = 40m + 25',
            'Initial fee = $40, monthly rate = $25; Equation: C = 25m + 40',
            'Initial fee = $0, monthly rate = $25; Equation: C = 25m',
            'Initial fee = $90, monthly rate = $45; Equation: C = 45m + 90',
          ],
          correctIdx: 1,
          hint: 'Find the vertical intercept at m = 0 on the cost axis to determine the initial fee b. Then calculate the rate of change (slope) using the change in cost divided by the change in months between the two labeled points.',
          explanation:
            '• Initial fee: crosses y-axis at (0, 40), so b = $40.\n• Monthly rate: m = (90 − 40)/(2 − 0) = 50/2 = $25 per month.\n• Equation: C = 25m + 40.',
        },
        {
          stepTitle: 'Step 2: IronClub Equation from Verbal Description',
          question:
            'From the verbal description of IronClub, what is its initial fee, monthly rate, and equation?',
          options: [
            'Initial fee = $0, monthly rate = $35; Equation: C = 35m',
            'Initial fee = $35, monthly rate = $0; Equation: C = 35',
            'Initial fee = $10, monthly rate = $35; Equation: C = 35m + 10',
            'Initial fee = $0, monthly rate = $25; Equation: C = 25m',
          ],
          correctIdx: 0,
          hint: 'Separate the one-time starting charge from the recurring monthly charge. In C = rm + b, decide which information belongs to r and which belongs to b.',
          explanation:
            '• Initial fee b = $0 (no initiation fee).\n• Monthly rate m = $35 per month.\n• Equation: C = 35m (a proportional linear function).',
        },
        {
          stepTitle: 'Step 3: Total Costs after 6 Months',
          question:
            'Calculate both plans’ total costs after 6 months (m = 6).',
          options: [
            'FlexGym = $150; IronClub = $210',
            'FlexGym = $210; IronClub = $190',
            'FlexGym = $190; IronClub = $210',
            'FlexGym = $190; IronClub = $190',
          ],
          correctIdx: 2,
          hint: 'Substitute m = 6 into each gym’s cost equation and calculate the total cost for 6 months.',
          explanation:
            '• FlexGym: C = 25(6) + 40 = 150 + 40 = $190.\n• IronClub: C = 35(6) = $210.',
        },
        {
          stepTitle: 'Step 4: Final Comparison & Conclusion',
          question:
            'Which plan is cheaper after 6 months, and by how much?',
          options: [
            'IronClub is cheaper by $20 because it had no upfront fee.',
            'Both plans cost the exact same amount.',
            'FlexGym is cheaper by $20 because its $10/month savings overcomes the $40 initial fee.',
            'FlexGym is cheaper by $40 because its rate is lower.',
          ],
          correctIdx: 2,
          hint: 'Compare the total costs calculated in Step 3 to determine which plan costs less after 6 months, then subtract to find the savings.',
          explanation:
            'FlexGym is cheaper by $210 − $190 = $20 after 6 months. Even though FlexGym starts with a $40 initiation fee, its monthly fee is $10 lower ($25 vs $35). After month 4 (the break-even point where 25m + 40 = 35m ➔ 10m = 40 ➔ m = 4), FlexGym is more economical.',
        },
      ],
    },
    'type-d': {
      typeId: 'type-d',
      title: 'Type D: Equation vs. Verbal Description',
      topicName: 'Camera Purchase Balances (Decreasing Functions)',
      leadPrompt:
        'Determine the initial balances and monthly payoff rates, identify signed slopes and rates of decrease, calculate remaining balances after 4 months, and find the continuous payoff duration for each plan.',
      fn1Name: 'Plan Alpha (Equation)',
      fn1Type: 'equation',
      fn1Equation: 'B = 480 - 60m',
      fn2Name: 'Plan Beta (Verbal Description)',
      fn2Type: 'verbal',
      fn2Text:
        'Plan Beta begins with an initial remaining balance of $420 that decreases at a constant monthly rate of $40 per month. Balances decrease continuously at constant monthly rates, so fractional months are permitted. Each model is restricted to nonnegative balances until payoff.',
      steps: [
        {
          stepTitle: 'Step 1: Initial Balances & Payoff Rates',
          question:
            'What are the initial remaining balances and monthly payoff rates for Plan Alpha and Plan Beta?',
          options: [
            'Plan Alpha: initial balance $480, payoff rate $60/month; Plan Beta: initial balance $420, payoff rate $40/month',
            'Plan Alpha: initial balance $60, payoff rate $480/month; Plan Beta: initial balance $40, payoff rate $420/month',
            'Plan Alpha: initial balance $420, payoff rate $40/month; Plan Beta: initial balance $480, payoff rate $60/month',
            'Both plans start with $480 and pay $50/month',
          ],
          correctIdx: 0,
          hint: 'For Plan Alpha, determine the remaining balance when months m = 0 and identify the coefficient that represents the monthly payment. For Plan Beta, locate the starting balance and monthly reduction stated in the description.',
          explanation:
            '• Plan Alpha: B = 480 − 60m. Initial balance at m = 0 is $480; monthly payment rate is $60/month.\n• Plan Beta: Initial balance is $420; monthly payment rate is $40/month (equation: B = 420 − 40m).',
        },
        {
          stepTitle: 'Step 2: Signed Slopes vs. Magnitude of Decrease',
          question:
            'What are the signed slopes of both models, and which plan decreases debt faster by magnitude?',
          options: [
            'Slopes: Alpha = +60, Beta = +40; Plan Beta decreases faster.',
            'Slopes: Alpha = -60, Beta = -40; Plan Alpha decreases faster by magnitude ($60/mo > $40/mo).',
            'Slopes: Alpha = -60, Beta = -40; Plan Beta decreases faster because -40 > -60.',
            'Slopes: Alpha = -480, Beta = -420; Both decrease at the same speed.',
          ],
          correctIdx: 1,
          hint: 'Because balances decrease over time, determine the sign of the rate of change in the linear equation. To decide which plan pays down the balance faster, compare the absolute values (magnitudes) of their monthly rates.',
          explanation:
            '• Signed slopes: Plan Alpha has slope −60 and Plan Beta has slope −40.\n• Rate of decrease by magnitude: Plan Alpha pays off $60 per month, while Plan Beta pays off $40 per month. Since 60 > 40, Plan Alpha decreases the balance faster by magnitude.',
        },
        {
          stepTitle: 'Step 3: Remaining Balances after 4 Months',
          question:
            'What is the remaining balance under each plan after 4 months (m = 4)?',
          options: [
            'Plan Alpha = $260; Plan Beta = $240',
            'Plan Alpha = $200; Plan Beta = $220',
            'Plan Alpha = $240; Plan Beta = $260',
            'Plan Alpha = $180; Plan Beta = $200',
          ],
          correctIdx: 2,
          hint: 'Substitute m = 4 months into each balance equation and evaluate the remaining debt.',
          explanation:
            '• Plan Alpha: B = 480 − 60(4) = 480 − 240 = $240.\n• Plan Beta: B = 420 − 40(4) = 420 − 160 = $260.\nAfter 4 months, Plan Alpha has a lower remaining balance ($240 vs $260).',
        },
        {
          stepTitle: 'Step 4: Payoff Durations & Final Conclusion',
          question:
            'How many continuous months are required for each plan to reach a balance of $0, and which plan is paid off sooner?',
          options: [
            'Plan Alpha = 8 months; Plan Beta = 10.5 months; Plan Alpha is fully paid off sooner by 2.5 months.',
            'Plan Alpha = 10 months; Plan Beta = 8 months; Plan Beta is fully paid off sooner.',
            'Plan Alpha = 8 months; Plan Beta = 11 months; both finish at approximately the same time.',
            'Plan Alpha = 6 months; Plan Beta = 7 months; Plan Alpha is paid off sooner by 1 month.',
          ],
          correctIdx: 0,
          hint: 'Set the remaining balance B = 0 in each equation and solve for m. Keep in mind that continuous payoff allows fractional months.',
          explanation:
            '• Plan Alpha: 480 − 60m = 0 ➔ 60m = 480 ➔ m = 8 months.\n• Plan Beta: 420 − 40m = 0 ➔ 40m = 420 ➔ m = 10.5 months.\nPlan Alpha is paid off in 8 months, which is 2.5 months sooner than Plan Beta’s 10.5 months, even though Plan Alpha started with a higher initial balance ($480 vs $420).',
        },
      ],
    },
  };

  const currentCompareScenario = COMPARE_SCENARIOS_DATA[compareType];
  const currentCompareStep = currentCompareScenario.steps[compareStepIdx];

  const resetCompareInput = () => {
    setCompareStepAnswer(null);
    setCompareStepFeedback('idle');
    setCompareQuestionAttempts(0);
  };

  const handleCheckCompareStep = () => {
    setCompareQuestionAttempts((c) => c + 1);
    if (compareStepAnswer === currentCompareStep.correctIdx) {
      setCompareStepFeedback('correct');
    } else {
      setCompareStepFeedback('hint');
    }
  };

  // Helper coordinate transform for Graph section practice
  const svgW = 280;
  const svgH = 240;
  const pad = 28;
  const minX = -6;
  const maxX = 6;
  const minY = -6;
  const maxY = 12;

  const toGraphSvgX = (x: number) => pad + ((x - minX) / (maxX - minX)) * (svgW - 2 * pad);
  const toGraphSvgY = (y: number) => svgH - pad - ((y - minY) / (maxY - minY)) * (svgH - 2 * pad);

  // Helper coordinate transform for Explorer
  const expW = 280;
  const expH = 240;
  const expMin = -6;
  const expMax = 6;
  const toExpSvgX = (x: number) => pad + ((x - expMin) / (expMax - expMin)) * (expW - 2 * pad);
  const toExpSvgY = (y: number) => expH - pad - ((y - expMin) / (expMax - expMin)) * (expH - 2 * pad);

  // ===========================================================================
  // SECTION 7: FUNCTION OR NOT? (10 MIXED CASES WITH MOVABLE VLT)
  // ===========================================================================
  const [fnOrNotCaseIdx, setFnOrNotCaseIdx] = useState<number>(0);
  const [fnOrNotTestX, setFnOrNotTestX] = useState<number>(1);
  const [fnOrNotUserChoice, setFnOrNotUserChoice] = useState<'function' | 'not-function' | null>(null);
  const [fnOrNotFeedback, setFnOrNotFeedback] = useState<'idle' | 'hint' | 'correct'>('idle');
  const [fnOrNotQuestionAttempts, setFnOrNotQuestionAttempts] = useState<number>(0);
  const [completedFnCases, setCompletedFnCases] = useState<string[]>([]);
  const isDraggingTestLineRef = useRef<boolean>(false);

  interface FnOrNotCaseDef {
    id: string;
    label: string; // "Graph A", "Graph B", ...
    isFunction: boolean;
    equation: string;
    curveName: string;
    domainStr: string;
    rangeStr: string;
    explanation: string;
    contrastNote?: string;
    hasRestrictedDomain?: boolean;
    domainMin?: number;
    domainMax?: number;
    // Intersections computation given vertical test line x
    getIntersections: (x: number) => {
      points: { x: number; y: number }[];
      isTangent?: boolean;
      isInfinite?: boolean;
    };
    renderPath: (
      toX: (x: number) => number,
      toY: (y: number) => number
    ) => React.ReactNode;
  }

  // Helper to generate smooth SVG path for mathematical parametric curves
  const makeParametricPath = (
    fn: (t: number) => { x: number; y: number },
    tStart: number,
    tEnd: number,
    steps: number,
    toX: (x: number) => number,
    toY: (y: number) => number
  ): string => {
    const pts: string[] = [];
    const dt = (tEnd - tStart) / steps;
    for (let i = 0; i <= steps; i++) {
      const t = tStart + i * dt;
      const { x, y } = fn(t);
      const px = Math.round(toX(x) * 10) / 10;
      const py = Math.round(toY(y) * 10) / 10;
      pts.push(`${i === 0 ? 'M' : 'L'} ${px} ${py}`);
    }
    return pts.join(' ');
  };

  // 10 Mixed cases (6 Functions, 4 Nonfunctions)
  // All curves styled in uniform neutral #2563eb to prevent pre-answer classification cues
  const FN_OR_NOT_CASES: FnOrNotCaseDef[] = [
    {
      id: 'fn-case-a',
      label: 'Graph A',
      isFunction: true,
      equation: 'y = x²',
      curveName: 'Upward Parabola (Quadratic)',
      domainStr: 'All real numbers (-∞, ∞)',
      rangeStr: 'y ≥ 0 [0, ∞)',
      explanation:
        'This graph IS A FUNCTION. Every vertical line crosses the parabola at exactly one point. For every input x, there is exactly one output y = x². Even though distinct inputs like -2 and 2 share the same output 4, it completely satisfies the definition of a function.',
      getIntersections: (x: number) => {
        const y = x * x;
        if (y <= 5 && y >= -5) {
          return { points: [{ x, y }] };
        }
        return { points: [] };
      },
      renderPath: (toX, toY) => (
        <path
          d={makeParametricPath((t) => ({ x: t, y: t * t }), -Math.sqrt(5), Math.sqrt(5), 80, toX, toY)}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-b',
      label: 'Graph B',
      isFunction: false,
      equation: 'x² + y² = 9',
      curveName: 'Complete Circle (Radius 3)',
      domainStr: '-3 ≤ x ≤ 3',
      rangeStr: '-3 ≤ y ≤ 3',
      contrastNote:
        'Contrast with Graph G (upper semicircle): While the complete circle assigns two outputs (±y) to each input x between -3 and 3, the upper semicircle restricts outputs to nonnegative square roots, making the semicircle a function!',
      explanation:
        'This graph is NOT A FUNCTION. For any input x strictly between -3 and 3 (such as x = 0), a vertical line intersects the circle at TWO distinct points: (0, 3) and (0, -3). Because a single input is assigned to two different outputs, it fails the Vertical Line Test.',
      getIntersections: (x: number) => {
        const r2 = 9 - x * x;
        if (r2 < -0.001) {
          return { points: [] };
        }
        if (Math.abs(r2) <= 0.001) {
          return { points: [{ x, y: 0 }], isTangent: true };
        }
        const yVal = Math.sqrt(r2);
        return {
          points: [
            { x, y: yVal },
            { x, y: -yVal },
          ],
        };
      },
      renderPath: (toX, toY) => (
        <circle
          cx={toX(0)}
          cy={toY(0)}
          r={Math.abs(toX(3) - toX(0))}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-c',
      label: 'Graph C',
      isFunction: true,
      equation: 'y = |x|',
      curveName: 'Absolute Value Function',
      domainStr: 'All real numbers (-∞, ∞)',
      rangeStr: 'y ≥ 0 [0, ∞)',
      explanation:
        'This graph IS A FUNCTION. Every vertical line intersects the V-shaped graph in exactly one point. The sharp corner at the origin (0, 0) does not affect its status as a function because every input still produces exactly one output.',
      getIntersections: (x: number) => {
        const y = Math.abs(x);
        if (y <= 5) {
          return { points: [{ x, y }] };
        }
        return { points: [] };
      },
      renderPath: (toX, toY) => (
        <polyline
          points={`${toX(-5)},${toY(5)} ${toX(0)},${toY(0)} ${toX(5)},${toY(5)}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-d',
      label: 'Graph D',
      isFunction: false,
      equation: 'x = y²',
      curveName: 'Sideways Parabola (Horizontal Quadratic)',
      domainStr: 'x ≥ 0 [0, ∞)',
      rangeStr: 'All real numbers (-∞, ∞)',
      explanation:
        'This graph is NOT A FUNCTION. For any positive input x > 0 (such as x = 4), there are two distinct outputs: y = 2 and y = -2, since (2)² = 4 and (-2)² = 4. A vertical line crosses the curve twice, violating the definition of a function.',
      getIntersections: (x: number) => {
        if (x < -0.001) return { points: [] };
        if (Math.abs(x) <= 0.001) return { points: [{ x: 0, y: 0 }], isTangent: true };
        const y = Math.sqrt(x);
        return {
          points: [
            { x, y },
            { x, y: -y },
          ],
        };
      },
      renderPath: (toX, toY) => (
        <path
          d={makeParametricPath((t) => ({ x: t * t, y: t }), -Math.sqrt(5), Math.sqrt(5), 80, toX, toY)}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-e',
      label: 'Graph E',
      isFunction: true,
      equation: 'y = -x² + 4',
      curveName: 'Downward Parabola (Quadratic)',
      domainStr: 'All real numbers (-∞, ∞)',
      rangeStr: 'y ≤ 4 (-∞, 4]',
      explanation:
        'This graph IS A FUNCTION. Every vertical line crosses the downward-opening parabola at exactly one point. The vertex is at (0, 4) where the maximum output occurs.',
      getIntersections: (x: number) => {
        const y = -x * x + 4;
        if (y >= -5 && y <= 5) {
          return { points: [{ x, y }] };
        }
        return { points: [] };
      },
      renderPath: (toX, toY) => (
        <path
          d={makeParametricPath((t) => ({ x: t, y: -t * t + 4 }), -3, 3, 80, toX, toY)}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-f',
      label: 'Graph F',
      isFunction: false,
      equation: 'x = 2',
      curveName: 'Vertical Line',
      domainStr: '{2}',
      rangeStr: 'All real numbers (-∞, ∞)',
      explanation:
        'This graph is NOT A FUNCTION. At input x = 2, the vertical test line overlaps the graph completely, creating INFINITELY MANY shared points. A single input (2) is paired with every real number, which fails the Vertical Line Test in the most extreme way possible.',
      getIntersections: (x: number) => {
        if (Math.abs(x - 2) < 0.15) {
          return { points: [], isInfinite: true };
        }
        return { points: [] };
      },
      renderPath: (toX, toY) => (
        <line
          x1={toX(2)}
          y1={toY(-5)}
          x2={toX(2)}
          y2={toY(5)}
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-g',
      label: 'Graph G',
      isFunction: true,
      equation: 'y = √(9 - x²), -3 ≤ x ≤ 3',
      curveName: 'Upper Semicircle (Radius 3)',
      domainStr: '-3 ≤ x ≤ 3 [-3, 3]',
      rangeStr: '0 ≤ y ≤ 3 [0, 3]',
      hasRestrictedDomain: true,
      domainMin: -3,
      domainMax: 3,
      contrastNote:
        'Contrast with Graph B (complete circle): Here, only the nonnegative principal square root is taken. For any x outside [-3, 3] (such as x = 4), having NO intersection does NOT disqualify the function—it simply means that input is not in the domain!',
      explanation:
        'This graph IS A FUNCTION. For every input in the restricted domain [-3, 3], there is exactly ONE output. Solid endpoint dots at (-3, 0) and (3, 0) mark the domain limits. The fact that a vertical line has zero intersections outside [-3, 3] is completely normal—a function only requires one output for inputs within its domain.',
      getIntersections: (x: number) => {
        if (x < -3 || x > 3) {
          return { points: [] }; // outside domain
        }
        const y = Math.sqrt(9 - x * x);
        const isTangent = Math.abs(x) >= 2.99;
        return { points: [{ x, y }], isTangent };
      },
      renderPath: (toX, toY) => (
        <g>
          {/* Semicircle arc */}
          <path
            d={`M ${toX(-3)} ${toY(0)} A ${Math.abs(toX(3) - toX(0))} ${Math.abs(toY(0) - toY(3))} 0 0 1 ${toX(3)} ${toY(0)}`}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          {/* Solid Included Endpoints */}
          <circle cx={toX(-3)} cy={toY(0)} r="4" fill="#2563eb" />
          <circle cx={toX(3)} cy={toY(0)} r="4" fill="#2563eb" />
        </g>
      ),
    },
    {
      id: 'fn-case-h',
      label: 'Graph H',
      isFunction: false,
      equation: 'x²/16 + y²/9 = 1',
      curveName: 'Complete Ellipse (Horizontal Major Axis)',
      domainStr: '-4 ≤ x ≤ 4',
      rangeStr: '-3 ≤ y ≤ 3',
      explanation:
        'This graph is NOT A FUNCTION. For any input x strictly between -4 and 4 (such as x = 0, which pairs with both y = 3 and y = -3), a vertical line intersects the ellipse in TWO distinct points. A single input value has two different outputs, failing the Vertical Line Test.',
      getIntersections: (x: number) => {
        const val = 1 - (x * x) / 16;
        if (val < -0.001) return { points: [] };
        if (Math.abs(val) <= 0.001) return { points: [{ x, y: 0 }], isTangent: true };
        const y = 3 * Math.sqrt(val);
        return {
          points: [
            { x, y },
            { x, y: -y },
          ],
        };
      },
      renderPath: (toX, toY) => (
        <ellipse
          cx={toX(0)}
          cy={toY(0)}
          rx={Math.abs(toX(4) - toX(0))}
          ry={Math.abs(toY(0) - toY(3))}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-i',
      label: 'Graph I',
      isFunction: true,
      equation: 'y = x³',
      curveName: 'Cubic Function',
      domainStr: 'All real numbers (-∞, ∞)',
      rangeStr: 'All real numbers (-∞, ∞)',
      explanation:
        'This graph IS A FUNCTION. Every vertical line crosses the cubic curve at exactly one point. Each real number input produces a single unique real number output.',
      getIntersections: (x: number) => {
        const y = x * x * x;
        if (y >= -5 && y <= 5) {
          return { points: [{ x, y }] };
        }
        return { points: [] };
      },
      renderPath: (toX, toY) => (
        <path
          d={makeParametricPath((t) => ({ x: t, y: t * t * t }), -Math.cbrt(5), Math.cbrt(5), 80, toX, toY)}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
    {
      id: 'fn-case-j',
      label: 'Graph J',
      isFunction: true,
      equation: 'y = 3',
      curveName: 'Horizontal Line (Constant Function)',
      domainStr: 'All real numbers (-∞, ∞)',
      rangeStr: '{3}',
      explanation:
        'This graph IS A FUNCTION (a constant function). Every vertical test line crosses the horizontal line at exactly ONE point (x, 3). In a function, multiple different inputs are completely permitted to share the same output value (3).',
      getIntersections: (x: number) => {
        return { points: [{ x, y: 3 }] };
      },
      renderPath: (toX, toY) => (
        <line
          x1={toX(-5)}
          y1={toY(3)}
          x2={toX(5)}
          y2={toY(3)}
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      ),
    },
  ];

  const currentFnCase = FN_OR_NOT_CASES[fnOrNotCaseIdx];
  const activeIntersections = currentFnCase.getIntersections(fnOrNotTestX);

  const resetFnCase = () => {
    setFnOrNotUserChoice(null);
    setFnOrNotFeedback('idle');
    setFnOrNotQuestionAttempts(0);
    setFnOrNotTestX(1);
  };

  const resetAllFnCases = () => {
    resetFnCase();
    setFnOrNotCaseIdx(0);
    setCompletedFnCases([]);
  };

  const handleCheckFnOrNotAnswer = () => {
    setFnOrNotQuestionAttempts((c) => c + 1);
    const expected = currentFnCase.isFunction ? 'function' : 'not-function';
    if (fnOrNotUserChoice === expected) {
      setFnOrNotFeedback('correct');
      if (!completedFnCases.includes(currentFnCase.id)) {
        setCompletedFnCases((prev) => [...prev, currentFnCase.id]);
      }
    } else {
      setFnOrNotFeedback('hint');
    }
  };

  // 1:1 Aspect Ratio SVG coordinates for Section 7:
  // Window: x in [-5, 5], y in [-5, 5]
  const fnSvgSize = 320;
  const fnPad = 32;
  const toFnSvgX = (x: number) => fnPad + ((x - (-5)) / 10) * (fnSvgSize - 2 * fnPad);
  const toFnSvgY = (y: number) => fnSvgSize - fnPad - ((y - (-5)) / 10) * (fnSvgSize - 2 * fnPad);

  // SVG Pointer drag handler for interactive test line
  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    isDraggingTestLineRef.current = true;
    updateTestLineFromEvent(e);
  };

  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDraggingTestLineRef.current) {
      updateTestLineFromEvent(e);
    }
  };

  const handleSvgPointerUp = () => {
    isDraggingTestLineRef.current = false;
  };

  const updateTestLineFromEvent = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = (clientX - fnPad) / (fnSvgSize - 2 * fnPad);
    const mathX = Math.max(-5, Math.min(5, -5 + ratio * 10));
    setFnOrNotTestX(Math.round(mathX * 10) / 10);
  };

  return (
    <div
      id="functions-practice-lab-container"
      className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Unit 8 Practice Lab</span>
              </span>
              <span className="text-xs font-bold text-emerald-100">
                TEKS 8.5G & 8.5H · Local Interactive Practice
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Functions Practice Lab
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
              Master relations, tables, graphs, word problems, multi-representation comparisons, and visual Vertical Line Testing.
            </p>
          </div>
        </div>

        {/* Seven Main Section Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-5 pb-1 [scrollbar-width:none] touch-pan-x">
          {(
            [
              { id: 'mapping', label: '1. Mapping Diagrams' },
              { id: 'ordered-pairs', label: '2. Ordered Pairs' },
              { id: 'tables', label: '3. Tables' },
              { id: 'graphs', label: '4. Graphs' },
              { id: 'word-problems', label: '5. Word Problems' },
              { id: 'comparing', label: '6. Comparing Functions' },
              { id: 'function-or-not', label: '7. Function or Not?' },
            ] as { id: LabSection; label: string }[]
          ).map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-white text-emerald-950 shadow-md scale-102 ring-2 ring-emerald-300'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/10'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: MAPPING DIAGRAMS
          ===================================================================== */}
      {activeSection === 'mapping' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Case:
              </span>
              {MAPPING_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setMappingCaseIdx(idx);
                    resetMappingInput();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mappingCaseIdx === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Case {mappingCaseIdx + 1} of {MAPPING_CASES.length}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center justify-center space-y-3 shadow-2xs">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {currentMapping.title}
              </span>

              <svg viewBox="0 0 300 200" className="w-full max-w-[260px] h-auto select-none">
                <ellipse cx="65" cy="100" rx="42" ry="85" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
                <text x="65" y="32" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
                  Domain (x)
                </text>

                <ellipse cx="235" cy="100" rx="42" ry="85" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
                <text x="235" y="32" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
                  Range (y)
                </text>

                {currentMapping.inputs.map((inp, idx) => {
                  const total = currentMapping.inputs.length;
                  const step = 140 / (total + 1);
                  const y = 30 + (idx + 1) * step;
                  return (
                    <g key={`in-${idx}`}>
                      <circle cx="65" cy={y} r="4" fill="#047857" />
                      <text x="50" y={y + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">
                        {inp}
                      </text>
                    </g>
                  );
                })}

                {currentMapping.outputs.map((out, idx) => {
                  const total = currentMapping.outputs.length;
                  const step = 140 / (total + 1);
                  const y = 30 + (idx + 1) * step;
                  return (
                    <g key={`out-${idx}`}>
                      <circle cx="235" cy={y} r="4" fill="#1d4ed8" />
                      <text x="250" y={y + 4} textAnchor="start" fontSize="11" fontWeight="bold" fill="#0f172a">
                        {out}
                      </text>
                    </g>
                  );
                })}

                {currentMapping.arrows.map((arr, idx) => {
                  const inTotal = currentMapping.inputs.length;
                  const outTotal = currentMapping.outputs.length;
                  const inIdx = currentMapping.inputs.indexOf(arr[0]);
                  const outIdx = currentMapping.outputs.indexOf(arr[1]);
                  const inY = 30 + (inIdx + 1) * (140 / (inTotal + 1));
                  const outY = 30 + (outIdx + 1) * (140 / (outTotal + 1));

                  return (
                    <line
                      key={`arr-${idx}`}
                      x1="71"
                      y1={inY}
                      x2="227"
                      y2={outY}
                      stroke="#334155"
                      strokeWidth="2"
                      markerEnd="url(#map-arr-head)"
                    />
                  );
                })}

                <defs>
                  <marker id="map-arr-head" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
                  </marker>
                </defs>
              </svg>

              <span className="text-[11px] text-slate-500 font-medium text-center">
                Count outgoing arrows departing from each domain element.
              </span>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Step 1: Classification
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Does this mapping diagram represent a function?
                </h4>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    disabled={mappingStep === 'reason'}
                    onClick={() => {
                      setMappingClassChoice('function');
                      if (mappingFeedback === 'hint') setMappingFeedback('idle');
                    }}
                    className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                      mappingClassChoice === 'function'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Yes, it is a function
                  </button>

                  <button
                    disabled={mappingStep === 'reason'}
                    onClick={() => {
                      setMappingClassChoice('not-function');
                      if (mappingFeedback === 'hint') setMappingFeedback('idle');
                    }}
                    className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                      mappingClassChoice === 'not-function'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    No, it is not a function
                  </button>
                </div>

                {mappingStep === 'classify' && (
                  <div className="pt-2">
                    <button
                      disabled={mappingClassChoice === null}
                      onClick={handleCheckMappingClass}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        mappingClassChoice !== null
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Check Classification
                    </button>
                  </div>
                )}
              </div>

              {mappingStep === 'reason' && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs animate-fadeIn">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                    Step 2: Mathematical Justification
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Which mathematical reason best justifies your classification?
                  </h4>

                  <div className="space-y-2 pt-1">
                    {currentMapping.reasons.map((rText, rIdx) => (
                      <button
                        key={rIdx}
                        disabled={mappingFeedback === 'correct'}
                        onClick={() => {
                          setMappingReasonChoice(rIdx);
                          if (mappingFeedback === 'hint') setMappingFeedback('idle');
                        }}
                        className={`w-full p-3 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-2.5 ${
                          mappingReasonChoice === rIdx
                            ? mappingFeedback === 'correct'
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                              : 'bg-blue-50 border-blue-600 text-blue-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                          {['A', 'B', 'C', 'D'][rIdx]}
                        </span>
                        <span>{rText}</span>
                      </button>
                    ))}
                  </div>

                  {mappingFeedback !== 'correct' && (
                    <div className="pt-2">
                      <button
                        disabled={mappingReasonChoice === null}
                        onClick={handleCheckMappingReason}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          mappingReasonChoice !== null
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Verify Reason
                      </button>
                    </div>
                  )}
                </div>
              )}

              {mappingFeedback === 'hint' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Helpful Hint:</span>
                  </div>
                  <p className="leading-relaxed">
                    {mappingStep === 'classify' ? currentMapping.hintClass : currentMapping.hintReason}
                  </p>
                </div>
              )}

              {mappingFeedback === 'correct' && (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Correct! Mathematical Explanation:</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                    {currentMapping.explanation}
                  </p>

                  <div className="pt-3 flex items-center justify-between pl-7">
                    <div className="text-xs text-slate-500 font-semibold">
                      Question Attempts: {mappingQuestionAttempts}
                    </div>
                    {mappingCaseIdx < MAPPING_CASES.length - 1 ? (
                      <button
                        onClick={() => {
                          setMappingCaseIdx((i) => i + 1);
                          resetMappingInput();
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Mapping Case</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMappingCaseIdx(0);
                          resetMappingInput();
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Review Mapping Cases</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: ORDERED PAIRS
          ===================================================================== */}
      {activeSection === 'ordered-pairs' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Coordinate Set:
              </span>
              {ORDERED_PAIRS_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setPairsCaseIdx(idx);
                    resetPairsInput();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pairsCaseIdx === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Set {pairsCaseIdx + 1} of {ORDERED_PAIRS_CASES.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {currentPairs.title} · Coordinate Points
            </span>
            <div className="text-lg sm:text-2xl font-mono font-bold text-emerald-300 tracking-wide">
              {currentPairs.pairsString}
            </div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Examine coordinates carefully: positive, negative, zero, fractional, or decimal inputs.
            </p>
          </div>

          <div className="space-y-5 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Step 1: Classification
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Does this set of ordered pairs represent y as a function of x?
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  disabled={pairsStep === 'identify'}
                  onClick={() => {
                    setPairsClassChoice('function');
                    if (pairsFeedback === 'hint') setPairsFeedback('idle');
                  }}
                  className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                    pairsClassChoice === 'function'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Yes, it is a function
                </button>

                <button
                  disabled={pairsStep === 'identify'}
                  onClick={() => {
                    setPairsClassChoice('not-function');
                    if (pairsFeedback === 'hint') setPairsFeedback('idle');
                  }}
                  className={`p-3 rounded-xl border-2 font-bold text-xs sm:text-sm text-center transition-all cursor-pointer ${
                    pairsClassChoice === 'not-function'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  No, it is not a function
                </button>
              </div>

              {pairsStep === 'classify' && (
                <div className="pt-2">
                  <button
                    disabled={pairsClassChoice === null}
                    onClick={handleCheckPairsClass}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      pairsClassChoice !== null
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Check Classification
                  </button>
                </div>
              )}
            </div>

            {pairsStep === 'identify' && (
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs animate-fadeIn">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  {currentPairs.hasConflict ? 'Step 2: Conflict Identification' : 'Step 2: Mathematical Reason'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {currentPairs.hasConflict ? currentPairs.conflictPrompt : currentPairs.reasonPrompt}
                </h4>

                <div className="space-y-2 pt-1">
                  {(currentPairs.hasConflict ? currentPairs.conflictOptions : currentPairs.reasonOptions).map(
                    (optText, optIdx) => (
                      <button
                        key={optIdx}
                        disabled={pairsFeedback === 'correct'}
                        onClick={() => {
                          setPairsIdentifyChoice(optIdx);
                          if (pairsFeedback === 'hint') setPairsFeedback('idle');
                        }}
                        className={`w-full p-3 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-2.5 ${
                          pairsIdentifyChoice === optIdx
                            ? pairsFeedback === 'correct'
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                              : 'bg-blue-50 border-blue-600 text-blue-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                          {['A', 'B', 'C', 'D'][optIdx]}
                        </span>
                        <span>{optText}</span>
                      </button>
                    )
                  )}
                </div>

                {pairsFeedback !== 'correct' && (
                  <div className="pt-2">
                    <button
                      disabled={pairsIdentifyChoice === null}
                      onClick={handleCheckPairsIdentify}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        pairsIdentifyChoice !== null
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Verify Selection
                    </button>
                  </div>
                )}
              </div>
            )}

            {pairsFeedback === 'hint' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Helpful Hint:</span>
                </div>
                <p className="leading-relaxed">
                  {pairsStep === 'classify'
                    ? currentPairs.hintClass
                    : currentPairs.hasConflict
                    ? currentPairs.hintConflict
                    : currentPairs.hintReason}
                </p>
              </div>
            )}

            {pairsFeedback === 'correct' && (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Correct! Mathematical Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                  {currentPairs.explanation}
                </p>

                <div className="pt-3 flex items-center justify-between pl-7">
                  <div className="text-xs text-slate-500 font-semibold">
                    Question Attempts: {pairsQuestionAttempts}
                  </div>
                  {pairsCaseIdx < ORDERED_PAIRS_CASES.length - 1 ? (
                    <button
                      onClick={() => {
                        setPairsCaseIdx((i) => i + 1);
                        resetPairsInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Coordinate Set</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPairsCaseIdx(0);
                        resetPairsInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Review Sets</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: TABLES
          ===================================================================== */}
      {activeSection === 'tables' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Table Analysis:
              </span>
              {TABLE_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setTableCaseIdx(idx);
                    resetTableInput();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tableCaseIdx === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.title.split('—')[0].trim()}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Analysis {tableCaseIdx + 1} of {TABLE_CASES.length}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {currentTableCase.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {currentTableCase.prompt}
            </p>

            {currentTableCase.tableData && (
              <div className="inline-block bg-slate-50 rounded-xl border border-slate-200 p-3 my-2 shadow-2xs">
                <table className="text-center text-xs sm:text-sm font-sans min-w-[220px]">
                  <thead>
                    <tr className="bg-emerald-100/70 text-emerald-950 font-black border-b border-emerald-200">
                      <th className="py-2 px-5">{currentTableCase.tableData.headers[0]}</th>
                      <th className="py-2 px-5">{currentTableCase.tableData.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {currentTableCase.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/80">
                        <td className="py-2 px-5 font-bold text-slate-900">{row[0]}</td>
                        <td className="py-2 px-5 text-indigo-700 font-bold">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {currentTableCase.comparisonTables && (
              <div className="flex flex-wrap items-center gap-6 my-2">
                {currentTableCase.comparisonTables.map((tbl, tIdx) => (
                  <div key={tIdx} className="bg-slate-50 rounded-xl border border-slate-200 p-3 shadow-2xs">
                    <span className="text-xs font-black text-slate-700 block text-center mb-1.5 uppercase">
                      {tbl.name}
                    </span>
                    <table className="text-center text-xs font-sans min-w-[180px]">
                      <thead>
                        <tr className="bg-emerald-100 text-emerald-950 font-black border-b border-emerald-200">
                          <th className="py-1.5 px-4">{tbl.headers[0]}</th>
                          <th className="py-1.5 px-4">{tbl.headers[1]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono">
                        {tbl.rows.map((r, rIdx) => (
                          <tr key={rIdx}>
                            <td className="py-1.5 px-4 font-bold text-slate-900">{r[0]}</td>
                            <td className="py-1.5 px-4 font-bold text-indigo-700">{r[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {currentTableCase.fourChoiceTables && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
                {currentTableCase.fourChoiceTables.map((tbl, tIdx) => {
                  const isSelected = tableAnswerChoice === tIdx;
                  return (
                    <button
                      key={tIdx}
                      disabled={tableFeedback === 'correct'}
                      onClick={() => {
                        setTableAnswerChoice(tIdx);
                        if (tableFeedback === 'hint') setTableFeedback('idle');
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? tableFeedback === 'correct'
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-300'
                            : 'bg-blue-50 border-blue-600 ring-2 ring-blue-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                        <span className="font-black text-xs text-slate-900">{tbl.label}</span>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {['A', 'B', 'C', 'D'][tIdx]}
                        </span>
                      </div>

                      <table className="text-center text-xs font-mono w-full">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold">
                            <th className="py-1 px-2">{tbl.headers[0]}</th>
                            <th className="py-1 px-2">{tbl.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {tbl.rows.map((r, rIdx) => (
                            <tr key={rIdx}>
                              <td className="py-1 px-2 font-bold text-slate-900">{r[0]}</td>
                              <td className="py-1 px-2 text-indigo-700 font-semibold">{r[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </button>
                  );
                })}
              </div>
            )}

            {!currentTableCase.fourChoiceTables && (
              <div className="space-y-2.5 pt-2">
                {currentTableCase.options.map((optText, optIdx) => {
                  const isSelected = tableAnswerChoice === optIdx;
                  return (
                    <button
                      key={optIdx}
                      disabled={tableFeedback === 'correct'}
                      onClick={() => {
                        setTableAnswerChoice(optIdx);
                        if (tableFeedback === 'hint') setTableFeedback('idle');
                      }}
                      className={`w-full p-3.5 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? tableFeedback === 'correct'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                            : 'bg-blue-50 border-blue-600 text-blue-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                        {['A', 'B', 'C', 'D'][optIdx]}
                      </span>
                      <span className="pt-0.5">{optText}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {tableFeedback !== 'correct' && (
              <div className="pt-2">
                <button
                  disabled={tableAnswerChoice === null}
                  onClick={handleCheckTableAnswer}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    tableAnswerChoice !== null
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Check Table Answer
                </button>
              </div>
            )}

            {tableFeedback === 'hint' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Helpful Hint:</span>
                </div>
                <p className="leading-relaxed">{currentTableCase.hint}</p>
              </div>
            )}

            {tableFeedback === 'correct' && (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Correct! Mathematical Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                  {currentTableCase.explanation}
                </p>

                <div className="pt-3 flex items-center justify-between pl-7">
                  <div className="text-xs text-slate-500 font-semibold">
                    Question Attempts: {tableQuestionAttempts}
                  </div>
                  {tableCaseIdx < TABLE_CASES.length - 1 ? (
                    <button
                      onClick={() => {
                        setTableCaseIdx((i) => i + 1);
                        resetTableInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Table Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTableCaseIdx(0);
                        resetTableInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Review Tables</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: GRAPHS & FUNCTION EXPLORER
          ===================================================================== */}
      {activeSection === 'graphs' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setGraphSubTab('practice')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  graphSubTab === 'practice'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Graph Practice Exercises (4 Cases)
              </button>
              <button
                onClick={() => setGraphSubTab('explorer')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  graphSubTab === 'explorer'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Function Explorer Tool</span>
              </button>
            </div>
          </div>

          {graphSubTab === 'practice' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Select Graph Case:
                  </span>
                  {GRAPH_CASES.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setGraphCaseIdx(idx);
                        resetGraphInput();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        graphCaseIdx === idx
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {c.title.split('—')[0].trim()}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500 font-bold">
                  Case {graphCaseIdx + 1} of {GRAPH_CASES.length}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col items-center space-y-4 shadow-2xs">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-700 block">
                      {currentGraphCase.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {currentGraphCase.description}
                    </span>
                  </div>

                  <div className="relative bg-white border border-slate-300 rounded-xl overflow-hidden shadow-inner">
                    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[260px] h-auto select-none">
                      {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((x) => (
                        <line
                          key={`v-grid-${x}`}
                          x1={toGraphSvgX(x)}
                          y1={pad}
                          x2={toGraphSvgX(x)}
                          y2={svgH - pad}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      ))}
                      {[-4, -2, 2, 4, 6, 8, 10].map((y) => (
                        <line
                          key={`h-grid-${y}`}
                          x1={pad}
                          y1={toGraphSvgY(y)}
                          x2={svgW - pad}
                          y2={toGraphSvgY(y)}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      ))}

                      <line x1={toGraphSvgX(minX)} y1={toGraphSvgY(0)} x2={toGraphSvgX(maxX)} y2={toGraphSvgY(0)} stroke="#64748b" strokeWidth="1.5" />
                      <line x1={toGraphSvgX(0)} y1={toGraphSvgY(minY)} x2={toGraphSvgX(0)} y2={toGraphSvgY(maxY)} stroke="#64748b" strokeWidth="1.5" />

                      <text x={toGraphSvgX(maxX) - 6} y={toGraphSvgY(0) - 4} fontSize="9" fontWeight="bold" fill="#64748b">x</text>
                      <text x={toGraphSvgX(0) + 4} y={pad + 10} fontSize="9" fontWeight="bold" fill="#64748b">y</text>

                      {currentGraphCase.type === 'discrete' &&
                        currentGraphCase.points?.map(([px, py], pIdx) => (
                          <g key={`pt-${pIdx}`}>
                            <circle cx={toGraphSvgX(px)} cy={toGraphSvgY(py)} r="4.5" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                            <text
                              x={toGraphSvgX(px) + 5}
                              y={toGraphSvgY(py) - 5}
                              fontSize="9"
                              fontWeight="bold"
                              fill="#0f172a"
                              style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2px' }}
                            >
                              ({px}, {py})
                            </text>
                          </g>
                        ))}

                      {currentGraphCase.type === 'linear' && (
                        <>
                          <line
                            x1={toGraphSvgX(minX)}
                            y1={toGraphSvgY(2 * minX + 3)}
                            x2={toGraphSvgX(maxX)}
                            y2={toGraphSvgY(2 * maxX + 3)}
                            stroke="#047857"
                            strokeWidth="2.5"
                          />
                          <circle cx={toGraphSvgX(0)} cy={toGraphSvgY(3)} r="4.5" fill="#047857" stroke="#fff" strokeWidth="1.5" />
                          <circle cx={toGraphSvgX(4)} cy={toGraphSvgY(11)} r="4.5" fill="#047857" stroke="#fff" strokeWidth="1.5" />
                        </>
                      )}

                      {currentGraphCase.type === 'parabola' && (
                        <path
                          d={`M ${toGraphSvgX(-5)} ${toGraphSvgY(0.5 * 25 - 2)} Q ${toGraphSvgX(0)} ${toGraphSvgY(-2 - 8)} ${toGraphSvgX(5)} ${toGraphSvgY(0.5 * 25 - 2)}`}
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth="2.5"
                        />
                      )}

                      <line
                        x1={toGraphSvgX(graphVltSliderX)}
                        y1={pad}
                        x2={toGraphSvgX(graphVltSliderX)}
                        y2={svgH - pad}
                        stroke="#dc2626"
                        strokeWidth="2"
                        strokeDasharray="4,3"
                      />
                    </svg>
                  </div>

                  <div className="w-full space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Movable Vertical Line:</span>
                      <span className="font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        x = {graphVltSliderX}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={graphVltSliderX}
                      onChange={(e) => setGraphVltSliderX(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-ew-resize"
                    />
                    <span className="text-[10px] text-slate-500 block text-center">
                      Slide left/right to test if the vertical line crosses more than one point.
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {currentGraphCase.prompt}
                  </h4>

                  <div className="space-y-2.5">
                    {currentGraphCase.options.map((optText, optIdx) => {
                      const isSelected = graphAnswerChoice === optIdx;
                      return (
                        <button
                          key={optIdx}
                          disabled={graphFeedback === 'correct'}
                          onClick={() => {
                            setGraphAnswerChoice(optIdx);
                            if (graphFeedback === 'hint') setGraphFeedback('idle');
                          }}
                          className={`w-full p-3.5 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? graphFeedback === 'correct'
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                                : 'bg-blue-50 border-blue-600 text-blue-950'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                          <span className="pt-0.5 leading-relaxed">{optText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {graphFeedback !== 'correct' && (
                    <div className="pt-2">
                      <button
                        disabled={graphAnswerChoice === null}
                        onClick={handleCheckGraphAnswer}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          graphAnswerChoice !== null
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Check Graph Answer
                      </button>
                    </div>
                  )}

                  {graphFeedback === 'hint' && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                      <div className="flex items-center gap-2 font-bold text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Helpful Hint:</span>
                      </div>
                      <p className="leading-relaxed">{currentGraphCase.hint}</p>
                    </div>
                  )}

                  {graphFeedback === 'correct' && (
                    <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Correct! Mathematical Explanation:</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                        {currentGraphCase.explanation}
                      </p>

                      <div className="pt-3 flex items-center justify-between pl-7">
                        <div className="text-xs text-slate-500 font-semibold">
                          Question Attempts: {graphQuestionAttempts}
                        </div>
                        {graphCaseIdx < GRAPH_CASES.length - 1 ? (
                          <button
                            onClick={() => {
                              setGraphCaseIdx((i) => i + 1);
                              resetGraphInput();
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Next Graph Case</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setGraphCaseIdx(0);
                              resetGraphInput();
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Review Graph Cases</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {graphSubTab === 'explorer' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      Synchronized Parameter Explorer
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">
                    Adjust Slope (m) and Intercept (b) in Real Time
                  </h4>
                  <p className="text-xs text-slate-300">
                    Observe how changing the rate of change and initial value immediately updates the equation, table, and coordinate line.
                  </p>
                </div>

                <button
                  onClick={() => setIsNonlinearExplorer(!isNonlinearExplorer)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isNonlinearExplorer
                      ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {isNonlinearExplorer ? 'Switch to Linear (y = mx + b)' : 'Toggle Nonlinear (y = x²)'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-5">
                  <div className="text-center p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs text-emerald-800 font-bold block uppercase tracking-wider">
                      Current Function Model
                    </span>
                    <span className="font-mono text-xl font-black text-emerald-950">
                      {isNonlinearExplorer ? 'y = x²' : `y = ${explorerSlope === 0 ? '' : explorerSlope === 1 ? 'x' : explorerSlope === -1 ? '-x' : `${explorerSlope}x`}${explorerIntercept > 0 ? (explorerSlope === 0 ? `${explorerIntercept}` : ` + ${explorerIntercept}`) : explorerIntercept < 0 ? ` - ${Math.abs(explorerIntercept)}` : explorerSlope === 0 ? '0' : ''}`}
                    </span>
                  </div>

                  {!isNonlinearExplorer ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Slope / Rate of Change (m):</span>
                          <span className="font-mono text-indigo-700 font-black">{explorerSlope}</span>
                        </div>
                        <input
                          type="range"
                          min="-4"
                          max="4"
                          step="0.5"
                          value={explorerSlope}
                          onChange={(e) => setExplorerSlope(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-ew-resize"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>-4</span>
                          <span>0</span>
                          <span>+4</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>y-intercept / Initial Value (b):</span>
                          <span className="font-mono text-teal-700 font-black">{explorerIntercept}</span>
                        </div>
                        <input
                          type="range"
                          min="-5"
                          max="5"
                          step="1"
                          value={explorerIntercept}
                          onChange={(e) => setExplorerIntercept(Number(e.target.value))}
                          className="w-full accent-teal-600 cursor-ew-resize"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>-5</span>
                          <span>0 (Proportional)</span>
                          <span>+5</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-slate-800 block">Proportionality Classification:</span>
                        <span className={`font-black ${explorerIntercept === 0 ? 'text-emerald-700' : 'text-blue-700'}`}>
                          {explorerIntercept === 0
                            ? '✔ Proportional (y = kx) · Passes through (0, 0)'
                            : `✖ Nonproportional · Initial value b = ${explorerIntercept} ≠ 0`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-2">
                      <span className="font-black text-purple-900 block">Nonlinear Quadratic Function:</span>
                      <p className="leading-relaxed">
                        Notice how the rate of change Δy/Δx changes as x increases! It is still a valid function because every vertical line intersects at most one point.
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center shadow-2xs">
                  <div className="relative bg-white border border-slate-300 rounded-xl overflow-hidden shadow-inner">
                    <svg viewBox={`0 0 ${expW} ${expH}`} className="w-full max-w-[260px] h-auto select-none">
                      {[-4, -2, 2, 4].map((v) => (
                        <React.Fragment key={`exp-grid-${v}`}>
                          <line x1={toExpSvgX(v)} y1={pad} x2={toExpSvgX(v)} y2={expH - pad} stroke="#e2e8f0" strokeWidth="1" />
                          <line x1={pad} y1={toExpSvgY(v)} x2={expW - pad} y2={toExpSvgY(v)} stroke="#e2e8f0" strokeWidth="1" />
                        </React.Fragment>
                      ))}

                      <line x1={toExpSvgX(expMin)} y1={toExpSvgY(0)} x2={toExpSvgX(expMax)} y2={toExpSvgY(0)} stroke="#64748b" strokeWidth="1.5" />
                      <line x1={toExpSvgX(0)} y1={toExpSvgY(expMin)} x2={toExpSvgX(0)} y2={toExpSvgY(expMax)} stroke="#64748b" strokeWidth="1.5" />

                      {!isNonlinearExplorer ? (
                        <>
                          <line
                            x1={toExpSvgX(expMin)}
                            y1={toExpSvgY(explorerSlope * expMin + explorerIntercept)}
                            x2={toExpSvgX(expMax)}
                            y2={toExpSvgY(explorerSlope * expMax + explorerIntercept)}
                            stroke="#047857"
                            strokeWidth="2.5"
                          />
                          <circle cx={toExpSvgX(0)} cy={toExpSvgY(explorerIntercept)} r="4.5" fill="#047857" stroke="#fff" strokeWidth="1.5" />
                        </>
                      ) : (
                        <path
                          d={`M ${toExpSvgX(-2.5)} ${toExpSvgY(6.25)} Q ${toExpSvgX(0)} ${toExpSvgY(-6.25)} ${toExpSvgX(2.5)} ${toExpSvgY(6.25)}`}
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth="2.5"
                        />
                      )}
                    </svg>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-2">
                    Visual grid synchronized to parameters above.
                  </span>
                </div>

                <div className="lg:col-span-3 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Table of Values
                  </span>
                  <table className="text-center text-xs font-mono w-full max-w-[180px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <thead>
                      <tr className="bg-emerald-100 text-emerald-950 font-black">
                        <th className="py-1 px-3">x</th>
                        <th className="py-1 px-3">y</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[-2, -1, 0, 1, 2, 3].map((val) => {
                        const yVal = isNonlinearExplorer
                          ? val * val
                          : explorerSlope * val + explorerIntercept;
                        return (
                          <tr key={val} className="hover:bg-slate-50">
                            <td className="py-1 px-3 font-bold text-slate-800">{val}</td>
                            <td className="py-1 px-3 font-bold text-indigo-700">{yVal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SECTION 5: WORD PROBLEMS
          ===================================================================== */}
      {activeSection === 'word-problems' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Word Problem:
              </span>
              {WORD_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setWordCaseIdx(idx);
                    resetWordInput();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    wordCaseIdx === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.title.split(':')[0]}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-bold">
              Problem {wordCaseIdx + 1} of {WORD_CASES.length}
            </div>
          </div>

          <div className="space-y-5 max-w-3xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {currentWordCase.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">{currentWordCase.title}</span>
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
                {currentWordCase.scenario}
              </p>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentWordCase.prompt}
            </h4>

            <div className="space-y-2.5">
              {currentWordCase.options.map((optText, optIdx) => {
                const isSelected = wordAnswerChoice === optIdx;
                return (
                  <button
                    key={optIdx}
                    disabled={wordFeedback === 'correct'}
                    onClick={() => {
                      setWordAnswerChoice(optIdx);
                      if (wordFeedback === 'hint') setWordFeedback('idle');
                    }}
                    className={`w-full p-4 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? wordFeedback === 'correct'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                          : 'bg-blue-50 border-blue-600 text-blue-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                      {['A', 'B', 'C', 'D'][optIdx]}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{optText}</span>
                  </button>
                );
              })}
            </div>

            {wordFeedback !== 'correct' && (
              <div className="pt-2">
                <button
                  disabled={wordAnswerChoice === null}
                  onClick={handleCheckWordAnswer}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    wordAnswerChoice !== null
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Check Word Problem Answer
                </button>
              </div>
            )}

            {wordFeedback === 'hint' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Helpful Hint:</span>
                </div>
                <p className="leading-relaxed">{currentWordCase.hint}</p>
              </div>
            )}

            {wordFeedback === 'correct' && (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Correct! Mathematical Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                  {currentWordCase.explanation}
                </p>

                <div className="pt-3 flex items-center justify-between pl-7">
                  <div className="text-xs text-slate-500 font-semibold">
                    Question Attempts: {wordQuestionAttempts}
                  </div>
                  {wordCaseIdx < WORD_CASES.length - 1 ? (
                    <button
                      onClick={() => {
                        setWordCaseIdx((i) => i + 1);
                        resetWordInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Word Problem</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setWordCaseIdx(0);
                        resetWordInput();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Review Word Problems</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 6: COMPARING FUNCTIONS (ENLARGED GRAPHS & STEP-BY-STEP)
          ===================================================================== */}
      {activeSection === 'comparing' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Comparison Types Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Comparison Type:
              </span>
              {[
                { id: 'type-a', label: 'Type A: Table vs. Graph' },
                { id: 'type-b', label: 'Type B: Table vs. Equation' },
                { id: 'type-c', label: 'Type C: Graph vs. Verbal' },
                { id: 'type-d', label: 'Type D: Equation vs. Verbal' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCompareType(t.id as any);
                    setCompareStepIdx(0);
                    resetCompareInput();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    compareType === t.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              {currentCompareScenario.topicName}
            </span>
          </div>

          {/* Investigation Challenge / Goal Banner (Neutral Prompt) */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Investigation Task
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {currentCompareScenario.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {currentCompareScenario.leadPrompt}
              </p>
            </div>
          </div>

          {/* Dual Multi-Representation Display Cards Side-by-Side (Persistently Visible) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Representation 1 Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-black text-sm uppercase tracking-wider text-indigo-800">
                  {currentCompareScenario.fn1Name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {currentCompareScenario.fn1Type.toUpperCase()}
                </span>
              </div>

              {/* Table rendering for Fn1 */}
              {currentCompareScenario.fn1Type === 'table' && currentCompareScenario.fn1Data && (
                <div className="flex justify-center py-2">
                  <table className="text-center text-xs font-mono bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs w-full max-w-[260px]">
                    <thead>
                      <tr className="bg-indigo-50 text-indigo-950 font-bold border-b border-indigo-100">
                        <th className="py-2 px-3">{currentCompareScenario.fn1Data.headers[0]}</th>
                        <th className="py-2 px-3">{currentCompareScenario.fn1Data.headers[1]}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentCompareScenario.fn1Data.rows.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-slate-800">{r[0]}</td>
                          <td className="py-2 px-3 font-bold text-indigo-700">{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Equation rendering for Fn1 */}
              {currentCompareScenario.fn1Type === 'equation' && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs my-auto">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Given Linear Equation
                  </span>
                  <div className="font-mono font-black text-2xl text-indigo-900 tracking-wide">
                    {currentCompareScenario.fn1Equation}
                  </div>
                  <span className="text-xs text-slate-600 block">
                    where m represents months and B represents balance remaining ($)
                  </span>
                </div>
              )}

              {/* Graph rendering for Fn1 (FlexGym Graph: Enlarger with numbered ticks, axis names, and units) */}
              {currentCompareScenario.fn1Type === 'graph' && currentCompareScenario.fn1GraphType === 'flexgym' && (() => {
                const isFlexGymRateRevealed = compareType === 'type-c' && (compareStepIdx > 0 || compareStepFeedback === 'correct');
                return (
                  <div className="flex flex-col items-center py-1">
                    <svg
                      viewBox="0 0 380 260"
                      role="img"
                      aria-label={
                        isFlexGymRateRevealed
                          ? 'Coordinate graph of FlexGym total cost versus time in months passing through (0, 40) and (2, 90) with rate $25 per month'
                          : 'Coordinate graph of FlexGym total cost versus time in months passing through plotted points (0, 40) and (2, 90)'
                      }
                      className="w-full max-w-[360px] h-auto bg-white border border-slate-300 rounded-2xl shadow-inner select-none p-1"
                    >
                      {/* Gridlines for Months 0 to 6 */}
                      {[0, 1, 2, 3, 4, 5, 6].map((mVal) => {
                        const gx = 55 + (mVal / 6) * 290;
                        return (
                          <g key={`gym-gx-${mVal}`}>
                            <line x1={gx} y1={30} x2={gx} y2={210} stroke="#f1f5f9" strokeWidth="1.2" />
                            <text x={gx} y={226} fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">{mVal}</text>
                          </g>
                        );
                      })}
                      {/* Gridlines for Cost 0 to 200 */}
                      {[0, 40, 80, 120, 160, 200].map((cVal) => {
                        const gy = 210 - (cVal / 200) * 180;
                        return (
                          <g key={`gym-gy-${cVal}`}>
                            <line x1={55} y1={gy} x2={345} y2={gy} stroke="#f1f5f9" strokeWidth="1.2" />
                            <text x={48} y={gy + 3.5} fontSize="10" fontWeight="bold" fill="#475569" textAnchor="end">${cVal}</text>
                          </g>
                        );
                      })}

                      {/* Main Coordinate Axes */}
                      <line x1={55} y1={210} x2={355} y2={210} stroke="#334155" strokeWidth="2" />
                      <line x1={55} y1={210} x2={55} y2={18} stroke="#334155" strokeWidth="2" />

                      {/* Axis Titles with Units */}
                      <text x={200} y={248} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="middle">
                        Time (months, m)
                      </text>
                      <text x={12} y={20} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="start">
                        Total Cost ($)
                      </text>

                      {/* FlexGym Line: C = 25m + 40 (m=0 -> 40; m=6 -> 190) */}
                      <line
                        x1={55}
                        y1={210 - (40 / 200) * 180}
                        x2={55 + (6 / 6) * 290}
                        y2={210 - (190 / 200) * 180}
                        stroke="#4338ca"
                        strokeWidth="3"
                      />

                      {/* Plot Points (0, 40) and (2, 90) */}
                      <circle cx={55} cy={210 - (40 / 200) * 180} r="5" fill="#4338ca" stroke="#fff" strokeWidth="2" />
                      <circle cx={55 + (2 / 6) * 290} cy={210 - (90 / 200) * 180} r="5" fill="#4338ca" stroke="#fff" strokeWidth="2" />

                      {/* Non-overlapping High-Contrast Point Labels */}
                      <text
                        x={65}
                        y={210 - (40 / 200) * 180 - 5}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#1e1b4b"
                        style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
                      >
                        (0, $40)
                      </text>
                      <text
                        x={55 + (2 / 6) * 290 + 8}
                        y={210 - (90 / 200) * 180 - 5}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#1e1b4b"
                        style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
                      >
                        (2, $90)
                      </text>
                    </svg>
                    <span className="text-[11px] text-slate-500 font-semibold mt-1.5 text-center">
                      {isFlexGymRateRevealed
                        ? 'Line passing through (0, 40) and (2, 90) • Rate: $25/month'
                        : 'Line passing through (0, 40) and (2, 90)'}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Representation 2 Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-black text-sm uppercase tracking-wider text-teal-800">
                  {currentCompareScenario.fn2Name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                  {currentCompareScenario.fn2Type.toUpperCase()}
                </span>
              </div>

              {/* Graph rendering for Fn2 (Typist B Graph: Enlarged with numbered ticks, axis names, and units) */}
              {currentCompareScenario.fn2Type === 'graph' && currentCompareScenario.fn2GraphType === 'typing' && (() => {
                const isTypingRateRevealed = compareType === 'type-a' && (compareStepIdx > 0 || compareStepFeedback === 'correct');
                return (
                  <div className="flex flex-col items-center py-1">
                    <svg
                      viewBox="0 0 380 260"
                      role="img"
                      aria-label={
                        isTypingRateRevealed
                          ? 'Coordinate graph of Typist B words typed versus time in minutes passing through (0, 0) and (3, 165) with rate 55 words per minute'
                          : 'Coordinate graph of Typist B words typed versus time in minutes passing through plotted points (0, 0) and (3, 165)'
                      }
                      className="w-full max-w-[360px] h-auto bg-white border border-slate-300 rounded-2xl shadow-inner select-none p-1"
                    >
                      {/* Gridlines for Time 0 to 5 minutes */}
                      {[0, 1, 2, 3, 4, 5].map((tVal) => {
                        const gx = 55 + (tVal / 5) * 290;
                        return (
                          <g key={`type-gx-${tVal}`}>
                            <line x1={gx} y1={30} x2={gx} y2={210} stroke="#f1f5f9" strokeWidth="1.2" />
                            <text x={gx} y={226} fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">{tVal}</text>
                          </g>
                        );
                      })}
                      {/* Gridlines for Words 0 to 250 */}
                      {[0, 50, 100, 150, 200, 250].map((wVal) => {
                        const gy = 210 - (wVal / 250) * 180;
                        return (
                          <g key={`type-gy-${wVal}`}>
                            <line x1={55} y1={gy} x2={345} y2={gy} stroke="#f1f5f9" strokeWidth="1.2" />
                            <text x={48} y={gy + 3.5} fontSize="10" fontWeight="bold" fill="#475569" textAnchor="end">{wVal}</text>
                          </g>
                        );
                      })}

                      {/* Main Coordinate Axes */}
                      <line x1={55} y1={210} x2={355} y2={210} stroke="#334155" strokeWidth="2" />
                      <line x1={55} y1={210} x2={55} y2={18} stroke="#334155" strokeWidth="2" />

                      {/* Axis Titles with Units */}
                      <text x={200} y={248} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="middle">
                        Time (minutes, t)
                      </text>
                      <text x={12} y={20} fontSize="11" fontWeight="800" fill="#0f172a" textAnchor="start">
                        Words Typed (w)
                      </text>

                      {/* Typist B Line: w = 55t (passes through (0, 0) and (3, 165)) */}
                      <line
                        x1={55}
                        y1={210}
                        x2={55 + (4.545 / 5) * 290}
                        y2={210 - (250 / 250) * 180}
                        stroke="#0f766e"
                        strokeWidth="3"
                      />

                      {/* Plot Points (0, 0) and (3, 165) */}
                      <circle cx={55} cy={210} r="5" fill="#0f766e" stroke="#fff" strokeWidth="2" />
                      <circle cx={55 + (3 / 5) * 290} cy={210 - (165 / 250) * 180} r="5" fill="#0f766e" stroke="#fff" strokeWidth="2" />

                      {/* Non-overlapping High-Contrast Point Labels */}
                      <text
                        x={65}
                        y={204}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#042f2e"
                        style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
                      >
                        (0, 0)
                      </text>
                      <text
                        x={55 + (3 / 5) * 290 + 8}
                        y={210 - (165 / 250) * 180 - 4}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#042f2e"
                        style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '3px' }}
                      >
                        (3, 165)
                      </text>
                    </svg>
                    <span className="text-[11px] text-slate-500 font-semibold mt-1.5 text-center">
                      {isTypingRateRevealed
                        ? 'Line passing through (0, 0) and (3, 165) • Rate: 55 words/min'
                        : 'Line passing through (0, 0) and (3, 165)'}
                    </span>
                  </div>
                );
              })()}

              {/* Equation rendering for Fn2 */}
              {currentCompareScenario.fn2Type === 'equation' && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs my-auto">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Given Cost Function
                  </span>
                  <div className="font-mono font-black text-2xl text-teal-900 tracking-wide">
                    {currentCompareScenario.fn2Equation}
                  </div>
                  <span className="text-xs text-slate-600 block">
                    where s is number of downloaded songs and C is total cost ($)
                  </span>
                </div>
              )}

              {/* Verbal rendering for Fn2 */}
              {currentCompareScenario.fn2Type === 'verbal' && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs my-auto">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verbal Description
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {currentCompareScenario.fn2Text}
                  </p>
                  <span className="text-xs text-teal-700 font-bold block pt-1">
                    Derive rate of change and initial value directly from context.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sequential Step-by-Step Question Workflow */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 max-w-3xl mx-auto">
            {/* Step Progress Tracker */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">
                  Step {compareStepIdx + 1} of {currentCompareScenario.steps.length}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {currentCompareStep.stepTitle}
                </span>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5">
                {currentCompareScenario.steps.map((_, sIdx) => (
                  <span
                    key={sIdx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      sIdx === compareStepIdx
                        ? 'bg-emerald-600 scale-125'
                        : sIdx < compareStepIdx
                        ? 'bg-emerald-300'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Prompt */}
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentCompareStep.question}
            </h4>

            {/* Options with Varied Correct Answer Positions */}
            <div className="space-y-2.5">
              {currentCompareStep.options.map((optText, optIdx) => {
                const isSelected = compareStepAnswer === optIdx;
                return (
                  <button
                    key={optIdx}
                    disabled={compareStepFeedback === 'correct'}
                    onClick={() => {
                      setCompareStepAnswer(optIdx);
                      if (compareStepFeedback === 'hint') setCompareStepFeedback('idle');
                    }}
                    className={`w-full p-4 rounded-xl text-left border-2 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? compareStepFeedback === 'correct'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                          : 'bg-blue-50 border-blue-600 text-blue-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">
                      {['A', 'B', 'C', 'D'][optIdx]}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{optText}</span>
                  </button>
                );
              })}
            </div>

            {/* Check Button */}
            {compareStepFeedback !== 'correct' && (
              <div className="pt-2">
                <button
                  disabled={compareStepAnswer === null}
                  onClick={handleCheckCompareStep}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    compareStepAnswer !== null
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Check Step Answer
                </button>
              </div>
            )}

            {/* Hint Banner */}
            {compareStepFeedback === 'hint' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Helpful Hint:</span>
                </div>
                <p className="leading-relaxed">{currentCompareStep.hint}</p>
              </div>
            )}

            {/* Correct Explanation & Progression Banner */}
            {compareStepFeedback === 'correct' && (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Step Complete! Mathematical Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-7">
                  {currentCompareStep.explanation}
                </p>

                <div className="pt-3 flex items-center justify-between pl-7">
                  <div className="text-xs text-slate-500 font-semibold">
                    Attempts for this step: {compareQuestionAttempts}
                  </div>
                  <div>
                    {compareStepIdx < currentCompareScenario.steps.length - 1 ? (
                      <button
                        onClick={() => {
                          setCompareStepIdx((idx) => idx + 1);
                          resetCompareInput();
                        }}
                        className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Advance to Next Step</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {compareType !== 'type-d' ? (
                          <button
                            onClick={() => {
                              const order = ['type-a', 'type-b', 'type-c', 'type-d'];
                              const nextIdx = order.indexOf(compareType) + 1;
                              setCompareType(order[nextIdx] as any);
                              setCompareStepIdx(0);
                              resetCompareInput();
                            }}
                            className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <span>Next Comparison Scenario</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setCompareType('type-a');
                              setCompareStepIdx(0);
                              resetCompareInput();
                            }}
                            className="px-5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restart Comparisons</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 7: FUNCTION OR NOT? (10 VISUAL CASES WITH MOVABLE VLT)
          ===================================================================== */}
      {activeSection === 'function-or-not' && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top Activity Header & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider">
                  Interactive Lab
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Vertical Line Test · Equal 1:1 Aspect Ratio
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                Function or Not? Visual Graph Classification
              </h3>
              <p className="text-xs text-slate-600">
                Drag the vertical test line or use the slider to check if any input x produces more than one output y.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                {completedFnCases.length} / 10 Mastered
              </span>
              <button
                onClick={resetAllFnCases}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear all ten-case progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Activity</span>
              </button>
            </div>
          </div>

          {/* Graph Selector Navigation Bar (A through J, Mixed) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none]">
            {FN_OR_NOT_CASES.map((item, idx) => {
              const isSelected = fnOrNotCaseIdx === idx;
              const isDone = completedFnCases.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setFnOrNotCaseIdx(idx);
                    resetFnCase();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs scale-102 ring-2 ring-emerald-300'
                      : isDone
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Lab Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 1:1 Aspect Ratio Geometric Coordinate Grid */}
            <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center space-y-4 shadow-sm">
              <div className="flex items-center justify-between w-full px-2">
                <span className="font-black text-sm text-slate-800 tracking-wide">
                  {currentFnCase.label}
                </span>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <MousePointer className="w-3.5 h-3.5 text-rose-500" />
                  <span>Click & drag vertical line</span>
                </span>
              </div>

              {/* SVG Coordinate Grid (Equal 1:1 units) */}
              <div className="relative bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-inner select-none">
                <svg
                  viewBox={`0 0 ${fnSvgSize} ${fnSvgSize}`}
                  className="w-full max-w-[320px] h-auto cursor-ew-resize touch-none"
                  onPointerDown={handleSvgPointerDown}
                  onPointerMove={handleSvgPointerMove}
                  onPointerUp={handleSvgPointerUp}
                  onPointerLeave={handleSvgPointerUp}
                >
                  {/* Grid Lines (-4 to 4) */}
                  {[-4, -3, -2, -1, 1, 2, 3, 4].map((coord) => (
                    <g key={`grid-x-${coord}`}>
                      <line
                        x1={toFnSvgX(coord)}
                        y1={fnPad}
                        x2={toFnSvgX(coord)}
                        y2={fnSvgSize - fnPad}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={toFnSvgX(coord)}
                        y={toFnSvgY(0) + 12}
                        fontSize="9"
                        fontWeight="bold"
                        fill="#94a3b8"
                        textAnchor="middle"
                      >
                        {coord}
                      </text>
                    </g>
                  ))}
                  {[-4, -3, -2, -1, 1, 2, 3, 4].map((coord) => (
                    <g key={`grid-y-${coord}`}>
                      <line
                        x1={fnPad}
                        y1={toFnSvgY(coord)}
                        x2={fnSvgSize - fnPad}
                        y2={toFnSvgY(coord)}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={toFnSvgX(0) - 8}
                        y={toFnSvgY(coord) + 3}
                        fontSize="9"
                        fontWeight="bold"
                        fill="#94a3b8"
                        textAnchor="end"
                      >
                        {coord}
                      </text>
                    </g>
                  ))}

                  {/* Main Axes */}
                  <line
                    x1={fnPad - 10}
                    y1={toFnSvgY(0)}
                    x2={fnSvgSize - fnPad + 10}
                    y2={toFnSvgY(0)}
                    stroke="#475569"
                    strokeWidth="1.75"
                  />
                  <line
                    x1={toFnSvgX(0)}
                    y1={fnSvgSize - fnPad + 10}
                    x2={toFnSvgX(0)}
                    y2={fnPad - 10}
                    stroke="#475569"
                    strokeWidth="1.75"
                  />

                  {/* Axis Names */}
                  <text
                    x={fnSvgSize - fnPad + 14}
                    y={toFnSvgY(0) - 4}
                    fontSize="10"
                    fontWeight="black"
                    fill="#334155"
                  >
                    x
                  </text>
                  <text
                    x={toFnSvgX(0) + 5}
                    y={fnPad - 8}
                    fontSize="10"
                    fontWeight="black"
                    fill="#334155"
                  >
                    y
                  </text>

                  {/* Render Curve/Relation Path */}
                  {currentFnCase.renderPath(toFnSvgX, toFnSvgY)}

                  {/* Movable Vertical Test Line */}
                  <line
                    x1={toFnSvgX(fnOrNotTestX)}
                    y1={fnPad - 5}
                    x2={toFnSvgX(fnOrNotTestX)}
                    y2={fnSvgSize - fnPad + 5}
                    stroke="#dc2626"
                    strokeWidth="2.2"
                    strokeDasharray="4,3"
                  />

                  {/* Highlight Actual Intersections */}
                  {!activeIntersections.isInfinite &&
                    activeIntersections.points.map((pt, ptIdx) => (
                      <g key={`intersect-${ptIdx}`}>
                        <circle
                          cx={toFnSvgX(pt.x)}
                          cy={toFnSvgY(pt.y)}
                          r="5.5"
                          fill="#dc2626"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          x={toFnSvgX(pt.x) + 7}
                          y={toFnSvgY(pt.y) - 6}
                          fontSize="9"
                          fontWeight="black"
                          fill="#991b1b"
                          style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: '2.5px' }}
                        >
                          ({Math.round(pt.x * 100) / 100}, {Math.round(pt.y * 100) / 100})
                        </text>
                      </g>
                    ))}
                </svg>
              </div>

              {/* Slider and Live Intersection Status Indicator */}
              <div className="w-full space-y-2 pt-1 px-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Movable Vertical Line:</span>
                  <span className="font-mono text-rose-700 font-black bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                    x = {fnOrNotTestX}
                  </span>
                </div>

                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={fnOrNotTestX}
                  onChange={(e) => setFnOrNotTestX(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-ew-resize"
                />

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500 font-semibold">Intersections at x = {fnOrNotTestX}:</span>
                  {activeIntersections.isInfinite ? (
                    <span className="font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      Infinitely many points
                    </span>
                  ) : activeIntersections.points.length === 2 ? (
                    <span className="font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      2 intersections
                    </span>
                  ) : activeIntersections.points.length === 1 ? (
                    <span className="font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      1 intersection{activeIntersections.isTangent ? ' (tangent point)' : ''}
                    </span>
                  ) : (
                    <span className="font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      0 intersections
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Question, Classification & Explanations */}
            <div className="lg:col-span-6 space-y-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Visual Classification Task
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Does this graph represent y as a function of x?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Investigate with the vertical test line first, then select your classification.
                  </p>
                </div>

                {/* Function / Not a Function Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    disabled={fnOrNotFeedback === 'correct'}
                    onClick={() => {
                      setFnOrNotUserChoice('function');
                      if (fnOrNotFeedback === 'hint') setFnOrNotFeedback('idle');
                    }}
                    className={`p-4 rounded-xl border-2 font-black text-sm text-center transition-all cursor-pointer ${
                      fnOrNotUserChoice === 'function'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Function
                  </button>

                  <button
                    disabled={fnOrNotFeedback === 'correct'}
                    onClick={() => {
                      setFnOrNotUserChoice('not-function');
                      if (fnOrNotFeedback === 'hint') setFnOrNotFeedback('idle');
                    }}
                    className={`p-4 rounded-xl border-2 font-black text-sm text-center transition-all cursor-pointer ${
                      fnOrNotUserChoice === 'not-function'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Not a Function
                  </button>
                </div>

                {/* Check & Reset Controls */}
                <div className="flex items-center gap-3 pt-2">
                  {fnOrNotFeedback !== 'correct' && (
                    <button
                      disabled={fnOrNotUserChoice === null}
                      onClick={handleCheckFnOrNotAnswer}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        fnOrNotUserChoice !== null
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Check Answer
                    </button>
                  )}

                  <button
                    onClick={resetFnCase}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Case</span>
                  </button>
                </div>
              </div>

              {/* Hint on incorrect attempt */}
              {fnOrNotFeedback === 'hint' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Helpful Hint:</span>
                  </div>
                  <p className="leading-relaxed">
                    Slide the vertical line across the entire grid. Does ANY vertical line touch the graph at more than one point simultaneously? Remember: if a vertical line touches two or more points anywhere, the relation cannot be a function.
                  </p>
                </div>
              )}

              {/* Detailed Mathematical Explanation upon Success */}
              {fnOrNotFeedback === 'correct' && (
                <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Correct! {currentFnCase.isFunction ? 'Verified Function' : 'Verified Nonfunction'}</span>
                    </div>
                    <span className="font-mono text-xs font-black bg-white px-2.5 py-1 rounded-lg border border-emerald-300 text-emerald-900">
                      {currentFnCase.equation}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <div>
                      <strong className="text-emerald-950">Curve Name: </strong>
                      <span className="font-medium text-emerald-900">{currentFnCase.curveName}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-950">Domain: </strong>
                      <span className="font-mono text-emerald-900">{currentFnCase.domainStr}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-950">Range: </strong>
                      <span className="font-mono text-emerald-900">{currentFnCase.rangeStr}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800 font-medium">
                    {currentFnCase.explanation}
                  </p>

                  {currentFnCase.contrastNote && (
                    <div className="p-3 rounded-xl bg-white/80 border border-emerald-300 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-emerald-900 font-bold block mb-0.5">Key Mathematical Contrast:</strong>
                      {currentFnCase.contrastNote}
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="pt-3 flex items-center justify-between border-t border-emerald-200">
                    <span className="text-xs text-slate-500 font-semibold">
                      Attempts: {fnOrNotQuestionAttempts}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={fnOrNotCaseIdx === 0}
                        onClick={() => {
                          setFnOrNotCaseIdx((idx) => Math.max(0, idx - 1));
                          resetFnCase();
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          fnOrNotCaseIdx > 0
                            ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        Previous
                      </button>

                      {fnOrNotCaseIdx < FN_OR_NOT_CASES.length - 1 ? (
                        <button
                          onClick={() => {
                            setFnOrNotCaseIdx((idx) => idx + 1);
                            resetFnCase();
                          }}
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Next Graph</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setFnOrNotCaseIdx(0);
                            resetFnCase();
                          }}
                          className="px-4 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restart 10 Cases</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
