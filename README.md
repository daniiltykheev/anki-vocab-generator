# Anki-Vocab-Generator

This program is designed for language learners and does two things:

1. Generates a vocabulary list of 20 words in a given language.
2. Imports those words into Anki.

The program helps remove the manual steps of looking for new words and adding them to Anki. [You can see a quick demo here](https://www.loom.com/share/e2abece82d74418894d5fc2adc74451e?sid=75b227a4-a8ba-4a02-8e9d-164f626b8ac2).

The program uses ChatGPT to generate cards and Anki-Connect (https://foosoft.net/projects/anki-connect/index.html) to create cards in Anki.

It's a small passion project that has no affiliation with Anki or Anki-Connect. If you have any questions or suggestions, please reach me at https://easytofind.co/contacts.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js installation)
- Anki with Anki-Connect addon installed (https://ankiweb.net)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/daniiltykheev/anki-vocab-generator.git
cd anki-vocab-generator
```

2. Install the required dependencies:

```bash
npm install
```

3. Create an .env file and add your OpenAI key to it in the following format:

```
OPENAI_API_KEY={your-openai-key}
```

## Usage

Start the application:

```bash
npm start
```

The server will start running on http://localhost:3000. Open your web browser and navigate to this address to start using the Anki Vocab Generator. Make sure to have the Anki app open when creating the vocabulary lists.

Notes:

- When picking a topic, you can choose simple ones like "football" or "traveling". You can also try something more specific like "when you go to a conference about B2B SaaS".
- You can change the number of words generated and replace English with any other language by editing the prompt in controllers/vocabularyController.js.
