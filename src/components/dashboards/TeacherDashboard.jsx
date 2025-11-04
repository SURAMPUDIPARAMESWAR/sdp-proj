import React, { useState } from "react";

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

  // handle teacher sending a message/suggestion/parent-message
  const handleSendMessage = (studentId, message) => {
    setStudents(students =>
      students.map(s =>
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

  // Class Teacher editing marks/attendance logic
  function handleEdit(stu) {
    setEditId(stu.id);
    // Convert grades array to object for quick edit, keep other info
    const gradesObj = {};
    stu.grades.forEach(g => { gradesObj[g.subject] = g.grade; });
    setEditForm({ ...stu, gradesObj });
  }
  function handleEditChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("grades-")) {
      const subj = name.split("-")[1];
      setEditForm(f => ({
        ...f,
        gradesObj: { ...f.gradesObj, [subj]: value }
      }));
    } else {
      setEditForm(f => ({ ...f, [name]: value }));
    }
  }
  function handleSave() {
    setStudents(students.map(s =>
      s.id === editId
        ? {
            ...s,
            attendance: editForm.attendance,
            grades: subjectsList.map(subj => ({
              subject: subj,
              date: (s.grades.find(g=>g.subject===subj)||{}).date || "2024-01-01",
              grade: editForm.gradesObj[subj]
            }))
          }
        : s
    ));
    setEditId(null);
    setEditForm(null);
  }
  function handleCancel() {
    setEditId(null);
    setEditForm(null);
  }

  // ---- Render ----
  return (
    <div style={{
      width: "100vw", minHeight: "100vh", padding: "32px 0", background: "#f5f7fa"
    }}>
      <div style={{
        width: "96vw", margin: "auto", padding: "32px", background: "#fff",
        borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            style={{
              background: role==="class_teacher" ? "#2979ff" : "#f5f7fa",
              color: role==="class_teacher" ? "#fff" : "#2979ff",
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
              background: role==="subject_teacher" ? "#2979ff" : "#f5f7fa",
              color: role==="subject_teacher" ? "#fff" : "#2979ff",
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
          />
        )}
        {role === "subject_teacher" && (
          <SubjectTeacherDashboard
            profile={teacherProfile}
            students={students}
            handleSendMessage={handleSendMessage}
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
  handleSendMessage
}) {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
      <h2 style={{textAlign:"center", marginBottom:"2.5rem"}}>
        {profile.name} — <span style={{color:"#2979ff"}}>Class Teacher ({profile.className})</span>
      </h2>
      <SectionTitle title={`All Students of Class ${profile.className}`} />
      <div style={{overflowX: "auto", marginBottom:"30px"}}>
        <table style={{width: "100%", borderCollapse:"collapse", background: "#f5f7fa", borderRadius: "8px"}}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Attendance</th>
              {subjectsList.map(subj => (
                <th key={subj} style={thStyle}>{subj} Grade</th>
              ))}
              <th style={thStyle}>Progress (All Subjects)</th>
              <th style={thStyle}>At-Risk</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, i) =>
              editId === stu.id ? (
                <tr key={stu.id} style={{background: "#fffbe6"}}>
                  <td style={tdStyle}>{stu.id}</td>
                  <td style={tdStyle}>{stu.name}</td>
                  <td style={tdStyle}>
                    <input
                      name="attendance"
                      value={editForm.attendance}
                      onChange={handleEditChange}
                      style={{width: 60}}
                    />
                  </td>
                  {subjectsList.map(subj => (
                    <td style={tdStyle} key={subj}>
                      <input
                        name={`grades-${subj}`}
                        value={editForm.gradesObj[subj]}
                        onChange={handleEditChange}
                        style={{width: 38}}
                      />
                    </td>
                  ))}
                  <td style={tdStyle}>{stu.progress.map(p => `${p.subject}: ${p.percent}%`).join(", ")}</td>
                  <td style={tdStyle}>
                    {stu.atRisk ? <span style={{color:"#d32f2f", fontWeight:"bold"}}>Yes</span> : "No"}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={handleSave} style={greenBtn}>Save</button>
                    <button onClick={handleCancel} style={redBtn}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={stu.id} style={{textAlign:"center"}}>
                  <td style={tdStyle}>{stu.id}</td>
                  <td style={tdStyle}>{stu.name}</td>
                  <td style={tdStyle}>{stu.attendance}</td>
                  {subjectsList.map(subj => {
                    const grade = (stu.grades.find(g => g.subject === subj) || {}).grade || "";
                    return <td style={tdStyle} key={subj}>{grade}</td>;
                  })}
                  <td style={tdStyle}>{stu.progress.map(p => `${p.subject}: ${p.percent}%`).join(", ")}</td>
                  <td style={tdStyle}>
                    {stu.atRisk ? <span style={{color:"#d32f2f", fontWeight:"bold"}}>Yes</span> : "No"}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEdit(stu)} style={blueBtn}>Edit</button>
                    <button
                      style={{
                        background:"#2979ff", color:"#fff", border:"none",
                        padding:"5px 15px", borderRadius:"5px", fontSize:"0.98rem", cursor:"pointer", marginLeft:"8px"
                      }}
                      onClick={() => setSelectedStudent(stu)}
                    >View</button>
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
          classTeacher={true}
        />
      )}
    </>
  );
}

