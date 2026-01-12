"use client";

import { useState, useEffect } from "react";
import { questions, resultMapping } from "@/lib/gameData";
import { motion } from "framer-motion";

// --- 1. DATA & CONFIG ---
type PlayerClassType = "A" | "B" | "C" | "D";

const CLASS_STATS = {
  A: {
    // Tank
    name: "Iron Paladin",
    emoji: "🛡️",
    maxHp: 200,
    atk: 15,
    specialName: "Refuse Request",
    specialDesc: "ปฏิเสธงาน! (บล็อกดาเมจ 100%)",
  },
  B: {
    // Support
    name: "Cleric of Coffee",
    emoji: "☕",
    maxHp: 150,
    atk: 10,
    specialName: "Group Therapy",
    specialDesc: "ชวนคุยระบายทุกข์ (ฮีลแรง 50 HP)",
  },
  C: {
    // Rogue
    name: "Silent Ninja",
    emoji: "🥷",
    maxHp: 120,
    atk: 25,
    specialName: "Shadow Log-out",
    specialDesc: "แอบกลับบ้าน (โจมตีคริติคอล 2x)",
  },
  D: {
    // Wizard
    name: "Tech Sorcerer",
    emoji: "🧙‍♂️",
    maxHp: 100,
    atk: 30,
    specialName: "Automate Script",
    specialDesc: "รันสคริปต์แก้ปัญหา (โจมตีรุนแรง 3x)",
  },
};

const OFFICE_NAMES = [
  "K.Somchai",
  "P'Nid",
  "Nong'May",
  "Boss John",
  "Manager A",
  "Dev Best",
  "AE Pink",
  "Acc Joy",
  "HR Bee",
  "Intern Art",
  "P'Lek",
  "K.Somsak",
  "Nong'Fah",
  "Des'Nut",
  "K.Pranee",
];

// --- 2. COMPONENTS ---

