import React, { useState } from "react";
import "./Home.css";
import categories from "../data/categories";

function Home() {
  const [expandedWords, setExpandedWords] = useState(new Set());

  const handleToggle = (word) => {
    const newExpandedWords = new Set(expandedWords);
    
    if (newExpandedWords.has(word)) {
      newExpandedWords.delete(word);
    } else {
      newExpandedWords.add(word);
    }
    
    setExpandedWords(newExpandedWords);
  };

  // Function to highlight the word in the sentence
  const highlightWord = (sentence, wordToHighlight) => {
    // Case insensitive regular expression to match the word
    const regex = new RegExp(`\\b(${wordToHighlight})\\b`, 'gi');
    
    // Split the sentence by the matching word
    const parts = sentence.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
          // Every odd index is the matched word
          if (i % 2 === 1) {
            return <span key={i} className="highlighted-word">{part}</span>;
          }
          return part;
        })}
      </>
    );
  };

  const renderCategory = (data) => {
    return Object.entries(data).map(([key, value]) => {
      const isArray = Array.isArray(value);

      return (
        <div key={key}>
          <h3>{key}</h3>

          {isArray ? (
            <div className="home-container">
              {value.map(({ word, sentences }, index) => (
                <div key={index} className="word-block">
                  <button
                    className={`link ${
                      expandedWords.has(word) ? "active" : ""
                    }`}
                    onClick={() => handleToggle(word)}
                  >
                    {word}
                  </button>

                  <div
                    className={`expansion ${expandedWords.has(word) ? "open" : ""}`}
                  >
                    {sentences?.length ? (
                      sentences.map((sentence, idx) => (
                        <p key={idx}>{highlightWord(sentence, word)}</p>
                      ))
                    ) : (
                      <p>No examples available.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            renderCategory(value)
          )}
        </div>
      );
    });
  };

  return (
    <div className="home-container-parent">
      {renderCategory(categories)}
    </div>
  );
}

export default Home;