import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: ${colors.darkBlue};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: ${colors.white};
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: ${colors.darkBlue};
`;
export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: ${colors.darkBlue};
  font-weight: bold;
  margin-left: 5px;
`;
