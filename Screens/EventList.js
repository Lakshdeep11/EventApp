import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../Firebase/firebaseConfig';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
    });

  }, []);

  

  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        padding: 16,
        margin: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
      }}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No events found.</Text>}
      />
    </View>
  );
}
