import WebView from "react-native-webview";
import {WEBVIEW_URL} from "../app.config";
import {BackHandler, StyleSheet} from "react-native";
import {useEffect, useRef} from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  }
});


export const WebViewOrganism = ({ onError }) => {

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
    startInLoadingState={true} // WYMAGANE do wyświetlenia loadera!
    onError={onError}
    onHttpError={onError}

    ref={webViewRef}
    style={styles.container}
    source={{uri: WEBVIEW_URL}}
    originWhitelist={['*']}
    onNavigationStateChange={onNavigationStateChange}
    mediaPlaybackRequiresUserAction={true}
    useWebKit={true}

    androidLayerType={'software'}

    allowsFullscreenVideo={true}
    renderLoading={() => <Loading/>}
    mixedContentMode={'compatibility'}
    setBuiltInZoomControls={false}
    useWebView2={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    cacheEnabled={true} // to active the cache
    cacheMode={'LOAD_CACHE_ELSE_NETWORK'} // type of cache you want // https://developer.android.com/reference/android/webkit/WebSettings.html#setCacheMode(int)
    useNativeResumeAndPauseLifecycleEvents={true}
    allowsInlineMediaPlayback={true}
    automaticallyAdjustContentInsets={false}
    overScrollMode={'auto'}


  />
}
