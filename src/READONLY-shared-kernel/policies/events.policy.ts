import { SERVER_MESSAGES_TYPE }       from '../domain/http/http.config'
import { ALL_ROLES_COLLECTION, Role } from '../domain/models/models'




export const APPLICATION_EVENTS = [
  'USER_LOGIN',
  'USER_LOGOUT',
  'USER_REGISTER',
  'USER_GET_CURRENT',
  'USER_DELETE_SELF',
  'USER_DELETE_ANY_PROFILE_SCOPE',
  'USER_DELETE_ANY',
  'USER_GET_ALL'
] as const

export type APPLICATION_EVENTS_TYPE = typeof APPLICATION_EVENTS[number]



export type EVENTS_WITH_RULES =
  'UNAUTHORIZED_FOR_ROLE' |
  'ALREADY_LOGGED_IN' |
  'USER_LOGGED_IN'


type EVENTS_POLICY_TYPE = {
  eventsPermissions: { [K in APPLICATION_EVENTS_TYPE]: Role[] },
  rules: Record<EVENTS_WITH_RULES, (...args: any[]) => void>
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsPermissions: {

    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    USER_LOGIN                   : [ Role.NOT_LOGGED_IN ],
    USER_REGISTER                : [ Role.NOT_LOGGED_IN, Role.MASTER_ADMIN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                  : ALL_ROLES_COLLECTION,
    USER_GET_CURRENT             : ALL_ROLES_COLLECTION,
    USER_DELETE_ANY              : [ Role.MASTER_ADMIN ],
    USER_DELETE_ANY_PROFILE_SCOPE: [ Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ],
    USER_DELETE_SELF             : [ Role.ACCOUNT_HOLDER ],
    USER_GET_ALL                 : [ Role.MASTER_ADMIN ]

  },

  rules: {
    UNAUTHORIZED_FOR_ROLE: (serverMessage: SERVER_MESSAGES_TYPE, action: () => void) => {
      if (serverMessage === 'UNAUTHORIZED') {
        action()
      }
    },

    ALREADY_LOGGED_IN: (serverMessage: SERVER_MESSAGES_TYPE, action: () => void) => {
      if (serverMessage === 'ALREADY_LOGGED') {
        action()
      }
    },

    USER_LOGGED_IN: (serverMessage: SERVER_MESSAGES_TYPE, action: () => void) => {
      if (serverMessage === 'USER_LOGGED_IN') {
        action()
      }
    }


  }
} as const

export const GET_PERMISSION_APPROVAL_FOR_EVENT = (role: Role = Role.NOT_LOGGED_IN, requestedEvent?: APPLICATION_EVENTS_TYPE): boolean => {
  if (!requestedEvent) return false
  // EMPTY ARRAY - Everyone is allowed. Including not logged in.
  // OR
  // Role is included in requested event permission array.
  return Boolean(
    EVENTS_POLICY.eventsPermissions[requestedEvent]?.length === 0
    ||
    EVENTS_POLICY.eventsPermissions[requestedEvent as APPLICATION_EVENTS_TYPE].includes(role)
  )
}
