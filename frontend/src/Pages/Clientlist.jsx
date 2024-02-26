import React, { useEffect, useState } from "react";
import Axios from "axios";
import EditForm from "./EditForm";
import toast from "react-hot-toast";

const Clientlist = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchData = () => {
    Axios.get(`http://localhost:8000/api/v1/get-client`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log("Error", err));
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:8000/api/v1/delete-client/${id}`)
      .then((res) => {
        toast.success("Client deleted successfully.");
        fetchData();
      })
      .catch((err) => {
        console.log("Error deleting client:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [props.state]);

  const handleEdit = (rowData) => {
    console.log("rowData", rowData);
    setEditData(rowData);
    setEditMode(true);
  };

  return (
    <>
      <h1 className="text-2xl">Clients</h1>

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
                    {data.length !== 0 ? (
                      data.map((e) => {
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
    </>
  );
};

export default Clientlist;
