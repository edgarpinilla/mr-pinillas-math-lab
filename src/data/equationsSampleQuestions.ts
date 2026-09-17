import { EquationsLabQuestion } from './equationsPracticeData';
import { TAB1_QUESTIONS } from './questions/tab1';
import { TAB2_QUESTIONS } from './questions/tab2';
import { TAB3_QUESTIONS } from './questions/tab3';
import { TAB4_QUESTIONS } from './questions/tab4';
import { TAB5_QUESTIONS } from './questions/tab5';
import { TAB6_QUESTIONS } from './questions/tab6';
import { TAB7_QUESTIONS } from './questions/tab7';
import { TAB8_QUESTIONS } from './questions/tab8';
import { TAB9_QUESTIONS } from './questions/tab9';
import { TAB10_QUESTIONS } from './questions/tab10';

export const EQUATIONS_SAMPLE_QUESTIONS: EquationsLabQuestion[] = [
  ...TAB1_QUESTIONS,
  ...TAB2_QUESTIONS,
  ...TAB3_QUESTIONS,
  ...TAB4_QUESTIONS,
  ...TAB5_QUESTIONS,
  ...TAB6_QUESTIONS,
  ...TAB7_QUESTIONS,
  ...TAB8_QUESTIONS,
  ...TAB9_QUESTIONS,
  ...TAB10_QUESTIONS,
];

/**
 * Returns exactly 10 unique questions for the requested tab and round:
 * - Round 1 returns questions 1–10 (index 0..9)
 * - Round 2 returns questions 11–20 (index 10..19)
 */
export function getTabRoundQuestions(tabId: string, round: 1 | 2): EquationsLabQuestion[] {
  const tabQuestions = EQUATIONS_SAMPLE_QUESTIONS.filter((q) => q.tabId === tabId);
  if (round === 1) {
    return tabQuestions.slice(0, 10);
  } else {
    return tabQuestions.slice(10, 20);
  }
}
