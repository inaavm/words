import React from "react";
import "./page.css";
import Header from "./Header";
import MindMap from "./Map";

function Home() {
  return (

    <div className="container">
       <Header />
      <header className="header">
        <h1>Welcome to My React App</h1>
        <p>Your go-to platform for awesome features.</p>
      </header>

      <div className="button-container">
        <button className="button" onClick={() => alert("Navigating to Features")}>
          Explore Features
        </button>
        <button className="button" onClick={() => alert("Navigating to About Us")}>
          About Us
        </button>
        <MindMap/>
      </div>
    </div>
  );
}

export default Home