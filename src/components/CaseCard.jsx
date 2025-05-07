/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

const pastelColors = ["#FFFACD", "#C1E1C1", "#FFCCCB", "#D3F8E2", "#E4C1F9"];

const cardWrapper = css`
  width: 220px;
  height: 220px;
  margin: 1.5rem;
  perspective: 800px;
`;

const cardHoverEffect = css`
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 25%;
    width: 50%;
    height: 14px;
    background: #f5e7b2;
    border-radius: 4px;
    transform: rotate(-2deg);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }
`;

const frontFace = (color) => css`
  background: ${color};
  font-family: "Comic Sans MS", cursive, sans-serif;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  height: 100%;
  position: relative;
  z-index: 1;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotateX(-2deg);
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: #f4f4f4;
    clip-path: path("M150 0 Q150 150 0 150 L150 150 Z");
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle at 100% 100%,
    rgba(0, 0, 0, 0.25),
    transparent 70%
  );
  clip-path: path("M150 0 Q150 150 0 150 L150 150 Z");
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}


  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const popupBack = css`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: #fffde7;
  font-family: 'Patrick Hand', cursive;
  font-size: 1.1rem;
  background-image: repeating-linear-gradient(
    to bottom,
    #fffde7,
    #fffde7 23px,
    #fdd835 24px
  );
  border: 4px solid #fdd835;
  border-radius: 8px;
  padding: 2rem;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
`;

const closeBtn = css`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-family: sans-serif;
  float: right;
  margin-bottom: 1rem;
`;

export default function CaseCard({ caseData, index }) {
  const [flipped, setFlipped] = useState(false);
  if (!caseData || typeof caseData !== "object") return null;

  const color = pastelColors[index % pastelColors.length];
  const {
    citation = "No citation",
    issue = "",
    rule = "",
    application = "",
    conclusion = "",
    quotes = []
  } = caseData;

  return (
    <>
      <div css={cardWrapper}>
        <div css={cardHoverEffect} onClick={() => setFlipped(true)}>
          <div css={frontFace(color)}>
            <strong style={{ fontSize: "1rem" }}>Case</strong>
            <p style={{ fontSize: "0.85rem" }}>{citation}</p>
            <small style={{ fontStyle: "italic" }}>Click to flip</small>
          </div>
        </div>
      </div>

      {flipped && (
        <div css={overlay}>
          <div css={popupBack}>
            <button css={closeBtn} onClick={() => setFlipped(false)}>
              Go Back
            </button>
            <h2>{citation}</h2>
            <h3>Issue</h3>
            <p>{issue}</p>
            <h3>Rule</h3>
            <p>{rule}</p>
            <h3>Application</h3>
            <p>{application}</p>
            <h3>Conclusion</h3>
            <p>{conclusion}</p>
            {quotes.length > 0 && (
              <>
                <h3>Quotes</h3>
                <ul>
                  {quotes.map((q, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>
                      {q}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
