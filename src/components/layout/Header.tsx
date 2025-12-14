'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import { Select } from '@/components/ui/Select';
import { ALLOWED_IMEIS } from '@/lib/constants/imeis';
import { useData } from '@/components/providers/DataProvider';
import { useSummary } from '@/hooks/useSummary';

export function Header() {
  const { selectedIMEI, setSelectedIMEI } = useData();
  const { batteries, isLoading } = useSummary();

  // Create options with battery summary info
  const imeiOptions = ALLOWED_IMEIS.map((imei) => {
    const batteryInfo = batteries.find(b => b.imei === imei);

    if (batteryInfo) {
      return {
        label: `Battery ${imei} - ${batteryInfo.total_cycles} cycles, Avg SOH: ${batteryInfo.avg_soh_across_cycles.toFixed(1)}%`,
        value: imei,
      };
    }

    return {
      label: `Battery ${imei}`,
      value: imei,
    };
  });

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/Logo.png"
          alt="Zenfinity Energy"
          width={120}
          height={40}
          className={styles.logoImage}
        />
        <h1 className={styles.title}>Battery Analytics Dashboard</h1>
      </div>
      <div className={styles.controls}>
        <span className={styles.label}>Select Battery:</span>
        <Select
          options={imeiOptions}
          value={selectedIMEI}
          onChange={setSelectedIMEI}
          disabled={isLoading}
        />
      </div>
    </header>
  );
}
