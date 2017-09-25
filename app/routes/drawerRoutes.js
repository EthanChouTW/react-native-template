import {
  Dimensions
} from 'react-native';
import SlideMenuScreen from '../components/SlideMenuScreen';
import HomeScreen from '../components/home/HomeScreen';
import Page4Screen from '../components/Page4/Page4Screen';
import Page3Screen from '../components/Page3Screen';
import Page2Screen from '../components/Page2Screen';
import Logout from '../components/Logout';
import Theme from '../utils/styleCollection';

const { height, width } = Dimensions.get('window');

export const routeKeys = {
  Home: 'Home',
  Page3Screen: 'Page3Screen',
  Page4Screen: 'Page4Screen',
  Page2Screen: 'Page2Screen'
};

export const drawerConfig = {
  drawerWidth: width,
  contentComponent: SlideMenuScreen,
  contentOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    onItemPress: route => {
      console.log(route);
    },
    labelStyle: {
      fontSize: 16
    }
  }
};

export const drawerRoutes = {
  [`${routeKeys.Home}`]: {
    screen: HomeScreen
  },
  [`${routeKeys.Page2Screen}`]: {
    screen: Page2Screen
  },
  [`${routeKeys.Page3Screen}`]: {
    screen: Page3Screen
  },
  [`${routeKeys.Page4Screen}`]: {
    screen: Page4Screen
  }
};
