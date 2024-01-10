import { useState } from "react";
const SigninForm = ({ onSubmit }) => {
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

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Call the parent function and pass the form data
    onSubmit(signInData);
  };

  return (
    <form
      onSubmit={handleSignInSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-center mb-4 font-bold text-xl">Sign In</h2>
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
  );
};

export default SigninForm;
