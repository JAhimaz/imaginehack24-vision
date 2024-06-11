"use client"
import React, { FC, useEffect, useState } from 'react';
import styles from '../AgentStats/AgentStats.module.scss';
import { Agent, KPI, PredictiveKPI } from '@/util/types';
import GenerateEmployeeAI from '@/libs/@server/GenerateEmployeeAI';

type AgentStatsProps = {
  agent?: Agent;
}

type PredictiveAnalytics = {
  kpi: PredictiveKPI,
  outlook: string,
  summary: string
}

const PredictiveAgentStats: FC<AgentStatsProps> = ({ agent }) => {

  const [ userPredictiveAnalytics, setUserPredictiveAnalytics ] = useState<undefined | PredictiveAnalytics>(() => {
    if(agent?.predicted_kpi){
      return {
          kpi: {
            avg_contact_time: (agent.predicted_kpi.avg_contact_time / 60).toFixed(2)as unknown as number,
            avg_resp_time: (agent.predicted_kpi.avg_resp_time / 60).toFixed(2) as unknown as number,
            avg_reso_time: (agent.predicted_kpi.avg_reso_time / 60).toFixed(2) as unknown as number,
            csat: agent.predicted_kpi.csat,
          },
          outlook: agent.outlook,
          summary: agent.summary
        } as PredictiveAnalytics
      }
    return undefined
  })
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ generating, setGenerating ] = useState<boolean>(false)

  const GenerateAIAnalytics = async () => {
    setGenerating(true)
    if(!agent) return
    const data = await GenerateEmployeeAI(agent?.employee_id)

    setUserPredictiveAnalytics({
      kpi: {
        avg_contact_time: (data.predicted_kpi.avg_contact_time / 60).toFixed(2)as unknown as number,
        avg_resp_time: (data.predicted_kpi.avg_resp_time / 60).toFixed(2) as unknown as number,
        avg_reso_time: (data.predicted_kpi.avg_reso_time / 60).toFixed(2) as unknown as number,
        csat: data.predicted_kpi.csat,
      },
      outlook: data?.outlook,
      summary: data?.summary
    } as PredictiveAnalytics)

    setGenerating(false)
  }

  useEffect(() => {

    if(agent?.predicted_kpi){
      return setUserPredictiveAnalytics({
        kpi: {
          avg_contact_time: (agent.predicted_kpi.avg_contact_time / 60).toFixed(2)as unknown as number,
          avg_resp_time: (agent.predicted_kpi.avg_resp_time / 60).toFixed(2) as unknown as number,
          avg_reso_time: (agent.predicted_kpi.avg_reso_time / 60).toFixed(2) as unknown as number,
          csat: agent.predicted_kpi.csat,
        },
        outlook: agent?.outlook,
        summary: agent?.summary
      } as PredictiveAnalytics)
    }

    return setUserPredictiveAnalytics(undefined)
  }, [agent])

  const GetColour = (val: string) => {
    if(!val) return 'var(--text)';
    switch(val.toLocaleUpperCase()){
      case 'NEGATIVE':
        return 'red';
      case 'POSITIVE':
        return 'green';
      case 'NEUTRAL':
        return 'orange';
      default:
        return 'var(--text)'
    }
  }

  return (
      <section className={styles.agentIndividualSection}>
        { loading ? <></> : (
          <>
            <div className={styles.agentMetricBox}>
              <span className={styles.metricBoxTitle}>Avg Reach Time</span>
              <span className={styles.metricBoxValue}>{userPredictiveAnalytics ? userPredictiveAnalytics.kpi.avg_contact_time : '-'}</span>
              <span className={styles.metricBoxTitle}>{userPredictiveAnalytics ? 'minutes' : '-'}</span>
            </div>
            <div className={styles.agentMetricBox}>
              <span className={styles.metricBoxTitle}>Avg Response Time</span>
              <span className={styles.metricBoxValue}>{userPredictiveAnalytics ? userPredictiveAnalytics.kpi.avg_resp_time : '-'}</span>
              <span className={styles.metricBoxTitle}>{userPredictiveAnalytics ? 'minutes' : '-'}</span>
            </div>
            <div className={styles.agentMetricBox}>
              <span className={styles.metricBoxTitle}>Avg Resolution Time</span>
              <span className={styles.metricBoxValue}>{userPredictiveAnalytics ? userPredictiveAnalytics.kpi.avg_reso_time : '-'}</span>
              <span className={styles.metricBoxTitle}>{userPredictiveAnalytics ? 'minutes' : '-'}</span>
            </div>
            <div className={styles.agentDetailsBox}>
              {
                userPredictiveAnalytics ? (
                  <section style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <span style={{
                      textAlign: 'justify'
                    }}>
                      <b style={{
                        color: 'var(--button)'
                      }}>Outlook: </b>
                      <span style={{
                        color: GetColour(userPredictiveAnalytics.outlook)
                      }}>
                      { userPredictiveAnalytics.outlook.toLocaleUpperCase() }
                      </span>
                    </span>
                    <span style={{
                      textAlign: 'justify'
                    }}>
                      <b style={{
                        color: 'var(--button)'
                      }}>AI Analysis: </b>
                      { userPredictiveAnalytics.summary }
                    </span>
                  </section>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    { generating ? (<span>Generating AI Analytics...</span>) : (
                      <button className={styles.button} onClick={GenerateAIAnalytics}>Generate Predictive Analysis</button>
                    )}
                  </div>
                )
              }
            </div>
          </>
        )}
    </section>
  )
}

export default PredictiveAgentStats;