import { EVENT_LOGS_TYPE } from '../cqrs/events.config'


export type ApplicationEventWithPayloadDTO <T = undefined> = {
  event: EVENT_LOGS_TYPE
  data?: T
}


export type DetailedErrorsRecord = Record<string, string>
// e.g.:
// {
//   keywords: [
//     {error_text: 'Keyword already exists for country and language', collection: ['some phrase']}
//   ]
// }


export type ErrorDTO = ApplicationEventWithPayloadDTO<DetailedErrorsRecord>

export type SuccessWrapperAppInputDTO<T = undefined> = Partial<ApplicationEventWithPayloadDTO<T>>
