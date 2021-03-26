import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import api from '../../services/api';
import BarberItem from '../../components/BarberItem';
import IBarber from '../../interfaces/Barber';
import colors from '../../utils/colors';

import {
  Container,
  SearchArea,
  SearchInput,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
} from './styles';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [list, setList] = useState<IBarber[]>([]);

  const searchBarbers = useCallback(async () => {
    setEmptyList(false);
    setLoading(true);
    setList([]);

    if (searchText) {
      const token = await AsyncStorage.getItem('token');
      let {data: response} = await api.get(
        `/search?q=${searchText}&token=${token}`,
      );
      if (!response.error) {
        if (response.list.length > 0) {
          setList(response.list);
        } else {
          setEmptyList(true);
        }
      } else {
        Alert.alert('Erro!', `${response.error}`);
      }
    }

    setLoading(false);
  }, [searchText]);

  return (
    <Container>
      <SearchArea>
        <SearchInput
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor={colors.white}
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          onEndEditing={searchBarbers}
          returnKeyType="search"
          autoFocus
          selectTextOnFocus
        />
      </SearchArea>

      <Scroller>
        {loading && <LoadingIcon size="large" color={colors.white} />}

        {emptyList && (
          <EmptyWarning>
            Não achamos barbeiros com o nome "{searchText}"
          </EmptyWarning>
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

export default Search;
