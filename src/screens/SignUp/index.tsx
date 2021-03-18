import React, {useCallback, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import {UserContext} from '../../contexts/UserContext';

import api from '../../services/api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import PersonlIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

const SignUp: React.FC = () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = useCallback(async () => {
    if (nameField && emailField && passwordField) {
      const {data} = await api.post('/user', {
        name: nameField,
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
        'Você precisa informar seu nome, e-mail e senha para fazer o cadastro.',
      );
    }
  }, [nameField, emailField, passwordField, navigation, userDispatch]);

  const handleMessageButtonClick = useCallback(() => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  }, [navigation]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonlIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />

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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignUp;
