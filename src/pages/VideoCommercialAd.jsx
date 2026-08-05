import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Tv,
  Sparkles,
  ArrowRight,
  FileText,
  CheckCircle2,
  Zap,
  Award,
  BookOpen,
  Mic,
  BarChart3,
  Flame,
} from "lucide-react";
import "./VideoCommercialAd.css";

const SCENES_60S = [
  {
    id: 1,
    title: "Frustration & Plateau",
    chip: "THE PROBLEM",
    duration: 8,
    image: "/ad_assets/ad_scene1.jpg",
    heading: "Stuck at IELTS Band 6.5?",
    vo: "Stuck at Band 6.5? Tired of paying thousands for coaching classes that give vague feedback weeks late?",
    sfx: "Ambient Clock Ticking",
  },
  {
    id: 2,
    title: "Introducing Knarrow.in",
    chip: "THE SOLUTION",
    duration: 8,
    image: "/ad_assets/ad_scene2.jpg",
    heading: "Smarter AI IELTS Prep",
    vo: "Meet Knarrow.in — the AI-powered IELTS platform built to guarantee your Band 8+ dream.",
    sfx: "Cyber Synth Pulse",
  },
  {
    id: 3,
    title: "Instant AI Accent & Speaking",
    chip: "AI FEATURE HIGHLIGHT",
    duration: 10,
    image: "/ad_assets/ad_scene2.jpg",
    heading: "Instant Real-Time AI Scoring",
    vo: "Practice speaking anytime with instantaneous AI voice evaluation, accent tuning, and real exam scoring.",
    sfx: "Waveform Audio Ping",
  },
  {
    id: 4,
    title: "AI Writing & Essay Evaluator",
    chip: "EXAMINER FEEDBACK",
    duration: 10,
    image: "/ad_assets/ad_scene2.jpg",
    heading: "Examiner-Grade Essay Corrections",
    vo: "Get micro-second essay corrections, examiner-grade band breakdowns, and instant vocabulary upgrades.",
    sfx: "Keystroke Mechanical Click",
  },
  {
    id: 5,
    title: "CBT Mocks & Vocab Battles",
    chip: "GAMIFIED PREP",
    duration: 10,
    image: "/ad_assets/ad_scene3.jpg",
    heading: "Real CBT Simulator & Arena",
    vo: "Simulate exact computer-delivered IELTS exam conditions or challenge friends in fast-paced Vocab Battles.",
    sfx: "Esports Combo Flare",
  },
  {
    id: 6,
    title: "Band 8.5 Success Guaranteed",
    chip: "PROOF & RESULTS",
    duration: 8,
    image: "/ad_assets/ad_scene4.jpg",
    heading: "Unlock Top Global Universities",
    vo: "Over 50,000 students have unlocked top global universities with Knarrow.",
    sfx: "Triumphant Orchestra",
  },
  {
    id: 7,
    title: "Start Free Practice Today",
    chip: "CALL TO ACTION",
    duration: 6,
    image: "/ad_assets/ad_scene4.jpg",
    heading: "Knarrow Your Gap to Band 8+",
    vo: "Start your journey today at Knarrow.in. Narrow your gap to Band 8!",
    sfx: "Impact Bass Drop",
  },
];

