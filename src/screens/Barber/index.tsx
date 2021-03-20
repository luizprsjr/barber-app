import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import IBarber from '../../interfaces/Barber';
import api from '../../services/api';

import {
  Container,
  Scroller,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  swiperStyle,
  paginationStyle,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestmonialArea,
} from './styles';

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
      <Scroller>
        {barberInfo.photos && barberInfo.photos.length > 0 ? (
          <Swiper
            style={swiperStyle}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={paginationStyle}
            autoplay={true}>
            {barberInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}

        <PageBody>
          <UserInfoArea />
          <ServiceArea />
          <TestmonialArea />
        </PageBody>
      </Scroller>
    </Container>
  );
};

export default Barber;
