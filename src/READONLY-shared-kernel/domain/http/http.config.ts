export const HTTP_PROTOCOL = 'http://' as const  //@todo takie rzeczy tylko wstrzykiwane przez env variables

export const HTTP_WEB1_APP_HOST = '192.168.1.28' as const //@todo takie rzeczy tylko wstrzykiwane przez env variables

export type HTTPMethod = 'post' | 'get'

export type HTTPStatus = 200 | 201 | 400 | 401 | 402 | 404 | 405 | 406 | 500 | 503

export const API_VER = '/api/v1/'

export const CUSTOM_HEADERS = {
  authorization: 'authorization',
  userMetadata : 'user-metadata',
  becomeUser   : 'become-user'
} as const

