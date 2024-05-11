import { ReactElement }  from 'react'
import { Text }          from 'react-native'
import { useThemeColor } from '../../styles/theme'
import { ThemeProps }    from './atoms.types'




export type TextAtomProps = ThemeProps & Text['props']

export const TextAtom = (props: TextAtomProps): ReactElement => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props
  const color = useThemeColor({
    light: lightColor,
    dark : darkColor
  }, 'text')

  return <Text style={[ {color}, style ]} {...otherProps} />
}
