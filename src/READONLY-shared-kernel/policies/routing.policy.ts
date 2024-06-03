import { NextRouter }                                 from 'next/router'
import { ALL_ROLES_COLLECTION, Role, UserClientSafe } from '../domain/models/models'




export enum ROUTES {
  HOME = '/',
  APP = '/app',
  USER_DEL = '/user/delete',
  USER_LOG = '/user/login',
  USER_REG = '/user/register',
}




export type ROUTING_POLICY_RULES =
  'UNAUTHORIZED_FOR_ROLE' |
  'ALREADY_LOGGED_IN'


export type ROUTING_POLICY_TYPE = {
  routesPermissions: { [K in ROUTES]: Role[] }
  rules: Record<ROUTING_POLICY_RULES, (...args: any[]) => void>
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {

  routesPermissions: {

    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    '/'             : [],
    '/app'          : ALL_ROLES_COLLECTION,
    '/user/delete'  : [ Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ],
    '/user/login'   : [],
    '/user/register': []
  },

  rules: {
    UNAUTHORIZED_FOR_ROLE: (currentUser: UserClientSafe, currentPathname: ROUTES, action: () => void) => {
      if (!GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action()
      }
    },

    ALREADY_LOGGED_IN: (currentUser: UserClientSafe, currentPathname: ROUTES, action: () => void) => {
      if (
        Boolean(currentUser)
        &&
        (
          currentPathname === '/user/register'
          || currentPathname === '/user/login'
        )) {
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
    ROUTING_POLICY.routesPermissions[requestedRoute]?.length === 0
    ||
    ROUTING_POLICY.routesPermissions[requestedRoute]?.includes(role as Role)
  )


export const REDIRECT_BY_LOCATION = (route: ROUTES): void => {
  if (IS_REDIRECTION_NEEDED(route)) {
    location.replace(location.origin + route)
  }
}


export const REDIRECT_BY_NEXT_ROUTER = (route: ROUTES, router: NextRouter): void => {
  if (IS_REDIRECTION_NEEDED(route)) {
    void router.replace(route)
  }
}