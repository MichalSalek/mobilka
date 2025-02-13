import { ALL_LOGGED_ROLES_COLLECTION, RoleValue } from '../../models/db_models'
import { EVENTS_POLICY }                          from '../../policies/events.policy'
import { PERMISSIONS_POLICY_TYPE }                from '../../policies/permissions.policy'
import { ROUTES_FRONT }                           from '../routing/routing.config'




export const readonlyPermissionsSets: PERMISSIONS_POLICY_TYPE['readonlyPermissionsSets'] = {

  ALWAYS_ALLOWED: [ 'SESSION_GET_CURRENT',
                    'MASTER_ADMIN_INIT' ],

  MASTER_ADMIN: EVENTS_POLICY.utils.GET_COMMAND_AND_QUERY_EVENTS()
                             .filter((event) => {
                               if (event === 'USER_DISABLE_SELF') {
                                 return false
                               }
                               if (event === 'USER_DELETE_SELF') {
                                 return false
                               }

                               return true
                             }),

  LOGGED_USER_LOW_LEVEL_FUNCTIONALITY: [ 'USER_LOGOUT',
                                         'USER_DISABLE_SELF',
                                         'USER_ENABLE_SELF',
                                         'USER_DELETE_SELF',

                                         'SESSION_REFRESH',
                                         'SESSION_GET_CURRENT',
                                         'SESSION_DELETE_ALL',
                                         'SESSION_DELETE_EXACTLY',
                                         'SESSION_GET_ALL',

                                         'EVENT_LOG_GET_ALL' ]

} as const


export const runtimePermissionsSets: PERMISSIONS_POLICY_TYPE['runtimePermissionsSets'] = {

  ACTIVE_ACCOUNT: [ 'USER_DELETE_EXACTLY',
                    'USER_CREATE' ]


} as const


export const permissionsForEvents: PERMISSIONS_POLICY_TYPE['permissionsForEvents'] = {
  [RoleValue.MASTER_ADMIN]  : [ ...readonlyPermissionsSets.ALWAYS_ALLOWED,
                                ...readonlyPermissionsSets.MASTER_ADMIN ],
  [RoleValue.NOT_LOGGED_IN] : [ ...readonlyPermissionsSets.ALWAYS_ALLOWED,
                                'USER_LOGIN',
                                'USER_REGISTER' ],
  [RoleValue.ACCOUNT_HOLDER]: [ ...readonlyPermissionsSets.ALWAYS_ALLOWED,
                                ...readonlyPermissionsSets.LOGGED_USER_LOW_LEVEL_FUNCTIONALITY,
                                'ACCOUNT_DISPLAY_NAME_CHANGE',
                                'ACCOUNT_PAYMENT_GET_STATUS',
                                'ACCOUNT_PAYMENT_MAKE' ],
  [RoleValue.USER_LEVEL_1]  : [ ...readonlyPermissionsSets.ALWAYS_ALLOWED,
                                ...readonlyPermissionsSets.LOGGED_USER_LOW_LEVEL_FUNCTIONALITY ]
} as const


export const permissionsForRoutes: PERMISSIONS_POLICY_TYPE['permissionsForRoutes'] = {
  //
  // EMPTY ARRAY - Everyone is allowed. Including not logged in.
  //
  [ROUTES_FRONT.ADMIN]: [ RoleValue.MASTER_ADMIN ],

  [ROUTES_FRONT.CONNECTION_CHECK]: [],


  [ROUTES_FRONT.HOME]   : [],
  [ROUTES_FRONT.PRICING]: [],

  [ROUTES_FRONT.USER_LOG]     : [ RoleValue.NOT_LOGGED_IN ],
  [ROUTES_FRONT.USER_REG]     : [ RoleValue.NOT_LOGGED_IN ],
  [ROUTES_FRONT.USER_REG_PASS]: [ RoleValue.NOT_LOGGED_IN ],

  [ROUTES_FRONT.APP]             : ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_DEL_SELF]   : ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_ACCOUNT]    : ALL_LOGGED_ROLES_COLLECTION,
  [ROUTES_FRONT.USER_ACCOUNT_PAY]: ALL_LOGGED_ROLES_COLLECTION

} as const
