import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  onClick?: () => void;
}

const Button = ({ children, type, onClick, title, className }: Props) => {
  const isClass = className ?? '';

  return (
    <button type={type} title={title} onClick={onClick} className={`button ${isClass}`}>
      {children}
    </button>
  );
};

export default Button;
