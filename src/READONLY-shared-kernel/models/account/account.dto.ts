import { Account, PaymentStatus, UserNoSensitiveWithRelations } from '../models'
import { IDType } from '../../application.types'


// DISPLAY NAME CHANGE
//
export type REQUEST_DTO_API_V1_ACCOUNT_DISPLAY_NAME_CHANGE = Pick<Account, 'display_name' >
export type RESPONSE_DTO_API_V1_ACCOUNT_DISPLAY_NAME_CHANGE = Account



// MAKE PAYMENT
//
export type REQUEST_DTO_API_V1_ACCOUNT_PAYMENT_MAKE = Record<'payment_id', IDType> & Pick<Account, 'pricing_plan' >
export type RESPONSE_DTO_API_V1_ACCOUNT_PAYMENT_MAKE = UserNoSensitiveWithRelations


// GET PAYMENT STATUS
//
export type RESPONSE_DTO_API_V1_ACCOUNT_PAYMENT_GET_STATUS = PaymentStatus
