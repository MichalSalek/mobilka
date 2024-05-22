import { User }              from './models'




// LOGIN
//
export type REQUEST_DTO_API_V1_USER_LOGIN = Pick<User, 'password' | 'email'>


// REGISTER
//
export type REQUEST_DTO_API_V1_USER_REGISTER = Pick<User, 'email' | 'password' | 'display_name'>


// DELETE
//
export type REQUEST_DTO_API_V1_USER_DELETE = Pick<User, 'password' | 'email' | 'display_name'>


// GET ALL
//
export type RESPONSE_DTO_API_V1_USER_GET_ALL = User[]
