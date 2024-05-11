import { ENV_VARS }                 from '../../application/environment/environment.api'
import { HTTP_HOST, HTTP_PROTOCOL } from './http.config'

//
// DEV CHEATS
//
// GET
export const ENDPOINT_CHECK_WEBAPP_SIMPLY = (appName: string) => `${HTTP_PROTOCOL}${appName}/api/dev-cheats/check-access/get`
// POST
export const ENDPOINT_CHECK_WEBAPP_CROSS = (appName: string) => `${HTTP_PROTOCOL}${appName}/api/dev-cheats/check-access/post`



//
// USER
//
export const ENDPOINT_REGISTER_USER_POST = () => `${HTTP_PROTOCOL}${HTTP_HOST}:${ENV_VARS.WEB_1_EXTERNAL_PORT}/api/v1/user/register/post`
export const ENDPOINT_LOGIN_USER_POST = () => `${HTTP_PROTOCOL}${HTTP_HOST}:3101/api/v1/user/login/post`
export const ENDPOINT_DELETE_USER_POST = () => `${HTTP_PROTOCOL}${HTTP_HOST}:${ENV_VARS.WEB_1_EXTERNAL_PORT}/api/v1/user/delete/post`
export const ENDPOINT_GET_ALL_USER_GET = () => `${HTTP_PROTOCOL}${HTTP_HOST}:${ENV_VARS.WEB_1_EXTERNAL_PORT}/api/v1/user/get-all/get`
