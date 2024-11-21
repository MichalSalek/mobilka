import { GET_COMMAND_AND_QUERY_EVENTS }                                                                from '../cqrs/events.config'
import { EVENT_COMMANDS_AND_QUERIES_TYPE }                                                             from '../cqrs/events.types'
import { ALL_LOGGED_ROLES_COLLECTION, Role, RoleValue, UserNoSensitive, UserNoSensitiveWithRelations } from '../models/models'
import { CurrentUser }                                                                                 from '../models/user/user.types'
import { ROUTES_FRONT, ROUTES_FRONT_PATH }                                                             from '../routing/routing.config'




type PermissionSets = Record<'LOW_LEVEL' | 'ACTIVE_ACCOUNT', EVENT_COMMANDS_AND_QUERIES_TYPE[]>


const permissionEventsSets: PermissionSets = {

  LOW_LEVEL: [ 'USER_GET_CURRENT',
               'USER_LOGOUT',
               'USER_DELETE_SELF',

               'SESSION_REFRESH',
               'SESSION_CHECK',
               'SESSION_DELETE_ALL',
               'SESSION_DELETE_EXACTLY',
               'SESSION_GET_ALL',

               'EVENT_LOG_GET_ALL' ],


  ACTIVE_ACCOUNT: [ 'USER_DELETE_EXACTLY',
                    'USER_CREATE' ]
}

type PERMISSIONS_POLICY_TYPE = {
  permissionsForRoutes: Record<ROUTES_FRONT_PATH, Role[]>
  permissionsForEvents: Record<Role, EVENT_COMMANDS_AND_QUERIES_TYPE[]>,
  permissionEventsSets: PermissionSets

  utils: {
    GET_PERMISSION_APPROVAL_FOR_ROUTE: (role: Role | undefined, requestedRoutePath: ROUTES_FRONT_PATH) => boolean
    GET_PERMISSION_APPROVAL_FOR_EVENT: (
      user?: UserNoSensitive | UserNoSensitiveWithRelations | CurrentUser | null | undefined,
      requestedEvent?: EVENT_COMMANDS_AND_QUERIES_TYPE | undefined) => boolean
  }
}
export const PERMISSIONS_POLICY: PERMISSIONS_POLICY_TYPE = {

  permissionsForRoutes: {

    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    [ROUTES_FRONT.HOME]        : [],
    [ROUTES_FRONT.APP]         : ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES_FRONT.USER_DEL]    : ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES_FRONT.USER_LOG]    : [ RoleValue.NOT_LOGGED_IN ],
    [ROUTES_FRONT.USER_REG]    : [ RoleValue.NOT_LOGGED_IN ],
    [ROUTES_FRONT.USER_ACCOUNT]: ALL_LOGGED_ROLES_COLLECTION,
    [ROUTES_FRONT.PRICING]     : []

  },

  permissionEventsSets: permissionEventsSets,
  permissionsForEvents: {
    [RoleValue.MASTER_ADMIN]  : [ ...GET_COMMAND_AND_QUERY_EVENTS() ],
    [RoleValue.NOT_LOGGED_IN] : [ 'USER_LOGIN',
                                  'USER_REGISTER' ],
    [RoleValue.ACCOUNT_HOLDER]: [ ...permissionEventsSets.LOW_LEVEL,
                                  'ACCOUNT_DISPLAY_NAME_CHANGE',
                                  'ACCOUNT_PAYMENT_GET_STATUS',
                                  'ACCOUNT_PAYMENT_MAKE' ],
    [RoleValue.USER_LEVEL_1]  : [ ...permissionEventsSets.LOW_LEVEL ]
  },


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
      let userRole: Role = RoleValue.NOT_LOGGED_IN
      if (user?.role) {
        userRole = user.role
      }

      const readonlyPermissions = PERMISSIONS_POLICY.permissionsForEvents[userRole]
      const dynamicPermissions: EVENT_COMMANDS_AND_QUERIES_TYPE[] = user?.permissions ?? []
      const permissions: EVENT_COMMANDS_AND_QUERIES_TYPE[] = [ ...readonlyPermissions,
                                                               ...dynamicPermissions ]

      return Boolean(permissions.includes(requestedEvent))
    }

  } as const

} as const
