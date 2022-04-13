const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdMode = await TodoModel.create(req.body);
    res.status(201).json(createdMode);
  } catch (error) {
    next(error);
  }
};
