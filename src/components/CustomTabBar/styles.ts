import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const TabArea = styled.View`
  height: 60px;
  background-color: ${colors.tabBlue};
  flex-direction: row;
`;

export const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MainTabItem = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 35px;
  border: 3px solid ${colors.tabBlue};
  margin-top: -20px;
`;

export const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export const activeScreen = {
  opacity: 1,
};
export const disabledScreen = {
  opacity: 0.5,
};
