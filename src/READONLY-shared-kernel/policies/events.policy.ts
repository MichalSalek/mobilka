import { EVENT_COMMANDS_TYPE, EVENT_LOGS_TYPE } from '../cqrs/events.config'
import { ALL_LOGGED_ROLES_COLLECTION, Role }    from '../models/models'
import { ROUTING_POLICY }                       from './routing.policy'




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
    USER_CREATE                   : [ Role.MASTER_ADMIN,
                                      Role.NOT_LOGGED_IN ], //@todo account holder może zarejestrować - coś jest źle
    USER_LOGOUT                   : ALL_LOGGED_ROLES_COLLECTION,
    USER_GET_CURRENT              : ALL_LOGGED_ROLES_COLLECTION,
    USER_DELETE_ANY               : [ Role.MASTER_ADMIN ],
    USER_DELETE_ACCOUNT_SCOPE_ONLY: [ Role.ACCOUNT_HOLDER_ACTIVE ],
    USER_DELETE_SELF_ONLY         : [ Role.ACCOUNT_HOLDER_ACTIVE,
                                      Role.ACCOUNT_HOLDER_INACTIVE,
                                      Role.USER_LEVEL_1 ],
    USER_GET_ALL                  : [ Role.MASTER_ADMIN ],

    SESSION_DELETE_ALL     : ALL_LOGGED_ROLES_COLLECTION,
    SESSION_DELETE_SPECIFIC: ALL_LOGGED_ROLES_COLLECTION,
    SESSION_GET_ALL        : ALL_LOGGED_ROLES_COLLECTION,
    SESSION_REFRESH        : ALL_LOGGED_ROLES_COLLECTION,

    ACCOUNT_DISPLAY_NAME_CHANGE: [ Role.ACCOUNT_HOLDER_ACTIVE,
                                   Role.MASTER_ADMIN ],
    ACCOUNT_PRICING_PLAN_CHANGE: [ Role.ACCOUNT_HOLDER_ACTIVE,
                                   Role.ACCOUNT_HOLDER_INACTIVE,
                                   Role.MASTER_ADMIN ],
    ACCOUNT_PAYMENT_MAKE       : [ Role.ACCOUNT_HOLDER_ACTIVE,
                                   Role.ACCOUNT_HOLDER_INACTIVE,
                                   Role.MASTER_ADMIN ],
    ACCOUNT_PAYMENT_GET_STATUS : [ Role.ACCOUNT_HOLDER_ACTIVE,
                                   Role.ACCOUNT_HOLDER_INACTIVE,
                                   Role.MASTER_ADMIN ],
    SESSION_CHECK              : ALL_LOGGED_ROLES_COLLECTION

  },

  eventsDisallowedForUI: [ 'SUCCESS',
                           'UNAUTHORIZED',
                           'GENERAL_ERROR' ],

  utils: {
    GET_PERMISSION_APPROVAL_FOR_EVENT     : (role = Role.NOT_LOGGED_IN, requestedEvent) => {
      if (!requestedEvent) {
        return false
      }
      // EMPTY ARRAY - Everyone is allowed. Including not logged in.
      // OR
      // Role is included in a requested event permission array.
      return Boolean(EVENTS_POLICY.eventsPermissions[requestedEvent]?.length
        === 0
        || EVENTS_POLICY.eventsPermissions[requestedEvent as EVENT_COMMANDS_TYPE]?.includes(role))

    },
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event) => {
      return Object.keys(ROUTING_POLICY.redirectionsOnEventsRules ?? {})
                   .includes(event ?? '')
    },

    IS_EVENT_LOG_DISALLOWED_FOR_UI: (event) => {
      return !event || EVENTS_POLICY.eventsDisallowedForUI.includes(event as EVENT_LOGS_TYPE)
    }
  }
} as const

