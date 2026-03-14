export const askZenQuestion = async (question: string, lang: string): Promise<string> => {
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, lang }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text || (lang === 'zh' ? '抱歉，我暂时无法回答您的问题。' : 'Sorry, I cannot answer your question right now.');
  } catch (error) {
    console.error("Error calling backend API:", error);
    throw error;
  }
};
