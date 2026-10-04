import { useState } from "react";
import { askVira } from "../services/chatService";
import {
  Brain,
  Send,
  Terminal,
  ShieldAlert,
  Sparkles,
  Bot,
  User,
  Zap,
  ArrowRight
} from "lucide-react";

export default function ViraChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Greetings, Operator. I am VIRA — autonomous cybersecurity investigation copilot. You can ask me to analyze ingested logs, correlate adversary techniques with the MITRE ATT&CK matrix, or assess specific IP reputations.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const promptPresets = [
    "Identify any brute-force authentication spikes in recent logs",
    "List all high-risk Indicators of Compromise (IOCs) detected",
    "Explain mapped MITRE ATT&CK techniques and recommended remediation",
    "Are there any unauthorized privilege escalation signatures?",
  ];

  const handleSend = async (queryText) => {
    const q = queryText || question;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);

    try {
      const data = await askVira(q);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer || "Investigation complete. No additional threats detected for this query.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Communication error with the VIRA AI neural engine. Ensure the backend FastAPI server is active.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Brain size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  VIRA AI Copilot Terminal
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  NEURAL SOC AGENT
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Autonomous threat intelligence query console with live telemetry context
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AGENT READY</span>
            </span>
          </div>
        </div>
      </div>

      {/* CHAT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PRESET PROMPTS DECK (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Zap size={16} className="text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Rapid Threat Inquiries
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Select a pre-engineered prompt to initiate immediate automated incident analysis:
            </p>
            <div className="mt-3 space-y-2">
              {promptPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(preset)}
                  disabled={loading}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-blue-50/60 hover:border-blue-300 text-xs font-medium text-slate-800 transition cursor-pointer flex items-center justify-between group disabled:opacity-50"
                >
                  <span className="line-clamp-2">{preset}</span>
                  <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 shadow-xs text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider">
              <Terminal size={14} />
              <span>Telemetry Context</span>
            </div>
            <p className="text-[11px] text-slate-400">
              VIRA synthesizes reasoning across active logs, IOC extractors, and the MITRE ATT&CK Enterprise Matrix v14.
            </p>
          </div>
        </div>

        {/* CHAT STREAM (8 COLS) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col h-[650px] overflow-hidden">
          
          {/* MESSAGES SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Brain size={16} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      isAssistant
                        ? "bg-slate-50 border border-slate-200/80 text-slate-800"
                        : "bg-blue-600 text-white font-medium shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 pb-1 border-b border-black/5 text-[10px] font-mono opacity-70">
                      <span>{isAssistant ? "VIRA AI AGENT" : "OPERATOR"}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {!isAssistant && (
                    <div className="h-8 w-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Brain size={16} />
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-500 flex items-center gap-2">
                  <div className="h-3.5 w-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing intelligence response...</span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask VIRA about specific IP addresses, techniques, or security events..."
                disabled={loading}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}