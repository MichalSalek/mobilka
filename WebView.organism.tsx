import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {LoadingOrganism} from "./Loading.organism";
import {NetworkErrorOrganism} from "./NetworkError.organism";

interface WebViewOrganismProps {
  url: string;
  onNetworkError: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#090909',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  }
});

export const WebViewOrganism = ({url, onNetworkError}: WebViewOrganismProps) => {
  const webViewRef = useRef<WebView | null>(null)
  const canGoBackRef = useRef(false)
  const [hasPageError, setHasPageError] = useState(false)

  // Obsługa przycisku wstecz
  useEffect(() => {
    const backHandler = () => {
      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', backHandler);
  }, []);

  const handleReload = () => {
    setHasPageError(false);
    webViewRef.current?.reload();
  };

  const handleError = (syntheticEvent: any) => {
    const {nativeEvent} = syntheticEvent;
    console.log(' ')
    console.log('WebView error:');
    console.log(nativeEvent)
    console.log(' ')

    const errorInformation = nativeEvent.code + ' ' + nativeEvent.description

    console.log(errorInformation)

    // Lista kodów błędów połączenia
    const connectionErrorCodes = [
      -6,  // ERR_CONNECTION_REFUSED
      -2,  // ERR_INTERNET_DISCONNECTED
      -1009, // ERR_CONNECTION_REFUSED
      -1001, // ERR_CONNECTION_TIMED_OUT
      -1003, // ERR_CONNECTION_ABORTED
      -1004, // ERR_CONNECTION_CLOSED
      -1005, // ERR_CONNECTION_RESET
    ];

    if (connectionErrorCodes.includes(nativeEvent.code)) {
      setHasPageError(true);
      onNetworkError();
    }
  };

  return (
    <View style={styles.container}>
      {hasPageError && <NetworkErrorOrganism onRetry={handleReload}/>}

      <WebView
        ref={webViewRef}
        style={[styles.container, hasPageError ? {opacity: 0} : {}]}
        source={{uri: url}}

        // Podstawowe ustawienia
        startInLoadingState={true}
        renderLoading={() => <LoadingOrganism/>}
        allowsBackForwardNavigationGestures={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}

        // Optymalizacja i bezpieczeństwo
        setSupportMultipleWindows={false}
        setBuiltInZoomControls={false}
        useWebKit={true}
        mediaPlaybackRequiresUserAction={true}
        allowsInlineMediaPlayback={true}
        overScrollMode="never"

        // Obsługa błędów
        onError={handleError}
        onHttpError={(syntheticEvent) => {
          const {statusCode} = syntheticEvent.nativeEvent;
          if (statusCode >= 400) {
            setHasPageError(true)
          }
        }}
        onContentProcessDidTerminate={() => {
          webViewRef.current?.reload();
        }}

        // Wydajność
        cacheMode="LOAD_NO_CACHE"
        applicationNameForUserAgent="MyApp/1.0.0"
        pullToRefreshEnabled={true}

        originWhitelist={['*']}
        allowsFullscreenVideo
        mixedContentMode="always"
        cacheEnabled
        useNativeResumeAndPauseLifecycleEvents
        onNavigationStateChange={({canGoBack}) => {
          canGoBackRef.current = canGoBack;
        }}
      />
    </View>
  );
};