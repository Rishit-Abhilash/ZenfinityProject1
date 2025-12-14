'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css';
import { useData } from '@/components/providers/DataProvider';
import { useSnapshots } from '@/hooks/useSnapshots';
import { useCycleData } from '@/hooks/useCycleData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { GaugeChart } from '@/components/charts/GaugeChart';
import {
  formatDate,
  formatDuration,
  formatDistance,
  formatSpeed,
  formatVoltage,
  formatTemperature,
  formatPercentage,
} from '@/lib/utils/formatters';
import { aggregateTemperatureRanges, calculateSOHTrend } from '@/lib/utils/calculations';
import type { TemperatureRange } from '@/types/api';

export default function Dashboard() {
  const { selectedIMEI, selectedCycle, setSelectedCycle } = useData();
  const { snapshots, isLoading: snapshotsLoading } = useSnapshots(selectedIMEI);
  const { cycle, isLoading: cycleLoading } = useCycleData(selectedIMEI, selectedCycle);

  const [tempRange, setTempRange] = useState<TemperatureRange>('5deg');

  // Reset cycle when IMEI changes and set to latest
  useEffect(() => {
    if (snapshots.length > 0) {
      const latest = Math.max(...snapshots.map(s => s.cycle_number));
      // Check if current cycle exists in this battery's snapshots
      const cycleExists = snapshots.some(s => s.cycle_number === selectedCycle);

      if (!cycleExists) {
        // Current cycle doesn't exist for this battery, reset to latest
        setSelectedCycle(latest);
      }
    }
  }, [selectedIMEI, snapshots]); // React to IMEI changes

  // Set initial cycle when snapshots load for first time
  useEffect(() => {
    if (snapshots.length > 0 && selectedCycle === null) {
      const latest = Math.max(...snapshots.map(s => s.cycle_number));
      setSelectedCycle(latest);
    }
  }, [snapshots, selectedCycle, setSelectedCycle]);

  // Cycle options for dropdown
  const cycleOptions = useMemo(() => {
    if (!Array.isArray(snapshots) || snapshots.length === 0) return [];
    return snapshots.map(s => ({
      label: `Cycle ${s.cycle_number}`,
      value: s.cycle_number,
    })).sort((a, b) => b.value - a.value);
  }, [snapshots]);

  // Temperature distribution data
  const tempData = useMemo(() => {
    if (!cycle?.temperature_dist_5deg) return [];
    const step = tempRange === '5deg' ? 5 : tempRange === '10deg' ? 10 : tempRange === '15deg' ? 15 : 20;
    return aggregateTemperatureRanges(cycle.temperature_dist_5deg, step);
  }, [cycle, tempRange]);

  // SOH trend data
  const sohTrend = useMemo(() => {
    if (!Array.isArray(snapshots) || snapshots.length === 0) return [];
    return calculateSOHTrend(snapshots);
  }, [snapshots]);

  const handlePrevCycle = () => {
    if (selectedCycle !== null && cycleOptions.length > 0) {
      const currentIndex = cycleOptions.findIndex(o => o.value === selectedCycle);
      if (currentIndex < cycleOptions.length - 1) {
        setSelectedCycle(cycleOptions[currentIndex + 1].value);
      }
    }
  };

  const handleNextCycle = () => {
    if (selectedCycle !== null && cycleOptions.length > 0) {
      const currentIndex = cycleOptions.findIndex(o => o.value === selectedCycle);
      if (currentIndex > 0) {
        setSelectedCycle(cycleOptions[currentIndex - 1].value);
      }
    }
  };

  const handleLatest = () => {
    if (cycleOptions.length > 0) {
      setSelectedCycle(cycleOptions[0].value);
    }
  };

  if (snapshotsLoading) {
    return (
      <div className={styles.main}>
        <Skeleton variant="card" />
      </div>
    );
  }

  if (!cycle && !cycleLoading) {
    return (
      <div className={styles.main}>
        <div className={styles.errorMessage}>
          No cycle data available. Please select a battery.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {/* Cycle Navigator */}
      <Card title="Cycle Navigation">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button onClick={handlePrevCycle} disabled={!cycleOptions.length}>
            ← Previous
          </Button>
          <Select
            options={cycleOptions}
            value={selectedCycle || ''}
            onChange={(value) => setSelectedCycle(Number(value))}
            placeholder="Select Cycle"
          />
          <Button onClick={handleNextCycle} disabled={!cycleOptions.length}>
            Next →
          </Button>
          <Button onClick={handleLatest} variant="accent">
            Latest Cycle
          </Button>
        </div>
      </Card>

      {cycleLoading || !cycle ? (
        <Skeleton variant="card" />
      ) : (
        <>
          {/* Cycle Stats */}
          <div className={styles.grid}>
            <Card title="Cycle Duration">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#002639' }}>
                {formatDuration(cycle.cycle_duration_hours)}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                {formatDate(cycle.cycle_start_time)} - {formatDate(cycle.cycle_end_time)}
              </div>
            </Card>

            <Card title="Distance Traveled">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#002639' }}>
                {formatDistance(cycle.total_distance)}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Avg Speed: {formatSpeed(cycle.average_speed)}
              </div>
            </Card>

            <Card title="Average Current">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: cycle.current_avg >= 0 ? '#10B981' : '#EF4444' }}>
                {cycle.current_avg.toFixed(2)} A
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                {cycle.current_avg >= 0 ? 'Charging' : 'Discharging'}
              </div>
            </Card>

            <Card title="Charging Events">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#002639' }}>
                {cycle.charging_instances_count}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Avg Start SOC: {formatPercentage(cycle.average_charge_start_soc)}
              </div>
            </Card>

            <Card title="Average Speed">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>
                {formatSpeed(cycle.average_speed)}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Max: {formatSpeed(cycle.max_speed)}
              </div>
            </Card>

            <Card title="Voltage">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981' }}>
                {formatVoltage(cycle.voltage_avg)}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                Min: {formatVoltage(cycle.voltage_min)} | Max: {formatVoltage(cycle.voltage_max)}
              </div>
            </Card>
          </div>

          {/* Battery Health Gauges */}
          <div className={styles.grid}>
            <Card title="Battery State of Charge (SOC)">
              <GaugeChart
                value={cycle.average_soc}
                label="Avg SOC %"
                color="#10B981"
              />
              <div style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>
                Min: {formatPercentage(cycle.min_soc)} | Max: {formatPercentage(cycle.max_soc)}
              </div>
            </Card>

            <Card title="State of Health (SOH)">
              <GaugeChart
                value={cycle.average_soh}
                label="Avg SOH %"
                color="#FBD602"
              />
              <div style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>
                Min: {formatPercentage(cycle.min_soh)} | Max: {formatPercentage(cycle.max_soh)}
              </div>
            </Card>

            <Card title="Temperature">
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#002639' }}>
                  {formatTemperature(cycle.average_temperature)}
                </div>
                <div style={{ fontSize: '16px', color: '#666', marginTop: '8px' }}>
                  Average Temperature
                </div>
              </div>
            </Card>
          </div>

          {/* Temperature Distribution */}
          <Card title="Temperature Distribution" className={styles.fullWidth}>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant={tempRange === '5deg' ? 'primary' : 'secondary'}
                onClick={() => setTempRange('5deg')}
              >
                5°C Ranges
              </Button>
              <Button
                size="small"
                variant={tempRange === '10deg' ? 'primary' : 'secondary'}
                onClick={() => setTempRange('10deg')}
              >
                10°C Ranges
              </Button>
              <Button
                size="small"
                variant={tempRange === '15deg' ? 'primary' : 'secondary'}
                onClick={() => setTempRange('15deg')}
              >
                15°C Ranges
              </Button>
              <Button
                size="small"
                variant={tempRange === '20deg' ? 'primary' : 'secondary'}
                onClick={() => setTempRange('20deg')}
              >
                20°C Ranges
              </Button>
            </div>
            <BarChart
              data={tempData}
              xKey="range"
              yKey="percentage"
              color="#FBD602"
              height={300}
            />
          </Card>

          {/* Speed Graph */}
          {(cycle.average_speed > 0 || cycle.max_speed > 0) && (
            <Card title="Speed Analysis" className={styles.fullWidth}>
              <BarChart
                data={[
                  { metric: 'Average Speed', value: cycle.average_speed },
                  { metric: 'Max Speed', value: cycle.max_speed },
                ]}
                xKey="metric"
                yKey="value"
                color="#3B82F6"
                height={280}
              />
              <div style={{ marginTop: '12px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                Speed measurements in km/h (aggregated data, not time-series)
              </div>
            </Card>
          )}

          {/* Alerts */}
          <Card title="Alerts & Protections">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cycle.alert_details.warnings.length > 0 ? (
                <div>
                  <Badge variant="warning">
                    {cycle.alert_details.warnings.length} Warning(s)
                  </Badge>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {cycle.alert_details.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <Badge variant="success">No Warnings</Badge>
                </div>
              )}

              {cycle.alert_details.protections.length > 0 ? (
                <div>
                  <Badge variant="danger">
                    {cycle.alert_details.protections.length} Protection(s)
                  </Badge>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {cycle.alert_details.protections.map((protection, i) => (
                      <li key={i}>{protection}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <Badge variant="success">No Protections</Badge>
                </div>
              )}
            </div>
          </Card>

          {/* SOH Trend (Bonus Feature) */}
          {sohTrend.length > 0 && (
            <Card title="State of Health Degradation Trend (All Cycles)" className={styles.fullWidth}>
              <LineChart
                data={sohTrend}
                xKey="cycle"
                yKey="soh"
                color="#EF4444"
                height={350}
              />
              <div style={{ marginTop: '16px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                Showing cumulative SOH degradation across {sohTrend.length} cycles
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
