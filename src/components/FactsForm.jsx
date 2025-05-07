/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  margin-bottom: 1rem;
`;

const textareaStyle = css`
  width: 100%;
  height: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 0.5rem;
`;

const buttonStyle = css`
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const errorStyle = css`
  margin-top: 0.5rem;
  color: #dc2626;
  font-family: monospace;
`;

export default function FactsForm({ apiKey, initialFacts, onResults }) {
  const [facts, setFacts] = useState(initialFacts || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialFacts) setFacts(initialFacts);
  }, [initialFacts]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    onResults(""); // clear previous results

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",       // ← switch to a supported model
          messages: [
            {
              role: "system",
              content:
                "You are a legal research assistant. Given a fact pattern, identify the top 5 most relevant U.S. cases (with full citations) and brief each case in IRAC format.",
            },
            { role: "user", content: facts },
          ],
          temperature: 0.1,
          max_tokens: 1024,
          n: 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // API returned an error object
        const msg = data.error?.message || JSON.stringify(data);
        throw new Error(msg);
      }

      const choice = data.choices?.[0]?.message?.content;
      if (!choice) {
        throw new Error("No `choices[0].message.content` in response");
      }

      onResults(choice);
    } catch (err) {
      console.error("FactsForm API error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div css={containerStyle}>
      <textarea
        css={textareaStyle}
        value={facts}
        onChange={(e) => setFacts(e.target.value)}
      />
      <button
        css={buttonStyle}
        disabled={loading || !facts.trim()}
        onClick={handleSubmit}
      >
        {loading ? "Working…" : "Run Research"}
      </button>
      {error && <div css={errorStyle}>⚠️ {error}</div>}
    </div>
  );
}
