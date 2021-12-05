const PORT = process.env.PORT || 3001;

module.exports = {
  mongodb: {
    connectionString:
      "mongodb+srv://vassla:vassla@cluster0.idfr3.mongodb.net/url-shortener?retryWrites=true&w=majority",
  },
  site: {
    port: PORT,
    origin: `http://localhost:${PORT}`,
  },
};
