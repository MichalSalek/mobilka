import { EVENT_LOGS_TYPE }                from '../cqrs/events.config'
import { HTTPStatus }                     from './http.config'
import { ApplicationEventWithPayloadDTO } from './http.types'




export const getValidatedStatusCode = (statusCode: HTTPStatus): HTTPStatus => statusCode


export const getApplicationEventWithPayloadDTO = <T = unknown>(event?: EVENT_LOGS_TYPE, data?: T): ApplicationEventWithPayloadDTO<T> => ({
  event,
  data
})
