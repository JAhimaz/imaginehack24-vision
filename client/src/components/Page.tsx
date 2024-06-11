"use client";
import { FC } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import styles from './Page.module.scss';

type PageProps = {
  children: React.ReactNode;
  title: string;
}

const Page: FC<PageProps> = ({ children, title }) => {

  const GetLastUpdate = () => {
    const date = new Date();
    const dateNumber = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    // format 00:00 AM/PM at 00 Month 0000
    return date.toLocaleTimeString().toLocaleUpperCase() + ' on ' + dateNumber + ' ' + month + ' ' + year;
  }

  return (
    <main className={styles.main}>
        <Sidebar />
        <Dashboard>
          <div className={styles.pageHeader}>
            <span className={styles.pageTitle}>{title}</span>
            <span className={styles.pageUpdated}>Last updated at {GetLastUpdate()}</span>
          </div>
          { children }
        </Dashboard>
    </main>
  )
}

export default Page;