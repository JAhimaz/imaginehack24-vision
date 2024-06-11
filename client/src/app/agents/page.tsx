import { NextPage } from "next";
import Page from "@/components/Page";
import AgentPage from "@/components/Agents/AgentPage";


export default function Home() {
  return (
    <Page title="Agents">
      <AgentPage />
    </Page>
  )
}
