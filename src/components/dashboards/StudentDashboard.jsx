import React, { useState } from "react";

// Example notifications
const allNotifications = [
  {
    id: 1,
    role: "student",
    title: "New Assignment Posted",
    message: "Math assignment on quadratic equations due Friday.",
    time: "2025-11-30 10:15 AM",
    read: false
  },
  {
    id: 2,
    role: "student",
    title: "Exam Schedule",
    message: "Mid-term exams start next Monday.",
    time: "2025-11-29 09:30 AM",
    read: false
  },
  {
    id: 3,
    role: "all",
    title: "Holiday Notice",
    message: "School will be closed this Friday.",
    time: "2025-11-28 03:00 PM",
    read: true
  }
];

function NotificationsBellForStudent() {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(allNotifications);

  const relevant = localNotifications.filter(
    (n) => n.role === "student" || n.role === "all"
  );
  const unreadCount = relevant.filter((n) => !n.read).length;

  const toggleOpen = () => setOpen((prev) => !prev);

  const markAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.role === "student" || n.role === "all" ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={toggleOpen}
        style={{
          position: "relative",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: 0
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>🔔</span>
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#d32f2f",
              color: "#fff",
              borderRadius: "999px",
              padding: "0 6px",
              fontSize: "0.7rem",
              fontWeight: "bold"
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: 8,
            width: 260,
            maxHeight: 300,
            overflowY: "auto",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 18px rgba(0,0,0,0.13)",
            zIndex: 20
          }}
        >
          <div
            style={{
              padding: "8px 10px",
              borderBottom: "1px solid #e0e4ee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
              Notifications
            </span>
            <button
              onClick={markAllRead}
              style={{
                border: "none",
                background: "transparent",
                color: "#2979ff",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              Mark all read
            </button>
          </div>
          {relevant.length === 0 ? (
            <div style={{ padding: "10px", fontSize: "0.9rem", color: "#777" }}>
              No notifications.
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {relevant.map((n) => (
                <li
                  key={n.id}
                  style={{
                    padding: "8px 10px",
                    borderBottom: "1px solid #f1f3f9",
                    background: n.read ? "#fff" : "#f5f7ff"
                  }}
                >
                  <div
                    style={{
                      fontWeight: n.read ? 500 : 600,
                      fontSize: "0.9rem",
                      marginBottom: 2
                    }}
                  >
                    {n.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {n.message}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#999",
                      marginTop: 2
                    }}
                  >
                    {n.time}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// Example student data
const currentStudent = {
  name: "Test Student",
  id: "STU001",
  assignedSubjects: ["Mathematics", "Science", "English"],
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

// Example teacher list
const teachers = [
  { id: "T1", name: "Ms. Johnson (Math)" },
  { id: "T2", name: "Mr. Smith (Science)" },
  { id: "T3", name: "Ms. Brown (English)" }
];

export default function StudentDashboard() {
  const [chatMessages, setChatMessages] = useState([
    { from: "System", teacher: null, text: "Select a teacher and ask your doubts." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0].id);

  const visibleResults = currentStudent.results.filter(res =>
    currentStudent.assignedSubjects.includes(res.subject)
  );
  const visibleProgress = currentStudent.progress.filter(pro =>
    currentStudent.assignedSubjects.includes(pro.subject)
  );
  const visibleSuggestions = currentStudent.suggestions.filter(sugg =>
    currentStudent.assignedSubjects.includes(sugg.subject)
  );

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const teacherObj = teachers.find(t => t.id === selectedTeacher);
    const newMsg = {
      from: "You",
      teacher: teacherObj ? teacherObj.name : null,
      text: chatInput.trim()
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "24px 0"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px 32px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
        }}
      >
        {/* Header full-width inside card */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20
          }}
        >
          <div>
            <h2 style={{ margin: 0, letterSpacing: 1 }}>
              Welcome, {currentStudent.name}!
            </h2>
            <div style={{ fontSize: "0.9rem", color: "#666", marginTop: 4 }}>
              ID: {currentStudent.id}
            </div>
          </div>
          <NotificationsBellForStudent />
        </div>

        {/* 2-column layout on wide screens */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "24px"
          }}
        >
          {/* Left column: progress, results, suggestions */}
          <div>
            <SectionTitle title="Your Progress" />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.2rem",
                marginBottom: "24px"
              }}
            >
              {visibleProgress.map((p, idx) => (
                <ProgressCard key={idx} subject={p.subject} percent={p.percent} />
              ))}
            </div>

            <SectionTitle title="Your Results" />
            <div
              style={{
                overflowX: "auto",
                marginBottom: "24px"
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#f5f7fa",
                  borderRadius: "8px"
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Subject</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleResults.map((res, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                      <td style={tdStyle}>{res.subject}</td>
                      <td style={tdStyle}>{res.date}</td>
                      <td style={tdStyle}>{res.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle title="Teacher Suggestions" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "24px"
              }}
            >
              {visibleSuggestions.length === 0 && (
                <div style={cardStyle}>No current suggestions.</div>
              )}
              {visibleSuggestions.map((s, i) => (
                <div key={i} style={cardStyle}>
                  <b>{s.subject}:</b> {s.suggestion}
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "#888",
                      marginLeft: 8
                    }}
                  >
                    — {s.from}
                  </span>
                </div>
              ))}
            </div>

            <SectionTitle title="Important Announcements" />
            <div
              style={{
                background: "#f5f7fa",
                borderRadius: "9px",
                padding: "1rem",
                marginBottom: "8px"
              }}
            >
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {currentStudent.messages.map((msg, i) => (
                  <li key={i} style={{ padding: ".28rem 0" }}>
                    <span
                      style={{ fontWeight: 600, color: "#2979ff" }}
                    >
                      {msg.from}:
                    </span>{" "}
                    {msg.content}
                    <span
                      style={{ color: "#888", marginLeft: "8px" }}
                    >
                      ({msg.date})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: chat */}
          <div>
            <SectionTitle title="Quick Chat with Teacher" />
            <div
              style={{
                background: "#f5f7fa",
                borderRadius: "9px",
                padding: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Teacher selector */}
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center"
                }}
              >
                <span
                  style={{ fontWeight: "bold", fontSize: "0.95rem" }}
                >
                  Ask doubt to:
                </span>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #c5c9d3",
                    fontSize: "0.95rem"
                  }}
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chat window */}
              <div
                style={{
                  flex: 1,
                  maxHeight: 260,
                  overflowY: "auto",
                  marginBottom: "12px",
                  border: "1px solid #dde1eb",
                  borderRadius: "8px",
                  padding: "8px",
                  background: "#fff"
                }}
              >
                {chatMessages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "6px",
                      textAlign: m.from === "You" ? "right" : "left"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        borderRadius: "14px",
                        background:
                          m.from === "You"
                            ? "#2979ff"
                            : "rgba(41, 121, 255, 0.1)",
                        color: m.from === "You" ? "#fff" : "#123",
                        fontSize: "0.92rem"
                      }}
                    >
                      <b>{m.from}</b>
                      {m.teacher && m.from === "You" && (
                        <span style={{ marginLeft: 4, fontWeight: 400 }}>
                          {" "}
                          → {m.teacher}
                        </span>
                      )}
                      {": "}
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleChatSend}
                style={{ display: "flex", gap: "6px", marginTop: "4px" }}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a quick doubt..."
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
                    padding: "8px 14px",
                    background: "#2979ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "14px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.85rem"
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components and Styles ---

function SectionTitle({ title }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "1.1rem",
        color: "#2979ff",
        marginBottom: 10,
        marginTop: 10
      }}
    >
      {title}
    </div>
  );
}

function ProgressCard({ subject, percent }) {
  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          fontSize: "1.05rem",
          fontWeight: "bold",
          marginBottom: 6
        }}
      >
        {subject}
      </div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.8rem",
          marginBottom: 2
        }}
      >
        {percent}%
      </div>
      <div
        style={{
          fontSize: "13.5px",
          opacity: 0.85
        }}
      >
        complete
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#f5f7fa",
  borderRadius: "8px",
  padding: "0.92rem 1.2rem",
  fontSize: "1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
};

const thStyle = {
  padding: ".55rem 1.2rem",
  background: "#ecf2fc",
  color: "#296fa9",
  fontWeight: "bold",
  fontSize: "1rem",
  border: "none",
  textAlign: "left"
};

const tdStyle = {
  padding: ".55rem 1.2rem",
  fontSize: "0.98rem",
  border: "none",
  textAlign: "center"
};
