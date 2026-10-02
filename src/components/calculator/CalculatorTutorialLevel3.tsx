import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trophy,
  Calculator,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  LineChart,
  Network,
  Split,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';

export interface CalculatorTutorialLevel3Props {
  onBack: () => void;
  onComplete?: () => void;
}

type AppScreen =
  | 'home'
  | 'save_prompt'
  | 'add_app'
  | 'calculator'
  | 'lin_solve_dialog'
  | 'graphs';

type PartSection = 'part_a' | 'part_b';

/**
 * Universal dynamic 2x2 linear equation system solver via Cramer's Rule
 */
export function solveLinearSystem(
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
export function evaluateLinearFunctionAt(fnStr: string, xVal: number): number {
  try {
    let clean = fnStr.replace(/\s+/g, '').toLowerCase();
    if (clean.startsWith('f1(x)=') || clean.startsWith('f2(x)=')) {
      clean = clean.split('=')[1];
    }
    clean = clean.replace(/([0-9])x/g, `$1*(${xVal})`);
    clean = clean.replace(/x/g, `(${xVal})`);
    return new Function(`return ${clean}`)();
  } catch {
    return 0;
  }
}

export const CalculatorTutorialLevel3: React.FC<CalculatorTutorialLevel3Props> = ({
  onBack,
  onComplete,
}) => {
  // Single Continuous Module with Part A & Part B
  const [activeSection, setActiveSection] = useState<PartSection>('part_a');
  const [partACompleted, setPartACompleted] = useState<boolean>(false);
  const [partBCompleted, setPartBCompleted] = useState<boolean>(false);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  // Handheld Application Screen & Mode State
  const [activeScreen, setActiveScreen] = useState<AppScreen>('home');
  const [homeSelection, setHomeSelection] = useState<number>(1);
  const [addAppSelection, setAddAppSelection] = useState<number>(1);
  const [savePromptSelection, setSavePromptSelection] = useState<'yes' | 'no'>('no');

  // Calculator Page Algebraic State (Part A)
  const [calcMenuOpen, setCalcMenuOpen] = useState<boolean>(false);
  const [calcSubmenu, setCalcSubmenu] = useState<'none' | 'algebra' | 'solve_systems'>('none');
  const [isLinSolveActive, setIsLinSolveActive] = useState<boolean>(false);
  const [activeLinSolveBox, setActiveLinSolveBox] = useState<1 | 2>(1);
  const [sysEq1, setSysEq1] = useState<string>('');
  const [sysEq2, setSysEq2] = useState<string>('');
  const [linSolveResult, setLinSolveResult] = useState<{ x: number; y: number; solutionStr: string } | null>(null);

  // Dialog State for "Solve System of Linear Equations"
  const [dialogNumEq, setDialogNumEq] = useState<number>(2);
  const [dialogVars, setDialogVars] = useState<string>('x, y');
  const [dialogFocus, setDialogFocus] = useState<'num' | 'vars' | 'ok' | 'cancel'>('ok');

  // Graphs Page Graphical State (Part B)
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
  const [isZoomFitActive, setIsZoomFitActive] = useState<boolean>(false);
  const [isZoomInMode, setIsZoomInMode] = useState<boolean>(false);
  const [zoomCursor, setZoomCursor] = useState<{ x: number; y: number }>({ x: 0, y: 15 });
  const [traceMode, setTraceMode] = useState<'none' | 'graph_trace' | 'trace_all'>('none');
  const [traceX, setTraceX] = useState<number>(0);
  const [activeTraceFunctionIndex, setActiveTraceFunctionIndex] = useState<number>(0);
  const [graphsMenuOpen, setGraphsMenuOpen] = useState<boolean>(false);
  const [graphsSubmenu, setGraphsSubmenu] = useState<'none' | 'window' | 'trace'>('none');

  // Dynamic list of active graphed functions for multi-function Graph Trace
  const activeGraphedFunctions = useMemo(() => {
    const list: { id: string; label: string; expr: string; color: string }[] = [];
    const f1Expr = graphF1 || '-3x+28';
    const f2Expr = graphF2 || '7x+8';

    list.push({ id: 'f1', label: 'f1', expr: f1Expr, color: '#38bdf8' });
    if (graphF2 || activeSection === 'part_b') {
      list.push({ id: 'f2', label: 'f2', expr: f2Expr, color: '#34d399' });
    }
    return list;
  }, [graphF1, graphF2, activeSection]);

  const currentTracedFn = useMemo(() => {
    if (activeGraphedFunctions.length === 0) {
      return { id: 'f1', label: 'f1', expr: '-3x+28', color: '#38bdf8' };
    }
    const idx =
      ((activeTraceFunctionIndex % activeGraphedFunctions.length) +
        activeGraphedFunctions.length) %
      activeGraphedFunctions.length;
    return activeGraphedFunctions[idx];
  }, [activeGraphedFunctions, activeTraceFunctionIndex]);

  // Feedback State
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const [resetCounter, setResetCounter] = useState<number>(0);

  // Calculates intersection point dynamically from student-entered functions
  const intersectionPoint = useMemo(() => {
    if (!graphF1 || !graphF2) return null;
    return solveLinearSystem(graphF1, graphF2);
  }, [graphF1, graphF2]);

  // Resets Part A or Part B state when requested
  const resetSectionState = (section: PartSection) => {
    setFeedback({ status: 'idle', message: '' });
    setCalcMenuOpen(false);
    setCalcSubmenu('none');
    setGraphsMenuOpen(false);
    setGraphsSubmenu('none');
    setResetCounter((prev) => prev + 1);

    if (section === 'part_a') {
      setActiveScreen('home');
      setHomeSelection(1);
      setIsLinSolveActive(false);
      setSysEq1('');
      setSysEq2('');
      setLinSolveResult(null);
    } else {
      setActiveScreen('home');
      setHomeSelection(1);
      setGraphF1('');
      setGraphF2('');
      setGraphWindow({ xMin: -10, xMax: 10, yMin: -10, yMax: 30 });
      setIsZoomFitActive(false);
      setIsZoomInMode(false);
      setTraceMode('none');
      setTraceX(0);
      setActiveTraceFunctionIndex(0);
    }
  };

  // Keyboard routing for calculator
  const handleCalculatorKeyPress = (keyId: string) => {
    const k = keyId.toLowerCase();

    // Global Key: Home / ON Key
    if (k === 'on' || k === 'home') {
      setActiveScreen('home');
      setHomeSelection(1);
      setCalcMenuOpen(false);
      setGraphsMenuOpen(false);
      return;
    }

    // --- HOME SCREEN ---
    if (activeScreen === 'home') {
      if (k === '1' || (k === 'enter' && homeSelection === 1)) {
        setActiveScreen('save_prompt');
        setSavePromptSelection('no');
        return;
      }
      if (k === 'up') setHomeSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setHomeSelection((prev) => Math.min(4, prev + 1));
      return;
    }

    // --- SAVE PROMPT SCREEN ---
    if (activeScreen === 'save_prompt') {
      if (k === 'n' || k === 'right' || (k === 'enter' && savePromptSelection === 'no')) {
        setActiveScreen('add_app');
        setAddAppSelection(activeSection === 'part_a' ? 1 : 2);
        return;
      }
      if (k === 'y' || k === 'left') {
        setSavePromptSelection('yes');
        return;
      }
      return;
    }

    // --- ADD APPLICATION SCREEN ---
    if (activeScreen === 'add_app') {
      if (k === '1' || (k === 'enter' && addAppSelection === 1)) {
        setActiveScreen('calculator');
        return;
      }
      if (k === '2' || (k === 'enter' && addAppSelection === 2)) {
        setActiveScreen('graphs');
        return;
      }
      if (k === 'up') setAddAppSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setAddAppSelection((prev) => Math.min(6, prev + 1));
      return;
    }

    // --- CALCULATOR SCREEN (PART A) ---
    if (activeScreen === 'calculator') {
      if (k === 'menu') {
        setCalcMenuOpen((prev) => !prev);
        setCalcSubmenu('none');
        return;
      }

      if (k === 'esc') {
        setCalcMenuOpen(false);
        setCalcSubmenu('none');
        return;
      }

      if (calcMenuOpen) {
        if (calcSubmenu === 'none') {
          if (k === '3' || k === 'algebra') {
            setCalcSubmenu('algebra');
            return;
          }
        } else if (calcSubmenu === 'algebra') {
          if (k === '7' || k === '2' || k === 'enter') {
            setCalcSubmenu('solve_systems');
            return;
          }
        } else if (calcSubmenu === 'solve_systems') {
          if (k === '1' || k === '2' || k === 'enter') {
            setCalcMenuOpen(false);
            setCalcSubmenu('none');
            setActiveScreen('lin_solve_dialog');
            setDialogFocus('ok');
            return;
          }
        }
        return;
      }

      // LinSolve template active input
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

        let charToAdd = '';
        if (/^[0-9]$/.test(k)) charToAdd = k;
        else if (k === 'x' || k === 'y') charToAdd = k;
        else if (k === 'plus' || k === '+') charToAdd = '+';
        else if (k === 'minus' || k === '-') charToAdd = '-';
        else if (k === 'negative' || k === '(-)') charToAdd = '-';
        else if (k === 'equals' || k === '=') charToAdd = '=';

        if (charToAdd) {
          targetSetter((prev) => prev + charToAdd);
          return;
        }

        if (k === 'enter') {
          const res = solveLinearSystem(sysEq1, sysEq2);
          if (res) {
            setLinSolveResult(res);
            setPartACompleted(true);
            setFeedback({
              status: 'correct',
              message: `Correct Response ✓\nCalculated solution: ${res.solutionStr} (x = ${res.x}, y = ${res.y}). The ordered pair (${res.x}, ${res.y}) satisfies both equations! Part A is complete.`,
            });
          } else {
            setFeedback({
              status: 'incorrect',
              message:
                'Procedural Notice: Ensure equations are typed into both boxes (e.g. y = 3x + 2 and y = -5x + 10).',
            });
          }
          return;
        }
      }
      return;
    }

    // --- LIN-SOLVE SETUP DIALOG ---
    if (activeScreen === 'lin_solve_dialog') {
      if (k === 'tab' || k === 'down') {
        setDialogFocus((prev) => (prev === 'ok' ? 'cancel' : 'ok'));
        return;
      }
      if (k === 'up') {
        setDialogFocus('ok');
        return;
      }
      if (k === 'enter' && dialogFocus === 'ok') {
        setActiveScreen('calculator');
        setIsLinSolveActive(true);
        setActiveLinSolveBox(1);
        return;
      }
      if (k === 'esc' || (k === 'enter' && dialogFocus === 'cancel')) {
        setActiveScreen('calculator');
        return;
      }
      return;
    }

    // --- GRAPHS SCREEN (PART B) ---
    if (activeScreen === 'graphs') {
      if (k === 'menu') {
        setGraphsMenuOpen((prev) => !prev);
        setGraphsSubmenu('none');
        return;
      }

      if (k === 'esc') {
        setGraphsMenuOpen(false);
        setGraphsSubmenu('none');
        setIsZoomInMode(false);
        setTraceMode('none');
        return;
      }

      if (k === 'tab') {
        setIsFunctionEntryActive(true);
        setActiveGraphEntry((prev) => (prev === 1 ? 2 : 1));
        return;
      }

      // Graphs Menu
      if (graphsMenuOpen) {
        if (graphsSubmenu === 'none') {
          if (k === '4') setGraphsSubmenu('window');
          if (k === '5') setGraphsSubmenu('trace');
        } else if (graphsSubmenu === 'window') {
          if (k === 'a' || k === '8' || k === 'enter') {
            setIsZoomFitActive(true);
            setGraphWindow({ xMin: -10, xMax: 10, yMin: -35, yMax: 80 });
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
            return;
          }
          if (k === '3') {
            setIsZoomInMode(true);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
            return;
          }
        } else if (graphsSubmenu === 'trace') {
          if (k === '1') {
            setTraceMode('graph_trace');
            setTraceX(0);
            setActiveTraceFunctionIndex(0);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
            return;
          }
          if (k === '3' || k === 'enter') {
            setTraceMode('trace_all');
            setTraceX(0);
            setGraphsMenuOpen(false);
            setGraphsSubmenu('none');
            return;
          }
        }
        return;
      }

      // Zoom-In crosshair mode
      if (isZoomInMode) {
        if (k === 'left') setZoomCursor((prev) => ({ ...prev, x: prev.x - 1 }));
        if (k === 'right') setZoomCursor((prev) => ({ ...prev, x: prev.x + 1 }));
        if (k === 'up') setZoomCursor((prev) => ({ ...prev, y: prev.y + 3 }));
        if (k === 'down') setZoomCursor((prev) => ({ ...prev, y: prev.y - 3 }));
        if (k === 'enter') {
          setGraphWindow({
            xMin: zoomCursor.x - 5,
            xMax: zoomCursor.x + 5,
            yMin: zoomCursor.y - 15,
            yMax: zoomCursor.y + 15,
          });
          setIsZoomInMode(false);
          return;
        }
      }

      // Single Function Graph Trace Navigation (LEFT/RIGHT moves along current function; UP/DOWN switches functions)
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

      // Authentic TI-Nspire CX II Trace All Navigation (Unmodified)
      if (traceMode === 'trace_all') {
        if (k === 'left') {
          setTraceX((prev) => {
            const next = parseFloat((prev - 0.5).toFixed(2));
            checkIntersection(next);
            return next;
          });
          return;
        }
        if (k === 'right') {
          setTraceX((prev) => {
            const next = parseFloat((prev + 0.5).toFixed(2));
            checkIntersection(next);
            return next;
          });
          return;
        }
      }

      // Typing into function entry line
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

        let charToAdd = '';
        if (/^[0-9]$/.test(k)) charToAdd = k;
        else if (k === 'x') charToAdd = 'x';
        else if (k === 'plus' || k === '+') charToAdd = '+';
        else if (k === 'minus' || k === '-') charToAdd = '-';
        else if (k === 'negative' || k === '(-)') charToAdd = '-';

        if (charToAdd) {
          targetSetter((prev) => prev + charToAdd);
          return;
        }

        if (k === 'enter') {
          setIsFunctionEntryActive(false);
          return;
        }
      }
    }
  };

  const checkIntersection = (xVal: number) => {
    const f1Str = graphF1 || '-3x+28';
    const f2Str = graphF2 || '7x+8';
    const y1 = evaluateLinearFunctionAt(f1Str, xVal);
    const y2 = evaluateLinearFunctionAt(f2Str, xVal);

    if (Math.abs(y1 - y2) < 1e-4) {
      setPartBCompleted(true);
      setIsLevelComplete(true);
      setFeedback({
        status: 'correct',
        message: `Correct Response ✓\nIntersection identified at (${xVal}, ${y1})! At x = ${xVal}, both f1 and f2 evaluate to y = ${y1}. The vertical dotted trace line and both trace markers coincide at the intersection point! Part B is complete!`,
      });
      onComplete?.();
    }
  };

  // Renders the LCD screen
  const renderLcdContent = () => {
    // 1. HOME SCREEN
    if (activeScreen === 'home') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-2">
            <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-sky-400 bg-sky-950 px-1 py-0.5 rounded border border-sky-800">[home]</span>
              <span>TI-Nspire Home</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">School Property</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1">
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
                        ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
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
                className={`p-2 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-all ${
                  addAppSelection === app.id
                    ? 'bg-sky-600 border-sky-300 text-white font-bold shadow-md'
                    : 'bg-[#112240] border-sky-900/60 text-slate-300 hover:bg-sky-800/30'
                }`}
              >
                <span className="text-xs">{app.icon}</span>
                <span className="text-[10px] leading-tight">{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. SOLVE SYSTEM OF LINEAR EQUATIONS SETUP DIALOG
    if (activeScreen === 'lin_solve_dialog') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex items-center justify-center font-sans p-2 relative">
          <div className="bg-[#15233c] border-2 border-sky-500 rounded-xl p-3 shadow-2xl w-full max-w-[280px] space-y-2.5">
            <div className="border-b border-sky-800 pb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold text-sky-200">
                Solve System of Linear Equations
              </span>
              <span className="text-[9px] text-slate-400 font-mono">TI-Nspire</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-300">Number of equations:</span>
                <div className="bg-white text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] border border-slate-400">
                  {dialogNumEq}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-300">Variables:</span>
                <div className="bg-white text-slate-950 font-mono font-bold px-2 py-0.5 rounded text-[11px] border border-slate-400">
                  {dialogVars}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-sky-900/80">
              <button
                type="button"
                onClick={() => {
                  setDialogFocus('cancel');
                  handleCalculatorKeyPress('esc');
                }}
                className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                  dialogFocus === 'cancel'
                    ? 'bg-slate-300 text-slate-950 ring-2 ring-sky-300'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setDialogFocus('ok');
                  handleCalculatorKeyPress('enter');
                }}
                className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all ${
                  dialogFocus === 'ok'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 5. CALCULATOR SCREEN (PART A)
    if (activeScreen === 'calculator') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1.5 text-[9px] text-slate-300">
            <span className="flex items-center gap-1 font-semibold text-sky-200">
              <span>★ 1.1</span>
              <span>Calculator</span>
            </span>
            <span className="font-mono text-slate-400">RAD AUTO REAL</span>
          </div>

          <div className="flex-1 flex flex-col justify-between overflow-y-auto space-y-2 p-1 font-mono">
            {isLinSolveActive ? (
              <div className="space-y-3">
                <div className="flex items-start gap-1 text-[11px] sm:text-xs">
                  <span className="text-amber-300 font-bold">linSolve(</span>
                  <div className="flex items-center border-l-2 border-amber-400 pl-1.5 py-0.5 space-y-1 flex-col">
                    {/* Box 1 */}
                    <div
                      onClick={() => setActiveLinSolveBox(1)}
                      className={`min-w-[130px] px-2 py-0.5 rounded text-left cursor-pointer border ${
                        activeLinSolveBox === 1
                          ? 'bg-amber-300 text-slate-950 border-amber-400 font-black ring-1 ring-amber-300'
                          : 'bg-white/10 text-slate-100 border-white/20'
                      }`}
                    >
                      {sysEq1 || <span className="opacity-40">y = 3x + 2</span>}
                      {activeLinSolveBox === 1 && <span className="animate-pulse">|</span>}
                    </div>

                    {/* Box 2 */}
                    <div
                      onClick={() => setActiveLinSolveBox(2)}
                      className={`min-w-[130px] px-2 py-0.5 rounded text-left cursor-pointer border ${
                        activeLinSolveBox === 2
                          ? 'bg-amber-300 text-slate-950 border-amber-400 font-black ring-1 ring-amber-300'
                          : 'bg-white/10 text-slate-100 border-white/20'
                      }`}
                    >
                      {sysEq2 || <span className="opacity-40">y = -5x + 10</span>}
                      {activeLinSolveBox === 2 && <span className="animate-pulse">|</span>}
                    </div>
                  </div>
                  <span className="text-amber-300 font-bold">, &#123;x, y&#125;)</span>
                </div>

                {linSolveResult && (
                  <div className="text-right pt-2 border-t border-sky-800/60 text-emerald-300 font-bold text-sm">
                    {linSolveResult.solutionStr}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-400 pt-2">
                Press [menu] → 3: Algebra → 7: Solve System of Equations
              </div>
            )}
          </div>

          {calcMenuOpen && (
            <div className="absolute top-7 left-2 bg-[#10223f] border-2 border-sky-400 rounded-lg shadow-2xl p-1 z-30 min-w-[160px] text-xs font-sans">
              {calcSubmenu === 'none' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-slate-400 text-[10px] font-bold border-b border-sky-900">
                    Calculator Menu
                  </div>
                  {['1: Actions', '2: Number', '3: Algebra', '4: Calculus', '5: Probability', '6: Statistics'].map(
                    (opt) => (
                      <div
                        key={opt}
                        onClick={() => handleCalculatorKeyPress(opt[0])}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          opt.startsWith('3')
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'text-slate-200 hover:bg-sky-800/50'
                        }`}
                      >
                        {opt} {opt.startsWith('3') ? '▶' : ''}
                      </div>
                    )
                  )}
                </div>
              )}

              {calcSubmenu === 'algebra' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-sky-300 text-[10px] font-bold border-b border-sky-900">
                    3: Algebra
                  </div>
                  {[
                    '1: Solve',
                    '2: Factor',
                    '3: Expand',
                    '4: Zeros',
                    '7: Solve System of Equations',
                  ].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => handleCalculatorKeyPress(opt[0])}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        opt.startsWith('7')
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'text-slate-200 hover:bg-sky-800/50'
                      }`}
                    >
                      {opt} {opt.startsWith('7') ? '▶' : ''}
                    </div>
                  ))}
                </div>
              )}

              {calcSubmenu === 'solve_systems' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-sky-300 text-[10px] font-bold border-b border-sky-900">
                    Solve System of Equations
                  </div>
                  {[
                    '1: Solve System of Linear Equations...',
                    '2: Solve System of Equations...',
                  ].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => handleCalculatorKeyPress(opt[0])}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        opt.startsWith('1')
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'text-slate-200 hover:bg-sky-800/50'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // 6. GRAPHS SCREEN (PART B)
    if (activeScreen === 'graphs') {
      const f1Val = graphF1 || '-3x+28';
      const f2Val = graphF2 || '7x+8';
      const y1Val = evaluateLinearFunctionAt(f1Val, traceX);
      const y2Val = evaluateLinearFunctionAt(f2Val, traceX);
      const currentTracedY = evaluateLinearFunctionAt(currentTracedFn.expr, traceX);
      const isAtIntersection = Math.abs(y1Val - y2Val) < 1e-4;

      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-sky-800 px-2 py-1 text-[9px] text-slate-300 z-10 bg-[#0a192f]/90">
            <span className="flex items-center gap-1 font-semibold text-sky-200">
              <span>★ 1.1</span>
              <span>Graphs</span>
            </span>
            <span className="font-mono text-slate-400">RAD AUTO REAL</span>
          </div>

          <div className="flex-1 relative w-full h-full overflow-hidden bg-[#071322]">
            <svg className="w-full h-full" viewBox="-10 -10 20 20" preserveAspectRatio="none">
              {[-8, -6, -4, -2, 2, 4, 6, 8].map((v) => (
                <g key={`grid-${v}`}>
                  <line
                    x1={v}
                    y1={-10}
                    x2={v}
                    y2={10}
                    stroke="#1a365d"
                    strokeWidth="0.08"
                    strokeDasharray="0.3,0.3"
                  />
                  <line
                    x1={-10}
                    y1={v}
                    x2={10}
                    y2={v}
                    stroke="#1a365d"
                    strokeWidth="0.08"
                    strokeDasharray="0.3,0.3"
                  />
                </g>
              ))}

              <line x1={-10} y1={0} x2={10} y2={0} stroke="#93c5fd" strokeWidth="0.18" />
              <line x1={0} y1={-10} x2={0} y2={10} stroke="#93c5fd" strokeWidth="0.18" />

              {graphF1 && (
                <line
                  x1={-10}
                  y1={-(evaluateLinearFunctionAt(f1Val, -10) / 4)}
                  x2={10}
                  y2={-(evaluateLinearFunctionAt(f1Val, 10) / 4)}
                  stroke="#38bdf8"
                  strokeWidth="0.35"
                />
              )}

              {graphF2 && (
                <line
                  x1={-10}
                  y1={-(evaluateLinearFunctionAt(f2Val, -10) / 4)}
                  x2={10}
                  y2={-(evaluateLinearFunctionAt(f2Val, 10) / 4)}
                  stroke="#34d399"
                  strokeWidth="0.35"
                />
              )}

              {intersectionPoint && (
                <circle
                  cx={intersectionPoint.x}
                  cy={-(intersectionPoint.y / 4)}
                  r="0.5"
                  fill="#fbbf24"
                  stroke="#ffffff"
                  strokeWidth="0.1"
                  className="animate-pulse"
                />
              )}

              {isZoomInMode && (
                <g>
                  <line
                    x1={zoomCursor.x - 1}
                    y1={-zoomCursor.y / 4}
                    x2={zoomCursor.x + 1}
                    y2={-zoomCursor.y / 4}
                    stroke="#f59e0b"
                    strokeWidth="0.2"
                  />
                  <line
                    x1={zoomCursor.x}
                    y1={-(zoomCursor.y / 4) - 1}
                    x2={zoomCursor.x}
                    y2={-(zoomCursor.y / 4) + 1}
                    stroke="#f59e0b"
                    strokeWidth="0.2"
                  />
                </g>
              )}

              {/* Trace All Mode: Shared vertical dotted line at x = traceX */}
              {traceMode === 'trace_all' && (
                <line
                  x1={traceX}
                  y1={-10}
                  x2={traceX}
                  y2={10}
                  stroke="#cbd5e1"
                  strokeWidth="0.12"
                  strokeDasharray="0.3,0.3"
                />
              )}

              {/* Single Function Graph Trace Mode */}
              {traceMode === 'graph_trace' && (
                <circle
                  cx={traceX}
                  cy={-(currentTracedY / 4)}
                  r="0.45"
                  fill={currentTracedFn.color}
                  stroke="#ffffff"
                  strokeWidth="0.1"
                />
              )}

              {/* Authentic Trace All: One visible trace marker on EACH active graph */}
              {traceMode === 'trace_all' && (
                <>
                  {/* Trace marker on f1 */}
                  <circle
                    cx={traceX}
                    cy={-(y1Val / 4)}
                    r="0.45"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="0.1"
                  />
                  {/* Trace marker on f2 */}
                  <circle
                    cx={traceX}
                    cy={-(y2Val / 4)}
                    r="0.45"
                    fill="#34d399"
                    stroke="#ffffff"
                    strokeWidth="0.1"
                  />
                  {/* Coinciding indicator at intersection */}
                  {isAtIntersection && (
                    <circle
                      cx={traceX}
                      cy={-(y1Val / 4)}
                      r="0.65"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.15"
                      className="animate-ping"
                    />
                  )}
                </>
              )}
            </svg>

            {isFunctionEntryActive && (
              <div className="absolute top-2 left-2 right-2 bg-slate-900/90 border border-sky-400 rounded-lg p-1.5 flex items-center gap-1.5 shadow-lg z-20 font-mono text-xs">
                <span className="text-sky-300 font-bold">
                  {activeGraphEntry === 1 ? 'f1(x)=' : 'f2(x)='}
                </span>
                <span className="text-white font-bold flex-1">
                  {activeGraphEntry === 1 ? graphF1 : graphF2}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            )}

            {/* Single Function Graph Trace Readout */}
            {traceMode === 'graph_trace' && (
              <div className="absolute bottom-1.5 left-2 right-2 bg-slate-950/95 border border-sky-400 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono shadow-xl z-20">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: currentTracedFn.color }}
                  />
                  <span className="font-bold" style={{ color: currentTracedFn.color }}>
                    Graph Trace ({currentTracedFn.label})
                  </span>
                </div>
                <span className="text-amber-300 font-black">
                  ({traceX}, {currentTracedY})
                </span>
              </div>
            )}

            {/* Authentic TI-Nspire CX II Trace All: Simultaneous coordinate readouts */}
            {traceMode === 'trace_all' && (
              <div className="absolute bottom-1.5 left-2 right-2 bg-slate-950/95 border border-sky-500/70 rounded-lg px-2.5 py-1.5 shadow-xl z-20 font-mono text-[11px] space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
                    <span className="text-[#38bdf8] font-bold">f1:</span>
                    <span className="text-white font-medium">({traceX}, {y1Val})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#34d399] shrink-0" />
                    <span className="text-[#34d399] font-bold">f2:</span>
                    <span className="text-white font-medium">({traceX}, {y2Val})</span>
                  </div>
                </div>
                {isAtIntersection && (
                  <div className="text-center text-[10px] font-bold text-amber-300 pt-0.5 border-t border-sky-900/60 flex items-center justify-center gap-1">
                    <span>★ Intersection: ({traceX}, {y1Val})</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {graphsMenuOpen && (
            <div className="absolute top-7 left-2 bg-[#10223f] border-2 border-sky-400 rounded-lg shadow-2xl p-1 z-30 min-w-[150px] text-xs font-sans">
              {graphsSubmenu === 'none' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-slate-400 text-[10px] font-bold border-b border-sky-900">
                    Graphs Menu
                  </div>
                  {['1: Actions', '2: View', '3: Graph Entry/Edit', '4: Window / Zoom', '5: Trace'].map(
                    (opt) => (
                      <div
                        key={opt}
                        onClick={() => handleCalculatorKeyPress(opt[0])}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          opt.startsWith('4') || opt.startsWith('5')
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'text-slate-200 hover:bg-sky-800/50'
                        }`}
                      >
                        {opt} ▶
                      </div>
                    )
                  )}
                </div>
              )}

              {graphsSubmenu === 'window' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-sky-300 text-[10px] font-bold border-b border-sky-900">
                    4: Window / Zoom
                  </div>
                  {['1: Window Settings...', '3: Zoom In', '4: Zoom Out', 'A: Zoom - Fit'].map(
                    (opt) => (
                      <div
                        key={opt}
                        onClick={() => handleCalculatorKeyPress(opt[0].toLowerCase())}
                        className="px-2 py-1 rounded cursor-pointer text-slate-200 hover:bg-sky-800/50"
                      >
                        {opt}
                      </div>
                    )
                  )}
                </div>
              )}

              {graphsSubmenu === 'trace' && (
                <div className="space-y-0.5">
                  <div className="px-2 py-0.5 text-sky-300 text-[10px] font-bold border-b border-sky-900">
                    5: Trace
                  </div>
                  {['1: Graph Trace', '3: Trace All'].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => handleCalculatorKeyPress(opt[0])}
                      className="px-2 py-1 rounded cursor-pointer text-slate-200 hover:bg-sky-800/50"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

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
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-700">
            {partACompleted && partBCompleted
              ? 'Module Complete (2/2 Parts Verified)'
              : partACompleted || partBCompleted
              ? '1 of 2 Parts Complete'
              : '0 of 2 Parts Complete'}
          </span>
        </div>
      </div>

      {/* Main Grid: Guided Practice Panel (Left) & TI-Nspire Visualizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-start">
        {/* Left Column: Interactive Instructional Guide (Stationary) */}
        <div className="lg:col-span-5 space-y-2.5 lg:sticky lg:top-2">
          {/* Module Header Card — Exactly 1 Module */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                  <Network className="w-3 h-3 text-purple-600" />
                  <span>LEVEL 3</span>
                </span>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  {activeSection === 'part_a'
                    ? 'Part A • Algebraic Method (linSolve)'
                    : 'Part B • Graphical Intersection'}
                </span>
              </div>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                MODULE 1 OF 1
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Systems of Linear Equations
            </h1>

            {/* Continuous 2-Part Section Selector */}
            <div className="pt-1.5 border-t border-slate-100 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('part_a');
                  resetSectionState('part_a');
                }}
                className={`py-1 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                  activeSection === 'part_a'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : partACompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span>Part A: Algebraic</span>
                {partACompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveSection('part_b');
                  resetSectionState('part_b');
                }}
                className={`py-1 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                  activeSection === 'part_b'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : partBCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span>Part B: Graphical</span>
                {partBCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Active Section Task Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-3.5 border border-purple-500/30 shadow-lg space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeSection === 'part_a'
                    ? 'Part A — Solve a System Algebraically'
                    : 'Part B — Graphical Intersection Workflow'}
                </span>
              </span>

              {(activeSection === 'part_a' ? partACompleted : partBCompleted) && (
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
                {activeSection === 'part_a'
                  ? 'y = 3x + 2 and y = -5x + 10'
                  : 'f1(x) = -3x + 28 and f2(x) = 7x + 8'}
              </div>
            </div>

            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-1">
              <span className="text-sky-300 font-bold block mb-0.5">Student Workflow Instructions:</span>
              {activeSection === 'part_a' ? (
                <p className="leading-snug">
                  1. Press <strong>[home]</strong> → <strong>1: New Document</strong> → <strong>No</strong> → <strong>1: Add Calculator</strong>.<br />
                  2. Press <strong>[menu]</strong> → <strong>3: Algebra</strong> → <strong>7: Solve System of Equations</strong> → <strong>1: Solve System of Linear Equations...</strong>.<br />
                  3. Select <strong>2 equations</strong>, variables <strong>x, y</strong>, and press <strong>[OK]</strong>.<br />
                  4. In box 1 enter <strong>y = 3x + 2</strong>, then press <strong>[down]</strong> or <strong>[tab]</strong>.<br />
                  5. In box 2 enter <strong>y = -5x + 10</strong>, then press <strong>[enter]</strong> to solve.
                </p>
              ) : (
                <p className="leading-snug">
                  1. Press <strong>[home]</strong> → <strong>1: New Document</strong> → <strong>No</strong> → <strong>2: Add Graphs</strong>.<br />
                  2. Enter <strong>f1(x) = -3x + 28</strong> and press <strong>[enter]</strong>.<br />
                  3. Press <strong>[tab]</strong>, enter <strong>f2(x) = 7x + 8</strong> and press <strong>[enter]</strong>.<br />
                  4. Press <strong>[menu]</strong> → <strong>4: Window / Zoom</strong> → <strong>A: Zoom - Fit</strong>.<br />
                  5. Press <strong>[menu]</strong> → <strong>4: Window / Zoom</strong> → <strong>3: Zoom In</strong> near the intersection.<br />
                  6. Press <strong>[menu]</strong> → <strong>5: Trace</strong> → <strong>3: Trace All</strong>. Move LEFT or RIGHT until (2, 22) is identified.
                </p>
              )}
            </div>

            {/* Feedback & Progression Area */}
            {feedback.status === 'idle' && (
              <div className="bg-slate-800/80 rounded-xl p-2.5 sm:p-3 border border-slate-700 text-xs text-slate-300 space-y-1 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-200 block text-[11px]">Classroom Practice Ready:</span>
                  Perform the complete workflow on the TI-Nspire calculator on the right.
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

                {activeSection === 'part_a' && !partBCompleted && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('part_b');
                      resetSectionState('part_b');
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-purple-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue Directly to Part B: Graphical Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {partACompleted && partBCompleted && (
                  <div className="pt-1 text-center font-bold text-xs text-emerald-300">
                    ★ Both Authentic TI-Nspire Workflows Verified in Module 1 of 1!
                  </div>
                )}
              </div>
            )}

            {/* Reset / Try Again */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => resetSectionState(activeSection)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                title="Reset this section"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset {activeSection === 'part_a' ? 'Part A' : 'Part B'}</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                TI-Nspire CX School Property
              </span>
            </div>
          </div>

          {/* Mathematical Learning Connection Box */}
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-300/80 space-y-1.5 text-slate-900 shadow-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Core Mathematical Connection</span>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium">
              A <strong>solution to a system of linear equations</strong> is the ordered pair (x, y) that satisfies both equations simultaneously. <strong>Graphically</strong>, that solution is the exact point where the two lines intersect on the coordinate plane!
            </p>
          </div>

          {/* Quick Procedure Reference Box */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Classroom Procedure Reference:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
                  <Calculator className="w-3 h-3 text-purple-600" />
                  <span>Part A (Algebraic)</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  [home] → New Document → Add Calculator → [menu] → Algebra → Solve System → linSolve()
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
                  <LineChart className="w-3 h-3 text-emerald-600" />
                  <span>Part B (Graphical)</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  [home] → New Document → Add Graphs → f1 & f2 → Zoom-Fit → Trace All → (x, y)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic TI-Nspire CX Visualizer (Independent Vertical Scroll) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:max-h-[calc(100vh-75px)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 lg:overscroll-contain">
          <div className="w-full max-w-[480px] pb-6">
            <InteractiveNspireVisualizer
              key={`nspire-l3-${activeSection}-${resetCounter}`}
              resetSignal={resetCounter}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1={
                activeScreen === 'graphs'
                  ? 'Graphs • Page 1.1'
                  : activeScreen === 'calculator'
                  ? 'Calculator • Page 1.1'
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
