import * as Clipboard                                     from 'expo-clipboard'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { List, Surface }                                  from 'react-native-paper'
import { defaultHTTPFetcher }                             from '../../application/http/http.api'
import { ENDPOINT_GET_ALL_USER_GET }                      from '../../domain/http/endpoints.api'
import { UserModel }                                      from '../../domain/http/user.dto'
import { TextAtom }                                       from './generic-atoms/Text.atom'
import { ViewAtom }                                       from './generic-atoms/View.atom'




export const UserListOrganism = (): ReactElement => {

  const [ users, setUsers ] = useState<UserModel[]>([])

  const submitCallback = useCallback(async () => {
    await defaultHTTPFetcher<UserModel[]>({
      config         : {
        url : ENDPOINT_GET_ALL_USER_GET(),
        mode: 'get'
      },
      successCallback: async (response) => {
        setUsers(response.data)
      },
      errorCallback  : async (e) => {
        e && setUsers([])
      }
    })

  }, [])

  useEffect(() => {
    void submitCallback()
  }, [ submitCallback ])


  const clickCallback = useCallback(async (data: string) => {
    await Clipboard.setStringAsync(data)
  }, [])

  return (
    <>
      <ViewAtom
        scrollable={true}
        style={{
          display   : 'flex',
          gap       : 15,
          alignItems: 'center',
          paddingTop: 50
        }}>

        <TextAtom>
          Users:
        </TextAtom>
        <ViewAtom
          style={{
            gap: 15
          }}>
          {users.map((user) => <Surface
            key={user.email}>
            <List.Item
              title={'username'}
              description={user.username}
              onPress={() => clickCallback(user.username)}
            />
            <List.Item
              title={'email'}
              description={user.email}
              onPress={() => clickCallback(user.email)}
            />
            <List.Item
              title={'name'}
              description={user.name}
              onPress={() => clickCallback(user.name ?? '')}
            />
            <List.Item
              title={'password'}
              description={user.password}
              onPress={() => clickCallback(user.password)}
            />
          </Surface>)}
        </ViewAtom>

      </ViewAtom>
    </>
  )
}