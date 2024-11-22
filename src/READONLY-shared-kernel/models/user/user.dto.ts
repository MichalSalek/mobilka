import { IOClientFunctionReqResErr }                           from '../../http/http.client.types'
import { DetailedErrorPayload }                                from '../../http/http.types'
import { User, UserNoSensitive, UserNoSensitiveWithRelations } from '../models'
import { CurrentUser, UserMetadata }                           from './user.types'




export type USER_DTO_API_V1 = {

  LOGIN: {
    REQUEST: Pick<User, 'password' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['LOGIN']['REQUEST'], keyof UserMetadata>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['LOGIN']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['LOGIN']['REQUEST_REQUIRED_ONLY'], USER_DTO_API_V1['LOGIN']['RESPONSE'], USER_DTO_API_V1['LOGIN']['RESPONSE_ERROR']>
  },

  REGISTER: {
    REQUEST: Pick<User, 'password' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['REGISTER']['REQUEST'], keyof UserMetadata>
    RESPONSE: CurrentUser
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['REGISTER']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['REGISTER']['REQUEST_REQUIRED_ONLY'], USER_DTO_API_V1['REGISTER']['RESPONSE'], USER_DTO_API_V1['REGISTER']['RESPONSE_ERROR']>
  },

  CREATE: {
    REQUEST: Pick<User, 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['CREATE']['REQUEST'], keyof UserMetadata>
    RESPONSE: UserNoSensitive
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['CREATE']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['CREATE']['REQUEST_REQUIRED_ONLY'], USER_DTO_API_V1['CREATE']['RESPONSE'], USER_DTO_API_V1['CREATE']['RESPONSE_ERROR']>
  },

  LOGOUT: {
    REQUEST: UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['LOGOUT']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['LOGOUT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['LOGOUT']['REQUEST_REQUIRED_ONLY'], USER_DTO_API_V1['LOGOUT']['RESPONSE'], USER_DTO_API_V1['LOGOUT']['RESPONSE_ERROR']>
  },

  DISABLE_SELF: {
    REQUEST: Pick<User, 'password'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['DISABLE_SELF']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DISABLE_SELF']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DISABLE_SELF']['REQUEST'], USER_DTO_API_V1['DISABLE_SELF']['RESPONSE'], USER_DTO_API_V1['DISABLE_SELF']['RESPONSE_ERROR']>
  },


  DISABLE_ANY: {
    REQUEST: Pick<User, 'user_id' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['DISABLE_ANY']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DISABLE_ANY']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DISABLE_ANY']['REQUEST'], USER_DTO_API_V1['DISABLE_ANY']['RESPONSE'], USER_DTO_API_V1['DISABLE_ANY']['RESPONSE_ERROR']>
  },


  ENABLE_ANY: {
    REQUEST: Pick<User, 'user_id' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['ENABLE_ANY']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['ENABLE_ANY']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['ENABLE_ANY']['REQUEST'], USER_DTO_API_V1['ENABLE_ANY']['RESPONSE'], USER_DTO_API_V1['ENABLE_ANY']['RESPONSE_ERROR']>
  },

  DELETE_SELF: {
    REQUEST: Pick<User, 'password'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['DELETE_SELF']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DELETE_SELF']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DELETE_SELF']['REQUEST'], USER_DTO_API_V1['DELETE_SELF']['RESPONSE'], USER_DTO_API_V1['DELETE_SELF']['RESPONSE_ERROR']>
  },

  DELETE_EXACTLY: {
    REQUEST: Pick<User, 'user_id' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST'], USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE'], USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR']>
  },

  DELETE_ANY: {
    REQUEST: Pick<User, 'user_id' | 'email'> & UserMetadata
    REQUEST_REQUIRED_ONLY: Omit<USER_DTO_API_V1['DELETE_ANY']['REQUEST'], keyof UserMetadata>
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<USER_DTO_API_V1['DELETE_ANY']['REQUEST_REQUIRED_ONLY']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['DELETE_ANY']['REQUEST'], USER_DTO_API_V1['DELETE_ANY']['RESPONSE'], USER_DTO_API_V1['DELETE_ANY']['RESPONSE_ERROR']>
  },

  GET_ALL: {
    REQUEST: undefined
    RESPONSE: UserNoSensitiveWithRelations[]
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['GET_ALL']['REQUEST'], USER_DTO_API_V1['GET_ALL']['RESPONSE'], USER_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },

  GET_CURRENT: {
    REQUEST: undefined
    RESPONSE: CurrentUser
    RESPONSE_ERROR: unknown
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<USER_DTO_API_V1['GET_CURRENT']['REQUEST'], USER_DTO_API_V1['GET_CURRENT']['RESPONSE'], USER_DTO_API_V1['GET_CURRENT']['RESPONSE_ERROR']>
  }
}
