import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
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
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text>{item.date} - {item.location}</Text>
            <Button title="Remove from Favourites" onPress={() => removeFavourite(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No favourites found.</Text>}
      />
    </View>
  );
}
