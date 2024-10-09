import { AccountStatus, PaymentStatus, UserNoSensitiveWithRelations } from '../models/models'




type ACCOUNT_POLICY_TYPE = {
  activeAccountStates: (PaymentStatus | AccountStatus)[]


  utils: {
    isUserHasActiveAccount: (user: UserNoSensitiveWithRelations | null | undefined) => boolean

  }
}
export const ACCOUNT_POLICY: ACCOUNT_POLICY_TYPE = {

  activeAccountStates: [ PaymentStatus.PAID, AccountStatus.ACTIVE, AccountStatus.EXPIRING_IN_PROGRESS ],


  utils: {

    isUserHasActiveAccount: (user) =>
      user !== null
      && typeof user !== 'undefined'
      && user !== null
      && Boolean(ACCOUNT_POLICY.activeAccountStates.includes(user.account.payment_status))
      && Boolean(ACCOUNT_POLICY.activeAccountStates.includes(user.account.account_status))
      && Boolean(!user.account.is_deleted)

  }

} as const
