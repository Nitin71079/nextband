import { useState, useEffect, useRef } from "react";
import { X, Mic, Send, Bot, User, Play, Pause, Award, Clock, Sparkles, CheckCircle2, RefreshCw, FileText } from "lucide-react";
import toast from "react-hot-toast";

const SAMPLE_PROMPTS = {
  "Speaking Mock": [
    "Hello! Welcome to your 60-minute IELTS Speaking session. I am your AI Examiner. Let's begin Part 1. Could you tell me your full name and where you live?",
    "Great! Let's talk about hobbies. What do you enjoy doing in your free time, and why?",
    "Now, moving on to Part 2 (Cue Card): Describe a memorable trip you took with friends. You should say: where you went, who was with you, what you did, and explain why it was memorable. Please speak for 1 to 2 minutes.",
  ],
  "Writing Task 2": [
    "Welcome to your Writing Task 2 Coaching Session. Please paste your essay topic and your draft response below. I will analyze your Task Achievement, Coherence, Vocabulary, and Grammar line by line.",
  ],
  "Grammar & Pronunciation": [
    "Welcome! In this session, we will focus on advanced complex sentences, conditional structures, and eliminating common pronunciation slips. What specific area would you like to target today?",
  ],
};

export default function AISessionRoomModal({ isOpen, onClose, topic = "Speaking Mock", bookingId }) {
  const [secondsLeft, setSecondsLeft] = useState(3600); // 60 minutes session
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: SAMPLE_PROMPTS[topic]?.[0] || "Welcome to your 1-Hour AI Session! How can I assist you with your IELTS prep today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentBandReport, setCurrentBandReport] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
      handleGenerateReport();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg = {
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate intelligent AI Examiner response
    setTimeout(() => {
      let aiResponseText = "";
      if (topic === "Speaking Mock") {
        if (messages.length === 1) {
          aiResponseText = "Thank you! That was clear. Let's move to Part 1 follow-up: Do you prefer spending your weekends outdoors or indoors? Try to elaborate using complex conjunctions (e.g. 'although', 'whereas').";
        } else if (messages.length === 3) {
          aiResponseText = "Excellent usage of connective phrases! Here is your Cue Card prompt: 'Describe an ambitious goal you achieved in the past.' Take 1 minute to think and then respond freely.";
        } else {
          aiResponseText = "Good vocabulary choice! I noticed you used 'very good'—try substituting with 'exceptional', 'paramount', or 'remarkable' to boost your Lexical Resource score to Band 8.5.";
        }
      } else {
        aiResponseText = "I have analyzed your submission. Your argument structure is solid. To reach Band 8.0 in Writing Task 2, ensure every body paragraph starts with a clear topic sentence followed by concrete supporting evidence.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.success("Voice recording activated. Speak clearly into your microphone...");
      setTimeout(() => {
        setIsListening(false);
        setInputText("In my opinion, studying abroad provides invaluable international exposure and cultural immersion.");
        toast("Voice transcribed successfully!", { icon: "🎤" });
      }, 3000);
    }
  };

  const handleGenerateReport = () => {
    setCurrentBandReport({
      overall: "7.5",
      fluency: "7.5",
      lexical: "8.0",
      grammar: "7.0",
      pronunciation: "7.5",
      feedback: "Strong coherence and expansive vocabulary. Focus on reducing slight pause hesitations during complex sentence constructions.",
      recommendations: [
        "Incorporate more topic-specific idioms (e.g. 'broaden one's horizons', 'at the apex of').",
        "Maintain pitch variation in Part 3 abstract questions.",
      ]
    });
    toast.success("60-Minute Session Completed! Detailed Band Report generated.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Knarrow AI IELTS Examiner</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  Live 1-on-1 Session
                </span>
              </div>
              <p className="text-xs text-slate-400">Focus: <strong className="text-cyan-400">{topic}</strong> • 60-Min Certified AI Coaching</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Session Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-sm font-semibold text-cyan-400">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-900/50">
          
          {/* Chat / Interaction Stream */}
          <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-md ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600/90 text-white rounded-tr-none shadow-lg shadow-blue-600/10"
                        : "bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-lg shadow-black/20"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`text-[10px] mt-2 opacity-60 text-right ${
                        msg.sender === "user" ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-2xl border transition flex items-center justify-center ${
                  isListening
                    ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                }`}
                title="Voice Input (Mic)"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your response or question to the AI Examiner..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />

              <button
                onClick={handleSendMessage}
                className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-cyan-500/20 transition flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar / Live Scorecard */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 p-4 md:p-6 bg-slate-950/40 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Live Band Assessment
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                  AI Evaluator Active
                </span>
              </div>

              {currentBandReport ? (
                <div className="space-y-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                    <div className="text-3xl font-extrabold text-cyan-400">{currentBandReport.overall}</div>
                    <div className="text-xs text-slate-300 font-semibold mt-1">Estimated Band Score</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block">Fluency:</span>
                      <strong className="text-cyan-400 text-sm">{currentBandReport.fluency}</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block">Lexical:</span>
                      <strong className="text-cyan-400 text-sm">{currentBandReport.lexical}</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block">Grammar:</span>
                      <strong className="text-cyan-400 text-sm">{currentBandReport.grammar}</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block">Pronunciation:</span>
                      <strong className="text-cyan-400 text-sm">{currentBandReport.pronunciation}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3">
                    <strong className="text-slate-200 block font-semibold">Key Improvement Tips:</strong>
                    {currentBandReport.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <Award className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Speak or write responses in the chat. The AI Examiner is recording your band criteria in real time.
                  </p>
                  <button
                    onClick={handleGenerateReport}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700 transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Generate Scorecard
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish & Save Session
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
