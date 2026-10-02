import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  Calculator,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Layers,
  LineChart,
  Table as TableIcon,
  ZoomIn,
  Search,
  Check,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';
import { evaluateNspireExpression } from './nspireEngine';

export interface CalculatorTutorialLevel2Props {
  onBack: () => void;
  onComplete?: () => void;
}

export interface Level2ModuleDef {
  number: number;
  id: string;
  title: string;
  workflow: 'A' | 'B';
  task: string;
  instruction: string;
  explanation: string;
  hint: string;
}

export const LEVEL_2_MODULES: Level2ModuleDef[] = [
  // Workflow A: Equation -> Graph -> Table
  {
    number: 1,
    id: 'l2-mod-1',
    title: 'Getting Started with Graphs',
    workflow: 'A',
    task: 'Open a New Document and Add Graphs',
    instruction:
      'Press [🏠on] (Home) on your TI-Nspire. Select "1: New Document". If asked to save, choose "No", then select "2: Add Graphs".',
    explanation:
      'The Home screen is the starting hub of the TI-Nspire CX. Selecting New Document and Add Graphs prepares a fresh coordinate plane.',
    hint: 'Press [🏠on] at the top right, select 1 for New Document, select No for save, then select 2 for Add Graphs.',
  },
  {
    number: 2,
    id: 'l2-mod-2',
    title: 'Entering a Linear Equation',
    workflow: 'A',
    task: 'Graph f1(x) = 3x + 2',
    instruction:
      'The entry line f1(x)= is active. Type 3x+2 on the keypad and press [enter].',
    explanation:
      'Because f1(x)= is already provided by the handheld, you enter only 3x+2. Pressing [enter] evaluates and plots the line.',
    hint: 'Type 3, then press the white [x] variable key, press [+], type 2, and press [enter].',
  },
  {
    number: 3,
    id: 'l2-mod-3',
    title: 'Reading the Graph',
    workflow: 'A',
    task: 'Examine the Plotted Linear Function',
    instruction:
      'Observe the line y = 3x + 2 on the coordinate plane. Notice its positive steep slope (3) and where it crosses the y-axis.',
    explanation:
      'The line y = 3x + 2 rises 3 units vertically for every 1 unit to the right, crossing the vertical axis at y = 2.',
    hint: 'Press [enter] to confirm your observation and continue to Window adjustment.',
  },
  {
    number: 4,
    id: 'l2-mod-4',
    title: 'Window/Zoom and Zoom-Fit',
    workflow: 'A',
    task: 'Use Zoom - Fit to Optimize Viewport',
    instruction:
      'Press [menu], navigate to "4: Window / Zoom", and select "Zoom - Fit" (Option 8 / A).',
    explanation:
      'Zoom-Fit automatically recalculates the y-axis boundaries to fit the line across the visible domain.',
    hint: 'Press [menu] on the right keypad, choose 4: Window / Zoom, then choose Zoom-Fit.',
  },
  {
    number: 5,
    id: 'l2-mod-5',
    title: 'Graph Trace',
    workflow: 'A',
    task: 'Activate Graph Trace Tool',
    instruction:
      'Press [menu], select "5: Trace", and choose "1: Graph Trace" to place an interactive cursor on the line.',
    explanation:
      'Graph Trace places a trace cursor on f1(x). You can move along the line using touchpad Left ◀ and Right ▶ arrows.',
    hint: 'Press [menu] on the calculator, select 5: Trace, then select 1: Graph Trace.',
  },
  {
    number: 6,
    id: 'l2-mod-6',
    title: 'Finding the Y-Intercept',
    workflow: 'A',
    task: 'Trace to x = 0 to Identify b = 2',
    instruction:
      'Use the ◀ / ▶ arrow keys to move the trace cursor to x = 0. Notice the coordinate display shows (0, 2).',
    explanation:
      'When x = 0, y = 2. This proves that the constant term b in y = mx + b is the y-intercept (0, 2).',
    hint: 'Use Left ◀ or Right ▶ arrow keys on the keypad or touchpad until x = 0 is displayed.',
  },
  {
    number: 7,
    id: 'l2-mod-7',
    title: 'Graph + Table with CTRL + T',
    workflow: 'A',
    task: 'Toggle Split-Screen Table View',
    instruction:
      'Press [ctrl] then [T] on the keypad (or keyboard Ctrl+T). Observe the generated (x, y) values, then press [ctrl] + [T] again.',
    explanation:
      '[ctrl] + [T] is the dedicated TI-Nspire shortcut to toggle between graph-only view and split graph + table view without modifying the function.',
    hint: 'Press the bright yellow [ctrl] key, then press [t] on the alpha keyboard.',
  },

  // Workflow B: Table -> Linear Regression -> Equation
  {
    number: 8,
    id: 'l2-mod-8',
    title: 'Getting Started with Lists & Spreadsheet',
    workflow: 'B',
    task: 'Open a New Document and Add Lists & Spreadsheet',
    instruction:
      'Press [🏠on] (Home), choose "1: New Document", select "No" to save, then select "4: Add Lists & Spreadsheet".',
    explanation:
      'Lists & Spreadsheet is the TI-Nspire application used for tabular data, statistical analysis, and linear regression.',
    hint: 'Press [🏠on], select 1 for New Document, select No, then choose 4: Add Lists & Spreadsheet.',
  },
  {
    number: 9,
    id: 'l2-mod-9',
    title: 'Entering X and Y Data',
    workflow: 'B',
    task: 'Name Columns "x" & "y" and Enter (3, 5) & (9, 8)',
    instruction:
      'Name Column A header "x" and Column B header "y". In Row 1 enter (3, 5), and in Row 2 enter (9, 8).',
    explanation:
      'Naming columns creates statistical list variables (x and y) that can be referenced in regression calculations.',
    hint: 'Navigate to the header cell of Column A, type x, press [enter]. Go to Column B header, type y. Enter 3 & 9 in Col A, 5 & 8 in Col B.',
  },
  {
    number: 10,
    id: 'l2-mod-10',
    title: 'Linear Regression (mx+b)',
    workflow: 'B',
    task: 'Menu → Statistics → Stat Calculations → Linear Regression (mx+b)',
    instruction:
      'From Lists & Spreadsheet, press [menu] → "4: Statistics" → "1: Stat Calculations" → "3: Linear Regression (mx+b)...". Verify X List is "x", Y List is "y", Save to "f1", navigate down to [OK], and press [enter].',
    explanation:
      'This computes the least-squares regression line (y = mx + b) from your x and y lists and stores the linear model directly into f1.',
    hint: 'Press [menu], select 4: Statistics, 1: Stat Calculations, 3: Linear Regression (mx+b), navigate to OK, and press [enter].',
  },
  {
    number: 11,
    id: 'l2-mod-11',
    title: 'Reading m and b',
    workflow: 'B',
    task: 'Interpret Slope (m = 0.5) and Y-Intercept (b = 3.5)',
    instruction:
      'Inspect the output columns: m = 0.5, b = 3.5, r² = 1. The resulting equation is y = 0.5x + 3.5.',
    explanation:
      'Slope m = (8 - 5)/(9 - 3) = 3/6 = 0.5. Y-intercept b = 5 - 0.5(3) = 3.5. Correlation r = 1 confirms a perfect linear fit.',
    hint: 'Review the regression output columns and press [enter] to complete Module 11.',
  },
  {
    number: 12,
    id: 'l2-mod-12',
    title: 'Table → Equation Challenge',
    workflow: 'B',
    task: 'Find the Equation for: (0, 1), (1, 3), (2, 5)',
    instruction:
      'Enter the new dataset into the spreadsheet, run Linear Regression (mx+b), and confirm m = 2 and b = 1 (y = 2x + 1).',
    explanation:
      'Change in y is 2 for each 1 unit in x (m = 2), and when x = 0, y = 1 (b = 1). Equation: y = 2x + 1.',
    hint: 'Enter x: [0, 1, 2], y: [1, 3, 5], run Menu -> Statistics -> Stat Calculations -> Linear Regression (mx+b).',
  },
  {
    number: 13,
    id: 'l2-mod-13',
    title: 'Equation → Graph → Table Challenge',
    workflow: 'A',
    task: 'Mastery Challenge: Graph f1(x) = -2x + 5 & View Table',
    instruction:
      'Open Graphs, enter -2x + 5 into f1(x), press [enter], find the y-intercept with Graph Trace (0, 5), then press [ctrl] + [T].',
    explanation:
      'Congratulations! You have mastered both the Equation → Graph → Table workflow and the Table → Linear Regression → Equation workflow on the TI-Nspire CX.',
    hint: 'Enter -2x+5, press [enter], use Menu -> Trace -> Graph Trace to inspect (0, 5), and press [ctrl]+[T] to view the table.',
  },
];

