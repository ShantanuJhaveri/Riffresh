import React from "react";

function Home() {
  return (
    <div>
      <a
        className="uppercase hover:underline"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <a
        className="ml-10 uppercase hover:underline"
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Tailwind
      </a>
    </div>
  );
}

export default Home;
