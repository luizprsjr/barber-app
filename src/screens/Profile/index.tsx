import React, {useCallback} from 'react';
import {Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';

import {Container} from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const logout = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      await api.post('/auth/logout', {token});
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }, [navigation]);
  return (
    <Container>
      <Text>Profile</Text>
      <Button title="sair" onPress={logout} />
    </Container>
  );
};

export default Profile;
