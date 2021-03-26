import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Avatar,
  ProfileInput,
  SaveButton,
  SaveButtonText,
  LogoutButton,
  LogoutButtonText,
} from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const [didKeyboardShow, setKeyboardShow] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const _keyboardDidShow = useCallback(() => {
    setKeyboardShow(true);
  }, []);

  const _keyboardDidHide = useCallback(() => {
    setKeyboardShow(false);
  }, []);

  const logout = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      await api.post('/auth/logout', {token});
      navigation.reset({
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }, [navigation]);

  const handleSaveUserInfo = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    const body = {
      token,
      name,
      email: email !== oldEmail ? email : undefined,
      password: password ? password : undefined,
      password_confirm: confirmPassword ? confirmPassword : undefined,
    };

    const {data: response} = await api.put('/user', body);

    if (!response.error) {
      navigation.reset({
        routes: [{name: 'MainTab'}],
      });

      Alert.alert(
        'Perfil Atualizado!',
        'Você foi redirecionado para a página inicial.',
      );
    } else {
      Alert.alert(
        'Erro!',
        'Ocorreu um erro, verifique os dados nos campos e tente novamente.',
      );
    }
  }, [confirmPassword, email, name, navigation, oldEmail, password]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [_keyboardDidHide, _keyboardDidShow]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      const {data: response} = await api.get(`/user?token=${token}`);

      if (response.data) {
        setAvatar(response.data.avatar);
        setName(response.data.name);
        setEmail(response.data.email);
        setOldEmail(response.data.email);
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Perfil</HeaderTitle>
      </HeaderArea>

      {avatar !== '' && !didKeyboardShow && (
        <Avatar
          source={{
            uri: avatar,
          }}
        />
      )}

      <ProfileInput
        value={name}
        placeholder="Nome"
        onChangeText={(text) => setName(text)}
      />

      <ProfileInput
        value={email}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <ProfileInput
        placeholder="Nova senha"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <ProfileInput
        placeholder="Confirme a senha"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <SaveButton onPress={handleSaveUserInfo}>
        <SaveButtonText>SALVAR</SaveButtonText>
      </SaveButton>

      <LogoutButton onPress={logout}>
        <LogoutButtonText>SAIR</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
