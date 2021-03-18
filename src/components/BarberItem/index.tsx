import React from 'react';

import IBarber from '../../interfaces/Barber';

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
  return (
    <Area>
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <UserName>{data.name}</UserName>

        <SeeProfileButton>
          <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
};

export default BarberItem;
