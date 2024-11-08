import { IDType }                 from '../../application.types'
import { Account, PaymentStatus } from '../models'
import { CurrentUser }            from '../user/user.types'



// DISPLAY NAME CHANGE
//
export type REQUEST_DTO_API_V1_ACCOUNT_DISPLAY_NAME_CHANGE = Pick<Account, 'display_name'>
export type RESPONSE_DTO_API_V1_ACCOUNT_DISPLAY_NAME_CHANGE = Account


// MAKE PAYMENT
//
export type REQUEST_DTO_API_V1_ACCOUNT_PAYMENT_MAKE =
  Record<'payment_id', IDType>
  & Pick<Account, 'pricing_plan'>
export type RESPONSE_DTO_API_V1_ACCOUNT_PAYMENT_MAKE = CurrentUser


// GET PAYMENT STATUS
//
export type RESPONSE_DTO_API_V1_ACCOUNT_PAYMENT_GET_STATUS = PaymentStatus
