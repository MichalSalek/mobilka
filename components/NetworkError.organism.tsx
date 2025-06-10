// NetworkErrorOrganism.tsx
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});

type Props = {
  onRetry: () => void;
};

export default function NetworkErrorOrganism({onRetry}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        No internet connection.
      </Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}