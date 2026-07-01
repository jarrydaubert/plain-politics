"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { PollingTrendPoint } from "@/data/demo-politics";

export function PollingChart({ data }: Readonly<{ data: PollingTrendPoint[] }>) {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data} margin={{ bottom: 8, left: 0, right: 8, top: 12 }}>
        <CartesianGrid stroke="#d9dfd4" strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#5c625d" tickLine={false} />
        <YAxis domain={[0, 50]} stroke="#5c625d" tickLine={false} />
        <Tooltip
          contentStyle={{
            border: "1px solid #d9dfd4",
            borderRadius: 6,
            boxShadow: "0 12px 30px rgb(21 24 22 / 12%)"
          }}
        />
        <Line dataKey="labour" name="Labour" stroke="#b3262f" strokeWidth={3} type="monotone" />
        <Line
          dataKey="conservative"
          name="Conservative"
          stroke="#1c5aa6"
          strokeWidth={3}
          type="monotone"
        />
        <Line dataKey="reform" name="Reform" stroke="#18a2a9" strokeWidth={3} type="monotone" />
        <Line dataKey="libDem" name="Lib Dem" stroke="#d8941b" strokeWidth={3} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
}
