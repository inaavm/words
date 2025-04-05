 
import { useState, useEffect } from "react"
import "./page.css"

export default function Sport() {
  const hardcodedWords = ["Foussball", "Sport", "sportlech", "Vëlo", "Kierper", "Geescht", "D'Olympesch Spiller","photosynthesis", "Ustrengung"]

  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  return (
    <div className="container">
      {/* <header className="header">
        <h1 className="site-title">wikipedia.words</h1>
        <button className="refresh-button" onClick={checkWords}>
          REFRESH
        </button>
      </header> */}
  
      {loading ? (
        <div className="loading">
          <div className="loading-text">Checking words on Wikipedia...</div>
        </div>
      ) : (
        <div className="results-list">
          {hardcodedWords.map((word) => (

            <div className="result-row">
                <a href={results[word].url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                    ↗
                  </a>
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
            </div>
          ))}
        </div> 
      )}
    </div>
  );
  
}

