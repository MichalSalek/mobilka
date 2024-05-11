import axios, { Axios }          from 'axios'
import { reportIssue }           from '../../error-tracking/errorHandler.api'
import { HTTPMethod }            from '../http.config'
import { axiosDefaultConfiguration } from './axiosAdapter.config'
import { HttpError, HttpSuccess }    from './axiosAdapter.types'





type HTTPHandlerAction<D> = {
  url: string,
  mode: HTTPMethod
  payload?: unknown | undefined
  fireOnFetchInit?: () => void
  fireOnFetchEnd?: () => void
  fireOnCatch?: (error: HttpError<D>) => void
}

// Generic types:
// T = successful response data,
// D = error response data
export const httpHandlerAction = async <T, D>(
  {
    url,
    mode,
    payload = undefined,
    fireOnFetchInit,
    fireOnFetchEnd,
    fireOnCatch
  }: HTTPHandlerAction<D>): Promise<HttpSuccess<T>> => {
  if (!url) {
    reportIssue('NO URL HTTP ERROR', {payload, url, mode})
  }

  fireOnFetchInit && fireOnFetchInit()

  const axiosPromise = new Promise<HttpSuccess<T>>(async (resolve, reject) => {
    if (mode === 'get') {
      await (axios[mode] as Axios['get'] | Axios['delete'])(url, {...axiosDefaultConfiguration})
        .then((response) => resolve(response))
        .catch((err) => reject(err))

    } else if (mode === 'post' || mode === 'patch') {
      await (axios[mode] as Axios['post'] | Axios['patch'])(url, payload, {...axiosDefaultConfiguration})
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    }
  })

  try {
    const response = await axiosPromise
    fireOnFetchEnd && fireOnFetchEnd()
    return response
  } catch (err) {
    fireOnFetchEnd && fireOnFetchEnd()
    const error = err as HttpError<D>
    fireOnCatch && fireOnCatch(error)
    return Promise.reject(error)
  }
}
