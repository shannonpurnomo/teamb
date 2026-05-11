export const senseSignals = [
  {
    name: "Sales",
    value: 88,
    detail: "Ticket volume surging due to holiday presale"
  },
  {
    name: "Operational",
    value: 71,
    detail: "Queue pressure increasing at indoor zones"
  },
  {
    name: "User",
    value: 64,
    detail: "Family segment highly price sensitive"
  },
  {
    name: "External",
    value: 92,
    detail: "Heavy rain + viral social media trend"
  }
];

export const channelBreakdown = [
  { name: "WeChat", value: 42 },
  { name: "Website", value: 25 },
  { name: "OTA", value: 20 },
  { name: "Walk-in", value: 13 }
];

export const segmentComposition = [
  { name: "Family", value: 45 },
  { name: "Couples", value: 25 },
  { name: "Tourists", value: 18 },
  { name: "Pass Holders", value: 12 }
];

export const demandForecast = [
  { day: "Mon", visitors: 7200, forecast: 7500, risk: 30 },
  { day: "Tue", visitors: 8400, forecast: 8200, risk: 40 },
  { day: "Wed", visitors: 9800, forecast: 10000, risk: 55 },
  { day: "Thu", visitors: 12000, forecast: 11800, risk: 80 },
  { day: "Fri", visitors: 14500, forecast: 15000, risk: 92 },
  { day: "Sat", visitors: 16000, forecast: 16500, risk: 96 },
  { day: "Sun", visitors: 13800, forecast: 14000, risk: 84 }
];

export const strategies = [
  {
    id: 1,
    name: "Rainy Family Recovery Bundle",
    discount: 20,
    expectedRevenue: "+5.2%",
    queueReduction: "-12 min",
    churnRisk: "Low",
    explanation:
      "Redirect families toward indoor attractions and bundled dining credits during heavy rain periods."
  },
  {
    id: 2,
    name: "Peak Crowd Control Pricing",
    discount: -10,
    expectedRevenue: "+8.4%",
    queueReduction: "-18 min",
    churnRisk: "Medium",
    explanation:
      "Premium weekend pricing combined with time-slot control to reduce overcrowding."
  },
  {
    id: 3,
    name: "Off-Peak Activation Strategy",
    discount: 30,
    expectedRevenue: "+3.8%",
    queueReduction: "Balanced",
    churnRisk: "Very Low",
    explanation:
      "Stimulate weekday traffic using bundled vouchers and student promotions."
  }
];