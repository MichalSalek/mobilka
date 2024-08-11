import { DateAndTime, IDType } from '../application.types'




export const enum Role {
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
  USER_LEVEL_1 = 'USER_LEVEL_1',
  ACCOUNT_HOLDER = 'ACCOUNT_HOLDER',
  MASTER_ADMIN = 'MASTER_ADMIN'
}




export const enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
}




export const ALL_ROLES_COLLECTION: Role[] = [ Role.USER_LEVEL_1, Role.ACCOUNT_HOLDER, Role.MASTER_ADMIN ]



type DateAndTimePartial =
  {
    created_at: DateAndTime
  }

type DeletedModelPartial =
  {
    is_deleted: boolean
    when_was_deleted: DateAndTime | null
  }

type UserMetadataPartial =
  {
    client_ip: string | null
    location: string | null
    language: string | null
    user_agent: string | null
  }




export const enum EventType {
  ACCOUNT_EVENT_LOG = 'ACCOUNT_EVENT_LOG',
  LOGIN_EVENT_LOG = 'LOGIN_EVENT_LOG'
}




export type EventLog =
  {
    id: IDType
    created_by_user_id: IDType
    created_at: DateAndTime
    event: string
    event_type: EventType
  } & UserMetadataPartial

export type EventLogNoMetadata = Omit<EventLog, 'id' | 'created_at'>


export type Account =
  {
    id: IDType
    created_by_user_id: IDType
    display_name: string
    payment_status: PaymentStatus
  } & DateAndTimePartial & DeletedModelPartial




export const enum SessionMode {
  STANDARD = 'STANDARD',
  READ_ONLY = 'READ_ONLY'
}




export type Session =
  {
    session_id: string
    created_by_user_id: IDType
    session_mode: SessionMode
    salt: string
    last_used: DateAndTime
    is_active: boolean | null
  } & DateAndTimePartial & UserMetadataPartial

export type User =
  {
    user_id: IDType
    email: string
    display_name: string
    password: string
    role: Role
    account_id: IDType | null
    has_account: boolean

  } & DateAndTimePartial & DeletedModelPartial

export type UserNoSensitive = Omit<User, 'password'>

export type UserRelations =
  {
    sessions: Session[]
    account: Account
    event_logs: EventLog[]
  }

export type UserWithRelations = UserRelations | User

export type UserNoSensitiveWithRelations = UserRelations | UserNoSensitive
