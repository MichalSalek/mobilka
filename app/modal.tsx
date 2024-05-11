import { StatusBar }            from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'
import { TextAtom }             from '../src/UI/components/atoms/Text.atom'
import { ViewAtom }             from '../src/UI/components/atoms/View.atom'




export default function ModalScreen() {
  return (
    <ViewAtom style={styles.container}>
      <TextAtom style={styles.title}>Modal</TextAtom>
      <ViewAtom style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>


      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
    </ViewAtom>
  )
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center'
  },
  title    : {
    fontSize  : 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height        : 1,
    width         : '80%'
  }
})
