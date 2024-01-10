import { useState } from "react";
import MessageModal from "./MessageModal";

const SignupForm = ({ onSubmit }) => {
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
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
  
//  close modal after error
  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Password validation logic
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(signUpData.password)) {
      setModalType("error");
      setModalMessage(
        "Password must contain 1 uppercase and 1 special character"
      );
      return;
    }
    // Call the parent function and pass the form data
    onSubmit(signUpData);
  };

  return (
    <div>
      <form
        onSubmit={handleSignUpSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-center mb-4 font-bold text-xl">Sign Up</h2>
        {/* <h2 className="text-center mb-4  text-md">
            Already have an account?
            <span
              className="text-sm text-blue-500 hover:text-blue-800 focus:outline-none cursor-pointer"
              onClick={toggleForm}
            >
              {" "}
              Sign in here.
            </span>
          </h2> */}
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
      {modalType && (
        <MessageModal
          type={modalType}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SignupForm;
