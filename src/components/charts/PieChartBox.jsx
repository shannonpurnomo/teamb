import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#7c3aed", "#14b8a6", "#f97316"];

export default function PieChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}