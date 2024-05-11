import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ReactElement }                           from 'react'
import { PaperProvider }                          from 'react-native-paper'
import { paperTheme }                             from '../styles/paperTheme'
import { useColorSchemeHook }                     from '../styles/useColorSchemeHook/useColorSchemeHook.web'




type Props = {
  children: ReactElement,
}

export const MainComposition = ({children}: Props): ReactElement => {
  const colorScheme = useColorSchemeHook()

  return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <PaperProvider theme={paperTheme}>

    {children}

    </PaperProvider>


  </ThemeProvider>
}
