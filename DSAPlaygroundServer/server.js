//imports express for routes, cors for sharing resources and being api pingable, and the trie data structure
const express = require("express");
const cors = require("cors");
const app = express();
const trieRoutes = require("./routes/trieRoutes");

//uses cors, and allows express to parse bodies and json in api requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allows heroku to host server on its own port or 3001 on local
app.listen(process.env.PORT || 3001, function () {
  console.log("Listening on Port 3001");
});

//checks to see if the server is online
app.get("/", function (req, res) {
  res.send("Trie Server is working");
});

app.use(trieRoutes);
