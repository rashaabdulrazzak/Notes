const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("./Database");
console.log(path.join(__dirname, "public"));
const app = express();
const db = new Database();

app.use(cors()); // api call from outsidethe server
// ease of use of app in the client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// api post create note
app.post("/notes", (req, res) => {
  const body = req.body;
  console.log("body", body);
  db.addNote(body)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});
// get

// app.get("/notes", (req, res) => {
//   db.getNotes()
//     .then((data) => res.send(data))
//     .catch((err) => res.status(500).send(err));
// });
app.get("/notes", (req, res) => {
  const { title } = req.query;
  if (title) {
    db.getNotesByTitle(title)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    db.getNotes()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNoteById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send("note id does not exsit " + id);
      } else {
        res.send(data);
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.put("/notes", (req, res) => {
  db.updateNote(req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send("note id does not exsit " + id);
      } else {
        res.send(data);
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.deleteNote(id)
    .then((data) => {
      if (!data) {
        res.status(404).send("note id does not exsit " + id);
      } else {
        res.send(data);
      }
    })
    .catch((err) => res.status(500).send(err));
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server has been listening on port : ${port}`);
  db.connect();
});
