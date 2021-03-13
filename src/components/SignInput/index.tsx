import React from 'react';
import {InputArea, Input} from './styles';
import colors from '../../utils/colors';
import Svg from 'react-native-svg';

interface SignInputProps {
  IconSvg: Svg;
  placeholder: string;
}

const SignInput: React.FC<SignInputProps> = ({IconSvg, placeholder}) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill={colors.darkBlue} />
      <Input placeholder={placeholder} placeholderTextColor={colors.darkBlue} />
    </InputArea>
  );
};

export default SignInput;
