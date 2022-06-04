import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Main } from './src/Main';

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar />
    <Main />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: 'white',
  },
});

export default App;
