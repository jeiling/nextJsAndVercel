"use client";
import React from "react";
import PasswordInput from "./components/PasswordInput";
import Calendar from "./components/Calendar";
import CalendarFigma from "./components/CalendarFigma";

const Home: React.FC = () => {
  return (
    <div className="flex gap-x-10">
      <div className="flex flex-col gap-y-5">
        <div className="font-bold text-5xl">Password Input</div>
        <PasswordInput />
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="font-bold text-5xl">MUI Calendar</div>
        <Calendar />
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="font-bold text-5xl">Figma Calendar</div>
        <CalendarFigma />
      </div>
    </div>
  );
};

export default Home;
