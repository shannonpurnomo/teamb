// Optimize.jsx - Perbaikan untuk voucher

import { useState } from "react";

export default function Optimize({ setPage, setSelectedBundleForSimulate }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hello! I'm your AI pricing assistant. Choose an option below to modify the selected bundle:" },
  ]);
  const [modifiedBundle, setModifiedBundle] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const strategies = [
    {
      id: 1,
      name: "Rainy-Day Family Bundle",
      price: "HK$ 380 (Standard: HK$ 450)",
      discount: 20,  // simpan sebagai angka
      discountDisplay: "20%",
      voucher: 50,    // simpan sebagai angka
      voucherDisplay: "HK$50",
      target: "Family",
      benefits: [
        "20% discount on all indoor attractions",
        "HK$50 dining voucher for family meals",
        "FastPass priority entry for indoor zones",
        "Weather protection guarantee",
      ],
      impact: "+12% revenue uplift",
      reason: "Heavy rain forecast increases indoor demand. Redirects families from outdoor to indoor zones, reducing queue pressure.",
      agentScores: { rev: 88, ops: 84, trust: 91 },
      weights: { rev: 30, ops: 50, trust: 20 },
    },
    {
      id: 2,
      name: "Peak Holiday Surge Strategy",
      price: "HK$ 520 (Peak: +HK$ 70 premium)",
      discount: 0,
      discountDisplay: "0% (premium pricing)",
      voucher: 0,
      voucherDisplay: "HK$0",
      target: "All",
      benefits: [
        "Premium pricing for peak hours (2-6pm)",
        "FastPass bundle included (skip queues)",
        "VIP lounge access during peak",
        "Priority photo session booking",
      ],
      impact: "+18% revenue uplift",
      reason: "Holiday surge expected with high visitor numbers. Premium pricing captures willingness to pay while FastPass reduces operational strain.",
      agentScores: { rev: 92, ops: 78, trust: 85 },
      weights: { rev: 20, ops: 60, trust: 20 },
    },
    {
      id: 3,
      name: "Night Ticket Recovery Plan",
      price: "HK$ 280 (Evening: -HK$ 50 discount)",
      discount: 15,
      discountDisplay: "15%",
      voucher: 30,
      voucherDisplay: "HK$30",
      target: "Solo/Couple",
      benefits: [
        "Discounted evening entry (after 5pm)",
        "HK$30 retail voucher for merchandise",
        "Extended park hours access",
        "Night show complimentary ticket",
      ],
      impact: "+8% occupancy uplift",
      reason: "Low evening attendance detected. Discounted pricing activates idle capacity and increases overall daily revenue.",
      agentScores: { rev: 72, ops: 70, trust: 85 },
      weights: { rev: 50, ops: 20, trust: 30 },
    },
  ];

  const chatOptions = [
    { 
      text: "💰 Increase discount by 5%", 
      action: "increase_discount", 
      bundleMod: (b) => ({ 
        ...b, 
        discount: Math.min(50, b.discount + 5),
        discountDisplay: `${Math.min(50, b.discount + 5)}%`,
        impact: `+${Math.round(Math.min(50, b.discount + 5) * 0.6)}% revenue uplift` 
      }) 
    },
    { 
      text: "💰 Decrease discount by 5%", 
      action: "decrease_discount", 
      bundleMod: (b) => ({ 
        ...b, 
        discount: Math.max(0, b.discount - 5),
        discountDisplay: `${Math.max(0, b.discount - 5)}%`,
        impact: `+${Math.round(Math.max(0, b.discount - 5) * 0.6)}% revenue uplift` 
      }) 
    },
    { 
      text: "🎫 Increase voucher by HK$20", 
      action: "increase_voucher", 
      bundleMod: (b) => ({ 
        ...b, 
        voucher: b.voucher + 20,
        voucherDisplay: `HK$${b.voucher + 20}` 
      }) 
    },
    { 
      text: "🎫 Decrease voucher by HK$20", 
      action: "decrease_voucher", 
      bundleMod: (b) => ({ 
        ...b, 
        voucher: Math.max(0, b.voucher - 20),
        voucherDisplay: `HK$${Math.max(0, b.voucher - 20)}` 
      }) 
    },
    { 
      text: "🎯 Change target to Family", 
      action: "target_family", 
      bundleMod: (b) => ({ 
        ...b, 
        target: "Family",
        agentScores: { rev: 88, ops: 84, trust: 91 } 
      }) 
    },
    { 
      text: "🎯 Change target to Couple", 
      action: "target_couple", 
      bundleMod: (b) => ({ 
        ...b, 
        target: "Couple",
        agentScores: { rev: 80, ops: 78, trust: 85 } 
      }) 
    },
    { 
      text: "🔄 Reset to original", 
      action: "reset", 
      bundleMod: (b) => {
        const original = strategies.find(s => s.name === b.originalName || s.name === b.name);
        if (original) {
          return { 
            ...original,
            originalName: original.name,
            discountDisplay: original.discountDisplay,
            voucherDisplay: original.voucherDisplay,
          };
        }
        return b;
      } 
    },
  ];

  const handleChatOption = (option) => {
    if (!selectedBundle) {
      setChatHistory([...chatHistory, { role: "ai", text: "Please select a bundle first before modifying!" }]);
      return;
    }

    // Simpan nama asli untuk reset
    const bundleWithOriginal = { ...selectedBundle, originalName: selectedBundle.name };
    const modified = option.bundleMod(bundleWithOriginal);
    setModifiedBundle(modified);
    
    let responseText = "";
    if (option.action === "increase_discount") {
      responseText = `✅ Discount increased to ${modified.discount}%. Projected impact: ${modified.impact}`;
    } else if (option.action === "decrease_discount") {
      responseText = `✅ Discount decreased to ${modified.discount}%. Projected impact: ${modified.impact}`;
    } else if (option.action === "increase_voucher") {
      responseText = `✅ Voucher increased to ${modified.voucherDisplay}. This will boost conversion by approximately 15%.`;
    } else if (option.action === "decrease_voucher") {
      responseText = `✅ Voucher decreased to ${modified.voucherDisplay}. Margin improved by 8%.`;
    } else if (option.action === "target_family") {
      responseText = `✅ Target changed to Family. Bundle optimized for family segment with higher trust score.`;
    } else if (option.action === "target_couple") {
      responseText = `✅ Target changed to Couple. Bundle optimized for couple segment.`;
    } else if (option.action === "reset") {
      responseText = `🔄 Bundle reset to original configuration.`;
    }
    
    setChatHistory([...chatHistory, { role: "user", text: option.text }, { role: "ai", text: responseText }]);
  };

  const handleSelectBundle = (bundle) => {
    setSelectedBundle(bundle);
    setSelectedBundleForSimulate(bundle);
    setModifiedBundle(null);
    setChatHistory([
      { role: "ai", text: `Selected: ${bundle.name}. You can now modify it using the options below or proceed to simulate.` },
    ]);
  };

  const getDisplayBundle = () => {
    if (modifiedBundle) return modifiedBundle;
    return selectedBundle;
  };

  const displayBundle = getDisplayBundle();

  // Helper untuk menampilkan diskon dan voucher
  const getDiscountDisplay = (b) => b.discountDisplay || `${b.discount}%`;
  const getVoucherDisplay = (b) => b.voucherDisplay || `HK$${b.voucher}`;

  return (
    <>
      <div className="card">
        <div className="section-title">🎯 Optimize — AI Pricing & Bundle Engine</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ color: "#64748b", lineHeight: 1.6, maxWidth: "600px" }}>
            The AI engine converts demand forecasts, visitor flow pressure, weather signals, and segment sensitivity into
            explainable pricing-product strategies.
          </div>
          <button onClick={() => setChatOpen(!chatOpen)} className="primary-btn" style={{ background: chatOpen ? "#dc2626" : "#1f6e7e" }}>
            {chatOpen ? "Close AI Assistant" : "🤖 Open AI Assistant"}
          </button>
        </div>

        {/* AI Chatbot dengan tombol pilihan */}
        {chatOpen && (
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "20px",
              marginBottom: "24px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <div style={{ background: "#1f6e7e", color: "white", padding: "12px 16px", fontWeight: "bold" }}>🤖 AI Pricing Assistant</div>
            <div style={{ height: "250px", overflowY: "auto", padding: "16px" }}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: "12px", textAlign: msg.role === "user" ? "right" : "left" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: msg.role === "user" ? "#1f6e7e" : "#e2e8f0",
                      color: msg.role === "user" ? "white" : "#1e293b",
                      padding: "8px 14px",
                      borderRadius: "18px",
                      maxWidth: "80%",
                      fontSize: "0.9rem",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px", borderTop: "1px solid #e2e8f0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {chatOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChatOption(option)}
                  style={{
                    background: "#e2e8f0",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "#1e293b",
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modified Bundle Indicator */}
        {modifiedBundle && (
          <div
            style={{
              background: "#dcfce7",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #22c55e",
            }}
          >
            <strong>✏️ Modified Strategy Applied:</strong> 
            {modifiedBundle.discount !== undefined && ` Discount: ${getDiscountDisplay(modifiedBundle)}`}
            {modifiedBundle.voucher !== undefined && ` | Voucher: ${getVoucherDisplay(modifiedBundle)}`}
            {modifiedBundle.target !== undefined && ` | Target: ${modifiedBundle.target}`}
          </div>
        )}

        {/* Bundle Cards */}
        <div className="kpi-grid">
          {strategies.map((item) => (
            <div
              key={item.id}
              className={`kpi-card ${selectedBundle?.id === item.id ? "selected" : ""}`}
              style={{
                cursor: "pointer",
                border: selectedBundle?.id === item.id ? "2px solid #1f6e7e" : "1px solid #e2e8f0",
                background: selectedBundle?.id === item.id ? "#eef6fc" : "white",
              }}
              onClick={() => handleSelectBundle(item)}
            >
              <div>
                <div className="badge blue">AI Generated</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "14px", marginBottom: "8px" }}>{item.name}</div>
                <div style={{ fontWeight: 600, color: "#2563eb", marginBottom: "8px" }}>{item.price}</div>
                <div style={{ marginBottom: "12px" }}>
                  <strong>Includes:</strong>
                  <ul style={{ margin: "4px 0", paddingLeft: "20px" }}>
                    {item.benefits.map((benefit, idx) => (
                      <li key={idx} style={{ color: "#64748b", fontSize: "0.85rem" }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: "12px", fontStyle: "italic", color: "#374151", fontSize: "0.85rem" }}>
                  <strong>Reason:</strong> {item.reason}
                </div>
                <div style={{ fontWeight: 700 }}>{item.impact}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "8px" }}>
                  Discount: {getDiscountDisplay(item)} | Voucher: {getVoucherDisplay(item)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px", textAlign: "right" }}>
          <button
            className="primary-btn"
            onClick={() => {
              if (displayBundle) {
                setSelectedBundleForSimulate(displayBundle);
                setPage("simulate");
              }
            }}
            disabled={!displayBundle}
            style={{ opacity: displayBundle ? 1 : 0.5, cursor: displayBundle ? "pointer" : "not-allowed" }}
          >
            Simulate Selected Strategy →
          </button>
        </div>
      </div>

      <style>{`
        .kpi-card.selected {
          border: 2px solid #1f6e7e;
          background: #eef6fc;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
}