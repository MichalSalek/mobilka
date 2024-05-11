import { ReactElement }  from 'react'
import { View }          from 'react-native'
import { useThemeColor } from '../../styles/theme'
import { ThemeProps }    from './atoms.types'




export type ViewAtomProps = ThemeProps & View['props']

export const ViewAtom = (props: ViewAtomProps): ReactElement => {
  const {
    style,
    lightColor,
    darkColor,
    ...otherProps
  } = props
  const backgroundColor = useThemeColor({
    light: lightColor,
    dark : darkColor
  }, 'background')

  return <View style={[ {backgroundColor}, style ]} {...otherProps} />
}
