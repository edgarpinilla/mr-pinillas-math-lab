import React, { useState, useEffect, useRef } from 'react';
import { Lock, X } from 'lucide-react';

interface TeacherPinModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const TEACHER_PIN = '43527';
export const TEACHER_SESSION_KEY = 'math_lab_teacher_unlocked';

export const TeacherPinModal: React.FC<TeacherPinModalProps> = ({
  isOpen,
  onSuccess,
  onClose,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      // Auto-focus input on open
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === TEACHER_PIN) {
      try {
        sessionStorage.setItem(TEACHER_SESSION_KEY, 'true');
      } catch {
        // Safe fallback if sessionStorage is unavailable
      }
      setError(null);
      setPin('');
      onSuccess();
    } else {
      setError('Incorrect PIN');
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Numeric only, maximum 5 digits
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPin(cleaned);
    if (error) setError(null);
  };

  return (
    <div
      id="teacher-pin-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="teacher-pin-modal"
        className="relative w-full max-w-sm bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-center space-y-5"
      >
        {/* Close Button */}
        <button
          id="teacher-pin-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon & Title */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-2 border border-blue-100">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
            <span>Teacher Access</span>
            <span role="img" aria-label="lock">🔒</span>
          </h2>
          <p className="text-sm font-semibold text-slate-600">
            Enter 5-digit Teacher PIN
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              ref={inputRef}
              id="teacher-pin-input"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              value={pin}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="•••••"
              autoComplete="off"
              className="w-full text-center tracking-[0.4em] text-2xl font-black py-3 px-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-300 placeholder:tracking-widest bg-slate-50/50 focus:bg-white text-slate-900"
            />

            {error && (
              <p
                id="teacher-pin-error-msg"
                className="text-xs font-bold text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              id="teacher-pin-cancel-btn"
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="teacher-pin-unlock-btn"
              type="submit"
              disabled={pin.length === 0}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
