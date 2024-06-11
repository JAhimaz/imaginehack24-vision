"use client";
import { Agent } from '@/util/types';
import React, { FC } from 'react';
import styles from './AgentCard.module.scss';
import { Icon } from '@/util/Icons';

type AgentCardProps = {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean
}

const AgentCard: FC<AgentCardProps> = ({ agent, onClick, selected = false }) => {
  return (
    <article className={selected ? styles.agentCardSelected : styles.agentCard} onClick={onClick}>
      <span>{agent?.first_name} {agent?.last_name} <span style={{
        color: 'var(--text-dim)'
      }}>({agent?.employee_id})</span></span>
      <Icon icon="arrow" id="arrow" className={styles.extButton} />
    </article>
  )
}

export default AgentCard;