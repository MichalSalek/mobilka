import Entypo                 from '@expo/vector-icons/Entypo'
import { Link }               from 'expo-router'
import { ReactElement }       from 'react'
import { Pressable }          from 'react-native'
import { generic_styles }     from '../styles/theme'
import { useColorSchemeHook } from '../styles/useColorSchemeHook/useColorSchemeHook'




export const UsersButtonAtom = (): ReactElement => {
  const colorScheme = useColorSchemeHook()
  return <Link href="/modal-users" asChild style={generic_styles.buttonCircle}>
    <Pressable>
      {({pressed}) => (
        <Entypo
          color={'white'}
          name="users"
          size={20}
          style={{
            opacity: pressed ? 0.5 : 0.8
          }}
        />
      )}
    </Pressable>
  </Link>
}
