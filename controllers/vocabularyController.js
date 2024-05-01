const { openai } = require("../services/openaiService");
const { createDeck, addCardToDeck } = require("../services/ankiService");

async function generateVocabulary(req, res) {
  const { language, topic } = req.body;
  const prompt = `Please generate 20 pairs of words with definite articles in English and ${language}. Include definite articles in both languages. The topic of the vocabulary list is ${topic}.`;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 500,
    });

    if (
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].text.trim()
    ) {
      res.json(parseVocabulary(response.choices[0].text));
    } else {
      res.status(500).json({ error: "Failed to generate vocabulary" });
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "OpenAI API Error" });
  }
}

async function addToAnki(req, res) {
  const { vocabularyList, language, topic } = req.body;

  if (!Array.isArray(vocabularyList)) {
    return res.status(400).json({ error: "Invalid vocabulary list format" });
  }

  try {
    const deckName = `${language}-${topic}`;
    await createDeck(deckName);
    for (let vocab of vocabularyList) {
      await addCardToDeck(deckName, vocab.Front, vocab.Back);
    }
    res.json({ success: true, message: "Words added to Anki successfully!" });
  } catch (error) {
    console.error("Error in /add-to-anki:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
}

function parseVocabulary(text) {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.includes(" - "));
  return lines
    .map((line) => {
      const [Front, Back] = line.split(" - ").map((part) => part.trim());
      return { Front, Back };
    })
    .filter((item) => item != null);
}

module.exports = { generateVocabulary, addToAnki };
