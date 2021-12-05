const mongoose = require("mongoose");
const { credentials } = require("../../config");

const { createSlug } = require("../utils");

// model
const TinyUrl = require("./models/tinyurl");

const connectionString = credentials.mongodb.connectionString;

if (!connectionString) {
  console.error("MongoDB connection string missing. Exiting...");
  process.exit(1);
}

// connecting to MongoDB and registering handler to db
mongoose.connect(connectionString, {});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(`MongoDB error: ${error.message}`);
  process.exit(1);
});

db.once("open", () => {
  console.log("Connection to MongoDB was successfull");
});

// exposing methods from db for CRUD operations
module.exports = {
  getAllTinyUrls: async () => await TinyUrl.find({}),
  shortenUrl: async (originalUrl) => {
    const slug = await createSlug(originalUrl, 6);
    const tinyUrl = `${credentials.site.origin}/${slug}`;
    return await new TinyUrl({
      _id: slug,
      originalUrl,
      tinyUrl,
    }).save();
  },

  getOriginalUrl: async (slug) =>
    await TinyUrl.findById(slug, "originalUrl -_id"),

  deleteTinyUrl: async (slug) => await TinyUrl.findByIdAndDelete(slug),

  findTinyUrlByOriginalUrl: async (originalUrl) =>
    await TinyUrl.findOne({ originalUrl }),
  deleteAllTinyUrls: async () => await TinyUrl.deleteMany({}),
};
