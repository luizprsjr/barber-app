import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import AppointmentItem from '../../components/AppointmentItem';
import IAppointment from '../../interfaces/Appointment';

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  ListArea,
  EmptyWarning,
} from './styles';

const Appointments: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IAppointment[]>([]);

  const getAppointments = useCallback(async () => {
    setLoading(true);
    setList([]);

    const token = await AsyncStorage.getItem('token');
    const {data: response} = await api.get(`/user/appointments?token=${token}`);

    if (!response.error) {
      setList(response.list);
    } else {
      Alert.alert('Erro!' + `${response.error}`);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Agendamentos</HeaderTitle>
      </HeaderArea>

      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAppointments} />
        }>
        {!loading && list.length === 0 && (
          <EmptyWarning>Não há agendamentos.</EmptyWarning>
        )}

        <ListArea>
          {list.map((item, k) => (
            <AppointmentItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Appointments;
