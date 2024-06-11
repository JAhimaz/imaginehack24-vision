import express from 'express';
import Employee from '@models/Employee';
import Error from '@libs/error';
import Success from '@libs/success';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const GenerateEmployeeAIRoute = express.Router();

GenerateEmployeeAIRoute.post('/', async (req, res) => {

  const { id } = req.body;

  const employee = await Employee.findOne({ employee_id: id })
  if(!employee) return Error(res, 404, 'NOT_FOUND', "Employee not found");

  const genAI = new GoogleGenerativeAI("AIzaSyAswi-yiLDQHV8zcB8U525N87L4bYGwA2c");

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(`The objective is to predict analytically the next quarter's KPI for the employee based on the provided data. Please follow the following rules very strictly:
  1. The predicted KPI should be based on the provided data.
  2. The predicted KPI should be as accurate as possible.
  3. The employee id should be the same as the provided data.
  4. There should be no other data in the response other than the predicted KPI and the summary.
  5. You should follow the example response format strictly.
  6. The total number of tickets should be the sum of tickets done, escalated, and open. Make sure this is followed strictly.
  7. outlook should be positive if the employee has shown improvement in their KPIs, negative if they have not, and neutral if they have shown no change.
  8. The predicted KPIs should be based off all the provided kpi quarters.
  9. Do not provide anything else except the format of the example response.
  10. Make sure the quarter is in the format Q#YY where YY is the year and # is the quarter number. The quarter should be the next quarter after the last provided quarter. There is a maximum of 4 quarters in a year.
  11. The summary should be based on their previous KPIs and NOT the predicted KPIs.
  12. The summary should be 2 paragraphs, one on strengths based on the previous KPIs and the second on points of improvements.
  13. Make sure the response key names are exactly the same as the example response.

  An example response: 
  '{
    "employee_id": "CS000001",
    "predicted_kpi": {
      "quarter": "Q427",
      "avg_resp_time": 200,
      "avg_reso_time": 240,
      "avg_contact_time": 230,
      "csat": 5,
    },
    "outlook": "positive",
    "summary": "The employee has shown great improvement in their resolution time and customer satisfaction, however, they need to work on their ticket escalation rate."
  }'. 

  Provided is the data for the employee:
  ${JSON.stringify(employee)}
  `);

  let stringValue = '';

  // check if there is ```json in the response, remove ```json from the beginning and ``` from the end of the response
  if(!result.response.text().includes('```json')){
    stringValue = result.response.text().replace('```json', '').replace('```', '');
  } else {
    stringValue = result.response.text();
  }

  try {
    JSON.parse(stringValue);

    employee.predicted_kpi = JSON.parse(stringValue).predicted_kpi;
    employee.outlook = JSON.parse(stringValue).outlook;
    employee.summary = JSON.parse(stringValue).summary;
    await employee.save();

    return Success(res, 200, 'SUCCESS', 'Successfully Generated KPI', JSON.parse(stringValue));
  } catch (e) {
    return Error(res, 400, 'INVALID_RESPONSE', "The response is not in the correct format");
  }
})

export default GenerateEmployeeAIRoute;