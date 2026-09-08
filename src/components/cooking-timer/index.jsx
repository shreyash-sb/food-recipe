import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Bell, Plus, Minus } from 'lucide-react';

export default function CookingTimer({ defaultMinutes = 15 }) {
  const [initialMinutes, setInitialMinutes] = useState(defaultMinutes);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);

  // Sync if defaultMinutes changes
  useEffect(() => {
    setInitialMinutes(defaultMinutes || 15);
    setTimeLeft((defaultMinutes || 15) * 60);
    setIsRunning(false);
    setIsFinished(false);
  }, [defaultMinutes]);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      // Multi-tone melodic chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0.3, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.4);
      });
    } catch (e) {
      console.log('Audio playback error', e);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsFinished(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialMinutes * 60);
      setIsFinished(false);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(initialMinutes * 60);
  };

  const adjustMinutes = (amount) => {
    const newMinutes = Math.max(1, initialMinutes + amount);
    setInitialMinutes(newMinutes);
    if (!isRunning) {
      setTimeLeft(newMinutes * 60);
      setIsFinished(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = initialMinutes > 0 ? ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100 : 0;

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 ${
      isFinished
        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 animate-pulse'
        : 'bg-white/80 dark:bg-dark-card/90 border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white text-base">Cooking Timer</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Keep track of your cooking time</p>
          </div>
        </div>

        {isFinished && (
          <span className="px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 animate-bounce">
            <Bell className="w-3.5 h-3.5" /> Time's Up!
          </span>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center my-4 py-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        <div className="text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-900 dark:text-white font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3 px-2">
          <div
            className="bg-gradient-to-r from-brand-500 to-amber-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Preset adjustments & Controls */}
      <div className="flex items-center justify-between gap-3 mt-4">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => adjustMinutes(-1)}
            disabled={isRunning || initialMinutes <= 1}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title="-1 Minute"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-semibold px-1 text-slate-700 dark:text-slate-300">{initialMinutes}m</span>
          <button
            onClick={() => adjustMinutes(1)}
            disabled={isRunning}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title="+1 Minute"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 text-white ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                : 'bg-brand-500 hover:bg-brand-600 shadow-brand-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" /> Start
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
