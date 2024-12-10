import { NextRouter }                                                                                                                                                  from 'next/router'
import { EVENT_INFO_TYPE }                                                                                                                                             from '../domain/commands-and-queries/cqrs.types'
import { REDIRECTIONS_ON_EVENTS, ROUTES_API, ROUTES_FRONT, ROUTES_FRONT_APP, ROUTES_FRONT_STATIC }                                                                     from '../domain/routing/routing.config'
import { RedirectionHandler, REDIRECTIONS_ON_EVENTS_TYPE, ROUTES_API_NAME, ROUTES_API_PATH, ROUTES_API_TYPE, ROUTES_FRONT_NAME, ROUTES_FRONT_PATH, ROUTES_FRONT_TYPE } from '../domain/routing/routing.types'
import { PERMISSIONS_POLICY }                                                                                                                                          from './permissions.policy'




export type ROUTING_POLICY_TYPE = {

  redirectionsSwitch: RedirectionHandler
  routesFront: ROUTES_FRONT_TYPE
  routesApi: ROUTES_API_TYPE
  redirectionsOnEvents: REDIRECTIONS_ON_EVENTS_TYPE


  utils: {
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event: EVENT_INFO_TYPE | undefined | null) => boolean
    GET_ROUTE_FRONT: (route: ROUTES_FRONT_NAME) => ROUTES_FRONT_PATH
    GET_ROUTE_API: (route: ROUTES_API_NAME) => ROUTES_API_PATH
    IS_REDIRECTION_NEEDED: (redirectionRoutePath: ROUTES_FRONT_PATH, currentPathname?: ROUTES_FRONT_PATH) => boolean
    REDIRECT_BY_NEXT_ROUTER: (route: ROUTES_FRONT_PATH, router: NextRouter, searchParams?: Record<string, string> | null) => {
      willBeRedirect: boolean,
      redirectAction: () => void
    }
    IS_APP_PATH: (requestedRoutePath: ROUTES_FRONT_PATH) => boolean
    IS_STATIC_PAGE: (requestedRoutePath: ROUTES_FRONT_PATH) => boolean
  }
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  routesFront         : ROUTES_FRONT,
  routesApi           : ROUTES_API,
  redirectionsOnEvents: REDIRECTIONS_ON_EVENTS,

  redirectionsSwitch: (event, action, currentUser, currentPathname) => {

    switch (event) {
      case 'ALREADY_LOGGED': {
        if (ROUTING_POLICY.redirectionsOnEvents.ALREADY_LOGGED && !PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          currentPathname)) {
          action(ROUTING_POLICY.redirectionsOnEvents.ALREADY_LOGGED)
        }
        break
      }
      case 'LOGIN_FIRST': {
        if (ROUTING_POLICY.redirectionsOnEvents.LOGIN_FIRST && !PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          currentPathname)) {
          action(ROUTING_POLICY.redirectionsOnEvents.LOGIN_FIRST)
        }
        break
      }
      case 'USER_LOGGED_IN': {
        if (ROUTING_POLICY.redirectionsOnEvents.USER_LOGGED_IN) {
          action(ROUTING_POLICY.redirectionsOnEvents.USER_LOGGED_IN)
        }
        break
      }
      case 'USER_ENABLED_SELF': {
        if (ROUTING_POLICY.redirectionsOnEvents.USER_ENABLED_SELF) {
          action(ROUTING_POLICY.redirectionsOnEvents.USER_ENABLED_SELF)
        }
        break
      }
      case 'USER_DISABLED_SELF': {
        if (ROUTING_POLICY.redirectionsOnEvents.USER_DISABLED_SELF) {
          action(ROUTING_POLICY.redirectionsOnEvents.USER_DISABLED_SELF)
        }
        break
      }
      case 'USER_LOGGED_OUT': {
        if (ROUTING_POLICY.redirectionsOnEvents.USER_LOGGED_OUT) {
          action(ROUTING_POLICY.redirectionsOnEvents.USER_LOGGED_OUT)
        }
        break
      }
      case 'SESSION_EXPIRED': {
        if (ROUTING_POLICY.redirectionsOnEvents.SESSION_EXPIRED) {
          action(ROUTING_POLICY.redirectionsOnEvents.SESSION_EXPIRED)
        }
        break
      }
      case 'USER_DELETED_SELF': {
        if (ROUTING_POLICY.redirectionsOnEvents.USER_DELETED_SELF) {
          action(ROUTING_POLICY.redirectionsOnEvents.USER_DELETED_SELF)
        }
        break
      }
      case 'UNAUTHORIZED': {
        if (ROUTING_POLICY.redirectionsOnEvents.UNAUTHORIZED) {
          action(ROUTING_POLICY.redirectionsOnEvents.UNAUTHORIZED)
        }
        break
      }
    }
  },

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
      return Object.keys(REDIRECTIONS_ON_EVENTS ?? {})
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
    },

    IS_APP_PATH: (requestedRoutePath) => {
      return Boolean(Object.values(ROUTES_FRONT_APP)
                           .find((path) => path === requestedRoutePath))
    },

    IS_STATIC_PAGE: (requestedRoutePath) => {
      return Boolean(Object.values(ROUTES_FRONT_STATIC)
                           .find((path) => path === requestedRoutePath))
    }
  }

} as const
