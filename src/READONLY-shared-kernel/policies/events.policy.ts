import { APPLICATION_EVENTS_COMMANDS_TYPE, APPLICATION_EVENTS_MESSAGES_TYPE } from '../cqrs/events.config'
import { ALL_ROLES_COLLECTION, Role }                                         from '../models/models'




type EVENTS_POLICY_TYPE = {
  eventsPermissions: Record<APPLICATION_EVENTS_COMMANDS_TYPE, Role[]>,
  eventsMessages: Record<APPLICATION_EVENTS_MESSAGES_TYPE | string, (event: APPLICATION_EVENTS_MESSAGES_TYPE | undefined | null, action: () => void) => void>
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsPermissions: {
    // EMPTY ARRAY - Everyone is allowed. Including not logged in.
    USER_LOGIN                    : [ Role.NOT_LOGGED_IN ],
    USER_CREATE                   : [ Role.MASTER_ADMIN, Role.NOT_LOGGED_IN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                   : ALL_ROLES_COLLECTION,
    USER_GET_CURRENT              : ALL_ROLES_COLLECTION,
    USER_DELETE_ANY               : [ Role.MASTER_ADMIN ],
    USER_DELETE_PROFILE_SCOPE_ONLY: [ Role.MASTER_ADMIN, Role.ACCOUNT_HOLDER ],
    USER_DELETE_SELF_ONLY         : [ Role.USER_LEVEL_1 ],
    USER_GET_ALL                  : [ Role.MASTER_ADMIN ]
  },

  eventsMessages: {

    // Events fallback for specific handling in other places.
    // Needs to be specially handled in the App.

    UNAUTHORIZED: (event, action) => {
      if (event === 'UNAUTHORIZED') {
        action()
      }
    },

    ALREADY_LOGGED: (event, action) => {
      if (event === 'ALREADY_LOGGED') {
        action()
      }
    },

    USER_LOGGED_IN: (event, action) => {
      if (event === 'USER_LOGGED_IN') {
        action()
      }
    }

  }
} as const

export const GET_PERMISSION_APPROVAL_FOR_EVENT = (role: Role = Role.NOT_LOGGED_IN, requestedEvent?: APPLICATION_EVENTS_COMMANDS_TYPE): boolean => {
  if (!requestedEvent) return false
  // EMPTY ARRAY - Everyone is allowed. Including not logged in.
  // OR
  // Role is included in a requested event permission array.
  return Boolean(
    EVENTS_POLICY.eventsPermissions[requestedEvent]?.length === 0
    ||
    EVENTS_POLICY.eventsPermissions[requestedEvent as APPLICATION_EVENTS_COMMANDS_TYPE]?.includes(role)
  )
}
