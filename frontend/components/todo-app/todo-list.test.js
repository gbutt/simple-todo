import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import TodoList from './todo-list';

afterEach(cleanup);

it('should render list', () => {
  const todos = [
    {
      id: 1,
      text: 'one'
    },
    {
      id: 2,
      text: 'two',
      completed: true
    },
    {
      id: 3,
      text: 'three',
      completed: false
    }
  ];
  const component = render(<TodoList todos={todos} />);
  const rootEl = component.container;

  expect(rootEl.querySelectorAll('li').length).toEqual(3);
  expect(rootEl.querySelectorAll('li.TodoList-todo-completed').length).toEqual(1);
});
