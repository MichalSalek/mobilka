import { DateAndTime, IDType } from '../application.types'




export const enum Role {
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
  USER_LEVEL_1 = 'USER_LEVEL_1',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER',
  MASTER_ADMIN = 'MASTER_ADMIN'
}




export const ALL_ROLES_COLLECTION = [ Role.USER_LEVEL_1, Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ]



type DateAndTimeMeta = {
  created_at: DateAndTime
  updated_at: DateAndTime | null
}

type ShallowDeletedModelsMeta = {
  is_deleted: boolean
  when_was_deleted: DateAndTime | null
}


export type Profile =
  {
    id: IDType
    created_by_user_id: IDType

  } & DateAndTimeMeta & ShallowDeletedModelsMeta




export const enum SessionMode {
  STANDARD = 'STANDARD',
  READ_ONLY = 'READ_ONLY'
}




export type Session =
  {
    session_id: string
    created_by_user_id: IDType
    session_mode: SessionMode
    location: string | null
    language: string | null
    user_agent: string | null
    salt: string
    last_used: DateAndTime
  } & DateAndTimeMeta

export type User =
  {
    user_id: IDType
    email: string
    display_name: string
    password: string
    role: Role

  } & DateAndTimeMeta & ShallowDeletedModelsMeta

export type UserClientSafe = Omit<User, 'password'>

export type UserRelations =
  {
    sessions: Session[]
    profile: Profile
  }

export type UserWithRelations = UserRelations | User

export type UserClientSafeWithRelations = UserRelations | UserClientSafe
