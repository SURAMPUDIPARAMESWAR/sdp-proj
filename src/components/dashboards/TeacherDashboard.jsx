import React, { useState } from "react";

// ---- NOTIFICATIONS (simple local data) ----
const allNotifications = [
  {
    id: 1,
    role: "teacher",
    title: "New Doubt from Student",
    message: "John has asked a new doubt in Mathematics chat.",
    time: "2025-11-30 09:30 AM",
    read: false
  },
  {
    id: 2,
    role: "teacher",
    title: "Meeting Reminder",
    message: "Staff meeting in the conference room at 4 PM.",
    time: "2025-11-29 01:00 PM",
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

function NotificationsBellForTeacher() {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(allNotifications);

  const relevant = localNotifications.filter(
    (n) => n.role === "teacher" || n.role === "all"
  );
  const unreadCount = relevant.filter((n) => !n.read).length;

  const toggleOpen = () => setOpen((prev) => !prev);

  const markAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.role === "teacher" || n.role === "all" ? { ...n, read: true } : n
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

// ---- SAMPLE DATA ----
const teacherProfile = {
  name: "Ms. Sharma",
  className: "10A",
  subject: "Mathematics"
};

const initialStudents = [
  {
    id: "STU001",
    name: "John Smith",
    attendance: "97%",
    progress: [
      { subject: "Mathematics", percent: 78 },
      { subject: "English", percent: 92 }
    ],
    grades: [
      { subject: "Mathematics", date: "2024-01-10", grade: "A-" },
      { subject: "English", date: "2024-01-14", grade: "B" }
    ],
    atRisk: false,
    actionPoints: ["Needs help with algebra"],
    messages: []
  },
  {
    id: "STU002",
    name: "Sarah Johnson",
    attendance: "88%",
    progress: [
      { subject: "Mathematics", percent: 55 },
      { subject: "English", percent: 81 }
    ],
    grades: [
      { subject: "Mathematics", date: "2024-01-12", grade: "C" },
      { subject: "English", date: "2024-01-14", grade: "A" }
    ],
    atRisk: true,
    actionPoints: ["Low test scores"],
    messages: []
  }
];

// For editing marks/attendance
const subjectsList = ["Mathematics", "English"];

export default function TeacherDashboard() {
  const [role, setRole] = useState("class_teacher"); // or 'subject_teacher'
  const [students, setStudents] = useState(initialStudents);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // NEW: simple per-student chat store (id -> messages[])
  const [studentChats, setStudentChats] = useState({
    STU001: [
      { from: "Student", text: "Ma'am, I have a doubt in algebra." },
      { from: "Teacher", text: "Sure, share the question here." }
    ],
    STU002: []
  });

  // handle teacher sending a message/suggestion/parent-message
  const handleSendMessage = (studentId, message) => {
    setStudents((students) =>
      students.map((s) =>
        s.id === studentId
          ? {
              ...s,
              messages: [
                ...(s.messages || []),
                {
                  from: teacherProfile.name,
                  content: message.text,
                  subject: message.subject,
                  type: message.type, // "suggestion", "message", or "parent"
                  date: new Date().toLocaleString()
                }
              ]
            }
          : s
      )
    );
  };

  // NEW: chat reply handler (teacher replies in chatbox)
  const handleChatReply = (studentId, text) => {
    if (!text.trim()) return;
    setStudentChats((prev) => ({
      ...prev,
      [studentId]: [
        ...(prev[studentId] || []),
        { from: "Teacher", text: text.trim() }
      ]
    }));
  };

  // to append a new incoming student chat message (from backend later)
  const pushStudentChatMessage = (studentId, text) => {
    setStudentChats((prev) => ({
      ...prev,
      [studentId]: [
        ...(prev[studentId] || []),
        { from: "Student", text: text.trim() }
      ]
    }));
  };

  // Class Teacher editing marks/attendance logic
  function handleEdit(stu) {
    setEditId(stu.id);
    const gradesObj = {};
    stu.grades.forEach((g) => {
      gradesObj[g.subject] = g.grade;
    });
    setEditForm({ ...stu, gradesObj });
  }
  function handleEditChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("grades-")) {
      const subj = name.split("-")[1];
      setEditForm((f) => ({
        ...f,
        gradesObj: { ...f.gradesObj, [subj]: value }
      }));
    } else {
      setEditForm((f) => ({ ...f, [name]: value }));
    }
  }
  function handleSave() {
    setStudents(
      students.map((s) =>
        s.id === editId
          ? {
              ...s,
              attendance: editForm.attendance,
              grades: subjectsList.map((subj) => ({
                subject: subj,
                date:
                  (s.grades.find((g) => g.subject === subj) || {}).date ||
                  "2024-01-01",
                grade: editForm.gradesObj[subj]
              }))
            }
          : s
      )
    );
    setEditId(null);
    setEditForm(null);
  }
  function handleCancel() {
    setEditId(null);
    setEditForm(null);
  }

  // ---- Render ----
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
            marginBottom: 20
          }}
        >
          <h2 style={{ margin: 0 }}>
            Teacher Dashboard – {teacherProfile.name}
          </h2>
          <NotificationsBellForTeacher />
        </div>

        {/* Role toggle buttons */}
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
        >
          <button
            style={{
              background: role === "class_teacher" ? "#2979ff" : "#f5f7fa",
              color: role === "class_teacher" ? "#fff" : "#2979ff",
              border: "1.8px solid #2979ff",
              borderRadius: "6px",
              padding: "7px 18px",
              marginRight: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => setRole("class_teacher")}
          >
            Class Teacher
          </button>
          <button
            style={{
              background: role === "subject_teacher" ? "#2979ff" : "#f5f7fa",
              color: role === "subject_teacher" ? "#fff" : "#2979ff",
              border: "1.8px solid #2979ff",
              borderRadius: "6px",
              padding: "7px 18px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => setRole("subject_teacher")}
          >
            Subject Teacher
          </button>
        </div>

        {role === "class_teacher" && (
          <ClassTeacherDashboard
            profile={teacherProfile}
            students={students}
            editId={editId}
            editForm={editForm}
            handleEdit={handleEdit}
            handleEditChange={handleEditChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleSendMessage={handleSendMessage}
            studentChats={studentChats}
            onChatReply={handleChatReply}
          />
        )}
        {role === "subject_teacher" && (
          <SubjectTeacherDashboard
            profile={teacherProfile}
            students={students}
            handleSendMessage={handleSendMessage}
            studentChats={studentChats}
            onChatReply={handleChatReply}
          />
        )}
      </div>
    </div>
  );
}

// ---- CLASS TEACHER ----
function ClassTeacherDashboard({
  profile,
  students,
  editId,
  editForm,
  handleEdit,
  handleEditChange,
  handleSave,
  handleCancel,
  handleSendMessage,
  studentChats,
  onChatReply
}) {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        {profile.name} —{" "}
        <span style={{ color: "#2979ff" }}>
          Class Teacher ({profile.className})
        </span>
      </h2>
      <SectionTitle title={`All Students of Class ${profile.className}`} />
      <div style={{ overflowX: "auto", marginBottom: "30px" }}>
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
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Attendance</th>
              {subjectsList.map((subj) => (
                <th key={subj} style={thStyle}>
                  {subj} Grade
                </th>
              ))}
              <th style={thStyle}>Progress (All Subjects)</th>
              <th style={thStyle}>At-Risk</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) =>
              editId === stu.id ? (
                <tr key={stu.id} style={{ background: "#fffbe6" }}>
                  <td style={tdStyle}>{stu.id}</td>
                  <td style={tdStyle}>{stu.name}</td>
                  <td style={tdStyle}>
                    <input
                      name="attendance"
                      value={editForm.attendance}
                      onChange={handleEditChange}
                      style={{ width: 60 }}
                    />
                  </td>
                  {subjectsList.map((subj) => (
                    <td style={tdStyle} key={subj}>
                      <input
                        name={`grades-${subj}`}
                        value={editForm.gradesObj[subj]}
                        onChange={handleEditChange}
                        style={{ width: 38 }}
                      />
                    </td>
                  ))}
                  <td style={tdStyle}>
                    {stu.progress
                      .map((p) => `${p.subject}: ${p.percent}%`)
                      .join(", ")}
                  </td>
                  <td style={tdStyle}>
                    {stu.atRisk ? (
                      <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                        Yes
                      </span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={handleSave} style={greenBtn}>
                      Save
                    </button>
                    <button onClick={handleCancel} style={redBtn}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={stu.id} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{stu.id}</td>
                  <td style={tdStyle}>{stu.name}</td>
                  <td style={tdStyle}>{stu.attendance}</td>
                  {subjectsList.map((subj) => {
                    const grade =
                      (stu.grades.find((g) => g.subject === subj) || {})
                        .grade || "";
                    return (
                      <td style={tdStyle} key={subj}>
                        {grade}
                      </td>
                    );
                  })}
                  <td style={tdStyle}>
                    {stu.progress
                      .map((p) => `${p.subject}: ${p.percent}%`)
                      .join(", ")}
                  </td>
                  <td style={tdStyle}>
                    {stu.atRisk ? (
                      <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                        Yes
                      </span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEdit(stu)} style={blueBtn}>
                      Edit
                    </button>
                    <button
                      style={{
                        background: "#2979ff",
                        color: "#fff",
                        border: "none",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        fontSize: "0.98rem",
                        cursor: "pointer",
                        marginLeft: "8px"
                      }}
                      onClick={() => setSelectedStudent(stu)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSendMessage={handleSendMessage}
          chats={studentChats[selectedStudent.id] || []}
          onChatReply={onChatReply}
        />
      )}
    </>
  );
}

// ---- SUBJECT TEACHER ----
function SubjectTeacherDashboard({
  profile,
  students,
  handleSendMessage,
  studentChats,
  onChatReply
}) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const subject = profile.subject;
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        {profile.name} —{" "}
        <span style={{ color: "#2979ff" }}>
          Subject Teacher ({subject}, {profile.className})
        </span>
      </h2>
      <SectionTitle
        title={`Students in ${profile.className} for ${subject}`}
      />
      <div style={{ overflowX: "auto", marginBottom: "30px" }}>
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
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Attendance</th>
              <th style={thStyle}>Progress ({subject})</th>
              <th style={thStyle}>Grade ({subject})</th>
              <th style={thStyle}>At-Risk</th>
              <th style={thStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td style={tdStyle}>{stu.id}</td>
                <td style={tdStyle}>{stu.name}</td>
                <td style={tdStyle}>{stu.attendance}</td>
                <td style={tdStyle}>
                  {(stu.progress.find((p) => p.subject === subject) || {
                    percent: "N/A"
                  }).percent}
                  %
                </td>
                <td style={tdStyle}>
                  {(stu.grades.find((g) => g.subject === subject) || {
                    grade: "N/A"
                  }).grade}
                </td>
                <td style={tdStyle}>
                  {stu.atRisk ? (
                    <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>
                <td style={tdStyle}>
                  <button
                    style={{
                      background: "#2979ff",
                      color: "#fff",
                      border: "none",
                      padding: "5px 15px",
                      borderRadius: "5px",
                      fontSize: "0.98rem",
                      cursor: "pointer"
                    }}
                    onClick={() => setSelectedStudent(stu)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <SubjectStudentDetails
          student={selectedStudent}
          subject={subject}
          onClose={() => setSelectedStudent(null)}
          onSendMessage={handleSendMessage}
          chats={studentChats[selectedStudent.id] || []}
          onChatReply={onChatReply}
        />
      )}
    </>
  );
}

// ---- View/Edit Details/Send Msg with CHAT ----
function StudentDetails({ student, onClose, onSendMessage, chats, onChatReply }) {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("message");
  const [subject, setSubject] = useState("");
  const [chatInput, setChatInput] = useState("");

  const types = [
    { value: "message", label: "Message to Student" },
    { value: "suggestion", label: "Suggestion to Student" },
    { value: "parent", label: "Message to Parent" }
  ];
  const subjects = student.progress.map((p) => p.subject);

  return (
    <div
      style={{
        background: "#f5f7fa",
        borderRadius: "10px",
        boxShadow: "0 1px 9px rgba(0,0,0,0.05)",
        padding: "1.6rem",
        margin: "2rem auto 0 auto",
        maxWidth: "980px"
      }}
    >
      <h3 style={{ color: "#2979ff" }}>
        Student Details: {student.name} ({student.id})
      </h3>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
          marginTop: "0.5rem"
        }}
      >
        {/* Left: academic + message forms */}
        <div style={{ flex: 2 }}>
          <ul>
            <li>
              <b>Attendance:</b> {student.attendance}
            </li>
            <li>
              <b>At Risk:</b>{" "}
              {student.atRisk ? (
                <span style={{ color: "#d32f2f" }}>Yes</span>
              ) : (
                "No"
              )}
            </li>
          </ul>
          <b>Progress:</b>
          <ul>
            {student.progress.map((p, i) => (
              <li key={i}>
                {p.subject}: {p.percent}%
              </li>
            ))}
          </ul>
          <b>Grades:</b>
          <ul>
            {student.grades.map((g, i) => (
              <li key={i}>
                {g.subject}: {g.grade} ({g.date})
              </li>
            ))}
          </ul>
          <b>Action Points:</b>
          <ul>
            {student.actionPoints.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          {/* Messaging form (existing feature) */}
          <div
            style={{
              marginTop: 16,
              background: "#fff",
              padding: "1rem",
              borderRadius: "9px"
            }}
          >
            <b>Send {types.find((t) => t.value === type).label}</b>
            <form
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if (msg.trim() && (type !== "suggestion" || subject)) {
                  onSendMessage(student.id, { text: msg, subject, type });
                  setMsg("");
                  setSubject("");
                }
              }}
            >
              <div>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {types.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {type === "suggestion" && (
                  <>
                    <span style={{ marginLeft: 12 }}>Subject:</span>
                    <select
                      value={subject}
                      style={{ marginLeft: 6 }}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    >
                      <option value="">Select subject</option>
                      {subjects.map((subj) => (
                        <option value={subj} key={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={types.find((t) => t.value === type).label + "..."}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "4px",
                  border: "1px solid #bbb",
                  fontSize: "1rem"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "6px 18px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  maxWidth: "160px",
                  alignSelf: "flex-end"
                }}
              >
                Send
              </button>
            </form>
          </div>

          <b style={{ marginTop: 16, display: "block" }}>
            Past Messages & Suggestions:
          </b>
          <ul>
            {(student.messages || []).map((m, i) => (
              <li key={i}>
                <span
                  style={{
                    color:
                      m.type === "parent"
                        ? "#fbc02d"
                        : m.type === "suggestion"
                        ? "#388e3c"
                        : "#2979ff",
                    fontWeight: "bold"
                  }}
                >
                  {m.type === "suggestion"
                    ? "[Suggestion]"
                    : m.type === "parent"
                    ? "[To Parent]"
                    : "[Message]"}
                </span>{" "}
                {m.subject && m.type === "suggestion" && `[${m.subject}] `}
                {m.content}
                <span style={{ color: "#888", marginLeft: 8 }}>{m.date}</span>
              </li>
            ))}
            {!(student.messages && student.messages.length) && (
              <li>No messages yet.</li>
            )}
          </ul>
          <b style={{ marginTop: 16, display: "block" }}>Parent Messages:</b>
          <ul>
            {(student.messages || [])
              .filter((m) => m.type === "parent")
              .map((m, i) => (
                <li key={i}>
                  <span
                    style={{ color: "#fbc02d", fontWeight: "bold" }}
                  >
                    [To Parent]
                  </span>{" "}
                  {m.content}
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    {m.date}
                  </span>
                </li>
              ))}
            {!(
              (student.messages || []).filter((m) => m.type === "parent")
                .length
            ) && <li>No parent messages yet.</li>}
          </ul>
        </div>

        {/* Right: NEW chatbox for real-time style replies */}
        <div
          style={{
            flex: 1.4,
            background: "#ffffff",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
          }}
        >
          <b
            style={{
              display: "block",
              marginBottom: 8,
              color: "#2979ff"
            }}
          >
            Chat with Student
          </b>
          <div
            style={{
              maxHeight: 260,
              overflowY: "auto",
              border: "1px solid #dde1eb",
              borderRadius: 8,
              padding: 8,
              marginBottom: 10,
              background: "#f5f7fa"
            }}
          >
            {chats.length === 0 && (
              <div style={{ fontSize: "0.9rem", color: "#777" }}>
                No chat messages yet. Student doubts from their chatbox
                will appear here.
              </div>
            )}
            {chats.map((m, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: m.from === "Teacher" ? "right" : "left",
                  marginBottom: 6
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 14,
                    background:
                      m.from === "Teacher"
                        ? "#2979ff"
                        : "rgba(41, 121, 255, 0.1)",
                    color: m.from === "Teacher" ? "#fff" : "#123",
                    fontSize: "0.9rem"
                  }}
                >
                  <b>{m.from}:</b> {m.text}
                </span>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              onChatReply(student.id, chatInput);
              setChatInput("");
            }}
            style={{ display: "flex", gap: 6 }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a quick reply..."
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 14,
                border: "1px solid #c5c9d3",
                fontSize: "0.9rem"
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 14px",
                background: "#2979ff",
                color: "#fff",
                border: "none",
                borderRadius: 14,
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

      <button
        style={{
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "16px",
          float: "right"
        }}
        onClick={onClose}
      >
        Close Details
      </button>
      <div style={{ clear: "both" }} />
    </div>
  );
}

function SubjectStudentDetails({
  student,
  subject,
  onClose,
  onSendMessage,
  chats,
  onChatReply
}) {
  const [msg, setMsg] = useState("");
  const [forParent, setForParent] = useState(false);
  const [chatInput, setChatInput] = useState("");

  return (
    <div
      style={{
        background: "#f5f7fa",
        borderRadius: "10px",
        boxShadow: "0 1px 9px rgba(0,0,0,0.05)",
        padding: "1.6rem",
        margin: "2rem auto 0 auto",
        maxWidth: "980px"
      }}
    >
      <h3 style={{ color: "#2979ff" }}>
        Student Details: {student.name} ({student.id})
      </h3>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
          marginTop: "0.5rem"
        }}
      >
        {/* Left: subject details + suggestion form */}
        <div style={{ flex: 2 }}>
          <ul>
            <li>
              <b>Attendance:</b> {student.attendance}
            </li>
            <li>
              <b>At Risk:</b>{" "}
              {student.atRisk ? (
                <span style={{ color: "#d32f2f" }}>Yes</span>
              ) : (
                "No"
              )}
            </li>
            <li>
              <b>Progress in {subject}:</b>{" "}
              {(student.progress.find((p) => p.subject === subject) || {
                percent: "N/A"
              }).percent}
              %
            </li>
            <li>
              <b>Grade in {subject}:</b>{" "}
              {(student.grades.find((g) => g.subject === subject) || {
                grade: "N/A",
                date: "-"
              }).grade}{" "}
              {(
                student.grades.find((g) => g.subject === subject) || {}
              ).date || "-"}
            </li>
          </ul>
          <b>Action Points:</b>
          <ul>
            {student.actionPoints.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          {/* Send suggestion to student OR parent */}
          <div
            style={{
              marginTop: 16,
              background: "#fff",
              padding: "1rem",
              borderRadius: "9px"
            }}
          >
            <b>
              Send Suggestion to {forParent ? "Parent" : "Student"} for{" "}
              {subject}
            </b>
            <form
              style={{
                marginTop: 14,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
              onSubmit={(e) => {
                e.preventDefault();
                if (msg.trim()) {
                  onSendMessage(student.id, {
                    text: msg,
                    subject,
                    type: forParent ? "parent" : "suggestion"
                  });
                  setMsg("");
                }
              }}
            >
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={forParent}
                    style={{ marginRight: "6px" }}
                    onChange={(e) => setForParent(e.target.checked)}
                  />
                  Send to Parent
                </label>
              </div>
              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={
                  forParent
                    ? "Write your message to parent..."
                    : "Write your suggestion to student..."
                }
                style={{
                  width: "100%",
                  minHeight: "48px",
                  borderRadius: "4px",
                  border: "1px solid #bbb",
                  fontSize: "1rem"
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "6px 18px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  maxWidth: "160px",
                  alignSelf: "flex-end"
                }}
              >
                Send
              </button>
            </form>
          </div>

          <b style={{ marginTop: 16, display: "block" }}>
            Suggestions & Parent Messages for {subject}:
          </b>
          <ul>
            {(student.messages || [])
              .filter(
                (m) =>
                  m.subject === subject &&
                  (m.type === "suggestion" || m.type === "parent")
              )
              .map((m, i) => (
                <li key={i}>
                  <span
                    style={{
                      color: m.type === "parent" ? "#fbc02d" : "#388e3c",
                      fontWeight: "bold"
                    }}
                  >
                    {m.type === "parent" ? "[To Parent]" : "[Suggestion]"}
                  </span>{" "}
                  {m.content}
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    {m.date}
                  </span>
                </li>
              ))}
            {!(
              (student.messages || []).filter(
                (m) =>
                  m.subject === subject &&
                  (m.type === "suggestion" || m.type === "parent")
              ).length
            ) && <li>No suggestions or parent messages yet.</li>}
          </ul>
        </div>

        {/* Right: NEW chatbox */}
        <div
          style={{
            flex: 1.4,
            background: "#ffffff",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
          }}
        >
          <b
            style={{
              display: "block",
              marginBottom: 8,
              color: "#2979ff"
            }}
          >
            Chat with Student
          </b>
          <div
            style={{
              maxHeight: 260,
              overflowY: "auto",
              border: "1px solid #dde1eb",
              borderRadius: 8,
              padding: 8,
              marginBottom: 10,
              background: "#f5f7fa"
            }}
          >
            {chats.length === 0 && (
              <div style={{ fontSize: "0.9rem", color: "#777" }}>
                No chat messages yet. Student doubts from their chatbox
                will appear here.
              </div>
            )}
            {chats.map((m, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: m.from === "Teacher" ? "right" : "left",
                  marginBottom: 6
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 14,
                    background:
                      m.from === "Teacher"
                        ? "#2979ff"
                        : "rgba(41, 121, 255, 0.1)",
                    color: m.from === "Teacher" ? "#fff" : "#123",
                    fontSize: "0.9rem"
                  }}
                >
                  <b>{m.from}:</b> {m.text}
                </span>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              onChatReply(student.id, chatInput);
              setChatInput("");
            }}
            style={{ display: "flex", gap: 6 }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a quick reply..."
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 14,
                border: "1px solid #c5c9d3",
                fontSize: "0.9rem"
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 14px",
                background: "#2979ff",
                color: "#fff",
                border: "none",
                borderRadius: 14,
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

      <button
        style={{
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "16px",
          float: "right"
        }}
        onClick={onClose}
      >
        Close Details
      </button>
      <div style={{ clear: "both" }} />
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
        marginBottom: 20,
        marginTop: 6
      }}
    >
      {title}
    </div>
  );
}

// BUTTON STYLES
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
const blueBtn = {
  background: "#2979ff",
  color: "#fff",
  border: "none",
  padding: "5px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};
const greenBtn = {
  background: "#388e3c",
  color: "#fff",
  border: "none",
  padding: "5px 13px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};
const redBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "5px 13px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginLeft: 7
};
