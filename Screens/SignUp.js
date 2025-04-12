import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
      <Text style={styles.title}>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input}/>
      <Button title="Sign Up" onPress={handleSignup} />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  input: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 20,
    color: '#555',
    borderWidth: 1,
    height: 25,
    borderRadius: 4
  },
  change: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline'
  },
});