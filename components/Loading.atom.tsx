import {ActivityIndicator, View, StyleSheet} from "react-native";

export const LoadingAtom = () => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loading}>{'Loading...'}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loading: {
    color: '#333',
    fontSize: 16,
    marginTop: 12,
  }
});