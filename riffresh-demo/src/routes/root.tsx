import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-thin tracking-wider">
          Shantanu's Template
        </h1>
        <h2 className="text-4xl font-thin tracking-wider my-6">
          Create React App + Tailwind CSS + Typescript + ReactRouter
        </h2>
      </div>
      <p className="my-6 tracking-wide">
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <div className="mt-6 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
