import React, { useState } from 'react';
import AppContext from './App.Context';

const AppProvider = ({ children }) => {
  const [useAudio, setUseAudio] = useState(true);

  return (
    <AppContext.Provider value={{ useAudio, setUseAudio }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
