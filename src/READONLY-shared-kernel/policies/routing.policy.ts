// @ts-ignore
import { NextRouter }                                                                                                                     from 'next/router'
import { EVENT_INFO_TYPE }                                                                                                                from '../domain/commands-and-queries/cqrs.types'
import { REDIRECTIONS_ON_EVENTS, ROUTES_API, ROUTES_FRONT, ROUTES_FRONT_APP, ROUTES_FRONT_STATIC }                                        from '../domain/routing/routing.config'
import { RedirectionHandler, ROUTES_API_NAME, ROUTES_API_PATH, ROUTES_API_TYPE, ROUTES_FRONT_NAME, ROUTES_FRONT_PATH, ROUTES_FRONT_TYPE } from '../domain/routing/routing.types'
import { PERMISSIONS_POLICY }                                                                                                             from './permissions.policy'




export type ROUTING_POLICY_TYPE = {

  redirectionsSwitch: RedirectionHandler
  routesFront: ROUTES_FRONT_TYPE
  routesApi: ROUTES_API_TYPE


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

  routesFront: ROUTES_FRONT,
  routesApi  : ROUTES_API,

  redirectionsSwitch: (event, action, currentUser, currentPathname) => {

    switch (event) {
      case 'ALREADY_LOGGED': {
        if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          currentPathname)) {
          action(REDIRECTIONS_ON_EVENTS.ALREADY_LOGGED)
        }
        break
      }
      case 'LOGIN_FIRST': {
        if (!PERMISSIONS_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(
          currentUser?.role,
          currentPathname)) {
          action(REDIRECTIONS_ON_EVENTS.LOGIN_FIRST)
        }
        break
      }
      case 'USER_LOGGED_IN': {
        action(REDIRECTIONS_ON_EVENTS.USER_LOGGED_IN)
        break
      }
      case 'USER_ENABLED_SELF': {
        action(REDIRECTIONS_ON_EVENTS.USER_ENABLED_SELF)

        break
      }
      case 'USER_DISABLED_SELF': {
        action(REDIRECTIONS_ON_EVENTS.USER_DISABLED_SELF)

        break
      }
      case 'USER_LOGGED_OUT': {
        action(REDIRECTIONS_ON_EVENTS.USER_LOGGED_OUT)

        break
      }
      case 'SESSION_EXPIRED': {
        action(REDIRECTIONS_ON_EVENTS.SESSION_EXPIRED)

        break
      }
      case 'USER_DELETED_SELF': {
        action(REDIRECTIONS_ON_EVENTS.USER_DELETED_SELF)

        break
      }
      case 'UNAUTHORIZED': {
        action(REDIRECTIONS_ON_EVENTS.UNAUTHORIZED)
        break
      }
      case 'USER_SWITCHED_BACK_TO_SELF': {
        action(REDIRECTIONS_ON_EVENTS.USER_SWITCHED_BACK_TO_SELF)
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
