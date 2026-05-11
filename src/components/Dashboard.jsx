import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

export default function Dashboard({ setPage }) {
  const revenueData = [
    { name: "Mon", value: 62 },
    { name: "Tue", value: 58 },
    { name: "Wed", value: 71 },
    { name: "Thu", value: 74 },
    { name: "Fri", value: 82 },
    { name: "Sat", value: 96 },
    { name: "Sun", value: 91 },
  ];

  const segmentData = [
    { name: "Family", value: 38, color: "#2563eb" },
    { name: "Couple", value: 24, color: "#38bdf8" },
    { name: "Student", value: 18, color: "#22c55e" },
    { name: "Solo", value: 12, color: "#f59e0b" },
    { name: "Pass Holder", value: 8, color: "#a855f7" },
  ];

  const COLORS = ["#2563eb", "#38bdf8", "#22c55e", "#f59e0b", "#a855f7"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* ALERT */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg,#fff7ed,#ffedd5)",
          borderLeft: "6px solid #f97316",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 6 }}>⚠️ AI Early Warning</div>
        <div style={{ color: "#7c2d12", lineHeight: 1.6 }}>
          Heavy rain expected tomorrow afternoon (82% probability). Indoor attraction demand spike predicted.
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ background: "#fbbf24", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>
            Yellow: Moderate Risk
          </span>
          <span style={{ background: "#f97316", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>
            Orange: High Risk
          </span>
          <span style={{ background: "#dc2626", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>
            Red: Critical Risk
          </span>
        </div>
        <button className="primary-btn" style={{ marginTop: 14 }} onClick={() => setPage("sense")}>
          View Demand Analysis →
        </button>
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Forecast Revenue</div>
          <div className="kpi-value">HK$ 4.8M</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Expected Visitors</div>
          <div className="kpi-value">11,420</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Queue Pressure</div>
          <div className="kpi-value">72%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Trust Score</div>
          <div className="kpi-value">91</div>
        </div>
      </div>

      {/* RECOMMENDATION */}
      <div className="card" style={{ padding: "30px" }}>
        <div style={{ marginBottom: "18px" }}>
          <div className="section-title">🎯 AI Recommendation Engine</div>
          <div style={{ color: "#64748b", lineHeight: 1.7, maxWidth: "900px", marginTop: "8px" }}>
            Based on real-time demand signals, weather prediction, and visitor segmentation, the system recommends
            a dynamic pricing strategy to optimize revenue and reduce congestion risk.
          </div>
        </div>
        <div
          style={{
            background: "#f1f5f9",
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            lineHeight: 1.8,
          }}
        >
          <b>Recommended Action:</b>
          <br />
          Deploy <b>Rainy-Day Family Bundle</b> with:
          <br />• 20% indoor attraction discount
          <br />• HK$50 dining voucher
          <br />• FastPass priority entry for indoor zones
          <br />
          <br />
          <b>Expected Impact:</b> +12% revenue, -18% queue time, improved flow balance
        </div>
      </div>

      {/* CHARTS */}
      <div className="card">
        <div className="section-title">📊 Revenue Trend & Visitor Flow</div>
        <div className="chart-box">
          <div style={{ fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.5rem" }}>📈</span> Revenue Trend
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} dot={{ r: 5, fill: "#38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE + BAR */}
      <div className="card">
        <div className="section-title">🎟️ Segment Distribution & Demand Mix</div>
        <div className="kpi-grid">
          {/* PIE */}
          <div className="chart-box">
            <div style={{ fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.5rem" }}>🥧</span> Visitor Segments
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={segmentData} dataKey="value" label outerRadius={90}>
                  {segmentData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "#64748b" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#2563eb", borderRadius: "2px" }}></div>
                  Family
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#38bdf8", borderRadius: "2px" }}></div>
                  Couple
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#22c55e", borderRadius: "2px" }}></div>
                  Student
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "2px" }}></div>
                  Solo
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#a855f7", borderRadius: "2px" }}></div>
                  Pass Holder
                </span>
              </div>
            </div>
          </div>

          {/* BAR */}
          <div className="chart-box">
            <div style={{ fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.5rem" }}>📊</span> Demand Strength
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FOOTER INSIGHT */}
        <div className="card" style={{ background: "#0f172a", color: "white", marginTop: "32px" }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>🧠 AI Insight Summary</div>
          <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>
            System indicates high opportunity in off-peak revenue capture. Pricing elasticity strongest in family segment
            under weather disruption scenarios.
          </div>
        </div>
      </div>
    </div>
  );
}