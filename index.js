const express = require("express");
const firebase = require("./firebase");

const app = express();

const port = process.env.PORT || 3005;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => res.json("cool, its up and running.."));

app.post("/login", (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword("kharljay15@gmail.com", "test123")
    .then((user) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const accessToken = user.accessToken;
      // The signed-in user info.

      return res.json({ user });
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      if (error) {
        res.json({ error: errorMessage });
      } else res.json({ error: "something went wrong, try again" });
    });
});

app.post("/signup", (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword("kharljay15@gmail.com", "test123")
    .then((user) => {
      return res.json({ user });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        return res.json({ error: errorMessage });
      }
      return res.json({ error: errorMessage });
    });
});

app.post("/logout", (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      return res.json({ status: true });
    })
    .catch((error) => {
      return res.json({ status: false });
    });
});

app.listen(port, () => console.log("lutrade backend running"));
