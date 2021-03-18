import React, {useCallback, useContext} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {UserContext} from '../../contexts/UserContext';

import colors from '../../utils/colors';

import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';

import {
  TabArea,
  TabItem,
  MainTabItem,
  AvatarIcon,
  activeScreen,
  disabledScreen,
} from './styles';

const CustomTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  const goTo = useCallback(
    (screenName) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={state.index === 0 ? activeScreen : disabledScreen}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>

      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          style={state.index === 1 ? activeScreen : disabledScreen}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>

      <MainTabItem onPress={() => goTo('Appointments')}>
        <TodayIcon width="32" height="32" fill={colors.tabBlue} />
      </MainTabItem>

      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          style={state.index === 3 ? activeScreen : disabledScreen}
          width="24"
          height="24"
          fill="#FFF"
        />
      </TabItem>

      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar ? (
          <AvatarIcon source={{uri: user.avatar}} />
        ) : (
          <AccountIcon
            style={state.index === 4 ? activeScreen : disabledScreen}
            width="24"
            height="24"
            fill="#FFF"
          />
        )}
      </TabItem>
    </TabArea>
  );
};

export default CustomTabBar;
