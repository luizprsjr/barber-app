import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue};
  justify-content: center;
  align-items: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
