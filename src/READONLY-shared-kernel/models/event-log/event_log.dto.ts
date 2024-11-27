import { IOClientFunctionReqResErr } from '../../http/http.client.types'
import { DetailedErrorPayload } from '../../http/http.types'
import { EventLog, EventType }  from '../db-models'




export type EVENT_LOG_DTO_API_V1 = {

  GET_ALL: {
    REQUEST: Record<'type', EventType>
    RESPONSE: EventLog[]
    RESPONSE_ERROR: DetailedErrorPayload<EVENT_LOG_DTO_API_V1['GET_ALL']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<EVENT_LOG_DTO_API_V1['GET_ALL']['REQUEST'], EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE'], EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },

}
