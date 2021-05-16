import React, { useState } from 'react';
import { Input } from '@salesforce/design-system-react';

const ENTER_KEY_CODE = 13;

export default function TodoInput({ onSubmit }) {
  const [text, setText] = useState('');

  const handleKeyDown = async (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) {
      return;
    }
    onSubmit(text);
    setText('');
  };

  return (
    <Input
      type='text'
      placeholder='What needs to be done?'
      autoFocus
      value={text}
      onInput={(e) => setText(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    />
  );
}
