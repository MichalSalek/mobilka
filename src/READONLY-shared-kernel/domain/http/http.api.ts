import { EVENT_INFO_TYPE }         from '../commands-and-queries/cqrs.types'
import { HTTPStatus }              from './http.config'
import { InfoEventWithPayloadDTO } from './http.types'




export const getValidatedStatusCode = (statusCode: HTTPStatus): HTTPStatus => statusCode


export const getInfoEventWithPayloadDTO = <DataPayload>(
  event: EVENT_INFO_TYPE,
  data: DataPayload): InfoEventWithPayloadDTO<DataPayload> => (
  {
    event,
    data
  })
