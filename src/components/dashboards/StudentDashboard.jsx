import React, { useState } from "react";

// Example student data
const currentStudent = {
  name: "Test Student",
  id: "STU001",
  assignedSubjects: ["Mathematics", "Science", "English"], // only show these
  results: [
    { subject: "Mathematics", date: "2024-01-15", grade: "A-" },
    { subject: "Science", date: "2024-01-12", grade: "B+" },
    { subject: "English", date: "2024-01-10", grade: "A" }
  ],
  progress: [
    { subject: "Mathematics", percent: 75 },
    { subject: "Science", percent: 60 },
    { subject: "English", percent: 90 }
  ],
  suggestions: [
    { subject: "Mathematics", from: "Ms. Johnson", suggestion: "Revise quadratic equations." },
    { subject: "Science", from: "Mr. Smith", suggestion: "Focus on the periodic table." }
  ],
  messages: [
    { from: "Teacher", to: "Student", content: "Don't forget to submit your project!", date: "2025-11-03" },
    { from: "Admin", to: "Student", content: "School will be closed this Friday.", date: "2025-11-02" }
  ]
};

export default function StudentDashboard() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const visibleResults = currentStudent.results.filter(res =>
    currentStudent.assignedSubjects.includes(res.subject)
  );
  const visibleProgress = currentStudent.progress.filter(pro =>
    currentStudent.assignedSubjects.includes(pro.subject)
  );
  const visibleSuggestions = currentStudent.suggestions.filter(sugg =>
    currentStudent.assignedSubjects.includes(sugg.subject)
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSentMessages([
        ...sentMessages,
        { from: "Student", to: "Teacher/Admin", content: message, date: new Date().toISOString().slice(0, 10) }
      ]);
      setMessage("");
    }
  };

  return (
    <div style={{
      margin: "2rem auto",
      maxWidth: 820,
      padding: "24px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
    }}>
      <h2 style={{textAlign: "center", marginBottom: 30, letterSpacing: 1}}>
        Welcome, {currentStudent.name}!
      </h2>

      {/* Section: Progress Summary */}
      <SectionTitle title="Your Progress" />
      <div style={{
        display: "flex", gap: "1.5rem", justifyContent: "center",
        marginBottom: "32px"
      }}>
        {visibleProgress.map((p, idx) => (
          <ProgressCard key={idx} subject={p.subject} percent={p.percent} />
        ))}
      </div>

      {/* Section: Results */}
      <SectionTitle title="Your Results" />
      <div style={{
        overflowX: "auto", marginBottom: "32px"
      }}>
        <table style={{
          width: "100%", borderCollapse: "collapse", background: "#f5f7fa", borderRadius: "8px"
        }}>
          <thead>
            <tr>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((res, i) => (
              <tr key={i} style={{ textAlign:"center" }}>
                <td style={tdStyle}>{res.subject}</td>
                <td style={tdStyle}>{res.date}</td>
                <td style={tdStyle}>{res.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section: Suggestions */}
      <SectionTitle title="Teacher Suggestions" />
      <div style={{
        display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "32px"
      }}>
        {visibleSuggestions.length === 0 && <div style={cardStyle}>No current suggestions.</div>}
        {visibleSuggestions.map((s, i) => (
          <div key={i} style={cardStyle}>
            <b>{s.subject}:</b> {s.suggestion}
            <span style={{ fontStyle: "italic", color: "#888", marginLeft: 8 }}>— {s.from}</span>
          </div>
        ))}
      </div>

      {/* Section: Messages */}
      <SectionTitle title="Message Box" />
      <div style={{
        background: "#f5f7fa",
        border: "1px solid #dde2ec",
        padding: "1.2rem",
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        marginBottom: "24px",
        maxWidth: 600, margin: "auto"
      }}>
        <b>Received Messages</b>
        <ul style={{marginBottom: "1.2rem"}}>
          {currentStudent.messages.map((msg, i) =>
            <li key={i} style={{padding: ".28rem 0"}}>
              <span style={{fontWeight: 600, color: "#2979ff"}}>{msg.from}:</span> {msg.content}
              <span style={{ color: "#888", marginLeft: "8px" }}>({msg.date})</span>
            </li>
          )}
        </ul>
        <b>Send a Message/Doubt</b>
        <form onSubmit={handleSendMessage}>
          <textarea
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ width: "100%", minHeight: "50px", marginBottom: "0.5rem", fontSize:"1rem", borderRadius: "7px", border: "1px solid #ccc" }}
            placeholder="Type your message or doubt here..." />
          <button
            type="submit"
            style={{
              background: "#2979ff",
              color: "#fff",
              border: "none",
              padding: "6px 18px",
              borderRadius: "6px",
              fontWeight: "bold"
            }}>
            Send
          </button>
        </form>
        {sentMessages.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <b>Your Sent Messages:</b>
            <ul>
              {sentMessages.map((msg, i) =>
                <li key={i} style={{padding: ".25rem 0"}}>
                  <span style={{ fontWeight: 600, color: "#388e3c" }}>To {msg.to}:</span> {msg.content}
                  <span style={{ color: "#888", marginLeft: "8px" }}>({msg.date})</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Components and Styles ---

function SectionTitle({ title }) {
  return (
    <div style={{fontWeight: "bold", fontSize: "1.22rem", color: "#2979ff", marginBottom: 12, marginTop: 8}}>
      {title}
    </div>
  );
}

function ProgressCard({ subject, percent }) {
  return (
    <div style={{
      background: "#2979ff",
      color: "#fff",
      borderRadius: "10px",
      padding: "1.12rem 1.6rem",
      minWidth: "160px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{fontSize:"1.11rem", fontWeight:"bold", marginBottom: 6}}>{subject}</div>
      <div style={{
        fontWeight: "bold",
        fontSize: "1.8rem",
        marginBottom: 2
      }}>{percent}%</div>
      <div style={{
        fontSize: "13.5px", opacity: 0.85
      }}>complete</div>
    </div>
  );
}

const cardStyle = {
  background:"#f5f7fa",
  borderRadius:"8px",
  padding:"0.92rem 1.2rem",
  fontSize:"1rem",
  boxShadow:"0 1px 3px rgba(0,0,0,0.04)"
};

const thStyle = {
  padding: ".55rem 1.2rem",
  background:"#ecf2fc",
  color: "#296fa9",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none"
};

const tdStyle = {
  padding: ".55rem 1.2rem",
  fontSize: "1rem",
  border: "none"
};