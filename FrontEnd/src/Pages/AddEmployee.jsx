import React, { useState } from "react";
import EmployeeService from "../Services/employeeService";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    department: "",
    designation: "",
    date_joined: "",
    base_salary: "",
    bonus: "",
    deductions: "",
    pay_date: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    emergency_contact: ""
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await EmployeeService.addEmployee(formData);
      setMessage(res.message || "🎉 Employee added successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        department: "",
        designation: "",
        date_joined: "",
        base_salary: "",
        bonus: "",
        deductions: "",
        pay_date: "",
        phone: "",
        email: "",
        address: "",
        dob: "",
        emergency_contact: ""
      });
    } catch (error) {
      setMessage("❌ Failed to add employee");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Add New Employee</h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-center font-semibold ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Information */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">👤 Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
            <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
            <Input type="email" label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} className="md:col-span-2" />
            <Input type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} />
            <Input label="Emergency Contact" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
          </div>
        </section>

        {/* Employment Details */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-600">💼 Employment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <Input type="date" label="Date Joined" name="date_joined" value={formData.date_joined} onChange={handleChange} />
          </div>
        </section>

        {/* Salary Information */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold mb-4 text-yellow-600">💰 Salary Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="number" label="Base Salary" name="base_salary" value={formData.base_salary} onChange={handleChange} />
            <Input type="number" label="Bonus" name="bonus" value={formData.bonus} onChange={handleChange} />
            <Input type="number" label="Deductions" name="deductions" value={formData.deductions} onChange={handleChange} />
            <Input type="date" label="Pay Date" name="pay_date" value={formData.pay_date} onChange={handleChange} />
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Adding..." : "➕ Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", className = "" }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required={["first_name", "last_name", "email", "phone", "department", "designation", "date_joined", "base_salary"].includes(name)}
      />
    </div>
  );
}
