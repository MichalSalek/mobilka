import { IOClientFunctionReqResErr } from '../../http/http.client.types'
import { DetailedErrorPayload }      from '../../http/http.types'




export type ADMIN_DTO_API_V1 = {

  SWITCH_BACKEND_DEBUG_MODE: {
    REQUEST: undefined
    RESPONSE: 'enabled' | 'disabled'
    RESPONSE_ERROR: DetailedErrorPayload<ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['REQUEST'], ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE'], ADMIN_DTO_API_V1['SWITCH_BACKEND_DEBUG_MODE']['RESPONSE_ERROR']>
  },

}
