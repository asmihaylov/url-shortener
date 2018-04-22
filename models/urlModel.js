const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlModelScheme = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
},{timestamps: true});
urlModelScheme.index({ createdAt: 1 },{ expireAfterSeconds: 1296000 });

mongoose.model("urlModel", urlModelScheme);
