import { AccountStatus, AccountStatusValue, UserNoSensitive, UserNoSensitiveWithRelations } from '../models/models'




type USER_POLICY_TYPE = {
  activeAccountStates: AccountStatus[]

  utils: {
    IS_USER_HAS_ACTIVE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
    IS_USER_NEED_TO_PAY_TO_ACTIVATE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
    IS_USER_ACTIVE: (user: UserNoSensitive | UserNoSensitiveWithRelations | null | undefined) => boolean
  }
}
export const USER_POLICY: USER_POLICY_TYPE = {

  activeAccountStates: [ AccountStatusValue.ACTIVE,
                         AccountStatusValue.EXPIRING_IN_PROGRESS ],


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
    }
  }

} as const
