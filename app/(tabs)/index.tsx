import { useCallback, useRef, useState } from 'react'
import { Button, Pressable, StyleSheet } from 'react-native'
import { defaultHTTPFetcher }                                            from '../../src/application/http/http.api'
import { ENDPOINT_LOGIN_USER_POST } from '../../src/domain/http/endpoints.api'
import { REQUEST_DTO_API_V1_USER_LOGIN, RESPONSE_DTO_API_V1_USER_LOGIN } from '../../src/domain/http/user.dto'
import { TextAtom }                                                      from '../../src/UI/components/atoms/Text.atom'
import { TextInputAtom }                 from '../../src/UI/components/atoms/TextInput.atom'
import { ViewAtom }                      from '../../src/UI/components/atoms/View.atom'




export default function screen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})

  const submitCallback = useCallback(async () => {

    const payload: REQUEST_DTO_API_V1_USER_LOGIN = {
      data: {
        email,
        password
      }
    }
    await defaultHTTPFetcher<REQUEST_DTO_API_V1_USER_LOGIN, RESPONSE_DTO_API_V1_USER_LOGIN>({
      config         : {
        url : ENDPOINT_LOGIN_USER_POST(),
        mode: 'post',
        payload
      },
      successCallback: async () => {
        setErrors('OK')
      },
      errorCallback  : async (e) => {
        e && setErrors(e)
      }
    })

  }, [email, password])

  return (
    <ViewAtom style={styles.container}>
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
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={false}
          placeholder="Password"
        />

        <TextAtom>{JSON.stringify(errors, undefined, 2)}</TextAtom>

        <Pressable style={styles.button} onPress={submitCallback}>
          <TextAtom style={styles.text}>DO</TextAtom>
        </Pressable>

      </ViewAtom>
    </ViewAtom>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems    : 'center',
    // justifyContent: 'center'
  },
  title    : {
    fontSize  : 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height        : 1,
    width         : '80%'
  },
  button   : {
    alignItems       : 'center',
    justifyContent   : 'center',
    paddingVertical  : 12,
    paddingHorizontal: 32,
    borderRadius     : 4,
    elevation        : 3,
    backgroundColor  : 'black',
    width: '25%'
  },
  text     : {
    fontSize     : 16,
    lineHeight   : 21,
    fontWeight   : 'bold',
    letterSpacing: 0.25,
    color        : 'white'
  }
})
