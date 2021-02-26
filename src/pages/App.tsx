import React from 'react';
import { Alert } from 'antd';
import Header from '../components/Header';
import Options from '../components/Options';
import If from '../components/If';
import { useAppContext } from '../context';

const App: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div>
      <Header />
      <Options />
      <If show={state.show}>
        <div className="fixed w-64 z-10 bottom-10 left-1/2 -ml-32">
          <Alert message={state.message} type={state.type} showIcon />
        </div>
      </If>
    </div>
  );
};

export default App;
