import { HTTPMethod }                                                                from '../../READONLY-shared-kernel/application/http/http.config'
import { DetailedErrorsRecord, ErrorDTO, ApplicationEventWithPayloadDTO, SuccessWrapperAppInputDTO } from '../../READONLY-shared-kernel/application/http/http.types'
import { IS_DEVELOPMENT_ENV }                                                        from '../environment/environment.api'
import { reportIssue }                                                               from '../error-tracking/errorHandler.api'
import { httpHandlerAction }                                                         from './axios-adapter/axiosAdapter.api'
import { HttpError, HttpSuccess }                                                    from './axios-adapter/axiosAdapter.types'




type DefaultHTTPFetcherConfig = {
  url: string,
  mode: HTTPMethod
  payload?: unknown | undefined
  showErrorMessage?: boolean | undefined
  showAppLoader?: boolean | undefined
}

export const runOnCatch = (
  error: HttpError<ErrorDTO>,
  config: DefaultHTTPFetcherConfig,
  passError: (error: DetailedErrorsRecord | undefined) => void) => {
  const errorMessage: string | null | undefined = error.response?.data?.message
  const errorDetailed: DetailedErrorsRecord | null | undefined = error.response?.data
  const errorStatus = error.response?.status ?? ''

  passError(errorDetailed ?? undefined)

  if (errorMessage) {
    config.showErrorMessage && pushNewSnackbar(errorMessage)
  } else {
    pushNewSnackbar('Something went wrong.')
    reportIssue(`HTTP ERROR ${errorStatus} ${config.mode} ${config.url}`, {
      payload: config.payload,
      error
    })
  }
}


type DefaultHTTPFetcher<T, D> = {
  config: DefaultHTTPFetcherConfig
  // Generic types:
  // T: response data, D: extension of metadata
  successCallback: (response: SuccessWrapperAppInputDTO<T> & D) => void
  errorCallback?: (error: DetailedErrorsRecord | undefined) => void
}

export const defaultHTTPFetcher = async <T = ApplicationEventWithPayloadDTO, D = NonNullable<unknown>>(
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
      await httpHandlerAction<SuccessWrapperAppInputDTO<T> & D, ErrorDTO>
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

        fireOnCatch: async (error: HttpError<ErrorDTO>) => {
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