// ---- SUBJECT TEACHER ----
function SubjectTeacherDashboard({ profile, students, handleSendMessage }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const subject = profile.subject;
  return (
    <>
      <h2 style={{textAlign:"center", marginBottom:"2.5rem"}}>
        {profile.name} — <span style={{color:"#2979ff"}}>Subject Teacher ({subject}, {profile.className})</span>
      </h2>
      <SectionTitle title={`Students in ${profile.className} for ${subject}`} />
      <div style={{overflowX: "auto", marginBottom:"30px"}}>
        <table style={{width: "100%", borderCollapse:"collapse", background: "#f5f7fa", borderRadius: "8px"}}>
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
              <tr key={i} style={{textAlign:"center"}}>
                <td style={tdStyle}>{stu.id}</td>
                <td style={tdStyle}>{stu.name}</td>
                <td style={tdStyle}>{stu.attendance}</td>
                <td style={tdStyle}>
                  {(stu.progress.find(p=>p.subject===subject)||{percent:"N/A"}).percent}%
                </td>
                <td style={tdStyle}>
                  {(stu.grades.find(g=>g.subject===subject)||{grade:"N/A"}).grade}
                </td>
                <td style={tdStyle}>
                  {stu.atRisk ? <span style={{color:"#d32f2f", fontWeight:"bold"}}>Yes</span> : "No"}
                </td>
                <td style={tdStyle}>
                  <button
                    style={{
                      background:"#2979ff", color:"#fff", border:"none",
                      padding:"5px 15px", borderRadius:"5px", fontSize:"0.98rem", cursor:"pointer"
                    }}
                    onClick={() => setSelectedStudent(stu)}
                  >View</button>
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
          onClose={()=>setSelectedStudent(null)}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
}

// ---- View/Edit Details/Send Msg (same as before) ----
function StudentDetails({ student, onClose, onSendMessage, classTeacher }) {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("message");
  const [subject, setSubject] = useState("");
  // New: Allow parent messages
  const types = [
    { value: "message", label: "Message to Student" },
    { value: "suggestion", label: "Suggestion to Student" },
    { value: "parent", label: "Message to Parent" }
  ];
  const subjects = student.progress.map(p => p.subject);
  return (
    <div style={{
      background:"#f5f7fa", borderRadius:"10px", boxShadow: "0 1px 9px rgba(0,0,0,0.05)",
      padding:"1.6rem", margin:"2rem auto 0 auto", maxWidth:"680px"
    }}>
      <h3 style={{color:"#2979ff"}}>Student Details: {student.name} ({student.id})</h3>
      <ul>
        <li><b>Attendance:</b> {student.attendance}</li>
        <li><b>At Risk:</b> {student.atRisk ? <span style={{color:"#d32f2f"}}>Yes</span> : "No"}</li>
      </ul>
      <b>Progress:</b>
      <ul>{student.progress.map((p,i)=> <li key={i}>{p.subject}: {p.percent}%</li>)}</ul>
      <b>Grades:</b>
      <ul>{student.grades.map((g,i)=> <li key={i}>{g.subject}: {g.grade} ({g.date})</li>)}</ul>
      <b>Action Points:</b>
      <ul>{student.actionPoints.map((msg, i)=> <li key={i}>{msg}</li>)}</ul>
      {/* Messaging form */}
      <div style={{marginTop:16, background:"#fff", padding:"1rem", borderRadius:"9px"}}>
        <b>Send {types.find(t=>t.value===type).label}</b>
        <form
          style={{marginTop:14, display:"flex", flexDirection:"column", gap:"10px"}}
          onSubmit={e=>{
            e.preventDefault();
            if(msg.trim() && (type !== "suggestion" || subject)){
              onSendMessage(student.id, { text: msg, subject, type });
              setMsg(""); setSubject("");
            }
          }}
        >
          <div>
            <select value={type} onChange={e=>setType(e.target.value)}>
              {types.map(option=><option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
            {type === "suggestion" &&
              <>
                <span style={{marginLeft:12}}>Subject:</span>
                <select
                  value={subject}
                  style={{marginLeft:6}}
                  onChange={e=>setSubject(e.target.value)}
                  required
                >
                  <option value="">Select subject</option>
                  {subjects.map(subj => <option value={subj} key={subj}>{subj}</option>)}
                </select>
              </>
            }
          </div>
          <textarea
            required
            value={msg}
            onChange={e=>setMsg(e.target.value)}
            placeholder={types.find(t=>t.value===type).label+"..."}
            style={{width:"100%", minHeight:"48px", borderRadius:"4px", border:"1px solid #bbb", fontSize:"1rem"}}
          />
          <button
            type="submit"
            style={{
              background:"#2979ff", color:"#fff", border:"none", padding:"6px 18px",
              borderRadius:"6px", fontWeight:"bold", maxWidth:"160px", alignSelf:"flex-end"
            }}
          >
            Send
          </button>
        </form>
      </div>
      <b style={{marginTop: 16, display:"block"}}>Past Messages & Suggestions:</b>
      <ul>
        {(student.messages || []).map((m,i)=>
          <li key={i}>
            <span style={{color: m.type==="parent"?"#fbc02d":(m.type==="suggestion"?"#388e3c":"#2979ff"), fontWeight:"bold"}}>
              {m.type === "suggestion" ? "[Suggestion]" : m.type==="parent" ? "[To Parent]" : "[Message]"}
            </span>{" "}
            {m.subject && m.type === "suggestion" && `[${m.subject}] `}
            {m.content}
            <span style={{color:"#888", marginLeft:8}}>{m.date}</span>
          </li>
        )}
        {!(student.messages && student.messages.length) && <li>No messages yet.</li>}
      </ul>
      <b style={{marginTop: 16, display:"block"}}>Parent Messages:</b>
      <ul>
        {(student.messages||[]).filter(m=>m.type==="parent").map((m,i)=>
          <li key={i}>
            <span style={{color:"#fbc02d", fontWeight:"bold"}}>[To Parent]</span> {m.content}
            <span style={{color:"#888", marginLeft:8}}>{m.date}</span>
          </li>
        )}
        {!((student.messages||[]).filter(m=>m.type==="parent").length) && <li>No parent messages yet.</li>}
      </ul>
      <button
        style={{
          background:"#d32f2f", color:"#fff", border:"none",
          padding:"8px 16px", borderRadius:"6px", cursor:"pointer",
          fontWeight:"bold", float:"right", marginTop:"-10px"
        }}
        onClick={onClose}
      >Close Details</button>
    </div>
  );
}

function SubjectStudentDetails({ student, subject, onClose, onSendMessage }) {
  const [msg, setMsg] = useState("");
  const [forParent, setForParent] = useState(false);
  return (
    <div style={{
      background:"#f5f7fa", borderRadius:"10px", boxShadow: "0 1px 9px rgba(0,0,0,0.05)",
      padding:"1.6rem", margin:"2rem auto 0 auto", maxWidth:"680px"
    }}>
      <h3 style={{color:"#2979ff"}}>Student Details: {student.name} ({student.id})</h3>
      <ul>
        <li><b>Attendance:</b> {student.attendance}</li>
        <li><b>At Risk:</b> {student.atRisk ? <span style={{color:"#d32f2f"}}>Yes</span> : "No"}</li>
        <li><b>Progress in {subject}:</b> {(student.progress.find(p=>p.subject===subject)||{percent:"N/A"}).percent}%</li>
        <li><b>Grade in {subject}:</b> {(student.grades.find(g=>g.subject===subject)||{grade:"N/A", date:"-"}).grade} ({(student.grades.find(g=>g.subject===subject)||{}).date || '-'})</li>
      </ul>
      <b>Action Points:</b>
      <ul>{student.actionPoints.map((msg, i)=> <li key={i}>{msg}</li>)}</ul>
      {/* Send suggestion to student OR parent */}
      <div style={{marginTop:16, background:"#fff", padding:"1rem", borderRadius:"9px"}}>
        <b>Send Suggestion to {forParent ? "Parent" : "Student"} for {subject}</b>
        <form
          style={{marginTop:14, display:"flex", flexDirection:"column", gap:"10px"}}
          onSubmit={e => {
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
                style={{marginRight:"6px"}}
                onChange={e=>setForParent(e.target.checked)}/>
              Send to Parent
            </label>
          </div>
          <textarea
            required
            value={msg}
            onChange={e=>setMsg(e.target.value)}
            placeholder={forParent ? "Write your message to parent..." : "Write your suggestion to student..."}
            style={{width:"100%", minHeight:"48px", borderRadius:"4px", border:"1px solid #bbb", fontSize:"1rem"}}
          />
          <button
            type="submit"
            style={{
              background:"#2979ff", color:"#fff", border:"none", padding:"6px 18px",
              borderRadius:"6px", fontWeight:"bold", maxWidth:"160px", alignSelf:"flex-end"
            }}
          >
            Send
          </button>
        </form>
      </div>
      <b style={{marginTop: 16, display:"block"}}>Suggestions & Parent Messages for {subject}:</b>
      <ul>
        {(student.messages||[])
          .filter(m=>m.subject === subject && (m.type==="suggestion"||m.type==="parent"))
          .map((m,i)=>
            <li key={i}>
              <span style={{
                color: m.type==="parent"?"#fbc02d":"#388e3c",
                fontWeight:"bold"
              }}>
                {m.type==="parent"?"[To Parent]":"[Suggestion]"}
              </span>{" "}
              {m.content}
              <span style={{color:"#888", marginLeft:8}}>{m.date}</span>
            </li>
        )}
        {!((student.messages||[]).filter(m=>m.subject===subject && (m.type==="suggestion"||m.type==="parent")).length) &&
          <li>No suggestions or parent messages yet.</li>
        }
      </ul>
      <button
        style={{
          background:"#d32f2f", color:"#fff", border:"none",
          padding:"8px 16px", borderRadius:"6px", cursor:"pointer",
          fontWeight:"bold", float:"right", marginTop:"-10px"
        }}
        onClick={onClose}
      >Close Details</button>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div style={{fontWeight: "bold", fontSize: "1.2rem", color: "#2979ff", marginBottom: 20, marginTop: 6}}>
      {title}
    </div>
  );
}

// BUTTON STYLES
const thStyle = {
  padding: ".55rem 1.2rem", background:"#ecf2fc",
  color: "#296fa9", fontWeight: "bold", fontSize: "1rem", border: "none"
};
const tdStyle = {
  padding: ".55rem 1.2rem", fontSize: "1rem", border: "none"
};
const blueBtn = {
  background:"#2979ff", color:"#fff", border:"none", padding:"5px 14px", borderRadius:"6px", cursor:"pointer", fontWeight:"bold"
};
const greenBtn = {
  background:"#388e3c", color:"#fff", border:"none", padding:"5px 13px", borderRadius:"6px", cursor:"pointer", fontWeight:"bold"
};
const redBtn = {
  background:"#d32f2f", color:"#fff", border:"none", padding:"5px 13px", borderRadius:"6px", cursor:"pointer", fontWeight:"bold", marginLeft:7
};
