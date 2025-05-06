import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../Services/employeeService"; // Adjust path as needed

export default function EmployeeDetails() {
  const { id } = useParams(); // Get employee_id from URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getFullEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div><span className="font-semibold">Name:</span> {employee.first_name} {employee.last_name}</div>
        <div><span className="font-semibold">Email:</span> {employee.email}</div>
        <div><span className="font-semibold">Phone:</span> {employee.phone}</div>
        <div><span className="font-semibold">Department:</span> {employee.department}</div>
        <div><span className="font-semibold">Designation:</span> {employee.designation}</div>
        <div><span className="font-semibold">Date Joined:</span> {employee.date_joined}</div>
        <div><span className="font-semibold">Base Salary:</span> ₹{employee.base_salary}</div>
        <div><span className="font-semibold">Bonus:</span> ₹{employee.bonus}</div>
        <div><span className="font-semibold">Deductions:</span> ₹{employee.deductions}</div>
        <div><span className="font-semibold">Pay Date:</span> {employee.pay_date}</div>
        <div><span className="font-semibold">Address:</span> {employee.address}</div>
        <div><span className="font-semibold">DOB:</span> {employee.dob}</div>
        <div><span className="font-semibold">Emergency Contact:</span> {employee.emergency_contact}</div>
      </div>
    </div>
  );
}
