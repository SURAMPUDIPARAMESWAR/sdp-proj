import React, { useState } from "react";

// ---- NOTIFICATIONS (local sample for admin) ----
const allNotifications = [
  {
    id: 1,
    role: "admin",
    title: "New Student Admitted",
    message: "A new student has been added to class 10A.",
    time: "2025-11-30 09:10 AM",
    read: false
  },
  {
    id: 2,
    role: "admin",
    title: "Teacher Leave Request",
    message: "Ms. Sharma requested leave for Tuesday.",
    time: "2025-11-29 04:00 PM",
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

function NotificationsBellForAdmin() {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(allNotifications);

  const relevant = localNotifications.filter(
    (n) => n.role === "admin" || n.role === "all"
  );
  const unreadCount = relevant.filter((n) => !n.read).length;

  const toggleOpen = () => setOpen((prev) => !prev);

  const markAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.role === "admin" || n.role === "all" ? { ...n, read: true } : n
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

// --- SAMPLE INSTITUTION DATA ---
const initialInstitution = {
  students: [
    {
      id: "STU001",
      name: "John Smith",
      class: "10A",
      parent: "Mr. Smith",
      email: "john@school.com",
      attendance: "97%",
      grade: "B+",
      subjects: { Mathematics: "A-", English: "B" }
    },
    {
      id: "STU002",
      name: "Sarah Johnson",
      class: "10A",
      parent: "Mrs. Johnson",
      email: "sarah@school.com",
      attendance: "94%",
      grade: "A",
      subjects: { Mathematics: "C", English: "A" }
    }
  ],
  teachers: [
    {
      id: "TEA001",
      name: "Ms. Sharma",
      role: "Class Teacher",
      class: "10A",
      subject: "All",
      email: "sharma@school.com"
    },
    {
      id: "TEA002",
      name: "Mr. Singh",
      role: "Subject Teacher",
      class: "10A",
      subject: "Mathematics",
      email: "singh@school.com"
    },
    {
      id: "TEA003",
      name: "Ms. Rao",
      role: "Class Teacher",
      class: "10B",
      subject: "All",
      email: "rao@school.com"
    }
  ],
  parents: [
    {
      id: "PAR001",
      name: "Mr. Smith",
      child: "John Smith",
      email: "mrsmith@school.com"
    },
    {
      id: "PAR002",
      name: "Mrs. Johnson",
      child: "Sarah Johnson",
      email: "mrsjohnson@school.com"
    }
  ],
  classes: ["10A", "10B"]
};

const initialMessages = [
  {
    from: "Admin",
    to: "Ms. Sharma",
    content: "Schedule submitted.",
    date: "2025-11-01"
  },
  {
    from: "Ms. Sharma",
    to: "Admin",
    content: "Leave request for Tuesday.",
    date: "2025-11-02"
  },
  {
    from: "Admin",
    to: "Mr. Smith",
    content: "Parent-teacher meeting Friday.",
    date: "2025-11-03"
  }
];

export default function AdminDashboard() {
  const [section, setSection] = useState("students"); // Default to Students view
  const [institution, setInstitution] = useState(initialInstitution);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [msgInput, setMsgInput] = useState("");
  const [msgTo, setMsgTo] = useState("");
  const [messageType, setMessageType] = useState("student"); // or teacher, parent

  const [addForm, setAddForm] = useState({
    id: "",
    name: "",
    class: institution.classes[0],
    parent: "",
    email: "",
    attendance: "",
    grade: "",
    subjects: {}
  });

  // --- Add Student (Admission) ---
  function handleAddStudent(e) {
    e.preventDefault();
    setInstitution((current) => ({
      ...current,
      students: [...current.students, { ...addForm }]
    }));
    setAddForm({
      id: "",
      name: "",
      class: institution.classes[0],
      parent: "",
      email: "",
      attendance: "",
      grade: "",
      subjects: {}
    });
    setSection("students");
  }

  // --- Edit Student ---
  function handleEditStudent(student) {
    setEditUser({ ...student });
  }
  function handleSaveEditStudent() {
    setInstitution((current) => ({
      ...current,
      students: current.students.map((s) =>
        s.id === editUser.id ? { ...editUser } : s
      )
    }));
    setEditUser(null);
    setSelectedUser(null);
  }
  function handleCancelEdit() {
    setEditUser(null);
  }

  // --- Move/Assign Student Section ---
  function handleSectionChange(studentId, newClass) {
    setInstitution((current) => ({
      ...current,
      students: current.students.map((s) =>
        s.id === studentId ? { ...s, class: newClass } : s
      )
    }));
  }

  // --- Messaging handler ---
  function handleSendMessage(e) {
    e.preventDefault();
    if (msgInput && msgTo) {
      setMessages([
        ...messages,
        {
          from: "Admin",
          to: msgTo,
          content: msgInput,
          date: new Date().toLocaleString()
        }
      ]);
      setMsgInput("");
      setMsgTo("");
    }
  }

  // --- Analytics data
  const studentCount = institution.students.length;
  const teacherCount = institution.teachers.length;
  const parentCount = institution.parents.length;
  const classStats = institution.classes.map((cls) => ({
    name: cls,
    students: institution.students.filter((s) => s.class === cls).length,
    teachers: institution.teachers.filter((t) => t.class === cls).length
  }));

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "30px 0",
        background: "#f5f7fa"
      }}
    >
      <div
        style={{
          width: "97vw",
          margin: "auto",
          padding: "34px",
          background: "#fff",
          borderRadius: "20px",
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
            Admin Dashboard — Complete Institution Access
          </h2>
          <NotificationsBellForAdmin />
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "1.2rem",
            marginBottom: "24px",
            justifyContent: "center"
          }}
        >
          <NavBtn
            text="Overview"
            sel={section === "overview"}
            onClick={() => setSection("overview")}
          />
          <NavBtn
            text="Students"
            sel={section === "students"}
            onClick={() => setSection("students")}
          />
          <NavBtn
            text="Admit Student"
            sel={section === "admit"}
            onClick={() => setSection("admit")}
          />
          <NavBtn
            text="Teachers"
            sel={section === "teachers"}
            onClick={() => setSection("teachers")}
          />
          <NavBtn
            text="Parents"
            sel={section === "parents"}
            onClick={() => setSection("parents")}
          />
          <NavBtn
            text="Analytics"
            sel={section === "analytics"}
            onClick={() => setSection("analytics")}
          />
          <NavBtn
            text="Messaging"
            sel={section === "messaging"}
            onClick={() => setSection("messaging")}
          />
          <NavBtn
            text="Manage Sections"
            sel={section === "sections"}
            onClick={() => setSection("sections")}
          />
        </div>

        {/* --- Overview --- */}
        {section === "overview" && (
          <div>
            <SectionTitle title="Institution Summary" />
            <div
              style={{
                display: "flex",
                gap: "1.4rem",
                marginBottom: "34px"
              }}
            >
              <SummaryCard label="Total Students" value={studentCount} />
              <SummaryCard label="Total Teachers" value={teacherCount} />
              <SummaryCard label="Total Parents" value={parentCount} />
              <SummaryCard
                label="Total Classes"
                value={institution.classes.length}
              />
            </div>
            <SectionTitle title="Recent Messages" />
            <ul>
              {messages
                .filter((msg) => msg.from === "Admin" || msg.to === "Admin")
                .slice(-5)
                .map((msg, i) => (
                  <li key={i}>
                    <b>{msg.from}</b> → <b>{msg.to}</b>: {msg.content}{" "}
                    <span style={{ color: "#888" }}>{msg.date}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* --- Students list with edit --- */}
        {section === "students" && (
          <div>
            <SectionTitle title="Student List & Details" />
            <StudentsTable
              students={institution.students}
              onView={setSelectedUser}
              onEdit={handleEditStudent}
            />
            {selectedUser && !editUser && (
              <UserDetails
                user={selectedUser}
                type="Student"
                onClose={() => setSelectedUser(null)}
              />
            )}
            {editUser && (
              <EditStudentForm
                user={editUser}
                setUser={setEditUser}
                classes={institution.classes}
                onSave={handleSaveEditStudent}
                onCancel={handleCancelEdit}
              />
            )}
          </div>
        )}

        {/* --- Student admission --- */}
        {section === "admit" && (
          <div>
            <SectionTitle title="Admit New Student" />
            <form
              onSubmit={handleAddStudent}
              style={{
                background: "#f5f7fa",
                padding: "18px",
                borderRadius: "10px",
                maxWidth: 420,
                margin: "auto"
              }}
            >
              <div>
                <label>
                  ID:{" "}
                  <input
                    required
                    value={addForm.id}
                    onChange={(e) =>
                      setAddForm({ ...addForm, id: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Name:{" "}
                  <input
                    required
                    value={addForm.name}
                    onChange={(e) =>
                      setAddForm({ ...addForm, name: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Class:{" "}
                  <select
                    value={addForm.class}
                    onChange={(e) =>
                      setAddForm({ ...addForm, class: e.target.value })
                    }
                  >
                    {institution.classes.map((cls) => (
                      <option value={cls} key={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Parent:{" "}
                  <input
                    value={addForm.parent}
                    onChange={(e) =>
                      setAddForm({ ...addForm, parent: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:{" "}
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) =>
                      setAddForm({ ...addForm, email: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Attendance:{" "}
                  <input
                    value={addForm.attendance}
                    onChange={(e) =>
                      setAddForm({ ...addForm, attendance: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Grade:{" "}
                  <input
                    value={addForm.grade}
                    onChange={(e) =>
                      setAddForm({ ...addForm, grade: e.target.value })
                    }
                  />
                </label>
              </div>
              <button
                style={{
                  marginTop: 12,
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "7px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold"
                }}
              >
                Admit
              </button>
            </form>
          </div>
        )}

        {/* --- Teachers --- */}
        {section === "teachers" && (
          <div>
            <SectionTitle title="Teacher List & Details" />
            <TeachersTable
              teachers={institution.teachers}
              onView={setSelectedUser}
            />
            {selectedUser && (
              <UserDetails
                user={selectedUser}
                type="Teacher"
                onClose={() => setSelectedUser(null)}
              />
            )}
          </div>
        )}

        {/* --- Parents --- */}
        {section === "parents" && (
          <div>
            <SectionTitle title="Parent List & Details" />
            <ParentsTable
              parents={institution.parents}
              onView={setSelectedUser}
            />
            {selectedUser && (
              <UserDetails
                user={selectedUser}
                type="Parent"
                onClose={() => setSelectedUser(null)}
              />
            )}
          </div>
        )}

        {/* --- Analytics --- */}
        {section === "analytics" && (
          <div>
            <SectionTitle title="Class/Subject/Teacher Analytics" />
            <div>
              <b>Class Overview:</b>
              <table
                style={{
                  marginBottom: "24px",
                  marginTop: 8,
                  width: "100%",
                  background: "#f5f7fa",
                  borderRadius: "8px"
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Class</th>
                    <th style={thStyle}>Students</th>
                    <th style={thStyle}>Teachers</th>
                  </tr>
                </thead>
                <tbody>
                  {classStats.map((cls, i) => (
                    <tr key={i}>
                      <td style={tdStyle}>{cls.name}</td>
                      <td style={tdStyle}>{cls.students}</td>
                      <td style={tdStyle}>{cls.teachers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <b>Subject Analysis:</b>
              <ul>
                {["Mathematics", "English"].map((subj) => (
                  <li key={subj}>
                    <span
                      style={{ color: "#2979ff", fontWeight: "bold" }}
                    >
                      {subj}
                    </span>
                    : Avg Grade{" "}
                    {Math.round(
                      institution.students
                        .map((s) => s.subjects[subj])
                        .map((g) =>
                          g === "A"
                            ? 90
                            : g === "B"
                            ? 80
                            : g === "C"
                            ? 70
                            : g === "A-"
                            ? 85
                            : g === "B+"
                            ? 83
                            : 75
                        )
                        .reduce((a, b) => a + b, 0) /
                        institution.students.length
                    ) || "N/A"}
                  </li>
                ))}
              </ul>
              <b>Teacher Analysis:</b>
              <ul>
                {institution.teachers.map((t) => (
                  <li key={t.id}>
                    <span style={{ fontWeight: "bold" }}>{t.name}</span>{" "}
                    ({t.role}, {t.subject}): Class {t.class}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* --- Messaging Center --- */}
        {section === "messaging" && (
          <div>
            <SectionTitle title="Admin Messaging Center" />
            <form onSubmit={handleSendMessage} style={{ marginBottom: "22px" }}>
              <b>Send Message To:</b>{" "}
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                style={{ marginRight: "6px" }}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
              <select
                value={msgTo}
                onChange={(e) => setMsgTo(e.target.value)}
                style={{ marginRight: "7px" }}
                required
              >
                <option value="">Select recipient...</option>
                {messageType === "student" &&
                  institution.students.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                {messageType === "teacher" &&
                  institution.teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                {messageType === "parent" &&
                  institution.parents.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Type your message"
                style={{ minWidth: "180px", marginRight: "8px" }}
                required
              />
              <button
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "7px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold"
                }}
              >
                Send
              </button>
            </form>
            <b>Log (last 5 messages):</b>
            <ul>
              {messages
                .slice(-5)
                .reverse()
                .map((msg, i) => (
                  <li key={i}>
                    <b>{msg.from}</b> → <b>{msg.to}</b>: {msg.content}
                    <span
                      style={{ color: "#888", marginLeft: 8 }}
                    >
                      {msg.date}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* --- Section Management --- */}
        {section === "sections" && (
          <div>
            <SectionTitle title="Assign/Move Students By Section/Class" />
            <table
              style={{
                width: "100%",
                background: "#f5f7fa",
                borderCollapse: "collapse",
                borderRadius: "10px"
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Current Class</th>
                  <th style={thStyle}>New Class</th>
                </tr>
              </thead>
              <tbody>
                {institution.students.map((s) => (
                  <tr key={s.id}>
                    <td style={tdStyle}>{s.id}</td>
                    <td style={tdStyle}>{s.name}</td>
                    <td style={tdStyle}>{s.class}</td>
                    <td style={tdStyle}>
                      <select
                        value={s.class}
                        onChange={(e) =>
                          handleSectionChange(s.id, e.target.value)
                        }
                      >
                        {institution.classes.map((cls) => (
                          <option value={cls} key={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "1.5rem" }}>
              <b>Assign Students to Teachers:</b>
              <ul>
                {institution.teachers.map((t) => (
                  <li key={t.id}>
                    <b>{t.name}</b> ({t.role}): Manages <b>{t.class}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Presentational and edit helpers ---
function NavBtn({ text, sel, onClick }) {
  return (
    <button
      style={{
        background: sel ? "#2979ff" : "#f5f7fa",
        color: sel ? "#fff" : "#2979ff",
        border: "1.25px solid #2979ff",
        borderRadius: "6px",
        padding: "7px 16px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      {text}
    </button>
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

function SummaryCard({ label, value }) {
  return (
    <div
      style={{
        background: "#f5f7fa",
        borderRadius: "10px",
        padding: "1rem 2rem",
        minWidth: "140px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        fontWeight: "bold",
        color: "#2979ff",
        fontSize: "1.1rem"
      }}
    >
      <div
        style={{
          fontSize: "2.08rem",
          fontWeight: "bold"
        }}
      >
        {value}
      </div>
      <div>{label}</div>
    </div>
  );
}

function StudentsTable({ students, onView, onEdit }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#f5f7fa",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Class</th>
          <th style={thStyle}>Parent</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Grade</th>
          <th style={thStyle}>Attendance</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td style={tdStyle}>{s.id}</td>
            <td style={tdStyle}>{s.name}</td>
            <td style={tdStyle}>{s.class}</td>
            <td style={tdStyle}>{s.parent}</td>
            <td style={tdStyle}>{s.email}</td>
            <td style={tdStyle}>{s.grade}</td>
            <td style={tdStyle}>{s.attendance}</td>
            <td style={tdStyle}>
              <button
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  fontSize: "0.98rem",
                  cursor: "pointer",
                  marginRight: "6px"
                }}
                onClick={() => onView(s)}
              >
                View
              </button>
              <button
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  fontSize: "0.98rem",
                  cursor: "pointer"
                }}
                onClick={() => onEdit(s)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TeachersTable({ teachers, onView }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#f5f7fa",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Role</th>
          <th style={thStyle}>Class</th>
          <th style={thStyle}>Subject</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Details</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((t) => (
          <tr key={t.id}>
            <td style={tdStyle}>{t.id}</td>
            <td style={tdStyle}>{t.name}</td>
            <td style={tdStyle}>{t.role}</td>
            <td style={tdStyle}>{t.class}</td>
            <td style={tdStyle}>{t.subject}</td>
            <td style={tdStyle}>{t.email}</td>
            <td style={tdStyle}>
              <button
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "4px 14px",
                  borderRadius: "5px",
                  fontSize: "0.98rem",
                  cursor: "pointer"
                }}
                onClick={() => onView(t)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ParentsTable({ parents, onView }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "#f5f7fa",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Child</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Details</th>
        </tr>
      </thead>
      <tbody>
        {parents.map((p) => (
          <tr key={p.id}>
            <td style={tdStyle}>{p.id}</td>
            <td style={tdStyle}>{p.name}</td>
            <td style={tdStyle}>{p.child}</td>
            <td style={tdStyle}>{p.email}</td>
            <td style={tdStyle}>
              <button
                style={{
                  background: "#2979ff",
                  color: "#fff",
                  border: "none",
                  padding: "4px 14px",
                  borderRadius: "5px",
                  fontSize: "0.98rem",
                  cursor: "pointer"
                }}
                onClick={() => onView(p)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UserDetails({ user, type, onClose }) {
  return (
    <div
      style={{
        background: "#f5f7fa",
        borderRadius: "10px",
        boxShadow: "0 1px 9px rgba(0,0,0,0.05)",
        padding: "1.6rem",
        margin: "2rem auto 0 auto",
        maxWidth: "680px"
      }}
    >
      <h3 style={{ color: "#2979ff" }}>
        {type} Details: {user.name} ({user.id || ""})
      </h3>
      <ul>
        {Object.entries(user).map(
          ([key, val], i) =>
            key !== "id" &&
            key !== "name" && (
              <li key={i}>
                <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b>{" "}
                {typeof val === "object" ? JSON.stringify(val) : val}
              </li>
            )
        )}
      </ul>
      <button
        style={{
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "7px 17px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          float: "right"
        }}
        onClick={onClose}
      >
        Close Details
      </button>
    </div>
  );
}

function EditStudentForm({ user, setUser, classes, onSave, onCancel }) {
  return (
    <form
      style={{
        background: "#f5f7fa",
        padding: "18px",
        borderRadius: "10px",
        maxWidth: 500,
        margin: "auto",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <h3 style={{ color: "#2979ff" }}>Edit Student ({user.id})</h3>
      <label>
        Name:{" "}
        <input
          value={user.name}
          onChange={(e) => setUser((f) => ({ ...f, name: e.target.value }))}
        />
      </label>
      <br />
      <label>
        Class:{" "}
        <select
          value={user.class}
          onChange={(e) =>
            setUser((f) => ({ ...f, class: e.target.value }))
          }
        >
          {classes.map((cls) => (
            <option value={cls} key={cls}>
              {cls}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Parent:{" "}
        <input
          value={user.parent}
          onChange={(e) =>
            setUser((f) => ({ ...f, parent: e.target.value }))
          }
        />
      </label>
      <br />
      <label>
        Email:{" "}
        <input
          value={user.email}
          onChange={(e) =>
            setUser((f) => ({ ...f, email: e.target.value }))
          }
        />
      </label>
      <br />
      <label>
        Attendance:{" "}
        <input
          value={user.attendance}
          onChange={(e) =>
            setUser((f) => ({ ...f, attendance: e.target.value }))
          }
        />
      </label>
      <br />
      <label>
        Grade:{" "}
        <input
          value={user.grade}
          onChange={(e) =>
            setUser((f) => ({ ...f, grade: e.target.value }))
          }
        />
      </label>
      <br />
      <button
        style={{
          background: "#388e3c",
          color: "#fff",
          border: "none",
          padding: "7px 17px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{
          marginLeft: "12px",
          background: "#d32f2f",
          color: "#fff",
          border: "none",
          padding: "7px 17px",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Cancel
      </button>
    </form>
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
