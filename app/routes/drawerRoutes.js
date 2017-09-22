import SlideMenuScreen from '../components/SlideMenuScreen';
import OrderFulfillmentList from '../components/OrderFulfillmentList';
import InventoryManagementScreen from '../components/inventoryManagement/InventoryManagementScreen';
import JobHistoryScreen from '../components/JobHistoryScreen';
import UserProfileScreen from '../components/UserProfile/UserProfileScreen';
import Logout from '../components/Logout';
import Theme from '../utils/styleCollection';

export const routeKeys = {
  UserProfile: 'UserProfile',
  Home: 'Home',
  InventoryManagement: 'InventoryManagementScreen',
  JobHistory: 'JobHistory',
  Logout: 'Logout'
};

export const drawerConfig = {
  drawerWidth: 300,
  contentComponent: SlideMenuScreen,
  contentOptions: {
    activeTintColor: Theme.hbGray,
    inactiveTintColor: Theme.hbGray,
    onItemPress: route => {
      console.log(route);
    },
    labelStyle: {
      fontSize: 16
    }
  }
};

export const drawerRoutes = {
  [`${routeKeys.UserProfile}`]: {
    screen: UserProfileScreen
  },
  [`${routeKeys.Home}`]: {
    screen: OrderFulfillmentList
  },
  [`${routeKeys.InventoryManagement}`]: {
    screen: InventoryManagementScreen
  },
  [`${routeKeys.JobHistory}`]: {
    screen: JobHistoryScreen
  },
  [`${routeKeys.Logout}`]: {
    screen: Logout
  }
};
