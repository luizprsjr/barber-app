import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IBarber from '../../interfaces/Barber';
import api from '../../services/api';
import BarberItem from '../../components/BarberItem';

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  ListArea,
  EmptyWarning,
} from './styles';

const Favorites: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IBarber[]>([]);

  const getFavorites = useCallback(async () => {
    setLoading(true);
    setList([]);

    const token = await AsyncStorage.getItem('token');
    const {data: response} = await api.get(`/user/favorites?token=${token}`);

    if (!response.error) {
      setList(response.list);
    } else {
      Alert.alert('Erro!', `${response.error}`);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Favoritos</HeaderTitle>
      </HeaderArea>

      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getFavorites} />
        }>
        {!loading && list.length === 0 && (
          <EmptyWarning>Não há favoritos.</EmptyWarning>
        )}

        <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Favorites;
