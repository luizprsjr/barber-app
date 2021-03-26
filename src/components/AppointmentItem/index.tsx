import React from 'react';

import IAppointment from '../../interfaces/Appointment';

import {
  Area,
  BarberArea,
  Avatar,
  BarberName,
  SplitArea,
  ServiceText,
  DateText,
} from './styles';

interface AppointmentItemProps {
  data: IAppointment;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({data}) => {
  let d = data.datetime.split(' ');

  let time = d[1].substring(0, 5);

  let date = new Date(d[0]);
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  let dateString = `${day}/${month}/${year}`;

  return (
    <Area>
      <BarberArea>
        <Avatar source={{uri: data.barber.avatar}} />
        <BarberName>{data.barber.name}</BarberName>
      </BarberArea>

      <SplitArea>
        <ServiceText>{data.service.name}</ServiceText>
        <ServiceText>R$ {data.service.price.toFixed(2)}</ServiceText>
      </SplitArea>

      <SplitArea>
        <DateText>{dateString}</DateText>
        <DateText>{time}</DateText>
      </SplitArea>
    </Area>
  );
};

export default AppointmentItem;
