import express from 'express';
import Employee from '@models/Employee';
import Error from '@libs/error';
import Success from '@libs/success';

const GetEmployeesRoute = express.Router();

GetEmployeesRoute.get('/', async (req, res) => {
  return Employee.find().then((employees) => {
    if (employees.length === 0) {
      return Error(res, 404, 'NOT_FOUND', 'No employees found');
    }
    return Success(res, 200, 'OK', 'Employees found', employees);
  }).catch((err) => {
    return Error(res, 500, 'INTERNAL_SERVER_ERROR', 'Error finding employees');
  })
})

export default GetEmployeesRoute;