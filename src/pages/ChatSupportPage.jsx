import React, { useState } from "react";

export default function ChatSupportPage() {
  const [messages, setMessages] = useState([
    { from: "System", text: "Welcome to Student Analytics Support." },
    { from: "Admin", text: "How can we help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { from: "You", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "32px 0",
        background: "#f5f7fa"
      }}
    >
      <div
        style={{
          width: "96vw",
          maxWidth: "640px",
          margin: "auto",
          padding: "28px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Live Chat Support (Demo)
        </h2>
        <p style={{ marginBottom: "1.2rem", color: "#555", fontSize: "0.95rem" }}>
          This is a demo of how a live chat feature can look.
          In production, messages would be handled through a real-time service
          such as WebSockets or a chat SDK.
        </p>

        <div
          style={{
            border: "1px solid #dde1eb",
            borderRadius: "12px",
            padding: "10px",
            minHeight: "260px",
            maxHeight: "360px",
            overflowY: "auto",
            marginBottom: "10px"
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                marginBottom: "8px",
                textAlign: m.from === "You" ? "right" : "left"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: "14px",
                  background:
                    m.from === "You" ? "#2979ff" : "rgba(41, 121, 255, 0.1)",
                  color: m.from === "You" ? "#fff" : "#123"
                }}
              >
                <b>{m.from}:</b> {m.text}
              </span>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          style={{ display: "flex", gap: "8px", marginTop: "4px" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "14px",
              border: "1px solid #c5c9d3"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#2979ff",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem"
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
