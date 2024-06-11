export type Agent = {
  employee_id: string;
  first_name: string;
  last_name: string;
  kpi: KPI[];
  predicted_kpi?: PredictiveKPI;
  outlook?: string;
  summary?: string;
}

export type KPI = {
  quarter: string,
  avg_resp_time: number,
  avg_reso_time: number,
  avg_contact_time: number,
  csat: number,
  tickets_total: number,
  tickets_done: number,
  tieckts_escalated: number,
  tickets_open: number
}

export type PredictiveKPI = {
  avg_resp_time: number,
  avg_reso_time: number,
  avg_contact_time: number,
  csat: number
}