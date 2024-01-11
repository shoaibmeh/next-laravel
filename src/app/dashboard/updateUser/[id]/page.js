"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

function UpdateUser(props) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (props.params.id) {
      fetch(`http://127.0.0.1:8000/api/users/` + props.params.id)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [props.params.id]);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://127.0.0.1:8000/api/users/${userData.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          router.push("/dashboard"); // Redirect to /dashboard after successful update
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };


  const handleNameChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100">    
      <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-center mb-4 font-bold text-xl">Update User</h1>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleEmailChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>
        <button onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
