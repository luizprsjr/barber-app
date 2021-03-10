import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './routes/MainStack';
// import {Text, View} from 'react-native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
