import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

function PatientChartByMonth({ data, statuses }) {
  const colors = ["#ea8271", "#52A0D2", "#c26c8a", "#2979A7"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={730} height={250} data={data} maxBarSize={60}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#2d2d2d" />
        {statuses.map((status, i) => (
          <Bar key={status} dataKey={status} fill={colors[i]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PatientChartByMonth;
