'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

/* ── Game data ── */
const FOODS = [
  { id: 'chicken', emoji: '🍗', label: 'Chicken', protein: 30, carbs: 0, fats: 5, cal: 165 },
  { id: 'rice', emoji: '🍚', label: 'Rice', protein: 3, carbs: 45, fats: 0, cal: 200 },
  { id: 'salad', emoji: '🥗', label: 'Salad', protein: 2, carbs: 8, fats: 5, cal: 80 },
  { id: 'egg', emoji: '🥚', label: 'Egg', protein: 13, carbs: 1, fats: 10, cal: 155 },
  { id: 'avocado', emoji: '🥑', label: 'Avocado', protein: 2, carbs: 9, fats: 15, cal: 160 },
  { id: 'banana', emoji: '🍌', label: 'Banana', protein: 1, carbs: 27, fats: 0, cal: 105 },
  { id: 'salmon', emoji: '🐟', label: 'Salmon', protein: 25, carbs: 0, fats: 12, cal: 208 },
  { id: 'bread', emoji: '🍞', label: 'Bread', protein: 4, carbs: 20, fats: 1, cal: 80 },
] as const;

const TARGETS = { protein: 40, carbs: 50, fats: 25 };
const ROUND_SECONDS = 25;

/* ── Macro colors ── */
const MACRO_COLORS = {
  protein: { main: '#B7F46B', glow: 'rgba(183,244,107,0.4)' },
  carbs: { main: '#82AFFF', glow: 'rgba(130,175,255,0.4)' },
  fats: { main: '#FF9600', glow: 'rgba(255,150,0,0.4)' },
};

/* ── Seeded random for plate positions ── */
function seededPosition(index: number): { x: number; y: number } {
  const angle = (index * 137.508) * (Math.PI / 180); // golden angle
  const r = 25 + (index % 3) * 15;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r * 0.5, // flatten for perspective
  };
}

/* ── Compact Ring for inline display ── */
function CompactRing({ label, current, target, color, glowColor }: {
  label: string; current: number; target: number; color: string; glowColor: string;
}) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(current / target, 1);
  const overshoot = current > target * 1.3;
  const nearTarget = pct >= 0.8 && pct <= 1.05;
  const size = r * 2 + 8;

  return (
    <motion.div
      className="flex flex-col items-center gap-0.5"
      animate={
        overshoot
          ? { x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4, repeat: 2 } }
          : nearTarget
            ? { scale: [1, 1.04, 1], transition: { duration: 1.2, repeat: Infinity } }
            : {}
      }
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size}>
          <circle cx={r + 4} cy={r + 4} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <motion.circle
            cx={r + 4} cy={r + 4} r={r}
            fill="none"
            stroke={overshoot ? '#F67070' : color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - pct) }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-[9px] font-bold"
            style={{ color: overshoot ? '#F67070' : color }}
            key={Math.round(pct * 100)}
            initial={{ scale: 1.3, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(pct * 100)}%
          </motion.span>
        </div>
      </div>
      <span className="text-[9px] font-semibold text-white/40">{label}</span>
    </motion.div>
  );
}

/* ── Enhanced Macro Ring ── */
function MacroRing({ label, current, target, color, glowColor }: {
  label: string; current: number; target: number; color: string; glowColor: string;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(current / target, 1);
  const overshoot = current > target * 1.3;
  const nearTarget = pct >= 0.8 && pct <= 1.05;
  const complete = pct >= 0.95 && pct <= 1.1;

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        className="relative"
        style={{ width: radius * 2 + 16, height: radius * 2 + 16 }}
        animate={
          overshoot
            ? { x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4, repeat: 2 } }
            : nearTarget
              ? { scale: [1, 1.04, 1], transition: { duration: 1.2, repeat: Infinity } }
              : {}
        }
      >
        {/* Glow behind ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: pct > 0.5
              ? `0 0 ${20 + pct * 20}px ${glowColor}`
              : '0 0 0px transparent',
          }}
          transition={{ duration: 0.5 }}
        />

        <svg className="-rotate-90" width={radius * 2 + 16} height={radius * 2 + 16}>
          {/* Track */}
          <circle
            cx={radius + 8} cy={radius + 8} r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"
          />
          {/* Fill */}
          <motion.circle
            cx={radius + 8} cy={radius + 8} r={radius}
            fill="none"
            stroke={overshoot ? '#F67070' : color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-sm font-bold text-white"
            key={Math.round(pct * 100)}
            initial={{ scale: 1.3, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(pct * 100)}%
          </motion.span>
        </div>

        {/* Sparkles on complete */}
        <AnimatePresence>
          {complete && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4, height: 4,
                    background: color,
                    left: '50%', top: '50%',
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 6) * Math.PI * 2) * 35,
                    y: Math.sin((i / 6) * Math.PI * 2) * 35,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5, delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <span className="text-[10px] font-semibold text-white/50">{label}</span>
    </div>
  );
}

