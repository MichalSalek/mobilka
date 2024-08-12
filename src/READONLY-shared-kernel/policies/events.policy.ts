import { EVENT_COMMANDS_TYPE, EVENT_LOGS_TYPE }  from '../cqrs/events.config'
import { ALL_ROLES_COLLECTION, EventType, Role, UserNoSensitive }     from '../models/models'
import { ROUTING_POLICY, ROUTES } from './routing.policy'



type EVENTS_POLICY_TYPE = {
  eventsPermissions: Record<EVENT_COMMANDS_TYPE, Role[]>,
  eventsHandledActions: Record<EVENT_LOGS_TYPE | string, (event: EVENT_LOGS_TYPE | undefined | null, currentUser: UserNoSensitive | null | undefined, currentPathname: ROUTES, action: () => void) => void>
  utils: {
    GET_PERMISSION_APPROVAL_FOR_EVENT: (role?: Role, requestedEvent?: EVENT_COMMANDS_TYPE) => boolean
  }
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsPermissions: {
    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    EVENT_LOG_GET_ALL: ALL_ROLES_COLLECTION,

    USER_LOGIN                    : [ Role.NOT_LOGGED_IN ],
    USER_CREATE                   : [ Role.MASTER_ADMIN, Role.NOT_LOGGED_IN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                   : ALL_ROLES_COLLECTION,
    USER_GET_CURRENT              : ALL_ROLES_COLLECTION,
    USER_DELETE_ANY               : [ Role.MASTER_ADMIN ],
    USER_DELETE_ACCOUNT_SCOPE_ONLY: [ Role.MASTER_ADMIN, Role.ACCOUNT_HOLDER ],
    USER_DELETE_SELF_ONLY         : [ Role.USER_LEVEL_1 ],
    USER_GET_ALL                  : [ Role.MASTER_ADMIN ],

    SESSION_DELETE_SELF_ONLY: ALL_ROLES_COLLECTION,
    SESSION_DELETE_ALL      : ALL_ROLES_COLLECTION,
    SESSION_DELETE_SPECIFIC : ALL_ROLES_COLLECTION,
    SESSION_GET_ALL         : ALL_ROLES_COLLECTION

  },

  eventsHandledActions: {

    // Events fallback for specific handling in other places.
    // Needs to be specially handled in the App.

    UNAUTHORIZED: (event, currentUser, currentPathname, action) => {
      if (event === 'UNAUTHORIZED' && !ROUTING_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action()
      }
    },

    USER_LOGGED_IN: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_LOGGED_IN') {
        action()
      }
    },

    USER_CREATED: (event, currentUser, currentPathname, action) => {
      if (event === 'USER_CREATED') {
        action()
      }
    },

    ALREADY_LOGGED: (event, currentUser, currentPathname, action) => {
      if (event === 'ALREADY_LOGGED' && !ROUTING_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action()
      }
    },


    SELF_USER_DELETED: (event, currentUser, currentPathname, action) => {
      if (event === 'SELF_USER_DELETED' && !ROUTING_POLICY.utils.GET_PERMISSION_APPROVAL_FOR_ROUTE(currentUser?.role, currentPathname)) {
        action()
      }
    }
  },

  utils: {
    GET_PERMISSION_APPROVAL_FOR_EVENT: (role = Role.NOT_LOGGED_IN, requestedEvent) => {
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
  }
} as const


type EVENT_LOGS_POLICY_TYPE = {
  allowedEventLogs: EVENT_LOGS_TYPE[],
  allowedEventTypes: Record<EventType, EVENT_LOGS_TYPE[]>
  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => boolean
    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => EventType | undefined
  }
}

export const EVENT_LOGS_POLICY: EVENT_LOGS_POLICY_TYPE = {
  allowedEventLogs : [
    'USER_LOGGED_IN',
    'CANNOT_LOGIN'
  ] as const,
  allowedEventTypes: {
    LOGIN_EVENT_LOG  : [
      'USER_LOGGED_IN',
      'CANNOT_LOGIN'
    ] as const,
    ACCOUNT_EVENT_LOG: [] as const
  },

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog) =>
      // EventLog is included in allowedEventLogs permission array.
      Boolean(
        EVENT_LOGS_POLICY.allowedEventLogs.includes(eventLog as EVENT_LOGS_TYPE)
      ),

    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog) => {
      // Get event category of a given event log.
      const eventTypes = Object.keys(EVENT_LOGS_POLICY.allowedEventTypes) as EventType[]
      return eventTypes.find((eventType: EventType) => EVENT_LOGS_POLICY.allowedEventTypes[eventType].includes(eventLog as EVENT_LOGS_TYPE))
    }
  }

} as const
