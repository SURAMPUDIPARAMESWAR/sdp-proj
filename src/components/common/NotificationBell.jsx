// src/components/common/NotificationsBell.jsx
import React, { useState } from "react";
import { allNotifications } from "../../data/notifications";

export default function NotificationsBell({ role }) {
  const [open, setOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(allNotifications);

  const relevant = localNotifications.filter(
    (n) => n.role === role || n.role === "all"
  );
  const unreadCount = relevant.filter((n) => !n.read).length;

  const toggleOpen = () => setOpen((prev) => !prev);

  const markAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((n) =>
        n.role === role || n.role === "all" ? { ...n, read: true } : n
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
