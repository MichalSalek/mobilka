import { ReactElement, useRef } from 'react'
import { TextInput, TextStyle } from 'react-native'
import { useThemeColor }        from '../../styles/theme'
import { ThemeProps }           from './atoms.types'




export type TextInputAtomProps = ThemeProps & TextInput['props']

export const TextInputAtom = (props: TextInputAtomProps): ReactElement => {
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

  const styled = useRef<TextStyle>({
    borderColor: 'black',
    borderWidth: 1,
    minWidth: '75%',
    padding: 5
  })

  return <TextInput style={[ {color}, styled.current, style ]} {...otherProps} />
}
