import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
}