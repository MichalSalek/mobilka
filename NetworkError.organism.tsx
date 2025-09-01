import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NetworkErrorOrganismProps {
  onRetry: () => void;
}

export const NetworkErrorOrganism = ({ onRetry, additionalInfo }: NetworkErrorOrganismProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Internet connection problem</Text>
      <Text style={styles.subText}>Please check your internet connection or try again when the servers are ready.</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>CHECK NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#212529',
  },
  subText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#6c757d',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#090909',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});