/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

import * as pdfjsLib from "pdfjs-dist";

// Set worker source from CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

    try {
      if (/\.docx$/i.test(file.name)) {
        const arrayBuffer = await file.arrayBuffer();
        let mammoth = window.mammoth;
        if (!mammoth) {
          const module = await import("mammoth");
          mammoth = module.default || module;
        }
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        text = value;

      } else if (/\.pdf$/i.test(file.name)) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + "\n\n";
        }

      } else {
        text = await file.text();
      }
    } catch (err) {
      console.error("[FileUploader] Error extracting text:", err);
      text = "[Error extracting text]";
    }

    console.log("[FileUploader] Extracted text length:", text.length);
    onTextExtracted(text);
    setLoading(false);
  }

  return (
    <div css={containerStyle}>
      <label css={labelStyle}>Upload fact pattern (PDF, DOCX, or TXT):</label>
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
