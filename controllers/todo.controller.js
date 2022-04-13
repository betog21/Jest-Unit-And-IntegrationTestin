const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdMode = await TodoModel.create(req.body);
    res.status(201).json(createdMode);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const toDo = TodoModel.findById(req.params.id);
    res.status(200).json(toDo);
  } catch (error) {
    next(error);
  }
};
