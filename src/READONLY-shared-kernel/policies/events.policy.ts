import { EVENT_COMMANDS_TYPE, EVENT_LOGS_TYPE }  from '../cqrs/events.config'
import { ALL_ROLES_COLLECTION, EventType, Role } from '../models/models'




type EVENTS_POLICY_TYPE = {
  eventsPermissions: Record<EVENT_COMMANDS_TYPE, Role[]>,
  eventLogsHandledActions: Record<EVENT_LOGS_TYPE | string, (event: EVENT_LOGS_TYPE | undefined | null, action: () => void) => void>
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsPermissions: {
    // EMPTY ARRAY - Everyone is allowed. Including not logged in.
    USER_LOGIN                    : [ Role.NOT_LOGGED_IN ],
    USER_CREATE                   : [ Role.MASTER_ADMIN, Role.NOT_LOGGED_IN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                   : ALL_ROLES_COLLECTION,
    USER_GET_CURRENT              : ALL_ROLES_COLLECTION,
    USER_DELETE_ANY               : [ Role.MASTER_ADMIN ],
    USER_DELETE_ACCOUNT_SCOPE_ONLY: [ Role.MASTER_ADMIN, Role.ACCOUNT_HOLDER ],
    USER_DELETE_SELF_ONLY         : [ Role.USER_LEVEL_1 ],
    USER_GET_ALL                  : [ Role.MASTER_ADMIN ]
  },

  eventLogsHandledActions: {

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
    },

    SELF_USER_DELETED: (event, action) => {
      if (event === 'SELF_USER_DELETED') {
        action()
      }
    }
  }
} as const

export const GET_PERMISSION_APPROVAL_FOR_EVENT = (role: Role = Role.NOT_LOGGED_IN, requestedEvent?: EVENT_COMMANDS_TYPE): boolean => {
  if (!requestedEvent) return false
  // EMPTY ARRAY - Everyone is allowed. Including not logged in.
  // OR
  // Role is included in a requested event permission array.
  return Boolean(
    EVENTS_POLICY.eventsPermissions[requestedEvent]?.length === 0
    ||
    EVENTS_POLICY.eventsPermissions[requestedEvent as EVENT_COMMANDS_TYPE]?.includes(role)
  )
}


type EVENT_LOGS_POLICY_TYPE = {
  allowedEventLogs: EVENT_LOGS_TYPE[],
  allowedEventTypes: Record<EventType, EVENT_LOGS_TYPE[]>
}

export const EVENT_LOGS_POLICY: EVENT_LOGS_POLICY_TYPE = {
  allowedEventLogs : [
    'USER_LOGGED_IN',
    'CANNOT_LOGIN'
  ],
  allowedEventTypes: {
    LOGIN_EVENT_LOG  : [
      'USER_LOGGED_IN',
      'CANNOT_LOGIN'
    ],
    ACCOUNT_EVENT_LOG: []
  }
}

export const GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG = (eventLog: EVENT_LOGS_TYPE | unknown): boolean =>
  // EventLog is included in allowedEventLogs permission array.
  Boolean(
    EVENT_LOGS_POLICY.allowedEventLogs.includes(eventLog as EVENT_LOGS_TYPE)
  )

export const GET_PERMISSION_APPROVAL_FOR_EVENT_TYPE = (eventType: EventType, eventLog: EVENT_LOGS_TYPE | unknown): boolean =>
  // EventLog is included in allowedEventLogs permission array.
  Boolean(
    EVENT_LOGS_POLICY.allowedEventTypes[eventType].includes(eventLog as EVENT_LOGS_TYPE)
  )
