import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.blue};
  padding: 0 20px;
`;

export const HeaderArea = styled.View`
  height: 50px;
  justify-content: center;
  padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  font-weight: bold;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  align-self: center;
  border-radius: 20px;
  margin: 30px 0 10px;
`;

export const ProfileInput = styled.TextInput.attrs({
  placeholderTextColor: `${colors.darkBlue}`,
})`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.darkBlue};
  background-color: ${colors.white};
  height: 60px;
  border-radius: 30px;
  padding: 0 25px;
  margin-top: 10px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${colors.darkBlue};
  justify-content: center;
  height: 60px;
  border-radius: 30px;
  margin: 20px 0;
`;

export const SaveButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  align-self: center;
`;

export const LogoutButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 20px 0;
`;

export const LogoutButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
`;
