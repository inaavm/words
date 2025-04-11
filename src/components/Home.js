import React from "react";
import "./Home.css";

import MindMap from "./Map";
import PageHub from "./PageHub";
import wordCollections from "../data/wordCollections";
import { Link } from "react-router-dom" // Add this import
import { useState } from "react"

                // WUERTSCHATZ 

function Home() {

         
  const [isMenuOpenHome, setIsMenuOpenHome] = useState(false);
 

// Dynamically generate the links from the word collections keys
const links = Object.keys(wordCollections).map((category) => ({
  name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize the category name
  path: `/${category}`, // Path should match the dynamic route
}));


  return (
 
    <div className="home-container-parent">
        <h1> WikiWuertschatz</h1>
         <div className="home-container">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path} // Use Link's 'to' prop to navigate
            className="link"
            onClick={() => {
              setIsMenuOpenHome(false); // Close the menu when a link is clicked
            }}
          >
            {link.name}
          </Link>
        ))}
       </div>
    </div>
  );
}

export default Home
