import { activeAccountStates }            from '../domain/user-and-account/user_and_account.config'
import { AccountStatus, UserNoSensitive } from '../models/db_models'
import { UserNoSensitiveWithRelations }   from '../models/user/user.types'




export type USER_POLICY_TYPE = {

  activeAccountStates: Readonly<AccountStatus[]>

  utils: {
    IS_USER_HAS_ACTIVE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
    IS_USER_NEED_TO_PAY_TO_ACTIVATE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
    IS_USER_ACTIVE: (user: UserNoSensitive | UserNoSensitiveWithRelations | null | undefined) => boolean
    CAN_USER_HAVE_ACTIVE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
  }
}
export const USER_POLICY: USER_POLICY_TYPE = {

  activeAccountStates: Object.freeze(activeAccountStates),

  utils: {
    IS_USER_HAS_ACTIVE_ACCOUNT: (user) => {
      return typeof user
        !== 'undefined'
        && !!user
        && Boolean(user.account)
        && Boolean(USER_POLICY.activeAccountStates.includes(user.account.account_status))
    },

    IS_USER_NEED_TO_PAY_TO_ACTIVATE_ACCOUNT: (user) => {
      return user?.account?.account_status === 'NOT_ACTIVE' && user.account.payment_status === 'UNPAID'
    },


    IS_USER_ACTIVE: (user) => {
      return Boolean(user?.is_active)
    },

    CAN_USER_HAVE_ACTIVE_ACCOUNT: (user) => {
      return user?.account?.payment_status === 'PAID'
    }
  }

} as const
