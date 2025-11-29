import React, { useState } from "react";

// ---- NOTIFICATIONS (local sample for parent) ----
const allNotifications = [
  {
    id: 1,
    role: "parent",
    title: "PTM Reminder",
    message: "Parent–teacher meeting scheduled for next Monday.",
    time: "2025-11-30 09:00 AM",
    read: false
  },
  {
    id: 2,
    role: "parent",
    title: "Fee Due",
    message: "Term 1 fee is due by the end of this week.",
    time: "2025-11-29 11:30 AM",
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

function NotificationsBellForParent() {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(allNotifications);

  const relevant = localNotifications.filter(
    (n) => n.role === "parent" || n.role === "all"
  );
  const unreadCount = relevant.filter((n) => !n.read).length;

  const toggleOpen = () => setOpen((prev) => !prev);

  const markAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.role === "parent" || n.role === "all" ? { ...n, read: true } : n
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
            maxHeight: 320,
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

// Example parent data (simulate login as a parent of John Smith)
const child = {
  id: "STU001",
  name: "John Smith",
  class: "10A",
  overallGrade: "B+",
  attendance: "97%",
  progress: [
    { subject: "Mathematics", percent: 78 },
    { subject: "English", percent: 92 }
  ],
  grades: [
    { subject: "Mathematics", date: "2024-01-10", grade: "A-" },
    { subject: "English", date: "2024-01-14", grade: "B" }
  ],
  actionPoints: ["Needs help with algebra", "Review last math quiz"],
  parentMessages: [
    {
      from: "Ms. Sharma (Class Teacher)",
      content: "John needs to focus more on algebra.",
      date: "2025-11-04 11:15 AM"
    },
    {
      from: "Mr. Singh (Math Teacher)",
      content: "Encourage John to practice equation problems at home.",
      date: "2025-11-01 09:22 AM"
    },
    {
      from: "Admin",
      content: "Next parent-teacher meeting on Friday.",
      date: "2025-11-02 03:00 PM"
    }
  ]
};

export default function ParentDashboard() {
  // send‑message box state
  const [recipientType, setRecipientType] = useState("teacher");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  // simple chat widget state (parent <-> teacher/admin)
  const [chatMessages, setChatMessages] = useState([
    { from: "Teacher", text: "Hello, feel free to ask any questions." }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      childId: child.id,
      recipientType,
      subject,
      message
    };

    try {
      // In real system, call backend here with fetch/axios
      console.log("Sending message payload:", payload);
      setStatus("success");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = { from: "You", text: chatInput.trim() };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
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
          margin: "auto",
          padding: "32px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
        }}
      >
        {/* Header with notifications */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem"
          }}
        >
          <h2 style={{ margin: 0 }}>
            Welcome, Parent!
            <br />
            <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
              You are viewing the report for <b>{child.name}</b> ({child.class})
            </span>
          </h2>
          <NotificationsBellForParent />
        </div>

        <SectionTitle title="Profile Summary" />
        <div
          style={{
            background: "#f5f7fa",
            borderRadius: "9px",
            padding: "18px",
            marginBottom: 32
          }}
        >
          <b>Student ID:</b> {child.id} <br />
          <b>Overall Grade:</b> {child.overallGrade} <br />
          <b>Attendance:</b> {child.attendance}
        </div>

        <SectionTitle title="Subject-wise Progress" />
        <div style={{ display: "flex", gap: "2rem", marginBottom: "32px" }}>
          {child.progress.map((p, i) => (
            <ProgressCard key={i} subject={p.subject} percent={p.percent} />
          ))}
        </div>

        <SectionTitle title="Subject-wise Grades" />
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#f5f7fa",
            borderRadius: "8px",
            marginBottom: "32px"
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
            {child.grades.map((g, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{g.subject}</td>
                <td style={tdStyle}>{g.date}</td>
                <td style={tdStyle}>{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle title="Action/Attention Points" />
        <ul style={{ marginBottom: "2.2rem" }}>
          {child.actionPoints.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>

        <SectionTitle title="Messages from School" />
        <ul
          style={{
            background: "#f5f7fa",
            borderRadius: "9px",
            padding: "16px",
            marginBottom: 8
          }}
        >
          {child.parentMessages.map((msg, i) => (
            <li key={i} style={{ marginBottom: 7 }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: msg.from === "Admin" ? "#d32f2f" : "#2979ff"
                }}
              >
                {msg.from}
              </span>
              : {msg.content}
              <span style={{ color: "#888", marginLeft: 8 }}>{msg.date}</span>
            </li>
          ))}
        </ul>

        {/* Send Message section */}
        <SectionTitle title="Send Message to School" />
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#f5f7fa",
            borderRadius: "9px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "600px",
            marginBottom: "24px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>Send To</label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #c5c9d3"
              }}
            >
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter subject"
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #c5c9d3"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="Type your message for teacher/admin"
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #c5c9d3",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              alignSelf: "flex-start",
              padding: "8px 18px",
              background: "#2979ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send Message
          </button>

          {status === "success" && (
            <span style={{ color: "green", fontSize: "0.9rem" }}>
              Message sent successfully.
            </span>
          )}
          {status === "error" && (
            <span style={{ color: "red", fontSize: "0.9rem" }}>
              Failed to send message. Please try again.
            </span>
          )}
        </form>

        {/* lightweight chat widget inside dashboard */}
        <SectionTitle title="Quick Chat with Teacher" />
        <div
          style={{
            background: "#f5f7fa",
            borderRadius: "9px",
            padding: "16px",
            maxWidth: "400px"
          }}
        >
          <div
            style={{
              maxHeight: "220px",
              overflowY: "auto",
              marginBottom: "12px",
              border: "1px solid #dde1eb",
              borderRadius: "8px",
              padding: "8px"
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
            onSubmit={handleChatSend}
            style={{ display: "flex", gap: "6px", marginTop: "4px" }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
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
  );
}

function SectionTitle({ title }) {
  return (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: "#2979ff",
        marginBottom: 18,
        marginTop: 13
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
          fontSize: "1.11rem",
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
      <div style={{ fontSize: "13.5px", opacity: 0.85 }}>complete</div>
    </div>
  );
}

const thStyle = {
  padding: ".55rem 1.2rem",
  background: "#ecf2fc",
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
