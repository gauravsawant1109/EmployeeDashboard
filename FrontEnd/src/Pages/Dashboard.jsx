import React, { useEffect, useState } from "react";
import EmployeeService from "../Services/employeeService"; // Import the EmployeeService

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(null);

  // Fetch employee count on component mount
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const count = await EmployeeService.getEmployeeCount();
        setEmployeeCount(count); // Set the fetched count
      } catch (error) {
        console.error("Failed to fetch employee count:", error);
      }
    };

    fetchEmployeeCount();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {['Total Employees'].map((title, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-2xl fw-bold fs-1 text-indigo-600 text-warning">
              {employeeCount !== null ? employeeCount : "--"} {/* Display count or loading */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
