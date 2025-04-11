import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function EventDetails({ route }) {
  const { event } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser;
  const navigation = useNavigation(); 
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const checkFavorite = async () => {
      const favRef = doc(db, 'users', user.uid, 'favourites', event.id);
      const favSnap = await getDoc(favRef);
      if (favSnap.exists()) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };

    checkFavorite();
  }, [event.id, user.uid]);

  const handleDelete = (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          await deleteDoc(doc(db, 'events', id));
        },
      },
    ]);
  };

  const toggleFavorite = async () => {
    const favRef = doc(db, 'users', user.uid, 'favourites', event.id);

    if (isFavorite) {
      // Remove from favorites
      await deleteDoc(favRef);
      setIsFavorite(false);
    } else {
      // Add to favorites
      await setDoc(favRef, {
        title: event.title,
        date: event.date,
        location: event.location,
        description: event.description,
      });
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.text}>{event.date}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.text}>{event.location}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{event.description}</Text>

      {event.owner === user.uid && (
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Button
            title="Edit"
            onPress={() => navigation.navigate('AddEvent', { event: event })} 
          />
          <View style={{ width: 10 }} />
          <Button title="Delete" color="red" onPress={() => handleDelete(event.id)} />
        </View>
      )}

      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={toggleFavorite}
        color={isFavorite ? '#e74c3c' : '#3498db'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
