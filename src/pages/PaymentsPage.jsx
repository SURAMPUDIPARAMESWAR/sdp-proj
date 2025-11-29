import React, { useState } from "react";

export default function PaymentsPage() {
  const [amount, setAmount] = useState("500");
  const [note, setNote] = useState("Tuition Fee - Term 1");
  const [isHuman, setIsHuman] = useState(false);
  const [status, setStatus] = useState(null);

  const handlePay = (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isHuman) {
      setStatus("Please confirm that you are human before proceeding.");
      return;
    }

    // In a real app, redirect to Stripe/razorpay etc.
    // Here we just simulate success.
    const payload = { amount, note };
    console.log("Mock payment payload:", payload);
    setStatus("Payment simulated successfully (mock).");
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
          maxWidth: "600px",
          margin: "auto",
          padding: "28px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.09)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Fee Payment (Mock Gateway)
        </h2>
        <p style={{ marginBottom: "1.2rem", color: "#555", fontSize: "0.95rem" }}>
          This screen simulates an integration with a payment gateway.
          In a production system you would redirect to Stripe/Razorpay and then
          update payment status in your database.
        </p>

        <form
          onSubmit={handlePay}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#f5f7fa",
            padding: "16px",
            borderRadius: "10px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>Amount (₹)</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #c5c9d3"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontWeight: "bold" }}>Description</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #c5c9d3"
              }}
            />
          </div>

          <div
            style={{
              marginTop: "8px",
              padding: "8px 10px",
              borderRadius: "8px",
              background: "#e0ecff",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <input
              id="human-check"
              type="checkbox"
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)}
            />
            <label htmlFor="human-check" style={{ fontSize: "0.9rem" }}>
              I am a human and not an automated bot.
            </label>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "10px 18px",
              background: "#2979ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              alignSelf: "flex-start"
            }}
          >
            Pay Now
          </button>

          {status && (
            <span
              style={{
                marginTop: "6px",
                color: status.startsWith("Payment") ? "green" : "red",
                fontSize: "0.9rem"
              }}
            >
              {status}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
