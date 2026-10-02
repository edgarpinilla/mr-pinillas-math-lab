import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Settings,
  Folder,
  Trash2,
  Table as TableIcon,
  LineChart,
  Calculator as CalcIcon,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';
import { evaluateNspireExpression } from './nspireEngine';

export interface CalculatorFreeUseProps {
  onBack: () => void;
}

type ActiveApp =
  | 'home'
  | 'save_prompt'
  | 'add_app'
  | 'scratchpad_calc'
  | 'graphs'
  | 'spreadsheet'
  | 'browse'
  | 'doc_settings'
  | 'delete_dialog';

/**
 * Universal dynamic 2x2 linear equation system solver via Cramer's Rule
 */
function solveLinearSystem(
  eq1: string,
  eq2: string
): { x: number; y: number; solutionStr: string } | null {
  const parseLine = (eq: string): { a: number; b: number; c: number } | null => {
    let clean = eq.replace(/\s+/g, '').toLowerCase();
    if (!clean) return null;
    if (!clean.includes('=')) {
      clean = 'y=' + clean;
    }
    const [leftStr, rightStr] = clean.split('=');

    const extractCoeffs = (side: string): { a: number; b: number; c: number } => {
      let a = 0;
      let b = 0;
      let c = 0;
      const regex = /([+-]?[^+-]+)/g;
      const terms = side.match(regex) || [];

      for (const term of terms) {
        if (term.includes('x')) {
          const coeffStr = term.replace('x', '');
          if (coeffStr === '' || coeffStr === '+') a += 1;
          else if (coeffStr === '-') a -= 1;
          else a += parseFloat(coeffStr) || 0;
        } else if (term.includes('y')) {
          const coeffStr = term.replace('y', '');
          if (coeffStr === '' || coeffStr === '+') b += 1;
          else if (coeffStr === '-') b -= 1;
          else b += parseFloat(coeffStr) || 0;
        } else {
          c += parseFloat(term) || 0;
        }
      }
      return { a, b, c };
    };

    const leftCoeffs = extractCoeffs(leftStr);
    const rightCoeffs = extractCoeffs(rightStr);

    const a = leftCoeffs.a - rightCoeffs.a;
    const b = leftCoeffs.b - rightCoeffs.b;
    const c = rightCoeffs.c - leftCoeffs.c;

    return { a, b, c };
  };

  const line1 = parseLine(eq1);
  const line2 = parseLine(eq2);

  if (!line1 || !line2) return null;

  const D = line1.a * line2.b - line2.a * line1.b;
  if (Math.abs(D) < 1e-9) {
    return null;
  }

  const Dx = line1.c * line2.b - line2.c * line1.b;
  const Dy = line1.a * line2.c - line2.a * line1.c;

  const rawX = Dx / D;
  const rawY = Dy / D;

  const x = Math.abs(rawX - Math.round(rawX)) < 1e-6 ? Math.round(rawX) : parseFloat(rawX.toFixed(2));
  const y = Math.abs(rawY - Math.round(rawY)) < 1e-6 ? Math.round(rawY) : parseFloat(rawY.toFixed(2));

  return {
    x,
    y,
    solutionStr: `{${x}, ${y}}`,
  };
}

/**
 * Universal linear function evaluator f(x)
 */
function evaluateLinearFunctionAt(fnStr: string, xVal: number): number {
  try {
    let clean = fnStr.replace(/\s+/g, '').toLowerCase();
    if (clean.startsWith('f1(x)=') || clean.startsWith('f2(x)=')) {
      clean = clean.split('=')[1];
    }
    clean = clean.replace(/([0-9])x/g, `$1*(${xVal})`);
    clean = clean.replace(/x/g, `(${xVal})`);
    const evalRes = evaluateNspireExpression(clean);
    const val = parseFloat(evalRes.result);
    return isNaN(val) ? 0 : val;
  } catch {
    return 0;
  }
}

