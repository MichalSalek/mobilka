import { ReactElement, useCallback, useState } from 'react'
import { Pressable }                           from 'react-native'
import { ENV_VARS }                            from '../../../application/environment/environment.api'
import { defaultHTTPFetcher }                  from '../../../application/http/http.api'
import { ENDPOINT_USER_CREATE }                from '../../../READONLY-shared-kernel/domain/http/http.endpoints'
import { REQUEST_DTO_API_V1_USER_CREATE }      from '../../../READONLY-shared-kernel/domain/models/user/user.dto'
import { generic_styles }                      from '../../styles/theme'
import { TextAtom }                            from '../generic-atoms/Text.atom'
import { TextInputAtom }                       from '../generic-atoms/TextInput.atom'
import { ViewAtom }                            from '../generic-atoms/View.atom'




export const RegisterOrganism = (): ReactElement => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')

  const [ message, setMessage ] = useState({})

  const submitCallback = useCallback(async () => {

    const payload: REQUEST_DTO_API_V1_USER_CREATE = {
      email,
      password,
      display_name: name
    }
    await defaultHTTPFetcher({
      config         : {
        url : ENDPOINT_USER_CREATE({ENV_VARS}),
        mode: 'post',
        payload
      },
      successCallback: async (response) => {
        setMessage(response.message ?? '')
      },
      errorCallback  : async (e) => {
        e && setMessage(e)
      }
    })

  }, [ email, password ])

  return (
    <ViewAtom
      style={{
        display   : 'flex',
        gap       : 15,
        alignItems: 'center',
        paddingTop: 50
      }}>
      <TextInputAtom
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"/>
      <TextInputAtom
        onChangeText={(text) => setName(text)}
        placeholder="Your display name"/>
      <TextInputAtom
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      />

      <TextAtom>{JSON.stringify(message, undefined, 2)}</TextAtom>

      <Pressable style={generic_styles.button} onPress={submitCallback}>
        <TextAtom style={generic_styles.text}>DO</TextAtom>
      </Pressable>

    </ViewAtom>
  )
}
