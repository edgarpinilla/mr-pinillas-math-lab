import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Power,
  RotateCcw,
  ShieldAlert,
  Home,
  Check,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';

export interface Level1StartupOrientationProps {
  onStartupComplete: (initialDocType?: string) => void;
  onBack: () => void;
}

export type Level1StartupStep =
  | 'powered_off'
  | 'press_to_test'
  | 'previous_screen'
  | 'home_screen';

export const Level1StartupOrientation: React.FC<Level1StartupOrientationProps> = ({
  onStartupComplete,
  onBack,
}) => {
  const [startupStep, setStartupStep] = useState<Level1StartupStep>('powered_off');
  const [simulatePressToTest, setSimulatePressToTest] = useState<boolean>(false);
  const [homeSelection, setHomeSelection] = useState<number>(1);
  const [resetCounter, setResetCounter] = useState<number>(0);

  const resetOrientation = (withPtt: boolean = simulatePressToTest) => {
    setStartupStep('powered_off');
    setSimulatePressToTest(withPtt);
    setHomeSelection(1);
    setResetCounter((prev) => prev + 1);
  };

  const handleCalculatorKeyPress = (keyId: string) => {
    const k = keyId.toLowerCase().trim();

    // STEP 1 — POWER ON: Student must press physical [on]
    if (startupStep === 'powered_off') {
      if (k === 'on' || k === 'power') {
        if (simulatePressToTest) {
          setStartupStep('press_to_test');
        } else {
          setStartupStep('previous_screen');
        }
      }
      return;
    }

    // STEP 2/3 — OPTIONAL PRESS-TO-TEST: Student must press [esc]
    if (startupStep === 'press_to_test') {
      if (k === 'esc') {
        setStartupStep('previous_screen');
      }
      return;
    }

    // STEP 4 — GO TO HOME: Student must press physical [home] / [on]
    if (startupStep === 'previous_screen') {
      if (k === 'home' || k === 'on') {
        setStartupStep('home_screen');
        setHomeSelection(1);
      }
      return;
    }

    // STEP 5 — BEGIN MODULE 1: Student manually selects 1: New Document
    if (startupStep === 'home_screen') {
      if (k === '1' || (k === 'enter' && homeSelection === 1)) {
        onStartupComplete('new_document');
        return;
      }
      if (k === 'up') setHomeSelection((prev) => Math.max(1, prev - 1));
      if (k === 'down') setHomeSelection((prev) => Math.min(4, prev + 1));
      if (k === '2') setHomeSelection(2);
      if (k === '3') setHomeSelection(3);
      if (k === '4') setHomeSelection(4);
      return;
    }
  };

  // LCD screen rendering
  const renderLcdContent = () => {
    // 1. POWERED OFF
    if (startupStep === 'powered_off') {
      return (
        <div className="w-full h-full bg-[#050c18] text-slate-400 flex flex-col items-center justify-center p-4 text-center space-y-2 select-none">
          <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-500">
            <Power className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">TI-Nspire CX • Powered Off</span>
          <p className="text-[10px] text-slate-500 max-w-[210px] leading-tight font-mono">
            Press [on] at the top right to wake the handheld.
          </p>
        </div>
      );
    }

    // 2. PRESS-TO-TEST DIALOG (Optional)
    if (startupStep === 'press_to_test') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col items-center justify-center p-2.5 font-sans relative">
          <div className="bg-[#182a47] border-2 border-amber-400 rounded-xl p-3 shadow-2xl max-w-[250px] text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 border-b border-amber-800/60 pb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider">Press-to-Test Active</span>
            </div>
            <p className="text-[9.5px] text-slate-200 leading-snug font-medium text-left">
              This handheld is locked in Press-to-Test mode for testing. Documents and scratchpad have been restored.
            </p>
            <div className="bg-[#0f1d33] p-1.5 rounded border border-sky-900/60 text-[9px] text-slate-300 font-mono text-left space-y-0.5">
              <div>Angle: Radian</div>
              <div>Exact Arithmetic: Off</div>
            </div>
            <div className="pt-1 text-[10px] text-amber-300 font-bold border-t border-slate-700/60 flex items-center justify-center gap-1">
              <span>Press</span>
              <span className="bg-sky-950 px-1 py-0.5 rounded border border-sky-700 text-sky-300 font-mono text-[9px]">
                [esc]
              </span>
              <span>to dismiss</span>
            </div>
          </div>
        </div>
      );
    }

    // 3. PREVIOUS SCREEN (Scratchpad Calculate)
    if (startupStep === 'previous_screen') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1.5">
            <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
              <span>★ Scratchpad</span>
              <span>• Calculate</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">RAD AUTO REAL</span>
          </div>

          <div className="flex-1 bg-[#071322] border border-sky-900/60 rounded-lg p-2 flex flex-col justify-between font-mono text-xs">
            <div className="space-y-1 text-right">
              <div className="text-slate-400 text-[10px]">45 + 15</div>
              <div className="text-amber-300 font-bold text-[11px]">= 60</div>
              <div className="text-slate-400 text-[10px] pt-1">3.14159 * 25</div>
              <div className="text-amber-300 font-bold text-[11px]">= 78.5398</div>
              <div className="text-slate-400 animate-pulse text-left">|</div>
            </div>

            <div className="border-t border-sky-900/60 pt-1 flex items-center justify-between text-[9px] text-sky-300">
              <span className="text-slate-400 italic">Previous screen resumed</span>
              <button
                type="button"
                onClick={() => {
                  setStartupStep('home_screen');
                  setHomeSelection(1);
                }}
                className="px-2 py-0.5 rounded bg-sky-900 hover:bg-sky-800 text-sky-200 border border-sky-700 cursor-pointer font-bold"
              >
                Press [home]
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 4. TI-NSPIRE HOME SCREEN
    if (startupStep === 'home_screen') {
      return (
        <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
          <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-2">
            <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-sky-400 bg-sky-950 px-1 py-0.5 rounded border border-sky-800">
                [home]
              </span>
              <span>TI-Nspire CX Home</span>
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
                      if (item.id === 1) {
                        onStartupComplete('new_document');
                      }
                    }}
                    className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                      homeSelection === item.id
                        ? 'bg-amber-400 text-slate-950 font-black shadow-xs ring-1 ring-amber-300'
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
            Orientation:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            One-Time Startup Orientation
          </span>
        </div>
      </div>

      {/* Main Grid: Guided Orientation Panel (Left) & TI-Nspire Visualizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-start">
        {/* Left Column: Interactive Instructional Guide */}
        <div className="lg:col-span-5 space-y-2.5 lg:sticky lg:top-2">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                <Power className="w-3 h-3 text-amber-600" />
                <span>HARDWARE ORIENTATION</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                Pre-Module 1 Startup
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Calculator Startup & Home Orientation
            </h1>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Turning ON the physical calculator does not guarantee you will start at the Home screen. Learn how to power on, handle previous screens or Press-to-Test notices, and reliably navigate to Home.
            </p>

            {/* Test Scenario Selector (Test A vs Test B) */}
            <div className="pt-1.5 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                Startup Simulation Mode:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => resetOrientation(false)}
                  className={`py-1 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                    !simulatePressToTest
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  <span>Test A: Normal Startup</span>
                  {!simulatePressToTest && <Check className="w-3 h-3 text-white" />}
                </button>

                <button
                  type="button"
                  onClick={() => resetOrientation(true)}
                  className={`py-1 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                    simulatePressToTest
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  <span>Test B: Press-to-Test</span>
                  {simulatePressToTest && <Check className="w-3 h-3 text-slate-950" />}
                </button>
              </div>
            </div>
          </div>

          {/* Active Step Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-3.5 border border-amber-400/30 shadow-lg space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {startupStep === 'powered_off'
                    ? 'Step 1 — Power On'
                    : startupStep === 'press_to_test'
                    ? 'Step 2 — Dismiss Press-to-Test'
                    : startupStep === 'previous_screen'
                    ? 'Step 3 — Reach Home'
                    : 'Step 4 — Select 1: New Document'}
                </span>
              </span>

              <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                {startupStep === 'powered_off'
                  ? 'Step 1 of 4'
                  : startupStep === 'press_to_test'
                  ? 'Notice'
                  : startupStep === 'previous_screen'
                  ? 'Step 2 of 4'
                  : 'Step 3 of 4'}
              </span>
            </div>

            <div className="bg-black/40 rounded-xl p-2.5 sm:p-3 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                Required Physical Action
              </span>
              <div className="text-base sm:text-lg font-mono font-black text-amber-300 tracking-wide">
                {startupStep === 'powered_off'
                  ? 'Press [on] at upper right'
                  : startupStep === 'press_to_test'
                  ? 'Press [esc] at upper left'
                  : startupStep === 'previous_screen'
                  ? 'Press [home] at upper right'
                  : 'Select 1: New Document'}
              </div>
            </div>

            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-1">
              <span className="text-sky-300 font-bold block mb-0.5">Instructional Guidance:</span>
              {startupStep === 'powered_off' && (
                <p className="leading-snug">
                  Press the physical <strong>[on]</strong> button in the upper-right corner of the TI-Nspire keypad to wake the calculator. Notice that the calculator will resume where it left off, rather than jumping automatically to Home.
                </p>
              )}
              {startupStep === 'press_to_test' && (
                <p className="leading-snug">
                  A <strong>Press-to-Test</strong> screen is currently displayed. When this appears on a classroom calculator, press the <strong>[esc]</strong> key in the upper-left corner to dismiss the dialog and return to the active application.
                </p>
              )}
              {startupStep === 'previous_screen' && (
                <p className="leading-snug">
                  The calculator resumed a previous calculation screen (Scratchpad Calculate). When you do not know where the calculator is, press <strong>[home]</strong> (the home icon key) to return to your reliable starting point: the <strong>TI-Nspire Home screen</strong>.
                </p>
              )}
              {startupStep === 'home_screen' && (
                <p className="leading-snug">
                  You are now on the <strong>TI-Nspire Home screen</strong>! Manually select <strong>1: New Document</strong> by pressing <strong>[1]</strong> on the numeric keypad or pressing <strong>[enter]</strong> while 1 is highlighted. Module 1 will then begin!
                </p>
              )}
            </div>

            {/* Reset / Restart Orientation */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => resetOrientation()}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                title="Restart orientation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Startup Sequence</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                One-Time Startup
              </span>
            </div>
          </div>

          {/* Classroom Rule Box */}
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-300/80 space-y-1.5 text-slate-900 shadow-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-900">
              <Home className="w-3.5 h-3.5 text-amber-700" />
              <span>Universal Classroom Navigation Rule</span>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium">
              Whenever you feel lost or the screen has unexpected menus, pressing the <strong>[home]</strong> key immediately returns you to the top-level Home screen so you can start clean.
            </p>
          </div>
        </div>

        {/* Right Column: Authentic TI-Nspire CX Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center lg:max-h-[calc(100vh-75px)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 lg:overscroll-contain">
          <div className="w-full max-w-[480px] pb-6">
            <InteractiveNspireVisualizer
              key={`nspire-startup-${startupStep}-${resetCounter}`}
              resetSignal={resetCounter}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1={
                startupStep === 'powered_off'
                  ? 'TI-Nspire CX • Off'
                  : startupStep === 'press_to_test'
                  ? 'Press-to-Test'
                  : startupStep === 'previous_screen'
                  ? 'Scratchpad • Calculate'
                  : 'Home'
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
