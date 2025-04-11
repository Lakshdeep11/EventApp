import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebaseConfig';

export default function AddEvent({ route, navigation }) {
  const user = auth.currentUser;
  const editing = route.params?.event;
  const [title, setTitle] = useState(editing?.title || '');
  const [desc, setDesc] = useState(editing?.description || '');
  const [date, setDate] = useState(editing?.date || '');
  const [location, setLocation] = useState(editing?.location || '');

  const handleSubmit = async () => {
    if (!title || !date || !location) {
      Alert.alert('Please fill all fields');
      return;
    }

    if (editing) {
      await updateDoc(doc(db, 'events', editing.id), {
        title,
        description: desc,
        date,
        location,
      });
    } else {
      await addDoc(collection(db, 'events'), {
        title,
        description: desc,
        date,
        location,
        owner: user.uid,
        createdAt: serverTimestamp(),
      });
    }
    setTitle('');
  setDesc('');
  setDate('');
  setLocation('');

  Alert.alert('Success');
  navigation.navigate('Dashboard', { screen: 'Events' });  // Navigate to EventList tab

};

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Description" value={desc} onChangeText={setDesc} multiline style={{ borderBottomWidth: 1, height: 80 }} />
      <Button title={editing ? 'Update Event' : 'Create Event'} onPress={handleSubmit} />
    </View>
  );
}
