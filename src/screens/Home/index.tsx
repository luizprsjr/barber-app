import React, {useCallback, useState} from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
} from './styles';

import colors from '../../utils/colors';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');

  const goToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  return (
    <Container>
      <Scroller>
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
          <LocationFinder>
            <MyLocationIcon width="24" height="24" fill={colors.white} />
          </LocationFinder>
        </LocationArea>
      </Scroller>
    </Container>
  );
};

export default Home;