type AppScreen =
  | 'home'
  | 'save_prompt'
  | 'add_app'
  | 'graphs'
  | 'spreadsheet'
  | 'regression_dialog';

export const CalculatorTutorialLevel2: React.FC<CalculatorTutorialLevel2Props> = ({
  onBack,
  onComplete,
}) => {
  const [currentModuleIdx, setCurrentModuleIdx] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<Record<number, boolean>>({});
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  // Handheld Application State
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [homeSelection, setHomeSelection] = useState<number>(1); // 1 = New Document
  const [addAppSelection, setAddAppSelection] = useState<number>(2); // 2 = Graphs, 4 = Spreadsheet
  const [savePromptSelection, setSavePromptSelection] = useState<'yes' | 'no'>('no');

  // Graphs Application State
  const [functionInput, setFunctionInput] = useState<string>('3x+2');
  const [isFunctionEntryActive, setIsFunctionEntryActive] = useState<boolean>(true);
  const [plottedFunction, setPlottedFunction] = useState<string | null>(null);
  const [graphWindow, setGraphWindow] = useState<{ xMin: number; xMax: number; yMin: number; yMax: number }>({
    xMin: -10,
    xMax: 10,
    yMin: -7,
    yMax: 7,
  });
  const [isZoomFitActive, setIsZoomFitActive] = useState<boolean>(false);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceX, setTraceX] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [graphsMenuOpen, setGraphsMenuOpen] = useState<boolean>(false);
  const [graphsSubmenu, setGraphsSubmenu] = useState<'none' | 'window' | 'trace'>('none');
  const [graphsMenuIndex, setGraphsMenuIndex] = useState<number>(0);

  // Lists & Spreadsheet Application State
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: 'A' | 'B' }>({ row: 0, col: 'A' }); // row 0 = header
  const [colAName, setColAName] = useState<string>('');
  const [colBName, setColBName] = useState<string>('');
  const [tableData, setTableData] = useState<{ x: string; y: string }[]>([
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' },
  ]);
  const [spreadsheetMenuOpen, setSpreadsheetMenuOpen] = useState<boolean>(false);
  const [spreadsheetSubmenu, setSpreadsheetSubmenu] = useState<'none' | 'stats' | 'stat_calc'>('none');
  const [spreadsheetMenuIndex, setSpreadsheetMenuIndex] = useState<number>(0);

  // Regression Dialog & Results
  const [regDialogFocus, setRegDialogFocus] = useState<'xList' | 'yList' | 'saveEq' | 'ok' | 'cancel'>('ok');
  const [regressionResult, setRegressionResult] = useState<{
    m: number;
    b: number;
    r2: number;
    r: number;
    eqStr: string;
  } | null>(null);

  // Key & Feedback State
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'incorrect'; message: string }>({
    status: 'idle',
    message: '',
  });
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [resetCounter, setResetCounter] = useState<number>(1);
  const [ctrlActive, setCtrlActive] = useState<boolean>(false);

  const currentModule = LEVEL_2_MODULES[currentModuleIdx];
  const completedCount = Object.keys(completedModules).length;

  // Reset calculator to clean baseline for the module
  const resetModuleState = (modIdx: number) => {
    setFeedback({ status: 'idle', message: '' });
    setKeySequence([]);
    setGraphsMenuOpen(false);
    setGraphsSubmenu('none');
    setSpreadsheetMenuOpen(false);
    setSpreadsheetSubmenu('none');
    setCtrlActive(false);
    setResetCounter((prev) => prev + 1);

    // Initial setup according to module
    if (modIdx === 0) {
      // Mod 1: Getting Started with Graphs
      setActiveScreen('home');
      setPlottedFunction(null);
      setFunctionInput('3x+2');
      setIsFunctionEntryActive(true);
      setIsTracing(false);
      setShowTable(false);
    } else if (modIdx >= 1 && modIdx <= 6) {
      // Mod 2-7: Workflow A Graphs
      setActiveScreen('graphs');
      if (modIdx === 1) {
        setPlottedFunction(null);
        setFunctionInput('3x+2');
        setIsFunctionEntryActive(true);
      } else {
        setPlottedFunction('3x+2');
        setIsFunctionEntryActive(false);
      }
      if (modIdx === 3) {
        setIsZoomFitActive(false);
        setGraphWindow({ xMin: -10, xMax: 10, yMin: -7, yMax: 7 });
      }
      if (modIdx === 4 || modIdx === 5) {
        setIsTracing(true);
        setTraceX(modIdx === 5 ? 1 : 0);
      } else {
        setIsTracing(false);
      }
      setShowTable(modIdx === 6);
    } else if (modIdx === 7) {
      // Mod 8: Start Spreadsheet
      setActiveScreen('home');
      setRegressionResult(null);
      setColAName('');
      setColBName('');
      setTableData([
        { x: '', y: '' },
        { x: '', y: '' },
        { x: '', y: '' },
        { x: '', y: '' },
      ]);
    } else if (modIdx === 8) {
      // Mod 9: Entering X and Y Data (starts with empty cells for student entry)
      setActiveScreen('spreadsheet');
      setSelectedCell({ row: 0, col: 'A' });
      setColAName('');
      setColBName('');
      setTableData([
        { x: '', y: '' },
        { x: '', y: '' },
        { x: '', y: '' },
        { x: '', y: '' },
      ]);
      setRegressionResult(null);
    } else if (modIdx === 9) {
      // Mod 10: Linear Regression (mx+b)
      // ONE continuous student state: preserves the EXACT spreadsheet state produced in Mod 9
      // DO NOT auto-populate x, y, 3, 5, 9, or 8!
      setActiveScreen('spreadsheet');
      setRegressionResult(null);
    } else if (modIdx === 10) {
      // Mod 11: Reading m and b
      // ONE continuous student state: preserves the EXACT spreadsheet and regression result produced in Mod 10
      // DO NOT auto-populate and DO NOT hard-code regression output!
      setActiveScreen('spreadsheet');
    } else if (modIdx === 11) {
      // Mod 12: Table -> Equation Challenge (was Mod 13)
      setActiveScreen('spreadsheet');
      setColAName('x');
      setColBName('y');
      setTableData([
        { x: '0', y: '1' },
        { x: '1', y: '3' },
        { x: '2', y: '5' },
      ]);
      setRegressionResult(null);
    } else if (modIdx === 12) {
      // Mod 13: Equation -> Graph -> Table Challenge (was Mod 14)
      setActiveScreen('graphs');
      setFunctionInput('-2x+5');
      setPlottedFunction(null);
      setIsFunctionEntryActive(true);
      setIsTracing(false);
      setShowTable(false);
    }
  };

  useEffect(() => {
    resetModuleState(currentModuleIdx);
  }, [currentModuleIdx]);

  // Linear regression algorithm
  const computeLinearRegression = (points: { x: number; y: number }[]) => {
    const valid = points.filter((p) => !isNaN(p.x) && !isNaN(p.y));
    if (valid.length < 2) return null;

    const n = valid.length;
    let sumX = 0;
    let sumY = 0;
    for (const p of valid) {
      sumX += p.x;
      sumY += p.y;
    }
    const xMean = sumX / n;
    const yMean = sumY / n;

    let sxx = 0;
    let sxy = 0;
    let syy = 0;
    for (const p of valid) {
      const dx = p.x - xMean;
      const dy = p.y - yMean;
      sxx += dx * dx;
      sxy += dx * dy;
      syy += dy * dy;
    }

    if (sxx === 0) return null;
    const m = sxy / sxx;
    const b = yMean - m * xMean;

    let r = 1;
    if (sxx * syy > 0) {
      r = sxy / Math.sqrt(sxx * syy);
    }
    const r2 = r * r;

    const mClean = Math.round(m * 1000) / 1000;
    const bClean = Math.round(b * 1000) / 1000;
    const sign = bClean >= 0 ? '+' : '-';
    const eqStr = `${mClean}x ${sign} ${Math.abs(bClean)}`;

    return {
      m: mClean,
      b: bClean,
      r2: Math.round(r2 * 1000) / 1000,
      r: Math.round(r * 1000) / 1000,
      eqStr,
    };
  };

  // Evaluate function at x using the calculator engine
  const evaluateFunctionAt = (fnStr: string, xVal: number): number => {
    try {
      const safe = fnStr
        .replace(/⁻/g, '-')
        .replace(/([0-9\.\)])[xX]/g, `$1*(${xVal})`)
        .replace(/[xX]/g, `(${xVal})`);
      const res = evaluateNspireExpression(safe);
      const num = parseFloat(res.result);
      return isNaN(num) ? 0 : num;
    } catch {
      return 0;
    }
  };

  // Central TI-Nspire Keypress Dispatcher for Level 2
  const handleCalculatorKeyPress = (keyId: string) => {
    const k = keyId.toLowerCase().trim();
    setKeySequence((prev) => [...prev, k]);

    // Handle CTRL modifier
    if (k === 'ctrl') {
      setCtrlActive((prev) => !prev);
      return;
    }

    // Handle CTRL + T shortcut (show/hide table toggle)
    if (k === 'ctrl_t' || (ctrlActive && k === 't')) {
      setCtrlActive(false);
      if (activeScreen === 'graphs') {
        const nextState = !showTable;
        setShowTable(nextState);

        // Verification for Module 7 or 14
        if (currentModule.number === 7) {
          setFeedback({
            status: 'correct',
            message:
              'Correct Response ✓\n[ctrl] + [T] toggles the function table alongside the graph. Pressing it again returns to the graph-only view.',
          });
          setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
        }
      }
      return;
    }

    // 1. HOME / ON Button
    if (k === 'home' || k === 'on') {
      setCtrlActive(false);
      setGraphsMenuOpen(false);
      setSpreadsheetMenuOpen(false);
      setActiveScreen('home');
      setHomeSelection(1);
      return;
    }

    // 2. ESC Button (Close menus or cancel dialogs)
    if (k === 'esc') {
      setCtrlActive(false);
      if (graphsMenuOpen) {
        setGraphsMenuOpen(false);
        setGraphsSubmenu('none');
        return;
      }
      if (spreadsheetMenuOpen) {
        setSpreadsheetMenuOpen(false);
        setSpreadsheetSubmenu('none');
        return;
      }
      if (activeScreen === 'regression_dialog') {
        setActiveScreen('spreadsheet');
        return;
      }
      if (activeScreen === 'save_prompt') {
        setActiveScreen('home');
        return;
      }
      return;
    }

    // 3. MENU Button
    if (k === 'menu') {
      setCtrlActive(false);
      if (activeScreen === 'graphs') {
        setGraphsMenuOpen((prev) => !prev);
        setGraphsSubmenu('none');
        setGraphsMenuIndex(0);
        return;
      }
      if (activeScreen === 'spreadsheet') {
        setSpreadsheetMenuOpen((prev) => !prev);
        setSpreadsheetSubmenu('none');
        setSpreadsheetMenuIndex(0);
        return;
      }
    }

    // 4. SCREEN-SPECIFIC KEY ROUTING

    // --- A. HOME SCREEN ---
    if (activeScreen === 'home') {
      if (k === '1' || ((k === 'enter' || k === 'click') && homeSelection === 1)) {
        // "1: New Document" selected
        setActiveScreen('save_prompt');
        setSavePromptSelection('no');
        return;
      }
      if (k === 'up') setHomeSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setHomeSelection((prev) => Math.min(5, prev + 1));
      return;
    }

    // --- B. SAVE PROMPT SCREEN ---
    if (activeScreen === 'save_prompt') {
      if (k === 'no' || k === 'n' || ((k === 'enter' || k === 'click') && savePromptSelection === 'no')) {
        // "No" chosen -> advances to Add Application
        setActiveScreen('add_app');
        setAddAppSelection(currentModule.workflow === 'A' ? 2 : 4);
        return;
      }
      if (k === 'left' || k === 'right' || k === 'tab') {
        setSavePromptSelection((prev) => (prev === 'yes' ? 'no' : 'yes'));
      }
      return;
    }

    // --- C. ADD APPLICATION SCREEN ---
    if (activeScreen === 'add_app') {
      if (k === '2' || ((k === 'enter' || k === 'click') && addAppSelection === 2)) {
        // 2: Add Graphs
        setActiveScreen('graphs');
        setIsFunctionEntryActive(true);
        if (currentModule.number === 1) {
          setFeedback({
            status: 'correct',
            message:
              'Correct Response ✓\nSuccessfully created a New Document and opened the Graphs application with coordinate plane.',
          });
          setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
        }
        return;
      }
      if (k === '4' || ((k === 'enter' || k === 'click') && addAppSelection === 4)) {
        // 4: Add Lists & Spreadsheet
        setActiveScreen('spreadsheet');
        if (currentModule.number === 8) {
          setFeedback({
            status: 'correct',
            message:
              'Correct Response ✓\nSuccessfully created a New Document and opened the Lists & Spreadsheet application.',
          });
          setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
        }
        return;
      }
      if (k === 'up') setAddAppSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setAddAppSelection((prev) => Math.min(6, prev + 1));
      return;
    }

    // --- D. GRAPHS APPLICATION SCREEN ---
    if (activeScreen === 'graphs') {
      // Context Menu handling
      if (graphsMenuOpen) {
        if (graphsSubmenu === 'none') {
          if (k === '4') {
            setGraphsSubmenu('window');
            return;
          }
          if (k === '5') {
            setGraphsSubmenu('trace');
            return;
          }
          if (k === '7') {
            setShowTable((prev) => !prev);
            setGraphsMenuOpen(false);
            return;
          }
          if (k === 'enter' || k === 'right') {
            if (graphsMenuIndex === 3) setGraphsSubmenu('window');
            if (graphsMenuIndex === 4) setGraphsSubmenu('trace');
            return;
          }
          if (k === 'up') setGraphsMenuIndex((prev) => Math.max(0, prev - 1));
          if (k === 'down') setGraphsMenuIndex((prev) => Math.min(7, prev + 1));
          return;
        }

        // Submenu: Window / Zoom
        if (graphsSubmenu === 'window') {
          if (k === '8' || k === 'a' || k === 'enter' || k === 'fit') {
            // Zoom - Fit selected
            setIsZoomFitActive(true);
            setGraphWindow({ xMin: -6, xMax: 6, yMin: -16, yMax: 20 });
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');

            if (currentModule.number === 4) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nZoom-Fit automatically adjusted the y-axis scaling so the linear graph fits the display perfectly.',
              });
              setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
            }
            return;
          }
          if (k === 'left' || k === 'esc') {
            setGraphsSubmenu('none');
            return;
          }
        }

        // Submenu: Trace
        if (graphsSubmenu === 'trace') {
          if (k === '1' || k === 'enter') {
            // 1: Graph Trace selected
            setIsTracing(true);
            setTraceX(0);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');

            if (currentModule.number === 5) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nGraph Trace activated! A trace cursor is now placed on the line with coordinates displayed.',
              });
              setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
            }
            return;
          }
          if (k === 'left' || k === 'esc') {
            setGraphsSubmenu('none');
            return;
          }
        }
        return;
      }

      // Tracing Navigation
      if (isTracing) {
        if (k === 'left') {
          const nextX = traceX - 1;
          setTraceX(nextX);
          checkTraceVerification(nextX);
          return;
        }
        if (k === 'right') {
          const nextX = traceX + 1;
          setTraceX(nextX);
          checkTraceVerification(nextX);
          return;
        }
      }

      // Function Entry Bar Active
      if (isFunctionEntryActive) {
        if (k === 'enter') {
          if (functionInput.trim()) {
            setPlottedFunction(functionInput.trim());
            setIsFunctionEntryActive(false);

            if (currentModule.number === 2) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nf1(x) = 3x + 2 graphed successfully on the TI-Nspire coordinate plane.',
              });
              setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
            } else if (currentModule.number === 3) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nThe line rises 3 units for every 1 unit across with y-intercept (0, 2).',
              });
              setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
            } else if (currentModule.number === 13) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nFunction plotted! Now use Menu -> Trace -> Graph Trace to inspect the y-intercept, and [ctrl]+[T] to view the table.',
              });
            }
          }
          return;
        }

        if (k === 'del' || k === 'backspace') {
          setFunctionInput((prev) => prev.slice(0, -1));
          return;
        }

        // Typing equation characters
        if (/^[0-9]$/.test(k) || ['x', '+', '-', '*', '/', '.', '(', ')', '^'].includes(k)) {
          setFunctionInput((prev) => prev + (k === '*' ? '×' : k === '/' ? '÷' : k));
          return;
        }
      }

      // Tab toggles function entry bar
      if (k === 'tab') {
        setIsFunctionEntryActive((prev) => !prev);
        return;
      }
    }

    // --- E. LISTS & SPREADSHEET APPLICATION SCREEN ---
    if (activeScreen === 'spreadsheet') {
      if (spreadsheetMenuOpen) {
        if (spreadsheetSubmenu === 'none') {
          if (k === '4') {
            setSpreadsheetSubmenu('stats');
            return;
          }
          if (k === 'enter' || k === 'right') {
            if (spreadsheetMenuIndex === 3) setSpreadsheetSubmenu('stats');
            return;
          }
          if (k === 'up') setSpreadsheetMenuIndex((prev) => Math.max(0, prev - 1));
          if (k === 'down') setSpreadsheetMenuIndex((prev) => Math.min(4, prev + 1));
          return;
        }

        if (spreadsheetSubmenu === 'stats') {
          if (k === '1' || k === 'enter' || k === 'right') {
            setSpreadsheetSubmenu('stat_calc');
            return;
          }
          if (k === 'left' || k === 'esc') {
            setSpreadsheetSubmenu('none');
            return;
          }
        }

        if (spreadsheetSubmenu === 'stat_calc') {
          if (k === '3' || k === 'enter') {
            // Open Linear Regression Dialog
            setSpreadsheetMenuOpen(false);
            setSpreadsheetSubmenu('none');
            setActiveScreen('regression_dialog');
            setRegDialogFocus('ok');
            return;
          }
          if (k === 'left' || k === 'esc') {
            setSpreadsheetSubmenu('stats');
            return;
          }
        }
        return;
      }

      // Cell Navigation
      if (k === 'up') {
        setSelectedCell((prev) => ({ ...prev, row: Math.max(0, prev.row - 1) }));
        return;
      }
      if (k === 'down' || k === 'enter') {
        setSelectedCell((prev) => ({ ...prev, row: Math.min(3, prev.row + 1) }));
        checkDataEntryVerification(tableData, colAName, colBName);
        if (currentModule.number === 11) {
          if (regressionResult) {
            setFeedback({
              status: 'correct',
              message:
                `Correct Response ✓\nSlope m = ${regressionResult.m} indicates y increases by ${regressionResult.m} for each 1 unit increase in x. Y-intercept b = ${regressionResult.b} is the value of y when x = 0 (y = ${regressionResult.eqStr}).`,
            });
            setCompletedModules((prev) => ({ ...prev, 11: true }));
          } else {
            setFeedback({
              status: 'incorrect',
              message:
                'No regression results found on the spreadsheet. Please complete Module 10 to calculate the linear regression first.',
            });
          }
        }
        return;
      }
      if (k === 'left') {
        setSelectedCell((prev) => ({ ...prev, col: 'A' }));
        return;
      }
      if (k === 'right' || k === 'tab') {
        setSelectedCell((prev) => ({ ...prev, col: 'B' }));
        return;
      }

      // Entering Header Names
      if (selectedCell.row === 0) {
        if (k === 'x' && selectedCell.col === 'A') {
          setColAName('x');
          checkDataEntryVerification(tableData, 'x', colBName);
          return;
        }
        if (k === 'y' && selectedCell.col === 'B') {
          setColBName('y');
          checkDataEntryVerification(tableData, colAName, 'y');
          return;
        }
        if (k === 'del' || k === 'backspace') {
          if (selectedCell.col === 'A') {
            setColAName('');
            checkDataEntryVerification(tableData, '', colBName);
          } else {
            setColBName('');
            checkDataEntryVerification(tableData, colAName, '');
          }
          return;
        }
      }

      // Entering Cell Data
      if (selectedCell.row > 0) {
        const rowIdx = selectedCell.row - 1;
        const colKey = selectedCell.col === 'A' ? 'x' : 'y';

        if (/^[0-9]$/.test(k) || k === '.' || k === '-' || k === '(-)') {
          const char = k === '(-)' ? '-' : k;
          const updated = [...tableData];
          updated[rowIdx] = {
            ...updated[rowIdx],
            [colKey]: (updated[rowIdx][colKey] || '') + char,
          };
          setTableData(updated);
          checkDataEntryVerification(updated, colAName, colBName);
          return;
        }
        if (k === 'del' || k === 'backspace') {
          const updated = [...tableData];
          updated[rowIdx] = {
            ...updated[rowIdx],
            [colKey]: updated[rowIdx][colKey].slice(0, -1),
          };
          setTableData(updated);
          checkDataEntryVerification(updated, colAName, colBName);
          return;
        }
      }
    }

    // --- F. REGRESSION DIALOG SCREEN ---
    if (activeScreen === 'regression_dialog') {
      if (k === 'enter' && regDialogFocus === 'ok') {
        // Execute Real Linear Regression
        const points = tableData
          .filter((r) => r.x !== '' && r.y !== '')
          .map((r) => ({ x: parseFloat(r.x), y: parseFloat(r.y) }));
        const result = computeLinearRegression(points);

        if (result) {
          setRegressionResult(result);
          // Save RegEqn to f1 as configured
          setPlottedFunction(result.eqStr);
          setActiveScreen('spreadsheet');

          if (currentModule.number === 10) {
            setFeedback({
              status: 'correct',
              message: `Correct Response ✓\nRegression calculated: m = ${result.m}, b = ${result.b}, r = ${result.r}, r² = ${result.r2}. Model saved to f1(x) = ${result.eqStr}.`,
            });
            setCompletedModules((prev) => ({
              ...prev,
              10: true,
            }));
          } else if (currentModule.number === 12) {
            if (result.m === 2 && result.b === 1) {
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nChallenge solved! For (0, 1), (1, 3), (2, 5), the linear regression yields m = 2, b = 1, and y = 2x + 1.',
              });
              setCompletedModules((prev) => ({ ...prev, 12: true }));
            }
          }
        } else {
          setActiveScreen('spreadsheet');
          setFeedback({
            status: 'incorrect',
            message:
              'Procedural Error: Cannot calculate regression. Lists & Spreadsheet has insufficient data points (at least 2 valid (x, y) pairs required).',
          });
        }
        return;
      }

      if (k === 'tab' || k === 'down') {
        setRegDialogFocus((prev) => (prev === 'ok' ? 'cancel' : 'ok'));
      }
      if (k === 'up') {
        setRegDialogFocus('ok');
      }
    }
  };

  // Verification helper for Graph Trace at x = 0 (Module 6 & Module 13)
  const checkTraceVerification = (xVal: number) => {
    if (currentModule.number === 6 && xVal === 0) {
      setFeedback({
        status: 'correct',
        message:
          'Correct Response ✓\nTrace point is at (0, 2). This confirms the y-intercept is b = 2.',
      });
      setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
    }
    if (currentModule.number === 13 && xVal === 0) {
      setFeedback({
        status: 'correct',
        message:
          'Correct Response ✓\nTrace point is at (0, 5). y-intercept is 5! Now press [ctrl]+[T] to view the table.',
      });
    }
  };

  // Verification helper for Data Entry (Module 9)
  const checkDataEntryVerification = (
    data: { x: string; y: string }[] = tableData,
    aName: string = colAName,
    bName: string = colBName
  ) => {
    if (currentModule.number === 9) {
      const hasHeaders = aName.trim().toLowerCase() === 'x' && bName.trim().toLowerCase() === 'y';
      const hasP1 = data[0]?.x.trim() === '3' && data[0]?.y.trim() === '5';
      const hasP2 = data[1]?.x.trim() === '9' && data[1]?.y.trim() === '8';

      if (hasHeaders && hasP1 && hasP2) {
        setFeedback({
          status: 'correct',
          message:
            'Correct Response ✓\nData pairs (3, 5) and (9, 8) entered into columns "x" and "y" successfully.',
        });
        setCompletedModules((prev) => ({ ...prev, [currentModule.number]: true }));
      }
    }
  };

  const handleNextModule = () => {
    if (currentModuleIdx + 1 < LEVEL_2_MODULES.length) {
      setCurrentModuleIdx((prev) => prev + 1);
    } else {
      setIsLevelComplete(true);
      onComplete?.();
    }
  };

  // Math Table Data for CTRL + T view
  const tableRows = useMemo(() => {
    const fn = plottedFunction || '3x+2';
    const rows = [];
    for (let x = 0; x <= 8; x++) {
      rows.push({ x, y: evaluateFunctionAt(fn, x) });
    }
    return rows;
  }, [plottedFunction]);

  // Renders the Authentic TI-Nspire LCD Screen Content
  const renderLcdContent = () => {
    // 1. HOME SCREEN
    if (activeScreen === 'home') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-2">
            <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
              <span>🏠</span>
              <span>TI-Nspire Home</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">School Property</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Left: Scratchpad */}
            <div className="bg-[#112240] rounded-lg p-2 border border-sky-900/60 flex flex-col justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-400">
                Scratchpad
              </span>
              <div className="space-y-1">
                <div className="text-[10px] text-slate-300 flex items-center gap-1 p-1 rounded hover:bg-sky-800/40">
                  <span className="font-bold text-amber-400">A:</span> Calculate
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1 p-1 rounded hover:bg-sky-800/40">
                  <span className="font-bold text-amber-400">B:</span> Graph
                </div>
              </div>
            </div>

            {/* Right: Documents Menu */}
            <div className="bg-[#112240] rounded-lg p-2 border border-sky-900/60 flex flex-col justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-sky-400">
                Documents
              </span>
              <div className="space-y-1">
                {[
                  { id: 1, label: '1: New Document' },
                  { id: 2, label: '2: My Documents' },
                  { id: 3, label: '3: Recent' },
                  { id: 4, label: '4: Current' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setHomeSelection(item.id);
                      handleCalculatorKeyPress(item.id.toString());
                    }}
                    className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      homeSelection === item.id
                        ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                        : 'text-slate-300 hover:bg-sky-800/40'
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. SAVE PROMPT MODAL
    if (activeScreen === 'save_prompt') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex items-center justify-center font-sans p-2">
          <div className="bg-[#1b2a47] border border-sky-500 rounded-xl p-3 shadow-2xl max-w-[240px] text-center space-y-2">
            <span className="text-[10px] font-bold text-sky-300 block">TI-Nspire CX</span>
            <p className="text-[11px] text-slate-200 font-medium">
              Do you want to save unsaved documents?
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCalculatorKeyPress('n')}
                className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                  savePromptSelection === 'no'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setSavePromptSelection('yes')}
                className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                  savePromptSelection === 'yes'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 3. ADD APPLICATION SELECTOR
    if (activeScreen === 'add_app') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1">
            <span className="text-[10px] font-bold text-sky-300">Add Application to Page 1.1</span>
            <span className="text-[9px] text-slate-400 font-mono">1.1</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 flex-1 pt-1">
            {[
              { id: 1, label: '1: Add Calculator', icon: '🖩' },
              { id: 2, label: '2: Add Graphs', icon: '📈' },
              { id: 3, label: '3: Add Geometry', icon: '📐' },
              { id: 4, label: '4: Add Lists & Spreadsheet', icon: '📊' },
              { id: 5, label: '5: Add Data & Statistics', icon: '📉' },
              { id: 6, label: '6: Add Notes', icon: '📝' },
            ].map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  setAddAppSelection(app.id);
                  handleCalculatorKeyPress(app.id.toString());
                }}
                className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer transition-all text-[10px] ${
                  addAppSelection === app.id
                    ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-sm'
                    : 'bg-[#112240] text-slate-200 border-sky-900/60 hover:bg-sky-800/40'
                }`}
              >
                <span>{app.icon}</span>
                <span>{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. GRAPHS APPLICATION
    if (activeScreen === 'graphs') {
      // SVG Coordinate Plane Math
      const width = showTable ? 130 : 250;
      const height = 140;
      const { xMin, xMax, yMin, yMax } = graphWindow;

      const toSvgX = (xVal: number) => ((xVal - xMin) / (xMax - xMin)) * width;
      const toSvgY = (yVal: number) => height - ((yVal - yMin) / (yMax - yMin)) * height;

      const originX = toSvgX(0);
      const originY = toSvgY(0);

      // Line points for plotted function
      const activeFn = plottedFunction || (currentModule.number >= 2 && !isFunctionEntryActive ? functionInput : null);
      let pathD = '';
      if (activeFn) {
        const y1 = evaluateFunctionAt(activeFn, xMin);
        const y2 = evaluateFunctionAt(activeFn, xMax);
        pathD = `M ${toSvgX(xMin)} ${toSvgY(y1)} L ${toSvgX(xMax)} ${toSvgY(y2)}`;
      }

      const traceY = activeFn ? evaluateFunctionAt(activeFn, traceX) : 0;
      const traceSvgX = toSvgX(traceX);
      const traceSvgY = toSvgY(traceY);

      return (
        <div className="relative w-full h-full bg-[#f8fafc] text-slate-900 font-sans flex flex-col overflow-hidden">
          {/* Top Page Tab / Status Header */}
          <div className="bg-[#0f2942] text-sky-100 px-2 py-0.5 text-[9px] font-bold flex items-center justify-between border-b border-sky-700/80">
            <span className="flex items-center gap-1.5">
              <span className="bg-sky-700 px-1 rounded text-[8px]">1.1</span>
              <span>Graphs</span>
            </span>
            <span className="text-[8px] text-sky-300 font-mono">
              {isZoomFitActive ? 'Zoom-Fit View' : 'Standard View'}
            </span>
          </div>

          {/* Function Entry Line Bar */}
          {isFunctionEntryActive && (
            <div className="bg-white border-b-2 border-sky-500 px-2 py-1 flex items-center gap-1 shadow-sm text-xs z-10 animate-fadeIn">
              <span className="font-mono font-bold text-sky-800">f1(x)=</span>
              <input
                type="text"
                value={functionInput}
                onChange={(e) => setFunctionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCalculatorKeyPress('enter');
                }}
                className="flex-1 font-mono font-bold text-slate-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
                placeholder="Enter 3x+2"
                autoFocus
              />
              <button
                type="button"
                onClick={() => handleCalculatorKeyPress('enter')}
                className="bg-sky-600 text-white px-2 py-0.5 rounded text-[10px] font-bold hover:bg-sky-700"
              >
                Graph
              </button>
            </div>
          )}

          {/* Main Area: Split Graph & Table if showTable, else full Graph */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Coordinate Plane Canvas */}
            <div className="flex-1 relative bg-white flex items-center justify-center overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                {/* Grid Lines */}
                {[-8, -6, -4, -2, 2, 4, 6, 8].map((gx) => (
                  <line
                    key={`gx-${gx}`}
                    x1={toSvgX(gx)}
                    y1={0}
                    x2={toSvgX(gx)}
                    y2={height}
                    stroke="#e2e8f0"
                    strokeWidth="0.5"
                  />
                ))}
                {[-12, -8, -4, 4, 8, 12, 16].map((gy) => (
                  <line
                    key={`gy-${gy}`}
                    x1={0}
                    y1={toSvgY(gy)}
                    x2={width}
                    y2={toSvgY(gy)}
                    stroke="#e2e8f0"
                    strokeWidth="0.5"
                  />
                ))}

                {/* X & Y Axes */}
                <line x1={0} y1={originY} x2={width} y2={originY} stroke="#64748b" strokeWidth="1" />
                <line x1={originX} y1={0} x2={originX} y2={height} stroke="#64748b" strokeWidth="1" />

                {/* Axis Labels */}
                <text x={width - 8} y={originY - 2} fontSize="7" fill="#64748b" fontWeight="bold">x</text>
                <text x={originX + 2} y={8} fontSize="7" fill="#64748b" fontWeight="bold">y</text>

                {/* Plotted Line */}
                {pathD && (
                  <path d={pathD} stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                )}

                {/* Trace Cursor */}
                {isTracing && (
                  <g>
                    <circle cx={traceSvgX} cy={traceSvgY} r="4" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <line x1={traceSvgX - 6} y1={traceSvgY} x2={traceSvgX + 6} y2={traceSvgY} stroke="#78350f" strokeWidth="1" />
                    <line x1={traceSvgX} y1={traceSvgY - 6} x2={traceSvgX} y2={traceSvgY + 6} stroke="#78350f" strokeWidth="1" />
                  </g>
                )}
              </svg>

              {/* Function Label Badge */}
              {activeFn && !isFunctionEntryActive && (
                <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-xs border border-sky-300 rounded px-1.5 py-0.5 text-[9px] font-mono font-bold text-sky-800 shadow-xs">
                  f1(x) = {activeFn}
                </div>
              )}

              {/* Interactive Trace Coordinate Box */}
              {isTracing && (
                <div className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-md border border-amber-500 font-mono text-[10px] font-black flex items-center gap-1 animate-pulse">
                  <span>({traceX}, {traceY})</span>
                  {traceX === 0 && (
                    <span className="text-[8px] bg-slate-900 text-amber-300 px-1 rounded uppercase">
                      y-int
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Split Screen Table (via CTRL + T) */}
            {showTable && (
              <div className="w-[45%] border-l-2 border-sky-700 bg-white flex flex-col text-[9px] font-mono overflow-hidden animate-fadeIn">
                <div className="bg-[#0f2942] text-sky-100 font-bold px-1.5 py-0.5 flex justify-between border-b border-sky-800">
                  <span>Table</span>
                  <span className="text-[8px] text-amber-300">f1(x)</span>
                </div>
                <div className="grid grid-cols-2 bg-slate-100 font-bold text-slate-700 border-b border-slate-300 px-1 py-0.5">
                  <span>x</span>
                  <span>f1(x)</span>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                  {tableRows.map((row) => (
                    <div
                      key={row.x}
                      className={`grid grid-cols-2 px-1 py-0.5 ${
                        row.x === 0 ? 'bg-amber-50 font-black text-amber-900' : 'text-slate-800'
                      }`}
                    >
                      <span>{row.x}</span>
                      <span>{row.y}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Context Menu Overlay */}
          {graphsMenuOpen && (
            <div className="absolute inset-x-2 top-6 bottom-2 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border-2 border-sky-600 flex flex-col z-30 font-sans overflow-hidden text-xs">
              <div className="bg-[#0f2942] text-white px-2 py-1 font-bold text-[10px] flex justify-between">
                <span>Graphs Menu</span>
                <span className="text-[9px] text-sky-300">[esc] to close</span>
              </div>
              <div className="flex-1 p-1 space-y-0.5 overflow-y-auto">
                {graphsSubmenu === 'none' ? (
                  [
                    '1: Actions',
                    '2: View',
                    '3: Graph Entry/Edit >',
                    '4: Window / Zoom >',
                    '5: Trace >',
                    '6: Analyze Graph >',
                    '7: Table (Ctrl+T)',
                    '8: Settings...',
                  ].map((m, idx) => (
                    <div
                      key={m}
                      onClick={() => handleCalculatorKeyPress((idx + 1).toString())}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        graphsMenuIndex === idx
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {m}
                    </div>
                  ))
                ) : graphsSubmenu === 'window' ? (
                  [
                    '1: Window Settings...',
                    '2: Zoom - Box',
                    '3: Zoom - In',
                    '4: Zoom - Out',
                    '5: Zoom - Standard',
                    '6: Zoom - Decimal',
                    '7: Zoom - Data',
                    '8: Zoom - Fit (A)',
                  ].map((zm, idx) => (
                    <div
                      key={zm}
                      onClick={() => {
                        if (idx === 7) handleCalculatorKeyPress('8');
                      }}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        idx === 7 ? 'bg-amber-400 text-slate-950 font-black' : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {zm}
                    </div>
                  ))
                ) : (
                  ['1: Graph Trace', '2: Trace Step', '3: Erase Trace'].map((tm, idx) => (
                    <div
                      key={tm}
                      onClick={() => {
                        if (idx === 0) handleCalculatorKeyPress('1');
                      }}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {tm}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // 5. LISTS & SPREADSHEET APPLICATION
    if (activeScreen === 'spreadsheet') {
      return (
        <div className="relative w-full h-full bg-white text-slate-900 font-sans flex flex-col overflow-hidden text-xs">
          {/* Header */}
          <div className="bg-[#0f2942] text-sky-100 px-2 py-0.5 text-[9px] font-bold flex items-center justify-between border-b border-sky-700">
            <span className="flex items-center gap-1.5">
              <span className="bg-sky-700 px-1 rounded text-[8px]">1.1</span>
              <span>Lists & Spreadsheet</span>
            </span>
            <span className="text-[8px] text-amber-300 font-mono">
              {colAName} : {colBName}
            </span>
          </div>

          {/* Spreadsheet Table Grid */}
          <div className="flex-1 overflow-auto flex">
            {/* Main Spreadsheet Columns */}
            <div className="flex-1">
              <table className="w-full border-collapse font-mono text-[10px]">
                <thead>
                  {/* Column Letter Row */}
                  <tr className="bg-slate-200 text-slate-700 text-center font-bold">
                    <th className="w-6 border border-slate-300 py-0.5 bg-slate-300" />
                    <th className="w-16 border border-slate-300 py-0.5">A</th>
                    <th className="w-16 border border-slate-300 py-0.5">B</th>
                    <th className="w-20 border border-slate-300 py-0.5">C</th>
                    <th className="border border-slate-300 py-0.5">D</th>
                  </tr>
                  {/* Column Header Name Row (x and y) */}
                  <tr className="bg-slate-100 text-center">
                    <td className="border border-slate-300 font-sans text-[8px] bg-slate-200 text-slate-600">
                      name
                    </td>
                    <td
                      onClick={() => setSelectedCell({ row: 0, col: 'A' })}
                      className={`border border-slate-300 py-0.5 font-bold cursor-pointer ${
                        selectedCell.row === 0 && selectedCell.col === 'A'
                          ? 'bg-amber-300 text-slate-950 ring-2 ring-amber-400'
                          : 'bg-white text-blue-700'
                      }`}
                    >
                      {colAName || <span className="text-slate-300">▫</span>}
                    </td>
                    <td
                      onClick={() => setSelectedCell({ row: 0, col: 'B' })}
                      className={`border border-slate-300 py-0.5 font-bold cursor-pointer ${
                        selectedCell.row === 0 && selectedCell.col === 'B'
                          ? 'bg-amber-300 text-slate-950 ring-2 ring-amber-400'
                          : 'bg-white text-blue-700'
                      }`}
                    >
                      {colBName || <span className="text-slate-300">▫</span>}
                    </td>
                    <td className="border border-slate-300 py-0.5 text-slate-400 bg-slate-50 text-[9px]">
                      {regressionResult ? 'title' : ''}
                    </td>
                    <td className="border border-slate-300 py-0.5 text-slate-400 bg-slate-50 text-[9px]">
                      {regressionResult ? 'LinReg' : ''}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((rowIdx) => {
                    const rowNum = rowIdx + 1;
                    const rData = tableData[rowIdx] || { x: '', y: '' };

                    // Regression Results formatted into Col C & D
                    let cLabel = '';
                    let dVal = '';
                    if (regressionResult) {
                      if (rowIdx === 0) {
                        cLabel = 'RegEqn';
                        dVal = 'm*x+b';
                      } else if (rowIdx === 1) {
                        cLabel = 'm';
                        dVal = `${regressionResult.m}`;
                      } else if (rowIdx === 2) {
                        cLabel = 'b';
                        dVal = `${regressionResult.b}`;
                      } else if (rowIdx === 3) {
                        cLabel = 'r²';
                        dVal = `${regressionResult.r2}`;
                      }
                    }

                    return (
                      <tr key={rowNum} className="text-center h-5">
                        <td className="border border-slate-300 bg-slate-200 text-slate-600 font-sans font-bold text-[9px] py-0.5">
                          {rowNum}
                        </td>
                        <td
                          onClick={() => setSelectedCell({ row: rowNum, col: 'A' })}
                          className={`border border-slate-300 py-0.5 cursor-pointer ${
                            selectedCell.row === rowNum && selectedCell.col === 'A'
                              ? 'bg-amber-300 text-slate-950 font-black ring-2 ring-amber-400'
                              : 'bg-white text-slate-900'
                          }`}
                        >
                          {rData.x || <span className="opacity-0 select-none">0</span>}
                        </td>
                        <td
                          onClick={() => setSelectedCell({ row: rowNum, col: 'B' })}
                          className={`border border-slate-300 py-0.5 cursor-pointer ${
                            selectedCell.row === rowNum && selectedCell.col === 'B'
                              ? 'bg-amber-300 text-slate-950 font-black ring-2 ring-amber-400'
                              : 'bg-white text-slate-900'
                          }`}
                        >
                          {rData.y || <span className="opacity-0 select-none">0</span>}
                        </td>
                        <td className="border border-slate-300 py-0.5 bg-slate-50 text-slate-700 text-[9px] font-semibold text-left px-1">
                          {cLabel}
                        </td>
                        <td className="border border-slate-300 py-0.5 bg-slate-50 text-emerald-700 text-[9px] font-bold text-left px-1">
                          {dVal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Context Menu Overlay */}
          {spreadsheetMenuOpen && (
            <div className="absolute inset-x-2 top-6 bottom-2 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border-2 border-sky-600 flex flex-col z-30 font-sans overflow-hidden text-xs">
              <div className="bg-[#0f2942] text-white px-2 py-1 font-bold text-[10px] flex justify-between">
                <span>Spreadsheet Menu</span>
                <span className="text-[9px] text-sky-300">[esc] to close</span>
              </div>
              <div className="flex-1 p-1 space-y-0.5 overflow-y-auto">
                {spreadsheetSubmenu === 'none' ? (
                  ['1: Actions', '2: Insert', '3: Data', '4: Statistics >', '5: Table'].map((m, idx) => (
                    <div
                      key={m}
                      onClick={() => handleCalculatorKeyPress((idx + 1).toString())}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        spreadsheetMenuIndex === idx
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {m}
                    </div>
                  ))
                ) : spreadsheetSubmenu === 'stats' ? (
                  ['1: Stat Calculations >', '2: Stat Tests', '3: Confidence Intervals'].map((sm, idx) => (
                    <div
                      key={sm}
                      onClick={() => {
                        if (idx === 0) handleCalculatorKeyPress('1');
                      }}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {sm}
                    </div>
                  ))
                ) : (
                  [
                    '1: One-Variable Statistics...',
                    '2: Two-Variable Statistics...',
                    '3: Linear Regression (mx+b)...',
                    '4: Linear Regression (a+bx)...',
                    '5: Quadratic Regression...',
                  ].map((cm, idx) => (
                    <div
                      key={cm}
                      onClick={() => {
                        if (idx === 2) handleCalculatorKeyPress('3');
                      }}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        idx === 2 ? 'bg-amber-400 text-slate-950 font-black' : 'hover:bg-sky-50 text-slate-800'
                      }`}
                    >
                      {cm}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // 6. LINEAR REGRESSION DIALOG
    if (activeScreen === 'regression_dialog') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex items-center justify-center font-sans p-2">
          <div className="bg-[#1b2a47] border border-sky-500 rounded-xl p-3 shadow-2xl w-full max-w-[260px] text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-sky-700 pb-1">
              <span className="font-bold text-[10px] text-sky-200">Linear Regression (mx+b)</span>
              <span className="text-[9px] text-slate-400">TI-Nspire</span>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">X List:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-amber-300 border border-slate-700">
                  '{colAName || 'x'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Y List:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-amber-300 border border-slate-700">
                  '{colBName || 'y'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Save RegEqn to:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-sky-300 border border-slate-700">
                  f1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">1st Result Column:</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300 border border-slate-700">
                  c[]
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-sky-800">
              <button
                type="button"
                onClick={() => handleCalculatorKeyPress('enter')}
                className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                  regDialogFocus === 'ok'
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-md'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen('spreadsheet')}
                className="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-400 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Completion View
  if (isLevelComplete) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-400 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              TI-Nspire CX Graphing & Statistics Mastery
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              Level 2 Complete
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg mx-auto">
              Superb work! You have successfully mastered both core classroom workflows on the TI-Nspire CX School Property handheld.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-lg mx-auto text-left space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">
              Workflows & Procedures Verified:
            </h3>
            <ul className="space-y-2 text-sm font-bold text-slate-800">
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Workflow A: Equation → Graph → Table</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Window / Zoom → Zoom-Fit scaling adjustment</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Graph Trace → Y-Intercept identification at x = 0</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>CTRL + T Function Table toggle alongside graph</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Workflow B: Table → Linear Regression → Equation</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lists & Spreadsheet data entry and column naming</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Linear Regression (mx+b) calculation & auto-save to f1</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setCurrentModuleIdx(0);
                setIsLevelComplete(false);
                setCompletedModules({});
                resetModuleState(0);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Level 2 Again</span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Calculator Lab</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 pb-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-1 mb-1.5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Calculator Lab Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 hidden sm:inline">
            Progress:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-700">
            {completedCount} of {LEVEL_2_MODULES.length} Modules Complete
          </span>
        </div>
      </div>

      {/* Main Grid: Guided Practice Panel (Left) & TI-Nspire Visualizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-start">
        {/* Left Column: Interactive Instructional Guide (Stationary) */}
        <div className="lg:col-span-5 space-y-2.5 lg:sticky lg:top-2">
          {/* Module Header Card */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <LineChart className="w-3 h-3 text-indigo-600" />
                  <span>LEVEL 2</span>
                </span>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  {currentModule.workflow === 'A'
                    ? 'Workflow A • Equation → Graph → Table'
                    : 'Workflow B • Table → LinReg → Equation'}
                </span>
              </div>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                Module {currentModule.number} of {LEVEL_2_MODULES.length}
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {currentModule.title}
            </h1>

            {/* 13-Module Progress Steps */}
            <div className="pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between gap-1">
                {LEVEL_2_MODULES.map((mod, idx) => {
                  const isCurrent = currentModuleIdx === idx;
                  const isDone = !!completedModules[mod.number];

                  return (
                    <div
                      key={mod.id}
                      onClick={() => setCurrentModuleIdx(idx)}
                      className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-indigo-600 ring-2 ring-indigo-300'
                          : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                      title={`Module ${mod.number}: ${mod.title}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Module Task Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-3.5 border border-indigo-500/30 shadow-lg space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Classroom Procedure Task</span>
              </span>

              {feedback.status === 'correct' && (
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              )}
            </div>

            <div className="bg-black/40 rounded-xl p-2.5 sm:p-3 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                Target Action
              </span>
              <div className="text-lg sm:text-xl font-mono font-black text-amber-300 tracking-wide">
                {currentModule.task}
              </div>
            </div>

            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-sky-300 font-bold block mb-0.5">Instruction:</span>
              {currentModule.instruction}
            </div>

            {/* Feedback & Progression Area */}
            {feedback.status === 'idle' && (
              <div className="bg-slate-800/80 rounded-xl p-2.5 sm:p-3 border border-slate-700 text-xs text-slate-300 space-y-1 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-200 block text-[11px]">Classroom Practice Ready:</span>
                  Perform the workflow on the TI-Nspire calculator on the right.
                </div>
              </div>
            )}

            {feedback.status === 'incorrect' && (
              <div className="bg-rose-950/70 border-2 border-rose-500 rounded-xl p-3 text-rose-100 space-y-1.5 animate-shake">
                <div className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-wide">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Procedural Adjustment</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed">
                  {feedback.message}
                </p>
              </div>
            )}

            {feedback.status === 'correct' && (
              <div className="bg-emerald-950/80 border-2 border-emerald-500 rounded-xl p-3 sm:p-3.5 text-emerald-100 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Correct Response ✓</span>
                </div>
                <div className="text-xs font-medium leading-relaxed whitespace-pre-line text-emerald-50">
                  {feedback.message.replace('Correct Response ✓\n', '')}
                </div>

                <button
                  type="button"
                  onClick={handleNextModule}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {currentModuleIdx + 1 < LEVEL_2_MODULES.length
                      ? `Continue to Module ${currentModuleIdx + 2}`
                      : 'View Level 2 Completion'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Reset / Try Again */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => resetModuleState(currentModuleIdx)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                title="Reset this step"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Step</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                TI-Nspire CX School Property
              </span>
            </div>
          </div>

          {/* Quick Procedure Reference Box */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Classroom Procedure Reference:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
                  <LineChart className="w-3 h-3 text-blue-600" />
                  <span>Workflow A</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Home → New Doc → Graphs → f1(x)= → Graph → Trace → Table (Ctrl+T)
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
                  <TableIcon className="w-3 h-3 text-emerald-600" />
                  <span>Workflow B</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Home → New Doc → Spreadsheet → x & y → Menu → Stats → LinReg (mx+b)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic TI-Nspire CX Visualizer (Independent Vertical Scroll) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:max-h-[calc(100vh-75px)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 lg:overscroll-contain">
          <div className="w-full max-w-[480px] pb-6">
            <InteractiveNspireVisualizer
              key={`nspire-l2-${currentModuleIdx}-${resetCounter}`}
              resetSignal={resetCounter}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1={
                activeScreen === 'graphs'
                  ? 'Graphs • Page 1.1'
                  : activeScreen === 'spreadsheet'
                  ? 'Lists & Spreadsheet • Page 1.1'
                  : activeScreen === 'home'
                  ? 'Home'
                  : 'Document'
              }
              customLcdContent={renderLcdContent()}
              notes="Click the physical handheld keys or type on your keyboard to navigate."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
