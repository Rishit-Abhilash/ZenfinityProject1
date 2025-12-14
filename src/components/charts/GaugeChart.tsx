'use client';

import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants/colors';

interface GaugeChartProps {
  value: number;
  max?: number;
  label: string;
  color?: string;
  height?: number;
}

export function GaugeChart({
  value,
  max = 100,
  label,
  color = CHART_COLORS.accent,
  height = 200,
}: GaugeChartProps) {
  const data = [
    {
      name: label,
      value: value,
      fill: color,
    },
  ];

  return (
    <div style={{ position: 'relative', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill={color}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 900, color: '#002639' }}>
          {value.toFixed(1)}
        </div>
        <div style={{ fontSize: 14, color: '#171717', marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
