import WebView from "react-native-webview";
import {WEBVIEW_URL} from "../app.config";
import {Loading} from "./Loading.atom";
import {BackHandler, StyleSheet} from "react-native";
import {useEffect, useRef} from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  }
});


export const WebViewOrganism = () => {

  const canGoBackRef = useRef(false)
  const webViewRef = useRef<WebView | null>(null)

  const onAndroidBackPress = () => {
    if (canGoBackRef.current && webViewRef.current) {
      webViewRef.current?.goBack();
      return true
    }
    return false
  };


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
  }, []);

  const onNavigationStateChange = ({canGoBack}) => {
    canGoBackRef.current = canGoBack
  }


  return <WebView
    // cacheMode // https://developer.android.com/reference/android/webkit/WebSettings.html#setCacheMode(int)
    // overScrollMode={'never'} // https://developer.android.com/reference/android/view/View#setOverScrollMode(int)

    ref={webViewRef}

    style={styles.container}
    source={{uri: WEBVIEW_URL}}
    originWhitelist={['*']}

    onNavigationStateChange={onNavigationStateChange}

    setBuiltInZoomControls={false}

    // androidLayerType={'hardware'}
    mixedContentMode={'compatibility'}
    useWebView2={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    renderLoading={() => <Loading/>}
  />
}
