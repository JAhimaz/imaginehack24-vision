"use client";
import React, { FC } from 'react';
import styles from './Dashboard.module.scss';

type DashboardProps = {
  children: React.ReactNode;
}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  return (
    <section className={styles.dashboard}>
      <section className={styles.dashboardInner}>
      {children}
      </section>
    </section>
  )
}

export default Dashboard;