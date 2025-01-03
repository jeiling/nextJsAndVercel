"use client";
import React from "react";
import PasswordInput from "./components/PasswordInput";
import Calendar from "./components/Calendar";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-10 p-6 justify-center md:justify-start items-center md:items-start bg-black min-h-screen">
      <div className="font-bold text-3xl md:text-5xl text-white text-center md:text-left">
        Password Input
        <div className="mt-4">
          <PasswordInput />
        </div>
      </div>
      <div className="font-bold text-3xl md:text-5xl text-white text-center md:text-left">
        Calendar
        <div className="mt-4">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