export const CalculatorFreeUse: React.FC<CalculatorFreeUseProps> = ({ onBack }) => {
  // Continuous Handheld Application State
  const [activeApp, setActiveApp] = useState<ActiveApp>('scratchpad_calc');
  const [currentDocApp, setCurrentDocApp] = useState<ActiveApp>('scratchpad_calc');
  const [homeSelection, setHomeSelection] = useState<number>(1);
  const [homeSection, setHomeSection] = useState<'scratchpad' | 'documents' | 'apps'>('scratchpad');
  const [homeScratchpadIdx, setHomeScratchpadIdx] = useState<'a' | 'b'>('a');
  const [homeDocSelection, setHomeDocSelection] = useState<number>(1); // 1: New, 2: Browse, 3: Recent..., 4: Current, 5: Settings...
  const [homeAppIdx, setHomeAppIdx] = useState<number>(1); // 1 to 7
  const [recentMenuOpen, setRecentMenuOpen] = useState<boolean>(false);
  const [pressToTestActive, setPressToTestActive] = useState<boolean>(false);
  const [addAppSelection, setAddAppSelection] = useState<number>(1);
  const [savePromptSelection, setSavePromptSelection] = useState<'yes' | 'no'>('no');

  // Calculator (LinSolve & Algebra Menu) State — Starts Completely Blank
  const [calcMenuOpen, setCalcMenuOpen] = useState<boolean>(false);
  const [calcSubmenu, setCalcSubmenu] = useState<'none' | 'number' | 'algebra' | 'solve_systems'>('none');
  const [isLinSolveActive, setIsLinSolveActive] = useState<boolean>(false);
  const [isLinSolveDialogOpen, setIsLinSolveDialogOpen] = useState<boolean>(false);
  const [activeLinSolveBox, setActiveLinSolveBox] = useState<1 | 2>(1);
  const [sysEq1, setSysEq1] = useState<string>('');
  const [sysEq2, setSysEq2] = useState<string>('');
  const [linSolveResult, setLinSolveResult] = useState<{ x: number; y: number; solutionStr: string } | null>(null);

  // Graphs Application State — Starts Completely Blank
  const [graphF1, setGraphF1] = useState<string>('');
  const [graphF2, setGraphF2] = useState<string>('');
  const [activeGraphEntry, setActiveGraphEntry] = useState<1 | 2>(1);
  const [isFunctionEntryActive, setIsFunctionEntryActive] = useState<boolean>(true);
  const [graphWindow, setGraphWindow] = useState<{ xMin: number; xMax: number; yMin: number; yMax: number }>({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 30,
  });
  const [isZoomInMode, setIsZoomInMode] = useState<boolean>(false);
  const [zoomCursor, setZoomCursor] = useState<{ x: number; y: number }>({ x: 0, y: 10 });
  const [traceMode, setTraceMode] = useState<'none' | 'graph_trace' | 'trace_all'>('none');
  const [traceX, setTraceX] = useState<number>(0);
  const [activeTraceFunctionIndex, setActiveTraceFunctionIndex] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [graphsMenuOpen, setGraphsMenuOpen] = useState<boolean>(false);
  const [graphsSubmenu, setGraphsSubmenu] = useState<'none' | 'window' | 'trace'>('none');

  // Lists & Spreadsheet Application State — Starts Completely Blank
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: 'A' | 'B' }>({ row: 0, col: 'A' });
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
  const [isRegDialogOpen, setIsRegDialogOpen] = useState<boolean>(false);
  const [regressionResult, setRegressionResult] = useState<{
    m: number;
    b: number;
    r2: number;
    r: number;
    eqStr: string;
  } | null>(null);

  // Documents & Settings State
  const [browseMenuOpen, setBrowseMenuOpen] = useState<boolean>(false);
  const [browseSelection, setBrowseSelection] = useState<string>('c');
  const [docMenuOpen, setDocMenuOpen] = useState<boolean>(false);
  const [docSettingsDigits, setDocSettingsDigits] = useState<string>('Float 8');

  // Dedicated measurement refs for headers and unscaled TI-Nspire casing
  const freeUseHeaderRef = useRef<HTMLElement>(null);
  const calculatorInnerRef = useRef<HTMLDivElement>(null);

  // Dynamic unscaled physical casing height of TI-Nspire CX visualizer (measured via DOM, defaults to 960px)
  const [naturalHeight, setNaturalHeight] = useState<number>(960);
  const baseWidth = 465;

  // Proportional fit-to-screen scale state
  const [scale, setScale] = useState<number>(0.82);
  const [workspaceHeight, setWorkspaceHeight] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.max(360, window.innerHeight - 54);
    }
    return 700;
  });

  const recalculateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;

    // 1. Determine ACTUAL Math Lab header height
    const mathLabHeaderEl = document.querySelector('header');
    let mathLabHeaderHeight = 48;
    if (mathLabHeaderEl && mathLabHeaderEl !== freeUseHeaderRef.current) {
      const rect = mathLabHeaderEl.getBoundingClientRect();
      if (rect.height > 0) {
        mathLabHeaderHeight = rect.height;
      }
    }

    // 2. Free Use workspace container height (fits inside browser window below Math Lab header without window scrolling)
    const availableWorkspaceH = Math.max(340, window.innerHeight - mathLabHeaderHeight - 4);
    setWorkspaceHeight(availableWorkspaceH);

    // 3. Free-Use Workspace header height
    const freeUseHeaderHeight = freeUseHeaderRef.current
      ? freeUseHeaderRef.current.getBoundingClientRect().height
      : 34;

    // 4. Measure actual unscaled calculator height from DOM if available
    let currentNaturalH = naturalHeight;
    if (calculatorInnerRef.current) {
      const measuredH = calculatorInnerRef.current.offsetHeight;
      if (measuredH > 700) {
        currentNaturalH = measuredH;
        if (Math.abs(measuredH - naturalHeight) > 2) {
          setNaturalHeight(measuredH);
        }
      }
    }

    // 5. ACTUAL available vertical space inside main for the calculator handheld:
    // Small safe top margin (6px) + small safe bottom margin (6px) = 12px total
    const safeMarginBuffer = 12;
    const availableH = Math.max(260, availableWorkspaceH - freeUseHeaderHeight - safeMarginBuffer);
    const availableW = Math.max(260, window.innerWidth - 16);

    // Sized by the EXACT ratio so it uses 100% of available height without clipping
    const scaleH = availableH / currentNaturalH;
    const scaleW = availableW / baseWidth;

    // Largest practical proportional size that fits completely in the available viewport
    const fitScale = Math.min(scaleH, scaleW);
    setScale(Math.max(0.40, Math.min(1.05, fitScale)));
  }, [naturalHeight, baseWidth]);

  useEffect(() => {
    recalculateDimensions();
    window.addEventListener('resize', recalculateDimensions);
    return () => window.removeEventListener('resize', recalculateDimensions);
  }, [recalculateDimensions]);

  // Observer on unscaled calculator to accurately detect natural height changes
  useEffect(() => {
    const el = calculatorInnerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        if (h > 700) {
          setNaturalHeight((prev) => (Math.abs(prev - h) > 2 ? h : prev));
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Recalculate whenever activeApp or view changes
  useEffect(() => {
    const timer = setTimeout(() => {
      recalculateDimensions();
    }, 30);
    return () => clearTimeout(timer);
  }, [activeApp, isLinSolveActive, calcMenuOpen, isLinSolveDialogOpen, showTable, recalculateDimensions]);

  // Helper to switch active application and remember current document for Home -> Current
  const navigateToApp = (app: ActiveApp) => {
    if (app === 'scratchpad_calc' || app === 'graphs' || app === 'spreadsheet') {
      setCurrentDocApp(app);
    }
    setActiveApp(app);
  };

  // Dynamic active functions for Graph Trace — Only includes student-entered functions
  const activeGraphedFunctions = useMemo(() => {
    const list: { id: string; label: string; expr: string; color: string }[] = [];
    if (graphF1 && graphF1.trim()) {
      list.push({ id: 'f1', label: 'f1', expr: graphF1.trim(), color: '#38bdf8' });
    }
    if (graphF2 && graphF2.trim()) {
      list.push({ id: 'f2', label: 'f2', expr: graphF2.trim(), color: '#34d399' });
    }
    return list;
  }, [graphF1, graphF2]);

  const currentTracedFn = useMemo(() => {
    if (activeGraphedFunctions.length === 0) {
      return null;
    }
    const idx =
      ((activeTraceFunctionIndex % activeGraphedFunctions.length) +
        activeGraphedFunctions.length) %
      activeGraphedFunctions.length;
    return activeGraphedFunctions[idx];
  }, [activeGraphedFunctions, activeTraceFunctionIndex]);

  // Linear regression computation
  const computeRegression = () => {
    const valid = tableData
      .map((d) => ({ x: parseFloat(d.x), y: parseFloat(d.y) }))
      .filter((p) => !isNaN(p.x) && !isNaN(p.y));

    if (valid.length < 2) return null;

    const n = valid.length;
    const sumX = valid.reduce((acc, p) => acc + p.x, 0);
    const sumY = valid.reduce((acc, p) => acc + p.y, 0);
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

  // Keyboard routing for simulated calculator
  const handleCalculatorKeyPress = (keyId: string) => {
    const k = keyId.toLowerCase().trim();

    // 1. GLOBAL KEYS
    if (k === 'on' || k === 'home') {
      if (pressToTestActive) {
        setPressToTestActive(false);
      }
      if (recentMenuOpen) {
        setRecentMenuOpen(false);
      }
      // Preserve current application before switching to Home
      if (activeApp === 'scratchpad_calc' || activeApp === 'graphs' || activeApp === 'spreadsheet') {
        setCurrentDocApp(activeApp);
      }
      setActiveApp('home');
      setHomeSection('scratchpad');
      setHomeScratchpadIdx('a');
      setCalcMenuOpen(false);
      setGraphsMenuOpen(false);
      setSpreadsheetMenuOpen(false);
      setIsLinSolveDialogOpen(false);
      setIsRegDialogOpen(false);
      return;
    }

    // Dismiss Press-to-Test screen with ESC or ENTER
    if (pressToTestActive) {
      if (k === 'esc' || k === 'enter') {
        setPressToTestActive(false);
        return;
      }
    }

    if (k === 'scratchpad') {
      if (activeApp === 'graphs') {
        setActiveApp('scratchpad_calc');
      } else {
        setActiveApp('graphs');
      }
      return;
    }

    if (k === 'doc') {
      if (activeApp === 'doc_settings') {
        setActiveApp('scratchpad_calc');
      } else {
        setActiveApp('doc_settings');
      }
      return;
    }

    // 2. HOME SCREEN ROUTING
    if (activeApp === 'home') {
      // Recent Documents modal navigation
      if (recentMenuOpen) {
        if (k === 'esc') {
          setRecentMenuOpen(false);
          return;
        }
        if (k === 'enter' || k === '1') {
          setRecentMenuOpen(false);
          navigateToApp(currentDocApp);
          return;
        }
        if (k === '2') {
          setRecentMenuOpen(false);
          navigateToApp('graphs');
          return;
        }
        if (k === '3') {
          setRecentMenuOpen(false);
          navigateToApp('spreadsheet');
          return;
        }
        return;
      }

      // Direct letter and number shortcuts
      if (k === 'a' || k === 'calculate') {
        setHomeSection('scratchpad');
        setHomeScratchpadIdx('a');
        navigateToApp('scratchpad_calc');
        return;
      }
      if (k === 'b' || k === 'graph') {
        setHomeSection('scratchpad');
        setHomeScratchpadIdx('b');
        navigateToApp('graphs');
        return;
      }
      if (k === '1') {
        setHomeSection('documents');
        setHomeDocSelection(1);
        setHomeSelection(1);
        setActiveApp('save_prompt');
        return;
      }
      if (k === '2') {
        setHomeSection('documents');
        setHomeDocSelection(2);
        setHomeSelection(2);
        setActiveApp('browse');
        return;
      }
      if (k === '3') {
        setHomeSection('documents');
        setHomeDocSelection(3);
        setHomeSelection(3);
        setRecentMenuOpen(true);
        return;
      }
      if (k === '4') {
        setHomeSection('documents');
        setHomeDocSelection(4);
        setHomeSelection(4);
        navigateToApp(currentDocApp);
        return;
      }
      if (k === '5') {
        setHomeSection('documents');
        setHomeDocSelection(5);
        setHomeSelection(5);
        setActiveApp('doc_settings');
        return;
      }

      // Arrow navigation
      if (k === 'left') {
        if (homeSection === 'documents') {
          setHomeSection('scratchpad');
        } else if (homeSection === 'apps') {
          setHomeAppIdx((prev) => (prev > 1 ? prev - 1 : 7));
        }
        return;
      }
      if (k === 'right') {
        if (homeSection === 'scratchpad') {
          setHomeSection('documents');
        } else if (homeSection === 'apps') {
          setHomeAppIdx((prev) => (prev < 7 ? prev + 1 : 1));
        }
        return;
      }
      if (k === 'up') {
        if (homeSection === 'scratchpad') {
          setHomeScratchpadIdx('a');
        } else if (homeSection === 'documents') {
          setHomeDocSelection((prev) => {
            const next = Math.max(1, prev - 1);
            setHomeSelection(next);
            return next;
          });
        } else if (homeSection === 'apps') {
          setHomeSection('documents');
        }
        return;
      }
      if (k === 'down') {
        if (homeSection === 'scratchpad') {
          if (homeScratchpadIdx === 'a') {
            setHomeScratchpadIdx('b');
          } else {
            setHomeSection('apps');
            setHomeAppIdx(1);
          }
        } else if (homeSection === 'documents') {
          if (homeDocSelection < 5) {
            setHomeDocSelection((prev) => {
              const next = prev + 1;
              setHomeSelection(next);
              return next;
            });
          } else {
            setHomeSection('apps');
            setHomeAppIdx(1);
          }
        }
        return;
      }
      if (k === 'tab') {
        if (homeSection === 'scratchpad') setHomeSection('documents');
        else if (homeSection === 'documents') setHomeSection('apps');
        else setHomeSection('scratchpad');
        return;
      }

      // Enter key
      if (k === 'enter') {
        if (homeSection === 'scratchpad') {
          if (homeScratchpadIdx === 'a') navigateToApp('scratchpad_calc');
          else navigateToApp('graphs');
        } else if (homeSection === 'documents') {
          if (homeDocSelection === 1) setActiveApp('save_prompt');
          else if (homeDocSelection === 2) setActiveApp('browse');
          else if (homeDocSelection === 3) setRecentMenuOpen(true);
          else if (homeDocSelection === 4) navigateToApp(currentDocApp);
          else if (homeDocSelection === 5) setActiveApp('doc_settings');
        } else if (homeSection === 'apps') {
          if (homeAppIdx === 1) navigateToApp('scratchpad_calc');
          else if (homeAppIdx === 2 || homeAppIdx === 3) navigateToApp('graphs');
          else if (homeAppIdx === 4 || homeAppIdx === 5) navigateToApp('spreadsheet');
          else navigateToApp('scratchpad_calc');
        }
        return;
      }

      if (k === 'esc') {
        navigateToApp(currentDocApp);
        return;
      }
      return;
    }

    // 3. SAVE PROMPT SCREEN
    if (activeApp === 'save_prompt') {
      if (k === 'no' || k === 'n' || (k === 'enter' && savePromptSelection === 'no')) {
        setActiveApp('add_app');
        return;
      }
      if (k === 'left' || k === 'right' || k === 'tab') {
        setSavePromptSelection((prev) => (prev === 'yes' ? 'no' : 'yes'));
      }
      return;
    }

    // 4. ADD APPLICATION SCREEN (New Document -> Blank Page)
    if (activeApp === 'add_app') {
      if (k === '1' || (k === 'enter' && addAppSelection === 1)) {
        // Open clean blank Calculator page
        setIsLinSolveActive(false);
        setIsLinSolveDialogOpen(false);
        setSysEq1('');
        setSysEq2('');
        setLinSolveResult(null);
        navigateToApp('scratchpad_calc');
        return;
      }
      if (k === '2' || (k === 'enter' && addAppSelection === 2)) {
        // Open clean blank Graphs page
        setGraphF1('');
        setGraphF2('');
        setActiveGraphEntry(1);
        setIsFunctionEntryActive(true);
        setTraceMode('none');
        setShowTable(false);
        setIsZoomInMode(false);
        navigateToApp('graphs');
        return;
      }
      if (k === '4' || (k === 'enter' && addAppSelection === 4)) {
        // Open clean blank Spreadsheet page
        setColAName('');
        setColBName('');
        setTableData([
          { x: '', y: '' },
          { x: '', y: '' },
          { x: '', y: '' },
          { x: '', y: '' },
        ]);
        setRegressionResult(null);
        setSelectedCell({ row: 0, col: 'A' });
        navigateToApp('spreadsheet');
        return;
      }
      if (k === 'up') setAddAppSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setAddAppSelection((prev) => Math.min(4, prev + 1));
      return;
    }

    // 5. CALCULATOR APP (including LinSolve & Algebra Menu)
    if (activeApp === 'scratchpad_calc') {
      if (k === 'esc') {
        setCalcMenuOpen(false);
        setCalcSubmenu('none');
        setIsLinSolveDialogOpen(false);
        return;
      }

      if (k === 'menu') {
        setCalcMenuOpen((prev) => !prev);
        setCalcSubmenu('none');
        return;
      }

      // LinSolve Dialog
      if (isLinSolveDialogOpen) {
        if (k === 'enter') {
          setIsLinSolveDialogOpen(false);
          setIsLinSolveActive(true);
          return;
        }
        return;
      }

      // Calculator Menu
      if (calcMenuOpen) {
        if (calcSubmenu === 'none') {
          if (k === '3' || k === 'algebra') {
            setCalcSubmenu('algebra');
            return;
          }
        } else if (calcSubmenu === 'algebra') {
          if (k === '7' || k === 'enter') {
            setCalcSubmenu('solve_systems');
            return;
          }
        } else if (calcSubmenu === 'solve_systems') {
          if (k === '1' || k === 'enter') {
            setCalcMenuOpen(false);
            setCalcSubmenu('none');
            setIsLinSolveDialogOpen(true);
            return;
          }
        }
        return;
      }

      // LinSolve Active Inputs
      if (isLinSolveActive) {
        if (k === 'up') {
          setActiveLinSolveBox(1);
          return;
        }
        if (k === 'down' || k === 'tab') {
          setActiveLinSolveBox(2);
          return;
        }
        const targetSetter = activeLinSolveBox === 1 ? setSysEq1 : setSysEq2;
        if (k === 'del' || k === 'backspace') {
          targetSetter((prev) => prev.slice(0, -1));
          return;
        }
        if (k === 'clear') {
          targetSetter('');
          return;
        }
        if (k === 'enter') {
          const res = solveLinearSystem(sysEq1, sysEq2);
          setLinSolveResult(res);
          return;
        }
        if (/^[0-9xyz\+\-\*\/\=\.\^]$/.test(k) || k === '×' || k === '÷') {
          targetSetter((prev) => prev + (k === '×' ? '*' : k === '÷' ? '/' : k));
          return;
        }
      }
    }

    // 6. GRAPHS APPLICATION
    if (activeApp === 'graphs') {
      if (k === 'esc') {
        setGraphsMenuOpen(false);
        setGraphsSubmenu('none');
        setIsZoomInMode(false);
        setTraceMode('none');
        return;
      }

      if (k === 'ctrl_t') {
        setShowTable((prev) => !prev);
        return;
      }

      if (k === 'tab') {
        setActiveGraphEntry((prev) => (prev === 1 ? 2 : 1));
        setIsFunctionEntryActive(true);
        return;
      }

      if (k === 'menu') {
        setGraphsMenuOpen((prev) => !prev);
        setGraphsSubmenu('none');
        return;
      }

      // Menu
      if (graphsMenuOpen) {
        if (graphsSubmenu === 'none') {
          if (k === '4') setGraphsSubmenu('window');
          if (k === '5') setGraphsSubmenu('trace');
          if (k === '7' || k === 't') {
            setShowTable((prev) => !prev);
            setGraphsMenuOpen(false);
          }
        } else if (graphsSubmenu === 'window') {
          if (k === 'a' || k === '8' || k === 'enter') {
            setGraphWindow({ xMin: -10, xMax: 10, yMin: -35, yMax: 80 });
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
          }
          if (k === '3') {
            setIsZoomInMode(true);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
          }
        } else if (graphsSubmenu === 'trace') {
          if (k === '1') {
            setTraceMode('graph_trace');
            setTraceX(0);
            setActiveTraceFunctionIndex(0);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
          }
          if (k === '3' || k === 'enter') {
            setTraceMode('trace_all');
            setTraceX(0);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
          }
        }
        return;
      }

      // Graph Trace Navigation
      if (traceMode === 'graph_trace') {
        if (k === 'left') {
          setTraceX((prev) => parseFloat((prev - 0.5).toFixed(2)));
          return;
        }
        if (k === 'right') {
          setTraceX((prev) => parseFloat((prev + 0.5).toFixed(2)));
          return;
        }
        if (k === 'up') {
          setActiveTraceFunctionIndex((prev) =>
            activeGraphedFunctions.length > 0
              ? (prev - 1 + activeGraphedFunctions.length) % activeGraphedFunctions.length
              : 0
          );
          return;
        }
        if (k === 'down') {
          setActiveTraceFunctionIndex((prev) =>
            activeGraphedFunctions.length > 0
              ? (prev + 1) % activeGraphedFunctions.length
              : 0
          );
          return;
        }
      }

      if (traceMode === 'trace_all') {
        if (k === 'left') {
          setTraceX((prev) => parseFloat((prev - 0.5).toFixed(2)));
          return;
        }
        if (k === 'right') {
          setTraceX((prev) => parseFloat((prev + 0.5).toFixed(2)));
          return;
        }
      }

      // Function Entry
      if (isFunctionEntryActive) {
        const targetSetter = activeGraphEntry === 1 ? setGraphF1 : setGraphF2;
        if (k === 'del' || k === 'backspace') {
          targetSetter((prev) => prev.slice(0, -1));
          return;
        }
        if (k === 'clear') {
          targetSetter('');
          return;
        }
        if (k === 'enter') {
          setIsFunctionEntryActive(false);
          return;
        }
        if (/^[0-9x\+\-\*\/\.\^]$/.test(k) || k === '×' || k === '÷') {
          targetSetter((prev) => prev + (k === '×' ? '*' : k === '÷' ? '/' : k));
          return;
        }
      }
    }

    // 7. LISTS & SPREADSHEET APPLICATION
    if (activeApp === 'spreadsheet') {
      if (k === 'esc') {
        setSpreadsheetMenuOpen(false);
        setSpreadsheetSubmenu('none');
        setIsRegDialogOpen(false);
        return;
      }

      if (k === 'menu') {
        setSpreadsheetMenuOpen((prev) => !prev);
        setSpreadsheetSubmenu('none');
        return;
      }

      if (isRegDialogOpen) {
        if (k === 'enter') {
          const res = computeRegression();
          setRegressionResult(res);
          setIsRegDialogOpen(false);
          return;
        }
        return;
      }

      if (spreadsheetMenuOpen) {
        if (spreadsheetSubmenu === 'none') {
          if (k === '4') setSpreadsheetSubmenu('stats');
        } else if (spreadsheetSubmenu === 'stats') {
          if (k === '1') setSpreadsheetSubmenu('stat_calc');
        } else if (spreadsheetSubmenu === 'stat_calc') {
          if (k === '3' || k === 'enter') {
            setSpreadsheetMenuOpen(false);
            setSpreadsheetSubmenu('none');
            setIsRegDialogOpen(true);
          }
        }
        return;
      }

      // Spreadsheet cell navigation
      if (k === 'up') setSelectedCell((prev) => ({ ...prev, row: Math.max(0, prev.row - 1) }));
      if (k === 'down') setSelectedCell((prev) => ({ ...prev, row: Math.min(3, prev.row + 1) }));
      if (k === 'left') setSelectedCell((prev) => ({ ...prev, col: 'A' }));
      if (k === 'right' || k === 'tab') setSelectedCell((prev) => ({ ...prev, col: 'B' }));
      if (/^[0-9\.\-]$/.test(k)) {
        setTableData((prev) => {
          const next = [...prev];
          const curr = next[selectedCell.row];
          if (selectedCell.col === 'A') {
            curr.x = curr.x + k;
          } else {
            curr.y = curr.y + k;
          }
          return next;
        });
        return;
      }
      if (k === 'del' || k === 'backspace') {
        setTableData((prev) => {
          const next = [...prev];
          const curr = next[selectedCell.row];
          if (selectedCell.col === 'A') {
            curr.x = curr.x.slice(0, -1);
          } else {
            curr.y = curr.y.slice(0, -1);
          }
          return next;
        });
        return;
      }
    }

    // 8. BROWSE SCREEN
    if (activeApp === 'browse') {
      if (k === 'esc') {
        setActiveApp('home');
        return;
      }
      if (k === 'menu') {
        setBrowseMenuOpen((prev) => !prev);
        return;
      }
      if (browseMenuOpen) {
        if (k === 'c') {
          setActiveApp('delete_dialog');
          setBrowseMenuOpen(false);
        }
        return;
      }
    }

    // 9. DELETE DIALOG
    if (activeApp === 'delete_dialog') {
      if (k === 'enter') {
        setActiveApp('browse');
        return;
      }
      if (k === 'esc') {
        setActiveApp('browse');
        return;
      }
    }

    // 10. DOCUMENT SETTINGS
    if (activeApp === 'doc_settings') {
      if (k === 'enter' || k === 'esc') {
        setActiveApp('scratchpad_calc');
        return;
      }
    }
  };

  // Render Application Header String
  const getScreenHeader = () => {
    switch (activeApp) {
      case 'home':
        return 'Home';
      case 'save_prompt':
      case 'add_app':
        return 'New Document';
      case 'graphs':
        return 'Graphs • Page 1.1';
      case 'spreadsheet':
        return 'Lists & Spreadsheet • Page 1.1';
      case 'browse':
      case 'delete_dialog':
        return 'My Documents';
      case 'doc_settings':
        return 'Document Settings';
      case 'scratchpad_calc':
      default:
        return 'Scratchpad • Calculate';
    }
  };

  // Render Custom Application LCD Screen Content
  const renderCustomLcdContent = () => {
    // A. HOME SCREEN - Authentic TI-Nspire CX II Physical Reference Layout
    if (activeApp === 'home') {
      return (
        <div className="w-full h-full bg-black text-white flex flex-col font-sans select-none overflow-hidden relative">
          {/* Top Status Header - Minimal TI-Nspire Style */}
          <div className="h-4.5 sm:h-5 bg-black px-2.5 pt-1 flex items-center justify-between shrink-0">
            {/* Top-Left: Small Home Icon */}
            <div className="flex items-center text-white/90">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>

            {/* Top-Right: Status Indicators (Angle Mode & Battery) */}
            <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-white/90">
              <span>RAD</span>
              <div className="w-3.5 h-2 border border-white/80 rounded-2xs p-0.2 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-3xs" />
              </div>
            </div>
          </div>

          {/* Main Two-Column Layout: Clear, Spacious Columns on Black Background */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 pt-1.5 sm:pt-2 flex-1 min-h-0">
            {/* Left Column: Scratchpad */}
            <div className="flex flex-col">
              <h2 className="text-[12px] sm:text-[13px] font-bold text-white tracking-wide mb-1.5 sm:mb-2 select-none">
                Scratchpad
              </h2>
              <div className="space-y-1 sm:space-y-1.5">
                {/* A Calculate */}
                <button
                  type="button"
                  onClick={() => {
                    setHomeSection('scratchpad');
                    setHomeScratchpadIdx('a');
                    navigateToApp('scratchpad_calc');
                  }}
                  className={`w-full text-left text-[11px] sm:text-[12px] px-2 py-0.5 sm:py-1 rounded-xs flex items-center transition-none cursor-pointer ${
                    homeSection === 'scratchpad' && homeScratchpadIdx === 'a'
                      ? 'bg-[#005fb8] text-white font-medium'
                      : 'text-slate-100 hover:text-white'
                  }`}
                >
                  <span className="w-4.5 sm:w-5 font-semibold shrink-0">A</span>
                  <span>Calculate</span>
                </button>

                {/* B Graph */}
                <button
                  type="button"
                  onClick={() => {
                    setHomeSection('scratchpad');
                    setHomeScratchpadIdx('b');
                    navigateToApp('graphs');
                  }}
                  className={`w-full text-left text-[11px] sm:text-[12px] px-2 py-0.5 sm:py-1 rounded-xs flex items-center transition-none cursor-pointer ${
                    homeSection === 'scratchpad' && homeScratchpadIdx === 'b'
                      ? 'bg-[#005fb8] text-white font-medium'
                      : 'text-slate-100 hover:text-white'
                  }`}
                >
                  <span className="w-4.5 sm:w-5 font-semibold shrink-0">B</span>
                  <span>Graph</span>
                </button>
              </div>
            </div>

            {/* Right Column: Documents */}
            <div className="flex flex-col">
              <h2 className="text-[12px] sm:text-[13px] font-bold text-white tracking-wide mb-1.5 sm:mb-2 select-none">
                Documents
              </h2>
              <div className="space-y-0.5 sm:space-y-1">
                {[
                  { id: 1, keyBadge: '1', label: 'New', action: () => setActiveApp('save_prompt') },
                  { id: 2, keyBadge: '2', label: 'Browse', action: () => setActiveApp('browse') },
                  { id: 3, keyBadge: '3', label: 'Recent...', action: () => setRecentMenuOpen(true) },
                  { id: 4, keyBadge: '4', label: 'Current', action: () => navigateToApp(currentDocApp) },
                  { id: 5, keyBadge: '5', label: 'Settings...', action: () => setActiveApp('doc_settings') },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setHomeSection('documents');
                      setHomeDocSelection(item.id);
                      setHomeSelection(item.id);
                      item.action();
                    }}
                    className={`w-full text-left text-[10.5px] sm:text-[11.5px] px-2 py-0.5 sm:py-0.8 rounded-xs flex items-center transition-none cursor-pointer ${
                      homeSection === 'documents' && homeDocSelection === item.id
                        ? 'bg-[#005fb8] text-white font-medium'
                        : 'text-slate-100 hover:text-white'
                    }`}
                  >
                    <span className="w-4.5 sm:w-5 font-semibold shrink-0">{item.keyBadge}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Application Icons: Exactly 7 Large Square Icons Across Display */}
          <div className="pb-1.5 sm:pb-2 pt-1 flex items-center justify-center gap-1.5 sm:gap-2 shrink-0">
            {[
              {
                id: 1,
                label: 'Calculator',
                bg: 'bg-[#005fb8]',
                action: () => navigateToApp('scratchpad_calc'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" strokeWidth="2.5" />
                    <circle cx="8" cy="11" r="1" fill="currentColor" />
                    <circle cx="12" cy="11" r="1" fill="currentColor" />
                    <circle cx="16" cy="11" r="1" fill="currentColor" />
                    <circle cx="8" cy="15" r="1" fill="currentColor" />
                    <circle cx="12" cy="15" r="1" fill="currentColor" />
                    <circle cx="16" cy="15" r="1" fill="currentColor" />
                    <circle cx="8" cy="19" r="1" fill="currentColor" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" />
                    <circle cx="16" cy="19" r="1" fill="currentColor" />
                  </svg>
                ),
              },
              {
                id: 2,
                label: 'Graphs',
                bg: 'bg-[#0094d4]',
                action: () => navigateToApp('graphs'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" strokeWidth="1.5" />
                    <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.5" />
                    <path d="M4 19 C8 19, 10 5, 20 5" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                id: 3,
                label: 'Geometry',
                bg: 'bg-[#e5a800]',
                action: () => navigateToApp('graphs'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="4,19 12,5 20,19" strokeWidth="2" />
                    <circle cx="12" cy="14" r="3.5" strokeWidth="1.8" />
                  </svg>
                ),
              },
              {
                id: 4,
                label: 'Lists & Spreadsheet',
                bg: 'bg-[#008f4c]',
                action: () => navigateToApp('spreadsheet'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="1.5" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="10" y1="3" x2="10" y2="21" />
                    <line x1="17" y1="3" x2="17" y2="21" />
                  </svg>
                ),
              },
              {
                id: 5,
                label: 'Data & Statistics',
                bg: 'bg-[#8f3f98]',
                action: () => navigateToApp('spreadsheet'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="20" x2="21" y2="20" strokeWidth="1.5" />
                    <line x1="3" y1="4" x2="3" y2="20" strokeWidth="1.5" />
                    <circle cx="7" cy="15" r="1.5" fill="currentColor" />
                    <circle cx="11" cy="11" r="1.5" fill="currentColor" />
                    <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                    <circle cx="19" cy="7" r="1.5" fill="currentColor" />
                    <line x1="5" y1="17" x2="20" y2="6" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                ),
              },
              {
                id: 6,
                label: 'Notes',
                bg: 'bg-[#e66c00]',
                action: () => navigateToApp('scratchpad_calc'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                ),
              },
              {
                id: 7,
                label: 'Vernier DataQuest',
                bg: 'bg-[#c82424]',
                action: () => navigateToApp('scratchpad_calc'),
                icon: (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 2v7.31L4.36 19.32A2 2 0 0 0 6.1 22h11.8a2 2 0 0 0 1.74-2.68L14 9.31V2" />
                    <line x1="8" y1="2" x2="16" y2="2" />
                    <line x1="7" y1="15" x2="17" y2="15" strokeWidth="1.5" />
                  </svg>
                ),
              },
            ].map((app) => (
              <button
                key={app.id}
                type="button"
                title={`${app.id}: ${app.label}`}
                onClick={() => {
                  setHomeSection('apps');
                  setHomeAppIdx(app.id);
                  app.action();
                }}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-sm flex items-center justify-center transition-all cursor-pointer ${app.bg} ${
                  homeSection === 'apps' && homeAppIdx === app.id
                    ? 'ring-2 ring-white scale-110 shadow-lg'
                    : 'opacity-90 hover:opacity-100 hover:scale-105'
                }`}
              >
                {app.icon}
              </button>
            ))}
          </div>

          {/* Recent Documents Modal */}
          {recentMenuOpen && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 z-30 font-sans">
              <div className="bg-[#12223a] border-2 border-sky-400 rounded-xl p-2.5 shadow-2xl w-[230px] space-y-2">
                <div className="flex items-center justify-between border-b border-sky-700/60 pb-1">
                  <span className="text-[10px] font-black text-sky-300 flex items-center gap-1">
                    <span>🕒</span> Recent Documents
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono">[esc]</span>
                </div>
                <div className="space-y-1 text-[9.5px]">
                  <div
                    onClick={() => {
                      setRecentMenuOpen(false);
                      navigateToApp(currentDocApp);
                    }}
                    className="p-1 rounded bg-blue-600 text-white font-bold cursor-pointer flex items-center justify-between shadow-xs"
                  >
                    <span>1: Document1.tns (Current)</span>
                    <span className="text-[8px] bg-blue-800 px-1 rounded">Open</span>
                  </div>
                  <div
                    onClick={() => {
                      setRecentMenuOpen(false);
                      navigateToApp('graphs');
                    }}
                    className="p-1 rounded text-slate-300 hover:bg-slate-800/60 cursor-pointer flex items-center justify-between"
                  >
                    <span>2: Linear_Functions.tns</span>
                    <span className="text-[8px] text-slate-400">Graphs</span>
                  </div>
                  <div
                    onClick={() => {
                      setRecentMenuOpen(false);
                      navigateToApp('spreadsheet');
                    }}
                    className="p-1 rounded text-slate-300 hover:bg-slate-800/60 cursor-pointer flex items-center justify-between"
                  >
                    <span>3: ScatterPlot_Regression.tns</span>
                    <span className="text-[8px] text-slate-400">Sheets</span>
                  </div>
                </div>
                <div className="pt-1 border-t border-slate-700 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setRecentMenuOpen(false)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] font-bold cursor-pointer"
                  >
                    Close [esc]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Press-to-Test Information Modal (Dismissable with ESC or HOME) */}
          {pressToTestActive && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 z-30 font-sans">
              <div className="bg-[#1b2a47] border-2 border-amber-400 rounded-xl p-3 shadow-2xl max-w-[240px] text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 border-b border-amber-900/60 pb-1">
                  <span className="text-xs font-black uppercase tracking-wider">Press-to-Test</span>
                </div>
                <p className="text-[9.5px] text-slate-200 leading-snug">
                  Press-to-Test is enabled. Scratchpad and standard applications are active.
                </p>
                <div className="pt-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setPressToTestActive(false)}
                    className="px-3 py-1 rounded text-[10px] font-black bg-amber-400 text-slate-950 cursor-pointer"
                  >
                    Dismiss [esc]
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // B. SAVE PROMPT SCREEN
    if (activeApp === 'save_prompt') {
      return (
        <div className="w-full h-full bg-[#0a192f]/95 text-slate-100 flex items-center justify-center p-2 font-sans">
          <div className="bg-[#1b2a47] border-2 border-sky-400 rounded-xl p-3 shadow-2xl max-w-[240px] text-center space-y-2">
            <span className="text-xs font-black text-sky-200 block border-b border-sky-800 pb-1">
              Save Document?
            </span>
            <p className="text-[10px] text-slate-200 leading-snug">
              Do you want to save the unsaved document?
            </p>
            <div className="flex justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSavePromptSelection('no');
                  setActiveApp('add_app');
                }}
                className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer border ${
                  savePromptSelection === 'no'
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                No
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      );
    }

    // C. ADD APPLICATION SCREEN
    if (activeApp === 'add_app') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="border-b border-sky-800 pb-1 mb-1.5 flex justify-between items-center text-[10px] text-sky-300 font-bold">
            <span>Add Application</span>
            <span className="text-slate-400 font-mono text-[9px]">Select 1-4</span>
          </div>

          <div className="space-y-1">
            {[
              {
                id: 1,
                label: '1: Add Calculator',
                icon: CalcIcon,
                action: () => {
                  setIsLinSolveActive(false);
                  setIsLinSolveDialogOpen(false);
                  setSysEq1('');
                  setSysEq2('');
                  setLinSolveResult(null);
                  navigateToApp('scratchpad_calc');
                },
              },
              {
                id: 2,
                label: '2: Add Graphs',
                icon: LineChart,
                action: () => {
                  setGraphF1('');
                  setGraphF2('');
                  setActiveGraphEntry(1);
                  setIsFunctionEntryActive(true);
                  setTraceMode('none');
                  setShowTable(false);
                  setIsZoomInMode(false);
                  navigateToApp('graphs');
                },
              },
              {
                id: 3,
                label: '3: Add Geometry',
                icon: LineChart,
                action: () => {
                  setGraphF1('');
                  setGraphF2('');
                  navigateToApp('graphs');
                },
              },
              {
                id: 4,
                label: '4: Add Lists & Spreadsheet',
                icon: TableIcon,
                action: () => {
                  setColAName('');
                  setColBName('');
                  setTableData([
                    { x: '', y: '' },
                    { x: '', y: '' },
                    { x: '', y: '' },
                    { x: '', y: '' },
                  ]);
                  setRegressionResult(null);
                  setSelectedCell({ row: 0, col: 'A' });
                  navigateToApp('spreadsheet');
                },
              },
            ].map((app) => (
              <div
                key={app.id}
                onClick={app.action}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-xs font-semibold ${
                  addAppSelection === app.id
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-[#10223f] text-slate-200 hover:bg-sky-800/40'
                }`}
              >
                <app.icon className="w-3.5 h-3.5" />
                <span>{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // D. CALCULATOR APPLICATION (LinSolve & Menu)
    if (activeApp === 'scratchpad_calc' && (isLinSolveActive || calcMenuOpen || isLinSolveDialogOpen)) {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
          {/* LinSolve System Template */}
          {isLinSolveActive && (
            <div className="flex-1 flex flex-col justify-center space-y-2">
              <div className="bg-[#071322] border border-sky-500 rounded-lg p-2 font-mono text-xs shadow-inner space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                  <span>linSolve(</span>
                  <div className="flex flex-col gap-1 border-l-2 border-sky-400 pl-1.5 py-0.5">
                    <div
                      onClick={() => setActiveLinSolveBox(1)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        activeLinSolveBox === 1
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {sysEq1 || '▫'}
                    </div>
                    <div
                      onClick={() => setActiveLinSolveBox(2)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        activeLinSolveBox === 2
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {sysEq2 || '▫'}
                    </div>
                  </div>
                  <span>, &#123;x, y&#125;)</span>
                </div>

                {linSolveResult && (
                  <div className="pt-2 border-t border-sky-900/80 text-right font-black text-amber-300 text-sm">
                    {linSolveResult.solutionStr}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LinSolve Dialog */}
          {isLinSolveDialogOpen && (
            <div className="absolute inset-2 bg-[#1b2a47] border-2 border-sky-400 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between z-30 font-sans">
              <span className="text-xs font-black text-sky-200 border-b border-sky-800 pb-1">
                Solve System of Linear Equations
              </span>
              <div className="text-[10px] space-y-1.5 text-slate-200 font-mono">
                <div className="flex justify-between">
                  <span>Number of equations:</span>
                  <span className="font-bold bg-slate-800 px-2 py-0.5 rounded text-amber-300">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Variables:</span>
                  <span className="font-bold bg-slate-800 px-2 py-0.5 rounded text-amber-300">x, y</span>
                </div>
              </div>
              <div className="flex justify-end gap-1.5 pt-1 border-t border-sky-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsLinSolveDialogOpen(false);
                    setIsLinSolveActive(true);
                  }}
                  className="px-3 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Calculator Menu */}
          {calcMenuOpen && (
            <div className="absolute inset-2 bg-[#10223f] border-2 border-sky-400 rounded-lg p-1.5 shadow-2xl z-30 text-xs font-sans overflow-y-auto">
              <div className="font-bold text-sky-300 pb-1 border-b border-sky-800 mb-1">
                {calcSubmenu === 'algebra' ? '3: Algebra' : 'Calculator Menu'}
              </div>
              {calcSubmenu === 'none' && (
                <div className="space-y-0.5">
                  <div className="px-1.5 py-0.5 text-slate-400">1: Actions</div>
                  <div className="px-1.5 py-0.5 text-slate-400">2: Number</div>
                  <div
                    onClick={() => setCalcSubmenu('algebra')}
                    className="px-1.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded cursor-pointer flex justify-between"
                  >
                    <span>3: Algebra</span>
                    <span>▶</span>
                  </div>
                  <div className="px-1.5 py-0.5 text-slate-400">4: Calculus</div>
                </div>
              )}
              {calcSubmenu === 'algebra' && (
                <div className="space-y-0.5">
                  <div className="px-1.5 py-0.5 text-slate-400">1: Numerical Solve</div>
                  <div className="px-1.5 py-0.5 text-slate-400">2: Factor</div>
                  <div
                    onClick={() => {
                      setCalcMenuOpen(false);
                      setIsLinSolveDialogOpen(true);
                    }}
                    className="px-1.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded cursor-pointer"
                  >
                    7: Solve System of Linear Equations...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // E. GRAPHS APPLICATION
    if (activeApp === 'graphs') {
      const f1Val = graphF1.trim();
      const f2Val = graphF2.trim();
      const y1Val = f1Val ? evaluateLinearFunctionAt(f1Val, traceX) : 0;
      const y2Val = f2Val ? evaluateLinearFunctionAt(f2Val, traceX) : 0;
      const currentTracedY = currentTracedFn ? evaluateLinearFunctionAt(currentTracedFn.expr, traceX) : 0;
      const interPt = (f1Val && f2Val) ? solveLinearSystem(f1Val, f2Val) : null;

      return (
        <div className="w-full h-full bg-[#071322] text-slate-100 flex flex-col font-sans relative overflow-hidden">
          {/* Coordinate Plane Grid */}
          <div className="flex-1 relative w-full h-full overflow-hidden">
            <svg className="w-full h-full" viewBox="-10 -10 20 20" preserveAspectRatio="none">
              {[-8, -6, -4, -2, 2, 4, 6, 8].map((v) => (
                <g key={`grid-${v}`}>
                  <line x1={v} y1={-10} x2={v} y2={10} stroke="#1a365d" strokeWidth="0.08" strokeDasharray="0.3,0.3" />
                  <line x1={-10} y1={v} x2={10} y2={v} stroke="#1a365d" strokeWidth="0.08" strokeDasharray="0.3,0.3" />
                </g>
              ))}

              <line x1={-10} y1={0} x2={10} y2={0} stroke="#93c5fd" strokeWidth="0.18" />
              <line x1={0} y1={-10} x2={0} y2={10} stroke="#93c5fd" strokeWidth="0.18" />

              {/* f1 line (only when student entered a function) */}
              {f1Val && (
                <line
                  x1={-10}
                  y1={-(evaluateLinearFunctionAt(f1Val, -10) / 4)}
                  x2={10}
                  y2={-(evaluateLinearFunctionAt(f1Val, 10) / 4)}
                  stroke="#38bdf8"
                  strokeWidth="0.35"
                />
              )}

              {/* f2 line (only when student entered a function) */}
              {f2Val && (
                <line
                  x1={-10}
                  y1={-(evaluateLinearFunctionAt(f2Val, -10) / 4)}
                  x2={10}
                  y2={-(evaluateLinearFunctionAt(f2Val, 10) / 4)}
                  stroke="#34d399"
                  strokeWidth="0.35"
                />
              )}

              {/* Intersection Point */}
              {interPt && (
                <circle cx={interPt.x} cy={-(interPt.y / 4)} r="0.45" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.1" />
              )}

              {/* Trace All vertical dotted line */}
              {traceMode === 'trace_all' && (f1Val || f2Val) && (
                <line x1={traceX} y1={-10} x2={traceX} y2={10} stroke="#cbd5e1" strokeWidth="0.12" strokeDasharray="0.3,0.3" />
              )}

              {/* Graph Trace Marker */}
              {traceMode === 'graph_trace' && currentTracedFn && (
                <circle cx={traceX} cy={-(currentTracedY / 4)} r="0.45" fill={currentTracedFn.color} stroke="#ffffff" strokeWidth="0.1" />
              )}

              {/* Trace All Markers */}
              {traceMode === 'trace_all' && (
                <>
                  {f1Val && <circle cx={traceX} cy={-(y1Val / 4)} r="0.45" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.1" />}
                  {f2Val && <circle cx={traceX} cy={-(y2Val / 4)} r="0.45" fill="#34d399" stroke="#ffffff" strokeWidth="0.1" />}
                </>
              )}
            </svg>

            {/* Split Screen Table (Ctrl+T) */}
            {showTable && (
              <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#091b30]/95 border-l-2 border-sky-400 p-1 font-mono text-[9px] overflow-y-auto z-20">
                <div className="flex justify-between border-b border-sky-600 pb-0.5 mb-1 font-bold text-sky-200">
                  <span>x</span>
                  <span>f1(x)</span>
                  {f2Val && <span>f2(x)</span>}
                </div>
                {[-2, -1, 0, 1, 2, 3, 4, 5].map((x) => (
                  <div key={x} className="flex justify-between py-0.5 border-b border-slate-800 text-slate-300">
                    <span>{x}</span>
                    <span className="text-sky-300">{f1Val ? evaluateLinearFunctionAt(f1Val, x) : '—'}</span>
                    {f2Val && <span className="text-emerald-300">{evaluateLinearFunctionAt(f2Val, x)}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Function Entry Line */}
            {isFunctionEntryActive && (
              <div className="absolute top-1.5 left-1.5 right-1.5 bg-slate-900/95 border border-sky-400 rounded p-1 flex items-center gap-1.5 z-20 font-mono text-[10px]">
                <span className="text-sky-300 font-bold">
                  {activeGraphEntry === 1 ? 'f1(x)=' : 'f2(x)='}
                </span>
                <span className="text-white font-bold flex-1">
                  {activeGraphEntry === 1 ? graphF1 : graphF2}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            )}

            {/* Graph Trace Readout */}
            {traceMode === 'graph_trace' && currentTracedFn && (
              <div className="absolute bottom-1 left-1.5 right-1.5 bg-slate-950/95 border border-sky-400 rounded p-1 flex items-center justify-between text-[10px] font-mono z-20">
                <span className="font-bold" style={{ color: currentTracedFn.color }}>
                  Graph Trace ({currentTracedFn.label})
                </span>
                <span className="text-amber-300 font-bold">
                  ({traceX}, {currentTracedY})
                </span>
              </div>
            )}

            {/* Trace All Readout */}
            {traceMode === 'trace_all' && (f1Val || f2Val) && (
              <div className="absolute bottom-1 left-1.5 right-1.5 bg-slate-950/95 border border-sky-400 rounded p-1 flex items-center justify-between text-[9px] font-mono z-20">
                {f1Val && <span className="text-sky-300 font-bold">f1: ({traceX}, {y1Val})</span>}
                {f2Val && <span className="text-emerald-300 font-bold">f2: ({traceX}, {y2Val})</span>}
              </div>
            )}
          </div>
        </div>
      );
    }

    // F. LISTS & SPREADSHEET APPLICATION
    if (activeApp === 'spreadsheet') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-1.5 relative">
          <div className="flex-1 bg-white text-slate-900 rounded border border-slate-300 overflow-hidden flex flex-col font-mono text-[10px]">
            {/* Headers */}
            <div className="flex bg-slate-200 border-b border-slate-400 font-bold text-center">
              <span className="w-6 py-0.5 border-r border-slate-300 bg-slate-300">#</span>
              <span className="flex-1 py-0.5 border-r border-slate-300">{colAName || 'A'}</span>
              <span className="flex-1 py-0.5">{colBName || 'B'}</span>
            </div>

            {/* Rows */}
            {tableData.map((row, idx) => (
              <div key={idx} className="flex border-b border-slate-200 text-center">
                <span className="w-6 py-0.5 bg-slate-100 border-r border-slate-300 font-bold text-slate-500">
                  {idx + 1}
                </span>
                <span
                  onClick={() => setSelectedCell({ row: idx, col: 'A' })}
                  className={`flex-1 py-0.5 border-r border-slate-300 cursor-pointer ${
                    selectedCell.row === idx && selectedCell.col === 'A'
                      ? 'bg-amber-300 font-black'
                      : ''
                  }`}
                >
                  {row.x}
                </span>
                <span
                  onClick={() => setSelectedCell({ row: idx, col: 'B' })}
                  className={`flex-1 py-0.5 cursor-pointer ${
                    selectedCell.row === idx && selectedCell.col === 'B'
                      ? 'bg-amber-300 font-black'
                      : ''
                  }`}
                >
                  {row.y}
                </span>
              </div>
            ))}

            {/* Regression Results Banner */}
            {regressionResult && (
              <div className="mt-auto bg-slate-900 text-white p-1 text-[9px] font-mono flex items-center justify-between border-t border-slate-700">
                <span className="text-amber-300 font-bold">m = {regressionResult.m}, b = {regressionResult.b}</span>
                <span className="text-emerald-400">r² = {regressionResult.r2}</span>
              </div>
            )}
          </div>

          {/* Regression Dialog */}
          {isRegDialogOpen && (
            <div className="absolute inset-2 bg-[#1b2a47] border-2 border-sky-400 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between z-30 font-sans">
              <span className="text-xs font-black text-sky-200 border-b border-sky-800 pb-1">
                Linear Regression (mx + b)
              </span>
              <div className="text-[10px] space-y-1.5 text-slate-200 font-mono">
                <div className="flex justify-between">
                  <span>X List:</span>
                  <span className="font-bold bg-slate-800 px-2 py-0.5 rounded text-amber-300">a[]</span>
                </div>
                <div className="flex justify-between">
                  <span>Y List:</span>
                  <span className="font-bold bg-slate-800 px-2 py-0.5 rounded text-amber-300">b[]</span>
                </div>
              </div>
              <div className="flex justify-end gap-1.5 pt-1 border-t border-sky-800">
                <button
                  type="button"
                  onClick={() => {
                    const res = computeRegression();
                    setRegressionResult(res);
                    setIsRegDialogOpen(false);
                  }}
                  className="px-3 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // G. BROWSE / DOCUMENTS APPLICATION
    if (activeApp === 'browse') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1.5">
            <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span>My Documents</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">128.4 MB Free</span>
          </div>

          <div className="flex-1 bg-[#0f1f38] border border-sky-900/70 rounded p-1.5 overflow-y-auto space-y-1 text-[10px] font-mono">
            {['📁 Examples', '📁 Homework', '📁 MyLib', '📄 Doc1.tns'].map((f, i) => (
              <div key={i} className="py-0.5 px-1 rounded text-slate-200 hover:bg-sky-800/40 flex justify-between">
                <span>{f}</span>
                <span className="text-slate-400 text-[8px]">Saved</span>
              </div>
            ))}
          </div>

          <div className="pt-1 mt-1 border-t border-sky-800/60 flex justify-between text-[9px] text-sky-300">
            <span>Press [menu] for options</span>
            <button
              type="button"
              onClick={() => setActiveApp('delete_dialog')}
              className="text-rose-400 hover:text-rose-300 font-bold"
            >
              C: Delete All
            </button>
          </div>
        </div>
      );
    }

    // H. DELETE CONFIRMATION DIALOG
    if (activeApp === 'delete_dialog') {
      return (
        <div className="w-full h-full bg-[#0a192f]/95 text-slate-100 flex items-center justify-center p-2 font-sans">
          <div className="bg-[#1b2a47] border-2 border-rose-500 rounded-xl p-3 shadow-2xl max-w-[240px] text-center space-y-2">
            <span className="text-xs font-black text-rose-300 block border-b border-rose-900 pb-1">
              Delete All
            </span>
            <p className="text-[9.5px] text-slate-200 leading-snug">
              This action will clear the copy/paste clipboard, clear Scratchpad, and delete all files and folders on this device. Do you wish to proceed?
            </p>
            <div className="flex justify-center gap-2 pt-1 border-t border-slate-700">
              <button
                type="button"
                onClick={() => setActiveApp('browse')}
                className="px-3 py-1 rounded text-[10px] font-black bg-rose-500 text-white cursor-pointer"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setActiveApp('browse')}
                className="px-3 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    // I. DOCUMENT SETTINGS DIALOG
    if (activeApp === 'doc_settings') {
      return (
        <div className="w-full h-full bg-[#0a192f]/95 text-slate-100 flex items-center justify-center p-2 font-sans">
          <div className="bg-[#182744] border-2 border-sky-400 rounded-xl p-2.5 shadow-2xl w-[250px] space-y-2">
            <span className="text-[11px] font-black text-sky-200 block border-b border-sky-800 pb-1">
              Document Settings
            </span>
            <div className="space-y-1 text-[9.5px] font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900 p-1 rounded">
                <span>Display Digits:</span>
                <span className="font-bold text-amber-300">{docSettingsDigits}</span>
              </div>
              <div className="flex justify-between p-1">
                <span>Angle:</span>
                <span className="text-slate-400">Degree</span>
              </div>
              <div className="flex justify-between p-1">
                <span>Real or Complex:</span>
                <span className="text-slate-400">Real</span>
              </div>
            </div>
            <div className="flex justify-end pt-1 border-t border-sky-800">
              <button
                type="button"
                onClick={() => setActiveApp('scratchpad_calc')}
                className="px-3 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px] cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        height: `${workspaceHeight}px`,
        maxHeight: `${workspaceHeight}px`,
      }}
      className="w-full bg-slate-950 flex flex-col items-center justify-start overflow-hidden rounded-2xl border border-slate-800 shadow-2xl"
    >
      {/* Top Header Workspace Bar - Sleek & Compact */}
      <header
        ref={freeUseHeaderRef}
        className="w-full h-8 sm:h-9 bg-slate-900/95 border-b border-slate-800/90 px-3 sm:px-4 py-1 flex items-center justify-between text-slate-200 shadow-sm z-10 shrink-0"
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Calculator Lab</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-xs shadow-amber-400/50" />
          <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
            TI-Nspire CX School Property — Free Use
          </h1>
        </div>
      </header>

      {/* Calculator Body - Top-Aligned with Safe Top Margin, No Top/Bottom Clipping */}
      <main className="w-full flex-1 min-h-0 flex flex-col items-center justify-start overflow-hidden pt-1.5 pb-1 px-1">
        <div
          style={{
            width: `${Math.round(465 * scale)}px`,
            height: `${Math.round(naturalHeight * scale)}px`,
          }}
          className="relative flex flex-col items-center justify-start shrink-0 select-none overflow-visible"
        >
          <div
            ref={calculatorInnerRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '465px',
            }}
            className="origin-top shrink-0"
          >
            <InteractiveNspireVisualizer
              hideTutorialCallouts={true}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1={getScreenHeader()}
              customLcdContent={
                activeApp !== 'scratchpad_calc' || isLinSolveActive || calcMenuOpen || isLinSolveDialogOpen
                  ? renderCustomLcdContent()
                  : undefined
              }
              notes="Type on keypad or your computer keyboard to compute, graph, and solve."
            />
          </div>
        </div>
      </main>
    </div>
  );
};
