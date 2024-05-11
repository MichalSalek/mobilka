import { ReactElement }                 from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useThemeColor }                from '../../styles/theme'
import { ThemeProps }                   from './atoms.types'




export type ViewAtomProps = ThemeProps & View['props'] & { scrollable?: boolean }

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex   : 1
  }
})

export const ViewAtom = (props: ViewAtomProps): ReactElement => {
  const {
    style,
    lightColor,
    darkColor,
    scrollable,
    ...otherProps
  } = props
  const backgroundColor = useThemeColor({
    light: lightColor,
    dark : darkColor
  }, 'background')

  if (scrollable) {
    return <ScrollView contentContainerStyle={[ {backgroundColor}, style ]} {...otherProps} />
  } else {
    return <View style={[ {backgroundColor}, styles.container, style ]} {...otherProps} />
  }
}
