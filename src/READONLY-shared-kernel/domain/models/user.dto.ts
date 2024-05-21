import { UserModel } from './user.model'




// LOGIN
//
export type REQUEST_DTO_API_V1_USER_LOGIN = {
  email: UserModel['email']
  password: UserModel['password']
}


// REGISTER
//
export type REQUEST_DTO_API_V1_USER_REGISTER = UserModel


// DELETE
//
export type REQUEST_DTO_API_V1_USER_DELETE = UserModel


// GET ALL
//
export type RESPONSE_DTO_API_V1_USER_GET_ALL = UserModel[]
