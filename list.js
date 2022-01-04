const axios = require("axios");
const cheerio = require("cheerio");
const wordList = require("wordlist-english");
const fs = require("fs/promises");

const englishWords = wordList["english"];

const getTextAndWriteToFile = async (url, filename) => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const postTitles = [];

    $("*").each((i, el) => {
      const postTitle = $(el)
        .text()
        .replace(/[^a-zA-Z ]/g, " ")
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 0)
        .sort((a, b) => a.localeCompare(b));

      if (postTitle.length > 0) {
        postTitles.push(...postTitle);
      }
    });

    const uniqueWords = postTitles.reduce((acc, curr) => {
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
