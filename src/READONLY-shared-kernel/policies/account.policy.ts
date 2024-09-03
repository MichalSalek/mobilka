import { PaymentStatus, UserNoSensitiveWithRelations } from '../models/models'




type ACCOUNT_POLICY_TYPE = {
  activeAccountStates: PaymentStatus[]


  utils: {
    isUserHasActiveAccount: (user: UserNoSensitiveWithRelations | null | undefined) => boolean

  }
}
export const ACCOUNT_POLICY: ACCOUNT_POLICY_TYPE = {

  activeAccountStates: [ PaymentStatus.PAID, PaymentStatus.EXPIRING ],


  utils: {

    isUserHasActiveAccount: (user) =>
      user !== null &&
      typeof user !== 'undefined'
      && Boolean(ACCOUNT_POLICY.activeAccountStates.includes(user.account.payment_status))
      && Boolean(!user.account.is_deleted)

  }

} as const
