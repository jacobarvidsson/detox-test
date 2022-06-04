import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const Main = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.container} testID="home.container.welcome">
      <Text style={styles.title}>
        {isPressed ? 'Thank you for clicking!' : 'Welcome to this detox app!'}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => setIsPressed(true)}
        testID="home.container.button">
        <Text style={styles.buttonText}>{isPressed ? 'Done' : 'Continue'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
