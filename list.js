const axios = require("axios");
const cheerio = require("cheerio");
const wordList = require("wordlist-english");
const fs = require("fs/promises");

const englishWords = wordList["english"];

const getTextAndWriteToFile = async (url, filename) => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const allText = [];

    $("*").each((i, el) => {
      const text = $(el)
        .text()
        .replace(/[^a-zA-Z ]/g, " ")
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 0)
        .sort((a, b) => a.localeCompare(b));

      if (text.length > 0) {
        allText.push(...text);
      }
    });

    const uniqueWords = allText.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    console.log(uniqueWords);

    const textToWrite = Object.entries(uniqueWords).map(([word, count]) => {
      if (englishWords.includes(word)) {
        return `${word},${count},english`;
      }

      return `${word},${count},not english`;
    });

    await fs.writeFile(filename, textToWrite.join("\n"));
  } catch (error) {
    console.error(error);
  }
};

getTextAndWriteToFile(
  "https://en.wikipedia.org/wiki/Climate_change",
  "data.txt"
);
