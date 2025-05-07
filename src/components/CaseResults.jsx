/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import CaseCard from "./CaseCard";

const layout = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const emptyMessage = css`
  font-family: sans-serif;
  color: #333;
  text-align: center;
  margin-top: 3rem;
`;

export default function CaseResults({ results }) {
  const cases = Array.isArray(results) ? results.filter(Boolean) : [];

  return (
    <div css={layout}>
      {cases.length > 0 ? (
        cases.map((c, i) => <CaseCard key={i} caseData={c} index={i} />)
      ) : (
        <p css={emptyMessage}>No case results to display.</p>
      )}
    </div>
  );
}
