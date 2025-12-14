'use client';

import React from 'react';
import {
  AreaChart as RechartsArea,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants/colors';

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
}

export function AreaChart({
  data,
  xKey,
  yKey,
  color = CHART_COLORS.info,
  height = 300,
  showGrid = true,
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea data={data}>
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
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          fill={color}
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
}
