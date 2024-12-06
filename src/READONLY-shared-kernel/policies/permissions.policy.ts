import { EVENT_COMMANDS_AND_QUERIES_TYPE }                                                             from '../domain/commands-and-queries/cqrs.types'
import { permissionsForEvents, permissionsForRoutes, readonlyPermissionsSets, runtimePermissionsSets } from '../domain/permissions/permissions.config'
import { PermissionSets }                                                                              from '../domain/permissions/permissions.types'
import { ROUTES_FRONT_PATH }                                                                           from '../domain/routing/routing.types'
import { Role, RoleValue, User, UserNoSensitive }                                                      from '../models/db_models'
import { CurrentUser, UserNoSensitiveWithRelations }                                                   from '../models/user/user.types'
import { ROUTING_POLICY }                                                                              from './routing.policy'




export type PERMISSIONS_POLICY_TYPE = {
  permissionsForEvents: Readonly<Record<Role, EVENT_COMMANDS_AND_QUERIES_TYPE[]>>
  readonlyPermissionsSets: Readonly<PermissionSets>
  runtimePermissionsSets: Readonly<PermissionSets>
  permissionsForRoutes: Readonly<Record<ROUTES_FRONT_PATH, Role[]>>

  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role: Role | undefined, requestedRoutePath: ROUTES_FRONT_PATH) => boolean
    GET_PERMISSION_APPROVAL_FOR_EVENT: (
      user?: UserNoSensitive | UserNoSensitiveWithRelations | CurrentUser | null | undefined,
      requestedEvent?: EVENT_COMMANDS_AND_QUERIES_TYPE | undefined) => boolean
    IS_ROUTE_FOR_LOGGED_ONLY: (requestedRoutePath: ROUTES_FRONT_PATH) => boolean
    IS_ADMIN: (user: Pick<User, 'role'> | null | undefined) => boolean
  }
}
export const PERMISSIONS_POLICY: PERMISSIONS_POLICY_TYPE = {

  runtimePermissionsSets : Object.freeze(runtimePermissionsSets),
  readonlyPermissionsSets: Object.freeze(readonlyPermissionsSets),
  permissionsForEvents   : Object.freeze(permissionsForEvents),
  permissionsForRoutes   : Object.freeze(permissionsForRoutes),

  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role = RoleValue.NOT_LOGGED_IN, requestedRoutePath) => {
      // Role array of requested event is empty
      // OR
      // Role is included in requested event permission array.
      return Boolean(PERMISSIONS_POLICY.permissionsForRoutes[requestedRoutePath]?.length
        === 0
        || PERMISSIONS_POLICY.permissionsForRoutes[requestedRoutePath]?.includes(role as Role))
    },
    GET_PERMISSION_APPROVAL_FOR_EVENT: (user, requestedEvent) => {
      if (!requestedEvent) {
        return false
      }
      // Set default:
      let userRole: Role = RoleValue.NOT_LOGGED_IN
      // Check and maybe set:
      if (user?.role) {
        userRole = user.role
      }

      // Merge read-only and dynamic permissions:
      const readonlyPermissions = PERMISSIONS_POLICY.permissionsForEvents[userRole]
      const dynamicPermissions: EVENT_COMMANDS_AND_QUERIES_TYPE[] = user?.permissions ?? []
      const permissions: EVENT_COMMANDS_AND_QUERIES_TYPE[] = [ ...readonlyPermissions,
                                                               ...dynamicPermissions ]

      // Finally, check main condition:
      return Boolean(permissions.includes(requestedEvent))
    },

    IS_ROUTE_FOR_LOGGED_ONLY: (requestedRoutePath) => ROUTING_POLICY.utils.IS_APP_PATH(requestedRoutePath),


    IS_ADMIN: (user) => {
      return user?.role === RoleValue.MASTER_ADMIN
    }




  } as const

} as const