const SCENES_30S = [
  {
    id: 1,
    title: "Attention Hook",
    chip: "ATTENTION HOOK",
    duration: 5,
    image: "/ad_assets/ad_scene1.jpg",
    heading: "Don't Book Your IELTS Exam Yet!",
    vo: "Wait! Don't book your IELTS exam until you try this.",
    sfx: "Alert Siren Ping",
  },
  {
    id: 2,
    title: "AI Instant Scoring",
    chip: "INSTANT SCORING",
    duration: 7,
    image: "/ad_assets/ad_scene2.jpg",
    heading: "Instant AI Band Score in Seconds",
    vo: "Knarrow.in gives you instant AI band scoring for Speaking and Writing in seconds!",
    sfx: "Fast Cyber Whoosh",
  },
  {
    id: 3,
    title: "Real CBT & Gamified Arena",
    chip: "CBT MOCKS",
    duration: 8,
    image: "/ad_assets/ad_scene3.jpg",
    heading: "Real Computer Mocks & Vocab Duels",
    vo: "Simulate real CBT exams, play daily vocab duels, and track your band progress in real time.",
    sfx: "Arcade Combo Sound",
  },
  {
    id: 4,
    title: "Reach Band 8.5 Faster",
    chip: "RESULTS",
    duration: 6,
    image: "/ad_assets/ad_scene4.jpg",
    heading: "Join 50,000+ Band 8.5 Winners",
    vo: "Stop guessing your score. Join thousands scoring Band 8+!",
    sfx: "Success Fanfare",
  },
  {
    id: 5,
    title: "Start Free Trial Now",
    chip: "CALL TO ACTION",
    duration: 4,
    image: "/ad_assets/ad_scene4.jpg",
    heading: "Try Knarrow.in Free Today",
    vo: "Head to Knarrow.in now for your free trial!",
    sfx: "Final Bass Drop",
  },
];

