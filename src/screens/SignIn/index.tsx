import React, {useCallback, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import api from '../../services/api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import {Alert} from 'react-native';

const SignIn: React.FC = () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = useCallback(async () => {
    if (emailField && passwordField) {
      const {data} = await api.post('/auth/login', {
        email: emailField,
        password: passwordField,
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
        Alert.alert('Erro!', `${data.error}`);
      }
    } else {
      Alert.alert(
        'Preencha todos os campos!',
        'Você precisa informar seu e-mail e senha para fazer login.',
      );
    }
  }, [emailField, passwordField, userDispatch, navigation]);

  const handleMessageButtonClick = useCallback(() => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  }, [navigation]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignIn;
