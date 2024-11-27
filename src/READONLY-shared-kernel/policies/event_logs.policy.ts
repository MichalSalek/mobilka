import { EVENT_INFO_TYPE } from '../cqrs/events.types'
import { EventType }       from '../models/db-models'




type EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventTypes: Record<EventType, EVENT_INFO_TYPE[]>
  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => boolean
    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => EventType | undefined
  }
}

export const EVENT_LOG_STORE_POLICY: EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventTypes: {
    LOGIN_EVENT_LOG  : [ 'USER_LOGGED_IN',
                         'USER_LOGGED_OUT',
                         'CANNOT_LOGIN',
                         'SESSION_DELETED' ] as const,
    ACCOUNT_EVENT_LOG: [ 'PAYMENT_DONE',
                         'DISPLAY_NAME_CHANGED',
                         'USER_DISABLED',
                         'USER_ENABLED',
                         'USER_DELETED',
                         'USER_CREATED',
                         'USER_REGISTERED',
                         'ALL_SESSIONS_DELETED',
                         'PRICING_PLAN_CHANGED' ] as const
  } as const,

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog) => // EventLog is included in allowedEventLogs permission array.
      Boolean(Object.values(EVENT_LOG_STORE_POLICY.allowedEventTypes)
                    .find((allowedEventsArr: EVENT_INFO_TYPE[]) => allowedEventsArr.includes(eventLog as EVENT_INFO_TYPE))),

    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog) => {
      // Get event category of a given event log.
      const eventTypes = Object.keys(EVENT_LOG_STORE_POLICY.allowedEventTypes) as EventType[]
      return eventTypes.find((eventType: EventType) => EVENT_LOG_STORE_POLICY.allowedEventTypes[eventType].includes(eventLog as EVENT_INFO_TYPE))
    }
  } as const

} as const
