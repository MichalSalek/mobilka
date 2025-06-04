import {useEffect, useState} from "react";
import {WEBVIEW_URL} from "../constants/General";
import {WebViewOrganism} from '../components/WebView.organism'
import {NetworkErrorOrganism} from '../components/NetworkError.organism'
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {STYLES_POLICY} from "../src/READONLY-shared-kernel/policies/styles.policy";


// https://github.com/react-native-webview/react-native-webview/blob/1ddfe70521725c365cf8accf2a1bdf82eb4db80f/docs/Reference.md

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: STYLES_POLICY.backgroundColor[0],
    flex: 1,
  },
});


export default function App() {

  const [isNetworkError, setIsNetworkError] = useState(false)

  useEffect(() => {
    fetch(WEBVIEW_URL)
      .then((response) => {
        if (response.status === 200) {
          setIsNetworkError(false)
        } else {
          setIsNetworkError(true)
          alert('error');
        }
      })
      .catch((error) => {
        setIsNetworkError(true)
        alert('network error: ' + error);
      })
  }, []);


  return <SafeAreaView style={styles.wrapper}>

    <>{isNetworkError ? <NetworkErrorOrganism/> : <WebViewOrganism/>}</>

  </SafeAreaView>
}
