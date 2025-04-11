import React from 'react';
import { auth} from '../Firebase/firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import EventList from './EventList';
import AddEvent from './AddEvent';
import Favourite from './Favourite';
import EventDetails from './EventDetails';


const Tab = createBottomTabNavigator();


export default function Dashboard({ navigation }) {
    const user = auth.currentUser;

  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Events" component={EventList} />
      <Tab.Screen name="Create" component={AddEvent} />
      <Tab.Screen name="Favourites" component={Favourite} />
    </Tab.Navigator>
  );
}
