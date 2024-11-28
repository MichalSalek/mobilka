import { EVENT_INFO_TYPE } from '../cqrs/events.types'




type EVENTS_POLICY_TYPE = {
  eventsDisallowedForUI: EVENT_INFO_TYPE[]
  utils: {
    IS_EVENT_DISALLOWED_FOR_UI: (event: EVENT_INFO_TYPE | string | undefined | null) => boolean
  }
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsDisallowedForUI: [ 'SUCCESS' ] as const,

  utils: {
    IS_EVENT_DISALLOWED_FOR_UI: (event) => {
      return !event || EVENTS_POLICY.eventsDisallowedForUI.includes(event as EVENT_INFO_TYPE)
    }
  } as const

} as const
