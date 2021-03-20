import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import IBarber from '../../interfaces/Barber';

import Stars from '../Stars';

import {
  Area,
  Avatar,
  InfoArea,
  UserName,
  SeeProfileButton,
  SeeProfileButtonText,
} from './styles';

interface BarberItemProps {
  data: IBarber;
}

const BarberItem: React.FC<BarberItemProps> = ({data}) => {
  const navigation = useNavigation();

  const handleClick = useCallback(() => {
    navigation.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    });
  }, [navigation, data]);

  return (
    <Area onPress={handleClick}>
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <UserName>{data.name}</UserName>

        <Stars stars={data.stars} showNumber={true} />

        <SeeProfileButton>
          <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
};

export default BarberItem;
