import React from 'react'

export default function SalaryDetails() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Salary Details</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p><strong>Base Salary:</strong> ₹60,000</p>
          <p><strong>Bonus:</strong> ₹5,000</p>
          <p><strong>Deductions:</strong> ₹500</p>
          <p><strong>Pay Date:</strong> April 30, 2025</p>
        </div>
      </div>
    );
  }
  