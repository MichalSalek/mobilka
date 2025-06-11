import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WEBVIEW_URL} from "../appDomain.config";
import {NetworkErrorOrganism} from "../components/NetworkError.organism";
import {WebViewOrganism} from "../components/WebView.organism";
import {LoadingAtom} from "../components/Loading.atom";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Dodajemy stan ładowania

  const checkNetwork = () => {
    setIsLoading(true);
    fetch(WEBVIEW_URL)
      .then((response) => {
        setIsNetworkError(response.status !== 200);
        setIsLoading(false);
      })
      .catch(() => {
        setIsNetworkError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      {isLoading ? (
        <LoadingAtom/>
      ) : isNetworkError ? (
        <NetworkErrorOrganism onRetry={checkNetwork}/>
      ) : (
        <WebViewOrganism onError={() => setIsNetworkError(true)}/>
      )}
    </SafeAreaView>
  );
}