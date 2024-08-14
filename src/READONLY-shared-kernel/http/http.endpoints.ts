import { HTTP_PROTOCOL, HTTP_WEB1_APP_HOST } from './http.config'




type EndpointProps = {
  ENV_VARS: {
    readonly WEB_1_INTERNAL_NAME?: string | undefined,
    readonly WEB_2_INTERNAL_NAME?: string | undefined,
    readonly WEB_1_EXTERNAL_PORT?: string | undefined,
    readonly WEB_2_EXTERNAL_PORT?: string | undefined
  }
}

const API_ROUTES = {
  CHECK_WEBAPP_SIMPLE: '/api/dev-cheats/check-access/get',
  CHECK_WEBAPP_CROSS : '/api/dev-cheats/check-access/post',

  USER_CREATE     : '/api/v1/user/create',
  USER_LOGIN      : '/api/v1/user/login',
  USER_LOGOUT     : '/api/v1/user/logout',
  USER_DELETE     : '/api/v1/user/delete',
  USER_GET_ALL    : '/api/v1/user/get-all',
  USER_GET_CURRENT: '/api/v1/user/get-current',

  EVENT_LOG_GET_ALL: '/api/v1/event-log/get-all',

  SESSION_DELETE_SELF_ONLY: '/api/v1/session/delete-self',
  SESSION_DELETE_ALL      : '/api/v1/session/delete-all',
  SESSION_DELETE_SPECIFIC : '/api/v1/session/delete-specific',
  SESSION_GET_ALL         : '/api/v1/session/get-all',

  ACCOUNT_CREATE: '/api/v1/account/create'
}

// DEV CHEATS
//
// GET
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_SIMPLE}`
// POST
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_CROSS}`




// USER
//
export const ENDPOINT_USER_CREATE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_CREATE}`
export const ENDPOINT_USER_LOGIN = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_LOGIN}`
export const ENDPOINT_USER_LOGOUT = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_LOGOUT}`
export const ENDPOINT_USER_DELETE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_DELETE}`
export const ENDPOINT_USER_GET_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_GET_ALL}`
export const ENDPOINT_USER_GET_CURRENT = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.USER_GET_CURRENT}`

// EVENT LOG
//
export const ENDPOINT_EVENT_LOG_GET_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.EVENT_LOG_GET_ALL}`

// SESSION
//
export const ENDPOINT_SESSION_DELETE_SELF_ONLY = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_DELETE_SELF_ONLY}`
export const ENDPOINT_SESSION_DELETE_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_DELETE_ALL}`
export const ENDPOINT_SESSION_DELETE_SPECIFIC = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_DELETE_SPECIFIC}`
export const ENDPOINT_SESSION_GET_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_GET_ALL}`

// ACCOUNT
//
export const ENDPOINT_ACCOUNT_CREATE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.ACCOUNT_CREATE}`
