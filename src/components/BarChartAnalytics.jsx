import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const BarChartAnalytics = ({ data }) => (
  <BarChart width={250} height={250} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="scans" fill="#8884d8" />
  </BarChart>
);
