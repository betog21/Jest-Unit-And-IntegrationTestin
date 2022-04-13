const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo-tdd", {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error("Error conecting to MongoDB", error);
  }
}

module.exports = { connect };
