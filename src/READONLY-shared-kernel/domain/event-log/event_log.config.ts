import { EVENT_LOG_STORE_POLICY_TYPE } from '../../policies/event_log.policy'




export const allowedEventLogTypes: EVENT_LOG_STORE_POLICY_TYPE['allowedEventLogTypes'] = {
  LOGIN_EVENT_LOG  : [ 'USER_LOGGED_IN',
                       'USER_LOGGED_OUT',
                       'CANNOT_LOGIN',
                       'USER_DISABLED_SELF',
                       'USER_ENABLED_SELF',
                       'ALL_SESSIONS_DELETED',
                       'SESSION_EXPIRED',
                       'SESSION_DELETED' ],
  ACCOUNT_EVENT_LOG: [ 'PAYMENT_DONE',
                       'ACCOUNT_CREATED',
                       'DISPLAY_NAME_CHANGED',
                       'USER_DISABLED',
                       'USER_ENABLED',
                       'USER_DELETED',
                       'USER_CREATED',
                       'USER_REGISTERED',
                       'PRICING_PLAN_CHANGED' ]
} as const
