import {SERVER_MESSAGES_GENERIC} from '../../application/http/http.config'


export const HTTP_PROTOCOL = 'http://' as const

export const HTTP_WEB1_APP_HOST = '192.168.1.28' as const

export type HTTPMethod = 'post' | 'get'

export type HTTPStatus = 200 | 201 | 302 | 400 | 401 | 404 | 405 | 406 | 500 | 503

export const SERVER_MESSAGES = [...SERVER_MESSAGES_GENERIC,
  'USER_DELETED',
  'CANNOT_DELETE_USER',

  'USER_CREATED',
  'CANNOT_CREATE_USER',

  'USER_LOGGED_IN',
  'CANNOT_LOGIN'

] as const
