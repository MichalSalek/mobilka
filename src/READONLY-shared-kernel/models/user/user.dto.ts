import { User, UserNoSensitiveWithRelations } from '../models'
import { UserMetadata } from './user.types'




// LOGIN
//
export type REQUEST_DTO_API_V1_USER_LOGIN = Pick<User, 'password' | 'email'>
export type REQUEST_DTO_API_V1_USER_LOGIN_EXTRA_DATA = UserMetadata
export type REQUEST_DTO_API_V1_USER_LOGIN_WITH_EXTRA_DATA = REQUEST_DTO_API_V1_USER_LOGIN & REQUEST_DTO_API_V1_USER_LOGIN_EXTRA_DATA

// CREATE
//
export type REQUEST_DTO_API_V1_USER_CREATE = Pick<User, 'password' | 'email' | 'display_name'>
export type REQUEST_DTO_API_V1_USER_CREATE_EXTRA_DATA = UserMetadata
export type REQUEST_DTO_API_V1_USER_CREATE_WITH_EXTRA_DATA = REQUEST_DTO_API_V1_USER_CREATE & REQUEST_DTO_API_V1_USER_CREATE_EXTRA_DATA

// DELETE
//
export type REQUEST_DTO_API_V1_USER_DELETE = Pick<User, 'password' | 'email'>

// GET ALL
//
export type RESPONSE_DTO_API_V1_USER_GET_ALL = UserNoSensitiveWithRelations[]

// GET CURRENT
//
export type RESPONSE_DTO_API_V1_USER_GET_CURRENT = UserNoSensitiveWithRelations
