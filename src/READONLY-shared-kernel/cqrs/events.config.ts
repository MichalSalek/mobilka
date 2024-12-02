import { EVENT_COMMANDS_AND_QUERIES_TYPE, EVENT_COMMANDS_TYPE, EVENT_QUERIES_TYPE } from './events.types'




export const EVENTS = Object.freeze({


  COMMANDS: {

    APPLICATION: [],
    DEBUG      : [ 'SWITCH_BACKEND_DEBUG_MODE',
                   'BECOME_USER',
                   'SWITCH_BACK_BECOME_USER' ],
    USER       : [ 'USER_LOGIN',
                   'USER_LOGOUT',
                   'USER_CREATE',
                   'USER_REGISTER',
                   'USER_DISABLE_ANY',
                   'USER_DISABLE_SELF',
                   'USER_ENABLE_ANY',
                   'USER_ENABLE_SELF',
                   'USER_DELETE_ANY',
                   'USER_DELETE_EXACTLY',
                   'USER_DELETE_SELF' ],
    SESSION    : [ 'SESSION_DELETE_ALL',
                   'SESSION_DELETE_EXACTLY',
                   'SESSION_REFRESH' ],
    ACCOUNT    : [ 'ACCOUNT_DISPLAY_NAME_CHANGE',
                   'ACCOUNT_PAYMENT_MAKE' ],
    EVENT_LOG  : []
  },



  QUERIES: {

    APPLICATION: [],
    DEBUG      : [],
    USER       : [ 'USER_GET_CURRENT',
                   'USER_GET_ALL' ],
    SESSION    : [ 'SESSION_GET_ALL',
                   'SESSION_CHECK' ],
    ACCOUNT    : [ 'ACCOUNT_PAYMENT_GET_STATUS' ],
    EVENT_LOG  : [ 'EVENT_LOG_GET_ALL' ]
  },



  INFO: {

    APPLICATION: [ 'GENERAL_ERROR',
                   'SUCCESS',
                   'NOT_FOUND',
                   'VALIDATION_FAILED' ],
    DEBUG      : [ 'DEBUG_MODE_ENABLED',
                   'DEBUG_MODE_DISABLED',
                   'USER_BECAME_SOMEONE_ELSE',
                   'USER_SWITCHED_BACK_TO_SELF' ],
    USER       : [ 'USER_LOGGED_IN',
                   'USER_LOGGED_OUT',
                   'CANNOT_LOGIN',
                   'ALREADY_LOGGED',
                   'CURRENT_USER_NOT_FOUND',
                   'UNAUTHORIZED',
                   'USER_ALREADY_EXISTS',
                   'USER_CREATED',
                   'USER_REGISTERED',
                   'CANNOT_REGISTER_USER',
                   'CANNOT_CREATE_USER',
                   'USER_DISABLED',
                   'USER_DISABLED_SELF',
                   'CANNOT_DISABLE_USER',
                   'CANNOT_ENABLE_USER',
                   'USER_ENABLED',
                   'USER_ENABLED_SELF',
                   'USER_DELETED',
                   'USER_DELETED_SELF',
                   'CANNOT_DELETE_USER',
                   'USERS_FETCHED' ],
    SESSION    : [ 'SESSION_DELETED',
                   'CANNOT_DELETE_SESSION',
                   'ALL_SESSIONS_DELETED',
                   'CANNOT_DELETE_SESSIONS',
                   'SESSION_EXPIRED',
                   'SESSION_REFRESHED' ],
    ACCOUNT    : [ 'PAYMENT_DONE',
                   'CANNOT_MAKE_PAYMENT',
                   'ACCOUNT_NOT_PAID',
                   'ACCOUNT_NOT_FOUND',
                   'ACCOUNT_CREATED',
                   'DISPLAY_NAME_CHANGED',
                   'CANNOT_CHANGE_DISPLAY_NAME',
                   'PRICING_PLAN_CHANGED',
                   'CANNOT_CHANGE_PRICING_PLAN' ],
    EVENT_LOG  : []
  }
} as const)


type GROUP_KEY = keyof typeof EVENTS.COMMANDS & keyof typeof EVENTS.QUERIES

export const GET_COMMAND_AND_QUERY_EVENTS = (): readonly EVENT_COMMANDS_AND_QUERIES_TYPE[] => {
  const commands = Object.keys(EVENTS.COMMANDS)
                         .map((groupKey) => EVENTS.COMMANDS[groupKey as GROUP_KEY])
                         .flat(Infinity) as EVENT_COMMANDS_TYPE[]

  const queries = Object.keys(EVENTS.QUERIES)
                        .map((groupKey) => EVENTS.QUERIES[groupKey as GROUP_KEY])
                        .flat(Infinity) as EVENT_QUERIES_TYPE[]

  return (
    [ ...commands,
      ...queries ])
}
