import React, { useState } from "react";
import "./UrlShortener.css";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      setError(true);
      setShortUrl("");
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: longUrl,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.text(); // IMPORTANT: text(), not json()
      setShortUrl(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  // copy to clipboard functionality using the Clipboard API
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-mark">
          <div className="logo-icon">✂</div>
          <div className="logo-text">Tiny</div>
        </div>
        <h1>
          Shorter links, <span>bigger impact</span>
        </h1>
        <p className="subtitle">
          Enter a long URL to create a concise tiny link.
        </p>
      </header>

      <main className="card">
        <div className="section-label">Optimize your link</div>
        <div className="input-group">
          <input
            type="url"
            className="url-input"
            placeholder="Paste your long link here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            className={`btn-shorten ${loading ? "loading" : ""}`}
            onClick={handleShorten}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>Processing...
              </>
            ) : (
              "Shorten URL"
            )}
          </button>
        </div>
        {error && (
          <div className="error-card show">
            Please enter a valid URL (including http/https).
          </div>
        )}
      </main>

      {shortUrl && (
        <div className="result-card show">
          <div className="result-header">
            <div className="result-dot"></div>
            <div className="result-label">Link ready</div>
          </div>
          <div className="short-url-box">
            <div className="short-url-text">{shortUrl}</div>
            <button
              className={`btn-copy ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="original-url">{longUrl}</div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
