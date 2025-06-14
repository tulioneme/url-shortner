import React, { useState } from "react";

const API_URL = "http://localhost:3000/api"; // Adjust port if needed

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const res = await fetch(`${API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(`${API_URL}/${data.shortUrl}`);
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", textAlign: "center" }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
          style={{ width: "70%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: 8 }}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: 20 }}>
          <strong>Short URL:</strong>{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 20 }}>{error}</div>}
    </div>
  );
}

export default App;
