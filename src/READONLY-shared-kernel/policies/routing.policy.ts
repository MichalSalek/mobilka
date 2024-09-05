import { NextRouter }                 from 'next/router'
import { ALL_ROLES_COLLECTION, Role } from '../models/models'




export enum ROUTES {
  HOME = '/',
  PRICING = '/pricing',
  APP = '/app',
  USER_DEL = '/user/delete',
  USER_LOG = '/user/login',
  USER_REG = '/user/register',
  USER_ACCOUNT = '/user/account'
}




export type ROUTING_POLICY_TYPE = {
  permissions: { [K in ROUTES]: Role[] }
  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role: Role | undefined, requestedRoute: ROUTES) => boolean
    GET_ROUTE: (route: ROUTES) => ROUTES
    IS_REDIRECTION_NEEDED: (redirectionRoute: string, currentPathname?: string) => boolean
    REDIRECT_BY_LOCATION: (route: ROUTES) => boolean
    REDIRECT_BY_NEXT_ROUTER: (route: ROUTES, router: NextRouter, searchParams?: Record<string, string>) => Promise<any>
  }
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

  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role = Role.NOT_LOGGED_IN, requestedRoute) =>
      // Role array of requested event is empty
      // OR
      // Role is included in requested event permission array.
      Boolean(
        ROUTING_POLICY.permissions[requestedRoute]?.length === 0
        ||
        ROUTING_POLICY.permissions[requestedRoute]?.includes(role as Role)
      ),

    GET_ROUTE: (route) => route,

    IS_REDIRECTION_NEEDED: (redirectionRoute, currentPathname) =>
      (currentPathname ? currentPathname : location.pathname) !== redirectionRoute,

    REDIRECT_BY_LOCATION: (route) => {
      if (ROUTING_POLICY.utils.IS_REDIRECTION_NEEDED(route)) {
        location.replace(location.origin + route + location.search)
        return true
      }
      return false
    },

    REDIRECT_BY_NEXT_ROUTER: (route, router, searchParams) => {
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
      if (ROUTING_POLICY.utils.IS_REDIRECTION_NEEDED(route)) {
        return router.replace(route + searchParamsString)
      }
      return new Promise(() => void undefined)
    }
  }

} as const

