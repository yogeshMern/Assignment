import React, { useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";

const Createclient = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    project: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        `http://localhost:8000/api/v1/create-client`,
        data
      );
      if (res?.data?.status) {
        setData({
          name: "",
          lastname: "",
          email: "",
          mobilenumber: "",
          project: "",
        });
      }
      toast.success(res.data.message);

      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Create Client</h1>

      <div className="w-[60%]">
        <label className="text-[13px] font-semibold">Name</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="name"
          type="text"
          placeholder="Enter Name"
        />
        <label className="text-[13px] font-semibold">LastName</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="lastname"
          type="text"
          placeholder="Enter Last Name"
        />
        <label className="text-[13px] font-semibold">Email</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="email"
          type="email"
          placeholder="Enter email"
        />
        <label className="text-[13px] font-semibold">Mobile NO.</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="mobilenumber"
          type="text"
          placeholder="Enter mobile"
        />
        <label className="text-[13px] font-semibold">Project</label>
        <br></br>
        <input
          onChange={(e) => handleChange(e)}
          className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
          name="project"
          type="text"
          placeholder="Enter project name"
        />

        <button
          className="w-40px border bg-blue-500 text-white font-semibold text-[13px] py-2 px-5 mt-5 rounded-lg"
          onClick={(e) => handleSubmit(e)}
        >
          Create Client
        </button>
      </div>
    </>
  );
};

export default Createclient;
