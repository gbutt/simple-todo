import React from 'react';
import { cleanup, fireEvent, waitFor, screen, render } from '@testing-library/react';
import TodoApp from './todo-app';
import FetchApi from '../../fetch-api';
jest.mock('../../fetch-api');

afterEach(cleanup);

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
FetchApi.get.mockResolvedValue(Promise.resolve(todos));

it('should get todos from server', async () => {
  const component = render(<TodoApp />);
  expect(component.getByPlaceholderText('What needs to be done?')).toBeTruthy();

  await waitFor(() => screen.getByText('one'));
  const rootEl = component.container;
  expect(rootEl.querySelectorAll('li').length).toBe(3);
});

it('should mark todo complete', async () => {
  FetchApi.put.mockResolvedValue(
    Promise.resolve({
      id: 1,
      text: 'one',
      completed: true
    })
  );

  const component = render(<TodoApp />);
  await waitFor(() => screen.getByText('one'));

  fireEvent.click(component.container.querySelector('div[data-id="1"] button.Todo-btn-complete'));

  expect(FetchApi.put).toHaveBeenCalledWith('/todo/1', { completed: true });
});

it('should mark todo open', async () => {
  FetchApi.put.mockResolvedValue(
    Promise.resolve({
      id: 2,
      text: 'two',
      completed: false
    })
  );

  const component = render(<TodoApp />);
  await waitFor(() => screen.getByText('two'));

  fireEvent.click(component.container.querySelector('div[data-id="2"] button.Todo-btn-reopen'));

  expect(FetchApi.put).toHaveBeenCalledWith('/todo/2', { completed: false });
});

it('should delete todo', async () => {
  FetchApi.delete.mockResolvedValue(Promise.resolve());

  const component = render(<TodoApp />);
  await waitFor(() => screen.getByText('one'));

  fireEvent.click(component.container.querySelector('div[data-id="1"] button.Todo-btn-delete'));

  expect(FetchApi.delete).toHaveBeenCalledWith('/todo/1');
});
