export default function parseIRACTextToCases(text) {
  const caseSections = text
    .split(/\n(?=Case\s+\d+:)/i)
    .filter((block) => block.trim() !== "");

  return caseSections
    .map((section) => {
      const citation = section.match(/Case\s+\d+:\s*(.+?)\n/i)?.[1]?.trim() || "";
      const issue = section.match(/Issue:\s*([\s\S]*?)\n(?=Rule:|$)/i)?.[1]?.trim() || "";
      const rule = section.match(/Rule:\s*([\s\S]*?)\n(?=Application:|$)/i)?.[1]?.trim() || "";
      const application = section.match(/Application:\s*([\s\S]*?)\n(?=Conclusion:|$)/i)?.[1]?.trim() || "";
      const conclusion = section.match(/Conclusion:\s*([\s\S]*?)\n(?=Quotes:|$)/i)?.[1]?.trim() || "";

      const quotesSection = section.match(/Quotes:\s*([\s\S]*)/i)?.[1] || "";
      const quotes = Array.from(
        quotesSection.matchAll(/^\s*\d+\.\s*"(.*?)"\s*\((.*?)\)/gm)
      ).map((match) => `"${match[1].trim()}" (${match[2].trim()})`);

      return { citation, issue, rule, application, conclusion, quotes };
    })
    .filter((c) => c.citation); // Filter out empty results
}
