"use client";
import AgentGrid from "./AgentGrid/AgentGrid";
import React, { useEffect, useState } from 'react';
import styles from "./AgentPage.module.scss";
import AgentStats from "./AgentStats/AgentStats";
import { Agent } from "@/util/types";
import GetEmployees from "@/libs/@server/GetEmployees";
import PredictiveAgentStats from "./PredictiveAgentStats/PredictiveAgentStats";
import { Icon } from "@/util/Icons";

const AgentPage = () => {

  const [ selectedAgent, setSelectedAgent ] = useState<undefined | Agent>(undefined);
  const [ viewPredictive, setViewPredictive ] = useState<boolean>(false);
  const [ agents, setAgents ] = useState<undefined | Agent[]>(undefined);
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const GetEmployeesCall = async () => {
      setLoading(true)
      const employees = await GetEmployees()
      setAgents(employees)
      setLoading(false)
    }

    if(agents === undefined){
      GetEmployeesCall()
    }
  }, [agents, loading])

  useEffect(() => {
    console.log(selectedAgent)
  }, [selectedAgent])

  return (
    <section className={styles.agentPage}>
      <AgentGrid agents={agents} setSelectedAgent={setSelectedAgent} loading={loading} selectedAgentId={selectedAgent?.employee_id} />
      <section className={styles.agentDetailsSection}>
      { selectedAgent === undefined ? null : (
      <div className={styles.switchDiv}>
        <span style={{
          color: viewPredictive ? 'var(--button)' : 'var(--text-dim)'
        }}>{viewPredictive ? 'Predictive Data' : 'Historical Data'}</span>
        {viewPredictive && <Icon icon='bot' style={{
          color: 'var(--button)',
        }} />}
        <label className={styles.switch}>
          <input type="checkbox" className={styles.inputSwitch} onChange={() => setViewPredictive(!viewPredictive)} />
          <span className={styles.slider} />
        </label>
      </div>
      )}
      { viewPredictive ? <PredictiveAgentStats agent={selectedAgent} /> :
        <AgentStats agent={selectedAgent} /> }
      </section>

    </section>
  )
}

export default AgentPage;