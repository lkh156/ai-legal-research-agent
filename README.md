# AI Legal Research Agent

## 📘 Overview

The **AI Legal Research Agent** is a browser-based AI assistant that helps legal professionals and students rapidly identify, retrieve, and understand the most relevant case law for any fact pattern. Upload a legal brief or complaint and receive concise, accurate case summaries powered by OpenAI's GPT models.

This project serves as both a technical showcase and product management portfolio piece.

---

## 🚀 Vision & Purpose

- **Vision**: Accelerate and simplify legal research using AI-driven case retrieval.
- **Purpose**: Showcase AI integration and best-in-class product management in a portfolio-ready format.

---

## 🎯 Objectives & Success Metrics

| Objective                          | Metric                                           |
|-----------------------------------|--------------------------------------------------|
| Research Time Reduction           | ≥ 50% faster than traditional manual research    |
| User Satisfaction                 | ≥ 4.5/5 average usability survey rating          |
| Case Relevance Accuracy           | ≥ 90% expert-reviewed cases judged on-point      |
| Adoption                          | ≥ 100 unique users in first month post-release   |

---

## 👤 Target Users & Personas

- **Junior Associate**: Needs fast, reliable case citations under deadline.
- **Law Student**: Learning to identify and summarize precedent.
- **Solo Practitioner**: Seeking affordable, efficient legal research tools.

---

## 🧩 Key User Stories

- **US1**: Upload a legal brief (PDF, DOCX, or TXT) and auto-extract facts.
- **US2**: Paste and securely manage your OpenAI API key (client-side only).
- **US3**: View top 5 relevant cases with citations and summaries.
- **US4**: Adjust how many results are returned (k).
- **US5**: Download output as PDF or Markdown.

---

## ✅ MVP Scope

- Static React front end hosted on GitHub Pages
- Client-side file parsing via `pdfjs-dist`
- Client-side OpenAI integration via pasted API key
- No backend server or user database

---

## ❌ Out of Scope for v1

- No backend proxy or storage
- No user authentication
- No complex filtering beyond prompt tuning
- No batch processing or multi-document support

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite or CRA), Tailwind CSS
- **PDF Parsing**: `pdfjs-dist`
- **AI**: OpenAI GPT-4o or GPT-4o-mini
- **Hosting**: GitHub Pages

---

## 🧪 Architecture

```text
[Browser] --(upload)--> [pdfjs] --> rawText --> [React App]
                                    ↓
                             [User API Key in State]
                                    ↓
                            --(fetch)--> OpenAI API
                                    ↓
                     JSON Response → React Components
                                    ↓
                    Render Case Summaries in UI


ai-legal-research-agent/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ApiKeyPrompt.jsx
│   │   ├── FileUploader.jsx
│   │   ├── FactsForm.jsx
│   │   └── CaseResults.jsx
│   ├── App.jsx
│   └── index.jsx
├── package.json
├── .gitignore
└── README.md

🧭 Roadmap
Milestone	                                  Status
Project Kickoff & PRD Approval	               ✅
File Upload & Text Extraction	               ✅
OpenAI Prompt Integration	                   ✅
UI/UX Controls & Styling	                   ✅
Deployment & Testing	                       ✅
Demo & Feedback Collection	                   ✅

📦 How to Use
⚙️ Prerequisites
OpenAI account with API key (GPT-4o or GPT-4o-mini access)

Modern browser (Chrome, Firefox, Edge)

🛠️ Setup Instructions (Local)
Clone the repo

git clone https://github.com/your-username/ai-legal-research-agent.git
cd ai-legal-research-agent

Install dependencies

npm install

Run the app

npm run dev

Using the App



(1) Paste your OpenAI API key when prompted (key is not stored).

(2) Upload a legal document (PDF, TXT, DOCX).

(3) Wait for the top 5 cases to populate with short IRAC summaries.



Author
Loran Hendricks