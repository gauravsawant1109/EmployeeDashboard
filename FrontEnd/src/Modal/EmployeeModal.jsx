import React, { useState, useEffect } from "react";

export default function EmployeeModal({ employee, onClose, onSave, readOnly }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    department: "",
    designation: "",
    date_joined: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        department: employee.department || "",
        designation: employee.designation || "",
        date_joined: employee.date_joined?.split("T")[0] || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...employee, ...formData });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{readOnly ? "Employee Details" : "Edit Employee"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["first_name", "last_name", "department", "designation", "date_joined"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field.replace("_", " ")}</label>
              <input
                type={field === "date_joined" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                readOnly={readOnly}
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            {!readOnly && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
