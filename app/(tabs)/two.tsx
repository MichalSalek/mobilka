import { StyleSheet } from 'react-native'
import { TextAtom }   from '../../src/UI/components/atoms/Text.atom'
import { ViewAtom }   from '../../src/UI/components/atoms/View.atom'





export default function screen() {
  return (
    <ViewAtom style={styles.container}>
      <TextAtom style={styles.title}>Tab Two</TextAtom>

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
