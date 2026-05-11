import { useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

export default function SensePredict() {
  const [currentWeek, setCurrentWeek] = useState(1); // 1, 2, 3, 4

  // Data 30 hari dibagi per minggu
  const weeklyData = {
    1: [
      { day: "Mon", date: "May 12", demand: 62, congestion: "Low", confidence: 91 },
      { day: "Tue", date: "May 13", demand: 58, congestion: "Low", confidence: 89 },
      { day: "Wed", date: "May 14", demand: 71, congestion: "Medium", confidence: 87 },
      { day: "Thu", date: "May 15", demand: 74, congestion: "Medium", confidence: 88 },
      { day: "Fri", date: "May 16", demand: 82, congestion: "Medium", confidence: 90 },
      { day: "Sat", date: "May 17", demand: 96, congestion: "High", confidence: 85 },
      { day: "Sun", date: "May 18", demand: 91, congestion: "High", confidence: 86 },
    ],
    2: [
      { day: "Mon", date: "May 19", demand: 85, congestion: "High", confidence: 87 },
      { day: "Tue", date: "May 20", demand: 78, congestion: "Medium", confidence: 88 },
      { day: "Wed", date: "May 21", demand: 72, congestion: "Medium", confidence: 89 },
      { day: "Thu", date: "May 22", demand: 88, congestion: "High", confidence: 85 },
      { day: "Fri", date: "May 23", demand: 84, congestion: "High", confidence: 86 },
      { day: "Sat", date: "May 24", demand: 92, congestion: "High", confidence: 84 },
      { day: "Sun", date: "May 25", demand: 86, congestion: "High", confidence: 85 },
    ],
    3: [
      { day: "Mon", date: "May 26", demand: 75, congestion: "Medium", confidence: 88 },
      { day: "Tue", date: "May 27", demand: 70, congestion: "Medium", confidence: 89 },
      { day: "Wed", date: "May 28", demand: 68, congestion: "Low", confidence: 90 },
      { day: "Thu", date: "May 29", demand: 72, congestion: "Medium", confidence: 88 },
      { day: "Fri", date: "May 30", demand: 78, congestion: "Medium", confidence: 87 },
      { day: "Sat", date: "May 31", demand: 85, congestion: "High", confidence: 86 },
      { day: "Sun", date: "Jun 1", demand: 80, congestion: "Medium", confidence: 87 },
    ],
    4: [
      { day: "Mon", date: "Jun 2", demand: 73, congestion: "Medium", confidence: 88 },
      { day: "Tue", date: "Jun 3", demand: 69, congestion: "Low", confidence: 89 },
      { day: "Wed", date: "Jun 4", demand: 75, congestion: "Medium", confidence: 88 },
      { day: "Thu", date: "Jun 5", demand: 80, congestion: "Medium", confidence: 87 },
      { day: "Fri", date: "Jun 6", demand: 86, congestion: "High", confidence: 86 },
      { day: "Sat", date: "Jun 7", demand: 90, congestion: "High", confidence: 85 },
      { day: "Sun", date: "Jun 8", demand: 84, congestion: "High", confidence: 86 },
    ],
  };

  const weekRanges = {
    1: "Week 1 (May 12 - May 18)",
    2: "Week 2 (May 19 - May 25)",
    3: "Week 3 (May 26 - Jun 1)",
    4: "Week 4 (Jun 2 - Jun 8)",
  };

  const currentData = weeklyData[currentWeek];

  const handlePrevWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 4) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const segmentData = [
    { name: "Family", value: 38 },
    { name: "Couple", value: 24 },
    { name: "Student", value: 18 },
    { name: "Solo", value: 12 },
    { name: "Pass Holder", value: 8 },
  ];

  const sensitivityData = [
    { name: "Family", score: 82 },
    { name: "Couple", score: 61 },
    { name: "Student", score: 55 },
    { name: "Tourist", score: 48 },
    { name: "Pass Holder", score: 91 },
  ];

  const COLORS = ["#2563eb", "#38bdf8", "#22c55e", "#f59e0b", "#a855f7"];

  // Hitung rata-rata untuk summary
  const avgDemand = Math.round(currentData.reduce((sum, d) => sum + d.demand, 0) / 7);
  const highCongestionDays = currentData.filter(d => d.congestion === "High").length;
  const avgConfidence = Math.round(currentData.reduce((sum, d) => sum + d.confidence, 0) / 7);

  return (
    <>
      <div className="card">
        <div className="section-title">🔍 Sense — Real-time Signal Intelligence</div>
        <div
          style={{
            backgroundColor: "#f0f9ff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            borderLeft: "4px solid #0ea5e9",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              fontSize: "0.9rem",
            }}
          >
            <div>
              <div style={{ color: "#64748b" }}>Data Sources</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#0c4a6e" }}>12 Sources</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                POS + WeChat + App + OTA + Weather API + Social Media + Queue Sensors + CRM + GPS + Ticket System + Hotel + Competitor
              </div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Refresh Cycle</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#0c4a6e" }}>Every 5 min</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Last updated: 2024-05-11 14:35:22</div>
            </div>
            <div>
              <div style={{ color: "#64748b" }}>Signal Health</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#22c55e" }}>94%</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>All sources active & connected</div>
            </div>
          </div>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Sales Signal</div>
            <div className="kpi-value">Strong</div>
            <div className="kpi-desc">Ticket sales +18% vs yesterday</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Operational Signal</div>
            <div className="kpi-value">Medium</div>
            <div className="kpi-desc">Queue pressure increasing</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">User Signal</div>
            <div className="kpi-value">Sensitive</div>
            <div className="kpi-desc">Families reacting to pricing</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">External Signal</div>
            <div className="kpi-value">Alert</div>
            <div className="kpi-desc">Rain + competitor promo detected</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">📅 Rolling Demand Calendar — 30-Day Forecast</div>

        {/* Forecast Key Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
            background: "#f8fafc",
            padding: "16px",
            borderRadius: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>FORECASTED VISITORS</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#0f172a" }}>14,850</div>
            <div style={{ fontSize: "0.7rem", color: "#22c55e" }}>Range: 13,200 - 16,500</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>CANCELLATION RISK</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#dc2626" }}>3.2%</div>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>~476 potential refunds</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>TOP CHANNEL</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#0f172a" }}>WeChat 42%</div>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Website 25% | OTA 20% | Walk-in 13%</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>PEAK VISIT TIME</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#0f172a" }}>2-6 PM</div>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Morning 18% | Afternoon 52% | Evening 30%</div>
          </div>
        </div>

        {/* Week Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <button
            onClick={handlePrevWeek}
            disabled={currentWeek === 1}
            className="primary-btn"
            style={{
              background: currentWeek === 1 ? "#cbd5e1" : "#1f6e7e",
              cursor: currentWeek === 1 ? "not-allowed" : "pointer",
              opacity: currentWeek === 1 ? 0.5 : 1,
            }}
          >
            ← Previous Week
          </button>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#1f6e7e" }}>{weekRanges[currentWeek]}</div>
          <button
            onClick={handleNextWeek}
            disabled={currentWeek === 4}
            className="primary-btn"
            style={{
              background: currentWeek === 4 ? "#cbd5e1" : "#1f6e7e",
              cursor: currentWeek === 4 ? "not-allowed" : "pointer",
              opacity: currentWeek === 4 ? 0.5 : 1,
            }}
          >
            Next Week →
          </button>
        </div>

        {/* Weekly Demand Chart */}
        <div className="chart-box" style={{ marginBottom: "24px" }}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: "Demand Index", angle: -90, position: "insideLeft" }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{ background: "white", padding: "8px 12px", border: "1px solid #ccc", borderRadius: "8px" }}>
                        <div><strong>{data.day}, {data.date}</strong></div>
                        <div>Demand: {data.demand}%</div>
                        <div>Congestion: {data.congestion}</div>
                        <div>Confidence: {data.confidence}%</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="demand" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>AVG DEMAND</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#2563eb" }}>{avgDemand}%</div>
          </div>
          <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>HIGH CONGESTION DAYS</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#f59e0b" }}>{highCongestionDays} / 7</div>
          </div>
          <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>AVG CONFIDENCE</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#22c55e" }}>{avgConfidence}%</div>
          </div>
          <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b" }}>PEAK DAY</div>
            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "#dc2626" }}>
              {currentData.reduce((max, d) => d.demand > max.demand ? d : max, currentData[0]).day}
            </div>
          </div>
        </div>

        {/* Recommendation based on current week */}
        <div style={{ background: "#fef3c7", padding: "12px", borderRadius: "12px", borderLeft: "4px solid #f59e0b" }}>
          <strong>📋 Weekly Recommendation:</strong>{' '}
          {currentWeek === 1 && "Activate rainy-day bundle for Wed-Fri (high rain probability)"}
          {currentWeek === 2 && "Prepare for peak congestion on Sat-Sun. Implement timed entry."}
          {currentWeek === 3 && "Demand softening. Consider early-bird discounts for weekdays."}
          {currentWeek === 4 && "Summer season starting. Launch family promotion bundles."}
        </div>
      </div>

      <div className="card">
        <div className="section-title">🎟️ Channel & Segment Composition</div>
        <div className="kpi-grid">
          <div className="chart-box">
            <div style={{ fontWeight: 700, marginBottom: "14px" }}>Visitor Segments</div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={segmentData} dataKey="value" outerRadius={90} label>
                  {segmentData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "#64748b" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#2563eb", borderRadius: "2px" }}></div>
                  Family 38%
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#38bdf8", borderRadius: "2px" }}></div>
                  Couple 24%
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#22c55e", borderRadius: "2px" }}></div>
                  Student 18%
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "2px" }}></div>
                  Solo 12%
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#a855f7", borderRadius: "2px" }}></div>
                  Pass Holder 8%
                </span>
              </div>
            </div>
          </div>

          <div className="chart-box">
            <div style={{ fontWeight: 700, marginBottom: "14px" }}>Price Sensitivity Matrix</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={sensitivityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip />
                <Bar dataKey="score" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>
              Higher score = less sensitive to price changes
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">🚨 Daily Alert Summary</div>
        <table className="table">
          <thead>
            <tr>
              <th>Alert</th>
              <th>Severity</th>
              <th>Impact</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Heavy rainfall tomorrow</td>
              <td><span style={{ backgroundColor: "#f59e0b", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" }}>Moderate Risk</span></td>
              <td>Indoor crowd surge</td>
              <td>Activate rainy bundles</td>
            </tr>
            <tr>
              <td>Competitor promotion</td>
              <td><span style={{ backgroundColor: "#f97316", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" }}>High Risk</span></td>
              <td>Price-sensitive churn</td>
              <td>Push dining incentives</td>
            </tr>
            <tr>
              <td>Saturday congestion risk</td>
              <td><span style={{ backgroundColor: "#dc2626", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "600" }}>Critical Risk</span></td>
              <td>Queue overload</td>
              <td>Shift flow to Friday PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}