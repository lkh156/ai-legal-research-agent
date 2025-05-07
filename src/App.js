/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

import ApiKeyPrompt from './components/ApiKeyPrompt';
import FileUploader from './components/FileUploader';
import FactsForm from './components/FactsForm';
import CaseResults from './components/CaseResults';

export default function App() {
  const [apiKey, setApiKey]     = useState(null);
  const [rawText, setRawText]   = useState('');
  const [results, setResults]   = useState('');

  return (
    <div
      css={css`
        max-width: 600px;
        margin: 2rem auto;
        padding: 0 1rem;
        font-family: sans-serif;
      `}
    >
      <h1
        css={css`
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
        `}
      >
        AI Legal Research Agent
      </h1>

      {!apiKey ? (
        <ApiKeyPrompt onSave={setApiKey} />
      ) : (
        <>
          <FileUploader onTextExtracted={setRawText} />
          <FactsForm
            apiKey={apiKey}
            initialFacts={rawText}
            onResults={setResults}
          />
          <CaseResults resultText={results} />
        </>
      )}
    </div>
  );
}
