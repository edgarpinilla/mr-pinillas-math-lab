import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Folder,
  Trash2,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { InteractiveNspireVisualizer } from './InteractiveNspireVisualizer';

export interface CalculatorTutorialSetupProps {
  onBack: () => void;
  onComplete?: () => void;
  initialModule?: 'clear_memory' | 'setup_calculator';
}

type SetupModule = 'clear_memory' | 'setup_calculator';

// Screen states for Module 1 (Clear Memory)
type ClearMemoryScreen =
  | 'home'
  | 'browse'
  | 'browse_menu'
  | 'delete_dialog'
  | 'cleared_success';

// Screen states for Module 2 (Set Up Calculator)
type SetupCalcScreen =
  | 'scratchpad'
  | 'doc_menu'
  | 'doc_settings_submenu'
  | 'doc_settings_dialog'
  | 'settings_success';

export const CalculatorTutorialSetup: React.FC<CalculatorTutorialSetupProps> = ({
  onBack,
  onComplete,
  initialModule = 'clear_memory',
}) => {
  const [activeModule, setActiveModule] = useState<SetupModule>(initialModule);

  // Module Completion States
  const [clearMemoryVerified, setClearMemoryVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mathlab_tutorial_clear_memory_verified') === 'true';
    } catch {
      return false;
    }
  });

  const [setupCalcVerified, setSetupCalcVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mathlab_tutorial_setup_calc_verified') === 'true';
    } catch {
      return false;
    }
  });

  // Active Screen states
  const [clearMemScreen, setClearMemScreen] = useState<ClearMemoryScreen>('home');
  const [homeSelection, setHomeSelection] = useState<number>(2); // Default focused on 2: My Documents / Browse
  const [browseMenuSelection, setBrowseMenuSelection] = useState<string>('c'); // 'c' is Delete All
  const [deleteDialogFocus, setDeleteDialogFocus] = useState<'ok' | 'cancel'>('ok');

  const [setupCalcScreen, setSetupCalcScreen] = useState<SetupCalcScreen>('scratchpad');
  const [docMenuSelection, setDocMenuSelection] = useState<number>(7); // 7: Settings & Status
  const [settingsSubmenuSelection, setSettingsSubmenuSelection] = useState<number>(2); // 2: Document Settings
  const [docSettingsScrollTop, setDocSettingsScrollTop] = useState<number>(0);
  const [selectedDisplayDigits, setSelectedDisplayDigits] = useState<string>('Float 6');
  const [isDisplayDigitsDropdownOpen, setIsDisplayDigitsDropdownOpen] = useState<boolean>(false);
  const [dialogButtonFocus, setDialogButtonFocus] = useState<'ok' | 'cancel' | 'default'>('ok');

  // Active persistent calculator display setting for subsequent work
  const [activeCalculatorDisplayDigits, setActiveCalculatorDisplayDigits] = useState<string>(() => {
    try {
      return localStorage.getItem('mathlab_calculator_display_digits') || 'Float 6';
    } catch {
      return 'Float 6';
    }
  });

  // Feedback State
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const [resetCounter, setResetCounter] = useState<number>(0);

  const resetModuleState = (mod: SetupModule) => {
    setFeedback({ status: 'idle', message: '' });
    setResetCounter((prev) => prev + 1);

    if (mod === 'clear_memory') {
      setClearMemScreen('home');
      setHomeSelection(2);
      setBrowseMenuSelection('c');
      setDeleteDialogFocus('ok');
    } else {
      setSetupCalcScreen('scratchpad');
      setDocMenuSelection(7);
      setSettingsSubmenuSelection(2);
      setSelectedDisplayDigits('Float 6');
      setIsDisplayDigitsDropdownOpen(false);
      setDocSettingsScrollTop(0);
      setDialogButtonFocus('ok');
    }
  };

  // Keyboard routing for calculator
  const handleCalculatorKeyPress = (keyId: string) => {
    const k = keyId.toLowerCase().trim();

    // ==========================================
    // MODULE 1: CLEAR MEMORY KEY ROUTING
    // ==========================================
    if (activeModule === 'clear_memory') {
      // Global Home key
      if (k === 'on' || k === 'home') {
        setClearMemScreen('home');
        setHomeSelection(2);
        return;
      }

      // 1. HOME SCREEN
      if (clearMemScreen === 'home') {
        if (k === '2' || (k === 'enter' && homeSelection === 2)) {
          setClearMemScreen('browse');
          return;
        }
        if (k === '1') setHomeSelection(1);
        if (k === '2') setHomeSelection(2);
        if (k === '3') setHomeSelection(3);
        if (k === '4') setHomeSelection(4);
        if (k === 'up') setHomeSelection((prev) => Math.max(1, prev - 1));
        if (k === 'down') setHomeSelection((prev) => Math.min(4, prev + 1));
        if (k === 'enter') {
          if (homeSelection === 2) {
            setClearMemScreen('browse');
          }
        }
        return;
      }

      // 2. BROWSE SCREEN
      if (clearMemScreen === 'browse') {
        if (k === 'menu' || k === 'doc') {
          setClearMemScreen('browse_menu');
          setBrowseMenuSelection('c');
          return;
        }
        if (k === 'esc') {
          setClearMemScreen('home');
          return;
        }
        return;
      }

      // 3. BROWSE MENU
      if (clearMemScreen === 'browse_menu') {
        if (k === 'esc') {
          setClearMemScreen('browse');
          return;
        }

        // Direct letter/number shortcuts
        if (k === 'c') {
          setClearMemScreen('delete_dialog');
          setDeleteDialogFocus('ok');
          return;
        }

        const menuItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c'];
        if (k === 'down') {
          setBrowseMenuSelection((prev) => {
            const idx = menuItems.indexOf(prev);
            return menuItems[Math.min(menuItems.length - 1, idx + 1)];
          });
          return;
        }
        if (k === 'up') {
          setBrowseMenuSelection((prev) => {
            const idx = menuItems.indexOf(prev);
            return menuItems[Math.max(0, idx - 1)];
          });
          return;
        }
        if (k === 'enter') {
          if (browseMenuSelection === 'c') {
            setClearMemScreen('delete_dialog');
            setDeleteDialogFocus('ok');
          }
          return;
        }
        return;
      }

      // 4. CONFIRMATION DIALOG (Delete All)
      if (clearMemScreen === 'delete_dialog') {
        if (k === 'esc') {
          setClearMemScreen('browse');
          setFeedback({
            status: 'incorrect',
            message: 'Deletion was canceled. Press [menu] → C: Delete All → select [OK] and press [enter] to complete the Clear Memory procedure.',
          });
          return;
        }

        if (k === 'left' || k === 'right' || k === 'tab') {
          setDeleteDialogFocus((prev) => (prev === 'ok' ? 'cancel' : 'ok'));
          return;
        }

        if (k === 'enter') {
          if (deleteDialogFocus === 'ok') {
            setClearMemScreen('cleared_success');
            setClearMemoryVerified(true);
            try {
              localStorage.setItem('mathlab_tutorial_clear_memory_verified', 'true');
            } catch {
              // ignore
            }
            setFeedback({
              status: 'correct',
              message:
                'Correct Response ✓\nMemory successfully cleared! The copy/paste clipboard, Scratchpad, and simulated documents have been reset to factory defaults. Module 1: Clear Memory is Verified!',
            });
            if (setupCalcVerified) {
              onComplete?.();
            }
          } else {
            setClearMemScreen('browse');
            setFeedback({
              status: 'incorrect',
              message: 'You selected Cancel. To complete Clear Memory, navigate to [OK] and press [enter].',
            });
          }
          return;
        }
        return;
      }

      // 5. SUCCESS SCREEN
      if (clearMemScreen === 'cleared_success') {
        if (k === 'on' || k === 'home') {
          setClearMemScreen('home');
        }
        return;
      }
    }

    // ==========================================
    // MODULE 2: SET UP CALCULATOR KEY ROUTING
    // ==========================================
    if (activeModule === 'setup_calculator') {
      // Global Home key returns to scratchpad in this module
      if (k === 'on' || k === 'home') {
        setSetupCalcScreen('scratchpad');
        return;
      }

      // 1. SCRATCHPAD SCREEN
      if (setupCalcScreen === 'scratchpad') {
        if (k === 'doc') {
          setSetupCalcScreen('doc_menu');
          setDocMenuSelection(7);
          return;
        }
        return;
      }

      // 2. DOC MENU SCREEN
      if (setupCalcScreen === 'doc_menu') {
        if (k === 'esc') {
          setSetupCalcScreen('scratchpad');
          return;
        }
        if (k === '7' || (k === 'enter' && docMenuSelection === 7)) {
          setSetupCalcScreen('doc_settings_submenu');
          setSettingsSubmenuSelection(2);
          return;
        }
        if (k === 'up') setDocMenuSelection((prev) => Math.max(1, prev - 1));
        if (k === 'down') setDocMenuSelection((prev) => Math.min(8, prev + 1));
        if (k === 'enter' && docMenuSelection === 7) {
          setSetupCalcScreen('doc_settings_submenu');
          setSettingsSubmenuSelection(2);
          return;
        }
        return;
      }

      // 3. SETTINGS & STATUS SUBMENU
      if (setupCalcScreen === 'doc_settings_submenu') {
        if (k === 'esc') {
          setSetupCalcScreen('doc_menu');
          return;
        }
        if (k === '2' || (k === 'enter' && settingsSubmenuSelection === 2)) {
          setSetupCalcScreen('doc_settings_dialog');
          setDocSettingsScrollTop(0);
          setDialogButtonFocus('ok');
          return;
        }
        if (k === 'up') setSettingsSubmenuSelection((prev) => Math.max(1, prev - 1));
        if (k === 'down') setSettingsSubmenuSelection((prev) => Math.min(6, prev + 1));
        if (k === 'enter' && settingsSubmenuSelection === 2) {
          setSetupCalcScreen('doc_settings_dialog');
          setDocSettingsScrollTop(0);
          setDialogButtonFocus('ok');
          return;
        }
        return;
      }

      // 4. DOCUMENT SETTINGS DIALOG
      if (setupCalcScreen === 'doc_settings_dialog') {
        if (k === 'esc') {
          if (isDisplayDigitsDropdownOpen) {
            setIsDisplayDigitsDropdownOpen(false);
          } else {
            setSetupCalcScreen('scratchpad');
          }
          return;
        }

        // If dropdown is open
        if (isDisplayDigitsDropdownOpen) {
          if (k === '8') {
            setSelectedDisplayDigits('Float 8');
            setIsDisplayDigitsDropdownOpen(false);
            return;
          }
          if (k === 'enter') {
            setSelectedDisplayDigits('Float 8');
            setIsDisplayDigitsDropdownOpen(false);
            return;
          }
          if (k === 'up' || k === 'down') {
            setSelectedDisplayDigits('Float 8');
            return;
          }
          return;
        }

        // Scrolling through Document Settings
        if (k === 'down') {
          setDocSettingsScrollTop((prev) => Math.min(180, prev + 45));
          return;
        }
        if (k === 'up') {
          setDocSettingsScrollTop((prev) => Math.max(0, prev - 45));
          return;
        }

        if (k === 'tab') {
          setDocSettingsScrollTop((prev) => (prev > 90 ? 0 : 180));
          return;
        }

        if (k === 'left' || k === 'right') {
          setDialogButtonFocus((prev) =>
            prev === 'ok' ? 'cancel' : prev === 'cancel' ? 'default' : 'ok'
          );
          return;
        }

        if (k === 'enter') {
          // If scrolled down and on OK button
          if (dialogButtonFocus === 'ok') {
            if (selectedDisplayDigits === 'Float 8') {
              setActiveCalculatorDisplayDigits('Float 8');
              setSetupCalcVerified(true);
              setSetupCalcScreen('settings_success');
              try {
                localStorage.setItem('mathlab_tutorial_setup_calc_verified', 'true');
                localStorage.setItem('mathlab_calculator_display_digits', 'Float 8');
              } catch {
                // ignore
              }
              setFeedback({
                status: 'correct',
                message:
                  'Correct Response ✓\nDocument Settings configured to Display Digits: Float 8! The calculator will maintain 8-digit precision for all classroom calculations. Module 2: Set Up Calculator is Verified!',
              });
              if (clearMemoryVerified) {
                onComplete?.();
              }
            } else {
              setFeedback({
                status: 'incorrect',
                message:
                  'Please select "Float 8" for Display Digits before confirming [OK].',
              });
            }
          }
          return;
        }
      }

      // 5. SUCCESS SCREEN
      if (setupCalcScreen === 'settings_success') {
        if (k === 'on' || k === 'home' || k === 'enter' || k === 'esc') {
          setSetupCalcScreen('scratchpad');
        }
        return;
      }
    }
  };

  // ==========================================
  // LCD RENDERING
  // ==========================================
  const renderLcdContent = () => {
    // ------------------------------------------
    // MODULE 1: CLEAR MEMORY LCD
    // ------------------------------------------
    if (activeModule === 'clear_memory') {
      // 1. HOME SCREEN
      if (clearMemScreen === 'home') {
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
                    { id: 2, label: '2: My Documents (Browse)' },
                    { id: 3, label: '3: Recent' },
                    { id: 4, label: '4: Current' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setHomeSelection(item.id);
                        if (item.id === 2) {
                          setClearMemScreen('browse');
                        }
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

      // 2. BROWSE SCREEN
      if (clearMemScreen === 'browse') {
        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
            <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1.5">
              <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                <Folder className="w-3.5 h-3.5 text-amber-400" />
                <span>My Documents</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">128.4 MB Free</span>
            </div>

            <div className="flex-1 bg-[#0f1f38] border border-sky-900/70 rounded-lg p-2 overflow-y-auto space-y-1 text-xs font-mono">
              <div className="text-[10px] text-slate-400 pb-1 border-b border-sky-900/40 flex justify-between">
                <span>Name</span>
                <span>Size</span>
              </div>
              {[
                { name: '📁 Examples', size: '1.2 MB' },
                { name: '📁 MathLab_HW', size: '420 KB' },
                { name: '📁 MyLib', size: '180 KB' },
                { name: '📁 Practice_Linear', size: '250 KB' },
                { name: '📄 Document1.tns', size: '45 KB' },
              ].map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-0.5 px-1 rounded text-[10px] text-slate-200 hover:bg-sky-800/40"
                >
                  <span>{file.name}</span>
                  <span className="text-slate-400 text-[9px]">{file.size}</span>
                </div>
              ))}
            </div>

            <div className="mt-1.5 pt-1 border-t border-sky-800/60 flex items-center justify-between text-[9px] text-sky-300 font-mono">
              <span>Press [menu] for options</span>
              <button
                type="button"
                onClick={() => setClearMemScreen('browse_menu')}
                className="px-2 py-0.5 rounded bg-sky-900 hover:bg-sky-800 text-sky-200 border border-sky-700 cursor-pointer font-bold"
              >
                [menu]
              </button>
            </div>
          </div>
        );
      }

      // 3. BROWSE MENU
      if (clearMemScreen === 'browse_menu') {
        const menuItems = [
          { id: '1', label: '1 New Folder' },
          { id: '2', label: '2 Rename' },
          { id: '3', label: '3 Save As...' },
          { id: '4', label: '4 Expand' },
          { id: '5', label: '5 Close' },
          { id: '6', label: '6 Send' },
          { id: '7', label: '7 Expand All' },
          { id: '8', label: '8 Collapse All' },
          { id: '9', label: '9 Settings & Status' },
          { id: 'a', label: 'A Send OS' },
          { id: 'b', label: 'B Refresh Libraries' },
          { id: 'c', label: 'C Delete All' },
        ];

        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
            <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1">
              <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                <Folder className="w-3.5 h-3.5 text-amber-400" />
                <span>My Documents • Menu</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">12 Options</span>
            </div>

            <div className="flex-1 bg-[#10223f] border-2 border-sky-500 rounded-lg p-1 overflow-y-auto space-y-0.5 text-xs font-sans shadow-xl">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setBrowseMenuSelection(item.id);
                    if (item.id === 'c') {
                      setClearMemScreen('delete_dialog');
                      setDeleteDialogFocus('ok');
                    }
                  }}
                  className={`px-2 py-0.5 rounded cursor-pointer text-[10px] flex items-center justify-between ${
                    browseMenuSelection === item.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : item.id === 'c'
                      ? 'text-rose-300 hover:bg-sky-800/60 font-bold'
                      : 'text-slate-200 hover:bg-sky-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'c' && <Trash2 className="w-3 h-3 text-rose-500 shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 4. DELETE ALL CONFIRMATION DIALOG
      if (clearMemScreen === 'delete_dialog') {
        return (
          <div className="w-full h-full bg-[#0a192f]/90 text-slate-100 flex items-center justify-center font-sans p-2">
            <div className="bg-[#1b2a47] border-2 border-rose-500 rounded-xl p-3 shadow-2xl max-w-[250px] text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-rose-300 border-b border-rose-900/60 pb-1">
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-black uppercase tracking-wider">Delete All</span>
              </div>

              <p className="text-[9.5px] text-slate-200 leading-snug font-medium text-left">
                This action will clear the copy/paste clipboard, clear Scratchpad, and delete all
                files and folders on this device. Do you wish to proceed?
              </p>

              <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteDialogFocus('ok');
                    handleCalculatorKeyPress('enter');
                  }}
                  className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all border ${
                    deleteDialogFocus === 'ok'
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md ring-2 ring-rose-400/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteDialogFocus('cancel');
                    setClearMemScreen('browse');
                  }}
                  className={`px-3 py-1 rounded text-[10px] font-black cursor-pointer transition-all border ${
                    deleteDialogFocus === 'cancel'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 5. SUCCESS SCREEN
      if (clearMemScreen === 'cleared_success') {
        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col items-center justify-center font-sans p-3 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wide">
              TI-Nspire Memory Cleared
            </span>
            <p className="text-[10px] text-slate-300 font-mono leading-tight max-w-[210px]">
              Scratchpad reset to factory state. 143.2 MB Available. Handheld ready for clean work.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setClearMemScreen('home')}
                className="px-3 py-1 rounded bg-sky-900 hover:bg-sky-800 text-sky-200 text-[10px] font-bold border border-sky-700 cursor-pointer"
              >
                Return to [home]
              </button>
            </div>
          </div>
        );
      }
    }

    // ------------------------------------------
    // MODULE 2: SET UP CALCULATOR LCD
    // ------------------------------------------
    if (activeModule === 'setup_calculator') {
      // 1. SCRATCHPAD SCREEN
      if (setupCalcScreen === 'scratchpad') {
        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2">
            <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-2">
              <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
                <span>★ Scratchpad</span>
                <span>• Calculate</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">
                {activeCalculatorDisplayDigits} • RAD
              </span>
            </div>

            <div className="flex-1 bg-[#071322] border border-sky-900/60 rounded-lg p-2 flex flex-col justify-between font-mono text-xs">
              <div className="space-y-1 text-slate-300">
                <div className="text-[10px] text-slate-400 italic">
                  Press [doc] at the upper right to open Documents menu
                </div>
                <div className="pt-2 text-slate-200">
                  <span>Current Display Digits: </span>
                  <span className="text-amber-300 font-bold">{activeCalculatorDisplayDigits}</span>
                </div>
              </div>

              <div className="border-t border-sky-900/60 pt-1 flex items-center justify-between text-[9px] text-sky-300">
                <span>Press [doc] for Settings</span>
                <button
                  type="button"
                  onClick={() => {
                    setSetupCalcScreen('doc_menu');
                    setDocMenuSelection(7);
                  }}
                  className="px-2 py-0.5 rounded bg-sky-900 hover:bg-sky-800 text-sky-200 border border-sky-700 cursor-pointer font-bold"
                >
                  [doc]
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 2. DOC MENU SCREEN
      if (setupCalcScreen === 'doc_menu') {
        const docMenuItems = [
          { id: 1, label: '1 File' },
          { id: 2, label: '2 Edit' },
          { id: 3, label: '3 View' },
          { id: 4, label: '4 Insert' },
          { id: 5, label: '5 Page Layout' },
          { id: 6, label: '6 Refresh Libraries' },
          { id: 7, label: '7 Settings & Status' },
          { id: 8, label: '8 Login...' },
        ];

        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
            <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1">
              <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-sky-400" />
                <span>Documents Menu</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Scratchpad</span>
            </div>

            <div className="flex-1 bg-[#10223f] border-2 border-sky-500 rounded-lg p-1 overflow-y-auto space-y-0.5 text-xs font-sans shadow-xl">
              {docMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setDocMenuSelection(item.id);
                    if (item.id === 7) {
                      setSetupCalcScreen('doc_settings_submenu');
                      setSettingsSubmenuSelection(2);
                    }
                  }}
                  className={`px-2 py-0.5 rounded cursor-pointer text-[10px] flex items-center justify-between ${
                    docMenuSelection === item.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : item.id === 7
                      ? 'text-sky-300 hover:bg-sky-800/60 font-bold'
                      : 'text-slate-200 hover:bg-sky-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 7 && <span className="text-[9px] font-black">▶</span>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 3. SETTINGS & STATUS SUBMENU
      if (setupCalcScreen === 'doc_settings_submenu') {
        const subMenuItems = [
          { id: 1, label: '1 Change Language...' },
          { id: 2, label: '2 Document Settings...' },
          { id: 3, label: '3 Handheld Setup...' },
          { id: 4, label: '4 Status...' },
          { id: 5, label: '5 Login...' },
          { id: 6, label: '6 Restore Factory Defaults...' },
        ];

        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col font-sans p-2 relative">
            <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1">
              <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-sky-400" />
                <span>7: Settings & Status</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono">Doc Settings</span>
            </div>

            <div className="flex-1 bg-[#10223f] border-2 border-sky-500 rounded-lg p-1 overflow-y-auto space-y-0.5 text-xs font-sans shadow-xl">
              {subMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSettingsSubmenuSelection(item.id);
                    if (item.id === 2) {
                      setSetupCalcScreen('doc_settings_dialog');
                      setDocSettingsScrollTop(0);
                      setDialogButtonFocus('ok');
                    }
                  }}
                  className={`px-2 py-0.5 rounded cursor-pointer text-[10px] flex items-center justify-between ${
                    settingsSubmenuSelection === item.id
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : item.id === 2
                      ? 'text-sky-300 hover:bg-sky-800/60 font-bold'
                      : 'text-slate-200 hover:bg-sky-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 2 && <span className="text-[9px] font-black">▶</span>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 4. DOCUMENT SETTINGS DIALOG
      if (setupCalcScreen === 'doc_settings_dialog') {
        const floatOptions = [
          'Float',
          'Float 1',
          'Float 2',
          'Float 3',
          'Float 4',
          'Float 5',
          'Float 6',
          'Float 7',
          'Float 8',
          'Float 9',
          'Float 10',
          'Float 11',
          'Float 12',
          'Fix 0',
          'Fix 1',
          'Fix 2',
        ];

        return (
          <div className="w-full h-full bg-[#0a192f]/95 text-slate-100 flex items-center justify-center font-sans p-2">
            <div className="bg-[#182744] border-2 border-sky-400 rounded-xl p-2.5 shadow-2xl w-[260px] max-h-[195px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-sky-800 pb-1 mb-1">
                <span className="text-[11px] font-black text-sky-200">Document Settings</span>
                <span className="text-[8px] text-slate-400 font-mono">Use [▼] to scroll</span>
              </div>

              {/* Scrollable Settings Form */}
              <div
                className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-[9.5px] font-mono"
                style={{ maxHeight: '110px' }}
              >
                {/* 1. Display Digits (Target Control) */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60">
                  <span className="text-slate-300 font-bold">Display Digits:</span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDisplayDigitsDropdownOpen((prev) => !prev)}
                      className={`px-2 py-0.5 rounded text-[9.5px] font-black flex items-center gap-1 cursor-pointer border ${
                        selectedDisplayDigits === 'Float 8'
                          ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                          : 'bg-amber-400 text-slate-950 border-amber-300'
                      }`}
                    >
                      <span>{selectedDisplayDigits}</span>
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>

                    {/* Dropdown Options */}
                    {isDisplayDigitsDropdownOpen && (
                      <div className="absolute top-6 right-0 z-30 bg-[#0f213d] border-2 border-sky-400 rounded shadow-2xl max-h-24 overflow-y-auto w-24 space-y-0.5 p-0.5">
                        {floatOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setSelectedDisplayDigits(opt);
                              setIsDisplayDigitsDropdownOpen(false);
                            }}
                            className={`px-1.5 py-0.5 rounded text-[8.5px] cursor-pointer ${
                              opt === 'Float 8'
                                ? 'bg-amber-400 text-slate-950 font-black'
                                : opt === selectedDisplayDigits
                                ? 'bg-sky-800 text-white font-bold'
                                : 'text-slate-200 hover:bg-sky-900'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Angle */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Angle:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Degree
                  </span>
                </div>

                {/* 3. Exponential Format */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Exponential Format:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Normal
                  </span>
                </div>

                {/* 4. Real or Complex */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Real or Complex:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Real
                  </span>
                </div>

                {/* 5. Calculation Mode */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Calculation Mode:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Auto
                  </span>
                </div>

                {/* 6. Vector Format */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Vector Format:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Rectangular
                  </span>
                </div>

                {/* 7. Base */}
                <div className="flex items-center justify-between gap-1 p-1 rounded bg-[#0d1b30] border border-sky-900/60 text-slate-400">
                  <span>Base:</span>
                  <span className="text-slate-200 font-bold bg-slate-800 px-1.5 py-0.2 rounded">
                    Decimal
                  </span>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-1.5 mt-1 border-t border-sky-800/80 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setDialogButtonFocus('ok');
                    handleCalculatorKeyPress('enter');
                  }}
                  className={`px-2.5 py-0.5 rounded text-[9.5px] font-black cursor-pointer transition-all border ${
                    dialogButtonFocus === 'ok'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-1 ring-amber-300'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => setSetupCalcScreen('scratchpad')}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-[9.5px] font-bold border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[9.5px] font-medium border border-slate-700"
                >
                  Make Default
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 5. SUCCESS SCREEN
      if (setupCalcScreen === 'settings_success') {
        return (
          <div className="w-full h-full bg-[#0a192f] text-slate-100 flex flex-col items-center justify-center font-sans p-3 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wide">
              Display Digits = Float 8
            </span>
            <p className="text-[10px] text-slate-300 font-mono leading-tight max-w-[210px]">
              Document Settings configured. 8-digit floating precision active on calculator.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setSetupCalcScreen('scratchpad')}
                className="px-3 py-1 rounded bg-sky-900 hover:bg-sky-800 text-sky-200 text-[10px] font-bold border border-sky-700 cursor-pointer"
              >
                Return to Scratchpad
              </button>
            </div>
          </div>
        );
      }
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
            Setup Progress:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800">
            {clearMemoryVerified && setupCalcVerified
              ? 'Module Complete (2/2 Modules Verified)'
              : clearMemoryVerified || setupCalcVerified
              ? '1 of 2 Modules Complete'
              : '0 of 2 Modules Complete'}
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
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <Settings className="w-3 h-3 text-blue-600" />
                  <span>CALCULATOR SETUP</span>
                </span>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                  {activeModule === 'clear_memory'
                    ? 'Module 1 • Clear Memory'
                    : 'Module 2 • Set Up Calculator (Float 8)'}
                </span>
              </div>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                {activeModule === 'clear_memory' ? 'MODULE 1 OF 2' : 'MODULE 2 OF 2'}
              </span>
            </div>

            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {activeModule === 'clear_memory' ? 'Clear Memory' : 'Set Up Calculator'}
            </h1>

            {/* Continuous 2-Part Section Selector */}
            <div className="pt-1.5 border-t border-slate-100 grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveModule('clear_memory');
                  resetModuleState('clear_memory');
                }}
                className={`py-1 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                  activeModule === 'clear_memory'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : clearMemoryVerified
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span>1. Clear Memory</span>
                {clearMemoryVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModule('setup_calculator');
                  resetModuleState('setup_calculator');
                }}
                className={`py-1 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                  activeModule === 'setup_calculator'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                    : setupCalcVerified
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <span>2. Set Up Calculator</span>
                {setupCalcVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Active Section Task Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-3 sm:p-3.5 border border-blue-500/30 shadow-lg space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeModule === 'clear_memory'
                    ? 'Module 1 — Reset Handheld Memory'
                    : 'Module 2 — Configure Float 8 Precision'}
                </span>
              </span>

              {(activeModule === 'clear_memory' ? clearMemoryVerified : setupCalcVerified) && (
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              )}
            </div>

            <div className="bg-black/40 rounded-xl p-2.5 sm:p-3 border border-white/10 text-center space-y-0.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                Target Operation
              </span>
              <div className="text-base sm:text-lg font-mono font-black text-amber-300 tracking-wide">
                {activeModule === 'clear_memory'
                  ? 'Browse → Menu → C: Delete All → OK'
                  : 'Scratchpad → [doc] → Settings → Float 8 → OK'}
              </div>
            </div>

            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-1">
              <span className="text-sky-300 font-bold block mb-0.5">Student Workflow Instructions:</span>
              {activeModule === 'clear_memory' ? (
                <p className="leading-snug space-y-1">
                  1. Press <strong>[home]</strong> → select <strong>2: My Documents (Browse)</strong>.<br />
                  2. From the Browse screen, press <strong>[menu]</strong>.<br />
                  3. Select <strong>C Delete All</strong> (press <strong>[C]</strong> or navigate with arrows).<br />
                  4. On the confirmation dialog ("This action will clear..."), select <strong>[OK]</strong> and press <strong>[enter]</strong>.
                </p>
              ) : (
                <p className="leading-snug space-y-1">
                  1. From Scratchpad, press <strong>[doc]</strong>.<br />
                  2. Select <strong>7 Settings & Status</strong>.<br />
                  3. Select <strong>2 Document Settings...</strong>.<br />
                  4. Click or press [enter] on <strong>Display Digits</strong> and select <strong>Float 8</strong>.<br />
                  5. Navigate/scroll DOWN to the bottom controls, select <strong>[OK]</strong>, and press <strong>[enter]</strong>.
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

                {activeModule === 'clear_memory' && !setupCalcVerified && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('setup_calculator');
                      resetModuleState('setup_calculator');
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Module 2: Set Up Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {clearMemoryVerified && setupCalcVerified && (
                  <div className="pt-1 text-center font-bold text-xs text-emerald-300">
                    ★ Both Authentic Calculator Setup Workflows Verified!
                  </div>
                )}
              </div>
            )}

            {/* Reset / Try Again */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => resetModuleState(activeModule)}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-bold"
                title="Reset this module"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset {activeModule === 'clear_memory' ? 'Clear Memory' : 'Set Up Calculator'}</span>
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
              <span>Core Classroom Hardware Standard</span>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium">
              {activeModule === 'clear_memory'
                ? 'Clearing memory wipes rogue variables, leftover graphs, and lingering equations from previous periods so every student begins tests and assignments from a clean slate.'
                : 'Configuring Display Digits to Float 8 prevents premature rounding errors during multi-step math problems while keeping answers readable on the LCD.'}
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
                  <Trash2 className="w-3 h-3 text-rose-600" />
                  <span>Clear Memory</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  [home] → 2: Browse → [menu] → C: Delete All → [OK] → [enter]
                </p>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-0.5">
                <span className="font-bold text-slate-900 block flex items-center gap-1 text-[11px]">
                  <Settings className="w-3 h-3 text-blue-600" />
                  <span>Set Up (Float 8)</span>
                </span>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Scratchpad → [doc] → 7: Settings → 2: Doc Settings → Float 8 → [OK]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic TI-Nspire CX Visualizer (Independent Vertical Scroll) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:max-h-[calc(100vh-75px)] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 lg:overscroll-contain">
          <div className="w-full max-w-[480px] pb-6">
            <InteractiveNspireVisualizer
              key={`nspire-setup-${activeModule}-${resetCounter}`}
              resetSignal={resetCounter}
              onKeyPress={handleCalculatorKeyPress}
              interactive={true}
              screenLine1={
                activeModule === 'clear_memory'
                  ? clearMemScreen === 'home'
                    ? 'Home'
                    : 'My Documents'
                  : 'Scratchpad • Calculate'
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
