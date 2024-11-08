import { Session }     from '../models'
import { CurrentUser } from '../user/user.types'


// DELETE
//
export type REQUEST_DTO_API_V1_SESSION_DELETE_SPECIFIC = Pick<Session, 'session_id'>


// GET ALL
//
export type RESPONSE_DTO_API_V1_SESSION_GET_ALL = Session[]


// REFRESH
//
export type RESPONSE_DTO_API_V1_SESSION_REFRESH = Session['expires_at']


// CHECK
//
export type RESPONSE_DTO_API_V1_SESSION_CHECK = CurrentUser | undefined
