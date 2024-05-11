import { HTTPMessageDTO } from '../../application/http/http.api'




export type UserModel =
  { username: string, email: string, name: string | null, password: string }

/// LOGIN
///
export type REQUEST_DTO_API_V1_USER_LOGIN = {
  data: {
    email: string
    password: string
  }
}
export type RESPONSE_DTO_API_V1_USER_LOGIN = HTTPMessageDTO


/// REGISTER
///
export type REQUEST_DTO_API_V1_USER_REGISTER = {
  data: UserModel
}
export type RESPONSE_DTO_API_V1_USER_REGISTER = HTTPMessageDTO


/// DELETE
///
export type REQUEST_DTO_API_V1_USER_DELETE = {
  data: UserModel
}
export type RESPONSE_DTO_API_V1_USER_DELETE = HTTPMessageDTO
