import React, { useRef, useState } from 'react'
import { fn } from '../../config';
import { cities } from '../../data';
import { IconDropdown } from '../Icons';
import './index.scss';

const Dropdown = ({ cb = fn, error }) => {

  const inputRef = useRef();
  const listRef = useRef();

  const [state, setState] = useState();

  const handleOutsideClick = (e) => {
    if (inputRef.current.contains(e.target) || listRef.current.contains(e.target)) {
      return
    }
    hideList()
  }

  const showList = () => {
    listRef.current.classList.remove('hide');
    document.addEventListener('click', handleOutsideClick)
  }

  const hideList = () => {
    listRef.current.classList.add('hide');
    document.removeEventListener('click', handleOutsideClick)
  }

  const optionClickHandler = (item) => {
    cb(item);
    setState(item);
    hideList();
  }

  return (
    <div className="dropdown">
      <div className="option-selected" onClick={showList}>
        <div className="input" ref={inputRef}>
          {
            state ?
              <div className="city-row">
                <div className="city">{state.city}</div>
                <div className="state-country">
                  <span>{state.state}</span>
                  <span>{state.country}</span>
                </div>
              </div> :
              <div className="city-row">
                <div className="city">Select City</div></div>
          }
        </div>
        <IconDropdown />
      </div>
      {
        error &&
        <div className="error">{error}</div>
      }
      <ul className="options hide" ref={listRef}>
        {
          cities.map(item =>
            <li className="option" key={item.city} onClick={() => optionClickHandler(item)}>
              <div className="city-row">
                <div className="city">{item.city}</div>
                <div className="state-country">
                  <span>{item.state}</span>
                  <span>{item.country}</span>
                </div>
              </div>
            </li>
          )}
      </ul>
    </div>
  )
}

export default Dropdown
