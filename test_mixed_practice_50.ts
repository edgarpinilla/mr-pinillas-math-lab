// test_mixed_practice_50.ts
// Test simulation verifying 50 Mixed Practice selections across 5 complete cycles

import {
  generateProblemBySkill,
  resetMixedPracticeCycle,
  MIXED_PRACTICE_CANONICAL_SKILLS,
  toCanonicalSkillId,
  CanonicalSkillId,
} from './src/data/dilationsPracticeGenerator';

const EXPECTED_10_SKILLS: CanonicalSkillId[] = [
  'scale-factor',
  'size-changes',
  'origin-dilations',
  'non-origin-center',
  'algebraic-rules',
  'similar-figures',
  'perimeter',
  'area',
  'scale-drawings',
  'shadow-proportions',
];

console.log('===============================================================');
console.log('STARTING 50-SELECTION DETERMINISTIC TEST FOR MIXED PRACTICE');
console.log('===============================================================');

// Reset to ensure a clean cycle starting state
resetMixedPracticeCycle();

const selections: { index: number; canonicalId: CanonicalSkillId; title: string }[] = [];

for (let i = 1; i <= 50; i++) {
  const problem = generateProblemBySkill('all');
  const canonicalId = problem.canonicalSkillId || toCanonicalSkillId(problem.skillId);
  selections.push({
    index: i,
    canonicalId,
    title: problem.skillTitle,
  });
}

let allPassed = true;

// Verify 5 consecutive blocks of 10
for (let cycleNum = 1; cycleNum <= 5; cycleNum++) {
  const startIndex = (cycleNum - 1) * 10;
  const cycleSlice = selections.slice(startIndex, startIndex + 10);
  const cycleIds = cycleSlice.map((s) => s.canonicalId);

  console.log(`\n---------------------------------------------------------------`);
  console.log(`CYCLE ${cycleNum} (Selections ${startIndex + 1} to ${startIndex + 10}):`);
  console.log(`---------------------------------------------------------------`);
  cycleSlice.forEach((item, idx) => {
    console.log(`  ${startIndex + idx + 1}. [${item.canonicalId}] - "${item.title}"`);
  });

  // Check 1: 10 unique skill IDs
  const uniqueIds = new Set(cycleIds);
  const isUnique = uniqueIds.size === 10;
  if (!isUnique) {
    console.error(`❌ Cycle ${cycleNum} FAIL: Only ${uniqueIds.size} unique skills found (expected 10).`);
    allPassed = false;
  } else {
    console.log(`  ✓ All 10 skills are unique (Set size: 10)`);
  }

  // Check 2: All 10 required skills are present
  const missingSkills = EXPECTED_10_SKILLS.filter((id) => !uniqueIds.has(id));
  if (missingSkills.length > 0) {
    console.error(`❌ Cycle ${cycleNum} FAIL: Missing skills: ${missingSkills.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`  ✓ All 10 required skills are present`);
  }

  // Check 3: No skill repeats within block
  const duplicates = cycleIds.filter((item, index) => cycleIds.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.error(`❌ Cycle ${cycleNum} FAIL: Duplicate skills found: ${duplicates.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`  ✓ No skill repeats within Cycle ${cycleNum}`);
  }

  // Check 4: Boundary check with previous cycle
  if (cycleNum > 1) {
    const prevCycleLastSkill = selections[startIndex - 1].canonicalId;
    const currentCycleFirstSkill = cycleSlice[0].canonicalId;
    if (prevCycleLastSkill === currentCycleFirstSkill) {
      console.error(
        `❌ Boundary FAIL between Cycle ${cycleNum - 1} and ${cycleNum}: Skill '${currentCycleFirstSkill}' repeated across cycle boundary.`
      );
      allPassed = false;
    } else {
      console.log(
        `  ✓ Cycle boundary deduplication verified: Cycle ${cycleNum - 1} ended with '${prevCycleLastSkill}' and Cycle ${cycleNum} started with '${currentCycleFirstSkill}'`
      );
    }
  }
}

console.log('\n===============================================================');
// Stress test 100 additional cycles (1,000 selections)
console.log('RUNNING EXTENDED STRESS TEST (100 CYCLES / 1,000 SELECTIONS)...');
let stressPassed = true;
let previousLastSkill: CanonicalSkillId | null = selections[49].canonicalId;

for (let c = 6; c <= 105; c++) {
  const stressCycle: CanonicalSkillId[] = [];
  for (let s = 0; s < 10; s++) {
    const prob = generateProblemBySkill('all');
    const cId = prob.canonicalSkillId || toCanonicalSkillId(prob.skillId);
    stressCycle.push(cId);
  }

  const set = new Set(stressCycle);
  if (set.size !== 10) {
    console.error(`❌ Stress Test Cycle ${c} failed uniqueness (size ${set.size})`);
    stressPassed = false;
  }
  const missing = EXPECTED_10_SKILLS.filter((id) => !set.has(id));
  if (missing.length > 0) {
    console.error(`❌ Stress Test Cycle ${c} missing: ${missing.join(', ')}`);
    stressPassed = false;
  }
  if (previousLastSkill && stressCycle[0] === previousLastSkill) {
    console.error(`❌ Stress Test boundary violation at Cycle ${c}`);
    stressPassed = false;
  }
  previousLastSkill = stressCycle[9];
}

if (stressPassed) {
  console.log('✓ All 100 stress test cycles (1,000 selections) PASSED perfectly with 0 violations!');
} else {
  allPassed = false;
}

console.log('===============================================================');
if (allPassed && stressPassed) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('❌ TEST SUITE FAILED.');
  process.exit(1);
}
