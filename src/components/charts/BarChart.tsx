'use client';

import React from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants/colors';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string | string[];
  color?: string | string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function BarChart({
  data,
  xKey,
  yKey,
  color = CHART_COLORS.accent,
  height = 300,
  showGrid = true,
  showLegend = false,
}: BarChartProps) {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];
  const colors = Array.isArray(color) ? color : [color];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />}
        <XAxis
          dataKey={xKey}
          stroke="#002639"
          style={{ fontSize: 12, fontFamily: 'Red Hat Text' }}
        />
        <YAxis
          stroke="#002639"
          style={{ fontSize: 12, fontFamily: 'Red Hat Text' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#002639',
            border: 'none',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontSize: 12,
          }}
        />
        {showLegend && <Legend />}
        {yKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[index] || colors[0]}
            radius={[8, 8, 0, 0]}
          />
        ))}
      </RechartsBar>
    </ResponsiveContainer>
  );
}
