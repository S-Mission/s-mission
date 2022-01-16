import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Manage from '../screens/Manage';
import Chatting from '../screens/Chatting';
import Mypage from '../screens/Mypage';
import { Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { THICK_BLUE } from "../colors";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor : THICK_BLUE,
        tabBarShowLabel: false }}
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({color, size}) => {
          return <SimpleLineIcons name="home" color={color} size={size}/>
        }
      }}/>
      <Tab.Screen name="Manage" component={Manage} options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="document-outline" color={color} size={size}/>
        }
      }}/>
      <Tab.Screen name="Chatting" component={Chatting} options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
        }
      }}/>
      <Tab.Screen name="Mypage" component={Mypage} options={{
        tabBarIcon: ({color, size}) => {
          return <Entypo name="circle" color={color} size={size} />
        }
      }}/>
    </Tab.Navigator>
  )
}

export default Tabs;