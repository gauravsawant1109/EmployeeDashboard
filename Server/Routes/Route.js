import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  searchEmployees,
  deleteEmployee,
  getAllEmployeesCount,
getEmployeeFullInfoById
} from '../Controller/EmployeeContyroller.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/count',getAllEmployeesCount);
router.get('/search', searchEmployees);
router.get('/:id', getEmployeeById);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);                                                                                                                                                                                                             
router.delete('/:id', deleteEmployee);
router.get('/full/:id', getEmployeeFullInfoById);

export default router;
