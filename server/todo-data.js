let todosCreated = 1;
let todos = [
  {
    id: 1,
    text: 'Finish coding exercise',
    completed: false
  }
];

export default class TodoData {
  static create(todo) {
    return new Promise((resolve) => {
      todo.id = ++todosCreated;
      todos.push(todo);
      resolve(todo);
    });
  }

  static findAll() {
    return new Promise((resolve) => resolve(todos));
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const todoIndex = todos.findIndex((todo) => todo.id.toString() === id.toString());
      if (todoIndex < 0 || todoIndex >= todos.length) {
        return reject(`Todo with id ${id} not found`);
      }
      todos.splice(todoIndex, 1);
      resolve();
    });
  }

  static update(id, todo) {
    return new Promise((resolve, reject) => {
      const foundTodo = todos.find((todo) => todo.id.toString() === id.toString());
      if (!foundTodo) {
        return reject(`Todo with id ${id} not found`);
      }
      const updatedTodo = Object.assign(foundTodo, todo);
      resolve(updatedTodo);
    });
  }
}
