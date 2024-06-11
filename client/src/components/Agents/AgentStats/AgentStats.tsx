"use client"
import React, { FC, useEffect, useState } from 'react';
import styles from './AgentStats.module.scss';
import { Agent, KPI } from '@/util/types';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type AgentStatsProps = {
  agent?: Agent;
}

type UserAnalytics = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avg_resp_time: string;
  avg_reso_time: string;
  avg_contact_time: string;
  avg_csat: string;
  total_tickets: number;
  total_tickets_done: number;
  total_tickets_open: number;
  total_tickets_escalated: number;
}

type PredictiveAnalytics = {
  kpi: KPI,
  outlook: string,
  summary: string
}

const AgentStats: FC<AgentStatsProps> = ({ agent }) => {

  const [ userAnalytics, setUserAnalytics ] = useState<undefined | UserAnalytics>(undefined)
  const [ userPredictiveAnalytics, setUserPredictiveAnalytics ] = useState<undefined | PredictiveAnalytics>(undefined)
  const [ loading, setLoading ] = useState<boolean>(true)

  useEffect(() => {
    if((userAnalytics === undefined || userAnalytics.id !== agent?.employee_id) && agent !== undefined){
      setLoading(true);
      setUserAnalytics({
        id: agent.employee_id,
        first_name: agent.first_name,
        last_name: agent.last_name,
        email: `${agent.employee_id}@company.com`,
        avg_resp_time: ((agent.kpi.map(kpi => kpi.avg_resp_time).reduce((a, b) => a + b, 0) / agent.kpi.length) / 60).toFixed(2),
        avg_reso_time: ((agent.kpi.map(kpi => kpi.avg_reso_time).reduce((a, b) => a + b, 0) / agent.kpi.length) / 60).toFixed(2),
        avg_contact_time: ((agent.kpi.map(kpi => kpi.avg_contact_time).reduce((a, b) => a + b, 0) / agent.kpi.length) / 60).toFixed(2),
        // csat round off to whole number
        avg_csat: (agent.kpi.map(kpi => kpi.csat).reduce((a, b) => a + b, 0) / agent.kpi.length).toFixed(0),
        total_tickets: agent.kpi.map(kpi => kpi.tickets_total).reduce((a, b) => a + b, 0),
        total_tickets_done: agent.kpi.map(kpi => kpi.tickets_done).reduce((a, b) => a + b, 0),
        total_tickets_open: agent.kpi.map(kpi => kpi.tickets_open).reduce((a, b) => a + b, 0),
        total_tickets_escalated: agent.kpi.map(kpi => kpi.tieckts_escalated).reduce((a, b) => a + b, 0),
      })
      setLoading(false)
    }
  }, [agent, userAnalytics])

  useEffect(() => {
    console.log(userAnalytics)
  }, [userAnalytics])
  
  if(agent === undefined){
    return (
      <section style={{
        flex: 1
      }}>
        <div className={styles.agentMetricBox} style={{
          width: '100%',
          height: '100%',
          fontSize: '1rem',
          color: 'var(--foreground-dim)',
          fontStyle: 'italic',
        }}>
          <span>Select an agent to view their stats</span>
        </div>
      </section>
    )
  }

  return (
      <section className={styles.agentIndividualSection}>
          <div className={styles.agentMetricBox}>
            <span className={styles.metricBoxTitle}>Avg Reach Time</span>
            <span className={styles.metricBoxValue}>{ userAnalytics?.avg_contact_time }</span>
            <span className={styles.metricBoxTitle}>Minutes</span>
          </div>
          <div className={styles.agentMetricBox}>
            <span className={styles.metricBoxTitle}>Avg Response Time</span>
            <span className={styles.metricBoxValue}>{ userAnalytics?.avg_resp_time }</span>
            <span className={styles.metricBoxTitle}>Minutes</span>
          </div>
          <div className={styles.agentMetricBox}>
            <span className={styles.metricBoxTitle}>Avg Resolution Time</span>
            <span className={styles.metricBoxValue}>{ userAnalytics?.avg_reso_time }</span>
            <span className={styles.metricBoxTitle}>Minutes</span>
          </div>
          <div className={styles.agentDetailsBox}>
            <BarChart 
              width={300}
              height={400}
              data={agent.kpi.map((kpi) => {
                return {
                  Quarter: kpi.quarter,
                  closed: kpi.tickets_done,
                  open: kpi.tickets_open,
                  escalated: kpi.tieckts_escalated
                }
              })}
            >
              <YAxis />
              <XAxis dataKey="Quarter" />
              <Tooltip />
              <Legend />
              <Bar dataKey="closed" stackId="a" fill='var(--button)' />
              <Bar dataKey="open" stackId="a" fill="var(--highlight-text)" />
              <Bar dataKey="escalated" stackId="a" fill="#8facf6" />
            </BarChart>
          </div>
    </section>
  )
}

export default AgentStats;