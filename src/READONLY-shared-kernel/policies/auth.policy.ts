import { REQUEST_DTO_API_V1_USER_DELETE, REQUEST_DTO_API_V1_USER_LOGIN, REQUEST_DTO_API_V1_USER_REGISTER } from '../domain/models/user.dto'
import { GenericValidationResult, VALIDATION_POLICY }                                                      from './validation.policy'




export type ValidateRegisterDataResult = Partial<REQUEST_DTO_API_V1_USER_REGISTER> & GenericValidationResult

export type ValidateLoginDataResult = Partial<REQUEST_DTO_API_V1_USER_LOGIN> & GenericValidationResult

export const AUTH_POLICY = {

  validateRegisterData: (data: REQUEST_DTO_API_V1_USER_REGISTER): ValidateRegisterDataResult => {

    const returnObject: ValidateRegisterDataResult = {
      __isValid: false,
      email    : '',
      password : ''
    }
    

    let isEmailValid = VALIDATION_POLICY.validateEmail(data?.email)
    if (!isEmailValid) returnObject.email = 'Check and enter correct email address.'

    let isPassValid = VALIDATION_POLICY.validateByMinLength(data?.password, 6)
    if (!isPassValid) returnObject.password += 'Choose a more secure password - at least 6 characters.'

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
    if (!isLoginValid) returnObject.email += 'Enter email.'

    let isPassValid = Boolean(data.password)
    if (!isPassValid) returnObject.password += 'Enter password.'

    returnObject.__isValid = isLoginValid && isPassValid
    return returnObject
  },


  validateDeleteUserData: (data: REQUEST_DTO_API_V1_USER_DELETE): ValidateLoginDataResult =>
    AUTH_POLICY.validateRegisterData(data)

}
