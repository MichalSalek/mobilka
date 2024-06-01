export type GenericValidationResult = { __isValid: boolean }

export type ValidationFunction<T> = ((data: T) => GenericValidationResult & unknown)

export const VALIDATION_POLICY = {

  validateEmail: (value: string | undefined): boolean => {
    if (!value) return false
    const reg = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/
    return !!value.match(reg)
  },

  validateByMinLength: (value: string | undefined, minLength: number): boolean => {
    if (!value) return false
    return value.length >= 3
  },

  validateByWhiteSpaces: (value: string | undefined): boolean => {
    if (!value) return false
    const reg = /\s+/g
    return !value.match(reg)
  },

}
