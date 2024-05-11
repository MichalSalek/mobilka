// export type DetailedError = {
//   text: string
//   collection: string[]
// }
//
// export type DetailedErrors = DetailedError[]
/// ZAKOMENTOWANE, może sam string wystarczy. jak nie, to się dorobi

export type DetailedErrorsRecord = Record<string, string>
// e.g.:
// {
//   keywords: [
//     {error_text: 'Keyword already exists for country and language', collection: ['some phrase']}
//   ]
// }


export type ErrorDTO<T> = {
    message: string | null
} & (T | null)

export type SuccessWrapperAppInputDTO <T = undefined> = {
  data: T
}
