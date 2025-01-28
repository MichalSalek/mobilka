import React, { ReactElement } from 'react'
import { StyleSheet }          from 'react-native'
import { TextAtom }            from '../components/generic-atoms/Text.atom'
import { ViewAtom }            from '../components/generic-atoms/View.atom'
import { UsersButtonAtom }     from '../components/UsersButton.atom'
import { generic_styles }      from '../styles/theme'




const styles = StyleSheet.create({
  container: {
    alignItems       : 'center',
    justifyContent   : 'center',
    paddingTop       : 50,
    paddingBottom    : 30,
    paddingHorizontal: 10
  }
})

type Props = {
  children: ReactElement,
  title?: string
}

export const ScreenComposition = ({children, title}: Props): ReactElement => {

  return <ViewAtom style={styles.container}>

    <TextAtom>Amazon Nails App</TextAtom>

    <TextAtom style={generic_styles.title}>{title}</TextAtom>

    {children}

    <ViewAtom style={{
      position: 'absolute',
      bottom: 20,
      right: 15,
      flex         : 0
    }}>
      <UsersButtonAtom/>
    </ViewAtom>


  </ViewAtom>
}

