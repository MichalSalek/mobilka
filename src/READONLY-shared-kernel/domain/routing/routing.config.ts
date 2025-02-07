import { API_VER } from '../http/http.config'




export const ROUTES_FRONT_STATIC = Object.freeze({
  HOME            : '/',
  PRICING         : '/pricing',
  USER_LOG        : '/user/login',
  USER_REG        : '/user/register/identifier',
  USER_REG_PASS   : '/user/register/password',
  CONNECTION_CHECK: '/connection-check'
} as const)

export const ROUTES_FRONT_APP = Object.freeze({
  APP             : '/app',
  ADMIN           : '/app/admin',
  USER_DEL_SELF   : '/app/user/delete-self',
  USER_ACCOUNT    : '/app/user/account',
  USER_ACCOUNT_PAY: '/app/user/account/pay'
} as const)

export const ROUTES_FRONT = Object.freeze({...ROUTES_FRONT_STATIC, ...ROUTES_FRONT_APP} as const)




export const ROUTES_API = Object.freeze({
  CHECK_WEBAPP_SIMPLE      : `${API_VER}admin/check-access/get`,
  CHECK_WEBAPP_CROSS       : `${API_VER}admin/check-access/post`,
  SWITCH_BACKEND_DEBUG_MODE: `${API_VER}admin/debug-mode`,
  BECOME_USER              : `${API_VER}admin/become-user`,
  SWITCH_BACK_BECOME_USER  : `${API_VER}admin/switch-back-become-user`,
  USER_DELETE_ANY          : `${API_VER}admin/user/delete/any`,
  USER_DISABLE_ANY         : `${API_VER}admin/user/disable/any`,
  USER_ENABLE_ANY          : `${API_VER}admin/user/enable/any`,
  GET_NOTES                : `${API_VER}admin/get-notes`,
  SAVE_NOTE                : `${API_VER}admin/save-note`,
  SET_MAIN_NOTE            : `${API_VER}admin/set-main-note`,
  MASTER_ADMIN_INIT        : `${API_VER}admin/master-admin-init`,

  USER_REGISTER      : `${API_VER}user/register`,
  CHECK_EMAIL        : `${API_VER}user/check-email`,
  USER_CREATE        : `${API_VER}user/create`,
  USER_LOGIN         : `${API_VER}user/login`,
  USER_LOGOUT        : `${API_VER}user/logout`,
  USER_DELETE_EXACTLY: `${API_VER}user/delete/exactly`,
  USER_DELETE_SELF   : `${API_VER}user/delete/self`,
  USER_DISABLE_SELF  : `${API_VER}user/disable/self`,
  USER_GET_ALL       : `${API_VER}user/get-all`,

  EVENT_LOG_GET_ALL: `${API_VER}event-log/get-all`,

  SESSION_DELETE_ALL    : `${API_VER}session/delete/all`,
  SESSION_DELETE_EXACTLY: `${API_VER}session/delete/exactly`,
  SESSION_GET_ALL       : `${API_VER}session/get-all`,
  SESSION_REFRESH       : `${API_VER}session/refresh`,
  SESSION_GET_CURRENT   : `${API_VER}session/get-current`,

  ACCOUNT_DISPLAY_NAME_CHANGE: `${API_VER}account/display-name-change`,
  ACCOUNT_PAYMENT_MAKE       : `${API_VER}account/payment-make`,
  ACCOUNT_PAYMENT_GET_STATUS : `${API_VER}account/payment-get-status`
} as const)




export const REDIRECTIONS_ON_EVENTS = Object.freeze({
  ALREADY_LOGGED            : ROUTES_FRONT.APP,
  USER_LOGGED_IN            : ROUTES_FRONT.APP,
  USER_ENABLED_SELF         : ROUTES_FRONT.APP,
  USER_DISABLED_SELF        : ROUTES_FRONT.HOME,
  USER_LOGGED_OUT           : ROUTES_FRONT.HOME,
  SESSION_EXPIRED           : ROUTES_FRONT.HOME,
  USER_DELETED_SELF         : ROUTES_FRONT.HOME,
  UNAUTHORIZED              : ROUTES_FRONT.USER_LOG,
  LOGIN_FIRST               : ROUTES_FRONT.USER_LOG,
  USER_SWITCHED_BACK_TO_SELF: ROUTES_FRONT.ADMIN
} as const)

