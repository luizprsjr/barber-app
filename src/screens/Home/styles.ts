import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.blue};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  width: 250px;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
`;
export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`;

export const LocationArea = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.tabBlue};
  height: 60px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.white};
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
