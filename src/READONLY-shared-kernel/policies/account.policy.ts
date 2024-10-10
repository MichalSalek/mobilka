import { AccountStatus, PaymentStatus, UserNoSensitiveWithRelations } from '../models/models'




type ACCOUNT_POLICY_TYPE = {
  activeAccountStates: (PaymentStatus | AccountStatus)[]


  utils: {
    isUserHasActiveAccount: (user: UserNoSensitiveWithRelations | null | undefined) => boolean

  }
}
export const ACCOUNT_POLICY: ACCOUNT_POLICY_TYPE = {

  activeAccountStates: [ AccountStatus.ACTIVE, AccountStatus.EXPIRING_IN_PROGRESS ],


  utils: {

    isUserHasActiveAccount: (user) =>
      typeof user !== 'undefined'
      && Boolean(user)
      && Boolean(user.account)
      && Boolean(ACCOUNT_POLICY.activeAccountStates.includes(user.account.account_status))
      && Boolean(!user.account.is_deleted)

  }

} as const
