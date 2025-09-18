import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {LoadingOrganism} from "./Loading.organism";
import {NetworkErrorOrganism} from "./NetworkError.organism";
import {WebViewOrganism} from "./WebView.organism";
import {StatusBar} from "expo-status-bar";
import {StyleSheet} from "react-native";
import {WEBVIEW_URL} from './config'


export default function App() {
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkNetwork = () => {
    setIsLoading(true);
    fetch(WEBVIEW_URL, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then((response) => {

        setIsNetworkError(!String(response.status).includes('2'));
        setIsLoading(false);
      })
      .catch((error) => {

        setIsNetworkError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <>

        {isLoading ? <LoadingOrganism/> : null}

        {!isLoading && isNetworkError ? (
          <NetworkErrorOrganism onRetry={checkNetwork}/>
        ) : (
          !isLoading && <WebViewOrganism
              url={WEBVIEW_URL}
              onNetworkError={() => setIsNetworkError(true)}
          />
        )}

        <StatusBar style="auto"/>

      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
});