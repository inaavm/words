import { useState, useEffect } from "react";

const useWikipediaSearch = (wordCollection) => {
    
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWikipediaData = async (word) => {
    try {
      const response = await fetch(
        `https://lb.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          word
        )}&format=json&origin=*`,
        { mode: "cors" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.query?.search?.length > 0) {
        const snippet = data.query.search[0].snippet;
        const highlightedSnippet = snippet.replace(
          new RegExp(`(${word})`, "gi"),
          "<mark>$1</mark>"
        );

        return {
          found: true,
          title: data.query.search[0].title,
          snippet: highlightedSnippet,
          url: `https://lb.wikipedia.org/wiki/${encodeURIComponent(
            data.query.search[0].title.replace(/ /g, "_")
          )}`,
        };
      } else {
        return { found: false, error: `No results found for word: ${word}` };
      }
    } catch (err) {
      console.error(`Error fetching data for "${word}":`, err);
      return { found: false, error: `Error fetching data: ${err.message}` };
    }
  };

  const checkWords = async () => {
    setLoading(true);
    setError("");
    setResults({});

    const newResults = {};

    for (const word of wordCollection) {
      const result = await fetchWikipediaData(word);
      newResults[word] = result;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    setResults(newResults);
    setLoading(false);
  };

  useEffect(() => {
    checkWords();
  }, [wordCollection]);

  return { results, loading, error };
};

export default useWikipediaSearch;
