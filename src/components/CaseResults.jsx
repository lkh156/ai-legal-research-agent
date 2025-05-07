/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const containerStyle = css `
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb
    border: 1px solid #e5e7eb;
    border-radius: 6px;
`;

const headingStyle = css `
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
`;

const preStyle = css `
    white-space: pre-wrap;
    font-family: monospace;
    line-height: 1.4;
`;

export default function CaseResults({ resultText }) {
    if (!resultText) return null;

    return (
        <div css={containerStyle}>
            <div css={headingStyle}>
                <pre css={preStyle}>{resultText}</pre>
            </div>
        </div>
    );
}