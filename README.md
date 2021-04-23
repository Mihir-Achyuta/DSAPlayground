# Trie Challenge

This is the take home challenge for Slingshot's Fellowship Program

# Table of Contents

The project is split into 2 parts :

1. The Trie Client CLI
2. The Trie Server

# CLI Installation

The CLI was built with Node + Express and called API Requests with Axios

Use the package manager [npm](https://www.npmjs.com/package/triecli) to install the Trie CLI Globally.

```bash
npm i -g triecli
```

# CLI Usage

```bash
# returns all the possible commands for the trie
triecli
```

# Server

The server was hosted using a Heroku free Dyno and the globally hosted trie was stored in JSON.

The CLI Interacts with it by calling an AJAX Request with axios to the RESTFUL Node + Express Server which then returned JSON

# Server REST Endpoints

```bash
#adds a word to the trie
curl -X POST -d "specifiedWord=word" https://triechallenge.herokuapp.com/add

#deletes a word from the trie
curl -X POST -d "specifiedWord=word" https://triechallenge.herokuapp.com/delete

#checks if a word is in the trie
curl -X POST -d "specifiedWord=word" https://triechallenge.herokuapp.com/search

#gets all the words in the trie starting with a prefix
curl -X POST -d "specifiedWord=word" https://triechallenge.herokuapp.com/autocomplete

#displays all the words in the trie and the trie structure in JSON
curl -X GET https://triechallenge.herokuapp.com/display

#resets the trie to have no words
curl -X GET https://triechallenge.herokuapp.com/reset
```
