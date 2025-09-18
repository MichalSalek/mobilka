import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingOrganism = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#090909" />
      <Text style={styles.text}>Wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
  },
});