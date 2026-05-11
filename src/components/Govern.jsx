import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

export default function Govern({ setPage }) {
  const [approved, setApproved] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());
  const [showRejectDropdown, setShowRejectDropdown] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const rejectOptions = [
    "Discount too high - fairness concern",
    "Discount too low - insufficient impact",
    "Target segment mismatch",
    "Weather forecast changed",
    "Competitor pricing changed",
    "Operational capacity insufficient",
    "PR risk too high",
    "Budget constraints",
    "Other (please specify in audit log)",
  ];

  const beforeAfterData = [
    { metric: "Revenue (HK$M)", before: 4.2, after: 4.7 },
    { metric: "Queue Time (min)", before: 48, after: 37 },
    { metric: "Refund Rate (%)", before: 3.2, after: 2.1 },
    { metric: "Satisfaction", before: 76, after: 84 },
  ];

  const channelData = [
    { channel: "WeChat", before: 28, after: 42 },
    { channel: "Website", before: 35, after: 28 },
    { channel: "OTA", before: 22, after: 18 },
    { channel: "Walk-in", before: 15, after: 12 },
  ];

  const revenueTrend = [
    { hour: "10am", before: 220, after: 245 },
    { hour: "11am", before: 380, after: 410 },
    { hour: "12pm", before: 520, after: 560 },
    { hour: "1pm", before: 610, after: 650 },
    { hour: "2pm", before: 580, after: 620 },
    { hour: "3pm", before: 490, after: 530 },
    { hour: "4pm", before: 420, after: 460 },
    { hour: "5pm", before: 350, after: 390 },
  ];

  const handleDeploy = () => {
    setDeployed(true);
    setApproved(true);
    setLastUpdated(new Date().toLocaleString());
  };

  const handleReject = () => {
    if (rejectReason) {
      alert(`Strategy rejected. Reason: "${rejectReason}". Return to dashboard.`);
      setPage("dashboard");
    } else {
      alert("Please select a reason for rejection.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-3">🛡️ Govern & Execute — Smart Approval Dashboard</h2>
        <p className="text-gray-600 mb-6">Rigid guardrail filtering, negative list enforcement, and tiered approval workflow before deployment.</p>

        {/* Guardrail Check */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="bg-slate-50 rounded-2xl p-5">
            <h3 className="font-bold mb-4">🔒 Three-Layer Constraint Filtering</h3>
            <div className="space-y-3">
              <div className="flex-between">
                <span>Magnitude Caps (±25%)</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
              <div className="flex-between">
                <span>Frequency Control (≤2 updates)</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
              <div className="flex-between">
                <span>Transparency Mandate</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5">
            <h3 className="font-bold mb-4">🚫 Negative List Enforcement</h3>
            <div className="space-y-3">
              <div className="flex-between">
                <span>Device Discrimination</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
              <div className="flex-between">
                <span>Geo-based Pricing Bias</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
              <div className="flex-between">
                <span>User Profile Bias</span>
                <span className="text-green-600 font-semibold">✅ PASS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Level */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-6">
          <h3 className="font-bold mb-4">📋 Tiered Approval Workflow</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Risk Tier</div>
              <div className="text-xl font-bold text-green-600">LOW</div>
              <div className="text-xs text-gray-500">Supervisor approval only</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Guest Impact</div>
              <div className="text-xl font-bold text-yellow-600">12,800</div>
              <div className="text-xs text-gray-500">Affected visitors</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Revenue Impact</div>
              <div className="text-xl font-bold text-blue-600">+5.2%</div>
              <div className="text-xs text-gray-500">Forecast uplift</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">PR Risk</div>
              <div className="text-xl font-bold text-green-600">LOW</div>
              <div className="text-xs text-gray-500">Social sentiment stable</div>
            </div>
          </div>
        </div>

        {/* Approve/Reject Buttons */}
        {!deployed ? (
          <div className="flex gap-4 justify-center">
            <button onClick={handleDeploy} className="primary-btn" style={{ background: "#22c55e", padding: "12px 32px" }}>
              ✅ Approve & Deploy
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowRejectDropdown(!showRejectDropdown)}
                className="btn-outline"
                style={{ background: "#ef4444", color: "white", padding: "12px 32px", border: "none", borderRadius: "40px" }}
              >
                ❌ Reject
              </button>
              {showRejectDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    minWidth: "280px",
                  }}
                >
                  <div style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "0.85rem" }}>Select rejection reason:</div>
                    <select
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        marginBottom: "12px",
                      }}
                    >
                      <option value="">-- Select a reason --</option>
                      {rejectOptions.map((reason, idx) => (
                        <option key={idx} value={reason}>{reason}</option>
                      ))}
                    </select>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => setShowRejectDropdown(false)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          background: "white",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReject}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ background: "#dcfce7", padding: "16px", borderRadius: "16px", textAlign: "center" }}>
            <strong>✅ STRATEGY DEPLOYED SUCCESSFULLY</strong>
            <br />
            <span style={{ fontSize: "0.85rem" }}>Deployed at {new Date().toLocaleTimeString()} | Channel: WeChat Mini Program | Supervisor: Zhang Wei</span>
          </div>
        )}

        {/* Deployment Results */}
        {deployed && (
          <>
            <div style={{ marginTop: "32px" }}>
              <div className="flex-between">
                <h3 className="text-xl font-bold mb-4">📊 Before vs After Comparison</h3>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Last updated: {lastUpdated}</div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={beforeAfterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" name="Before" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="after" name="After" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <h3 className="text-xl font-bold mb-4">📱 WeChat Mini Program Channel Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" name="Before (%)" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="after" name="After (%)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <h3 className="text-xl font-bold mb-4">📈 Revenue Trend (Before vs After Deployment)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="before" name="Before (HK$K)" stroke="#ef4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="after" name="After (HK$K)" stroke="#22c55e" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}