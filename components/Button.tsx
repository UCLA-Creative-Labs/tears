import React from 'react';

export enum BUTTON_TYPE {
  _LEFT='LEFT',
  _RIGHT='RIGHT',
}

export interface BaseButtonProps {
  text: string;
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
  const {type, text, onClick} = props;

  return (
    <button onClick={onClick}>
      {type == BUTTON_TYPE._LEFT && '< '}
      {text}
      {type == BUTTON_TYPE._RIGHT && ' >'}
    </button>
  );
}
