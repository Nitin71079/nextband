import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function generateEssayReport(
  essay
) {
  const pdf =
    await PDFDocument.create();

  const page =
    pdf.addPage([595, 842]);

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  page.drawText(
    "NextBand AI Essay Report",
    {
      x: 50,
      y: 790,
      size: 22,
      font,
      color: rgb(
        0,
        0.6,
        0.8
      ),
    }
  );

  page.drawText(
    `Overall Band: ${essay.evaluation.overallBand}`,
    {
      x: 50,
      y: 750,
      size: 16,
      font,
    }
  );

  page.drawText(
    "Original Essay",
    {
      x: 50,
      y: 710,
      size: 14,
      font,
    }
  );

  page.drawText(
    essay.essay.substring(
      0,
      1200
    ),
    {
      x: 50,
      y: 690,
      size: 10,
      font,
      maxWidth: 500,
      lineHeight: 14,
    }
  );

  const bytes =
    await pdf.save();

  const blob =
    new Blob([bytes], {
      type: "application/pdf",
    });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "nextband-report.pdf";

  link.click();

  URL.revokeObjectURL(url);
}