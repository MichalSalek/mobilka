import { Session } from '../models'


// DELETE
//
export type REQUEST_DTO_API_V1_SESSION_DELETE_SPECIFIC = Pick<Session, 'session_id'>


// GET ALL
//
export type RESPONSE_DTO_API_V1_SESSION_GET_ALL = Session[]
