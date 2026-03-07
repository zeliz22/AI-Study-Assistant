import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/ask", async (req, res) => {

  const { question } = req.body;

  try {

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful study assistant." },
        { role: "user", content: question }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});