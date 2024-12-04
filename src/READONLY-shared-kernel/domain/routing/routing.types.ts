import { ROUTES_API, ROUTES_FRONT } from './routing.config'




export type ROUTES_FRONT_NAME = keyof typeof ROUTES_FRONT
export type ROUTES_FRONT_PATH = typeof ROUTES_FRONT[ROUTES_FRONT_NAME]



export type ROUTES_API_NAME = keyof typeof ROUTES_API
export type ROUTES_API_PATH = typeof ROUTES_API[ROUTES_API_NAME]
