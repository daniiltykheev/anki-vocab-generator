// Select DOM elements once and reuse them
const form = document.getElementById("vocabularyForm");
const spinner = document.getElementById("loadingSpinner");
const vocabList = document.getElementById("vocabularyList");
const resultsHeader = document.getElementById("resultsHeader");
const addToAnkiButton = document.getElementById("addToAnkiButton");

function toggleSpinner(show) {
  spinner.classList.toggle("hidden", !show);
}

function displayResults(data) {
  const parsedData = data.map((item) => {
    return { Front: item.Front.replace(/^[0-9]+\.\s*/, ""), Back: item.Back };
  });

  vocabList.innerHTML = parsedData
    .map((item) => `<li>${item.Front} - ${item.Back}</li>`)
    .join("");
  vocabList.setAttribute("data-vocabulary", JSON.stringify(parsedData));
  addToAnkiButton.style.display = "flex";
  resultsHeader.style.display = "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  toggleSpinner(true);
  const language = form.elements["language"].value;
  const topic = form.elements["topic"].value;

  fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, topic }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
      toggleSpinner(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      toggleSpinner(false);
    });
});

addToAnkiButton.addEventListener("click", function () {
  const language = form.elements["language"].value;
  const topic = form.elements["topic"].value;
  const dataVocab = vocabList.getAttribute("data-vocabulary");

  fetch("/add-to-anki", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vocabularyList: JSON.parse(dataVocab),
      language,
      topic,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.error || data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to add to Anki.");
    });
});
