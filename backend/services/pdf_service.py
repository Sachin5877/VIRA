from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import os

REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)


def generate_report(filename, analysis):

    pdf_path = os.path.join(
        REPORT_DIR,
        filename.replace(".csv", ".pdf").replace(".json", ".pdf")
    )

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(pdf_path)

    story = []

    story.append(Paragraph("VIRA Incident Report", styles["Title"]))
    story.append(Spacer(1, 20))

    story.append(Paragraph(f"<b>Log File:</b> {filename}", styles["Heading2"]))
    story.append(Spacer(1, 15))

    # Clean markdown symbols
    analysis = (
        analysis.replace("**", "")
                .replace("* ", "• ")
                .replace("*", "")
    )

    # Split into paragraphs
    sections = analysis.split("\n")

    for line in sections:

        line = line.strip()

        if not line:
            continue

        # Headings
        if "Threat Summary" in line:
            story.append(Paragraph("<b>Threat Summary</b>", styles["Heading2"]))

        elif "Risk Score" in line:
            story.append(Spacer(1, 10))
            story.append(Paragraph("<b>Risk Score</b>", styles["Heading2"]))

        elif "MITRE ATT&CK" in line:
            story.append(Spacer(1, 10))
            story.append(Paragraph("<b>MITRE ATT&CK</b>", styles["Heading2"]))

        elif "Recommended Actions" in line:
            story.append(Spacer(1, 10))
            story.append(Paragraph("<b>Recommendations</b>", styles["Heading2"]))

        else:
            story.append(Paragraph(line, styles["BodyText"]))

    doc.build(story)

    return pdf_path