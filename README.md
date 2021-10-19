# DSAPlayground

- This project(playground) makes data structures and algorithms accessible via a Command Line Interface. 

- You can store various data structures in the cloud and come back to them when needed to perform more operations on them with all progress saved.

- Just install it using [NPM](https://www.npmjs.com/package/dsacli), create an account on the CLI, and get started. 

## Installation

Use the package manager [NPM](https://www.npmjs.com/) to install [DSAPlayground](https://www.npmjs.com/package/dsacli) globally.

```bash
npm i -g dsacli
```

## Usage
![DSAPlaygroundPic!](https://i.imgur.com/3eLzvfq.png)

Once installing the package globally, type in the package name to activate the Command Line Interface with the possible commands here accessible via the help function(can find out all command by typing help at any time):

```javascript
function welcomeHelp() {
  console.log("");
  console.log("Commands are done by command_name for all commands");
  console.log("All Possible Initial Commands: ");
  console.log("exit                       exits the DSACli");
  console.log("playground                 enter the dsaPlayground to start experimenting with data structures and algorithms");
  console.log("sign_in                    signs in the user if not already signed in");
  console.log("sign_up                    creates a new user account the user if not already signed in");
  console.log("sign_out                   logs out the user if not already logged out");
  console.log("");
}

```

A user must sign in/sign up to enter the playground so once you enter the playground, here are all the possible data structures commands available:

``` javascript
function playgroundHelp() {
    console.log("");
    console.log("Commands are done by command_name for all commands");
    console.log("All Possible Playground Commands: ");
    console.log("exit                                 exits the DSACli");
    console.log("back_home                            navigates back to the home cli")
    console.log("stack                                navigates to the Stack Playground");
    console.log("queue                                navigates to the Queue Playground");
    console.log("binary_search_tree                   navigates to the Binary Search Tree Playground");
    console.log("binary_heap                          navigates to the Binary Heap Playground");
    console.log("trie                                 navigates to the Trie Playground");
    console.log("");
}
```
Once navigating to a certain data structure, access all its commands by typing help again and choose a data structure by typing its name in the Command Line Interface and enter a command as instructed after.

Typing an unstored data structure name creates it automatically for you.


## Tech Stack

### Client

- The client is a Command Line Interface built with [Node](https://nodejs.org/en/) which is hosted on [NPM](https://www.npmjs.com/) and accessible via a NPM package. 

- It uses [Prompts](https://www.npmjs.com/package/prompts) as the base to handle and parse user inputs and [Axios](https://www.npmjs.com/package/axios) to make HTTP requests to the Node server.

- Users can currently store, modify, and view Stacks, Queues, Linked Lists, Heaps, and Tries client side.

### Server
- The server is built with [Node](https://nodejs.org/en/) and uses the [Express](https://expressjs.com/) framework to handle routes to create the API.

- Authentication is done using [Firebase](https://firebase.google.com/) and storing all the various data structures and algorithms are done with [Firestore](https://firebase.google.com/docs/firestore).

- The server is [Dockerized](https://www.docker.com/) and is deployed on a [Qovery](https://www.qovery.com/) instance.

## Future Plans

- ⬜️ Convert entire codebase to Typescript
- ⬜️ Add sorts and searches along with arrays
- ⬜️ Add "verbose" output explaining what the data structure operation is doing in detail
