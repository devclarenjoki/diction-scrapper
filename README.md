# diction-scrapper
## what the program does

This application downloads the text on a webpage and outputs a sorted list of the unique words on the page, with counts of the occurrences.

## My approach 
 
1. get raw data from the URL by using a HTTP client. The server responds to the request by returning the HTML content of the webpage.
2. use a parser to convert raw HTML data to text.
3. Remove all special characters from the text.
4. Sort the data and write it to a file.
5. Identify the number of times each text has occurred.
6. Add a dictionary to identify non-english words.

## Requirements

- node(12.13.0 or later)
- npm
- editor: Visual Studio Code(recommended)

## How to get started
Clone this repo [here](https://github.com/claremburu/diction-scrapper.git) unzip it and run the following command:
```
npm install
```

## Running the project
On your prject directory, run 
```
node list.js
```
This creates a text file with a list of all the text from your webpage. The text file contains sorted text, with the number of occurrences for each text.
The text file also identifies non-English words.
