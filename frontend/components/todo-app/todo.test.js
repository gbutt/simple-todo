import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Todo from './todo';

afterEach(cleanup);

it('should render todo', () => {
  const todo = { text: 'my todo' };
  const component = render(<Todo todo={todo} />);

  expect(component.getByText('my todo')).toBeTruthy();
  expect(component.getByText('Complete')).toBeTruthy();
  expect(component.getByText('Remove Todo')).toBeTruthy();
});

it('should render todo with reopen button', () => {
  const todo = { text: 'my todo', completed: true };
  const component = render(<Todo todo={todo} />);

  expect(component.getByText('Reopen')).toBeTruthy();
});

it('should fire onComplete', () => {
  const todo = { text: 'my todo' };
  let onCompleteArgs;
  const component = render(
    <Todo
      todo={todo}
      onComplete={(todo) => {
        onCompleteArgs = todo;
      }}
    />
  );

  fireEvent.click(component.getByText('Complete'));
  expect(onCompleteArgs).toEqual(todo);
});

it('should fire onReopen', () => {
  const todo = { text: 'my todo', completed: true };
  let onReopenArgs;
  const component = render(
    <Todo
      todo={todo}
      onReopen={(todo) => {
        onReopenArgs = todo;
      }}
    />
  );

  fireEvent.click(component.getByText('Reopen'));
  expect(onReopenArgs).toEqual(todo);
});

it('should fire onDelete', () => {
  const todo = { text: 'my todo' };
  let onDeleteArgs;
  const component = render(
    <Todo
      todo={todo}
      onDelete={(todo) => {
        onDeleteArgs = todo;
      }}
    />
  );

  fireEvent.click(component.getByText('Remove Todo'));
  expect(onDeleteArgs).toEqual(todo);
});
