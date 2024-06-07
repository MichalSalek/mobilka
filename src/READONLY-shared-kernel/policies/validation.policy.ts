import { REQUEST_DTO_API_V1_USER_CREATE, REQUEST_DTO_API_V1_USER_DELETE, REQUEST_DTO_API_V1_USER_LOGIN } from '../models/user.dto'




export type GenericValidationResult = { __isValid: boolean }

export type ValidationFunction<T> = ((data: T) => GenericValidationResult & unknown)



export type ValidateRegisterDataResult = Partial<REQUEST_DTO_API_V1_USER_CREATE> & GenericValidationResult

export type ValidateLoginDataResult = Partial<REQUEST_DTO_API_V1_USER_LOGIN> & GenericValidationResult

export type ValidateDeleteDataResult = Partial<REQUEST_DTO_API_V1_USER_DELETE> & GenericValidationResult


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

    validateRegisterData: (data: REQUEST_DTO_API_V1_USER_CREATE): ValidateRegisterDataResult => {

      const returnObject: ValidateRegisterDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }

      let isEmailValid = VALIDATION_POLICY.atoms.validateEmail(data?.email)
      if (!isEmailValid) returnObject.email = 'Check and enter correct email address. '
      isEmailValid = VALIDATION_POLICY.atoms.validateByWhiteSpaces(data?.email)
      if (!isEmailValid) returnObject.email += 'Remove spaces from email. '

      let isPassValid = VALIDATION_POLICY.atoms.validateByMinLength(data?.password, 6)
      if (!isPassValid) returnObject.password += 'Choose a more secure password - at least 6 characters. '

      returnObject.__isValid = isEmailValid && isPassValid
      return returnObject
    },



    validateLoginData: (data: REQUEST_DTO_API_V1_USER_LOGIN): ValidateLoginDataResult => {

      const returnObject: ValidateLoginDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }


      let isLoginValid = Boolean(data.email)
      if (!isLoginValid) returnObject.email += 'Enter email. '

      let isPassValid = Boolean(data.password)
      if (!isPassValid) returnObject.password += 'Enter password. '

      returnObject.__isValid = isLoginValid && isPassValid
      return returnObject
    },


    validateDeleteUserData: (data: REQUEST_DTO_API_V1_USER_DELETE): ValidateDeleteDataResult => {

      const returnObject: ValidateDeleteDataResult = {
        __isValid: false,
        email    : '',
        password : ''
      }


      let isLoginValid = Boolean(data.email)
      if (!isLoginValid) returnObject.email += 'Enter email. '

      let isPassValid = Boolean(data.password)
      if (!isPassValid) returnObject.password += 'Enter password. '

      returnObject.__isValid = isLoginValid && isPassValid
      return returnObject
    }

  }

} as const
