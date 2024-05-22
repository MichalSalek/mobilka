import { DateAndTime, IDType } from '../../application/application.types'




export enum Role {
  USER_LEVEL_1 = 'USER_LEVEL_1',
  USER_LEVEL_2 = 'USER_LEVEL_2',
  USER_LEVEL_3 = 'USER_LEVEL_3',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER',
  MASTER_ADMIN = 'MASTER_ADMIN'
}




export type Profile =
  {
    created_at: DateAndTime
    profile_id: IDType
    created_by_user: User
    created_by_user_id: number
  }




export enum SessionMode {
  STANDARD = 'STANDARD',
  READ_ONLY = 'READ_ONLY'
}




export type Session =
  {
    created_at: DateAndTime
    session_id: IDType
    created_by_user: User
    created_by_user_id: number
    session_mode: SessionMode
  }

export type UserMetadata =
  {
    id: IDType
    user: User
    user_id: number
    created_at: DateAndTime
    is_user_deleted: boolean
    when_was_deleted: DateAndTime
  }

export type User =
  {
    metadata: UserMetadata
    user_id: IDType
    email: string
    display_name: string
    password: string
    role: Role
    sessions: Session[]
    profile: Profile
  }
