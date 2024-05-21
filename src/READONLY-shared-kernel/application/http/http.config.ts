export const HTTP_PROTOCOL = 'http://' as const

export const HTTP_WEB1_APP_HOST = '192.168.1.28' as const

export type HTTPMethod = 'post' | 'get'

export type HTTPStatus = 200 | 201 | 302 | 400 | 401 | 404 | 405 | 406 | 500 | 503

export const SERVER_MESSAGES = [
  'GENERAL_ERROR',
  'NOT_FOUND',
  'CANNOT_DELETE_USER',
  'CANNOT_CREATE_USER',
  'CANNOT_LOGIN',

  'SUCCESS',
  'USER_CREATED'

] as const
