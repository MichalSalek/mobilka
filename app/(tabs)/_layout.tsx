import Entypo                 from '@expo/vector-icons/Entypo'
import { Tabs }               from 'expo-router'
import React                  from 'react'
import { useClientOnlyValue } from '../../src/application/useClientOnlyValue/useClientOnlyValue'
import { MainComposition }    from '../../src/UI/compositions/Main.composition'
import { Colors }             from '../../src/UI/styles/Colors'
import { useColorSchemeHook } from '../../src/UI/styles/useColorSchemeHook/useColorSchemeHook'




// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Entypo>['name'];
  color: string;
}) {
  return <Entypo size={28} style={{marginBottom: -3}} {...props} />
}




const commonTabsScreenOptions = {
  headerShown: false
} as const

export default function TabLayout() {
  const colorScheme = useColorSchemeHook()

  return (
    <MainComposition>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true)
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            ...commonTabsScreenOptions,
            title     : 'Login',
            tabBarIcon: ({color}) => <TabBarIcon name="login" color={color}/>
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            ...commonTabsScreenOptions,
            title     : 'Register',
            tabBarIcon: ({color}) => <TabBarIcon name="add-user" color={color}/>
          }}
        />
        <Tabs.Screen
          name="delete"
          options={{
            ...commonTabsScreenOptions,
            title     : 'Delete User',
            tabBarIcon: ({color}) => <TabBarIcon name="remove-user" color={color}/>
          }}
        />

      </Tabs>

    </MainComposition>
  )
}
2