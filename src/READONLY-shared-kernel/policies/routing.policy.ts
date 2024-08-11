import { NextRouter }                                  from 'next/router'
import { ALL_ROLES_COLLECTION, Role, UserNoSensitive } from '../models/models'




export enum ROUTES {
  HOME = '/',
  PRICING = '/pricing',
  APP = '/app',
  USER_DEL = '/user/delete',
  USER_LOG = '/user/login',
  USER_REG = '/user/register',
  USER_ACCOUNT = '/user/account'
}




export type ROUTING_POLICY_RULES =
  'UNAUTHORIZED_FOR_ROLE' |
  'ALREADY_LOGGED_IN'


export type ROUTING_POLICY_TYPE = {
  permissions: { [K in ROUTES]: Role[] }
  rulesToHandle: Record<ROUTING_POLICY_RULES, (...args: any[]) => void>
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  permissions: {

    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    [ROUTES.HOME]        : [],
    [ROUTES.APP]         : ALL_ROLES_COLLECTION,
    [ROUTES.USER_DEL]    : ALL_ROLES_COLLECTION,
    [ROUTES.USER_LOG]    : [ Role.NOT_LOGGED_IN ],
    [ROUTES.USER_REG]    : [ Role.NOT_LOGGED_IN ],
    [ROUTES.USER_ACCOUNT]: ALL_ROLES_COLLECTION,
    [ROUTES.PRICING]     : []

  },

  rulesToHandle: {

    // Events fallback for specific handling in other places.
    // Needs to be special handled in the App.

    UNAUTHORIZED_FOR_ROLE: (currentUser: UserNoSensitive, currentPathname: ROUTES, action: () => void) => {
      if (!GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        // @TODO porobić debouncery na wszystkich action() (tu jak i w eventach)
        action()
      }
    },

    ALREADY_LOGGED_IN: (currentUser: UserNoSensitive, currentPathname: ROUTES, action: () => void) => {
      if (
        Boolean(currentUser)
        &&
        (
          currentPathname === '/user/register'
          || currentPathname === '/user/login'
          &&
         !GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)
        )) {

        //@TODO zostawić te logi w politykach, żeby dało się to łatwo debugować na jakiegoś cheata.

        console.log('GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)')
        console.log(GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname))
        console.log('currentPathname: ', currentPathname)
        action()
      }
    }
  }

} as const




export const GET_ROUTE = (route: ROUTES) => route



const IS_REDIRECTION_NEEDED = (redirectionRoute: string, currentPathname?: string): boolean =>
  (currentPathname ? currentPathname : location.pathname) !== redirectionRoute


export const GET_PERMISSION_APPROVAL_FOR_ROUTE = (role: Role | unknown, requestedRoute: ROUTES): boolean =>
  // Role array of requested event is empty
  // OR
  // Role is included in requested event permission array.
  Boolean(
    ROUTING_POLICY.permissions[requestedRoute]?.length === 0
    ||
    ROUTING_POLICY.permissions[requestedRoute]?.includes(role as Role)
  )


export const REDIRECT_BY_LOCATION = (route: ROUTES): boolean => {
  if (IS_REDIRECTION_NEEDED(route)) {
    location.replace(location.origin + route + location.search)
    return true
  }
  return false
}


export const REDIRECT_BY_NEXT_ROUTER = (route: ROUTES, router: NextRouter, searchParams?: Record<string, string>): boolean => {
  let searchParamsString = location.search
  if (typeof searchParams === 'object' && !!searchParams) {
    searchParamsString += searchParamsString ? '&' : '?'
    for (const key in searchParams) {
      const value = searchParams[key]
      searchParamsString += `${key}=${value}&`
    }
    if (searchParamsString[searchParamsString.length - 1] === '&') {
      searchParamsString = searchParamsString.slice(0, -1) // Remove & char on the end.
    }
  }
  if (IS_REDIRECTION_NEEDED(route)) {
    void router.replace(route + searchParamsString)
    return true
  }
  return false
}