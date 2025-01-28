import { StyleSheet }         from 'react-native'
import { Colors }             from './Colors'
import { useColorSchemeHook } from './useColorSchemeHook/useColorSchemeHook'




export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const theme = useColorSchemeHook() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export const generic_styles = StyleSheet.create({
  title       : {
    fontSize  : 20,
    fontWeight: 'bold'
  },
  separator   : {
    marginVertical: 30,
    height        : 1,
    width         : '80%'
  },
  button      : {
    alignItems       : 'center',
    justifyContent   : 'center',
    paddingVertical  : 12,
    paddingHorizontal: 32,
    borderRadius     : 4,
    elevation        : 3,
    backgroundColor  : '#D6C218',
    width            : '25%'
  },
  buttonCircle: {
    alignItems       : 'center',
    justifyContent   : 'center',
    borderRadius     : 100,
    height           : 60,
    width            : 60,
    elevation        : 8,
    backgroundColor  : '#D6C218'
  },
  text        : {
    fontSize     : 16,
    lineHeight   : 21,
    fontWeight   : 'bold',
    letterSpacing: 0.25,
    color        : 'white'
  }
})
