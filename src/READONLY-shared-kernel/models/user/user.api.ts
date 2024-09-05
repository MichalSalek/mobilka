import { UserNoSensitiveWithRelations } from '../models'




export const isUserHasAccount = (user: UserNoSensitiveWithRelations | null | undefined): boolean =>
  user !== null && typeof user !== 'undefined' && Boolean(user.account.id) && Boolean(!user.account.is_deleted)
