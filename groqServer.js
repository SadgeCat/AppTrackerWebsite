import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/groq", async (req, res) => {
  const { card } = req.body;
  const today = new Date();

  if (!card) return res.status(400).json({ error: "Missing card data" });

  try {
    const result = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are an assistant helping with tracking and organizing a user's applications and also providing tips for the specific deadlines.",
        },
        {
          role: "user",
          content: `Title: ${card.title}\nDescription: ${card.desc}\nStatus: ${card.status}\nDeadline: ${card.deadline}\n\nToday is ${today.toLocaleDateString()}, give actionable suggestions in less than 150 words.`,
        },
      ],
    });

    const message = result.choices[0]?.message?.content || "No suggestions.";
    res.json({ suggestion: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq API failed" });
  }
});

app.listen(port, () => {
  console.log(`Groq server running on http://localhost:${port}`);
});
