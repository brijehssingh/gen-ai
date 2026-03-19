import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { role, question } = req.body;

  let systemPrompt = "";

  // 🎯 Better prompts (improved response quality)
  if (role === "doctor") {
    systemPrompt = `
    You are a professional doctor.
    Answer in:
    - simple language
    - short explanation
    - bullet points if needed
    - give safe advice only
    `;
  } else if (role === "teacher") {
    systemPrompt = `
    You are a teacher.
    Explain clearly with:
    - simple examples
    - step-by-step explanation
    `;
  } else if (role === "gym") {
    systemPrompt = `
    You are a gym trainer.
    Answer with:
    - exercises (sets & reps)
    - tips
    - diet suggestions
    `;
  }

  try {
    // 🔥 1. TEXT RESPONSE
    const textResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      textResponse.data.choices[0].message.content;

    // 🔥 2. IMAGE GENERATION (auto if user asks)
    let imageUrl = null;

    if (
      question.toLowerCase().includes("image") ||
      question.toLowerCase().includes("draw") ||
      question.toLowerCase().includes("picture")
    ) {
      try {
        const imageResponse = await axios.post(
          "https://openrouter.ai/api/v1/images/generations",
          {
            model: "stabilityai/sdxl",
            prompt: question,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        imageUrl = imageResponse.data.data[0].url;

      } catch (imgErr) {
        console.log("Image error:", imgErr.message);
      }
    }

    // ✅ FINAL RESPONSE
    res.json({
      answer,
      imageUrl, // null if no image
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;