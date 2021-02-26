import { AlertProps } from 'antd';
import React, { useState, useContext } from 'react';

const initialState = {
  show: false, message: '', type: '',
};

type storeType = {
  state: {
    show: boolean,
    message: string,
    type: any,
  },
  showToast?: (message: string, type: AlertProps['type']) => void
}

const AppContext = React.createContext<storeType>({ state: initialState });

export const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const store = {
    state,
    showToast: (message: string, type: any) => {
      state.show = true;
      state.message = message;
      state.type = type;
      setState({ ...state });
      setTimeout(() => { setState({ ...state, show: false }); }, 3000);
    },
  };

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
