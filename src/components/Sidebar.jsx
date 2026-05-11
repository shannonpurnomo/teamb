export default function Sidebar({ current, setPage }) {
  const items = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "sense", icon: "🔍", label: "Sense & Predict" },
    { id: "optimize", icon: "🎯", label: "Optimize" },
    { id: "simulate", icon: "📐", label: "Simulate" },
    { id: "govern", icon: "🛡️", label: "Govern & Execute" },
    { id: "learn", icon: "📚", label: "Learn" },
  ];

  return (
    <div className="sidebar">
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "10px" }}>
          🧠 AI Pricing
          <br />
          Co-pilot
        </div>
        <div style={{ fontSize: "0.92rem", color: "#94a3b8", marginBottom: "34px", lineHeight: 1.6 }}>
          Theme Park Revenue Intelligence Platform
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`nav-item ${current === item.id ? "active" : ""}`}
          >
            <span style={{ marginRight: "10px" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px" }}>ACTIVE MANAGER</div>
        <div style={{ fontWeight: 700, fontSize: "1rem" }}>Rachel Lam</div>
        <div style={{ fontSize: "0.88rem", color: "#cbd5e1", marginTop: "4px" }}>Revenue Operations Director</div>
      </div>
    </div>
  );
}