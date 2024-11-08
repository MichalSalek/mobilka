import { EVENT_LOGS_TYPE } from '../cqrs/events.config'
import { EventType }       from '../models/models'




type EVENT_LOG_STORE_POLICY_TYPE = {
  allowedEventTypes: Record<EventType, EVENT_LOGS_TYPE[]>
  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => boolean
    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_LOGS_TYPE | unknown) => EventType | undefined
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
                         'USER_DELETED',
                         'USER_CREATED',
                         'ALL_SESSIONS_DELETED',
                         'PRICING_PLAN_CHANGED' ] as const
  },

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog) => // EventLog is included in allowedEventLogs permission array.
      Boolean(Object.values(EVENT_LOG_STORE_POLICY.allowedEventTypes)
                    .find((allowedEventsArr: EVENT_LOGS_TYPE[]) => allowedEventsArr.includes(eventLog as EVENT_LOGS_TYPE))),

    GET_EVENT_TYPE_FOR_EVENT_LOG: (eventLog) => {
      // Get event category of a given event log.
      const eventTypes = Object.keys(EVENT_LOG_STORE_POLICY.allowedEventTypes) as EventType[]
      return eventTypes.find((eventType: EventType) => EVENT_LOG_STORE_POLICY.allowedEventTypes[eventType].includes(
        eventLog as EVENT_LOGS_TYPE))
    }
  }

} as const
