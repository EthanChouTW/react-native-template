import {
  Dimensions
} from 'react-native';
import SlideMenuScreen from '../components/SlideMenuScreen';
import HomeScreen from '../components/home/HomeScreen';
import BodyScreen from '../components/inventoryManagement/BodyScreen';
import HealthScreen from '../components/HealthScreen';
import PhysicalInfoScreen from '../components/PhysicalInfoScreen';
import Logout from '../components/Logout';
import Theme from '../utils/styleCollection';

const { height, width } = Dimensions.get('window');

export const routeKeys = {
  Home: 'Home',
  HealthScreen: 'HealthScreen',
  BodyScreen: 'BodyScreen',
  PhysicalInfoScreen: 'PhysicalInfoScreen'
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
  [`${routeKeys.PhysicalInfoScreen}`]: {
    screen: PhysicalInfoScreen
  },
  [`${routeKeys.HealthScreen}`]: {
    screen: HealthScreen
  },
  [`${routeKeys.BodyScreen}`]: {
    screen: BodyScreen
  }
};
