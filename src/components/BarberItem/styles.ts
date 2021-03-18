import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Area = styled.TouchableOpacity`
  background-color: ${colors.white};
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`;

export const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

export const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

export const SeeProfileButton = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid ${colors.tabBlue};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SeeProfileButtonText = styled.Text`
  font-size: 13px;
  color: ${colors.darkBlue};
`;
