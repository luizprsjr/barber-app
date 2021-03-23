import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import IBarber from '../../interfaces/Barber';
import api from '../../services/api';
import colors from '../../utils/colors';

import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

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
  BarberInfoArea,
  BarberAvatar,
  BarberInfo,
  BarberInfoName,
  BarberFavButton,
  LoadingIcon,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,
  BackButton,
  TestimonialArea,
  testimonialSwiperStyle,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
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
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const {data} = await api.get(`/barber/${barberInfo.id}?token=${token}`);

      if (!data.error) {
        setBarberInfo(data.data);
        setFavorited(data.data.favorited);
      } else {
        Alert.alert('Erro!', `${data.error}`);
      }

      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFavClick = useCallback(() => {
    // TODO: conectar com a api, por enquanto não existe a rota
    setFavorited(!favorited);
  }, [favorited]);

  const handleServiceChoose = useCallback((key: number) => {
    setSelectedService(key);
    setShowModal(true);
  }, []);

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
          <BarberInfoArea>
            <BarberAvatar source={{uri: barberInfo.avatar}} />

            <BarberInfo>
              <BarberInfoName>{barberInfo.name}</BarberInfoName>
              <Stars stars={barberInfo.stars} showNumber={true} />
            </BarberInfo>

            <BarberFavButton onPress={handleFavClick}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill={colors.red} />
              ) : (
                <FavoriteIcon width="24" height="24" fill={colors.red} />
              )}
            </BarberFavButton>
          </BarberInfoArea>

          {loading && <LoadingIcon size="large" color={colors.darkBlue} />}

          {barberInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de Serviços</ServicesTitle>

              {barberInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>

                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}

          {barberInfo.testimonials && barberInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={testimonialSwiperStyle}
                showsPagination={false}
                showsButtons={true}
                prevButton={
                  <NavPrevIcon width="35" height="35" fill={colors.black} />
                }
                nextButton={
                  <NavNextIcon width="35" height="35" fill={colors.black} />
                }>
                {barberInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>

                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill={colors.white} />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        barber={barberInfo}
        service={selectedService}
      />
    </Container>
  );
};

export default Barber;