// ส่วนต่อสู้ (Battle Scene)
function BattleScene({
  playerClass,
  playerName,
  onRestart,
}: {
  playerClass: PlayerClassType;
  playerName: string;
  onRestart: () => void;
}) {
  const stats = CLASS_STATS[playerClass];

  // Game State
  const [bossHp, setBossHp] = useState(500);
  const [playerHp, setPlayerHp] = useState(stats.maxHp);
  const [turn, setTurn] = useState<"PLAYER" | "FRIENDS" | "ENEMY" | "WIN" | "LOSE">("PLAYER");
  const [logs, setLogs] = useState<string[]>(["Battle Start! You and your party vs Monday!"]);
  const [effect, setEffect] = useState("");

  // Party State
  const [friends, setFriends] = useState<
    { id: string; type: PlayerClassType; hp: number; name: string }[]
  >([]);

  // Init Party on Mount (3 Friends)
  useEffect(() => {
    // Random pool of classes
    const pool = ["A", "B", "C", "D", "A", "B", "C", "D"] as PlayerClassType[];
    const friendTypes = pool
      .filter((t) => t !== playerClass || Math.random() > 0.5)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Pick random names
    const shuffledNames = [...OFFICE_NAMES].sort(() => 0.5 - Math.random());

    setFriends(
      friendTypes.map((t, i) => ({
        id: `f${i}`,
        type: t,
        hp: CLASS_STATS[t].maxHp,
        name: shuffledNames[i],
      }))
    );
  }, [playerClass]);

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev].slice(0, 4));

  // Player Action
  const handleAction = (action: "ATTACK" | "SPECIAL" | "HEAL") => {
    if (turn !== "PLAYER") return;

    let dmg = 0;
    const currentStats = CLASS_STATS[playerClass];

    if (action === "ATTACK") {
      dmg = currentStats.atk + Math.floor(Math.random() * 10);
      setBossHp((prev) => Math.max(0, prev - dmg));
      addLog(`${playerName} attacked! Dealt ${dmg} damage.`);
      setEffect("💥");
    } else if (action === "SPECIAL") {
      if (playerClass === "A") {
        // Tank
        dmg = currentStats.atk;
        addLog(`${playerName} used Refuse Request! Blocked next attack!`);
        setBossHp((prev) => Math.max(0, prev - dmg));
      } else if (playerClass === "B") {
        // Support
        const heal = 50;
        setPlayerHp((prev) => Math.min(stats.maxHp, prev + heal));
        addLog(`${playerName} healed self for 50 HP!`);
        setEffect("✨");
      } else if (playerClass === "C") {
        // Rogue
        dmg = currentStats.atk * 2;
        setBossHp((prev) => Math.max(0, prev - dmg));
        addLog(`${playerName} CRITICAL hit! Dealt ${dmg} dmg.`);
        setEffect("🗡️");
      } else if (playerClass === "D") {
        // Wizard
        dmg = currentStats.atk * 3;
        setBossHp((prev) => Math.max(0, prev - dmg));
        addLog(`${playerName} cast Fireball! Dealt ${dmg} dmg.`);
        setEffect("🔥");
      }
    }

    if (bossHp - dmg <= 0) {
      setTurn("WIN");
    } else {
      setTurn("FRIENDS");
    }

    setTimeout(() => setEffect(""), 500);
  };

  // Friends Turn
  useEffect(() => {
    if (turn === "FRIENDS") {
      let totalDmg = 0;

      friends.forEach((f) => {
        const fStats = CLASS_STATS[f.type];
        const d = fStats.atk + Math.floor(Math.random() * 5);
        totalDmg += d;
      });

      setTimeout(() => {
        setBossHp((prev) => Math.max(0, prev - totalDmg));
        addLog(`Party (3 members) attacked! Total ${totalDmg} damage.`);

        if (bossHp - totalDmg <= 0) {
          setTurn("WIN");
        } else {
          setTurn("ENEMY");
        }
      }, 1000);
    }
  }, [turn, friends, bossHp]);

  // Enemy Turn
  useEffect(() => {
    if (turn === "ENEMY") {
      setTimeout(() => {
        // Attack Player (Primary)
        const dmg = 15 + Math.floor(Math.random() * 10);
        setPlayerHp((prev) => Math.max(0, prev - dmg));

        addLog(`Monday uses "Urgent Meeting"! ${playerName} took ${dmg} dmg.`);

        if (playerHp - dmg <= 0) {
          setTurn("LOSE");
        } else {
          setTurn("PLAYER");
        }
      }, 1500);
    }
  }, [turn, playerHp, playerName]);

  return (
    <div
      className="w-full max-w-2xl mx-auto bg-slate-800 p-6 rounded-xl border-4 border-slate-700 shadow-2xl relative overflow-hidden font-mono"
      style={{ fontFamily: "var(--font-press-start-2p), monospace" }}
    >
      {/* Effect Overlay */}
      {effect && (
        <div className="absolute inset-0 flex items-center justify-center text-8xl animate-ping z-50 opacity-50">
          {effect}
        </div>
      )}

      {/* BOSS */}
      <div className="text-center mb-8 relative">
        <div className="text-6xl mb-2 animate-bounce">🖥️😈</div>
        <h3 className="text-red-500 font-bold">BOSS: MONDAY</h3>
        <div className="w-full bg-slate-900 h-4 rounded-full border border-slate-600 mt-2">
          <div
            className="bg-red-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(bossHp / 500) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 mt-1">{bossHp}/500 HP</p>
      </div>

      {/* BATTLE FIELD */}
      <div className="grid grid-cols-4 gap-2 mb-4 px-2 items-end">
        {/* Friends (3) */}
        {friends.map((f) => (
          <div key={f.id} className="text-center group">
            <div className="text-2xl group-hover:scale-110 transition">
              {CLASS_STATS[f.type].emoji}
            </div>
            <div className="text-[9px] text-yellow-200 mt-1 font-bold">{f.name}</div>
            <div className="text-[7px] text-slate-400">{CLASS_STATS[f.type].name}</div>
          </div>
        ))}

        {/* Player */}
        <div className="text-center relative z-10 scale-110 origin-bottom bg-slate-700/50 p-2 rounded border border-yellow-500/30">
          <div className="text-3xl">{stats.emoji}</div>
          <div className="text-[10px] text-yellow-400 font-bold mt-1">{playerName}</div>
          <div className="text-[8px] text-purple-300">{stats.name}</div>
          <div className="text-[9px] text-green-400 font-bold">{playerHp} HP</div>
        </div>
      </div>

      {/* LOGS */}
      <div className="bg-black/40 p-2 rounded h-24 overflow-hidden mb-4 border border-slate-600 text-xs text-green-400 flex flex-col justify-end">
        {logs.map((l, i) => (
          <div key={i} className="mb-1">
            {l}
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="bg-slate-700 p-4 rounded-lg border-t-4 border-yellow-500">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-slate-300">
            Turn:{" "}
            <span className={turn === "PLAYER" ? "text-green-400 font-bold" : "text-slate-500"}>
              {turn}
            </span>
          </div>
        </div>

        {turn === "PLAYER" ? (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleAction("ATTACK")}
              className="bg-slate-600 hover:bg-slate-500 text-white py-3 rounded border border-slate-500"
            >
              ⚔️ Attack
            </button>
            <button
              onClick={() => handleAction("SPECIAL")}
              className="bg-purple-600 hover:bg-purple-500 text-white py-3 rounded border border-purple-400"
            >
              ✨ {stats.specialName}
            </button>
          </div>
        ) : (
          <div className="text-center text-slate-400 py-2 animate-pulse text-xs">Waiting...</div>
        )}

        {/* GAME OVER / WIN */}
        {(turn === "WIN" || turn === "LOSE") && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4 text-center">
            <h2
              className={`text-2xl font-bold mb-4 ${
                turn === "WIN" ? "text-yellow-400" : "text-red-500"
              }`}
            >
              {turn === "WIN" ? "VICTORY! 🎉" : "GAME OVER 💀"}
            </h2>
            <p className="text-slate-300 text-xs mb-6">
              {turn === "WIN"
                ? `${playerName} defeated Monday! Have a great week!`
                : "Monday defeated you... Try again!"}
            </p>
            <button
              onClick={onRestart}
              className="bg-white text-black px-6 py-2 rounded font-bold hover:scale-105 transition text-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 3. MAIN PAGE ---
export default function OfficeRPG() {
  const [phase, setPhase] = useState<"START" | "QUIZ" | "RESULT" | "BATTLE">("START");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [playerName, setPlayerName] = useState("");

  // Quiz Handlers
  const handleStart = () => {
    if (!playerName.trim()) {
      alert("Please enter your name!");
      return;
    }
    setPhase("QUIZ");
    setCurrentQIndex(0);
    setAnswers({});
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQIndex].id]: value };
    setAnswers(newAnswers);

    if (currentQIndex < questions.length - 1) {
      setTimeout(() => setCurrentQIndex(currentQIndex + 1), 300);
    } else {
      setPhase("RESULT");
    }
  };

  const startBattle = () => {
    setPhase("BATTLE");
  };

  const resetGame = () => {
    setPhase("START");
    setAnswers({});
    setCurrentQIndex(0);
    setPlayerName("");
  };

  // Logic การคำนวณผล Result
  const getResult = () => {
    // defaults if missing
    const q1 = (answers[1] || "A") as "A" | "B" | "C" | "D";
    const q2 = (answers[2] || "A") as "A" | "B" | "C" | "D";
    const q3 = (answers[3] || "A") as "A" | "B" | "C" | "D";
    const q4 = (answers[4] || "A") as "A" | "B" | "C" | "D";

    const charClass = resultMapping.classes[q1];
    const strategy = resultMapping.strategies[q3];
    const soul = `${resultMapping.souls[q2]} + ${resultMapping.realDesires[q4]}`;
    const advice = resultMapping.realAdvice[q4];

    return { charClass, strategy, soul, advice, playerClass: q1, q4Value: q4 };
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex items-center justify-center p-4">
      {phase === "START" && (
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="text-6xl animate-bounce">🧙‍♂️</div>
          <h1 className="text-4xl font-bold text-yellow-500">Office Oracle RPG</h1>
          <p className="text-slate-300 text-lg">ค้นหาอาชีพของคุณ แล้วไปตบเกรียนวันจันทร์!</p>

          <div className="max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Enter Your Name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 rounded bg-slate-800 border border-slate-600 focus:border-yellow-500 focus:outline-none text-center text-white placeholder:text-slate-500"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={!playerName.trim()}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-8 rounded-full transform transition hover:scale-105 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          >
            ⚔️ START ADVENTURE
          </button>
        </div>
      )}

      {phase === "QUIZ" && (
        <div className="max-w-2xl w-full bg-slate-800 border-2 border-slate-700 rounded-xl shadow-2xl p-8 animate-in fade-in duration-500">
          <div className="flex justify-between items-center text-sm text-slate-400 mb-6">
            <span>
              QUEST {currentQIndex + 1}/{questions.length}
            </span>
            <span className="text-purple-400 font-mono">[{questions[currentQIndex].category}]</span>
          </div>

          <h3 className="text-2xl font-bold text-white leading-relaxed mb-6">
            {questions[currentQIndex].question}
          </h3>

          <div className="grid gap-3">
            {questions[currentQIndex].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="group text-left p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:bg-purple-900/40 hover:border-purple-500 transition-all duration-200"
              >
                <span className="font-bold text-yellow-500 mr-2">{opt.value.charAt(0)}.</span>
                <span className="text-slate-200 group-hover:text-white">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "RESULT" && result && (
        <div className="max-w-2xl w-full bg-slate-800 border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-700">
          {/* Header */}
          <div className="bg-purple-900/50 p-4 border-b border-purple-500/30 text-center">
            <h2 className="text-xl font-bold text-yellow-400 tracking-wider uppercase">
              The Grand Reveal
            </h2>
          </div>

          <div className="p-6 space-y-8">
            {/* ส่วนที่ 1: Character Sheet (RPG Style) */}
            <div className="bg-black/30 p-6 rounded-lg border-2 border-yellow-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl grayscale">🛡️</div>
              <h2 className="text-xl text-yellow-400 font-bold uppercase mb-4 border-b border-yellow-500/30 pb-2 flex items-center gap-2">
                <span>📜</span> Character Sheet:{" "}
                <span className="text-white">{result.charClass.title}</span>
              </h2>
              <div className="space-y-4">
                <p>
                  <span className="text-purple-400 font-bold">📊 STR (จุดแข็ง):</span> <br />
                  <span className="text-slate-200 ml-6 block mt-1">{result.charClass.str}</span>
                </p>
                <p>
                  <span className="text-purple-400 font-bold">❤️ Soul (สิ่งที่หล่อเลี้ยงใจ):</span>{" "}
                  <br />
                  <span className="text-slate-200 ml-6 block mt-1">{result.soul}</span>
                </p>
                <div className="bg-red-900/20 p-3 rounded border border-red-500/20 mt-2">
                  <p className="text-red-400 text-sm font-bold">🛡️ Monday Strategy:</p>
                  <p className="text-slate-300 text-sm mt-1">{result.strategy}</p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-slate-700/50" />

            {/* ส่วนที่ 2: Real World Reflection (Warm & Polite) */}
            <div className="bg-white/5 p-6 rounded-lg border border-emerald-500/30">
              <h3 className="text-lg text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <span>🌱</span> Real World Reflection
              </h3>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li>
                  <strong className="text-white block mb-1">ตัวตนของคุณ:</strong>
                  {result.charClass.realSelf}
                </li>
                <li>
                  <strong className="text-white block mb-1">สิ่งที่คุณต้องการจริงๆ:</strong>
                  {resultMapping.realDesires[result.q4Value as "A" | "B" | "C" | "D"]}
                </li>
                <li className="bg-emerald-900/20 p-3 rounded border border-emerald-500/20">
                  <strong className="text-emerald-300 block mb-1">คำแนะนำสำหรับวันจันทร์:</strong>
                  {result.advice}
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={startBattle}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
              >
                <span className="text-2xl">🔥</span> FIGHT BOSS MONDAY
              </button>
              <button
                onClick={resetGame}
                className="text-slate-400 hover:text-white underline text-sm mt-2 text-center"
              >
                🔄 เล่นใหม่อีกครั้ง (Re-roll)
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === "BATTLE" && (
        <div className="w-full max-w-lg">
          <button
            onClick={() => setPhase("RESULT")}
            className="mb-4 text-slate-400 hover:text-white underline text-sm block mx-auto"
          >
            &lt; Back to Results
          </button>
          <BattleScene
            playerClass={result.playerClass}
            playerName={playerName}
            onRestart={resetGame}
          />
        </div>
      )}
    </div>
  );
}
