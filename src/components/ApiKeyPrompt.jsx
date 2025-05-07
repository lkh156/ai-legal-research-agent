/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

const containerStyle = css`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const labelStyle = css`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const inputStyle = css`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
`;

const buttonStyle = css`
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function ApiKeyPrompt({ onSave }) {
  // Destructure both state variables here
  const [key, setKey] = useState('');

  return (
    <div css={containerStyle}>
      <label css={labelStyle}>Enter your OpenAI API Key:</label>
      <input
        css={inputStyle}
        type="password"
        placeholder="sk-..."
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button
        css={buttonStyle}
        disabled={!key.trim()}
        onClick={() => onSave(key.trim())}
      >
        Save Key
      </button>
    </div>
  );
}
