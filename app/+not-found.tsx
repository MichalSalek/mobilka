import { Link, Stack } from 'expo-router'
import { StyleSheet }  from 'react-native'
import { TextAtom }    from '../src/UI/components/atoms/Text.atom'
import { ViewAtom }    from '../src/UI/components/atoms/View.atom'




export default function screen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}}/>
      <ViewAtom style={styles.container}>
        <TextAtom style={styles.title}>This screen doesn't exist.</TextAtom>

        <Link href="/" style={styles.link}>
          <TextAtom style={styles.linkText}>Go to home screen!</TextAtom>
        </Link>
      </ViewAtom>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    padding       : 20
  },
  title    : {
    fontSize  : 20,
    fontWeight: 'bold'
  },
  link     : {
    marginTop      : 15,
    paddingVertical: 15
  },
  linkText : {
    fontSize: 14,
    color   : '#2e78b7'
  }
})
