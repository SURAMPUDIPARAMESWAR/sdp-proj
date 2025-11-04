import React, { useState } from "react";

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
  // You can replace the above data with state/hooks if using live backend or session
  return (
    <div style={{
      width: "100vw", minHeight: "100vh", padding: "32px 0", background: "#f5f7fa"
    }}>
      <div style={{
        width: "96vw", margin: "auto", padding: "32px", background: "#fff",
        borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
      }}>
        <h2 style={{textAlign: "center", marginBottom: "1.5rem"}}>
          Welcome, Parent! <br /> <span style={{fontSize:"1rem"}}>You are viewing the report for <b>{child.name}</b> ({child.class})</span>
        </h2>

        <SectionTitle title="Profile Summary" />
        <div style={{background:"#f5f7fa", borderRadius:"9px", padding:"18px", marginBottom:32}}>
          <b>Student ID:</b> {child.id} <br />
          <b>Overall Grade:</b> {child.overallGrade} <br />
          <b>Attendance:</b> {child.attendance}
        </div>

        <SectionTitle title="Subject-wise Progress" />
        <div style={{display:"flex", gap:"2rem", marginBottom:"32px"}}>
          {child.progress.map((p, i) => (
            <ProgressCard key={i} subject={p.subject} percent={p.percent} />
          ))}
        </div>

        <SectionTitle title="Subject-wise Grades" />
        <table style={{
          width: "100%", borderCollapse: "collapse", background: "#f5f7fa", borderRadius: "8px",
          marginBottom: "32px"
        }}>
          <thead>
            <tr>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {child.grades.map((g, i) => (
              <tr key={i} style={{textAlign:"center"}}>
                <td style={tdStyle}>{g.subject}</td>
                <td style={tdStyle}>{g.date}</td>
                <td style={tdStyle}>{g.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle title="Action/Attention Points" />
        <ul style={{marginBottom:"2.2rem"}}>
          {child.actionPoints.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>

        <SectionTitle title="Messages from School" />
        <ul style={{background:"#f5f7fa", borderRadius:"9px", padding:"16px", marginBottom:8}}>
          {child.parentMessages.map((msg, i) => (
            <li key={i} style={{marginBottom:7}}>
              <span style={{fontWeight:"bold", color: msg.from==="Admin"?"#d32f2f":"#2979ff"}}>
                {msg.from}
              </span>: {msg.content}
              <span style={{color:"#888", marginLeft:8}}>{msg.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div style={{
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: "#2979ff",
      marginBottom: 18,
      marginTop: 13
    }}>{title}</div>
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
      <div style={{fontWeight: "bold",fontSize: "1.8rem",marginBottom: 2}}>{percent}%</div>
      <div style={{fontSize: "13.5px", opacity: 0.85}}>complete</div>
    </div>
  );
}

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
