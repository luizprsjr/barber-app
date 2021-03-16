import React, {useContext, useEffect} from 'react';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {UserContext} from '../../contexts/UserContext';

import api from '../../services/api';

import BarberLogo from '../../assets/barber.svg';

const Preload: React.FC = () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        try {
          const {data} = await api.post('/auth/refresh', {
            token: JSON.stringify(token),
          });

          if (data.token) {
            await AsyncStorage.setItem('token', data.token);

            userDispatch({
              type: 'setAvatar',
              payload: {
                avatar: data.data.avatar,
              },
            });

            navigation.reset({
              routes: [{name: 'MainTab'}],
            });
          } else {
            navigation.navigate('SignIn');
          }
        } catch {
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    })();
  }, [navigation, userDispatch]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFF" />
    </Container>
  );
};

export default Preload;
