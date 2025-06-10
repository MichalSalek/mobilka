import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WEBVIEW_URL} from "../app.config";
import NetworkErrorOrganism from "../components/NetworkError.organism";
import WebViewOrganism from "../components/WebView.organism";
import LoadingAtom from "../components/Loading.atom";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

type Status = 'loading' | 'error' | 'ready';

export default function App() {
  const [status, setStatus] = useState<Status>('loading');

  const checkNetwork = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch(WEBVIEW_URL);
      if (response.ok) {
        setStatus('ready');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void checkNetwork();
  }, [checkNetwork]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {status === 'loading' && <LoadingAtom />}
      {status === 'error' && <NetworkErrorOrganism onRetry={checkNetwork} />}
      {status === 'ready' && <WebViewOrganism />}
    </SafeAreaView>
  );
}