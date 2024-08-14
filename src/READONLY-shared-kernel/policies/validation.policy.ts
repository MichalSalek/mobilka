import { REQUEST_DTO_API_V1_ACCOUNT_CREATE }                                                             from '../models/account/account.dto'
import { REQUEST_DTO_API_V1_SESSION_DELETE_SPECIFIC }                                                    from '../models/session/session.dto'
import { REQUEST_DTO_API_V1_USER_CREATE, REQUEST_DTO_API_V1_USER_DELETE, REQUEST_DTO_API_V1_USER_LOGIN } from '../models/user/user.dto'




export type GenericValidationResult = { __isValid: boolean }

export type ValidationFunction<T> = ((data: T) => GenericValidationResult & unknown)

const isValidReturnObject = (obj: GenericValidationResult & unknown) =>
  Object.keys(obj).every((objKey) => {
    const key = objKey as keyof GenericValidationResult
    if (objKey === '__isValid') return true
    return !obj[key]
  })



export type ValidateUserCreateDataResult = Partial<REQUEST_DTO_API_V1_USER_CREATE> & GenericValidationResult

export type ValidateUserLoginDataResult = Partial<REQUEST_DTO_API_V1_USER_LOGIN> & GenericValidationResult

export type ValidateUserDeleteDataResult = Partial<REQUEST_DTO_API_V1_USER_DELETE> & GenericValidationResult

export type ValidateSessionDeleteDataResult = Partial<REQUEST_DTO_API_V1_SESSION_DELETE_SPECIFIC> & GenericValidationResult

export type ValidateAccountCreateDataResult = Partial<REQUEST_DTO_API_V1_ACCOUNT_CREATE> & GenericValidationResult


export const VALIDATION_POLICY = {

  atoms: {

    validateEmail: (value: string | undefined) => {
      if (!value) return false
      const reg = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/
      return !!value.match(reg)
    },

    validateByMinLength: (value: string | undefined, minLength: number = 3): boolean => {
      if (!value) return false
      return value.length >= minLength
    },

    validateByWhiteSpaces: (value: string | undefined): boolean => {
      if (!value) return false
      const reg = /\s+/g
      return !value.match(reg)
    }
  },


  molecules: {

    validateUserCreateData: (data: REQUEST_DTO_API_V1_USER_CREATE): ValidateUserCreateDataResult => {

      const returnObject: ValidateUserCreateDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }

      if (!VALIDATION_POLICY.atoms.validateEmail(data?.email))
        returnObject.email += 'Check and enter correct email address. '

      if (!VALIDATION_POLICY.atoms.validateByWhiteSpaces(data?.email))
        returnObject.email += 'Remove spaces from email. '

      if (!VALIDATION_POLICY.atoms.validateByMinLength(data?.password, 6))
        returnObject.password += 'Choose a more secure password - at least 6 characters. '

      returnObject.__isValid = isValidReturnObject(returnObject)
      return returnObject
    },



    validateUserLoginData: (data: REQUEST_DTO_API_V1_USER_LOGIN): ValidateUserLoginDataResult => {

      const returnObject: ValidateUserLoginDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }

      if (!data.email)
        returnObject.email += 'Enter email. '

      if (!data.password)
        returnObject.password += 'Enter password. '

      returnObject.__isValid = isValidReturnObject(returnObject)
      return returnObject
    },


    validateDeleteUserData: (data: REQUEST_DTO_API_V1_USER_DELETE): ValidateUserDeleteDataResult => {

      const returnObject: ValidateUserDeleteDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }

      if (!data.email)
        returnObject.email += 'Enter email. '

      if (!data.password)
        returnObject.password += 'Enter password. '

      returnObject.__isValid = isValidReturnObject(returnObject)
      return returnObject
    },


    validateDeleteSessionData: (data: REQUEST_DTO_API_V1_SESSION_DELETE_SPECIFIC): ValidateUserDeleteDataResult => {

      const returnObject: ValidateSessionDeleteDataResult = {
        __isValid : false,
        session_id: ''
      }

      if (!data.session_id)
        returnObject.session_id += 'Missing session ID. '

      returnObject.__isValid = isValidReturnObject(returnObject)
      return returnObject
    },


    validateAccountCreateData: (data: REQUEST_DTO_API_V1_ACCOUNT_CREATE): ValidateUserDeleteDataResult => {

      const returnObject: ValidateAccountCreateDataResult = {
        __isValid         : false,
        display_name      : '',
        pricing_plan:  ''
      }

      if (!data.display_name)
        returnObject.display_name += 'Missing display name for an account. '

      if (!data.pricing_plan)
        returnObject.pricing_plan += 'No pricing plan selected. '

      returnObject.__isValid = isValidReturnObject(returnObject)
      return returnObject
    }

  }

} as const
