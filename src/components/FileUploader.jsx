/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

// PDF.js is injected via CDN in public/index.html
const pdfjsLib = window.pdfjsLib;

const containerStyle = css`
  margin-bottom: 1rem;
`;
const labelStyle = css`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const inputStyle = css`
  display: block;
  margin-bottom: 0.5rem;
`;
const loadingStyle = css`
  font-style: italic;
  font-size: 0.875rem;
`;

export default function FileUploader({ onTextExtracted }) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("[FileUploader] Selected:", file.name, file.type);

    setLoading(true);
    let text = "";

    // 1️⃣ DOCX via Mammoth (global or dynamic import)
    if (/\.docx$/i.test(file.name)) {
      console.log("[FileUploader] Parsing as DOCX");
      try {
        const arrayBuffer = await file.arrayBuffer();
        let value;

        // Try global (CDN) mammoth first
        if (window.mammoth && window.mammoth.extractRawText) {
          ({ value } = await window.mammoth.extractRawText({ arrayBuffer }));
        } else {
          // Fallback: dynamic import of the npm package
          const mammothModule = await import("mammoth");
          const mammoth = mammothModule.default || mammothModule;
          ({ value } = await mammoth.extractRawText({ arrayBuffer }));
        }
        text = value;
      } catch (err) {
        console.error("[FileUploader] Mammoth error:", err);
        text = "[Error extracting DOCX text]";
      }

    // 2️⃣ PDF via PDF.js
    } else if (/\.pdf$/i.test(file.name)) {
      console.log("[FileUploader] Parsing as PDF");
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        console.log("[FileUploader] PDF pages:", pdf.numPages);

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const { items } = await page.getTextContent();
          text += items.map((item) => item.str).join(" ") + "\n\n";
        }
      } catch (err) {
        console.error("[FileUploader] PDF.js error:", err);
        text = "[Error extracting PDF text]";
      }

    // 3️⃣ TXT (and other text)
    } else {
      console.log("[FileUploader] Parsing as plain text");
      try {
        text = await file.text();
      } catch (err) {
        console.error("[FileUploader] Text extraction error:", err);
        text = "[Error extracting text]";
      }
    }

    console.log("[FileUploader] Extracted text length:", text.length);
    onTextExtracted(text);
    setLoading(false);
  }

  return (
    <div css={containerStyle}>
      <label css={labelStyle}>
        Upload fact pattern (PDF, DOCX, or TXT):
      </label>
      <input
        css={inputStyle}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFile}
      />
      {loading && <div css={loadingStyle}>Extracting text…</div>}
    </div>
  );
}
