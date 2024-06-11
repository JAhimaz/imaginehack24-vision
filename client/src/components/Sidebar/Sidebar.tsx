"use client";
import React, { useEffect } from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { Icon, IconName } from '@/util/Icons';

type SidebarItem = {
  id: number;
  icon: string;
  title: string;
  url: string;
}

const SidebarItems: SidebarItem[] = [
  {
    id: 3,
    icon: 'agent',
    title: 'Agent Dashboard',
    url: '/agents'
  },
  {
    id: 1,
    icon: 'metrics',
    title: 'Overall Metrics',
    url: '/metrics'
  },
  {
    id: 2,
    icon: 'question',
    title: 'How it works',
    url: '/how-it-works'
  }
]

const Sidebar = () => {

  // This will set the selected sidebar item
  const [ selected, setSelected ] = React.useState<undefined | number>(undefined);

  useEffect(() => {
    // Based on the URL this will set the selected sidebar item
    const url = window && window.location.pathname;
    const id = SidebarItems.find(item => item.url === url)?.id;

    if (id) {
      setSelected(id);
    }
  }, [])

  return (
    <section className={styles.sidebar}>
      <div className={styles.sidebarInner}>
      <span className={styles.logo}>
        <Icon icon="queryStats" /> VISION
      </span>
      {
        // Should we static this?
        // Mapping out all the sidebar items, allowing for dynamic entries
        SidebarItems.map((item, index) => (
          <Link href={item.url} className={selected === item.id ? styles.sidebarItemSelected : styles.sidebarItem} key={index + "_sidebar_item"}>
            <Icon icon={item.icon as IconName} /> {item.title}
          </Link>
        ))
      }
      <span className={styles.footer}>
        Submission by Sunway Blockchain Club for ImagineHack
        <section className={styles.socials}>

        </section>
      </span>
      </div>
    </section>
  )
}

export default Sidebar;
