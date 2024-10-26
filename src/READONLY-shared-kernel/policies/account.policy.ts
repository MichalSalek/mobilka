import { AccountStatus, PaymentStatus, Role, UserNoSensitiveWithRelations } from '../models/models'




type ACCOUNT_POLICY_TYPE = {
  activeAccountStates: (PaymentStatus | AccountStatus)[]

  utils: {
    IS_USER_HAS_ACTIVE_ACCOUNT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
    NEED_TO_PAY_TO_START_STATEMENT: (user: UserNoSensitiveWithRelations | null | undefined) => boolean
  }
}
export const ACCOUNT_POLICY: ACCOUNT_POLICY_TYPE = {

  activeAccountStates: [ AccountStatus.ACTIVE, AccountStatus.EXPIRING_IN_PROGRESS ],


  utils: {

    IS_USER_HAS_ACTIVE_ACCOUNT: (user) =>
      typeof user !== 'undefined'
      && !!user
      && Boolean(user.account)
      && Boolean(user.role === Role.ACCOUNT_HOLDER_ACTIVE || user.role === Role.MASTER_ADMIN)
      && Boolean(ACCOUNT_POLICY.activeAccountStates.includes(user.account.account_status))
      && Boolean(!user.account.is_deleted),

    NEED_TO_PAY_TO_START_STATEMENT: (user) =>
      user?.account?.account_status === 'NOT_ACTIVE'
      && user.account.payment_status === 'UNPAID'
  }

} as const
