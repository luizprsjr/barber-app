import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${colors.white};
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeDotActive = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${colors.black};
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: ${colors.blue};
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View`
  height: 240px;
  background-color: ${colors.blue};
`;

export const PageBody = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: 50px;
  margin-top: -50px;
  min-height: 400px;
`;

export const BarberInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const BarberAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 20px;
  border-width: 4px;
  border-color: ${colors.white};
`;

export const BarberInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const BarberInfoName = styled.Text`
  color: ${colors.black};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BarberFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${colors.white};
  border: 2px solid ${colors.lightGrey};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ServiceArea = styled.View`
  margin-top: 30px;
`;

export const ServicesTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.darkBlue};
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const ServiceItem = styled.View`
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.darkBlue};
`;

export const ServicePrice = styled.Text`
  font-size: 14px;
  color: ${colors.darkBlue};
`;

export const ServiceChooseButton = styled.TouchableOpacity`
  background-color: ${colors.tabBlue};
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ServiceChooseBtnText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
`;

export const TestimonialArea = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
  background-color: ${colors.darkBlue};
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
`;

export const TestimonialBody = styled.Text`
  font-size: 13px;
  color: ${colors.white};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
`;

export const swiperStyle = {
  height: 240,
};
export const paginationStyle = {
  top: 15,
  right: 15,
  bottom: undefined,
  left: undefined,
};

export const testimonialSwiperStyle = {
  height: 110,
};