export default function VideoCommercialAd() {
  const [adMode, setAdMode] = useState("60s"); // "60s" or "30s"
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);

  const scenes = adMode === "60s" ? SCENES_60S : SCENES_30S;
  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  const timerRef = useRef(null);

  // Sync Voiceover Audio using Web Speech API
  const speakCurrentScene = (text) => {
    if (isMuted || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = adMode === "30s" ? 1.15 : 1.05;
    utterance.pitch = 1.0;
    // Prefer English natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("en-US") || v.lang.includes("en-GB")
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Reset when mode changes
    setIsPlaying(false);
    setCurrentSceneIdx(0);
    setElapsedSeconds(0);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, [adMode]);

  useEffect(() => {
    if (isPlaying) {
      speakCurrentScene(scenes[currentSceneIdx]?.vo);

      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            return totalDuration;
          }
          return next;
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, currentSceneIdx, totalDuration, isMuted]);

  // Recalculate current scene index based on elapsed seconds
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      accumulated += scenes[i].duration;
      if (elapsedSeconds < accumulated) {
        if (currentSceneIdx !== i) {
          setCurrentSceneIdx(i);
          if (isPlaying) speakCurrentScene(scenes[i]?.vo);
        }
        break;
      }
    }
  }, [elapsedSeconds, scenes]);

  const togglePlay = () => {
    if (elapsedSeconds >= totalDuration) {
      setElapsedSeconds(0);
      setCurrentSceneIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setElapsedSeconds(0);
    setCurrentSceneIdx(0);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * totalDuration;
    setElapsedSeconds(newTime);
  };

  const currentScene = scenes[currentSceneIdx] || scenes[0];

  return (
    <div className="ad-page">
      <div className="ad-container">
        {/* Header */}
        <div className="ad-header">
          <div className="ad-badge">
            <Sparkles size={16} />
            <span>Official Knarrow.in Commercial Ad Campaign</span>
          </div>
          <h1 className="ad-title">Experience the Knarrow Advantage</h1>
          <p className="ad-subtitle">
            Watch our high-converting video commercial ad highlighting how AI technology empowers students to reach Band 8+ faster.
          </p>

          {/* Mode Switcher */}
          <div className="mode-switcher">
            <button
              className={`mode-btn ${adMode === "60s" ? "active" : ""}`}
              onClick={() => setAdMode("60s")}
            >
              <Tv size={18} />
              60s Flagship Story Commercial
            </button>
            <button
              className={`mode-btn ${adMode === "30s" ? "active" : ""}`}
              onClick={() => setAdMode("30s")}
            >
              <Zap size={18} />
              30s Social Media Fast Pitch
            </button>
          </div>
        </div>

        {/* Video Player Card */}
        <div className="player-card">
          <div className="video-viewport">
            <img
              key={currentScene.id}
              src={currentScene.image}
              alt={currentScene.title}
              className={`scene-image ${isPlaying ? "zooming" : ""}`}
            />
            <div className="video-overlay-gradient" />

            {/* Watermark & Live Badge */}
            <div className="brand-watermark">
              <span className="brand-dot" />
              <span>KNARROW.IN</span>
            </div>

            <div className="live-tag">
              <span className="live-dot" />
              <span>{adMode === "60s" ? "60S CINEMATIC" : "30S SHORT"}</span>
            </div>

            {/* On-Screen Text Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                className="text-overlay-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="caption-chip">{currentScene.chip}</div>
                <h2 className="caption-title">{currentScene.heading}</h2>
                <div className="caption-vo">
                  <strong>VO:</strong> "{currentScene.vo}"
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Player Controls Bar */}
          <div className="player-controls-bar">
            {/* Timeline Scrubber */}
            <div className="timeline-scrubber-container">
              <span className="time-display">
                {Math.floor(elapsedSeconds)}s / {totalDuration}s
              </span>
              <div className="timeline-track" onClick={handleSeek}>
                <div
                  className="timeline-fill"
                  style={{
                    width: `${(elapsedSeconds / totalDuration) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Buttons Row */}
            <div className="controls-row">
              <div className="left-controls">
                <button className="ctrl-btn play-btn" onClick={togglePlay}>
                  {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: "2px" }} />}
                </button>

                <button className="ctrl-btn" onClick={handleRestart} title="Restart Ad">
                  <RotateCcw size={18} />
                </button>

                <button
                  className="ctrl-btn"
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <span className="scene-indicator">
                  Scene {currentSceneIdx + 1} of {scenes.length}: {currentScene.title}
                </span>
              </div>

              <div className="right-controls">
                <button
                  className="ctrl-btn"
                  style={{ width: "auto", borderRadius: "0.5rem", padding: "0 0.8rem" }}
                  onClick={() => setShowScriptModal(!showScriptModal)}
                >
                  <FileText size={16} style={{ marginRight: "0.4rem" }} />
                  Director's Script
                </button>

                <Link to="/register" className="primary-cta-btn">
                  Start Free Trial <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scene Selection Thumbnails */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem", color: "#f8fafc" }}>
          Commercial Shot Breakdown
        </h3>

        <div className="scenes-grid">
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              className={`scene-thumb-card ${currentSceneIdx === idx ? "active" : ""}`}
              onClick={() => {
                setCurrentSceneIdx(idx);
                // compute elapsed seconds at start of scene
                let startSec = 0;
                for (let i = 0; i < idx; i++) startSec += scenes[i].duration;
                setElapsedSeconds(startSec);
              }}
            >
              <div className="thumb-image-box">
                <img src={scene.image} alt={scene.title} />
              </div>
                <div className="thumb-title">{scene.title}</div>
                <div className="thumb-time">{scene.duration}s • {scene.chip}</div>
            </div>
          ))}
        </div>

        {/* Full Production Script Section */}
        {showScriptModal && (
          <motion.div
            className="script-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="script-header">
              <div className="script-title">
                <FileText color="#3b82f6" />
                <span>Production Script & Director Notes ({adMode})</span>
              </div>
              <button
                className="ctrl-btn"
                onClick={() => setShowScriptModal(false)}
              >
                ✕
              </button>
            </div>

            <table className="script-table">
              <thead>
                <tr>
                  <th>Scene / Time</th>
                  <th>Visual Shot & SFX</th>
                  <th>Voiceover (VO) Line</th>
                  <th>On-Screen Text</th>
                </tr>
              </thead>
              <tbody>
                {scenes.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>Scene {s.id}</strong>
                      <br />
                      <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{s.duration} seconds</span>
                    </td>
                    <td>
                      <strong>{s.title}</strong>
                      <br />
                      <span style={{ color: "#10b981", fontSize: "0.8rem" }}>SFX: {s.sfx}</span>
                    </td>
                    <td className="vo-text">"{s.vo}"</td>
                    <td>{s.heading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
