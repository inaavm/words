import React from "react";
import { useState } from "react";
import useWikipediaSearch from "../hooks/useWikipediaSearch"; // Import the custom hook
import wordCollections from "../data/wordCollections"; // Import the consolidated word collections
import { useParams } from "react-router-dom"; // For dynamic routing
import "./page.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function HomePage() {
  return (

    <div>
       <Header /> 
     <Page />
   </div>
  );
}


export default HomePage;