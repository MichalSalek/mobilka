import { API_VER } from '../http/http.config'




export const ROUTES_FRONT_STATIC = Object.freeze({
  HOME         : '/',
  PRICING      : '/pricing',
  USER_LOG     : '/user/login',
  USER_REG     : '/user/register/identifier',
  USER_REG_PASS: '/user/register/password'
} as const)

export const ROUTES_FRONT_APP = Object.freeze({
  APP             : '/app',
  ADMIN           : '/app/admin',
  USER_DEL_SELF   : '/app/user/delete-self',
  USER_ACCOUNT    : '/app/user/account',
  USER_ACCOUNT_PAY: '/app/user/account/pay'
} as const)

export const ROUTES_FRONT = Object.freeze({...ROUTES_FRONT_STATIC, ...ROUTES_FRONT_APP} as const)

export type ROUTES_FRONT_NAME = keyof typeof ROUTES_FRONT
export type ROUTES_FRONT_PATH = typeof ROUTES_FRONT[ROUTES_FRONT_NAME]




export const ROUTES_API = Object.freeze({
  CHECK_WEBAPP_SIMPLE      : '/api/dev-cheats/check-access/get',
  CHECK_WEBAPP_CROSS       : '/api/dev-cheats/check-access/post',
  SWITCH_BACKEND_DEBUG_MODE: '/api/dev-cheats/debug-mode',
  BECOME_USER              : '/api/dev-cheats/become-user',
  SWITCH_BACK_BECOME_USER  : '/api/dev-cheats/switch-back-become-user',

  USER_REGISTER      : `${API_VER}user/register`,
  CHECK_EMAIL        : `${API_VER}user/check-email`,
  USER_CREATE        : `${API_VER}user/create`,
  USER_LOGIN         : `${API_VER}user/login`,
  USER_LOGOUT        : `${API_VER}user/logout`,
  USER_DELETE_ANY    : `${API_VER}user/delete/any`,
  USER_DELETE_EXACTLY: `${API_VER}user/delete/exactly`,
  USER_DELETE_SELF   : `${API_VER}user/delete/self`,
  USER_DISABLE_ANY   : `${API_VER}user/disable/any`,
  USER_DISABLE_SELF  : `${API_VER}user/disable/self`,
  USER_ENABLE_ANY    : `${API_VER}user/enable/any`,
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
