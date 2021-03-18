import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import colors from '../../utils/colors';
import IBarber from '../../interfaces/Barber';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coords, setCoords] = useState<GeolocationResponse | null>(
    {} as GeolocationResponse,
  );
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IBarber[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const goToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const getBarbers = useCallback(async () => {
    setLoading(true);
    setList([]);

    const token = await AsyncStorage.getItem('token');
    const {data: response} = await api.get(`/barbers?token=${token}`);

    if (!response.error) {
      if (response.loc) {
        setLocationText(response.loc);
      }

      setList(response.data);
    } else {
      Alert.alert('Erro', `${response.error}`);
    }

    setLoading(false);
  }, []);

  const handleLocationFinder = useCallback(async () => {
    setCoords(null);

    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );

    if (result === 'granted') {
      setLoading(true);
      setLocationText('');
      setList([]);

      Geolocation.getCurrentPosition((info) => {
        console.log(info);
        setCoords(info);
        getBarbers();
      });
    }
  }, [getBarbers]);

  const onRefresh = useCallback(() => {
    setRefreshing(false);
    getBarbers();
  }, [getBarbers]);

  useEffect(() => {
    getBarbers();
  }, [getBarbers]);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={goToSearch}>
            <SearchIcon width="26" height="26" fill={colors.white} />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está"
            placeholderTextColor={colors.white}
            value={locationText}
            onChangeText={(text) => setLocationText(text)}
            selectionColor={colors.white}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill={colors.white} />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color={colors.white} />}

        <ListArea>
          {list.map((item, key) => (
            <BarberItem key={key} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};

export default Home;
