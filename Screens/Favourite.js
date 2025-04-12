import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebaseConfig';

export default function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const favRef = collection(db, 'users', user.uid, 'favourites');
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavourites(data);
    });

    return unsubscribe;
  }, []);

  const removeFavourite = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'favourites', id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container1}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date} - {item.location}</Text>
            <Button title="Remove from Favourites" onPress={() => removeFavourite(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No favourites found.</Text>}
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
  container1: {
    padding: 5,
    backgroundColor: '#fff',
    alignItems:'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignContent:'center',
    alignItems:'center'
  },
  label: {
    fontWeight: '800',
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
    borwderWidth: 4,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});