import { UserNoSensitiveWithRelations } from '../models'




export const isUserHasAccount = (user: UserNoSensitiveWithRelations | null | undefined): boolean =>
  Boolean(user.account_id) && Boolean(!user.account.is_deleted)
