import { SERVER_MESSAGES_GENERIC } from '../../application/http/http.config'




export const SERVER_MESSAGES = [
  ...SERVER_MESSAGES_GENERIC,

  'ALREADY_LOGGED',
  'UNAUTHORIZED',

  'USER_DELETED',
  'CANNOT_DELETE_USER',

  'USER_CREATED',
  'CANNOT_CREATE_USER',

  'USER_LOGGED_IN',
  'CANNOT_LOGIN'

] as const

export type SERVER_MESSAGES_TYPE = typeof SERVER_MESSAGES[number]
