"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Check if the token exists before making the fetch request
    if (token) {
      fetch("http://127.0.0.1:8000/api/index", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, []);

  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://127.0.0.1:8000/api/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Filter out the deleted user from the state
          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  // logout///////////////////
  function logout() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center pt-10 h-screen bg-slate-100">
      
      <h1 className="text-2xl text-gray-600 font-bold mb-4">
        Registered Users
      </h1>
      {/* Table to display users */}
      <table className="min-w-fit divide-y divide-gray-200">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              delete/update
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 min-w-fit text-center">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 p-1 rounded w-min text-xs mt-3"
                  >
                    Delete
                  </button>
                  <Link href={`/dashboard/updateUser/${user.id}`}>
                    <button className="bg-blue-500 p-1 rounded w-min text-xs mt-3">
                      Update
                    </button>
                  </Link>
                </>
              </>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={logout}
        className="bg-orange-300 p-1 rounded w-20 text-md mt-3"
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
