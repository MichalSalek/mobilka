import { IDType }                    from '../../application.types'
import { IOClientFunctionReqResErr } from '../../http/http.client.types'
import { DetailedErrorPayload }      from '../../http/http.types'
import { Account, PaymentStatus }    from '../db-models'
import { CurrentUser, UserMetadata } from '../user/user.types'




export type ACCOUNT_DTO_API_V1 = {

  DISPLAY_NAME_CHANGE: {
    REQUEST: Pick<Account, 'display_name'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST'], keyof UserMetadata>
    RESPONSE: Account
    RESPONSE_ERROR: DetailedErrorPayload<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST'], ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE'], ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE_ERROR']>
  },

  MAKE_PAYMENT: {
    REQUEST: Record<'payment_id', IDType> & Pick<Account, 'pricing_plan'>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['REQUEST'], ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE'], ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE_ERROR']>
  },

  GET_STATUS: {
    REQUEST: undefined
    RESPONSE: PaymentStatus
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<ACCOUNT_DTO_API_V1['GET_STATUS']['REQUEST'], ACCOUNT_DTO_API_V1['GET_STATUS']['RESPONSE'], ACCOUNT_DTO_API_V1['GET_STATUS']['RESPONSE_ERROR']>
  }
}
