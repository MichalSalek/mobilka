import * as Clipboard                                     from 'expo-clipboard'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { List, Surface }                                  from 'react-native-paper'
import { ENV_VARS }                                       from '../../application/environment/environment.api'
import { defaultHTTPFetcher }                             from '../../application/http/http.api'
import { ENDPOINT_USER_GET_ALL }                      from '../../READONLY-shared-kernel/application/http/http.endpoints'
import { User }                                           from '../../READONLY-shared-kernel/domain/models/models'
import { RESPONSE_DTO_API_V1_USER_GET_ALL }               from '../../READONLY-shared-kernel/domain/models/user.dto'
import { TextAtom }                                       from './generic-atoms/Text.atom'
import { ViewAtom }                                       from './generic-atoms/View.atom'




export const UserListOrganism = (): ReactElement => {

  const [ users, setUsers ] = useState<User[]>([])

  const submitCallback = useCallback(async () => {
    await defaultHTTPFetcher<RESPONSE_DTO_API_V1_USER_GET_ALL>({
      config         : {
        url : ENDPOINT_USER_GET_ALL({ENV_VARS}),
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
              title={'email'}
              description={user.email}
              onPress={() => clickCallback(user.email)}
            />
            <List.Item
              title={'name'}
              description={user.display_name}
              onPress={() => clickCallback(user.display_name ?? '')}
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