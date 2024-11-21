import { API_VER } from '../http/http.config'




export const ROUTES_FRONT = Object.freeze({
  HOME        : '/',
  PRICING     : '/pricing',
  APP         : '/app',
  USER_DEL    : '/user/delete',
  USER_LOG    : '/user/login',
  USER_REG    : '/user/register',
  USER_ACCOUNT: '/user/account'
} as const)


export type ROUTES_FRONT_NAME = keyof typeof ROUTES_FRONT
export type ROUTES_FRONT_PATH = typeof ROUTES_FRONT[ROUTES_FRONT_NAME]



export const ROUTES_API = Object.freeze({
  CHECK_WEBAPP_SIMPLE      : '/api/dev-cheats/check-access/get',
  CHECK_WEBAPP_CROSS       : '/api/dev-cheats/check-access/post',
  SWITCH_BACKEND_DEBUG_MODE: '/api/dev-cheats/debug-mode',

  USER_REGISTER      : `${API_VER}user/register`,
  USER_CREATE        : `${API_VER}user/create`,
  USER_LOGIN         : `${API_VER}user/login`,
  USER_LOGOUT        : `${API_VER}user/logout`,
  USER_DELETE_ANY    : `${API_VER}user/delete/any`,
  USER_DELETE_EXACTLY: `${API_VER}user/delete/exactly`,
  USER_DELETE_SELF   : `${API_VER}user/delete/self`,
  USER_GET_ALL       : `${API_VER}user/get-all`,
  USER_GET_CURRENT   : `${API_VER}user/get-current`,

  EVENT_LOG_GET_ALL: `${API_VER}event-log/get-all`,

  SESSION_DELETE_ALL    : `${API_VER}session/delete/all`,
  SESSION_DELETE_EXACTLY: `${API_VER}session/delete/exactly`,
  SESSION_GET_ALL       : `${API_VER}session/get-all`,
  SESSION_REFRESH       : `${API_VER}session/refresh`,
  SESSION_CHECK         : `${API_VER}session/check`,

  ACCOUNT_DISPLAY_NAME_CHANGE: `${API_VER}account/display-name-change`,
  ACCOUNT_PAYMENT_MAKE       : `${API_VER}account/payment-make`,
  ACCOUNT_PAYMENT_GET_STATUS : `${API_VER}account/payment-get-status`
} as const)

export type ROUTES_API_NAME = keyof typeof ROUTES_API
export type ROUTES_API_PATH = typeof ROUTES_API[ROUTES_API_NAME]
