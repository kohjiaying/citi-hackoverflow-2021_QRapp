import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  MainScreen,
  QueueScreen,
  ProfileScreen,
  FavouriteScreen,
  CartScreen,
  StoreLoginScreen,
  SearchScreen,
  ScanScreen,
  CashierProfileScreen,
  OwnerLoginScreen,
  OwnerManageCashierScreen,
  OwnerManageVoucherScreen,
  MyVoucherScreen,
  StoreQRScanScreen,
  PointScreen
} from './src/screens'
import { theme } from './src/core/theme';
import { Provider } from 'react-native-paper';
import React from 'react';
import { Button, View, Text,Alert ,SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer ,DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import firebase from './database/firebaseDB.js'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Explore') {
        iconName = focused
        ? 'ios-add'
        : 'ios-add-outline';
      } else if (route.name === 'Brands') {
        iconName = focused
        ? 'list'
        : 'list-outline';
      }
	  else if (route.name === 'My Vouchers') {
        iconName = focused
        ? 'gift'
        : 'gift-outline';
      }
      else if (route.name === 'Profile') {
        iconName = focused
        ? 'person'
        : 'person-outline';
      }
return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
      activeTintColor: '#560CCE',
      inactiveTintColor: '#414757',
      }}
    >
        <Tab.Screen name="Explore" component={MainScreen} />
        <Tab.Screen name="Brands"  children={() => <QueueScreen navigation={navigation} />} />
		<Tab.Screen name="My Vouchers"  children={() => <MyVoucherScreen navigation={navigation} />} />
        <Tab.Screen name="Profile" children={() => <ProfileScreen navigation={navigation} />} >
        </Tab.Screen>
    </Tab.Navigator>
  );
}

function OwnerHomeScreen({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Manage Cashiers') {
        iconName = focused
        ? 'people-circle'
        : 'people-circle-outline';
      } else if (route.name === 'Manage Vouchers') {
        iconName = focused
        ? 'gift'
        : 'gift-outline';
      }
      else if (route.name === 'Profile') {
        iconName = focused
        ? 'person'
        : 'person-outline';
      }
return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
      activeTintColor: '#560CCE',
      inactiveTintColor: '#414757',
      }}
    >
        <Tab.Screen name="Manage Cashiers" component={OwnerManageCashierScreen} />
        <Tab.Screen name="Manage Vouchers"  children={() => <OwnerManageVoucherScreen navigation={navigation} />} />
        <Tab.Screen name="Profile" children={() => <CashierProfileScreen navigation={navigation} />} >
        </Tab.Screen>
    </Tab.Navigator>
  );
}

function StoreHomeScreen({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Scan QR') {
        iconName = focused
        ? 'ios-qr-code'
        : 'ios-qr-code-outline';
      } else if (route.name === 'Search') {
        iconName = focused
        ? 'search'
        : 'search-outline';
      }
      else if (route.name === 'Profile') {
        iconName = focused
        ? 'person'
        : 'person-outline';
      }
return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
      activeTintColor: '#560CCE',
      inactiveTintColor: '#414757',
      }}
    >
        <Tab.Screen name="Scan QR" component={ScanScreen} />
        <Tab.Screen name="Search"  children={() => <SearchScreen navigation={SearchScreen} />} />
        <Tab.Screen name="Profile" children={() => <CashierProfileScreen navigation={navigation} />} >
        </Tab.Screen>
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator 
          screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}
          >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="AppDrawer" component={AppDrawer}/>
		  <Stack.Screen name="StoreLoginScreen" component={StoreLoginScreen}/>
		  <Stack.Screen name="StoreAppDrawer" component={StoreAppDrawer}/>
		  <Stack.Screen name="OwnerLoginScreen" component={OwnerLoginScreen}/>
		  <Stack.Screen name="OwnerAppDrawer" component={OwnerAppDrawer}/>
		  <Stack.Screen name="CartScreen" component={CartScreen}/>
		  <Stack.Screen name="StoreQRScanScreen" component={StoreQRScanScreen}/>
		  <Stack.Screen name="PointScreen" component={PointScreen}/>
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

// @TODO logout 
// https://stackoverflow.com/questions/61331840/how-do-i-add-a-log-out-button-to-my-drawer-using-react-navigation-v5
function AppDrawer({navigation}) {
  return (
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Favourites" component={FavouriteScreen} />
        {/* <Drawer.Screen name="Logout" component={() } /> */}
      </Drawer.Navigator>
  )
}

function StoreAppDrawer({navigation}) {
  return (
      <Drawer.Navigator initialRouteName="StoreHomeScreen">
        <Drawer.Screen name="Home" component={StoreHomeScreen} />
        <Drawer.Screen name="Favourites" component={FavouriteScreen} />
        {/* <Drawer.Screen name="Logout" component={() } /> */}
      </Drawer.Navigator>
  )
}

function OwnerAppDrawer({navigation}) {
  return (
      <Drawer.Navigator initialRouteName="OwnerHomeScreen">
        <Drawer.Screen name="Home" component={OwnerHomeScreen} />
        <Drawer.Screen name="Favourites" component={FavouriteScreen} />
        {/* <Drawer.Screen name="Logout" component={() } /> */}
      </Drawer.Navigator>
  )
}

