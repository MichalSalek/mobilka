import { EVENT_COMMANDS_AND_QUERIES_TYPE }   from '../commands-and-queries/cqrs.types'
import { ROUTES_API }                        from '../routing/routing.config'
import { HTTP_PROTOCOL, HTTP_WEB1_APP_HOST } from './http.config'




const URL = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}`


type EndpointProps = {
  ENV_VARS: {
    readonly WEB_1_INTERNAL_NAME?: string | undefined,
    readonly WEB_2_INTERNAL_NAME?: string | undefined,
    readonly WEB_1_EXTERNAL_PORT?: string | undefined,
    readonly WEB_2_EXTERNAL_PORT?: string | undefined
  }
}


//
// DEBUG
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (appName: string) => `${HTTP_PROTOCOL}${appName}/api/dev-cheats/check-access/get`
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string) => `${HTTP_PROTOCOL}${appName}/api/dev-cheats/check-access/post`


//@TODO zamiast eventsów, może kierować się ilością ROUTÓW API?
export const ENDPOINTS: Record<EVENT_COMMANDS_AND_QUERIES_TYPE, (props: EndpointProps) => string> = {
  //
  // ADMIN
  SWITCH_BACKEND_DEBUG_MODE: (props) => `${URL(props)}${ROUTES_API.SWITCH_BACKEND_DEBUG_MODE}`, //
  // ACCOUNT
  ACCOUNT_DISPLAY_NAME_CHANGE: (props) => `${URL(props)}${ROUTES_API.ACCOUNT_DISPLAY_NAME_CHANGE}`,
  ACCOUNT_PAYMENT_GET_STATUS : (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_GET_STATUS}`,
  ACCOUNT_PAYMENT_MAKE       : (props) => `${URL(props)}${ROUTES_API.ACCOUNT_PAYMENT_MAKE}`, // EVENT LOG
  EVENT_LOG_GET_ALL          : (props) => `${URL(props)}${ROUTES_API.EVENT_LOG_GET_ALL}`, //
  // SESSION
  SESSION_CHECK         : (props) => `${URL(props)}${ROUTES_API.SESSION_CHECK}`,
  SESSION_DELETE_ALL    : (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_ALL}`,
  SESSION_DELETE_EXACTLY: (props) => `${URL(props)}${ROUTES_API.SESSION_DELETE_EXACTLY}`,
  SESSION_GET_ALL       : (props) => `${URL(props)}${ROUTES_API.SESSION_GET_ALL}`,
  SESSION_REFRESH       : (props) => `${URL(props)}${ROUTES_API.SESSION_REFRESH}`, //
  // USER
  USER_CREATE            : (props) => `${URL(props)}${ROUTES_API.USER_CREATE}`,
  CHECK_EMAIL            : (props) => `${URL(props)}${ROUTES_API.CHECK_EMAIL}`,
  USER_REGISTER          : (props) => `${URL(props)}${ROUTES_API.USER_REGISTER}`,
  USER_DELETE_ANY        : (props) => `${URL(props)}${ROUTES_API.USER_DELETE_ANY}`,
  USER_DELETE_EXACTLY    : (props) => `${URL(props)}${ROUTES_API.USER_DELETE_EXACTLY}`,
  USER_DELETE_SELF       : (props) => `${URL(props)}${ROUTES_API.USER_DELETE_SELF}`,
  USER_GET_ALL           : (props) => `${URL(props)}${ROUTES_API.USER_GET_ALL}`,
  USER_GET_CURRENT       : (props) => `${URL(props)}${ROUTES_API.USER_GET_CURRENT}`,
  USER_LOGIN             : (props) => `${URL(props)}${ROUTES_API.USER_LOGIN}`,
  USER_LOGOUT            : (props) => `${URL(props)}${ROUTES_API.USER_LOGOUT}`,
  USER_DISABLE_ANY       : (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_ANY}`,
  USER_DISABLE_SELF      : (props) => `${URL(props)}${ROUTES_API.USER_DISABLE_SELF}`,
  USER_ENABLE_ANY        : (props) => `${URL(props)}${ROUTES_API.USER_ENABLE_ANY}`,
  USER_ENABLE_SELF       : (props) => '',
  BECOME_USER            : (props) => `${URL(props)}${ROUTES_API.BECOME_USER}`,
  SWITCH_BACK_BECOME_USER: (props) => `${URL(props)}${ROUTES_API.SWITCH_BACK_BECOME_USER}`

} as const
