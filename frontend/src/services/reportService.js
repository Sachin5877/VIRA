import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function generateReport(report) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(0, 102, 204);
  doc.text("VIRA Incident Report", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(80);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    30
  );

  doc.text(
    `Uploaded File: ${report.file}`,
    14,
    38
  );

  doc.setFontSize(15);
  doc.setTextColor(0);
  doc.text("AI Investigation Summary", 14, 52);

  doc.setFontSize(11);

  const summary = doc.splitTextToSize(
    report.summary,
    180
  );

  doc.text(summary, 14, 60);

  let y = 60 + summary.length * 6 + 10;

  doc.setFontSize(15);
  doc.text("MITRE ATT&CK Mapping", 14, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Technique ID", "Technique"]],
    body: report.mitre.map((m) => [
      m.id,
      m.name,
    ]),
  });

  y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(15);
  doc.text("Indicators of Compromise", 14, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["IOC"]],
    body: report.iocs.map((i) => [i]),
  });

  y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(15);
  doc.text("Investigation Timeline", 14, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Event"]],
    body: report.timeline.map((t) => [t]),
  });

  doc.save("VIRA_Incident_Report.pdf");
}