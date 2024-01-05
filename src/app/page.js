"use client";
import { useState } from "react";
import Userlog from "./components/Userlog";
import Dashboard from "./components/Dashboard";

export default function AuthPage() {


  return (
    <div className="flex justify-center items-center h-screen">  
        <Userlog />    
    </div>
  );
}
