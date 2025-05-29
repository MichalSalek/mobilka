import { AccountStatusValue } from '../../models/db_models'
import { USER_POLICY_TYPE }   from '../../policies/user.policy'




export const activeAccountStates: USER_POLICY_TYPE['activeAccountStates'] = [ AccountStatusValue.ACTIVE,
                                                                              AccountStatusValue.EXPIRING_IN_PROGRESS ] as const
