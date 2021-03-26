import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Area = styled.View`
  background-color: ${colors.white};
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
`;
export const BarberArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 20px;
`;
export const BarberName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.black};
`;
export const SplitArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
export const ServiceText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.black};
`;
export const DateText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${colors.tabBlue};
`;
