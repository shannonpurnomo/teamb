import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function LineChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={3} />
        <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
}