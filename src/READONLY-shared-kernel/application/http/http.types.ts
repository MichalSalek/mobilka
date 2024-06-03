import { SERVER_MESSAGES_TYPE } from '../../domain/http/http.config'




export type HTTPMessageDTO = {
  message?: SERVER_MESSAGES_TYPE
}

// export type DetailedError = {
//   text: string
//   collection: string[]
// }
// export type DetailedErrors = DetailedError[]
/// ZAKOMENTOWANE, może sam string wystarczy. jak nie, to się dorobi
export type DetailedErrorsRecord = Record<string, string>
// e.g.:
// {
//   keywords: [
//     {error_text: 'Keyword already exists for country and language', collection: ['some phrase']}
//   ]
// }


export type ErrorDTO<T> = HTTPMessageDTO & (T | null)

export type SuccessWrapperAppInputDTO<T = undefined> = {
  data: T
} & Partial<HTTPMessageDTO>
