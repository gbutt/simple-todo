import React from 'react';
import { Button, Icon } from '@salesforce/design-system-react';

export default function Todo({ todo, onComplete, onReopen, onDelete }) {
  let leftButton, rightButton;
  if (todo.completed) {
    // reopen buttons
    leftButton = (
      <Button
        variant='base'
        iconCategory='utility'
        iconName='check'
        iconSize='small'
        onClick={() => onReopen(todo)}
      />
    );
    rightButton = (
      <Button
        className='Todo-btn-reopen'
        label='Reopen'
        iconCategory='utility'
        iconName='open'
        iconPosition='left'
        onClick={() => onReopen(todo)}
      />
    );
  } else {
    // complete buttons
    leftButton = (
      <Button
        variant='base'
        iconCategory='utility'
        iconName='diamond'
        iconSize='small'
        onClick={() => onComplete(todo)}
      />
    );
    rightButton = (
      <Button
        className='Todo-btn-complete'
        label='Complete'
        iconCategory='utility'
        iconName='check'
        iconPosition='left'
        onClick={() => onComplete(todo)}
      />
    );
  }

  return (
    <div data-id={todo.id} className='view slds-grid slds-grid_align-spread'>
      <span>
        {leftButton}
        <span className='slds-m-left_x-small'>{todo.text}</span>
      </span>
      <span>
        {rightButton}
        <Button
          className='Todo-btn-delete'
          label='Remove Todo'
          iconCategory='utility'
          iconName='delete'
          iconPosition='left'
          variant='destructive'
          onClick={() => onDelete(todo)}
        />
      </span>
    </div>
  );
}
