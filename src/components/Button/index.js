import React from 'react';
import { fn } from '../../config';
import './index.scss';

const Button = ({text='', onClick=fn}) => {
  return (
    <button onClick={onClick} className={`button`}>
      {text}
    </button>
  )
}

export default Button
