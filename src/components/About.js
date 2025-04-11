import React from "react";
import "./Home.css";
import Header from "./Header";
 
function About() {


  
  return (

      <div> 
        <Header /> 
  

      <div className='about-container'>
     
            <div className="about-text" >   
                <p>This tool is designed to help users acquire vocabulary in Luxembourgish by providing quick access to Wikipedia links related to specific words. 
                    The goal is to enhance language learning by offering words in context, helping users understand their meanings and usage within real-world topics.
                    This contextual approach helps learners not only memorize words but also understand their application in different contexts.</p>
                <p>Content from Wikipedia, licensed under CC BY-SA 4.0. All external content and links, including Wikipedia articles, are the property of their respective owners.</p>
                 
                 <p>This tool is for educational purposes only.</p> 
        
                 <p>© irina avram 2025. All rights reserved.</p>
             
            </div>

      </div>
      </div>
  );

}

export default About;
