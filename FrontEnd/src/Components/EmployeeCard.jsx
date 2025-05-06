import React from 'react'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EmployeeDetails() {
  const { id } = useParams(); // 🔹 Get employee ID from route
  const [employee, setEmployee] = useState(null);

  // Example fetch or mock lookup
  useEffect(() => {
    // Replace this with your real fetch logic
    const fetchEmployee = async () => {
      // Simulated data (replace with API)
      const data = [
        { id: '1', name: 'Alice', email: 'alice@example.com', department: 'HR', phone: '1234567890', designation: 'Manager' },
        { id: '2', name: 'Bob', email: 'bob@example.com', department: 'IT', phone: '9876543210', designation: 'Developer' },
      ];
      const found = data.find(emp => emp.id === id);
      setEmployee(found);
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p className="p-6">Loading employee details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
      </div>
    </div>
  );
}
