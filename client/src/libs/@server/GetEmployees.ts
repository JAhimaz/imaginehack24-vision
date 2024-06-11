import { DATA_API } from "@/util/APIs";

const GetEmployees = async () => {
  const data = await fetch(`${DATA_API}/api/employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
  })
  .then((res) => res.json())
  .then((data) => data.data)
  .catch((err) => {
    console.error(err)
  })

  return data
}

export default GetEmployees;