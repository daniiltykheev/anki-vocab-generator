const express = require("express");
const app = express();
require("dotenv").config();

const { PORT = 3000 } = process.env;
const vocabularyRoutes = require("./routes/vocabulary"); // Routes for handling vocabulary operations

app.use(express.json());
app.use(express.static("public")); // Serve static files

app.use(vocabularyRoutes); // Use the vocabulary routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
