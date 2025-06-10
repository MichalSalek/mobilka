// WebViewOrganism.tsx
import React, {useEffect, useRef} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import {WEBVIEW_URL} from "../app.config";
import LoadingAtom from "./Loading.atom";


const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default function WebViewOrganism() {
  const webViewRef = useRef<WebView | null>(null);
  const canGoBackRef = useRef(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  return (
    <WebView
      ref={webViewRef}
      style={styles.container}
      source={{uri: WEBVIEW_URL}}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      mediaPlaybackRequiresUserAction
      allowsFullscreenVideo
      allowsInlineMediaPlayback
      useWebKit
      mixedContentMode="compatibility"
      setBuiltInZoomControls={false}
      cacheEnabled
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      androidLayerType="hardware"
      overScrollMode="never"
      useNativeResumeAndPauseLifecycleEvents
      startInLoadingState
      renderLoading={() => <LoadingAtom />}
      onNavigationStateChange={({canGoBack}) => {
        canGoBackRef.current = canGoBack;
      }}
    />
  );
}