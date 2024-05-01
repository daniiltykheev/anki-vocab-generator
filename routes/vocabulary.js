const express = require("express");
const router = express.Router();
const {
  generateVocabulary,
  addToAnki,
} = require("../controllers/vocabularyController");

router.post("/generate", generateVocabulary);
router.post("/add-to-anki", addToAnki);

module.exports = router;
