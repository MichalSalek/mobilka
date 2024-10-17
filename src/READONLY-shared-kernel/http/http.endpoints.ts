import { API_VER, HTTP_PROTOCOL, HTTP_WEB1_APP_HOST } from './http.config'




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
  DEBUG_MODE         : '/api/dev-cheats/debug-mode',

  USER_CREATE     : `${API_VER}user/create`,
  USER_LOGIN      : `${API_VER}user/login`,
  USER_LOGOUT     : `${API_VER}user/logout`,
  USER_DELETE     : `${API_VER}user/delete`,
  USER_GET_ALL    : `${API_VER}user/get-all`,
  USER_GET_CURRENT: `${API_VER}user/get-current`,

  EVENT_LOG_GET_ALL: `${API_VER}event-log/get-all`,

  SESSION_DELETE_ALL     : `${API_VER}session/delete-all`,
  SESSION_DELETE_SPECIFIC: `${API_VER}session/delete-specific`,
  SESSION_GET_ALL        : `${API_VER}session/get-all`,
  SESSION_REFRESH        : `${API_VER}session/refresh`,

  ACCOUNT_DISPLAY_NAME_CHANGE: `${API_VER}account/display-name-change`,
  ACCOUNT_PAYMENT_MAKE       : `${API_VER}account/payment-make`,
  ACCOUNT_PAYMENT_GET_STATUS : `${API_VER}account/payment-get-status`
}

// DEV CHEATS
//
// GET
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_SIMPLE}`
// POST
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_CROSS}`
// GET
export const ENDPOINT_DEBUG_MODE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.DEBUG_MODE}`



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
export const ENDPOINT_SESSION_DELETE_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_DELETE_ALL}`
export const ENDPOINT_SESSION_DELETE_SPECIFIC = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_DELETE_SPECIFIC}`
export const ENDPOINT_SESSION_GET_ALL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_GET_ALL}`
export const ENDPOINT_SESSION_REFRESH = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.SESSION_REFRESH}`

// ACCOUNT
//
export const ENDPOINT_ACCOUNT_DISPLAY_NAME_CHANGE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.ACCOUNT_DISPLAY_NAME_CHANGE}`
export const ENDPOINT_ACCOUNT_PAYMENT_MAKE = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.ACCOUNT_PAYMENT_MAKE}`
export const ENDPOINT_ACCOUNT_PAYMENT_GET_STATUS = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.ACCOUNT_PAYMENT_GET_STATUS}`
