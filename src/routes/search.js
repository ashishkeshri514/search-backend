const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Search = mongoose.model("Search");

router.get("/allsearch/:word", (req, res) => {
  Search.find({ $text: { $search: req.params.word } })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allSearch/:search", (req, res) => {
  Search.updateOne(
    { _id: req.params.search },
    { $inc: { count: 1 } },
    function (err, res) {
      if (err) console.log(err);
      console.log("1 document updated");
    }
  );
  Search.findOne({ _id: req.params.search })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createsearch", (req, res) => {
  const { title, displayLink, snippet, count } = req.body;
  if (!title || !displayLink || !snippet || !count) {
    return res.status(422).json({ error: "Please add all fields" });
  }
  const post = new Search({
    title,
    displayLink,
    snippet,
    count
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
