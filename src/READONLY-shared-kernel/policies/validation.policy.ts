import { ACCOUNT_DTO_API_V1 }   from '../models/account/account.dto'
import { ADMIN_DTO_API_V1 }     from '../models/admin/admin.dto'
import { EventLogTypeValue }    from '../models/db_models'
import { EVENT_LOG_DTO_API_V1 } from '../models/event-log/event_log.dto'
import { SESSION_DTO_API_V1 }   from '../models/session/session.dto'
import { USER_DTO_API_V1 }      from '../models/user/user.dto'
import { PRICING_POLICY }       from './pricing.policy'




export type ValidationFlag = {
  __isValid: boolean
}

export type GenericValidationResult = Record<string, unknown>

export const getErrorDTOWithoutValidationFlag = (validationResult: GenericValidationResult & ValidationFlag): GenericValidationResult => {
  const {
          __isValid,
          ...cleaned
        } = validationResult
  return cleaned
}



export type ValidationFunction = (data: any) => ValidationFlag | any

const hasReturnObjectValidationError = (obj: ValidationFlag & unknown) => {
  return Object.keys(obj)
               .every((objKey) => {
                 const key = objKey as keyof ValidationFlag & unknown
                 if (objKey === '__isValid') {
                   return true
                 }
                 return !obj[key]
               })
}

export const VALIDATION_POLICY = {

  utils: {

    validateEmail: (value: string | undefined | null) => {
      if (!value) {
        return false
      }
      const reg = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/
      return !!value.match(reg)
    },

    validateByMinLength: (value: string | undefined | null, minLength: number = 3): boolean => {
      if (!value) {
        return false
      }
      return value.length >= minLength
    },

    validateByWhiteSpaces: (value: string | undefined | null): boolean => {
      if (!value) {
        return false
      }
      const reg = /\s+/g
      return !value.match(reg)
    }
  },


  validators: {

    userRegister: (data: USER_DTO_API_V1['REGISTER']['REQUEST']): USER_DTO_API_V1['REGISTER']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['REGISTER']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        email    : '',
        password : ''
      }

      if (!VALIDATION_POLICY.utils.validateEmail(data?.email)) {
        returnObject.email += 'Check and enter correct email address. '
      }

      if (!VALIDATION_POLICY.utils.validateByWhiteSpaces(data?.email)) {
        returnObject.email += 'Remove spaces from email. '
      }

      if (!VALIDATION_POLICY.utils.validateByMinLength(
        data?.password,
        6)) {
        returnObject.password += 'Choose a more secure password - at least 6 characters. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },

    checkEmail: (data: USER_DTO_API_V1['CHECK_EMAIL']['REQUEST']): USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['CHECK_EMAIL']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        email    : ''
      }

      if (!VALIDATION_POLICY.utils.validateEmail(data?.email)) {
        returnObject.email += 'Check and enter correct email address. '
      }

      if (!VALIDATION_POLICY.utils.validateByWhiteSpaces(data?.email)) {
        returnObject.email += 'Remove spaces from email. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },


    userCreate: (data: USER_DTO_API_V1['CREATE']['REQUEST']): USER_DTO_API_V1['CREATE']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['CREATE']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        email    : ''
      }

      if (!VALIDATION_POLICY.utils.validateEmail(data?.email)) {
        returnObject.email += 'Check and enter correct email address. '
      }

      if (!VALIDATION_POLICY.utils.validateByWhiteSpaces(data?.email)) {
        returnObject.email += 'Remove spaces from email. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },


    userLogin: (data: USER_DTO_API_V1['LOGIN']['REQUEST']): USER_DTO_API_V1['LOGIN']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['LOGIN']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        email    : '',
        password : ''
      }

      if (!data.email) {
        returnObject.email += 'Enter email. '
      }

      if (!data.password) {
        returnObject.password += 'Enter password. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    deleteOrDisableSelfUser: (data: USER_DTO_API_V1['DELETE_SELF']['REQUEST']): USER_DTO_API_V1['DELETE_SELF']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['DELETE_SELF']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        password : ''
      }

      if (!data.password) {
        returnObject.password += 'Enter password. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    deleteOrDisableOtherUser: (data: USER_DTO_API_V1['DELETE_EXACTLY']['REQUEST']): USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR'] => {

      const returnObject: USER_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        user_id  : ''
      }

      if (Object.keys(data).length === 0) {
        returnObject.user_id += 'No user identifier. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    enableOtherUser: (data: ADMIN_DTO_API_V1['ENABLE_ANY']['REQUEST']): ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE_ERROR'] => {

      const returnObject: ADMIN_DTO_API_V1['ENABLE_ANY']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        user_id  : ''
      }

      if (Object.keys(data).length === 0) {
        returnObject.user_id += 'No user identifier. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    deleteSession: (data: SESSION_DTO_API_V1['DELETE_EXACTLY']['REQUEST']): SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR'] => {

      const returnObject: SESSION_DTO_API_V1['DELETE_EXACTLY']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid : false,
        __general : '',
        session_id: ''
      }

      if (!data.session_id) {
        returnObject.session_id += 'Missing session ID. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    accountDisplayNameChange: (data: ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['REQUEST']): ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE_ERROR'] => {

      const returnObject: ACCOUNT_DTO_API_V1['DISPLAY_NAME_CHANGE']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid   : false,
        __general   : '',
        display_name: ''
      }

      if (!data.display_name) {
        returnObject.display_name += 'Enter name. '
      }

      if (!VALIDATION_POLICY.utils.validateByMinLength(
        data?.display_name,
        3)) {
        returnObject.display_name += 'Name must be longer than 3 characters. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    accountPaymentMake: (data: ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['REQUEST']): ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE_ERROR'] => {

      const returnObject: ACCOUNT_DTO_API_V1['MAKE_PAYMENT']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid   : false,
        __general   : '',
        payment_id  : '',
        pricing_plan: ''
      }

      if (!data.pricing_plan) {
        returnObject.pricing_plan += 'Enter pricing plan. '
      }

      if (!PRICING_POLICY.utils.PRICING_PLAN_VALUE_TYPE_NARROWER(data?.pricing_plan)) {
        returnObject.pricing_plan += 'Enter valid pricing plan. '
      }

      if (!data.payment_id) {
        returnObject.payment_id += 'Enter payment ID. '
      }

      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    },



    eventLogGetAll: (data: EVENT_LOG_DTO_API_V1['GET_ALL']['REQUEST']): EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE_ERROR'] => {

      const returnObject: EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE_ERROR'] & ValidationFlag = {
        __isValid: false,
        __general: '',
        type     : ''
      }

      if (!data.type) {
        returnObject.type += 'Missing logs type. '
      }

      if (!Object.values(EventLogTypeValue)
                 .includes(data.type)) {
        returnObject.type += 'Wrong logs type. '
      }


      returnObject.__isValid = hasReturnObjectValidationError(returnObject)
      return returnObject
    }

  }

} as const
