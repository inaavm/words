"use client"

import { useState, useEffect } from "react"
import "./Wiki.css"

export default function Wiki () {
  const hardcodedWords = ["Foussball", "Sport", "Vëlo", "Kierper", "Geescht", "photosynthesis", "blockchain"]

  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedWord, setSelectedWord] = useState(null)

  useEffect(() => {
    checkWords()
  }, [])

  const fetchWikipediaData = async (word) => {
    try {
      const response = await fetch(
        `https://lb.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(word)}&format=json&origin=*`,
        { mode: "cors" },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (data?.query?.search?.length > 0) {
        const snippet = data.query.search[0].snippet

        // Highlight the searched word in the snippet
        const highlightedSnippet = snippet.replace(new RegExp(`(${word})`, "gi"), "<mark>$1</mark>")

        return {
          found: true,
          title: data.query.search[0].title,
          snippet: highlightedSnippet,
          url: `https://lb.wikipedia.org/wiki/${encodeURIComponent(data.query.search[0].title.replace(/ /g, "_"))}`,
        }
      } else {
        return { found: false, error: `No results found for word: ${word}` }
      }
    } catch (err) {
      console.error(`Error fetching data for "${word}":`, err)
      return { found: false, error: `Error fetching data: ${err.message}` }
    }
  }

  const checkWords = async () => {
    setLoading(true)
    setError("")
    setResults({})

    const newResults = {}

    for (const word of hardcodedWords) {
      const result = await fetchWikipediaData(word)
      newResults[word] = result
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    setResults(newResults)
    setLoading(false)
  }

  const handleWordClick = (word) => {
    setSelectedWord(word === selectedWord ? null : word)
  }

  return (
    <div className="container">
      <h2 className="title">Wikipedia Word Checker</h2>

      {loading ? (
        <div className="loading">
          <div className="loading-text">Checking words on Wikipedia...</div>
        </div>
      ) : (
        <>
          <div className="words-section">
            <h3 className="section-title">Words:</h3>
            <div className="words-grid">
              {hardcodedWords.map((word) => (
                <button
                  key={word}
                  onClick={() => handleWordClick(word)}
                  className={`word-button ${selectedWord === word ? "selected" : ""}`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <button className="refresh-button" onClick={checkWords}>
            Refresh Results
          </button>

          {error && <p className="error-message">{error}</p>}

          {selectedWord && results[selectedWord] && (
            <div className="result-container">
              <div className="result-header">
                <h3 className="word-title">{selectedWord}</h3>
                <span className={`status-badge ${results[selectedWord].found ? "found" : "not-found"}`}>
                  {results[selectedWord].found ? "✓ Found" : "✗ Not Found"}
                </span>
              </div>

              {results[selectedWord].found ? (
                <div className="wiki-content">
                  <div
                    className="wiki-snippet"
                    dangerouslySetInnerHTML={{ __html: results[selectedWord].snippet || "" }}
                  />
                  <a href={results[selectedWord].url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                    View on Wikipedia →
                  </a>
                </div>
              ) : (
                <p className="error-message">{results[selectedWord].error}</p>
              )}
            </div>
          )}

          {!selectedWord && <div className="empty-state">Click on a word to see its Wikipedia information</div>}
        </>
      )}
    </div>
  )
}

 