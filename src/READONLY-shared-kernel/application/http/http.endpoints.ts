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

  REGISTER_USER: '/api/v1/user/register/post',
  LOGIN_USER   : '/api/v1/user/login/post',
  DELETE_USER  : '/api/v1/user/delete/post',
  GET_ALL_USERS: '/api/v1/user/get-all/get'
}



// DEV CHEATS
//
// GET
export const ENDPOINT_CHECK_WEBAPP_SIMPLE = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_SIMPLE}`
// POST
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string) => `${HTTP_PROTOCOL}${appName}${API_ROUTES.CHECK_WEBAPP_CROSS}`




// USER
//
export const ENDPOINT_REGISTER_USER_POST = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.REGISTER_USER}`
export const ENDPOINT_LOGIN_USER_POST = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.LOGIN_USER}`
export const ENDPOINT_DELETE_USER_POST = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.DELETE_USER}`
export const ENDPOINT_GET_ALL_USER_GET = (props: EndpointProps) => `${HTTP_PROTOCOL}${HTTP_WEB1_APP_HOST}:${props.ENV_VARS.WEB_1_EXTERNAL_PORT}${API_ROUTES.GET_ALL_USERS}`

