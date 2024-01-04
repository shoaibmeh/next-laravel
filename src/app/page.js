"use client";
import { useState } from "react";

export default function AuthPage() {
  // toggle between signup && sign in
  const toggleForm = () => {
    setFormType(formType === "signin" ? "signup" : "signin");
  };
  const [formType, setFormType] = useState("signup");

  // sign-in function.............
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  // sign in function on submit...........
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signInData),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('User signed in:', data);
      setModalContent({ type: "success", message: "Sign-in successful!" });
      window.location.href = "https://nextjs.org/";
    } else {
      // console.error('User sign-in failed');
      setModalContent({ type: "error", message: "Invalid Email or Password." });
    }
  };

  // registration function...........
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // sign up function on submit...........
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signUpData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User registered:", data);
      setModalContent({ type: "success", message: "Sign-up successful!" });
      setFormType("signin");
    } else {
      if (response.status === 409) {
        setModalContent({
          type: "error",
          message: "User with this email already exists.",
        });
      }
    }
  };

  // modal function....................
  const [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* sign-in form//////////////////// */}
      {formType === "signin" && (
        <form
          onSubmit={handleSignInSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center mb-4 font-bold text-xl">Sign In</h2>
          <h2 className="text-center mb-4  text-md">
            Don't have an account?
            <span
              className="text-sm text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
              onClick={toggleForm}
            >
              {" "}
              Create one now.
            </span>
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={signInData.email}
              onChange={handleSignInChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={signInData.password}
              onChange={handleSignInChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      )}

      {/* sign-up form//////////////////// */}
      {formType === "signup" && (
        <form
          onSubmit={handleSignUpSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-center mb-4 font-bold text-xl">Sign Up</h2>
          <h2 className="text-center mb-4  text-md">
            Already have an account?
            <span
              className="text-sm text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
              onClick={toggleForm}
            >
              {" "}
              Sign in here.
            </span>
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              required
              type="text"
              placeholder="Enter your name"
              name="name"
              value={signUpData.name}
              onChange={handleSignUpChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}

      {/* Modal */}
      {modalContent && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
            <p className="text-xl font-semibold mb-4">
              {modalContent.type === "success" ? "Success!" : "Error!"}
            </p>
            <p>{modalContent.message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
