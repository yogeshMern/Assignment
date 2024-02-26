import React, { useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const EditForm = ({ data, setEditMode, fetchData }) => {
  const [formData, setFormData] = useState(data);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(
        `http://localhost:8000/api/v1/update-client/${formData._id}`,
        formData
      );
      if (res?.data?.status) {
        setEditMode(false);

        fetchData();
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[60%]">
        <label className="text-[13px] font-semibold">Name</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          value={formData.name}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="name"
          type="text"
          placeholder="Enter Name"
        />
        <label className="text-[13px] font-semibold">Last Name</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          value={formData.lastname}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="lastname"
          type="text"
          placeholder="Enter Last Name"
        />
        <label className="text-[13px] font-semibold">Email</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          value={formData.email}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="email"
          type="email"
          placeholder="Enter email"
        />
        <label className="text-[13px] font-semibold">Mobile NO.</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          value={formData.mobilenumber}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="mobilenumber"
          type="text"
          placeholder="Enter mobile"
        />
        <label className="text-[13px] font-semibold">Project</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          value={formData.project}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="project"
          type="text"
          placeholder="Enter project name"
        />

        <button
          className="w-40px border bg-blue-500 text-white font-semibold text-[13px] py-2 px-5 mt-5 rounded-lg"
          onClick={(e) => handleSubmit(e)}
        >
          Edit Client Details
        </button>
      </div>
    </>
  );
};

export default EditForm;
