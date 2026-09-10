import { TopicData } from '../../types';

export const TOPIC_5_DILATIONS: TopicData = {
  id: 'dilations-similarity',
  number: 5,
  title: 'Dilations & Similarity',
  shortTitle: 'Dilations & Similarity',
  subtitle: 'Scale Factors, Coordinate Rules & Proportional Figures',
  gradeLevel: 'Grade 8 Mathematics',
  standards: 'TEKS 8.3.A, 8.3.B, 8.3.C, 8.10.D',
  unit: 'Unit 5: Dilations & Similarity',
  summary:
    'Master dilations on and off the coordinate plane, scale factors (k = image/pre-image), algebraic coordinate rules (x, y) → (kx, ky), angle preservation, proportional side lengths, and perimeter vs. area scaling.',
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
    'A dilation is a non-rigid transformation that changes the size of a geometric figure while strictly preserving its shape, producing similar figures. In Grade 8 TEKS mathematics, dilations are standardly centered at the origin (0, 0) on the coordinate plane. You will master finding the scale factor k = (image dimension) / (pre-image dimension), distinguishing between reductions (0 < k < 1) and enlargements (k > 1), applying the algebraic rule (x, y) → (kx, ky), recognizing that corresponding angles remain congruent while sides scale proportionally, and applying the critical distinction between perimeter scaling (multiplied by k) and area scaling (multiplied by k²).',
  concepts: [
    {
      id: 'dil-scale-factor-concept',
      title: 'A. What is a Dilation & Scale Factor (k)?',
      summary:
        'A dilation expands or shrinks a shape proportionally from a fixed center point by scale factor k.',
      ruleFormula: 'Scale Factor: k = Image Dimension / Pre-image Dimension',
      ruleExplanation:
        'Always place the new coordinate or side length in the numerator and original in the denominator: k = x\' / x = y\' / y. If k > 1, the shape enlarges; if 0 < k < 1, the shape reduces.',
      keyPoints: [
        'Dilations produce SIMILAR figures (same shape, different size).',
        'Scale factor k is the constant ratio of corresponding linear dimensions.',
        'Enlargement: k > 1 (e.g., k = 2, 2.5, 3).',
        'Reduction: 0 < k < 1 (e.g., k = 1/2, 3/4, 0.6).',
        'If k = 1, the image is congruent to the pre-image.',
      ],
      visualType: 'transformation-grid',
    },
    {
      id: 'dil-algebraic-rules-concept',
      title: 'B. Coordinate Plane Algebraic Rules',
      summary:
        'Represent dilations on the coordinate grid using standard algebraic mapping notation centered at (0, 0).',
      ruleFormula: '(x, y) → (kx, ky)',
      ruleExplanation:
        'Multiply BOTH coordinates by the same positive scale factor k. Never add numbers to coordinates during a dilation (adding creates a translation slide).',
      keyPoints: [
        'Both x and y are multiplied by the exact same scale factor k.',
        'Example: (x, y) → (2.5x, 2.5y) enlarges the pre-image by 2.5×.',
        'Example: (x, y) → (1/3 x, 1/3 y) reduces the pre-image to 1/3 size.',
        'Multiplying by different numbers (e.g., (2x, 3y)) distorts the shape and is NOT a dilation.',
      ],
      visualType: 'rule-cards',
    },
    {
      id: 'dil-properties-similarity-concept',
      title: 'C. Properties of Similar Figures & Angle Invariance',
      summary:
        'Identify which geometric properties are preserved and which change under dilations.',
      ruleFormula: '∠A ≅ ∠A\' (Congruent)  and  A\'B\' / AB = k (Proportional)',
      ruleExplanation:
        'Angles DO NOT scale or change! Corresponding angles of similar figures are always congruent. Corresponding side lengths are proportional.',
      keyPoints: [
        'Corresponding angles are CONGRUENT (equal degrees).',
        'Corresponding side lengths are PROPORTIONAL (form equal ratios equal to k).',
        'Orientation is preserved: vertices maintain clockwise or counterclockwise order.',
        'Corresponding line segments remain parallel to each other.',
      ],
      visualType: 'proportional-comparison',
    },
    {
      id: 'dil-perimeter-area-concept',
      title: 'D. Perimeter vs. Area Scaling (The k vs. k² Rule)',
      summary:
        'Linear measurements and perimeter scale by k, while two-dimensional area scales by k².',
      ruleFormula: 'Perimeter_new = k · (Original P)  |  Area_new = k² · (Original A)',
      ruleExplanation:
        'Because area is the product of two linear dimensions (length × width), multiplying each dimension by k multiplies the total area by k · k = k².',
      keyPoints: [
        '1D linear measures (sides, perimeter, radius, circumference) scale by k.',
        '2D surface measures (area) scale by k².',
        'If k = 3: perimeter is 3× original; area is 3² = 9× original.',
        'If k = 1/2: perimeter is 1/2 original; area is (1/2)² = 1/4 original.',
      ],
      visualType: 'rule-cards',
    },
  ],
  vocabulary: [
    {
      term: 'Dilation',
      definition:
        'A non-rigid geometric transformation that enlarges or reduces a figure proportionally from a fixed center point.',
      symbolOrFormula: '(x, y) → (kx, ky)',
      example: 'Dilating △ABC by k = 2 doubles all side lengths while keeping all angles identical.',
      tip: 'Remember: Dilations change size, but preserve shape!',
      category: 'Transformations',
    },
    {
      term: 'Scale Factor (k)',
      definition:
        'The constant ratio of any linear dimension in the image to the corresponding dimension in the pre-image.',
      symbolOrFormula: 'k = Image / Pre-image',
      example: 'If an original length of 4 units becomes 10 units, k = 10 / 4 = 2.5.',
      tip: 'Always put NEW (image) over OLD (pre-image).',
      category: 'Transformations',
    },
    {
      term: 'Center of Dilation',
      definition:
        'The fixed reference point from which all points are expanded or contracted. In Grade 8 TEKS, standardly the origin (0, 0).',
      symbolOrFormula: '(0, 0)',
      example: 'All projection rays connecting pre-image vertices to image vertices meet at the origin.',
      tip: 'Connect corresponding vertices with straight lines to find the center.',
      category: 'Coordinate Geometry',
    },
    {
      term: 'Similar Figures',
      definition:
        'Figures that have the exact same shape, congruent corresponding angles, and proportional corresponding side lengths.',
      symbolOrFormula: '△ABC ~ △A\'B\'C\'',
      example: 'Two triangles with angles 40°, 60°, 80° but different side lengths are similar.',
      tip: 'The tilde symbol ~ means "is similar to".',
      category: 'Geometry',
    },
    {
      term: 'Enlargement',
      definition:
        'A dilation where the image is strictly larger than the pre-image, resulting from a scale factor greater than 1.',
      symbolOrFormula: 'k > 1',
      example: 'A scale factor of k = 3 or k = 1.5 produces an enlargement.',
      tip: 'If k > 1, the shape grows.',
      category: 'Transformations',
    },
    {
      term: 'Reduction',
      definition:
        'A dilation where the image is strictly smaller than the pre-image, resulting from a scale factor between 0 and 1.',
      symbolOrFormula: '0 < k < 1',
      example: 'A scale factor of k = 1/2, 3/4, or 0.8 produces a reduction.',
      tip: 'If 0 < k < 1, the shape shrinks.',
      category: 'Transformations',
    },
    {
      term: 'Area Scale Factor',
      definition:
        'The square of the linear scale factor, representing how many times larger or smaller the two-dimensional area becomes.',
      symbolOrFormula: 'k²',
      example: 'If k = 4, the area expands by 4² = 16 times.',
      tip: 'Never multiply area by k; always multiply by k²!',
      category: 'Measurement',
    },
  ],
  workedExamples: [
    {
      id: 'ex-finding-scale-factor',
      title: 'Example 1: Finding Scale Factor from Ordered Pairs',
      problem:
        'Triangle ABC is dilated with the origin as center of dilation to create △A\'B\'C\'. Pre-image vertex A is at (3, 6) and image vertex A\' is at (7.5, 15). What is the scale factor, and is it a reduction or enlargement?',
      given: 'A(3, 6), A\'(7.5, 15), Center = (0, 0)',
      strategy:
        'Use the scale factor formula k = (image coordinate) / (pre-image coordinate) for both x and y. Compare k to 1.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate the x-coordinate ratio',
          explanation: 'Divide the image x\' coordinate by the pre-image x coordinate.',
          mathDetail: 'k = x\' / x = 7.5 / 3 = 2.5',
        },
        {
          stepNumber: 2,
          title: 'Verify with the y-coordinate ratio',
          explanation: 'Divide the image y\' coordinate by the pre-image y coordinate to confirm consistency.',
          mathDetail: 'k = y\' / y = 15 / 6 = 2.5',
        },
        {
          stepNumber: 3,
          title: 'Classify as Enlargement or Reduction',
          explanation: 'Since k = 2.5 is strictly greater than 1 (k > 1), the transformation expands the figure.',
          mathDetail: 'k = 2.5 > 1 → Enlargement',
        },
      ],
      conclusion: 'The scale factor is k = 2.5, and the dilation is an enlargement.',
      teacherTip:
        'Always check both the x and y coordinates to ensure you did not make an arithmetic error.',
      commonMistake:
        'Putting the pre-image over the image (3 / 7.5 = 0.4). Remember: IMAGE goes on TOP.',
    },
    {
      id: 'ex-coordinate-rule-application',
      title: 'Example 2: Applying an Algebraic Coordinate Rule',
      problem:
        'Rectangle PQRS has vertices at P(2, 4), Q(8, 4), R(8, 2), and S(2, 2). The rectangle is dilated by the rule (x, y) → (0.5x, 0.5y). Find the coordinates of image vertex Q\' and calculate the side lengths of PQ and P\'Q\'.',
      given: 'Rule: (x, y) → (0.5x, 0.5y) | Vertex Q(8, 4)',
      strategy:
        'Multiply each coordinate of vertex Q by k = 0.5 to find Q\'. Find horizontal distance for length.',
      steps: [
        {
          stepNumber: 1,
          title: 'Apply rule to vertex Q',
          explanation: 'Multiply x = 8 and y = 4 by 0.5.',
          mathDetail: 'Q\' = (8 · 0.5, 4 · 0.5) = (4, 2)',
        },
        {
          stepNumber: 2,
          title: 'Find length of pre-image side PQ',
          explanation: 'P is at (2, 4) and Q is at (8, 4). The horizontal distance is 8 - 2 = 6 units.',
          mathDetail: 'Length PQ = 8 - 2 = 6 units',
        },
        {
          stepNumber: 3,
          title: 'Find length of image side P\'Q\'',
          explanation: 'P\' is at (1, 2) and Q\' is at (4, 2). The horizontal distance is 4 - 1 = 3 units.',
          mathDetail: 'Length P\'Q\' = 4 - 1 = 3 units (or 6 · 0.5 = 3 units)',
        },
      ],
      conclusion: 'Vertex Q\' is located at (4, 2), and side P\'Q\' has a length of 3 units.',
      teacherTip:
        'A scale factor of 0.5 cuts all side lengths exactly in half.',
      commonMistake:
        'Subtracting 0.5 from coordinates instead of multiplying by 0.5.',
    },
    {
      id: 'ex-perimeter-vs-area',
      title: 'Example 3: Comparing Perimeter and Area Under Dilation',
      problem:
        'A triangle has a perimeter of 18 cm and an area of 12 cm². If the triangle is dilated by a scale factor of k = 3, what are the perimeter and area of the dilated triangle?',
      given: 'Original Perimeter = 18 cm | Original Area = 12 cm² | k = 3',
      strategy:
        'Perimeter scales linearly by k: New P = k · P. Area scales quadratically by k²: New A = k² · A.',
      steps: [
        {
          stepNumber: 1,
          title: 'Calculate Dilated Perimeter',
          explanation: 'Multiply original perimeter directly by scale factor k = 3.',
          mathDetail: 'New Perimeter = 18 · 3 = 54 cm',
        },
        {
          stepNumber: 2,
          title: 'Calculate Area Scale Factor (k²)',
          explanation: 'Square the scale factor k to find the multiplier for area.',
          mathDetail: 'Area Multiplier = k² = 3² = 9',
        },
        {
          stepNumber: 3,
          title: 'Calculate Dilated Area',
          explanation: 'Multiply original area by 9.',
          mathDetail: 'New Area = 12 · 9 = 108 cm²',
        },
      ],
      conclusion: 'The new perimeter is 54 cm, and the new area is 108 cm².',
      teacherTip:
        'Remember the units: perimeter is 1D (cm), area is 2D (cm²). That is why area uses k²!',
      commonMistake:
        'Multiplying area by 3 instead of 3² (9). Area changes much faster than perimeter!',
    },
  ],
  videoLesson: {
    title: 'Unit 5 Video Library: Dilations & Similarity',
    subtitle: '8th Grade TEKS Aligned Video Lessons & Real-World Visual Walkthroughs',
    instructor: 'Edgar Pinilla · 8th Grade Math Video Library',
    duration: '4 Comprehensive Video Lessons',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/8xg-kCrkG1Q',
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=8xg-kCrkG1Q',
    description:
      'Explore scale factors, coordinate plane dilations from the origin, similar figures, and perimeter vs. area scaling with engaging visual math demonstrations.',
    keyTakeaways: [
      'Scale factor k is always image over pre-image: k = image / pre-image.',
      'Dilations multiply both coordinates by the same factor: (x, y) → (kx, ky).',
      'Angles never change size under a dilation; only side lengths, perimeter, and area scale.',
      'Perimeter changes by k; area changes by k².',
    ],
    lessons: [
      {
        id: 'lesson-dilations-scale-factor',
        title: 'Scale Factor & Dilations Explained',
        subtitle: 'Dilations and Scale Factor | 8th Grade Math Pre-Algebra',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/8xg-kCrkG1Q',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=8xg-kCrkG1Q',
        description:
          'Learn the definition of dilation, how to calculate scale factor k, and how to tell whether a transformation is a reduction or an enlargement.',
        badge: 'Scale Factor',
      },
      {
        id: 'lesson-dilations-coordinate-plane',
        title: 'Dilations on the Coordinate Plane',
        subtitle: 'Dilations on the Coordinate Plane | 8th Grade Math Pre-Algebra',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/ahvUIQ1EINo',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=ahvUIQ1EINo',
        description:
          'Master applying the algebraic rule (x, y) → (kx, ky) to plot dilated vertices accurately on a coordinate grid.',
        badge: 'Coordinate Plane',
      },
      {
        id: 'lesson-dilations-similarity-proportions',
        title: 'Similar Figures & Proportions',
        subtitle: 'Applying Relationships of Similar Figures | 8th Grade Math Pre-Algebra',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/lx9Px0Tn5R4',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=lx9Px0Tn5R4',
        description:
          'Discover why corresponding angles remain congruent and how to set up proportions to solve for missing side lengths.',
        badge: 'Similar Figures',
      },
      {
        id: 'lesson-dilations-perimeter-area',
        title: 'Perimeter and Area of Similar Figures',
        subtitle: 'Dilations and Measurements | 8th Grade Math – Geometry',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/0TVqlIPlbfE',
        youtubeWatchUrl: 'https://www.youtube.com/watch?v=0TVqlIPlbfE',
        description:
          'Compare linear 1D changes (perimeter × k) with 2D quadratic changes (area × k²) using clear visual area models.',
        badge: 'Perimeter vs. Area',
      },
    ],
  },
  practiceApp: {
    buttonText: 'Practice Dilations & Similarity',
    appTitle: 'Dilations & Similarity Practice Lab',
    placeholderUrl: 'https://dilations-similarity-practice-lab.edgarpinilla.workers.dev',
    appDescription:
      'Interactive laboratory to test your mastery of scale factors, algebraic coordinate rules (x, y) → (kx, ky), similar figure properties, and perimeter vs. area scaling.',
    features: [
      'Scale factors: k = image / pre-image',
      'Coordinate rules: (x, y) → (kx, ky)',
      'Angle congruence and side proportions',
      'Perimeter (k) vs. Area (k²) scaling rules',
      'Real-world scale models and shadow indirect measurement',
    ],
    estimatedTime: '15-20 min',
    quizQuestions: [
      // Question 1: Foundational Geometric Property (Corresponding Angles & Similarity Invariance)
      {
        id: 'dil-sc-q1',
        category: 'similarity-properties',
        question:
          'Triangle ABC is dilated by a scale factor of k = 3 to create similar triangle A\'B\'C\'. If the measure of angle A is 52° and the measure of angle B is 68°, what is the measure of angle A\'?',
        options: ['156°', '52°', '60°', '17.3°'],
        correctIndex: 1,
        explanation:
          'Dilations create similar figures where corresponding angle measures are preserved (congruent). Although side lengths are multiplied by the scale factor k = 3, angle measures never change! Therefore, m∠A\' = m∠A = 52°.',
        hint: 'Dilations change size but preserve shape: corresponding angles stay equal (congruent), so you do NOT multiply angle measures by the scale factor.',
      },

      // Question 2: Algebraic Dilation Rule Centered at Origin (x, y) → (kx, ky)
      {
        id: 'dil-sc-q2',
        category: 'algebraic-rules',
        question:
          'Under a dilation centered at the origin (0, 0), vertex P(4, -6) is mapped to image vertex P\'(10, -15). Which algebraic rule represents this dilation?',
        options: [
          '(x, y) → (2.5x, 2.5y)',
          '(x, y) → (x + 6, y - 9)',
          '(x, y) → (0.4x, 0.4y)',
          '(x, y) → (2.5x, -2.5y)',
        ],
        correctIndex: 0,
        explanation:
          'To find the scale factor k, divide the image coordinate by the pre-image coordinate: k = 10 / 4 = 2.5 (and -15 / -6 = 2.5). For a dilation centered at the origin, the algebraic rule multiplies each coordinate by k: (x, y) → (2.5x, 2.5y).',
        hint: 'Find the scale factor k by dividing the image coordinate by the pre-image coordinate: 10 ÷ 4 = 2.5. Then write the dilation rule as (x, y) → (kx, ky).',
      },

      // Question 3: Linear Measurement Scaling (Perimeter / Length Scaling by k)
      {
        id: 'dil-sc-q3',
        category: 'perimeter-scaling',
        question:
          'Rectangle ABCD has a perimeter of 32 centimeters. If the rectangle is dilated by a scale factor of k = 2.5 to create rectangle A\'B\'C\'D\', what is the perimeter of the new rectangle?',
        options: ['34.5 cm', '12.8 cm', '80 cm', '200 cm'],
        correctIndex: 2,
        explanation:
          'Under any dilation with scale factor k, all linear measurements—including side lengths and perimeter—scale by multiplying directly by k. Therefore, New Perimeter = Original Perimeter · k = 32 cm · 2.5 = 80 cm.',
        hint: 'Perimeter is a one-dimensional linear measure, so it scales directly by the scale factor k: New Perimeter = Original Perimeter × k.',
      },

      // Question 4: Dilation with Center of Dilation NOT at the Origin (Center C(2, 1))
      {
        id: 'dil-sc-q4',
        category: 'non-origin-dilation',
        question:
          'Point P(4, 3) is dilated by a scale factor of k = 2 with the center of dilation at C(2, 1). What are the coordinates of the dilated image point P\'?',
        options: ['(8, 6)', '(6, 5)', '(6, 7)', '(4, 5)'],
        correctIndex: 1,
        explanation:
          'Because the center of dilation is C(2, 1) rather than the origin (0, 0), measure the distance from C to P:\n• Horizontal change from C(2, 1) to P(4, 3): 4 - 2 = 2 units right.\n• Vertical change from C(2, 1) to P(4, 3): 3 - 1 = 2 units up.\nMultiply each distance by scale factor k = 2:\n• New horizontal distance: 2 · 2 = 4 units right from C(2, 1) → x\' = 2 + 4 = 6.\n• New vertical distance: 2 · 2 = 4 units up from C(2, 1) → y\' = 1 + 4 = 5.\nTherefore, P\' has coordinates (6, 5). (Note: (8, 6) is the common misconception of multiplying by 2 from the origin).',
        hint: 'The center of dilation is C(2, 1), not the origin! Find the horizontal and vertical distances from C(2, 1) to P(4, 3) (2 right, 2 up). Multiply those distances by k = 2 (4 right, 4 up), then count from C(2, 1).',
      },

      // Question 5: Area Scaling using k² (Quadratic 2D Scaling)
      {
        id: 'dil-sc-q5',
        category: 'area-scaling',
        question:
          'A photograph has an area of 24 square inches. If the photograph is enlarged by a dilation with a scale factor of k = 3, what is the area of the enlarged photograph?',
        options: ['72 sq in', '96 sq in', '33 sq in', '216 sq in'],
        correctIndex: 3,
        explanation:
          'When any two-dimensional figure is dilated by a scale factor of k, its area scales by k²: New Area = Original Area · k² = 24 · 3² = 24 · 9 = 216 square inches. (Remember: perimeter scales by k, but area scales by k²!).',
        hint: 'Area is two-dimensional. When a figure is dilated by scale factor k, its area changes by k² (scale factor squared). Calculate 3² = 9, then multiply by the original area 24.',
      },

      // Question 6: Real-World Scale Factor Application (Indirect Measurement Proportion)
      {
        id: 'dil-sc-q6',
        category: 'real-world',
        question:
          'A 5-foot tall student casts a 2-foot shadow on the playground. At the exact same time, a nearby tree casts an 18-foot shadow. How tall is the tree?',
        options: ['45 feet', '36 feet', '50 feet', '7.2 feet'],
        correctIndex: 0,
        explanation:
          'The angle of the sun creates similar right triangles between objects and their shadows. Find the scale factor between shadow lengths: k = 18 ft ÷ 2 ft = 9. Multiplying the student\'s height by the scale factor gives the tree\'s height: 5 ft · 9 = 45 feet. (Or solve the proportion: h / 18 = 5 / 2 → 2h = 90 → h = 45 ft).',
        hint: 'Find the scale factor between the shadows (18 ÷ 2 = 9). Since the sun creates similar right triangles, multiply the student\'s height by 9.',
      },
    ],
  },
};
