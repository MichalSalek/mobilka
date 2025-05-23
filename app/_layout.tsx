import WebView from "react-native-webview";
// import Constants from 'expo-constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0 // Constants.statusBarHeight,
  },
});

// https://github.com/react-native-webview/react-native-webview/blob/1ddfe70521725c365cf8accf2a1bdf82eb4db80f/docs/Reference.md

export default function RootLayout() {

  return (
    <WebView
      // cacheMode // https://developer.android.com/reference/android/webkit/WebSettings.html#setCacheMode(int)
      // overScrollMode={'never'} // https://developer.android.com/reference/android/view/View#setOverScrollMode(int)
      // androidLayerType={'hardware'}

      domStorageEnabled={true}
      mixedContentMode={'compatibility'}
      setBuiltInZoomControls={false}

      useWebView2={true}
      style={styles.container}
      source={{uri: 'http://192.168.1.34/'}}
      originWhitelist={['*']}
    />
  );
}
