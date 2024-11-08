import { DateAndTime, IDType } from '../application.types'
import { PricingPlanValues }   from '../policies/pricing.policy'




export const enum Role {
  NOT_LOGGED_IN           = 'NOT_LOGGED_IN',
  USER_LEVEL_1            = 'USER_LEVEL_1',
  ACCOUNT_HOLDER_ACTIVE   = 'ACCOUNT_HOLDER_ACTIVE',
  ACCOUNT_HOLDER_INACTIVE = 'ACCOUNT_HOLDER_INACTIVE',
  MASTER_ADMIN            = 'MASTER_ADMIN'
}




export const enum PaymentStatus {
  UNPAID              = 'UNPAID',
  PAID                = 'PAID',
  PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS',
  REJECTED            = 'REJECTED',
}




export const enum AccountStatus {
  ACTIVE               = 'ACTIVE',
  NOT_ACTIVE           = 'NOT_ACTIVE',
  EXPIRING_IN_PROGRESS = 'EXPIRING_IN_PROGRESS',
  EXPIRED              = 'EXPIRED',
}




export const ALL_LOGGED_ROLES_COLLECTION: Role[] = [
  Role.USER_LEVEL_1,
  Role.ACCOUNT_HOLDER_ACTIVE,
  Role.ACCOUNT_HOLDER_INACTIVE,
  Role.MASTER_ADMIN
]



type DateAndTimePartial = {
  created_at: DateAndTime
}

type DeletedModelPartial = {
  is_deleted: boolean
  when_was_deleted: DateAndTime | null
}

type UserMetadataPartial = {
  client_ip: string | null
  location: string | null
  language: string | null
  user_agent: string | null
}




export const enum EventType {
  ACCOUNT_EVENT_LOG = 'ACCOUNT_EVENT_LOG', LOGIN_EVENT_LOG = 'LOGIN_EVENT_LOG'
}




export type EventLog = {
  id: IDType
  created_by_user_id: IDType
  created_at: DateAndTime
  event: string
  event_type: EventType
  event_payload: string | null
} & UserMetadataPartial

export type EventLogNoMetadata = Omit<EventLog, 'id' | 'created_at'>


export type Account = {
  id: IDType
  created_by_user_id: IDType
  display_name: string | null
  pricing_plan: PricingPlanValues | null
  payment_status: PaymentStatus
  upcoming_payment_date: DateAndTime | null
  account_status: AccountStatus
  account_expiration_date: DateAndTime | null

} & DateAndTimePartial & DeletedModelPartial




export const enum SessionMode {
  STANDARD = 'STANDARD', READ_ONLY = 'READ_ONLY'
}




export type Session = {
  session_id: string
  created_by_user_id: IDType
  session_mode: SessionMode
  last_used: DateAndTime | null
  expires_at: DateAndTime
} & DateAndTimePartial & UserMetadataPartial

export type User = {
  user_id: IDType
  email: string
  display_name: string
  password: string
  role: Role

} & DateAndTimePartial & DeletedModelPartial

export type UserNoSensitive = Omit<User, 'password'>

export type UserRelations = {
  sessions: Session[]
  account: Account
  // event_logs: EventLog[] - exists, but do not want it with user always.
}

export type UserWithRelations = UserRelations & User

export type UserNoSensitiveWithRelations = UserRelations & UserNoSensitive