/* ── Food Card ── */
function FoodCard({ food, onAdd }: { food: typeof FOODS[number]; onAdd: () => void }) {
  const maxMacro = Math.max(food.protein, food.carbs, food.fats);

  return (
    <motion.button
      onClick={onAdd}
      whileHover={{ y: -4, boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
      whileTap={{ scale: 0.93 }}
      className="group flex flex-col items-center gap-0.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5 transition-colors hover:border-[#B7F46B]/20 hover:bg-[#B7F46B]/5 md:gap-1.5 md:p-3"
    >
      <span className="text-xl md:text-2xl">{food.emoji}</span>
      <span className="text-[9px] font-medium text-white/40 group-hover:text-white/60 md:text-[10px]">
        {food.label}
      </span>
      {/* Mini macro bars */}
      <div className="flex w-full gap-0.5">
        <div
          className="h-1 rounded-full"
          style={{
            width: `${(food.protein / maxMacro) * 100}%`,
            backgroundColor: MACRO_COLORS.protein.main,
            opacity: 0.6,
          }}
        />
        <div
          className="h-1 rounded-full"
          style={{
            width: `${(food.carbs / maxMacro) * 100}%`,
            backgroundColor: MACRO_COLORS.carbs.main,
            opacity: 0.6,
          }}
        />
        <div
          className="h-1 rounded-full"
          style={{
            width: `${(food.fats / maxMacro) * 100}%`,
            backgroundColor: MACRO_COLORS.fats.main,
            opacity: 0.6,
          }}
        />
      </div>
      <span className="hidden">{food.cal} cal</span>
    </motion.button>
  );
}

/* ── Confetti effect ── */
function Confetti() {
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 200 + 50),
      rotate: Math.random() * 720 - 360,
      color: ['#B7F46B', '#82AFFF', '#FF9600', '#F67070', '#fff'][i % 5],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.3,
    })),
  []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: [1, 1.2, 0.5],
          }}
          transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ── Timer Progress Bar ── */
function TimerBar({ timer, total }: { timer: number; total: number }) {
  const pct = timer / total;
  const isUrgent = timer <= 5;

  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ backgroundColor: isUrgent ? '#F67070' : '#B7F46B' }}
        animate={{ width: `${pct * 100}%` }}
        transition={{ duration: 0.3 }}
      />
      {isUrgent && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ backgroundColor: 'rgba(246,112,112,0.3)' }}
        />
      )}
    </div>
  );
}

