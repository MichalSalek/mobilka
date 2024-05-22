import { ReactElement, useCallback, useState } from 'react'
import { Pressable }                           from 'react-native'
import { ENV_VARS }                            from '../../../application/environment/environment.api'
import { defaultHTTPFetcher }                  from '../../../application/http/http.api'
import { ENDPOINT_REGISTER_USER_POST }         from '../../../READONLY-shared-kernel/application/http/http.endpoints'
import { REQUEST_DTO_API_V1_USER_REGISTER }    from '../../../READONLY-shared-kernel/domain/models/user.dto'
import { generic_styles }                      from '../../styles/theme'
import { TextAtom }                            from '../generic-atoms/Text.atom'
import { TextInputAtom }                       from '../generic-atoms/TextInput.atom'
import { ViewAtom }                            from '../generic-atoms/View.atom'




export const RegisterOrganism = (): ReactElement => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')

  const [ errors, setErrors ] = useState({})

  const submitCallback = useCallback(async () => {

    const payload: REQUEST_DTO_API_V1_USER_REGISTER = {
      email,
      password,
      display_name: name
    }
    await defaultHTTPFetcher({
      config         : {
        url : ENDPOINT_REGISTER_USER_POST({ENV_VARS}),
        mode: 'post',
        payload
      },
      successCallback: async (response) => {
        console.log(response)
        setErrors('OK')
      },
      errorCallback  : async (e) => {
        e && setErrors(e)
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

      <TextAtom>{JSON.stringify(errors, undefined, 2)}</TextAtom>

      <Pressable style={generic_styles.button} onPress={submitCallback}>
        <TextAtom style={generic_styles.text}>DO</TextAtom>
      </Pressable>

    </ViewAtom>
  )
}
