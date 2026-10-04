import { TopicData } from '../../types';

export const TOPIC_7_ANGLE_RELATIONSHIPS: TopicData = {
  id: 'angle-relationships-parallel-lines-triangles',
  number: 7,
  title: 'Angle Relationships in Parallel Lines and Triangles',
  shortTitle: 'Angle Relationships',
  subtitle: 'Parallel Lines Cut by a Transversal, Triangle Angle Theorems & AA Similarity',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.8D',
  unit: 'Module 7: Angle Relationships in Parallel Lines & Triangles',
  summary:
    'Use informal arguments to establish facts about angles created when parallel lines are cut by a transversal (7.1), the interior angle sum and exterior angles of triangles (7.2), and the Angle-Angle (AA) criterion for similarity of triangles (7.3).',
  themeColor: {
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    gradient: 'from-indigo-600 via-violet-600 to-purple-700',
  },
  learnOverview:
    'In Module 7 (Primary TEKS 8.8D), you will investigate geometric angle relationships across three connected lessons: Lesson 7.1 examines the eight angles formed when two parallel lines are intersected by a transversal line, establishing which angle pairs are congruent (equal) and which are supplementary (sum to 180°). Lesson 7.2 explores the Triangle Sum Theorem (interior angles of a triangle always sum to 180°) and the Exterior Angle Theorem (an exterior angle equals the sum of its two remote interior angles). Lesson 7.3 connects angle relationships to proportional geometry through the Angle-Angle (AA) Similarity Criterion, proving that two triangles are similar whenever two pairs of corresponding angles are congruent.',
  concepts: [
    {
      id: 'lesson-7-1-parallel-transversal',
      title: 'Lesson 7.1: Parallel Lines Cut by a Transversal — Congruent & Supplementary Pairs',
      summary:
        'When a transversal line intersects two parallel lines, eight angles are formed. Every pair of angles is either congruent (equal in measure) or supplementary (adding up to 180°).',
      ruleFormula:
        'Congruent: m∠A = m∠B  |  Supplementary: m∠A + m∠B = 180°',
      ruleExplanation:
        'Corresponding, Alternate Interior, Alternate Exterior, and Vertical angles are CONGRUENT. Same-Side Interior and Adjacent Linear Pair angles are SUPPLEMENTARY (sum = 180°).',
      keyPoints: [
        'Parallel Lines & Transversal: Parallel lines never intersect; a transversal is a line that crosses two or more lines.',
        'Corresponding Angles (Congruent): Occupy the same relative corner position at each intersection.',
        'Alternate Interior Angles (Congruent): Inside the parallel lines on opposite sides of the transversal.',
        'Alternate Exterior Angles (Congruent): Outside the parallel lines on opposite sides of the transversal.',
        'Same-Side Interior Angles (Supplementary): Inside the parallel lines on the same side of the transversal; sum to 180°.',
        'Vertical Angles (Congruent) & Linear Pairs (Supplementary): Opposite angles at one vertex are equal; adjacent angles on a straight line sum to 180°.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'lesson-7-2-triangle-angle-theorems',
      title: 'Lesson 7.2: Angle Theorems for Triangles — Triangle Sum & Exterior Angle Theorems',
      summary:
        'Establish and apply the Triangle Sum Theorem for interior angles and the Exterior Angle Theorem for remote interior angles using algebraic equations.',
      ruleFormula:
        'Triangle Sum: m∠A + m∠B + m∠C = 180°  |  Exterior Angle: m∠Exterior = m∠A + m∠B',
      ruleExplanation:
        'The three interior angles of any triangle always sum to 180°. An exterior angle formed by extending one side of a triangle equals the sum of the two non-adjacent (remote) interior angles.',
      keyPoints: [
        'Triangle Sum Theorem: The measures of the three interior angles of a triangle always add up to 180°.',
        'Finding Missing Interior Angles: Subtract the sum of the two known interior angles from 180°.',
        'Exterior Angles of Triangles: Formed between one side of a triangle and the extension of an adjacent side.',
        'Exterior Angle Theorem: m∠4 = m∠1 + m∠2 (the exterior angle equals the sum of its two remote interior angles).',
        'Algebraic Equations: Set the sum of interior angle expressions equal to 180°, or set the exterior angle expression equal to the sum of the two remote interior expressions.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'lesson-7-3-aa-similarity',
      title: 'Lesson 7.3: Angle-Angle (AA) Similarity Criterion for Triangles',
      summary:
        'Determine whether two triangles are similar by comparing their interior angle measures using the Angle-Angle (AA) Similarity Criterion.',
      ruleFormula:
        'If ∠A ≅ ∠D and ∠B ≅ ∠E, then △ABC ~ △DEF',
      ruleExplanation:
        'Because the interior angles of any triangle sum to 180°, knowing that two pairs of corresponding angles are congruent guarantees that the third pair of angles is also congruent.',
      keyPoints: [
        'Similar Triangles (~): Have the exact same shape with congruent corresponding angles and proportional side lengths.',
        'Angle-Angle (AA) Similarity Criterion: If two angles of one triangle are congruent to two angles of another triangle, the triangles are similar.',
        'Finding the Third Angle First: When given different angle pairs in two triangles, use 180° - (∠1 + ∠2) to find the missing third angle and check if two pairs match.',
        'Embedded Parallel Line Triangles: Parallel lines inside or across triangles create congruent corresponding or alternate interior angles, proving AA similarity.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'Parallel Lines',
      definition:
        'Two lines in the same plane that never intersect and remain the exact same distance apart.',
      symbolOrFormula: 'Line l ∥ Line m',
      example: 'Railroad tracks or opposite edges of a coordinate grid represent parallel lines.',
      tip: 'Look for matching arrow symbols on the lines in geometry diagrams to confirm they are parallel!',
      category: 'Lesson 7.1',
    },
    {
      term: 'Transversal',
      definition:
        'A line that intersects two or more coplanar lines at distinct points, creating eight angles when crossing two parallel lines.',
      symbolOrFormula: 'Line t intersecting l and m',
      example: 'When line t crosses parallel lines l and m, it forms 4 angles at the top intersection and 4 angles at the bottom intersection.',
      tip: '"Trans-" means "across" — a transversal cuts across the parallel lines.',
      category: 'Lesson 7.1',
    },
    {
      term: 'Corresponding Angles',
      definition:
        'Angles that occupy the same relative position at each intersection where a transversal crosses two parallel lines. When lines are parallel, corresponding angles are congruent.',
      symbolOrFormula: 'm∠1 = m∠5, m∠2 = m∠6, m∠3 = m∠7, m∠4 = m∠8',
      example: 'If the top-left angle at the first intersection is 115°, the top-left angle at the second intersection is also 115°.',
      tip: 'Slide one intersection straight along the transversal onto the other — the angles that land on top of each other are corresponding!',
      category: 'Lesson 7.1',
    },
    {
      term: 'Alternate Interior Angles',
      definition:
        'Non-adjacent angles that lie between (inside) the two parallel lines on opposite sides of the transversal. They are congruent.',
      symbolOrFormula: 'm∠3 = m∠6 and m∠4 = m∠5',
      example: 'If interior angle ∠3 is 65°, then alternate interior angle ∠6 on the opposite side of the transversal is also 65°.',
      tip: 'Trace a "Z" or backward "Z" along the parallel lines and transversal — the angles tucked inside the corners of the Z are alternate interior!',
      category: 'Lesson 7.1',
    },
    {
      term: 'Alternate Exterior Angles',
      definition:
        'Angles that lie outside the two parallel lines on opposite sides of the transversal. When lines are parallel, alternate exterior angles are congruent.',
      symbolOrFormula: 'm∠1 = m∠8 and m∠2 = m∠7',
      example: 'If exterior angle ∠1 is 120°, then alternate exterior angle ∠8 is also 120°.',
      tip: '"Exterior" = outside the parallel tracks; "Alternate" = opposite sides of the transversal.',
      category: 'Lesson 7.1',
    },
    {
      term: 'Same-Side Interior Angles',
      definition:
        'Angles that lie between (inside) the two parallel lines on the same side of the transversal (also called consecutive interior angles). They are supplementary.',
      symbolOrFormula: 'm∠3 + m∠5 = 180° and m∠4 + m∠6 = 180°',
      example: 'If one same-side interior angle is 70°, the other is 180° - 70° = 110°.',
      tip: 'They form a "C" or "U" shape between the parallel lines — one is acute and one is obtuse, so they add to 180°!',
      category: 'Lesson 7.1',
    },
    {
      term: 'Vertical Angles & Supplementary Angles',
      definition:
        'Vertical angles are opposite angles formed by two intersecting lines (always congruent). Supplementary angles are two angles whose measures add up to 180° (such as a linear pair on a straight line).',
      symbolOrFormula: 'Vertical: m∠1 = m∠4  |  Supplementary: m∠1 + m∠2 = 180°',
      example: 'If ∠1 = 130°, its vertical angle ∠4 = 130°, and its adjacent supplementary angle ∠2 = 50°.',
      tip: 'Vertical angles form an "X" (equal); adjacent angles on a straight line form a "half-circle" (180°).',
      category: 'Lesson 7.1',
    },
    {
      term: 'Triangle Sum Theorem',
      definition:
        'A geometric theorem stating that the sum of the measures of the three interior angles of any triangle is always 180°.',
      symbolOrFormula: 'm∠A + m∠B + m∠C = 180°',
      example: 'In △ABC, if m∠A = 55° and m∠B = 75°, then m∠C = 180° - (55° + 75°) = 50°.',
      tip: 'Every triangle — whether acute, right, or obtuse — always totals exactly 180° inside!',
      category: 'Lesson 7.2',
    },
    {
      term: 'Exterior Angle Theorem',
      definition:
        'A theorem stating that the measure of an exterior angle of a triangle is equal to the sum of the measures of its two remote (non-adjacent) interior angles.',
      symbolOrFormula: 'm∠Exterior = m∠Remote₁ + m∠Remote₂',
      example: 'If the two remote interior angles of a triangle measure 48° and 67°, the exterior angle measures 48° + 67° = 115°.',
      tip: 'Shortcut: Add the two far-away inside angles to get the outside angle directly!',
      category: 'Lesson 7.2',
    },
    {
      term: 'Angle-Angle (AA) Similarity Criterion',
      definition:
        'If two angles of one triangle are congruent to two angles of another triangle, then the two triangles are similar (~).',
      symbolOrFormula: 'If ∠A ≅ ∠D and ∠B ≅ ∠E, then △ABC ~ △DEF',
      example: 'Triangle 1 has angles 40° and 85°. Triangle 2 has angles 40° and 55°. Since 180° - (40° + 85°) = 55°, both triangles have angles 40°, 55°, 85° and are similar!',
      tip: 'Always calculate the missing third angle first before deciding if two triangles are similar!',
      category: 'Lesson 7.3',
    },
  ],
  workedExamples: [
    {
      id: 'ex-7-1-transversal',
      title: 'Lesson 7.1 Example: Finding Missing Angle Measures with Parallel Lines',
      problem:
        'Parallel lines l and m are cut by transversal t. One alternate interior angle measures (3x + 15)° and the other alternate interior angle measures (5x - 25)°. Find the value of x and the measure of each angle.',
      given: 'Line l ∥ Line m | Alternate Interior Angles: (3x + 15)° and (5x - 25)°',
      strategy:
        'Alternate interior angles formed by parallel lines are congruent (equal). Set the two algebraic expressions equal to each other, solve for x, and substitute x back into the angle expression.',
      steps: [
        {
          stepNumber: 1,
          title: 'Identify the Angle Relationship',
          explanation:
            'Because the angles are alternate interior angles between parallel lines, their measures are equal.',
          mathDetail: '3x + 15 = 5x - 25',
        },
        {
          stepNumber: 2,
          title: 'Solve the Linear Equation for x',
          explanation:
            'Subtract 3x from both sides and add 25 to both sides.',
          mathDetail: '15 = 2x - 25\n40 = 2x\nx = 20',
        },
        {
          stepNumber: 3,
          title: 'Substitute x = 20 to Find the Angle Measure',
          explanation:
            'Substitute x = 20 into either angle expression and verify both match.',
          mathDetail: 'Angle 1: 3(20) + 15 = 60 + 15 = 75°\nAngle 2: 5(20) - 25 = 100 - 25 = 75°',
        },
      ],
      conclusion: 'The value of x is 20, and each alternate interior angle measures 75°.',
      teacherTip:
        'Before writing your equation, always ask: "Are these two angles EQUAL (both acute / both obtuse) or do they ADD TO 180° (one acute + one obtuse)?"',
      commonMistake:
        'Adding alternate interior angles to 180° instead of setting them equal. Only same-side interior and linear pairs add to 180°!',
    },
    {
      id: 'ex-7-2-exterior-angle',
      title: 'Lesson 7.2 Example: Applying the Exterior Angle Theorem',
      problem:
        'In △PQR, side QR is extended to point S to form exterior angle ∠PRS. The remote interior angles measure m∠P = (2x + 8)° and m∠Q = (x + 16)°, and the exterior angle measures m∠PRS = 114°. Find the value of x and m∠P.',
      given: 'Remote Interior Angles: ∠P = (2x + 8)°, ∠Q = (x + 16)° | Exterior Angle: ∠PRS = 114°',
      strategy:
        'By the Exterior Angle Theorem, the measure of the exterior angle equals the sum of the two remote interior angles: m∠P + m∠Q = m∠PRS.',
      steps: [
        {
          stepNumber: 1,
          title: 'Set Up the Exterior Angle Equation',
          explanation:
            'Add the two remote interior angle expressions and set them equal to 114°.',
          mathDetail: '(2x + 8) + (x + 16) = 114',
        },
        {
          stepNumber: 2,
          title: 'Combine Like Terms and Solve for x',
          explanation:
            'Combine 2x + x = 3x and 8 + 16 = 24, then isolate x.',
          mathDetail: '3x + 24 = 114\n3x = 90\nx = 30',
        },
        {
          stepNumber: 3,
          title: 'Calculate m∠P and Verify',
          explanation:
            'Substitute x = 30 into m∠P = (2x + 8)° and m∠Q = (x + 16)°.',
          mathDetail: 'm∠P = 2(30) + 8 = 68°\nm∠Q = 30 + 16 = 46°\nCheck: 68° + 46° = 114° ✔',
        },
      ],
      conclusion: 'x = 30, and the measure of interior angle ∠P is 68°.',
      teacherTip:
        'You can also find the adjacent interior angle ∠PRQ right away: 180° - 114° = 66°.',
      commonMistake:
        'Setting (2x + 8) + (x + 16) + 114 = 180. Remember that 114° is the exterior angle outside the triangle, not the third interior angle!',
    },
    {
      id: 'ex-7-3-aa-similarity',
      title: 'Lesson 7.3 Example: Testing Triangle Similarity with the AA Criterion',
      problem:
        'Triangle ABC has interior angles m∠A = 42° and m∠B = 63°. Triangle DEF has interior angles m∠D = 42° and m∠F = 75°. Determine whether △ABC and △DEF are similar.',
      given: '△ABC: ∠A = 42°, ∠B = 63° | △DEF: ∠D = 42°, ∠F = 75°',
      strategy:
        'Use the Triangle Sum Theorem (180°) to find the third angle of △ABC (m∠C). Then check whether two pairs of corresponding angles are congruent.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate the Missing Angle m∠C in △ABC',
          explanation:
            'Subtract the two given angles of △ABC from 180°.',
          mathDetail: 'm∠C = 180° - (42° + 63°) = 180° - 105° = 75°',
        },
        {
          stepNumber: 2,
          title: 'Compare the Interior Angles of Both Triangles',
          explanation:
            'Check if two pairs of angles match between △ABC and △DEF.',
          mathDetail: 'm∠A = 42° and m∠D = 42° (First congruent pair)\nm∠C = 75° and m∠F = 75° (Second congruent pair)',
        },
        {
          stepNumber: 3,
          title: 'Apply the Angle-Angle (AA) Similarity Criterion',
          explanation:
            'Since two pairs of corresponding angles are congruent, the triangles are similar.',
          mathDetail: '△ABC ~ △DEF by the AA Similarity Criterion',
        },
      ],
      conclusion:
        'Yes, △ABC ~ △DEF because both triangles have interior angles measuring 42°, 63°, and 75°.',
      teacherTip:
        'Never assume two triangles are not similar just because the given numbers look different at first glance—always solve for the third angle!',
      commonMistake:
        'Concluding that 63° ≠ 75° means the triangles are not similar without checking the third angle first.',
    },
  ],
  videoLesson: {
    title: 'Video Library: Module 7 — Angle Relationships in Parallel Lines and Triangles',
    subtitle:
      'Classroom Video Walkthroughs for Lessons 7.1, 7.2, and 7.3 (TEKS 8.8D)',
    instructor: 'Mr. Edgar Pinilla',
    description:
      'Watch step-by-step instructional lessons covering parallel lines cut by a transversal (7.1), interior and exterior triangle angle theorems (7.2), and Angle-Angle similarity (7.3).',
    lessons: [
      {
        id: 'mod7-lesson-7-1',
        title: 'Lesson 7.1: Parallel Lines Cut by a Transversal',
        subtitle:
          'Corresponding, Alternate Interior, Alternate Exterior & Same-Side Interior Angles',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/SrgMKMZwIYI',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=SrgMKMZwIYI',
        description:
          'Learn how to identify all 8 angle relationships when parallel lines are cut by a transversal and solve for unknown angle measures.',
        badge: 'Lesson 7.1',
      },
      {
        id: 'mod7-lesson-7-2',
        title: 'Lesson 7.2: Angle Theorems for Triangles',
        subtitle: 'Triangle Sum Theorem (180°) & Exterior Angle Theorem',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/PsJLmx8N0-c',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=PsJLmx8N0-c',
        description:
          'Master finding missing interior and exterior angles in triangles using informal geometric arguments and linear equations.',
        badge: 'Lesson 7.2',
      },
      {
        id: 'mod7-lesson-7-3',
        title: 'Lesson 7.3: Angle-Angle (AA) Similarity',
        subtitle: 'Proving Triangles are Similar Using Angle Relationships',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/XmIJv5Ew7Kc',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=XmIJv5Ew7Kc',
        description:
          'Use the Angle-Angle (AA) similarity criterion to determine whether two triangles are similar.',
        badge: 'Lesson 7.3',
      },
    ],
    keyTakeaways: [
      'Lesson 7.1: When parallel lines are cut by a transversal, all acute angles are equal, all obtuse angles are equal, and any acute + obtuse pair sums to 180°.',
      'Lesson 7.2: The three interior angles of a triangle sum to 180°, and any exterior angle equals the sum of its two remote interior angles.',
      'Lesson 7.3: By the Angle-Angle (AA) criterion, two triangles are similar whenever two pairs of corresponding angles are congruent.',
    ],
  },
  practiceApp: {
    buttonText: 'Explore Angle Relationships Lab',
    appTitle: 'Angle Relationships in Parallel Lines & Triangles Lab',
    placeholderUrl: '#angle-relationships-practice-lab',
    appDescription:
      'Launch the interactive Module 7 geometry simulator to explore parallel lines cut by a transversal (7.1), interior & exterior triangle equations (7.2), and Angle-Angle similarity (7.3)!',
    features: [
      'Lesson 7.1 Interactive Parallel Lines & Transversal Explorer',
      'Lesson 7.2 Triangle Sum & Exterior Angle Equation Sandbox',
      'Lesson 7.3 Angle-Angle (AA) Similarity Criterion Tester',
      'TEKS 8.8D Visual Diagrams & Step-by-Step Justifications',
    ],
    estimatedTime: '15-20 minutes',
    quizQuestions: [],
  },
};
