import React, { useEffect, useState } from "react";
import EmployeeService from "../Services/employeeService";
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import EmployeeModal from "../Modal/EmployeeModal";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sorting states
  const [sortField, setSortField] = useState("first_name");
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  
  // Modal states
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch employees.");
      setLoading(false);
    }
  };

  // Handle search/filter
  useEffect(() => {
    const results = employees.filter(employee => 
      `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredEmployees(results);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, employees]);

  // Handle sorting
  useEffect(() => {
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      let fieldA, fieldB;
      
      if (sortField === 'name') {
        fieldA = `${a.first_name} ${a.last_name}`.toLowerCase();
        fieldB = `${b.first_name} ${b.last_name}`.toLowerCase();
      } else {
        fieldA = a[sortField]?.toLowerCase() || '';
        fieldB = b[sortField]?.toLowerCase() || '';
      }
      
      if (sortDirection === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });
    
    setFilteredEmployees(sortedEmployees);
  }, [sortField, sortDirection]);

  // Handle sorting click
  const handleSort = (field) => {
    const actualField = field === 'name' ? 'name' : field;
    if (sortField === actualField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(actualField);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    const actualField = field === 'name' ? 'name' : field;
    if (sortField !== actualField) return <FaSort className="inline ml-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />;
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
const navigate = useNavigate()
  // Handle employee actions
  const handleView = (employee) => {
    navigate(`/EmployeeDetails/${employee.employee_id}`)
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await EmployeeService.deleteEmployee(selectedEmployee.employee_id);
      setIsDeleteModalOpen(false);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      setError("Failed to delete employee.");
    }
  };

  const handleSaveEmployee = async (updatedEmployee) => {
    try {
      await EmployeeService.updateEmployee(updatedEmployee.employee_id, updatedEmployee);
      setIsEditModalOpen(false);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      setError("Failed to update employee.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Employees</h1>
      
      {/* Search and filter */}
      <div className="mb-4 relative">
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <div className="px-3 py-2 bg-gray-100">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search employees by name, department, or designation..."
            className="w-full p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-100">
                <tr>
                  <th 
                    className="px-6 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('department')}
                  >
                    Department {getSortIcon('department')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left cursor-pointer"
                    onClick={() => handleSort('designation')}
                  >
                    Designation {getSortIcon('designation')}
                  </th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.length ? (
                  currentEmployees.map((emp) => (
                    <tr key={emp.employee_id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{`${emp.first_name} ${emp.last_name}`}</td>
                      <td className="px-6 py-3">{emp.department}</td>
                      <td className="px-6 py-3">{emp.designation}</td>
                      <td className="px-6 py-3 flex space-x-2">
                        <button 
                          onClick={() => handleView(emp)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEdit(emp)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit employee"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(emp)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete employee"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredEmployees.length > employeesPerPage && (
            <div className="flex justify-between items-center mt-4">
              <div>
                Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length} employees
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      {isViewModalOpen && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setIsViewModalOpen(false)}
          readOnly={true}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEmployee}
          readOnly={false}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Delete Employee"
          message={`Are you sure you want to delete ${selectedEmployee.first_name} ${selectedEmployee.last_name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}