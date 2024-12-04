import { NextRouter }                                                             from 'next/router'
import { EVENT_INFO_TYPE }                                                        from '../domain/commands-and-queries/cqrs.types'
import { redirectionsOnEventsRules, ROUTES_API, ROUTES_FRONT, ROUTES_FRONT_APP }  from '../domain/routing/routing.config'
import { ROUTES_API_NAME, ROUTES_API_PATH, ROUTES_FRONT_NAME, ROUTES_FRONT_PATH } from '../domain/routing/routing.types'
import { UserNoSensitiveWithRelations }                                           from '../models/user/user.types'




export type ROUTING_POLICY_TYPE = {

  redirectionsOnEventsRules: Readonly<Record<EVENT_INFO_TYPE | string, (
    event: EVENT_INFO_TYPE | undefined | null,
    currentUser: UserNoSensitiveWithRelations | null | undefined,
    currentPathname: ROUTES_FRONT_PATH,
    action: (route: ROUTES_FRONT_PATH) => void) => void>>

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
  }
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  redirectionsOnEventsRules: Object.freeze(redirectionsOnEventsRules),

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
    },

    IS_APP_PATH: (requestedRoutePath) => {
      return Boolean(Object.values(ROUTES_FRONT_APP)
                           .find((path) => path === requestedRoutePath))
    }
  }

} as const
