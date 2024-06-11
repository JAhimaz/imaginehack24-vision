import { DATA_API } from "@/util/APIs";

const GenerateEmployeeAI = async (id: string) => {
  const data = await fetch(`${DATA_API}/api/ai/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({
      id
    })
  })
  .then((res) => res.json())
  .then((data) => data.data)
  .catch((err) => {
    console.error(err)
  })

  return data
}

export default GenerateEmployeeAI;