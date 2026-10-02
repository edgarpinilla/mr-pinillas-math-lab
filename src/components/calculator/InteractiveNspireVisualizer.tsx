import React, { useState, useEffect } from 'react';
import { applyNspireKey, NspireEngineState, INITIAL_NSPIRE_STATE } from './nspireEngine';

export interface InteractiveNspireVisualizerProps {
  highlightedKeys?: string[];
  screenLine1?: string;
  screenLine2?: string;
  screenLine3?: string;
  screenOff?: boolean;
  notes?: string;
  specialWarning?: string;
  mathRule?: string;
  onKeyPress?: (keyId: string) => void;
  interactive?: boolean;
  resetSignal?: number;
  customLcdContent?: React.ReactNode;
  hideTutorialCallouts?: boolean;
}

/**
 * Exact physical instructional representation of the TI-Nspire CX School Property handheld calculator.
 * Mapped key-by-key from the classroom reference photograph:
 * 
 * 1. Two-tone casing: School Property Yellow protective shell with dark charcoal faceplate.
 * 2. Top Header: "TI-nspire cx" and bold yellow "School Property".
 * 3. Color LCD Display with scratchpad status bar and calculations.
 * 4. Navigation Zone:
 *    - Left: [esc] (with yellow ↶ undo), [scratchpad] (with yellow save), [tab]
 *    - Center: Yellow-bordered Touchpad with directional arrows (▲, ▼, ◀, ▶), outer yellow page symbols (⬒, ◻▾, [◀], [▶]), and center mouse pointer button
 *    - Right: [🏠on] (with yellow off), [doc ▾] (with yellow +page), [menu] (with yellow ▤ menu)
 * 5. Modifier Bar (7-column grid aligned with math matrix below):
 *    - Cols 1-2: [ctrl] - BRIGHT YELLOW BUTTON with black text spanning 2 columns
 *    - Col 3: [⇧shift] (with yellow CAPS)
 *    - Col 4: Physical gap above 8 (smooth dark faceplate, no key)
 *    - Col 5: [var] (with yellow sto →)
 *    - Cols 6-7: [del] (with yellow clear) spanning 2 columns
 * 6. Math & Numeric Matrix (7 Columns × 4 Rows):
 *    - Function keys (Cols 1-2): [=] (with yellow |≠≥>), [trig] (with yellow (?)), [^] (with yellow ⁿ√x), [x²] (with yellow √), [eˣ] (with yellow ln), [10ˣ] (with yellow log), [(] (with yellow []), [)] (with yellow {})
 *    - Numeric Keypad (Cols 3-5): CRISP WHITE KEYS: 7-8-9, 4-5-6, 1-2-3, 0-.-(-)
 *      * With yellow capture above 2, yellow ans. above 3
 *      * CRITICAL: [(-)] is a WHITE KEY in the bottom row next to [.] and [0]
 *    - Operators & Templates (Cols 6-7): [|▫|{▫] (with yellow :=), [📖] (with yellow ∞°β), [×] (with yellow " ' "), [÷] (with yellow ▫/▫ fraction),
 *      [+] (with yellow ◗), [-] (SUBTRACTION on far right column with yellow ◖), and wide [enter] (with yellow ≈)
 * 7. Alpha Keyboard Area (Exact 4 physical rows):
 *    - Row 1 (9 keys): [EE], [A] [B] [C] [D] [E] [F] [G], [?! ▶]
 *    - Row 2 (9 keys): [π ▶], [H] [I] [J] [K] [L] [M] [N], [⚲] (catalog flag)
 *    - Row 3 (9 keys): [,], [O] [P] [Q] [R] [S] [T] [U], [↵] (return)
 *    - Row 4 (6 keys): [V], [W], [X] (WHITE KEY!), [Y] (WHITE KEY!), [Z] (WHITE KEY!), [␣] (Space bar)
 * 8. Bottom Bezel: Texas Instruments map/star logo and "TEXAS INSTRUMENTS".
 */
