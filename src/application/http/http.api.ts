import { IS_DEVELOPMENT_ENV }                                        from '../environment/environment.api'
import { reportIssue }                                               from '../error-tracking/errorHandler.api'
import { httpHandlerAction }                            from './axios-adapter/axiosAdapter.api'
import { HttpError, HttpSuccess }                                    from './axios-adapter/axiosAdapter.types'
import { HTTPMethod }                                                from './http.config'
import { DetailedErrorsRecord, ErrorDTO, SuccessWrapperAppInputDTO } from './http.types'


export type HTTPMessageDTO = {
  message: string
}

type DefaultHTTPFetcherConfig = {
  url: string,
  mode: HTTPMethod
  payload?: unknown | undefined
  showErrorMessage?: boolean | undefined
  showAppLoader?: boolean | undefined
}

export const runOnCatch = (
  error: HttpError<ErrorDTO<DetailedErrorsRecord>>,
  config: DefaultHTTPFetcherConfig,
  passError: (error: DetailedErrorsRecord | undefined) => void) => {
  const errorMessage: string | null | undefined = error.response?.data?.message
  const errorDetailed: DetailedErrorsRecord | null | undefined = error.response?.data
  const errorStatus = error.response?.status ?? ''

  passError(errorDetailed ?? undefined)

  if (errorMessage) {
    config.showErrorMessage && alert(errorMessage)
  } else {
    alert('Something went wrong. ')
    reportIssue(`HTTP ERROR ${errorStatus} ${config.mode} ${config.url}`, {payload: config.payload, error})
  }
}


type DefaultHTTPFetcher<T, D> = {
  config: DefaultHTTPFetcherConfig
  // Generic types:
  // T: response data, D: extension of metadata
  successCallback: (response: SuccessWrapperAppInputDTO<T> & D) => void
  errorCallback?: (error: DetailedErrorsRecord | undefined) => void
}

export const defaultHTTPFetcher = async <T = unknown, D = NonNullable<unknown>>(
  {
    config,
    successCallback,
    errorCallback
  }: DefaultHTTPFetcher<T, D>): Promise<void> => {

  const {
    url,
    mode,
    payload = undefined,
    showAppLoader
  } = config

  try {
    const response: HttpSuccess<SuccessWrapperAppInputDTO<T> & D> =
      await httpHandlerAction<SuccessWrapperAppInputDTO<T> & D, ErrorDTO<DetailedErrorsRecord>>
      ({
        url,
        mode,
        payload,

        fireOnFetchInit: async () => {
          //
        },

        fireOnFetchEnd: async () => {
          //
        },

        fireOnCatch: async (error: HttpError<ErrorDTO<DetailedErrorsRecord>>) => {
          const configWithDefaults: DefaultHTTPFetcherConfig = {showErrorMessage: true, ...config}
          void runOnCatch(
            error,
            configWithDefaults,
            (error) => {
              errorCallback && errorCallback(error)
            })
        }
      })

    successCallback(response.data)

  } catch (error) {
    if (IS_DEVELOPMENT_ENV()) {
      reportIssue('HTTP HANDLER CATCH', error as object, 'warn')
    }
  }
}
