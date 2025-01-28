import {AxiosError, AxiosResponse} from 'axios'



export type HttpSuccess<T> = AxiosResponse<T>

export type HttpError<T> = AxiosError<T>
