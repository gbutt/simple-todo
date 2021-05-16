import React from 'react';
import './todo-list.css';
import Todo from './todo';

export default function TodoList({ todos, onComplete, onReopen, onDelete }) {
  const { numTodosCompleted, numTodosOpen } = todos.reduce(
    (agg, todo) => {
      todo.completed ? agg.numTodosCompleted++ : agg.numTodosOpen++;
      return agg;
    },
    { numTodosCompleted: 0, numTodosOpen: 0 }
  );

  return (
    <div>
      <div className='slds-grid slds-gutters'>
        <span className='slds-col'>Open: {numTodosOpen}</span>
        <span className='slds-col'>Completed: {numTodosCompleted}</span>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={getClasses(todo)}>
            <Todo todo={todo} onComplete={onComplete} onReopen={onReopen} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function getClasses(todo) {
  let classes = ['slds-p-top_small'];
  if (todo.completed) {
    classes.push('TodoList-todo-completed');
  } else {
    classes.push('TodoList-todo-open');
  }
  return classes.join(' ');
}
