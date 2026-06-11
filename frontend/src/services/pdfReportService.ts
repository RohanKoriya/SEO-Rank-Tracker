import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateSeoReportPDF = (analysis: any) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // =========================
  // PAGE 1
  // =========================

  doc.setFontSize(24);
  doc.text("SEO Rank Tracker", pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(16);
  doc.text("SEO Analysis Report", pageWidth / 2, 30, {
    align: "center",
  });

  doc.line(15, 38, 195, 38);

  let y = 50;

  doc.setFontSize(11);

  doc.text(`Website: ${analysis.url}`, 15, y);
  y += 8;

  doc.text(
    `Analysis Date: ${new Date(analysis.createdAt).toLocaleString()}`,
    15,
    y,
  );
  y += 8;

  doc.text(`Status: ${analysis.status}`, 15, y);
  y += 15;

  doc.setFontSize(18);
  doc.text(`Overall SEO Score: ${analysis.overallScore}/100`, 15, y);

  y += 15;

  autoTable(doc, {
    startY: y,
    head: [["Category", "Score"]],
    body: [
      ["SEO", analysis.categories.seo],
      ["Performance", analysis.categories.performance],
      ["Accessibility", analysis.categories.accessibility],
      ["Best Practices", analysis.categories.bestPractices],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  doc.setFontSize(16);
  doc.text("Technical Metrics", 15, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Metric", "Value"]],
    body: [
      ["Load Time", `${analysis.loadTime} ms`],
      ["Page Size", `${Math.round(analysis.pageSize / 1024)} KB`],
      ["Word Count", analysis.wordCount.toLocaleString()],
      ["Total Links", analysis.links.total],
      ["Total Images", analysis.images.total],
      ["Issues Found", analysis.issues.length],
    ],
  });

  // =========================
  // PAGE 2
  // =========================

  doc.addPage();

  y = 20;

  doc.setFontSize(18);
  doc.text("SEO Audit Details", 15, y);

  autoTable(doc, {
    startY: y + 8,
    head: [["Metadata", "Value"]],
    body: [
      ["Title", analysis.metaData.title || "Missing"],
      ["Description", analysis.metaData.description || "Missing"],
      ["Canonical", analysis.metaData.canonical || "Missing"],
      ["Robots", analysis.metaData.robots || "Missing"],
      ["OG Title", analysis.metaData.ogTitle || "Missing"],
      ["Twitter Card", analysis.metaData.twitterCard || "Missing"],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  doc.text("Heading Structure", 15, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Heading", "Count"]],
    body: [
      ["H1", analysis.headings.h1],
      ["H2", analysis.headings.h2],
      ["H3", analysis.headings.h3],
      ["H4", analysis.headings.h4],
      ["H5", analysis.headings.h5],
      ["H6", analysis.headings.h6],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  doc.text("Link Analysis", 15, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Type", "Count"]],
    body: [
      ["Internal", analysis.links.internal],
      ["External", analysis.links.external],
      ["Total", analysis.links.total],
    ],
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  doc.text("Image Analysis", 15, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Metric", "Count"]],
    body: [
      ["Total Images", analysis.images.total],
      ["With Alt", analysis.images.withAlt],
      ["Missing Alt", analysis.images.missingAlt],
    ],
  });

  // =========================
  // PAGE 3
  // =========================

  doc.addPage();

  y = 20;

  doc.setFontSize(18);
  doc.text("Keywords Analysis", 15, y);

  autoTable(doc, {
    startY: y + 8,
    head: [["Keyword", "Count", "Density"]],
    body: analysis.keywords
      .slice(0, 10)
      .map((k: any) => [k.word, k.count, `${k.density}%`]),
  });

  y = (doc as any).lastAutoTable.finalY + 12;

  doc.setFontSize(18);
  doc.text("SEO Issues & Recommendations", 15, y);

  autoTable(doc, {
    startY: y + 8,
    head: [["Severity", "Category", "Issue"]],
    body: analysis.issues
      .slice(0, 15)
      .map((issue: any) => [issue.severity, issue.category, issue.message]),
  });

  // =========================
  // FOOTER
  // =========================

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setFontSize(9);

    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, 290, {
      align: "center",
    });
  }

  const domain = new URL(analysis.url).hostname;

  doc.save(`seo-report-${domain}.pdf`);
};
