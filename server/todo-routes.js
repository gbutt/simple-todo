import express from "express";
import TodoData from "./todo-data";

const todoExpress = express();

todoExpress.get("/todo", (req, res) => {
  return TodoData.findAll()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(500).json(err));
});

todoExpress.post("/todo", (req, res) => {
  return TodoData.create(req.body)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(500).json(err));
});

todoExpress.delete("/todo/:id", (req, res) => {
  return TodoData.delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).json(err));
});

todoExpress.put("/todo/:id", (req, res) => {
  return TodoData.update(req.params.id, req.body)
    .then((todo) => res.json(todo))
    .catch((err) => res.sendStatus(500).json(err));
});

export default todoExpress;
