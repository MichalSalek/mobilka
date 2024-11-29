import { EVENT_INFO_TYPE } from '../cqrs/events.types'




export type InfoEventWithPayloadDTO<DataPayload = unknown> = {
  event: EVENT_INFO_TYPE
  data: DataPayload
}



export type HTTPError<ErrorPayload> = InfoEventWithPayloadDTO<ErrorPayload | undefined>

export type HTTPSuccess<ResPayload> = InfoEventWithPayloadDTO<ResPayload>



export type HTTPErrorCallback<ErrorPayload> = (error: HTTPError<ErrorPayload>) => void

export type HTTPSuccessCallback<ResPayload> = (response: HTTPSuccess<ResPayload>) => void



export type DetailedErrorGeneric = {
  __general: string
}

export type DetailedErrorPayload<DetailedErrorDTO> = Record<keyof DetailedErrorDTO, string> & DetailedErrorGeneric