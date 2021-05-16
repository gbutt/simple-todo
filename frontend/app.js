import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/todo-app';
import { IconSettings } from '@salesforce/design-system-react';

ReactDOM.render(
  <IconSettings iconPath='/slds/assets/icons'>
    <TodoApp />
  </IconSettings>,
  document.getElementById('root')
);
