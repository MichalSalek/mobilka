import { User, UserClientSafe } from './models'



// LOGIN
//
export type REQUEST_DTO_API_V1_USER_LOGIN_EXTRA_DATA = {
  client_ip: string | undefined,
  language: string | undefined,
  userAgent: string | undefined
}
export type REQUEST_DTO_API_V1_USER_LOGIN = Pick<User, 'password' | 'email'> & REQUEST_DTO_API_V1_USER_LOGIN_EXTRA_DATA

// REGISTER
//
export type REQUEST_DTO_API_V1_USER_CREATE = Pick<User, 'email' | 'password' | 'display_name'>

// DELETE
//
export type REQUEST_DTO_API_V1_USER_DELETE = Pick<User, 'password' | 'email'>

// GET LL
//
export type RESPONSE_DTO_API_V1_USER_GET_ALL = UserClientSafe[]

// GET CURRENT
//
export type RESPONSE_DTO_API_V1_USER_GET_CURRENT = UserClientSafe
