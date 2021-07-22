const express = require("express");
const cors = require("cors");
const firebase = require("firebase");
require("dotenv").config();

//routes imported
const authRoutes = require("./routes/authRoutes");
const trieRoutes = require("./routes/trieRoutes");

//starts up firebase app
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_API_KEY_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_API_KEY_MESSAGE_ID,
  appId: process.env.FIREBASE_API_KEY_APP_ID,
  measurementId: process.env.FIREBASE_API_KEY_MEASUREMENT_ID,
};
firebase.default.initializeApp(firebaseConfig);

//uses cors, and allows express to parse bodies and json in api requests
const app = express();
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

app.use(authRoutes);
app.use(trieRoutes);
