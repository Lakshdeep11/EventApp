import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"  style={styles.input}/>
      <Text style={styles.title}>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input}/>
      <Button title="Sign In" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('SignUp')}  style={styles.change}>Don't have an account? Sign up</Text>
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