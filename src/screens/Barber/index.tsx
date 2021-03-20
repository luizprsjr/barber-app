import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import IBarber from '../../interfaces/Barber';
import api from '../../services/api';

import {Container} from './styles';

type ParamList = {
  Barber: IBarber;
};

const Barber: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'Barber'>>();

  const [barberInfo, setBarberInfo] = useState<IBarber>({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });
  const [ĺoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const {data} = await api.get(`/barber/${barberInfo.id}?token=${token}`);

      if (!data.error) {
        setBarberInfo(data.data);
      } else {
        Alert.alert('Erro!', `${data.error}`);
      }

      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Text>Barbeiro: {barberInfo.name}</Text>
    </Container>
  );
};

export default Barber;
