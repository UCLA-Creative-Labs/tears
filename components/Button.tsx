import React, { useRef } from 'react';
import { animateStroke } from '../utils/animations';

export enum BUTTON_TYPE {
  _LEFT='LEFT',
  _RIGHT='RIGHT',
}

export interface BaseButtonProps {
  text: string;
  uid: string;
  onClick?: () => void;
}

export interface ButtonProps extends BaseButtonProps {
  type: BUTTON_TYPE;
}

export function LEFT(props: BaseButtonProps): JSX.Element {
  return <Button {...props} type={BUTTON_TYPE._LEFT}/>;
}

export function RIGHT(props: BaseButtonProps): JSX.Element {
  return <Button {...props} type={BUTTON_TYPE._RIGHT}/>;
}

function Button(props: ButtonProps): JSX.Element {
  const {type, text, uid, onClick} = props;
  const buttonRef = useRef(null);

  const hover = () => {
    animateStroke(`#${uid}`);
  };
  const leave = () => {
    animateStroke(`#${uid}`, true);
  };

  return (
    <div className={'custom-button'}>
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseOver={hover}
        onMouseLeave={leave}>
        {type == BUTTON_TYPE._LEFT && '< '}
        {text}
        {type == BUTTON_TYPE._RIGHT && ' >'}
      </button>
      <svg width='439' height='106' viewBox='0 0 439 106' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          id={uid}
          stroke='black'
          strokeWidth='3'
          strokeDasharray={'1200'}
          style={{ strokeDashoffset: '1200px'}}
          d='M2.45193 40.2045C143.115 43.1464 426.416 50.6579 434.322 57.1682C444.204 65.306 28.2296 49.9519 30.689 60.9067C32.6566 69.6707 274.231 52.2591 394.772 42.4578'/>
      </svg>
    </div>
  );
}
