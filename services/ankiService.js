const axios = require("axios");
const ANKI_CONNECT_URL = "http://localhost:8765";

async function createDeck(deckName) {
  try {
    const result = await axios.post(ANKI_CONNECT_URL, {
      action: "createDeck",
      version: 6,
      params: {
        deck: deckName,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error creating deck:", error);
    return null;
  }
}

async function addCardToDeck(deckName, front, back, retryCount = 3) {
  try {
    const result = await axios.post(ANKI_CONNECT_URL, {
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: deckName,
          modelName: "Basic (type in the answer)",
          fields: {
            Front: front,
            Back: back,
          },
          options: {
            allowDuplicate: false,
          },
          tags: ["anki-generator"],
        },
      },
    });
    return result.data;
  } catch (error) {
    if (retryCount > 0) {
      console.warn(`Retrying... (${3 - retryCount + 1})`);
      return addCardToDeck(deckName, front, back, retryCount - 1);
    } else {
      console.error("Error adding card:", error);
      return null;
    }
  }
}

module.exports = { createDeck, addCardToDeck };
