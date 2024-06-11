import mongoose from "mongoose";
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  kpi: [
    {
      quarter: {
        type: String,
        required: false,
      },
      avg_resp_time: {
        type: Number,
        required: false,
      },
      avg_reso_time: {
        type: Number,
        required: false,
      },
      avg_contact_time: {
        type: Number,
        required: false,
      },
      csat: {
        type: Number,
        required: false,
      },
      tickets_total: {
        type: Number,
        required: false,
      },
      tickets_done: {
        type: Number,
        required: false,
      },
      tieckts_escalated: {
        type: Number,
        required: false,
      },
      tickets_open: {
        type: Number,
        required: false,
      },
    },
  ],
  predicted_kpi: {
    quarter: {
      type: String,
      required: false,
    },
    avg_resp_time: {
      type: Number,
      required: false,
    },
    avg_reso_time: {
      type: Number,
      required: false,
    },
    avg_contact_time: {
      type: Number,
      required: false,
    },
    csat: {
      type: Number,
      required: false,
    }
  },
  outlook: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Employee = mongoose.model("employees", employeeSchema)
export default Employee;
