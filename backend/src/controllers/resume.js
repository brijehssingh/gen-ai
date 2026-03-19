import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import PDFDocument from "pdfkit";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 📄 Read PDF
    const data = new Uint8Array(await fs.promises.readFile(file.path));
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }

    // 🤖 Better prompt (structured output)
    const prompt = `
Analyze this resume and respond in structured format:

ATS Score: XX/100

Strengths:
- point 1
- point 2

Weaknesses:
- point 1

Suggestions:
- point 1

Improved Resume:
Name:
Email:
Skills:
- skill 1
- skill 2

Experience:
- exp 1
- exp 2
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt + "\n\nResume:\n" + text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResult = response.data.choices[0].message.content;

    // 📄 Create formatted PDF
    const filePath = `uploads/improved_${Date.now()}.pdf`;
    const doc = new PDFDocument({ margin: 40 });

    doc.pipe(fs.createWriteStream(filePath));

    const lines = aiResult.split("\n");

    lines.forEach((line) => {
      const lower = line.toLowerCase();

      if (line.includes("ATS Score")) {
        doc.moveDown().fontSize(18).fillColor("blue").text(line);
      } else if (
        lower.includes("strength") ||
        lower.includes("weakness") ||
        lower.includes("suggestion") ||
        lower.includes("resume") ||
        lower.includes("experience") ||
        lower.includes("skills")
      ) {
        doc.moveDown().fontSize(14).fillColor("black").text(line);
      } else if (line.startsWith("-")) {
        doc.fontSize(12).fillColor("black").text(line);
      } else {
        doc.fontSize(11).fillColor("gray").text(line);
      }
    });

    doc.end();

    // 🧹 delete temp file
    fs.unlink(file.path, () => {});

    res.json({
      analysis: aiResult,
      pdf: filePath,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Resume analysis failed" });
  }
});

export default router;