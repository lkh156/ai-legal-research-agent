/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

const containerStyle = css`margin-bottom: 1rem;`;
const labelStyle = css`
  font-weight: bold;
  display: block;
  margin-top: 0.5rem;
`;
const inputStyle = css`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
  const [numCases, setNumCases] = useState("3");
  const [numQuotes, setNumQuotes] = useState("5");
  const [side, setSide] = useState("Plaintiff");
  const [jurisdiction, setJurisdiction] = useState("U.S. Supreme Court");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialFacts) setFacts(initialFacts);
  }, [initialFacts]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    onResults(""); // clear previous results

    const cappedCases = Math.min(Number(numCases), 5);
    const cappedQuotes = Math.min(Number(numQuotes), 10);

    const prompt = `
You are a legal research assistant. Given the fact pattern below, identify the top ${cappedCases} most relevant U.S. cases that would support the position of the **${side}**.

Limit your search to: **${jurisdiction}**.

For each case, provide a **detailed IRAC brief** with at least **${cappedQuotes} direct quotes** (with pinpoint citations) from the case text to support your analysis.

Format:

Case 1: [Full Citation]
Issue: ...
Rule: ...
Application: ...
Conclusion: ...
Quotes:
1. "..." (Citation)
2. "..." (Citation)
...

Fact Pattern:
${facts}
`.trim();

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a legal research assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.1,
          max_tokens: 4096,
          n: 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || JSON.stringify(data));

      const choice = data.choices?.[0]?.message?.content;
      if (!choice) throw new Error("No `choices[0].message.content` in response");

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
      <label css={labelStyle}>Number of Cases (max 5):</label>
      <input
        css={inputStyle}
        type="number"
        min="1"
        max="5"
        value={numCases}
        onChange={(e) => setNumCases(e.target.value)}
      />

      <label css={labelStyle}>Number of Quotes per Case (max 5):</label>
      <input
        css={inputStyle}
        type="number"
        min="1"
        max="5"
        value={numQuotes}
        onChange={(e) => setNumQuotes(e.target.value)}
      />

      <label css={labelStyle}>Which Side Are You Representing?</label>
      <select css={inputStyle} value={side} onChange={(e) => setSide(e.target.value)}>
        <option>Plaintiff</option>
        <option>Defendant</option>
      </select>

      <label css={labelStyle}>Jurisdiction (State, Circuit, Supreme Court):</label>
      <input
        css={inputStyle}
        type="text"
        value={jurisdiction}
        onChange={(e) => setJurisdiction(e.target.value)}
        placeholder="e.g., 1st Circuit, Texas, U.S. Supreme Court"
      />

      <label css={labelStyle}>Fact Pattern:</label>
      <textarea
        css={textareaStyle}
        value={facts}
        onChange={(e) => setFacts(e.target.value)}
        placeholder="Paste or upload your fact pattern..."
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