export const InteractiveNspireVisualizer: React.FC<InteractiveNspireVisualizerProps> = ({
  highlightedKeys = [],
  screenLine1 = 'Scratchpad - Calculate',
  screenLine2 = '',
  screenLine3 = '',
  screenOff = false,
  notes,
  specialWarning,
  mathRule,
  onKeyPress,
  interactive = false,
  resetSignal,
  customLcdContent,
  hideTutorialCallouts = false,
}) => {
  const [calcState, setCalcState] = useState<NspireEngineState>({
    expression: screenLine2,
    evaluatedResult: screenLine3,
    isOff: screenOff,
    ctrlActive: false,
    lastEvaluatedExpr: '',
    isInitialSeed: Boolean(screenLine2),
    menuLevel: 'none',
    selectedMenuIndex: 0,
    isTemplateOpen: false,
    selectedTemplate: 'fraction',
    selectedTemplateIndex: 0,
    templateType: null,
    radicand: '',
    cursorRegion: null,
  });

  // Dedicated challenge reset signal to completely clear expression/buffer/result between challenges
  useEffect(() => {
    if (resetSignal !== undefined && resetSignal > 0) {
      setCalcState({
        ...INITIAL_NSPIRE_STATE,
        expression: '',
        evaluatedResult: '',
        lastEvaluatedExpr: '',
        isOff: screenOff,
      });
    }
  }, [resetSignal]);

  // Synchronize with external prop updates (such as step transitions or module navigation)
  useEffect(() => {
    setCalcState((prev) => ({
      ...prev,
      expression: screenLine2,
      evaluatedResult: screenLine3,
      isOff: screenOff,
      ctrlActive: false,
      lastEvaluatedExpr: '',
      isInitialSeed: Boolean(screenLine2),
      // If turning off, close menu and templates
      menuLevel: screenOff ? 'none' : prev.menuLevel,
      isTemplateOpen: screenOff ? false : prev.isTemplateOpen,
      selectedTemplate: screenOff ? 'fraction' : prev.selectedTemplate,
      selectedTemplateIndex: screenOff ? 0 : prev.selectedTemplateIndex,
      activeFractionSlot: screenOff ? null : prev.activeFractionSlot,
      templateType: screenOff ? null : prev.templateType,
      radicand: screenOff ? '' : prev.radicand,
      cursorRegion: screenOff ? null : prev.cursorRegion,
    }));
  }, [screenLine1, screenLine2, screenLine3, screenOff]);

  const ROOT_MENU_ITEMS = [
    { id: '1', label: '1: Actions', hasSubmenu: true },
    { id: '2', label: '2: Number', hasSubmenu: true },
    { id: '3', label: '3: Algebra', hasSubmenu: true },
    { id: '4', label: '4: Calculus', hasSubmenu: true },
    { id: '5', label: '5: Probability', hasSubmenu: true },
    { id: '6', label: '6: Statistics', hasSubmenu: true },
    { id: '7', label: '7: Matrix & Vector', hasSubmenu: true },
    { id: '8', label: '8: Finance', hasSubmenu: true },
  ];

  const NUMBER_SUBMENU_ITEMS = [
    { id: '1', label: '1: Convert to Decimal', hasSubmenu: false },
    { id: '2', label: '2: Approximate to Fraction', hasSubmenu: false },
    { id: '3', label: '3: Factor', hasSubmenu: false },
    { id: '4', label: '4: Least Common Multiple', hasSubmenu: false },
    { id: '5', label: '5: Greatest Common Divisor', hasSubmenu: false },
    { id: '6', label: '6: Remainder', hasSubmenu: false },
    { id: '7', label: '7: Fraction Tools', hasSubmenu: true },
    { id: '8', label: '8: Number Tools', hasSubmenu: true },
    { id: '9', label: '9: Complex Number Tools', hasSubmenu: true },
  ];

  // Normalize key lookup to handle synonyms, symbols, and formatting variations
  const isKeyHighlighted = (keyId: string, aliases: string[] = []): boolean => {
    const targetSet = new Set([keyId, ...aliases].map((k) => k.toLowerCase().trim()));
    return highlightedKeys.some((rawKey) => {
      const normalized = rawKey.toLowerCase().trim();
      return targetSet.has(normalized);
    });
  };

  const handleKeyClick = (keyId: string) => {
    // Unfocus active DOM element so button focus doesn't trap, swallow, or re-fire events
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 1. Immediately update internal handheld LCD state if not running custom LCD app mode
    if (!customLcdContent) {
      setCalcState((prev) => applyNspireKey(prev, keyId));
    }

    // 2. Notify parent listener (Guided Practice validation, lesson runner)
    onKeyPress?.(keyId);
  };

  // Keyboard routing for students typing on physical keyboards (digits, enter, arrows, backspace, letters x/y/t, ctrl+t)
  // Ensures the very next keypress after template insertion is consumed directly by the active region
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept when typing into actual form inputs/textareas
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.ctrlKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        e.stopPropagation();
        handleKeyClick('ctrl_t');
        return;
      }

      let keyId: string | null = null;
      if (/^[0-9]$/.test(e.key)) {
        keyId = e.key;
      } else if (e.key === 'Enter') {
        keyId = 'enter';
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        keyId = 'del';
      } else if (e.key === 'Escape') {
        keyId = 'esc';
      } else if (e.key === 'ArrowUp') {
        keyId = 'up';
      } else if (e.key === 'ArrowDown') {
        keyId = 'down';
      } else if (e.key === 'ArrowLeft') {
        keyId = 'left';
      } else if (e.key === 'ArrowRight') {
        keyId = 'right';
      } else if (e.key === '+') {
        keyId = '+';
      } else if (e.key === '-') {
        keyId = '-';
      } else if (e.key === '*') {
        keyId = '×';
      } else if (e.key === '/') {
        keyId = '÷';
      } else if (e.key === '.') {
        keyId = '.';
      } else if (e.key === '(') {
        keyId = '(';
      } else if (e.key === ')') {
        keyId = ')';
      } else if (e.key === '^') {
        keyId = '^';
      } else if (e.key === 'x' || e.key === 'X') {
        keyId = 'x';
      } else if (e.key === 'y' || e.key === 'Y') {
        keyId = 'y';
      } else if (e.key === 't' || e.key === 'T') {
        keyId = 't';
      } else if (e.key === 'Tab') {
        keyId = 'tab';
      }

      if (keyId) {
        e.preventDefault();
        e.stopPropagation();
        handleKeyClick(keyId);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [customLcdContent]);

  /**
   * Helper to compute styling for keys.
   * When highlighted, glows with vibrant amber/gold with ring and pulsing glow,
   * while never shifting position or moving other keys.
   */
  const getKeyStyle = (
    keyId: string,
    aliases: string[] = [],
    variant: 'white' | 'dark' | 'yellow' | 'operator' = 'dark'
  ) => {
    const active = isKeyHighlighted(keyId, aliases);

    if (active) {
      return 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300 ring-offset-2 ring-offset-slate-900 shadow-2xl scale-105 z-30 animate-pulse border-amber-300 cursor-pointer active:scale-95 transition-transform';
    }

    switch (variant) {
      case 'white':
        // Authentic TI-Nspire CX white numeric and variable keys
        return 'bg-slate-100 hover:bg-white text-slate-950 font-extrabold border-slate-300 shadow-sm cursor-pointer active:scale-95 transition-transform';
      case 'yellow':
        // Authentic TI-Nspire CX School Property yellow ctrl key
        return 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black border-amber-500 shadow-md cursor-pointer active:scale-95 transition-transform';
      case 'operator':
        return 'bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold border-slate-700 cursor-pointer active:scale-95 transition-transform';
      case 'dark':
      default:
        return 'bg-[#252b36] hover:bg-[#323946] text-slate-200 font-bold border-slate-700/80 cursor-pointer active:scale-95 transition-transform';
    }
  };

  return (
    <div
      className={
        hideTutorialCallouts
          ? 'w-full flex justify-center p-0'
          : 'bg-slate-950 rounded-2xl p-2.5 sm:p-3 text-white border-2 border-slate-800 shadow-2xl space-y-2'
      }
    >
      {/* Top Banner & Handheld Reference Info (Tutorial Mode Only) */}
      {!hideTutorialCallouts && (
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800/80 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-xs shadow-amber-400/50" />
            <span className="text-xs font-black tracking-wider uppercase text-amber-400">
              TI-Nspire CX School Property
            </span>
            <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-400">
              • Handheld Keypad
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-black tracking-wider text-amber-950 bg-amber-400 border border-amber-500 px-2 py-0.5 rounded-full uppercase shadow-xs">
              School Property
            </span>
          </div>
        </div>
      )}

      {/* Authentic TI-Nspire CX Physical Handheld Body (+30% Width Ratio Restored) */}
      <div className="flex justify-center w-full">
        {/* Authentic Two-Tone Yellow School Property Casing */}
        <div
          id="ti-nspire-cx-physical-frame"
          className="w-full max-w-[460px] bg-amber-400 rounded-[2.8rem] p-3.5 sm:p-5 shadow-2xl border-4 border-amber-500/90 relative"
        >
          {/* Dark Charcoal Inner Faceplate */}
          <div className="bg-[#14181f] rounded-[2.2rem] p-3 sm:p-4.5 border-2 border-slate-800/90 space-y-3.5 shadow-inner w-full">
              
              {/* TOP HEADER: TI-nspire cx & School Property Badge */}
              <div className="text-center pt-1 pb-1 space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-sm sm:text-base tracking-wide font-sans">
                  <span className="font-bold text-slate-100">TI-</span>
                  <span className="italic font-serif font-bold text-slate-200 text-base sm:text-lg">nspire</span>
                  <span className="font-black text-amber-400 text-sm sm:text-base ml-1">cx</span>
                </div>
                <div className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-amber-400 font-sans">
                  School Property
                </div>
              </div>

              {/* 1. COLOR LCD SCREEN */}
              <div className={`border-2 rounded-2xl p-3 sm:p-3.5 font-mono shadow-inner relative overflow-hidden transition-all duration-300 min-h-[140px] sm:min-h-[160px] ${
                calcState.isOff
                  ? 'bg-slate-950 border-slate-800 text-slate-600'
                  : 'bg-[#0b1b2b] border-sky-800/80 text-sky-100'
              }`}>
                {/* Status Bar */}
                <div className={`flex items-center justify-between text-[9px] sm:text-[10px] border-b pb-1 mb-1.5 font-sans font-bold ${
                  calcState.isOff ? 'border-slate-800/60 text-slate-600' : 'border-sky-800/60 text-sky-300/90'
                }`}>
                  <span className="flex items-center gap-1">
                    <span>{calcState.isOff ? '○' : '★'}</span>
                    <span className={calcState.isOff ? 'text-slate-500 font-semibold' : 'text-sky-200 font-semibold'}>
                      {screenLine1 || (calcState.isOff ? 'Standby / Powered Off' : 'Scratchpad - Calculate')}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {calcState.ctrlActive && (
                      <span className="text-[7px] sm:text-[8px] px-1 py-0.2 rounded font-black bg-amber-400 text-slate-950 shadow-sm animate-pulse">
                        CTRL
                      </span>
                    )}
                    <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded border ${
                      calcState.isOff ? 'bg-slate-900 text-slate-600 border-slate-800' : 'bg-sky-950 text-sky-300 border-sky-700/40'
                    }`}>
                      {calcState.isOff ? 'OFF' : 'DEG • REAL • FLOAT 6'}
                    </span>
                  </div>
                </div>

                {/* Calculation Screen Lines OR Custom Application Screen Content */}
                {customLcdContent ? (
                  <div className="relative w-full h-[180px] sm:h-[210px] overflow-hidden select-none">
                    {customLcdContent}
                  </div>
                ) : (
                  <div className="space-y-1 min-h-[4rem] flex flex-col justify-center px-1">
                    {/* Square Root Radical Template Input Mode */}
                    {calcState.templateType === 'sqrt' && !calcState.isOff ? (
                    <div className="flex items-center gap-2 py-1">
                      <div className="inline-flex items-center font-mono">
                        <span className="text-base sm:text-lg font-black text-sky-200 leading-none mr-0.5">√</span>
                        <div
                          className="min-w-[2.5rem] px-2 py-0.5 text-center text-xs sm:text-sm font-bold rounded border-t-2 border-sky-200 bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black animate-pulse"
                          title="Radicand (type digits, then press [enter])"
                        >
                          {calcState.radicand ? calcState.radicand : '▫'}
                        </div>
                      </div>
                      <span className="text-[10px] text-sky-300 italic">
                        [Type radicand • press [enter] to evaluate]
                      </span>
                    </div>
                  ) : calcState.activeFractionSlot && !calcState.isOff ? (
                    <div className="flex items-center gap-2 py-1">
                      <div className="inline-flex flex-col items-center justify-center font-mono">
                        {/* Numerator Box */}
                        <div
                          onClick={() => handleKeyClick('up')}
                          className={`min-w-[2.5rem] px-2 py-0.5 text-center text-xs sm:text-sm font-bold rounded cursor-pointer transition-all ${
                            calcState.activeFractionSlot === 'num'
                              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black animate-pulse'
                              : 'bg-slate-800/80 text-sky-100 border border-slate-600'
                          }`}
                          title="Numerator (click or press Up arrow)"
                        >
                          {calcState.fractionNum ? calcState.fractionNum : '▫'}
                        </div>
                        {/* Fraction Bar */}
                        <div className="w-full h-0.5 bg-sky-200 my-0.5" />
                        {/* Denominator Box */}
                        <div
                          onClick={() => handleKeyClick('down')}
                          className={`min-w-[2.5rem] px-2 py-0.5 text-center text-xs sm:text-sm font-bold rounded cursor-pointer transition-all ${
                            calcState.activeFractionSlot === 'den'
                              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black animate-pulse'
                              : 'bg-slate-800/80 text-sky-100 border border-slate-600'
                          }`}
                          title="Denominator (click or press Down arrow/Tab)"
                        >
                          {calcState.fractionDen ? calcState.fractionDen : '▫'}
                        </div>
                      </div>
                      <span className="text-[10px] text-sky-300 italic">
                        {calcState.activeFractionSlot === 'num' ? '[Type top • press ▼ for bottom]' : '[Type bottom • press [enter] to evaluate]'}
                      </span>
                    </div>
                  ) : (
                    calcState.expression && (
                      <div className={`text-xs sm:text-sm font-bold tracking-wide break-words ${calcState.isOff ? 'text-slate-500' : 'text-sky-100'}`}>
                        {calcState.expression}
                      </div>
                    )
                  )}
                  {calcState.evaluatedResult && (
                    <div className={`text-sm sm:text-base font-black flex items-center justify-end tracking-wider ${calcState.isOff ? 'text-slate-500' : 'text-amber-300'}`}>
                      {calcState.evaluatedResult}
                    </div>
                  )}
                  {!calcState.expression && !calcState.evaluatedResult && !calcState.activeFractionSlot && !calcState.templateType && (
                    <div className={`text-[11px] italic text-center py-2 font-sans ${calcState.isOff ? 'text-slate-600' : 'text-sky-400/60'}`}>
                      {calcState.isOff
                        ? '[ Handheld is Powered Off • Press [on] at upper right to turn on ]'
                        : '[ Handheld Ready • Type on keypad or evaluate ]'}
                    </div>
                  )}
                </div>
              )}

                {/* Authentic TI-Nspire Math Templates Palette */}
                {calcState.isTemplateOpen && !calcState.isOff && !customLcdContent && (
                  <div className="absolute inset-x-2 top-7 bottom-2 bg-[#f8fafc] text-slate-900 rounded-lg shadow-2xl border-2 border-sky-600 flex flex-col z-30 overflow-hidden font-sans">
                    {/* Palette Header */}
                    <div className="bg-[#0f2942] text-sky-100 px-2 py-1 text-[10px] sm:text-xs font-bold flex items-center justify-between border-b border-sky-700 select-none">
                      <span className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-mono">|▫|</span>
                        <span>Math Templates</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('esc')}
                        className="text-[9px] text-sky-300 hover:text-white px-1 font-mono"
                        title="Close palette ([esc])"
                      >
                        [esc]
                      </button>
                    </div>

                    {/* Templates Grid */}
                    <div className="p-2 flex-1 bg-slate-100 overflow-y-auto">
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          {
                            id: 'fraction',
                            name: 'Fraction',
                            render: (
                              <div className="flex flex-col items-center leading-none">
                                <span className="border-b-2 border-current px-1 pb-0.5">▫</span>
                                <span className="px-1 pt-0.5">▫</span>
                              </div>
                            ),
                          },
                          {
                            id: 'exp',
                            name: 'e^▫',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                e<sup>▫</sup>
                              </span>
                            ),
                          },
                          {
                            id: 'log',
                            name: 'log_▫▫',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                log<sub>▫</sub>▫
                              </span>
                            ),
                          },
                          {
                            id: 'sqrt',
                            name: 'Square Root',
                            render: (
                              <span className="font-mono font-bold text-sm">
                                √▫
                              </span>
                            ),
                          },
                          {
                            id: 'nthroot',
                            name: 'ⁿ√▫',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                <sup>▫</sup>√▫
                              </span>
                            ),
                          },
                          {
                            id: 'abs',
                            name: '|▫|',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                |▫|
                              </span>
                            ),
                          },
                          {
                            id: 'piecewise',
                            name: '{▫',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                {'{'}▫
                              </span>
                            ),
                          },
                          {
                            id: 'matrix',
                            name: '[▫]',
                            render: (
                              <span className="font-mono font-bold text-xs">
                                [▫]
                              </span>
                            ),
                          },
                        ].map((item, idx) => {
                          const isSelected = (calcState.selectedTemplateIndex ?? 0) === idx;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleKeyClick(item.id)}
                              className={`h-12 sm:h-13 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 font-black border-amber-600 ring-4 ring-amber-300 shadow-md scale-102 z-10'
                                  : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:bg-sky-50 shadow-sm'
                              }`}
                              title={`${item.name} Template (Touchpad arrows to select, [enter] to insert)`}
                            >
                              <div className="text-xs font-black">{item.render}</div>
                              <span
                                className={`text-[8px] mt-0.5 font-bold ${
                                  isSelected ? 'text-slate-950 font-black' : 'text-slate-500'
                                }`}
                              >
                                {item.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-2 text-[9px] text-slate-600 text-center font-medium">
                        Touchpad <strong className="text-sky-700">▲ ▼ ◀ ▶</strong> to move • Press <strong className="text-slate-900">[enter]</strong> to insert
                      </div>
                    </div>
                  </div>
                )}

                {/* Authentic TI-Nspire Internal Menu Display */}
                {calcState.menuLevel !== 'none' && !calcState.isOff && !customLcdContent && (
                  <div className="absolute inset-x-1.5 top-7 bottom-1.5 bg-[#f8fafc] text-slate-900 rounded-lg shadow-2xl border border-sky-600 flex flex-col z-20 overflow-hidden font-sans">
                    {/* Menu Header Bar */}
                    <div className="bg-[#0f2942] text-sky-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold flex items-center justify-between border-b border-sky-700/60 select-none">
                      {calcState.menuLevel === 'root' ? (
                        <span className="flex items-center gap-1">
                          <span className="text-amber-400 text-xs">▤</span>
                          <span>Menu</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleKeyClick('esc')}
                          className="flex items-center gap-1 text-sky-200 hover:text-amber-300 transition-colors font-bold cursor-pointer"
                          title="Press [esc] or click to go back"
                        >
                          <span>◀</span>
                          <span>2: Number</span>
                        </button>
                      )}
                      <span className="text-[8px] text-sky-300 font-mono">
                        {calcState.menuLevel === 'root' ? '1-8 or [esc]' : '1-9 or [esc]'}
                      </span>
                    </div>

                    {/* Menu Options */}
                    <div className="p-1 overflow-y-auto flex-1 divide-y divide-slate-200/60 text-[10px] sm:text-[11px]">
                      {(calcState.menuLevel === 'root' ? ROOT_MENU_ITEMS : NUMBER_SUBMENU_ITEMS).map((item, idx) => {
                        const isFocused = idx === calcState.selectedMenuIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleKeyClick(item.id)}
                            className={`w-full text-left px-2 py-0.5 rounded flex items-center justify-between transition-colors select-none cursor-pointer ${
                              isFocused
                                ? 'bg-[#0284c7] text-white font-bold shadow-sm'
                                : 'text-slate-800 hover:bg-sky-100 font-medium'
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                            {item.hasSubmenu && (
                              <span className={`text-[9px] font-bold ml-1 ${isFocused ? 'text-white' : 'text-slate-400'}`}>
                                ▶
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Subtle Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
              </div>

              {/* 2. NAVIGATION & TOUCHPAD ZONE */}
              <div className="bg-[#181d25] rounded-2xl p-2.5 border border-slate-800/80">
                <div className="grid grid-cols-5 gap-2 items-center">
                  
                  {/* Left Column (3 Stacked Keys): [esc], [scratchpad], [tab] */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    {/* [esc] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] text-amber-400 font-black leading-none pb-0.5">↶</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('esc')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-black border flex items-center justify-center transition-all ${getKeyStyle(
                          'esc',
                          ['escape', 'undo'],
                          'dark'
                        )}`}
                        title="[esc] Escape key (undo secondary)"
                      >
                        esc
                      </button>
                    </div>

                    {/* [scratchpad] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-amber-400 font-extrabold leading-none pb-0.5">save</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('scratchpad')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[9px] sm:text-[10px] font-bold border flex items-center justify-center transition-all ${getKeyStyle(
                          'scratchpad',
                          ['scratch', 'pad', 'calculate', 'graph'],
                          'dark'
                        )}`}
                        title="[scratchpad] Scratchpad Toggle (Calculate / Graph)"
                      >
                        ⌨/📈
                      </button>
                    </div>

                    {/* [tab] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-amber-400 font-extrabold leading-none pb-0.5">⇥</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('tab')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-black border flex items-center justify-center transition-all ${getKeyStyle(
                          'tab',
                          [],
                          'dark'
                        )}`}
                        title="[tab] Tab key"
                      >
                        tab
                      </button>
                    </div>
                  </div>

                  {/* Center: Central Touchpad with Yellow Outline */}
                  <div className="col-span-3 flex justify-center">
                    <div
                      className={`relative w-34 sm:w-41 h-28 sm:h-32 rounded-2xl bg-[#0f1318] border-3 border-amber-400 p-1 flex flex-col items-center justify-between shadow-md transition-all ${
                        isKeyHighlighted('touchpad', ['nav', 'arrows', 'click'])
                          ? 'ring-4 ring-amber-300 scale-105'
                          : ''
                      }`}
                    >
                      {/* Outer Yellow Rim Indicators */}
                      <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-[8px] font-black text-amber-400">
                        [◀]
                      </span>
                      <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[8px] font-black text-amber-400">
                        [▶]
                      </span>
                      <span className="absolute top-0 text-[7px] font-bold text-amber-400">
                        ⬒
                      </span>
                      <span className="absolute bottom-0 text-[7px] font-bold text-amber-400">
                        ◻▾
                      </span>

                      {/* Directional Arrows & Center Click Pad */}
                      <button
                        type="button"
                        onClick={() => handleKeyClick('up')}
                        className={`text-slate-300 hover:text-amber-400 text-xs font-black pt-1 cursor-pointer active:scale-95 transition-transform ${
                          isKeyHighlighted('up', ['touchpad', 'nav']) ? 'text-amber-400 scale-125' : ''
                        }`}
                        title="Touchpad Up Arrow"
                      >
                        ▲
                      </button>

                      <div className="flex items-center justify-between w-full px-3">
                        <button
                          type="button"
                          onClick={() => handleKeyClick('left')}
                          className={`text-slate-300 hover:text-amber-400 text-xs font-black cursor-pointer active:scale-95 transition-transform ${
                            isKeyHighlighted('left', ['touchpad', 'nav']) ? 'text-amber-400 scale-125' : ''
                          }`}
                          title="Touchpad Left Arrow"
                        >
                          ◀
                        </button>

                        {/* Center Click Pad */}
                        <button
                          type="button"
                          onClick={() => handleKeyClick('click')}
                          className={`w-11 sm:w-13 h-9 sm:h-10 rounded-xl bg-slate-800/90 border border-slate-600 flex items-center justify-center text-slate-200 shadow-inner cursor-pointer transition-all active:scale-95 ${
                            isKeyHighlighted('click', ['touchpad', 'center'])
                              ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300'
                              : 'hover:bg-slate-700'
                          }`}
                          title="Touchpad Center Click"
                        >
                          <span className="text-xs sm:text-sm font-black flex items-center gap-0.5">
                            <span>👆</span>
                            <span className="text-[10px] leading-none">↖</span>
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleKeyClick('right')}
                          className={`text-slate-300 hover:text-amber-400 text-xs font-black cursor-pointer active:scale-95 transition-transform ${
                            isKeyHighlighted('right', ['touchpad', 'nav']) ? 'text-amber-400 scale-125' : ''
                          }`}
                          title="Touchpad Right Arrow"
                        >
                          ▶
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleKeyClick('down')}
                        className={`text-slate-300 hover:text-amber-400 text-xs font-black pb-1 cursor-pointer active:scale-95 transition-transform ${
                          isKeyHighlighted('down', ['touchpad', 'nav']) ? 'text-amber-400 scale-125' : ''
                        }`}
                        title="Touchpad Down Arrow"
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* Right Column (3 Stacked Keys): [on], [doc], [menu] */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    {/* [🏠on] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-amber-400 font-black leading-none pb-0.5">off</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('on')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[9px] sm:text-[10px] font-black border flex items-center justify-center gap-0.5 transition-all ${getKeyStyle(
                          'on',
                          ['home', 'on/home', 'power'],
                          'dark'
                        )}`}
                        title="[on] Home / Power key (off secondary)"
                      >
                        <span className="text-[10px]">🏠</span>
                        <span>on</span>
                      </button>
                    </div>

                    {/* [doc ▾] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-amber-400 font-extrabold leading-none pb-0.5">+page</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('doc')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold border flex items-center justify-center transition-all ${getKeyStyle(
                          'doc',
                          ['document'],
                          'dark'
                        )}`}
                        title="[doc] Documents key (+page secondary)"
                      >
                        doc▾
                      </button>
                    </div>

                    {/* [menu] */}
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-amber-400 font-extrabold leading-none pb-0.5">▤</span>
                      <button
                        type="button"
                        onClick={() => handleKeyClick('menu')}
                        className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-black border flex items-center justify-center transition-all ${getKeyStyle(
                          'menu',
                          [],
                          'dark'
                        )}`}
                        title="[menu] Menu key"
                      >
                        menu
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. MODIFIER ROW: Exact Physical 7-Column Grid from Photo */}
              {/* Aligned directly above the 7 columns of the math matrix below: */}
              {/* [ctrl] spans cols 1-2 | [shift] in col 3 | GAP in col 4 | [var] in col 5 | [del] spans cols 6-7 */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-end pt-1">
                {/* [ctrl] - CRITICAL: BRIGHT YELLOW KEY SPANNING 2 COLUMNS (Above = and trig) */}
                <div className="col-span-2 flex flex-col items-center">
                  <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                  <button
                    type="button"
                    onClick={() => handleKeyClick('ctrl')}
                    className={`w-full h-8 sm:h-9 rounded-lg text-xs font-black border flex items-center justify-center uppercase tracking-wider transition-all ${getKeyStyle(
                      'ctrl',
                      ['control'],
                      'yellow'
                    )}`}
                    title="[ctrl] Control key - Activates yellow secondary functions"
                  >
                    ctrl
                  </button>
                </div>

                {/* [shift] - Column 3 directly above 7 */}
                <div className="col-span-1 flex flex-col items-center">
                  <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">CAPS</span>
                  <button
                    type="button"
                    onClick={() => handleKeyClick('shift')}
                    className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold border flex items-center justify-center transition-all ${getKeyStyle(
                      'shift',
                      [],
                      'dark'
                    )}`}
                    title="[shift] Shift key (CAPS secondary)"
                  >
                    ⇧shift
                  </button>
                </div>

                {/* Column 4 - Physical Handheld Gap directly above 8 (smooth dark faceplate) */}
                <div className="col-span-1" />

                {/* [var] - Column 5 directly above 9 */}
                <div className="col-span-1 flex flex-col items-center">
                  <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">sto →</span>
                  <button
                    type="button"
                    onClick={() => handleKeyClick('var')}
                    className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold border flex items-center justify-center transition-all ${getKeyStyle(
                      'var',
                      ['variables', 'sto'],
                      'dark'
                    )}`}
                    title="[var] Variables key (store secondary)"
                  >
                    var
                  </button>
                </div>

                {/* [del] - Spanning Columns 6 and 7 directly above template and catalog */}
                <div className="col-span-2 flex flex-col items-center">
                  <span className="text-[7px] text-amber-400 font-black leading-none pb-0.5">clear</span>
                  <button
                    type="button"
                    onClick={() => handleKeyClick('del')}
                    className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-bold border flex items-center justify-center transition-all ${getKeyStyle(
                      'del',
                      ['delete', 'clear', 'backspace'],
                      'dark'
                    )}`}
                    title="[del] Delete key ([ctrl]+[del] = clear)"
                  >
                    del
                  </button>
                </div>
              </div>

              {/* 4. MAIN MATH & NUMERIC KEYPAD MATRIX (7 Columns × 4 Rows) */}
              <div className="space-y-1.5 pt-1">
                
                {/* ROW 1: [=] [trig] | [7] [8] [9] | [|▫|] [📖] */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-end">
                  {/* Col 1: [=] */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">|≠≥&gt;</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('=')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs font-bold border flex items-center justify-center ${getKeyStyle('=', ['equals'])}`}
                      title="[=] Equals key"
                    >
                      =
                    </button>
                  </div>

                  {/* Col 2: [trig] */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">(?)</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('trig')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[10px] font-bold border flex items-center justify-center ${getKeyStyle('trig', ['sin', 'cos', 'tan'])}`}
                      title="[trig] Trigonometry menu"
                    >
                      trig
                    </button>
                  </div>

                  {/* Col 3: [7] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('7')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('7', [], 'white')}`}
                      title="Number 7"
                    >
                      7
                    </button>
                  </div>

                  {/* Col 4: [8] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('8')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('8', [], 'white')}`}
                      title="Number 8"
                    >
                      8
                    </button>
                  </div>

                  {/* Col 5: [9] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('9')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('9', [], 'white')}`}
                      title="Number 9"
                    >
                      9
                    </button>
                  </div>

                  {/* Col 6: [|▫| {▫] Templates Palette */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">:=</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('template')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[9px] font-bold border flex items-center justify-center ${getKeyStyle('template', ['templates', '|▫|', 'matrix'], 'operator')}`}
                      title="[|▫|] Math Expression Templates Palette"
                    >
                      |▫|{'{'}
                    </button>
                  </div>

                  {/* Col 7: [📖] Catalog */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">∞°β</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('catalog')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs border flex items-center justify-center ${getKeyStyle('catalog', ['book', 'symbols'], 'operator')}`}
                      title="[📖] Catalog Book Key"
                    >
                      📖
                    </button>
                  </div>
                </div>

                {/* ROW 2: [^] [x²] (with √) | [4] [5] [6] | [×] [÷] (with ▫/▫) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-end">
                  {/* Col 1: [^] Power */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">ⁿ√x</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('^')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs font-bold border flex items-center justify-center ${getKeyStyle('^', ['power', 'exponent', 'caret'])}`}
                      title="[^] Power / Exponent key (n-th root secondary)"
                    >
                      ^
                    </button>
                  </div>

                  {/* Col 2: [x²] Square (CRITICAL: Square Root √ secondary) */}
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] text-amber-400 font-black leading-none pb-0.5">√</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('x²')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[11px] sm:text-xs font-bold border flex items-center justify-center ${getKeyStyle('x²', ['x^2', 'square', 'squareroot', 'root', '√'])}`}
                      title="[x²] Square key ([ctrl]+[x²] = Square Root √)"
                    >
                      x²
                    </button>
                  </div>

                  {/* Col 3: [4] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('4')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('4', [], 'white')}`}
                      title="Number 4"
                    >
                      4
                    </button>
                  </div>

                  {/* Col 4: [5] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('5')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('5', [], 'white')}`}
                      title="Number 5"
                    >
                      5
                    </button>
                  </div>

                  {/* Col 5: [6] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('6')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('6', [], 'white')}`}
                      title="Number 6"
                    >
                      6
                    </button>
                  </div>

                  {/* Col 6: [×] Multiplication */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">" ' "</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('×')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-bold border flex items-center justify-center ${getKeyStyle('×', ['*', 'times', 'multiply'], 'operator')}`}
                      title="[×] Multiplication operator"
                    >
                      ×
                    </button>
                  </div>

                  {/* Col 7: [÷] Division (CRITICAL: Fraction Template secondary ▫/▫) */}
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] text-amber-400 font-black leading-none pb-0.5">▫/▫</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('÷')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-bold border flex items-center justify-center ${getKeyStyle('÷', ['/', 'divide', 'fraction'], 'operator')}`}
                      title="[÷] Division operator ([ctrl]+[÷] = Fraction template)"
                    >
                      ÷
                    </button>
                  </div>
                </div>

                {/* ROW 3: [eˣ] [10ˣ] | [1] [2] [3] | [+] [-] (SUBTRACTION) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-end">
                  {/* Col 1: [eˣ] */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">ln</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('eˣ')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[10px] font-bold border flex items-center justify-center ${getKeyStyle('eˣ', ['e^x', 'ln', 'e'])}`}
                      title="[eˣ] Exponential (ln secondary)"
                    >
                      eˣ
                    </button>
                  </div>

                  {/* Col 2: [10ˣ] */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">log</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('10ˣ')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[10px] font-bold border flex items-center justify-center ${getKeyStyle('10ˣ', ['10^x', 'log'])}`}
                      title="[10ˣ] Power of 10 (log secondary)"
                    >
                      10ˣ
                    </button>
                  </div>

                  {/* Col 3: [1] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('1')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('1', [], 'white')}`}
                      title="Number 1"
                    >
                      1
                    </button>
                  </div>

                  {/* Col 4: [2] - WHITE KEY (with yellow capture) */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">capture</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('2')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('2', [], 'white')}`}
                      title="Number 2"
                    >
                      2
                    </button>
                  </div>

                  {/* Col 5: [3] - WHITE KEY (with yellow ans.) */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">ans.</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('3')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('3', [], 'white')}`}
                      title="Number 3"
                    >
                      3
                    </button>
                  </div>

                  {/* Col 6: [+] Addition */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">◗</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('+')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-bold border flex items-center justify-center ${getKeyStyle('+', ['plus', 'add'], 'operator')}`}
                      title="[+] Addition operator"
                    >
                      +
                    </button>
                  </div>

                  {/* Col 7: [-] CRITICAL: SUBTRACTION OPERATOR (Far right column!) */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">◖</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('-')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-black border flex items-center justify-center ${getKeyStyle('-', ['minus', 'subtraction', 'subtract'], 'operator')}`}
                      title="[-] Subtraction Operator Key (Between two numbers)"
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* ROW 4: [(] [)] | [0] [.] [(-)] (NEGATIVE) | [enter] (with ≈) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 items-end">
                  {/* Col 1: [(] Open Parenthesis */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">[ ]</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('(')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs font-bold border flex items-center justify-center ${getKeyStyle('(', ['lparen', 'openparen'])}`}
                      title="[(] Open Parenthesis"
                    >
                      (
                    </button>
                  </div>

                  {/* Col 2: [)] Close Parenthesis */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-amber-400 font-bold leading-none pb-0.5">{'{ }'}</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick(')')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs font-bold border flex items-center justify-center ${getKeyStyle(')', ['rparen', 'closeparen'])}`}
                      title="[)] Close Parenthesis"
                    >
                      )
                    </button>
                  </div>

                  {/* Col 3: [0] - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('0')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm border flex items-center justify-center ${getKeyStyle('0', ['zero'], 'white')}`}
                      title="Number 0"
                    >
                      0
                    </button>
                  </div>

                  {/* Col 4: [.] Decimal Point - WHITE KEY */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('.')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs sm:text-sm font-black border flex items-center justify-center ${getKeyStyle('.', ['decimal', 'point'], 'white')}`}
                      title="[.] Decimal point"
                    >
                      .
                    </button>
                  </div>

                  {/* Col 5: [(-)] CRITICAL: DEDICATED NEGATIVE KEY - WHITE KEY NEXT TO DECIMAL! */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-transparent leading-none pb-0.5">•</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('(-)')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-[10px] sm:text-xs font-black border flex items-center justify-center ${getKeyStyle('(-)', ['negative', 'neg', '(- )'], 'white')}`}
                      title="[(-)] Dedicated Negative Number Key (Bottom row of numbers!)"
                    >
                      (-)
                    </button>
                  </div>

                  {/* Col 6 & 7: [enter] (Spans 2 columns, with yellow ≈ decimal approximation) */}
                  <div className="col-span-2 flex flex-col items-center">
                    <span className="text-[8px] text-amber-400 font-black leading-none pb-0.5">≈</span>
                    <button
                      type="button"
                      onClick={() => handleKeyClick('enter')}
                      className={`w-full h-8 sm:h-9 rounded-lg text-xs font-black border flex items-center justify-center tracking-wider transition-all ${getKeyStyle('enter', ['≈', 'return', 'exe'], 'operator')}`}
                      title="[enter] Enter key ([ctrl]+[enter] = Decimal Approximation ≈)"
                    >
                      enter
                    </button>
                  </div>
                </div>

              </div>

              {/* 5. ALPHA KEYBOARD AREA (Exact 4 Physical Rows from Photo) */}
              <div className="bg-[#181d25] rounded-2xl p-2 sm:p-2.5 border border-slate-800/80 space-y-1 sm:space-y-1.5 pt-2">
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center">
                  Alpha Keyboard
                </div>

                {/* Alpha Row 1 (9 Keys): [EE] | [A] [B] [C] [D] [E] [F] [G] | [?! ▶] */}
                <div className="grid grid-cols-9 gap-1 text-center">
                  {/* [EE] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('ee')}
                    className={`h-7 rounded-md text-[9px] font-bold border flex items-center justify-center ${getKeyStyle('ee', ['exp'])}`}
                    title="[EE] Scientific notation (×10^)"
                  >
                    EE
                  </button>
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleKeyClick(l)}
                      className={`h-7 rounded-md text-[10px] font-bold uppercase border flex items-center justify-center ${getKeyStyle(l, [l.toUpperCase()])}`}
                      title={`Letter ${l.toUpperCase()}`}
                    >
                      {l}
                    </button>
                  ))}
                  {/* [?! ▶] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('?!')}
                    className={`h-7 rounded-md text-[9px] font-bold border flex items-center justify-center ${getKeyStyle('?!', ['?', '!', 'punct'])}`}
                    title="Punctuation and symbols"
                  >
                    ?!▶
                  </button>
                </div>

                {/* Alpha Row 2 (9 Keys): [π ▶] | [H] [I] [J] [K] [L] [M] [N] | [⚲] */}
                <div className="grid grid-cols-9 gap-1 text-center">
                  {/* [π ▶] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('pi')}
                    className={`h-7 rounded-md text-[10px] font-bold border flex items-center justify-center ${getKeyStyle('pi', ['π', 'pi▶'])}`}
                    title="[π] Pi Constant"
                  >
                    π▶
                  </button>
                  {['h', 'i', 'j', 'k', 'l', 'm', 'n'].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleKeyClick(l)}
                      className={`h-7 rounded-md text-[10px] font-bold uppercase border flex items-center justify-center ${getKeyStyle(l, [l.toUpperCase()])}`}
                      title={`Letter ${l.toUpperCase()}`}
                    >
                      {l}
                    </button>
                  ))}
                  {/* [⚲] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('symbol')}
                    className={`h-7 rounded-md text-[9px] font-bold border flex items-center justify-center ${getKeyStyle('symbol', ['flag', '⚲'])}`}
                    title="Special symbol / catalog flag"
                  >
                    ⚲
                  </button>
                </div>

                {/* Alpha Row 3 (9 Keys): [,] | [O] [P] [Q] [R] [S] [T] [U] | [⮠] */}
                <div className="grid grid-cols-9 gap-1 text-center">
                  {/* [,] Comma */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick(',')}
                    className={`h-7 rounded-md text-[11px] font-bold border flex items-center justify-center ${getKeyStyle(',', ['comma'])}`}
                    title="[,] Comma"
                  >
                    ,
                  </button>
                  {['o', 'p', 'q', 'r', 's', 't', 'u'].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => handleKeyClick(l)}
                      className={`h-7 rounded-md text-[10px] font-bold uppercase border flex items-center justify-center ${getKeyStyle(l, [l.toUpperCase()])}`}
                      title={`Letter ${l.toUpperCase()}`}
                    >
                      {l}
                    </button>
                  ))}
                  {/* [↵] Return */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('newline')}
                    className={`h-7 rounded-md text-[10px] font-bold border flex items-center justify-center ${getKeyStyle('newline', ['return', '⮠', 'enter_alpha'])}`}
                    title="Newline / Return"
                  >
                    ↵
                  </button>
                </div>

                {/* Alpha Row 4 (6 Keys): [V] [W] | [X] [Y] [Z] (WHITE KEYS!) | [␣] Space Bar */}
                <div className="grid grid-cols-9 gap-1 text-center items-center">
                  {/* Spacer for indentation */}
                  <div className="col-span-1" />
                  
                  {/* [V] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('v')}
                    className={`col-span-1 h-7 rounded-md text-[10px] font-bold uppercase border flex items-center justify-center ${getKeyStyle('v', ['V'])}`}
                    title="Letter V"
                  >
                    v
                  </button>

                  {/* [W] */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('w')}
                    className={`col-span-1 h-7 rounded-md text-[10px] font-bold uppercase border flex items-center justify-center ${getKeyStyle('w', ['W'])}`}
                    title="Letter W"
                  >
                    w
                  </button>

                  {/* [X] - CRITICAL: WHITE KEY! Primary Algebra Variable on TI-Nspire CX! */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('x')}
                    className={`col-span-1 h-7 rounded-md text-[11px] font-black uppercase border flex items-center justify-center shadow-sm ${getKeyStyle('x', ['X', 'varx'], 'white')}`}
                    title="[x] Primary Variable X (Dedicated White Key)"
                  >
                    x
                  </button>

                  {/* [Y] - CRITICAL: WHITE KEY! Secondary Algebra Variable on TI-Nspire CX! */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('y')}
                    className={`col-span-1 h-7 rounded-md text-[11px] font-black uppercase border flex items-center justify-center shadow-sm ${getKeyStyle('y', ['Y', 'vary'], 'white')}`}
                    title="[y] Secondary Variable Y (Dedicated White Key)"
                  >
                    y
                  </button>

                  {/* [Z] - CRITICAL: WHITE KEY! Third Variable on TI-Nspire CX! */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('z')}
                    className={`col-span-1 h-7 rounded-md text-[11px] font-black uppercase border flex items-center justify-center shadow-sm ${getKeyStyle('z', ['Z', 'varz'], 'white')}`}
                    title="[z] Variable Z (Dedicated White Key)"
                  >
                    z
                  </button>

                  {/* [␣] Space Bar (Spans 2 columns) */}
                  <button
                    type="button"
                    onClick={() => handleKeyClick('space')}
                    className={`col-span-2 h-7 rounded-md text-xs font-bold border flex items-center justify-center ${getKeyStyle('space', [' ', '␣'])}`}
                    title="[␣] Space Bar"
                  >
                    ␣
                  </button>

                  {/* End spacer */}
                  <div className="col-span-1" />
                </div>
              </div>

              {/* 6. BOTTOM BEZEL: Texas Instruments Brand */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-slate-400 text-[10px] font-semibold tracking-wider">
                <span className="text-xs">★</span>
                <span>TEXAS INSTRUMENTS</span>
              </div>

            </div>
          </div>
        </div>

      {/* CLASSROOM CONTEXT & HARDWARE TUTORIAL CALLOUTS (Positioned below Handheld in Tutorials Only) */}
      {!hideTutorialCallouts && (
        <div className="w-full max-w-[460px] mx-auto space-y-4 pt-2">
          
          {/* Active Target Keys Card */}
          <div className="bg-slate-900/90 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>🎯 Target Physical Keys</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                Look at your Handheld
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {highlightedKeys.length > 0 ? (
                highlightedKeys.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1 ring-2 ring-amber-300"
                  >
                    <span>[{k}]</span>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No specific keys highlighted for this step.</span>
              )}
            </div>

            {notes && (
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {notes}
                </p>
              </div>
            )}
          </div>

          {/* CRITICAL HARDWARE DISTINCTION: Subtraction [-] vs Negative [(-)] */}
          <div className="bg-rose-950/40 border-2 border-rose-600/70 p-4 sm:p-5 rounded-3xl space-y-2 text-rose-100 shadow-lg">
            <div className="text-xs font-black uppercase tracking-wide text-rose-300 flex items-center gap-1.5">
              <span>⚠️ Classroom Hardware Rule: Subtraction vs. Negative</span>
            </div>
            <p className="text-xs leading-relaxed text-rose-200 font-medium">
              <strong className="text-white underline">Never mix these up on your TI-Nspire CX:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-rose-800/60">
                <div className="font-bold text-amber-300 flex items-center gap-1 pb-1">
                  <span>[-] Subtraction</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-tight">
                  Dark key in the <strong>far-right operator column</strong> between <code className="text-cyan-300 font-bold">×</code> and <code className="text-white font-bold">enter</code>. Used between two numbers.
                </div>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-rose-800/60">
                <div className="font-bold text-white flex items-center gap-1 pb-1">
                  <span>[(-)] Negative</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-tight">
                  <strong>White key</strong> at the bottom of the numeric pad next to <code className="text-white font-bold">.</code> (decimal). Used before a negative quantity.
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Functions ([ctrl] Shortcuts) */}
          <div className="bg-slate-900/80 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-2.5 shadow-lg">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>🟡 Yellow [ctrl] Secondary Shortcuts (School Property Edition)</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">ctrl</span>
                <span className="font-bold text-slate-400">+</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-black text-[10px]">÷</span>
                <span className="text-[11px] leading-tight pt-0.5">
                  <strong className="text-white">Fraction Bar (▫/▫):</strong> Creates a clean stacked numerator/denominator template.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">ctrl</span>
                <span className="font-bold text-slate-400">+</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-black text-[10px]">x²</span>
                <span className="text-[11px] leading-tight pt-0.5">
                  <strong className="text-white">Square Root (√):</strong> Opens radical sign for square root calculation.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">ctrl</span>
                <span className="font-bold text-slate-400">+</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-black text-[10px]">enter</span>
                <span className="text-[11px] leading-tight pt-0.5">
                  <strong className="text-white">Decimal (≈):</strong> Forces exact fractions/radicals into decimal approximations.
                </span>
              </li>
            </ul>
          </div>

          {/* Classroom Warning Callout */}
          {specialWarning && (
            <div className="bg-amber-950/40 border border-amber-500/60 p-4 rounded-3xl space-y-1.5 text-amber-200 shadow-md">
              <div className="text-xs font-black uppercase tracking-wide text-amber-300 flex items-center gap-1.5">
                <span>⚠️ Teacher Notice</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {specialWarning}
              </p>
            </div>
          )}

          {/* Mathematical Rule Banner */}
          {mathRule && (
            <div className="bg-blue-950/40 border border-blue-500/60 p-4 rounded-3xl space-y-1.5 text-blue-200 shadow-md">
              <div className="text-xs font-black uppercase tracking-wide text-blue-300 flex items-center gap-1.5">
                <span>📘 Mathematical Rule</span>
              </div>
              <p className="text-xs leading-relaxed font-semibold italic">
                {mathRule}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
