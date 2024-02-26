import React, { useEffect, useState } from "react";
import Axios from "axios";
import EditForm from "../Pages/EditForm";
import toast from "react-hot-toast";

const Panel = () => {
  // CLIENT LIST
  const [dataa, setDataa] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    await Axios.get(`http://localhost:8000/api/v1/get-client`)
      .then((res) => {
        setDataa(res?.data?.data);
      })
      .catch((err) => console.log("Error", err));
  };

  const handleDelete = async (id) => {
    // test
    try {
      const res = await Axios.delete(
        `http://localhost:8000/api/v1/delete-client/${id}`
      );
      toast.success("Client deleted successfully.");

      if (res?.status) {
        fetchData();
      }
    } catch (error) {
      console.log("Error deleting client:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (rowData) => {
    console.log("rowData", rowData);
    setEditData(rowData);
    setEditMode(true);
  };
  // CLIENT LIST

  // CLIENT CREATE
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
      fetchData();
      toast.success(res?.data?.message);

      setData({
        name: "",
        lastname: "",
        email: "",
        mobilenumber: "",
        project: "",
      });

      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };
  // CLIENT CREATE

  return (
    <>
      <div className="w-full bg-gray-900 h-[50px] ">
        <p className="text-white text-[12px] pl-3 pt-4 font-semibold">
          Clients Panel
        </p>
      </div>

      <div className="flex justify-between items-center m-10">
        <div>
          {editMode ? (
            <div>
              <EditForm
                data={editData}
                setEditMode={setEditMode}
                fetchData={fetchData}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="text-2xl">Clients</h1>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Last Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Mobile no.
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Project
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataa?.length !== 0 ? (
                          dataa?.map((e) => {
                            return (
                              <tr
                                key={e._id}
                                className="border-b dark:border-neutral-500"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.lastname}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.mobilenumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.project}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-bold text-blue-500 flex gap-3">
                                  <button onClick={() => handleEdit(e)}>
                                    EDIT
                                  </button>
                                  <button onClick={() => handleDelete(e._id)}>
                                    DELETE
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            Data not found!
                          </td>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl">Create Client</h1>
          <div className="w-[60%]">
            <label className="text-[13px] font-semibold">Name</label>
            <br></br>
            <input
              onChange={(e) => handleChange(e)}
              value={data.name}
              className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
              name="name"
              type="text"
              placeholder="Enter Name"
            />
            <label className="text-[13px] font-semibold">LastName</label>
            <br></br>
            <input
              onChange={(e) => handleChange(e)}
              value={data.lastname}
              className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
              name="lastname"
              type="text"
              placeholder="Enter Last Name"
            />
            <label className="text-[13px] font-semibold">Email</label>
            <br></br>
            <input
              onChange={(e) => handleChange(e)}
              value={data.email}
              className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <label className="text-[13px] font-semibold">Mobile NO.</label>
            <br></br>
            <input
              onChange={(e) => handleChange(e)}
              value={data.mobilenumber}
              className="border-2 w-[300px] text-[12px] border-gray-400 border-solid"
              name="mobilenumber"
              type="text"
              placeholder="Enter mobile"
            />
            <label className="text-[13px] font-semibold">Project</label>
            <br></br>
            <input
              onChange={(e) => handleChange(e)}
              value={data.project}
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
        </div>
      </div>
    </>
  );
};

export default Panel;
