import { IOClientFunctionReqResErr } from '../../http/http.client.types'
import { DetailedErrorPayload }      from '../../http/http.types'
import { Session }                   from '../models'
import { CurrentUser }               from '../user/user.types'




export type SESSION_DTO_API_V1 = {

  DELETE_EXACTLY: {
    REQUEST: Pick<Session, 'session_id'>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<SESSION_DTO_API_V1['DELETE_EXACTLY']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['DELETE_EXACTLY']['REQUEST'], SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>
  },

  DELETE_ALL: {
    REQUEST: undefined
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<SESSION_DTO_API_V1['DELETE_ALL']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['DELETE_ALL']['REQUEST'], SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE'], SESSION_DTO_API_V1['DELETE_ALL']['RESPONSE_ERROR']>
  },

  GET_ALL: {
    REQUEST: undefined
    RESPONSE: Session[]
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['GET_ALL']['REQUEST'], SESSION_DTO_API_V1['GET_ALL']['RESPONSE'], SESSION_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },

  REFRESH: {
    REQUEST: undefined
    RESPONSE: Session['expires_at']
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['REFRESH']['REQUEST'], SESSION_DTO_API_V1['REFRESH']['RESPONSE'], SESSION_DTO_API_V1['REFRESH']['RESPONSE_ERROR']>
  },

  CHECK: {
    REQUEST: undefined
    RESPONSE: CurrentUser | undefined
    RESPONSE_ERROR: null
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<SESSION_DTO_API_V1['CHECK']['REQUEST'], SESSION_DTO_API_V1['CHECK']['RESPONSE'], SESSION_DTO_API_V1['CHECK']['RESPONSE_ERROR']>
  },

}
