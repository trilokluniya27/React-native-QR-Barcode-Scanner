import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import QRCodeScan from './components/QRCodeScan';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './components/Home';
import Profile from './components/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily: 'Georgia',
          fontWeight: 300,
        },
        tabBarStyle: {
          height: 65,
          backgroundColor: '#F2F9FF',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={QRCodeScan}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <AntDesign name="scan1" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Feather name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
