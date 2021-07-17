# Hosted Trie

- This is a globally hosted Trie accessible via NPM and hosted on Heroku. Both CLI and Server are built with Node.js

# Table of Contents

- The project is split into 2 parts :
  - The Trie Client CLI
  - The Trie Server

# CLI Installation

**Notice: The server was hosted on a [Heroku](https://www.heroku.com) Free Dyno so it will take about 15 seconds to run the first command as the dyno has to [spin/wake up](https://devcenter.heroku.com/articles/free-dyno-hours). All other resultant commands will not have a delay like this.**

- The CLI was built with [Node](http://www.node.com/) +[Express](https://expressjs.com/) and called RESTful API Requests with [Axios](https://www.npmjs.com/package/axios).

- It was distributed through [npm](https://www.npmjs.com/package/@mihirachyuta/triecli) for users to download via the install command

- Use the package manager [npm](https://www.npmjs.com/package/@mihirachyuta/triecli) to install the Trie CLI Globally.

```bash
npm i -g @mihirachyuta/triecli
```

# CLI Usage

```bash
# returns all the possible commands for the trie
triecli

#adds a word to the trie
triecli --add randword

#deletes a word from the trie if it is present
triecli --delete randword

#checks if a word is in the trie and lets user know result
triecli --search randword

#gets all the words in the trie starting with a prefix
triecli --autocomplete randword

#displays all the words in the trie and the trie structure in JSON
triecli --display

#resets the trie to have no words along with the json database file
triecli --reset
```

# Server

- The server was hosted using a [Heroku free Dyno](https://devcenter.heroku.com/articles/free-dyno-hours) and the globally hosted trie was stored in a [JSON](https://www.json.org/) file.

- Every time an API request calls, the trie gets the root node from the [JSON](https://www.json.org/) file and updates/displays data accordingly.

- The CLI Interacts with it by calling an [AJAX](<https://en.wikipedia.org/wiki/Ajax_(programming)>) Request with [Axios](https://www.npmjs.com/package/axios) to the RESTful [Node](http://www.node.com/) +[Express](https://expressjs.com/) which then returned JSON.
  - The [JSON](https://www.json.org/) is then recieved by the request and it is console logged to the cli screen

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

#resets the trie to have no words along with the json database file
curl -X GET https://triechallenge.herokuapp.com/reset
```
