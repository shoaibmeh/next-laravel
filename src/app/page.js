"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "./components/SignUpForm";
import SigninForm from "./components/SignInForm";
import MessageModal from "./components/MessageModal";

export default function AuthPage() {
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const router = useRouter();

  // toggle between signup && sign inn
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };
  const closeModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  // sign up function on submit...........
  const handleSignUpSubmit = async (signUpData) => {
    const response = await fetch("http://127.0.0.1:8000/api/store", {
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
      setModalType("sucess");
      setModalMessage("Sign-up successful!");
    } else {
      if (response.status === 409) {
        setModalType("error");
        setModalMessage("User with this email already exists.");
      }
    }
  };

  // sign in function on submit...........
  const handleSignInSubmit = async (signInData) => {
    const response = await fetch("http://127.0.0.1:8000/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signInData),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      setModalType("sucess");
      setModalMessage("Sign-in successful!");
      router.push("/dashboard");
    } else {
      setModalType("error");
      setModalMessage("Invalid Email or Passwords");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
      {isSignup ? (
        <>
          <SignupForm onSubmit={handleSignUpSubmit} />
        </>
      ) : (
        <>
          <SigninForm onSubmit={handleSignInSubmit} />
        </>
      )}
      <button
        onClick={toggleForm}
        className=" text-md text-black-800 hover:text-blue-900 focus:outline-none border p-2 bg-white"
      >
        {isSignup ? "Switch to Sign In" : "Switch to Sign Up"}
      </button>

      {modalType && (
        <MessageModal
          type={modalType}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
