import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import UserContextProvider from './contexts/UserContext';
import MainStack from './routes/MainStack';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
