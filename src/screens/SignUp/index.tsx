import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import PersonlIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import {Alert} from 'react-native';

const SignUp: React.FC = () => {
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

      console.log(data);

      if (data.token) {
        Alert.alert('deu certo');
      } else {
        Alert.alert('Erro!', `${data.error}`);
      }
    } else {
      Alert.alert(
        'Preencha todos os campos!',
        'Você precisa informar seu nome, e-mail e senha para fazer o cadastro.',
      );
    }
  }, [nameField, emailField, passwordField]);

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
