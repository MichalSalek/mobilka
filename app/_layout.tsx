import WebView from "react-native-webview";
// import Constants from 'expo-constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0 // Constants.statusBarHeight,
  },
});

export default function RootLayout() {

  return (
    <WebView
      style={styles.container}
      source={{uri: 'http://192.168.1.34/'}}
    />
  );
}
