import { Account } from '../models'





// CREATE
//
export type REQUEST_DTO_API_V1_ACCOUNT_CREATE = Pick<Account, 'pricing_plan' | 'display_name' >
