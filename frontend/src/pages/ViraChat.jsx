import { useState } from "react";
import { askVira } from "../services/chatService";

export default function ViraChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const q = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: q,
      },
    ]);

    setQuestion("");

    setLoading(true);

    try {
      const data = await askVira(q);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Unable to contact VIRA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">

      <h1 className="text-4xl font-bold text-cyan-400">
        VIRA AI Assistant
      </h1>

      <p className="mt-2 text-slate-400">
        Ask questions about uploaded security logs.
      </p>

      <div className="mt-8 h-[500px] overflow-y-auto rounded-xl bg-slate-900 p-6">

        {messages.length === 0 ? (

          <p className="text-slate-500">
            Start asking VIRA...
          </p>

        ) : (

          <>
            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >

                <div
                  className={`inline-block max-w-[80%] rounded-xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </pre>
                </div>

              </div>

            ))}

            {loading && (

              <div className="mb-4 text-left">

                <div className="inline-block rounded-xl bg-slate-800 px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>

                    <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>

                    <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>

                    <span className="ml-2 font-semibold text-cyan-400">
                      🧠 VIRA is analyzing...
                    </span>

                  </div>

                </div>

              </div>

            )}

          </>

        )}

      </div>

      <div className="mt-6 flex gap-4">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          placeholder="Ask VIRA..."
          className="flex-1 rounded-xl bg-slate-900 p-4 outline-none ring-1 ring-slate-700 focus:ring-cyan-500"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className={`rounded-xl px-8 font-semibold transition ${
            loading
              ? "cursor-not-allowed bg-slate-700"
              : "bg-cyan-600 hover:bg-cyan-500"
          }`}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

    </div>
  );
}