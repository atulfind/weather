import React, { forwardRef } from 'react';
import { fn } from '../../config';
import './index.scss';

const Input = forwardRef(({
  type='text',
  placeholder=" ",
  onChange=fn,
  onBlur=fn,
  onFocus=fn,
  error
}, ref) => {
  return (
    <React.Fragment>
      <input type={type} 
        className="input"
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
      /> 
      <div className="error">{error}</div>
    </React.Fragment>
  )
})

export default Input
