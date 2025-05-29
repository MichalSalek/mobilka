import {Animated, StyleSheet} from 'react-native';
import View = Animated.View;


const styles = StyleSheet.create({
  loading: {
    color: '#333',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingWrapper: {
    backgroundColor: "#ddd",
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  }
});


export const Loading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <Text style={styles.loading}>{'jakiś loading'}</Text>
    </View>
  );
};
