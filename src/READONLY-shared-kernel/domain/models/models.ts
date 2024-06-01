import { DateAndTime, IDType } from '../../application/application.types'




export enum Role {
  USER_LEVEL_1 = 'USER_LEVEL_1',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER',
  MASTER_ADMIN = 'MASTER_ADMIN'
}




export type Profile =
  {
    id: IDType
    created_at: DateAndTime
    created_by_user_id: IDType
  }




export enum SessionMode {
  STANDARD = 'STANDARD',
  READ_ONLY = 'READ_ONLY'
}




export type Session =
  {
    created_at: DateAndTime
    session_id: string
    created_by_user_id: IDType
    session_mode: SessionMode
    location?: string
    language?: string
    user_agent?: string
    salt: string
  }

export type User =
  {
    user_id: IDType
    email: string
    display_name: string
    password: string
    role: Role
    created_at: DateAndTime
    is_user_deleted: boolean
    when_was_deleted: DateAndTime
  }

export type UserWithRelations = {
  sessions: Session[]
  profile: Profile
} | User
