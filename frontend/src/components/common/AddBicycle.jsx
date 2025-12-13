import React, { useState } from "react";
import { addBicycle } from "../../api/index";
import { useNavigate } from "react-router-dom";

function AddBicycle() {
  const [formData, setFormData] = useState({ bicycleName: "", costPerHour: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addBicycle(formData);
      alert(response.message); // or use toast
      navigate("/"); // redirect back home
    } catch (error) {
      console.error("Error adding bicycle:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Bicycle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Bicycle Name</label>
          <input
            type="text"
            className="form-control"
            name="bicycleName"
            value={formData.bicycleName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Cost Per Hour</label>
          <input
            type="number"
            className="form-control"
            name="costPerHour"
            value={formData.costPerHour}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Bicycle
        </button>
      </form>
    </div>
  );
}

export default AddBicycle;
