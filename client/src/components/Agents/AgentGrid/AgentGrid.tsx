"use client";
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import styles from './AgentGrid.module.scss';
import AgentCard from '../AgentCard/AgentCard';
import { Icon } from '@/util/Icons';
import { Agent } from '@/util/types';

type AgentGridProps = {
  agents: Agent[] | undefined;
  setSelectedAgent: Dispatch<SetStateAction<undefined | Agent>>;
  loading: boolean;
  selectedAgentId: string | undefined;
}

const AgentGrid: FC<AgentGridProps> = ({ agents, setSelectedAgent, loading, selectedAgentId }) => {

  const [query, setQuery] = React.useState<string>('');
  const [filteredAgents, setFilteredAgents] = React.useState<Agent[] | undefined>(agents);

  const SearchQuery = (query: string) => {
    if(agents){
      setFilteredAgents(agents.filter(agent => {
        return agent.first_name.toLowerCase().includes(query.toLowerCase()) || agent.last_name.toLowerCase().includes(query.toLowerCase())
      }))
    }
  }

  useEffect(() => {
    if(agents){
      setFilteredAgents(agents)
    }
  }, [agents])

  return (
    <section className={styles.agentContainer}>
      { loading ? <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'var(--foreground-dim)'
      }}>Loading...</div> : (
      <>
        <div className={styles.textInputContainer}>
          <Icon icon="searchAgent" style={{
            fontSize: '2rem',
          }}/>
          <input className={styles.textInput} placeholder='Search for Agent...' onChange={(e) => SearchQuery(e.target.value)} />
        </div>
        <section className={styles.agentGrid}>
          { filteredAgents && filteredAgents.map((agent, i) => (
            <AgentCard key={i} agent={agent} selected={selectedAgentId === agent.employee_id}
            onClick={() => {
              setSelectedAgent(agent)
            }} />
          ))}
          { !agents && <div style={{
            marginTop: '2rem',
            color: 'var(--foreground-dim)',
            fontStyle: 'italic',
          }}>No Agents Found</div>}
        </section>
      </>
      )}
    </section>
  )
}

export default AgentGrid;