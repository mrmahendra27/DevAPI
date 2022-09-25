const mongoose = require("mongoose");

const mongoDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `Connected to database, host: '${conn.connection.host}'.`.blue.underline.bold
  );
};

module.exports = mongoDb;
