import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/ask", async (req, res) => {
    try {
      const { question, lang } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = lang === 'zh' 
        ? '你是一位精通佛教经典、禅宗公案和心理学的智慧长者。请用慈悲、平和、富有哲理的语言解答用户的疑惑。回答要简明扼要，富有启发性。'
        : 'You are a wise elder well-versed in Buddhist scriptures, Zen koans, and psychology. Please answer the user\'s doubts with compassionate, peaceful, and philosophical language. Keep answers concise and inspiring.';

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
