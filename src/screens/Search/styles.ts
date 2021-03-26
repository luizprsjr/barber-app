import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.blue};
`;

export const SearchArea = styled.View`
  background-color: ${colors.tabBlue};
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  margin: 20px;
  margin-bottom: 0px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.white};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 30px;
`;

export const ListArea = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const EmptyWarning = styled.Text`
  text-align: center;
  margin-top: 30px;
  color: ${colors.white};
  font-size: 14px;
`;
