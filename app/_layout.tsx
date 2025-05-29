import WebView from "react-native-webview";
import {Animated, BackHandler, Button, StyleSheet} from 'react-native';
import {useEffect, useRef} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import View = Animated.View;
import {COLORS} from '@/src/READONLY-shared-kernel/domain/color-theme/colors'


// https://github.com/react-native-webview/react-native-webview/blob/1ddfe70521725c365cf8accf2a1bdf82eb4db80f/docs/Reference.md


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0


  },
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
  },
  retry: {
    alignSelf: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2 / 2,
  },
  webView: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
});


const Loading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <Text style={styles.loading}>{'loading'}</Text>
    </View>
  );
};
const Error = ({reload}) => {
  return (
    <View style={styles.loadingWrapper}>
      <Button
        style={styles.retry}
        label={'retry'}
        primary
        onPress={reload}
        title={'retry2'}/>
    </View>
  );
}


export default function RootLayout() {

  const webview = useRef(null)

  const canGoBackRef = useRef(false)

  const onAndroidBackPress = () => {
    if (canGoBackRef.current && webview.current) {
      webview.current.goBack();
      return true
    }
    return false
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
    };
  }, []);

  const onNavigationStateChange = ({canGoBack}) => {
    canGoBackRef.current = canGoBack
  }

  const reload = () => webview.current?.reload();


  return (<SafeAreaView style={styles.wrapper}>
    <WebView
      // cacheMode // https://developer.android.com/reference/android/webkit/WebSettings.html#setCacheMode(int)
      // overScrollMode={'never'} // https://developer.android.com/reference/android/view/View#setOverScrollMode(int)
      // androidLayerType={'hardware'}

      ref={webview}

      mixedContentMode={'compatibility'}
      setBuiltInZoomControls={false}

      // useWebView2={true}
      style={styles.container}
      source={{uri: 'http://192.168.1.28:3000/'}}
      originWhitelist={['*']}

      onNavigationStateChange={onNavigationStateChange}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      renderLoading={() => <Loading/>}
      renderError={() => <Error reload={reload}/>}
      // startInLoadingState
    />
  </SafeAreaView>);
}

