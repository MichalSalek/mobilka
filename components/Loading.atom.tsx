// LoadingAtom.tsx
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});

export default function LoadingAtom() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}