 

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import useWikipediaSearch from "../hooks/useWikipediaSearch"
import wordCollections from "../data/wordCollections"
import Header from "./Header"
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia"
import "./PageHub.css"

export default function PageHub() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeWord, setActiveWord] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const hubRef = useRef(null)
  const wordRefs = useRef({})

  const { category } = useParams()
  const wordList = wordCollections[category] || []

  // Get Wikipedia results for all words in the category
  const { results, loading } = useWikipediaSearch(wordList)

  // Calculate positions in a circle for each word
  useEffect(() => {
    if (!hubRef.current || wordList.length === 0 || loading) return

    const wordElements = document.querySelectorAll(".hub-word")
    const container = hubRef.current
    const containerRect = container.getBoundingClientRect()

    // Calculate the radius based on container size and word count
    const radius = Math.min(containerRect.width, containerRect.height) * 0.35

    // Animate words appearing one by one
    wordElements.forEach((element, index) => {
      // Calculate position in a circle
      const angle = (index / wordList.length) * 2 * Math.PI
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      // Set initial state (hidden)
      element.style.opacity = "0"
      element.style.transform = `translate(0px, 0px) scale(0.5)`

      // Animate with delay based on index
      setTimeout(
        () => {
          element.style.transition = "all 0.5s ease-out"
          element.style.opacity = "1"
          element.style.transform = `translate(${x}px, ${y}px) scale(1)`

          // Check if this is the last word to animate
          if (index === wordList.length - 1) {
            setTimeout(() => setAnimationComplete(true), 500)
          }
        },
        100 + index * 200,
      ) // Stagger the animations
    })
  }, [wordList, loading])

  // Handle word click
  const handleWordClick = (word) => {
    setActiveWord(activeWord === word ? null : word)
  }

  // Calculate result container position
  const getResultPosition = (word) => {
    const wordElement = wordRefs.current[word]
    if (!wordElement || !hubRef.current) return { top: 0, left: 0 }

    const wordRect = wordElement.getBoundingClientRect()
    const hubRect = hubRef.current.getBoundingClientRect()

    // Position the result container near the word but not overlapping
    // This is a simple positioning strategy - can be improved
    const centerX = hubRect.left + hubRect.width / 2
    const centerY = hubRect.top + hubRect.height / 2

    // Position based on which quadrant the word is in
    const isRightSide = wordRect.left > centerX
    const isBottomSide = wordRect.top > centerY

    let top, left

    if (isRightSide && !isBottomSide) {
      // Top-right quadrant
      left = wordRect.right + 10
      top = wordRect.top
    } else if (isRightSide && isBottomSide) {
      // Bottom-right quadrant
      left = wordRect.right + 10
      top = wordRect.top - 100
    } else if (!isRightSide && isBottomSide) {
      // Bottom-left quadrant
      left = wordRect.left - 250
      top = wordRect.top - 100
    } else {
      // Top-left quadrant
      left = wordRect.left - 250
      top = wordRect.top
    }

    return { top, left }
  }

  if (!wordCollections[category]) {
    return <div>Category not found!</div>
  }

  return (
    <div>
      <Header onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div className="hub-container" style={{ marginTop: isMenuOpen ? "200px" : "0px" }}>
        {loading ? (
          <div className="loading">
            <div className="loading-text">Checking words on Wikipedia...</div>
          </div>
        ) : (
          <div className="hub-wrapper">
            <div className="hub" ref={hubRef}>
              <div className="hub-center">
                <h2>{category}</h2>
              </div>

              {wordList.map((word, index) => {
                return (
                  <div key={word} className="hub-word-container">
                    <div
                      ref={(el) => (wordRefs.current[word] = el)}
                      className={`hub-word ${activeWord === word ? "active" : ""}`}
                      onClick={() => handleWordClick(word)}
                    >
                      {word}
                    </div>

                    {activeWord === word && animationComplete && (
                      <div className="word-result" style={getResultPosition(word)}>
                        <div className="result-header">
                          <h3>{word}</h3>
                          <a href={results[word]?.url} target="_blank" rel="noopener noreferrer" className="wiki-link">
                            <LiaExternalLinkSquareAltSolid size={18} />
                          </a>
                        </div>
                        <div className="result-content">
                          {results[word]?.found ? (
                            <span
                              className="wiki-snippet"
                              dangerouslySetInnerHTML={{ __html: `"${results[word].snippet}"` }}
                            />
                          ) : (
                            <span className="not-found">{results[word]?.error || "No information found"}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
