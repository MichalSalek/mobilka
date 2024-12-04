import { EVENT_INFO_TYPE }      from '../domain/commands-and-queries/cqrs.types'
import { allowedEventLogTypes } from '../domain/event-log/event_log.config'
import { EventLogType }         from '../models/db_models'




export type EVENT_LOG_STORE_POLICY_TYPE = {

  allowedEventLogTypes: Readonly<Record<EventLogType, EVENT_INFO_TYPE[]>>

  utils: {
    GET_PERMISSION_APPROVAL_TO_PUSH_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => boolean
    GET_EVENT_LOG_TYPE_FOR_EVENT_LOG: (eventLog: EVENT_INFO_TYPE | unknown) => EventLogType | undefined
  }
}

export const EVENT_LOG_STORE_POLICY: EVENT_LOG_STORE_POLICY_TYPE = {

  allowedEventLogTypes: Object.freeze(allowedEventLogTypes),

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
