import { EVENT_INFO_TYPE } from '../domain/commands-and-queries/cqrs.types'
import { EventLogType }    from '../models/db-models'




type EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventLogTypes: Record<EventLogType, EVENT_INFO_TYPE[]>
  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => boolean
    GET_EVENT_LOG_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => EventLogType | undefined
  }
}

export const EVENT_LOG_STORE_POLICY: EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventLogTypes: {
    LOGIN_EVENT_LOG  : [ 'USER_LOGGED_IN',
                         'USER_LOGGED_OUT',
                         'CANNOT_LOGIN',
                         'USER_DISABLED_SELF',
                         'USER_ENABLED_SELF',
                         'ALL_SESSIONS_DELETED',
                         'SESSION_EXPIRED',
                         'SESSION_DELETED' ] as const,
    ACCOUNT_EVENT_LOG: [ 'PAYMENT_DONE',
                         'ACCOUNT_CREATED',
                         'DISPLAY_NAME_CHANGED',
                         'USER_DISABLED',
                         'USER_ENABLED',
                         'USER_DELETED',
                         'USER_CREATED',
                         'USER_REGISTERED',
                         'PRICING_PLAN_CHANGED' ] as const
  } as const,

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog) => // EventLog is included in allowedEventLogTypes permission array.
      Boolean(Object.values(EVENT_LOG_STORE_POLICY.allowedEventLogTypes)
                    .find((allowedEventsArr: EVENT_INFO_TYPE[]) => allowedEventsArr.includes(eventLog as EVENT_INFO_TYPE))),

    GET_EVENT_LOG_TYPE_FOR_EVENT_LOG: (eventLog) => {
      // Get event category of a given event log.
      const eventLogTypes = Object.keys(EVENT_LOG_STORE_POLICY.allowedEventLogTypes) as EventLogType[]
      return eventLogTypes.find((eventLogType: EventLogType) => EVENT_LOG_STORE_POLICY.allowedEventLogTypes[eventLogType].includes(eventLog as EVENT_INFO_TYPE))
    }
  } as const

} as const
