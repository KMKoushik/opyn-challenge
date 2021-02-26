import React from 'react';

type IfProps = {
  show: boolean,
  children: React.ReactNode;
}

const If: React.FC<IfProps> = ({ show, children }) => {
  return show ? <>{children}</> : null;
};

export default If;
