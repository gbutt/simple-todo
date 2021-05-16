import TodoData from './todo-data';

beforeEach(async () => {
  const todos = await TodoData.findAll();
  todos.forEach((todo) => TodoData.delete(todo.id));
});

it('should find all todos', async () => {
  let todos = await TodoData.findAll();
  expect(todos.length).toBe(0);

  const newTodo = await TodoData.create({ text: 'new todo' });
  todos = await TodoData.findAll();
  expect(todos.length).toBe(1);

  await TodoData.delete(newTodo.id);
  todos = await TodoData.findAll();
  expect(todos.length).toBe(0);
});

it('should create todos', async () => {
  const newTodo = await TodoData.create({ text: 'new todo' });
  expect(newTodo.id).toBeTruthy();
});

it('should update todos', async () => {
  const newTodo = await TodoData.create({ text: 'new todo' });
  const updateTodo = await TodoData.update(newTodo.id, { text: 'update todo' });
  expect(updateTodo.text).toEqual('update todo');
});

it('should fail update when id not found', async () => {
  let caught;
  try {
    await TodoData.update(99, { text: 'update todo' });
  } catch (err) {
    caught = err;
  }

  expect(caught).not.toBe(undefined);
});

it('should delete todos', async () => {
  const newTodo = await TodoData.create({ text: 'new todo' });
  await TodoData.delete(newTodo.id);
  const todos = await TodoData.findAll();
  expect(todos.length).toBe(0);
});

it('should fail delete when id not found', async () => {
  let caught;
  try {
    await TodoData.delete(99, { text: 'update todo' });
  } catch (err) {
    caught = err;
  }

  expect(caught).not.toBe(undefined);
});
