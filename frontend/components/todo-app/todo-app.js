import React from 'react';
import FetchApi from '../../fetch-api';
import TodoInput from './todo-input';
import TodoList from './todo-list';
export default class TodoApp extends React.Component {
  state = { todos: [] };

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    try {
      const todos = await FetchApi.get('/todo');
      return this.setState({ todos });
    } catch (e) {
      return this.handleError('There was an error getting todos', e);
    }
  }

  async createTodo(todoFragment) {
    try {
      const newTodo = await FetchApi.post('/todo', todoFragment);
      const newTodos = Array.from(this.state.todos);
      newTodos.push(newTodo);
      this.setState({ todos: newTodos });
    } catch (e) {
      return this.handleError('There was an error creating the todo', e);
    }
  }

  async updateTodo(id, todoFragment) {
    try {
      const updatedTodo = await FetchApi.put(`/todo/${id}`, todoFragment);
      const newTodos = Array.from(this.state.todos);
      const todoIndex = newTodos.findIndex((todo) => todo.id.toString() === id.toString());
      newTodos.splice(todoIndex, 1, updatedTodo);
      this.setState({ todos: newTodos });
    } catch (e) {
      return this.handleError('There was an error updating the todo', e);
    }
  }

  async deleteTodo(id) {
    try {
      await FetchApi.delete(`/todo/${id}`);
      const newTodos = Array.from(this.state.todos);
      const todoIndex = newTodos.findIndex((todo) => todo.id.toString() === id.toString());
      newTodos.splice(todoIndex, 1);
      this.setState({ todos: newTodos });
    } catch (e) {
      return this.handleError('Error removing todo', e);
    }
  }

  handleError(message, err) {
    console.error(err);
    alert(message);
  }

  handleMarkComplete = async (todo) => {
    const id = todo.id;
    return this.updateTodo(id, { completed: true });
  };

  handleMarkOpen = async (todo) => {
    const id = todo.id;
    return this.updateTodo(id, { completed: false });
  };

  handleDeleteRequest = async (todo) => {
    const id = todo.id;
    return this.deleteTodo(id);
  };

  handleSubmit = async (text) => {
    await this.createTodo({ text, completed: false });
  };

  render() {
    return (
      <div className='slds-align_absolute-center slds-m-top_large'>
        <div className='TodoApp-body slds-box slds-size_x-large'>
          <h1 className='slds-text-heading_large slds-m-bottom_small'>Todos</h1>
          <div className='slds-m-bottom_small'>
            <TodoInput onSubmit={this.handleSubmit} />
          </div>

          <TodoList
            todos={this.state.todos}
            onComplete={this.handleMarkComplete}
            onReopen={this.handleMarkOpen}
            onDelete={this.handleDeleteRequest}
          />
        </div>
      </div>
    );
  }
}
