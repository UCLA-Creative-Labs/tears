import React from 'react';

export enum BUTTON_TYPE {
  LEFT,
  RIGHT,
}

export interface BaseButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ButtonProps extends BaseButtonProps {
  type: BUTTON_TYPE;
}

export function LEFT(props: BaseButtonProps): JSX.Element {
  return <Button {...props} type={BUTTON_TYPE.LEFT}/>
}

export function RIGHT(props: BaseButtonProps): JSX.Element {
  return <Button {...props} type={BUTTON_TYPE.RIGHT}/>
}

function Button(props: ButtonProps): JSX.Element {
  const {type, text, onClick} = props;

  return (
    <button onClick={onClick}>
      {type == BUTTON_TYPE.LEFT && '< '}
      {text}
      {type == BUTTON_TYPE.RIGHT && ' >'}
    </button>
  );
}
