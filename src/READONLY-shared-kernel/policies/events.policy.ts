import { ROUTING_POLICY }                               from './routing.policy'
import { EVENT_COMMANDS_TYPE, EVENT_LOGS_TYPE }         from '../cqrs/events.config'
import { ALL_LOGGED_ROLES_COLLECTION, EventType, Role } from '../models/models'




type EVENTS_POLICY_TYPE = {
  eventsPermissions: Record<EVENT_COMMANDS_TYPE, Role[]>,
  eventsDisallowedForUI: EVENT_LOGS_TYPE[]
  utils: {
    GET_PERMISSION_APPROVAL_FOR_EVENT: (role?: Role, requestedEvent?: EVENT_COMMANDS_TYPE) => boolean
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event: EVENT_LOGS_TYPE | undefined | null) => boolean
    IS_EVENT_LOG_DISALLOWED_FOR_UI: (event: EVENT_LOGS_TYPE | string | undefined | null) => boolean
  }
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsPermissions: {
    // EMPTY ARRAY - Everyone is allowed. Including not logged in.

    EVENT_LOG_GET_ALL: ALL_LOGGED_ROLES_COLLECTION,

    USER_LOGIN                    : [ Role.NOT_LOGGED_IN ],
    USER_CREATE                   : [ Role.MASTER_ADMIN, Role.NOT_LOGGED_IN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                   : ALL_LOGGED_ROLES_COLLECTION,
    USER_GET_CURRENT              : ALL_LOGGED_ROLES_COLLECTION,
    USER_DELETE_ANY               : [ Role.MASTER_ADMIN ],
    USER_DELETE_ACCOUNT_SCOPE_ONLY: [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT ],
    USER_DELETE_SELF_ONLY         : [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT, Role.ACCOUNT_HOLDER_WITHOUT_ACCOUNT, Role.USER_LEVEL_1 ],
    USER_GET_ALL                  : [ Role.MASTER_ADMIN ],

    SESSION_DELETE_ALL     : ALL_LOGGED_ROLES_COLLECTION,
    SESSION_DELETE_SPECIFIC: ALL_LOGGED_ROLES_COLLECTION,
    SESSION_GET_ALL        : ALL_LOGGED_ROLES_COLLECTION,

    ACCOUNT_DISPLAY_NAME_CHANGE: [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT, Role.MASTER_ADMIN ],
    ACCOUNT_PRICING_PLAN_CHANGE: [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT, Role.ACCOUNT_HOLDER_WITHOUT_ACCOUNT, Role.MASTER_ADMIN ],
    ACCOUNT_PAYMENT_MAKE       : [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT, Role.ACCOUNT_HOLDER_WITHOUT_ACCOUNT, Role.MASTER_ADMIN ],
    ACCOUNT_PAYMENT_GET_STATUS : [ Role.ACCOUNT_HOLDER_WITH_ACCOUNT, Role.ACCOUNT_HOLDER_WITHOUT_ACCOUNT, Role.MASTER_ADMIN ]

  },

  eventsDisallowedForUI: [ 'SUCCESS' ],

  utils: {
    GET_PERMISSION_APPROVAL_FOR_EVENT     : (role = Role.NOT_LOGGED_IN, requestedEvent) => {
      if (!requestedEvent) return false
      // EMPTY ARRAY - Everyone is allowed. Including not logged in.
      // OR
      // Role is included in a requested event permission array.
      return Boolean(
        EVENTS_POLICY.eventsPermissions[requestedEvent]?.length === 0
        ||
        EVENTS_POLICY.eventsPermissions[requestedEvent as EVENT_COMMANDS_TYPE]?.includes(role)
      )

    },
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event) => Object.keys(ROUTING_POLICY.redirectionsOnEventsRules ?? {}).includes(event ?? ''),

    IS_EVENT_LOG_DISALLOWED_FOR_UI: (event) => {
      return !event || EVENTS_POLICY.eventsDisallowedForUI.includes(event as EVENT_LOGS_TYPE)
    }
  }
} as const




type EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventTypes: Record<EventType, EVENT_LOGS_TYPE[]>
  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => boolean
    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => EventType | undefined
  }
}

export const EVENT_LOG_STORE_POLICY: EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventTypes: {
    LOGIN_EVENT_LOG  : [
      'USER_LOGGED_IN',
      'USER_LOGGED_OUT',
      'CANNOT_LOGIN',
      'SESSION_DELETED'
    ] as const,
    ACCOUNT_EVENT_LOG: [
      'PAYMENT_DONE',
      'DISPLAY_NAME_CHANGED',
      'USER_DELETED',
      'USER_CREATED',
      'ALL_SESSIONS_DELETED',
      'PRICING_PLAN_CHANGED'
    ] as const
  },

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog) =>
      // EventLog is included in allowedEventLogs permission array.
      Boolean(
        Object.values(EVENT_LOG_STORE_POLICY.allowedEventTypes).find((allowedEventsArr: EVENT_LOGS_TYPE[]) => allowedEventsArr.includes(eventLog as EVENT_LOGS_TYPE))
      ),

    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog) => {
      // Get event category of a given event log.
      const eventTypes = Object.keys(EVENT_LOG_STORE_POLICY.allowedEventTypes) as EventType[]
      return eventTypes.find((eventType: EventType) => EVENT_LOG_STORE_POLICY.allowedEventTypes[eventType].includes(eventLog as EVENT_LOGS_TYPE))
    }
  }

} as const
