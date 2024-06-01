import { Role } from '../domain/models/models'




export const APPLICATION_EVENTS_WITH_PERMISSIONS = [
  'USER_GET_CURRENT',
  'USER_DELETE',
  'USER_GET_ALL'
] as const

export type APPLICATION_EVENTS_WITH_PERMISSIONS_TYPE = typeof APPLICATION_EVENTS_WITH_PERMISSIONS[number]


type PERMISSION_POLICY_TYPE = {
  eventsPermissions: { [K in typeof APPLICATION_EVENTS_WITH_PERMISSIONS[number]]: Role[] }
}
export const PERMISSION_POLICY: PERMISSION_POLICY_TYPE = {

  eventsPermissions: {
    USER_GET_CURRENT: [ Role.USER_LEVEL_1, Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ],
    USER_DELETE     : [ Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ],
    USER_GET_ALL    : [ Role.MASTER_ADMIN ]
  }
}


