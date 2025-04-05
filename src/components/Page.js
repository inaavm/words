import React from "react";
import { useState } from "react";
import useWikipediaSearch from "../hooks/useWikipediaSearch"; // Import the custom hook
import wordCollections from "../data/wordCollections"; // Import the consolidated word collections
import { useParams } from "react-router-dom"; // For dynamic routing
import "./page.css";
import Header from "./Header";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";




export default function Page() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { category } = useParams(); 

  const wordList = wordCollections[category] || []; 
  
  const { results, loading, error } = useWikipediaSearch(wordList);
  // If the category doesn't exist, show an error or redirect
  if (!wordCollections[category]) {
    return <div>Category not found!</div>;
  }

 
  return (

    <div>
    <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    <div className="container-results" style={{ marginTop: isMenuOpen ? "200px" : "0px" }}>
      {loading ? (
        <div className="loading">
          <div className="loading-text">Checking words on Wikipedia...</div>
        </div>
      ) : (
        <div className="results-list">
          {wordCollections[category].map((word) => (
            <a className="result-row" 
            key={word}
            href={results[word]?.url}
            target="_blank"
            rel="noopener noreferrer"
            >

            <LiaExternalLinkSquareAltSolid
            className="icon"
            style={{
              size:"3"
            }} />
              
              {/* <a
                href={results[word]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="wiki-link"
              >
                ↗
              </a> */}
              <div className="word-column">
                <span className="word-text">{word}</span>
              </div>

              <div className="snippet-column">
                {results[word]?.found ? (
                  <span
                    className="wiki-snippet"
                    dangerouslySetInnerHTML={{ __html: `"${results[word].snippet}"` }}
                  />
                ) : (
                  <span className="not-found">
                    {results[word]?.error || "No information found"}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
   </div>
  );
}
