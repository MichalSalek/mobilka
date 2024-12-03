import { NextRouter }                                                                                       from 'next/router'
import { EVENT_INFO_TYPE }                                                                                  from '../cqrs/events.types'
import { UserNoSensitiveWithRelations }                                                                     from '../models/user/user.types'
import { ROUTES_API, ROUTES_API_NAME, ROUTES_API_PATH, ROUTES_FRONT, ROUTES_FRONT_NAME, ROUTES_FRONT_PATH } from '../routing/routing.config'
import { PERMISSIONS_POLICY }                                                                               from './permissions.policy'




export type ROUTING_POLICY_TYPE = {

  redirectionsOnEventsRules: Record<EVENT_INFO_TYPE | string, (
    event: EVENT_INFO_TYPE | undefined | null,
    currentUser: UserNoSensitiveWithRelations | null | undefined,
    currentPathname: ROUTES_FRONT_PATH,
    action: (route: ROUTES_FRONT_PATH) => void) => void>

  utils: {
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event: EVENT_INFO_TYPE | undefined | null) => boolean
    GET_ROUTE_FRONT: (route: ROUTES_FRONT_NAME) => ROUTES_FRONT_PATH
    GET_ROUTE_API: (route: ROUTES_API_NAME) => ROUTES_API_PATH
    IS_REDIRECTION_NEEDED: (redirectionRoutePath: ROUTES_FRONT_PATH, currentPathname?: ROUTES_FRONT_PATH) => boolean
    REDIRECT_BY_NEXT_ROUTER: (route: ROUTES_FRONT_PATH, router: NextRouter, searchParams?: Record<string, string> | null) => {
      willBeRedirect: boolean,
      redirectAction: () => void
    }
  }
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  redirectionsOnEventsRules: {
    ALREADY_LOGGED : (event, currentUser, currentPathname, action) => {
      if (event === 'ALREADY_LOGGED' && !PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
        currentUser?.role,
        currentPathname)) {
        action(ROUTES_FRONT.APP)
      }
    },
    USER_LOGGED_IN : (event, currentUser, currentPathname, action) => {
      if (event === 'USER_LOGGED_IN') {
        action(ROUTES_FRONT.APP)
      }
    },

    USER_ENABLED_SELF: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_ENABLED_SELF') {
        action(ROUTES_FRONT.APP)
      }
    },

    USER_DISABLED_SELF: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_DISABLED_SELF') {
        action(ROUTES_FRONT.HOME)
      }
    },

    USER_LOGGED_OUT: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_LOGGED_OUT') {
        action(ROUTES_FRONT.HOME)
      }
    },

    SESSION_EXPIRED  : (event, currentUser, currentPathname, action) => {
      if (event === 'SESSION_EXPIRED') {
        action(ROUTES_FRONT.HOME)
      }
    },
    USER_DELETED_SELF: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_DELETED_SELF') {
        action(ROUTES_FRONT.HOME)
      }
    },
    UNAUTHORIZED     : (event, currentUser, currentPathname, action) => {
      if (event === 'UNAUTHORIZED') {
        action(ROUTES_FRONT.USER_LOG)
      }
    },
    PAYMENT_DONE     : (event, currentUser, currentPathname, action) => {
      if (event === 'PAYMENT_DONE') {
        action(ROUTES_FRONT.USER_ACCOUNT)
      }
    }
  } as const,

  utils: {

    GET_ROUTE_FRONT: (route) => {
      return ROUTES_FRONT[route]
    },
    GET_ROUTE_API  : (route) => {
      return ROUTES_API[route]
    },

    IS_REDIRECTION_NEEDED: (redirectionRoutePath, currentPathname) => (
      currentPathname
      ? currentPathname
      : location.pathname) !== redirectionRoutePath,


    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event) => {
      return Object.keys(ROUTING_POLICY.redirectionsOnEventsRules ?? {})
                   .includes(event ?? '')
    },
    REDIRECT_BY_NEXT_ROUTER               : (route, router, searchParams) => {
      const willBeRedirect = ROUTING_POLICY.utils.IS_REDIRECTION_NEEDED(route)
      let searchParamsString = location?.search ?? ''
      if (typeof searchParams === 'object' && !!searchParams) {
        searchParamsString +=
          searchParamsString
          ? '&'
          : '?'
        Object.keys(searchParams)
              .forEach((key) => {
                const value = searchParams[key]
                searchParamsString += `${key}=${value}&`
              })
        if (searchParamsString[searchParamsString.length - 1] === '&') {
          searchParamsString = searchParamsString.slice(
            0,
            -1) // Remove & char on the end.
        }
      }
      const redirectAction = (
        () => {
          if (searchParams === null) {
            searchParamsString = ''
          }
          return willBeRedirect
                 ? (
                   () => {
                     router.replace(route + searchParamsString)
                   })()
                 : () => {}
        })
      return {
        willBeRedirect,
        redirectAction
      }
    }
  }

} as const
