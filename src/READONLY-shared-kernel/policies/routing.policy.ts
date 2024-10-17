import { NextRouter }                                                      from 'next/router'
import { EVENT_LOGS_TYPE }                                                 from '../cqrs/events.config'
import { ALL_LOGGED_ROLES_COLLECTION, Role, UserNoSensitiveWithRelations } from '../models/models'
import { ACCOUNT_POLICY }                                                  from './account.policy'
import { PRICING_POLICY }                                                  from './pricing.policy'




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
  redirectionsOnEventsRules: Record<EVENT_LOGS_TYPE | string, (event: EVENT_LOGS_TYPE | undefined | null, currentUser: UserNoSensitiveWithRelations | null | undefined, currentPathname: ROUTES, action: (route: ROUTES) => void) => void>
  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role: Role | undefined, requestedRoute: ROUTES) => boolean
    GET_ROUTE: (route: ROUTES) => ROUTES
    IS_REDIRECTION_NEEDED: (redirectionRoute: string, currentPathname?: string) => boolean
    REDIRECT_BY_LOCATION: (route: ROUTES) => { willBeRedirect: boolean, redirectAction: () => void }
    REDIRECT_BY_NEXT_ROUTER: (route: ROUTES, router: NextRouter, searchParams?: Record<string, string> | null) => { willBeRedirect: boolean, redirectAction: () => void }
  }
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  permissions: {

    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    [ROUTES.HOME]        : [],
    [ROUTES.APP]         : ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES.USER_DEL]    : ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES.USER_LOG]    : [ Role.NOT_LOGGED_IN ],
    [ROUTES.USER_REG]    : [ Role.NOT_LOGGED_IN ],
    [ROUTES.USER_ACCOUNT]: ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES.PRICING]     : []

  },

  redirectionsOnEventsRules: {
    ALREADY_LOGGED   : (event, currentUser, currentPathname, action) => {
      if (event === 'ALREADY_LOGGED' && !ROUTING_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action(ROUTES.APP)
      }
    },
    USER_CREATED     : (event, currentUser, currentPathname, action) => {
      if (event === 'USER_CREATED' && (PRICING_POLICY.utils.isSearchParamIncludesPricingPlan() || !ACCOUNT_POLICY.utils.IS_USER_HAS_ACTIVE_ACCOUNT(currentUser))) {
        action(ROUTES.USER_ACCOUNT)
      }
    },
    USER_LOGGED_IN   : (event, currentUser, currentPathname, action) => {
      if (event === 'USER_LOGGED_IN') {
        action(ROUTES.APP)
      }
    },
    USER_LOGGED_OUT  : (event, currentUser, currentPathname, action) => {
      if (event === 'USER_LOGGED_OUT') {
        action(ROUTES.HOME)
      }
    },
    SELF_USER_DELETED: (event, currentUser, currentPathname, action) => {
      if (event === 'SELF_USER_DELETED') {
        action(ROUTES.HOME)
      }
    },
    UNAUTHORIZED     : (event, currentUser, currentPathname, action) => {
      if (event === 'UNAUTHORIZED' && !ROUTING_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action(ROUTES.USER_LOG)
      }
    }
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
      const willBeRedirect = ROUTING_POLICY.utils.IS_REDIRECTION_NEEDED(route)
      const redirectAction = (() => {
        return willBeRedirect ? location.replace(location.origin + route + location.search) : () => {
        }
      })
      return {
        willBeRedirect,
        redirectAction
      }
    },

    REDIRECT_BY_NEXT_ROUTER: (route, router, searchParams) => {
      const willBeRedirect = ROUTING_POLICY.utils.IS_REDIRECTION_NEEDED(route)
      let searchParamsString = location?.search ?? ''
      if (typeof searchParams === 'object' && Boolean(searchParams)) {
        searchParamsString += searchParamsString ? '&' : '?'
        for (const key in searchParams) {
          const value = searchParams[key]
          searchParamsString += `${key}=${value}&`
        }
        if (searchParamsString[searchParamsString.length - 1] === '&') {
          searchParamsString = searchParamsString.slice(0, -1) // Remove & char on the end.
        }
      }
      const redirectAction = (() => {
        if (searchParams === null) {
          searchParamsString = ''
        }
        return willBeRedirect ? (() => {
          router.replace(route + searchParamsString)
            .catch()
        })() : () => {
        }
      })
      return {
        willBeRedirect,
        redirectAction
      }
    }
  }

} as const

