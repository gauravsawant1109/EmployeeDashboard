import pool from '../Configuration/Cofig.js';

// Get all employees with salary and personal info
import db from "../Configuration/Cofig.js";

export const getAllEmployees = async (req, res) => {
    try {
      const [results] = await pool.query(`SELECT * FROM employees`);
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      console.error("Error in getAllEmployees:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


  
  export const getAllEmployeesCount = async (req, res) => {
    try {
      const [results] = await pool.query(`SELECT COUNT(*) AS employee_count FROM employees`);
      const count = results[0].employee_count;
      res.status(200).json({ success: true, count });
    } catch (error) {
      console.error("Error in getAllEmployeesCount:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

// Get single employee by ID with all details

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query(
      `SELECT * FROM employees WHERE employee_id = ?`,
      [id]
    );

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, data: results[0] });
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Add a new employee with salary and personal info
export const addEmployee = async (req, res) => {
    const connection = await  db.getConnection();
    await connection.beginTransaction();
  
    try {
      const {
        first_name,
        last_name,
        department,
        designation,
        date_joined,
        base_salary,
        bonus,
        deductions,
        pay_date,
        phone,
        email,
        address,
        dob,
        emergency_contact
      } = req.body;
  
      // 1. Insert into employees
      const [employeeResult] = await connection.execute(
        `INSERT INTO employees (first_name, last_name, department, designation, date_joined)
         VALUES (?, ?, ?, ?, ?)`,
        [first_name, last_name, department, designation, date_joined]
      );
      const employee_id = employeeResult.insertId;
  
      // 2. Insert into salaries
      await connection.execute(
        `INSERT INTO salaries (employee_id, base_salary, bonus, deductions, pay_date)
         VALUES (?, ?, ?, ?, ?)`,
        [employee_id, base_salary, bonus, deductions, pay_date]
      );
  
      // 3. Insert into personal_info
      await connection.execute(
        `INSERT INTO personal_info (employee_id, phone, email, address, dob, emergency_contact)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [employee_id, phone, email, address, dob, emergency_contact]
      );
  
      await connection.commit();
      res.status(201).json({ message: 'Employee added successfully', employee_id });
    } catch (error) {
      await connection.rollback();
      console.error('Error adding employee:', error);
      res.status(500).json({ message: 'Error adding employee', error: error.message });
    } finally {
      connection.release();
    }
  };
  

// Update employee using query parameters

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    department,
    designation,
    date_joined
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE employees
       SET first_name = ?, last_name = ?, department = ?, designation = ?, date_joined = ?
       WHERE employee_id = ?`,
      [first_name, last_name, department, designation, date_joined, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// full info 
export const getEmployeeFullInfoById = async (req, res) => {
    const { id } = req.params;
  
    const query = `
      SELECT 
        e.employee_id, e.first_name, e.last_name, e.department, e.designation, e.date_joined,
        s.base_salary, s.bonus, s.deductions, s.pay_date,
        p.phone, p.email, p.address, p.dob, p.emergency_contact
      FROM employees e
      LEFT JOIN salaries s ON e.employee_id = s.employee_id
      LEFT JOIN personal_info p ON e.employee_id = p.employee_id
      WHERE e.employee_id = ?;
    `;
  
    try {
      const [rows] = await db.query(query, [id]);
  
      if (!rows.length) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
      console.error("Error fetching full employee info:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

// Search employees by first or last name
export const searchEmployees  = async (req, res) => {
    const { first_name, last_name } = req.query;
  
    try {
      // If both names are provided, perform search with both.
      let query = `SELECT * FROM employees WHERE 1=1`;
      const queryParams = [];
  
      if (first_name) {
        query += ` AND first_name LIKE ?`;
        queryParams.push(`%${first_name}%`);
      }
  
      if (last_name) {
        query += ` AND last_name LIKE ?`;
        queryParams.push(`%${last_name}%`);
      }
  
      const [results] = await pool.query(query, queryParams);
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "No employees found" });
      }
  
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      console.error("Error searching employees:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM salaries WHERE employee_id = ?`, [id]);
    await pool.query(`DELETE FROM personal_info WHERE employee_id = ?`, [id]);
    await pool.query(`DELETE FROM employees WHERE employee_id = ?`, [id]);

    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err });
  }
};
