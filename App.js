import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Dashboard from './Screens/Dashboard';
import EventDetails from './Screens/EventDetails';
import AddEvent from './Screens/AddEvent';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: '#1E90FF' },
      headerTintColor: '#fff',                   
      headerTitleStyle: { fontWeight: 'bold' },   
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: '#1E90FF' },
      headerTintColor: '#fff',                   
      headerTitleStyle: { fontWeight: 'bold' },   
    }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => auth.signOut()}
              style={{ marginRight: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out!');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  useEffect(() => {
    const user1 = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return user1;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
