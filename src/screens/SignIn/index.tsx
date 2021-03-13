import React from 'react';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput IconSvg={EmailIcon} placeholder="Digite seu e-mail" />

        <SignInput IconSvg={LockIcon} placeholder="Digite sua senha" />

        <CustomButton>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignIn;
