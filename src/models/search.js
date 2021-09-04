const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  displayLink: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});
postSchema.index({ title: "text" });

mongoose.model("Search", postSchema).createIndexes();