/* ── Main Section ── */
export default function PlateBalanceSection() {
  const [plate, setPlate] = useState<typeof FOODS[number][]>([]);
  const [phase, setPhase] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [timer, setTimer] = useState(ROUND_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive plate dimensions (computed once on client mount — component is ssr:false)
  const plateSize = typeof window !== 'undefined' && window.innerWidth < 1280 ? 140 : 160;
  const surfaceSize = Math.round(plateSize * 220 / 260);
  const rimSize = Math.round(plateSize * 200 / 260);
  const shadowSize = Math.round(plateSize * 240 / 260);

  const totals = plate.reduce(
    (acc, f) => ({
      protein: acc.protein + f.protein,
      carbs: acc.carbs + f.carbs,
      fats: acc.fats + f.fats,
      cal: acc.cal + f.cal,
    }),
    { protein: 0, carbs: 0, fats: 0, cal: 0 }
  );

  const score = (() => {
    if (plate.length === 0) return 0;
    const dP = Math.abs(totals.protein - TARGETS.protein) / TARGETS.protein;
    const dC = Math.abs(totals.carbs - TARGETS.carbs) / TARGETS.carbs;
    const dF = Math.abs(totals.fats - TARGETS.fats) / TARGETS.fats;
    return Math.max(0, Math.round((1 - (dP + dC + dF) / 3) * 100));
  })();

  // Plate tilt based on macro balance
  const proteinRatio = totals.protein / (TARGETS.protein || 1);
  const carbsRatio = totals.carbs / (TARGETS.carbs || 1);
  const fatsRatio = totals.fats / (TARGETS.fats || 1);
  const tiltZ = useSpring((carbsRatio - proteinRatio) * 3, { stiffness: 120, damping: 14 });
  const tiltX = useSpring(55 + fatsRatio * 2, { stiffness: 120, damping: 14 });
  const plateGlow = score >= 60 && plate.length > 0;

  useEffect(() => {
    tiltZ.set((carbsRatio - proteinRatio) * 3);
    tiltX.set(55 + fatsRatio * 2);
  }, [carbsRatio, proteinRatio, fatsRatio, tiltZ, tiltX]);

  const startGame = useCallback(() => {
    setPlate([]);
    setTimer(ROUND_SECONDS);
    setPhase('playing');
  }, []);

  const addFood = useCallback((food: typeof FOODS[number]) => {
    if (phase !== 'playing') return;
    setPlate((p) => [...p, food]);
  }, [phase]);

  const removeFood = useCallback((index: number) => {
    if (phase !== 'playing') return;
    setPlate((p) => p.filter((_, i) => i !== index));
  }, [phase]);

  const submitPlate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase(score >= 60 ? 'won' : 'lost');
  }, [score]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase(score >= 60 ? 'won' : 'lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, score]);

  return (
    <section id="features" className="relative flex min-h-[100svh] flex-col justify-center py-6">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-3 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#B7F46B]/20 bg-[#B7F46B]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B7F46B]">
            Interactive Demo
          </span>
          <h2 className="mt-2 font-satoshi text-xl font-black tracking-tight text-white md:mt-3 md:text-3xl">
            Build Your Perfect Plate
          </h2>
        </motion.div>

        {/* Game area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm md:p-4"
        >
          {/* Idle state */}
          {phase === 'idle' && (
            <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-10">
              <motion.div
                className="text-6xl"
                animate={{ rotateZ: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🍽️
              </motion.div>
              <p className="max-w-md text-center text-sm text-white/50">
                Tap food items to build a balanced plate. Match the target macros as closely as possible within {ROUND_SECONDS} seconds.
              </p>
              <button
                onClick={startGame}
                className="button-primary px-8 py-3.5 text-sm font-bold"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Playing */}
          {phase === 'playing' && (
            <div className="space-y-2">
              {/* Timer + Rings + Score — single compact row */}
              <div className="flex items-center gap-3">
                {/* Timer */}
                <motion.div
                  className={`font-satoshi text-2xl font-black tabular-nums md:text-3xl ${timer <= 5 ? 'text-[#F67070]' : 'text-white'}`}
                  key={timer}
                  initial={{ scale: timer <= 5 ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {timer}s
                </motion.div>

                {/* Compact macro rings centered */}
                <div className="flex flex-1 items-center justify-center gap-4">
                  <CompactRing label="Protein" current={totals.protein} target={TARGETS.protein} color={MACRO_COLORS.protein.main} glowColor={MACRO_COLORS.protein.glow} />
                  <CompactRing label="Carbs" current={totals.carbs} target={TARGETS.carbs} color={MACRO_COLORS.carbs.main} glowColor={MACRO_COLORS.carbs.glow} />
                  <CompactRing label="Fats" current={totals.fats} target={TARGETS.fats} color={MACRO_COLORS.fats.main} glowColor={MACRO_COLORS.fats.glow} />
                </div>

                {/* Score */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-white/30">Score</span>
                  <span className={`font-satoshi text-xl font-black tabular-nums md:text-2xl ${score >= 60 ? 'text-[#B7F46B]' : 'text-white'}`}>
                    {score}%
                  </span>
                </div>
              </div>

              {/* Timer bar */}
              <TimerBar timer={timer} total={ROUND_SECONDS} />

              {/* 2.5D Plate */}
              <div className="flex justify-center">
                <div style={{ perspective: '800px' }}>
                  <motion.div
                    className="relative mx-auto flex items-center justify-center"
                    style={{
                      width: plateSize,
                      height: plateSize,
                      rotateX: tiltX,
                      rotateZ: tiltZ,
                    }}
                  >
                    {/* Plate shadow */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: shadowSize,
                        height: shadowSize,
                        background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                        transform: 'translateY(20px) scaleY(0.3)',
                        filter: 'blur(10px)',
                      }}
                    />
                    {/* Plate surface */}
                    <motion.div
                      className="absolute rounded-full border"
                      style={{
                        width: surfaceSize,
                        height: surfaceSize,
                        background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.1) 100%)',
                        borderColor: plateGlow ? 'rgba(183,244,107,0.3)' : 'rgba(255,255,255,0.08)',
                      }}
                      animate={{
                        boxShadow: plateGlow
                          ? '0 0 40px rgba(183,244,107,0.15), inset 0 0 30px rgba(183,244,107,0.05)'
                          : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Plate rim */}
                    <div
                      className="absolute rounded-full border border-white/[0.04]"
                      style={{
                        width: rimSize,
                        height: rimSize,
                        background: 'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.03) 0%, transparent 60%)',
                      }}
                    />

                    {/* Food on plate */}
                    <AnimatePresence>
                      {plate.map((f, i) => {
                        const pos = seededPosition(i);
                        return (
                          <motion.button
                            key={`${f.id}-${i}`}
                            onClick={() => removeFood(i)}
                            className="absolute cursor-pointer text-xl md:text-2xl"
                            style={{
                              left: `calc(50% + ${pos.x}px)`,
                              top: `calc(50% + ${pos.y}px)`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            initial={{ y: -80, scale: 0.3, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0, y: -20 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                              mass: 0.8,
                            }}
                            whileHover={{ scale: 1.2 }}
                          >
                            {f.emoji}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>

                    {/* Empty state hint */}
                    {plate.length === 0 && (
                      <span className="absolute text-xs text-white/15">Tap foods below</span>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Food grid */}
              <div className="grid grid-cols-4 gap-1.5 md:grid-cols-8">
                {FOODS.map((f) => (
                  <FoodCard key={f.id} food={f} onAdd={() => addFood(f)} />
                ))}
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <motion.button
                  onClick={submitPlate}
                  disabled={plate.length === 0}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="button-secondary px-8 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 md:py-3"
                >
                  Submit Plate
                </motion.button>
              </div>
            </div>
          )}

          {/* Won */}
          {phase === 'won' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center gap-4 py-4 md:gap-6 md:py-10"
            >
              <Confetti />
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
              >
                🎉
              </motion.div>
              <h3 className="font-satoshi text-2xl font-black text-[#B7F46B] md:text-3xl">
                You scored {score}%!
              </h3>
              <p className="max-w-sm text-center text-sm text-white/50">
                Well balanced! You&apos;ve earned a 3-day free trial of Enerium Premium.
              </p>
              <div className="flex gap-3">
                <a
                  href="#download"
                  className="button-primary px-8 py-3.5 text-sm font-bold"
                >
                  Claim Free Trial
                </a>
                <button
                  onClick={startGame}
                  className="button-secondary px-6 py-3.5 text-sm font-bold"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Lost */}
          {phase === 'lost' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center gap-4 py-4 md:gap-6 md:py-10"
            >
              {/* Red pulse background */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                initial={{ backgroundColor: 'rgba(246,112,112,0.1)' }}
                animate={{ backgroundColor: 'rgba(246,112,112,0)' }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="text-6xl"
                animate={{ x: [0, -8, 8, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                🤔
              </motion.div>
              <h3 className="font-satoshi text-2xl font-black text-white md:text-3xl">
                Score: {score}%
              </h3>
              <p className="max-w-sm text-center text-sm text-white/50">
                Not quite balanced. You need at least 60% to win the free trial. Try again!
              </p>
              <button
                onClick={startGame}
                className="button-primary px-8 py-3.5 text-sm font-bold"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
