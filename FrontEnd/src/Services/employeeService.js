import axios from "axios";

const EmployeeService = {
    getFullEmployeeById: async (id) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/employees/full/${id}`);
          console.log("Full employee info:", response.data.data);
          return response.data.data;
        } catch (error) {
          console.error("Failed to get full employee info", error);
          throw error;
        }
      },
      
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      console.log("Employees fetched", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Failed to fetch employees", error);
      throw error;
    }
  },

  // Get employee count
  getEmployeeCount: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees/count");
      console.log("Employee count", response.data.count);
      return response.data.count;
    } catch (error) {
      console.log("Failed to fetch employee count", error);
      throw error;
    }
  },

  searchEmployees: async (first_name, last_name) => {
    try {
      // Construct the query string dynamically
      let url = "http://localhost:5000/api/employees/search?";
  
      if (first_name) {
        url += `first_name=${first_name}`;
      }
  
      if (last_name) {
        if (first_name) {
          url += `&last_name=${last_name}`;
        } else {
          url += `last_name=${last_name}`;
        }
      }
  
      // Make the request with the constructed URL
      const response = await axios.get(url);
      console.log("Employees found", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Failed to search employees", error);
      throw error;
    }
  },
  
  // Get a single employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees/${id}`
      );
      console.log("Employee details", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Failed to fetch employee", error);
      throw error;
    }
  },

  // Add a new employee
  addEmployee: async (employeeData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/employees", employeeData);
      console.log("Employee added:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to add employee", error);
      throw error;
    }
  },

  // Update employee details
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        employeeData
      );
      console.log("Employee updated", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("Failed to update employee", error);
      throw error;
    }
  },

  // Delete an employee
  deleteEmployee: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );
      console.log("Employee deleted", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("Failed to delete employee", error);
      throw error;
    }
  },
};

export default EmployeeService;
