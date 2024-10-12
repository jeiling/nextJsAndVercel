"use client";
import React from "react";
import PasswordInput from "./components/PasswordInput";
import Calendar from "./components/Calendar";

const Home: React.FC = () => {
  return (
    <div className="flex gap-x-10">
      <div className="flex flex-col gap-y-5">
        <div className="font-bold text-5xl">Password Input</div>
        <PasswordInput />
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="font-bold text-5xl">Calendar</div>
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
