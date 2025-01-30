import { EVENT_COMMANDS_AND_QUERIES_TYPE }   from '../commands-and-queries/cqrs.types'
import { ROUTES_API }                        from '../routing/routing.config'




const URL = (props: EndpointProps) => `${props.ENV_VARS.HTTP_PROTOCOL}${props.ENV_VARS.HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}`


type EndpointProps = {
  ENV_VARS: {
    readonly HTTP_PROTOCOL: string,
    readonly HTTP_WEB1_APP_HOST: string,
    readonly WEB_1_EXTERNAL_PORT: string
  }
}

export type EndpointURLFunction = (props: EndpointProps) => string

//
// DEBUG
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (appName: string, props: EndpointProps) => `${props.ENV_VARS.HTTP_PROTOCOL}${appName}${ROUTES_API.CHECK_WEBAPP_SIMPLE}`
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string, props: EndpointProps) => `${props.ENV_VARS.HTTP_PROTOCOL}${appName}${ROUTES_API.CHECK_WEBAPP_CROSS}`


//@TODO zamiast eventsów, może kierować się ilością ROUTÓW API? - na razie jest ok, bo podpowiada po dodaniu eventu.
export const ENDPOINTS: Record<EVENT_COMMANDS_AND_QUERIES_TYPE, EndpointURLFunction> = {
  //
  // ADMIN
  SWITCH_BACKEND_DEBUG_MODE: (props) => `${URL(props)}${ROUTES_API.SWITCH_BACKEND_DEBUG_MODE}`,
  GET_NOTES                : (props) => `${URL(props)}${ROUTES_API.GET_NOTES}`,
  SET_NOTES                : (props) => `${URL(props)}${ROUTES_API.SET_NOTES}`,
  USER_DELETE_ANY          : (props) => `${URL(props)}${ROUTES_API.USER_DELETE_ANY}`,
  USER_DISABLE_ANY         : (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_ANY}`,
  USER_ENABLE_ANY          : (props) => `${URL(props)}${ROUTES_API.USER_ENABLE_ANY}`,
  BECOME_USER              : (props) => `${URL(props)}${ROUTES_API.BECOME_USER}`,
  SWITCH_BACK_BECOME_USER  : (props) => `${URL(props)}${ROUTES_API.SWITCH_BACK_BECOME_USER}`,
  MASTER_ADMIN_INIT        : (props) => `${URL(props)}${ROUTES_API.MASTER_ADMIN_INIT}`, //
  // ACCOUNT
  ACCOUNT_DISPLAY_NAME_CHANGE: (props) => `${URL(props)}${ROUTES_API.ACCOUNT_DISPLAY_NAME_CHANGE}`,
  ACCOUNT_PAYMENT_GET_STATUS : (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_GET_STATUS}`,
  ACCOUNT_PAYMENT_MAKE       : (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_MAKE}`, //
  // EVENT LOG
  EVENT_LOG_GET_ALL: (props) => `${URL(props)}${ROUTES_API.EVENT_LOG_GET_ALL}`, //
  // SESSION
  SESSION_GET_CURRENT   : (props) => `${URL(props)}${ROUTES_API.SESSION_GET_CURRENT}`,
  SESSION_DELETE_ALL    : (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_ALL}`,
  SESSION_DELETE_EXACTLY: (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_EXACTLY}`,
  SESSION_GET_ALL       : (props) => `${URL(props)}${ROUTES_API.SESSION_GET_ALL}`,
  SESSION_REFRESH       : (props) => `${URL(props)}${ROUTES_API.SESSION_REFRESH}`, //
  // USER
  USER_CREATE        : (props) => `${URL(props)}${ROUTES_API.USER_CREATE}`,
  CHECK_EMAIL        : (props) => `${URL(props)}${ROUTES_API.CHECK_EMAIL}`,
  USER_REGISTER      : (props) => `${URL(props)}${ROUTES_API.USER_REGISTER}`,
  USER_DELETE_EXACTLY: (props) => `${URL(props)}${ROUTES_API.USER_DELETE_EXACTLY}`,
  USER_DELETE_SELF   : (props) => `${URL(props)}${ROUTES_API.USER_DELETE_SELF}`,
  USER_GET_ALL       : (props) => `${URL(props)}${ROUTES_API.USER_GET_ALL}`,
  USER_LOGIN         : (props) => `${URL(props)}${ROUTES_API.USER_LOGIN}`,
  USER_LOGOUT        : (props) => `${URL(props)}${ROUTES_API.USER_LOGOUT}`,
  USER_DISABLE_SELF  : (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_SELF}`,
  USER_ENABLE_SELF   : (props) => ''

} as const
