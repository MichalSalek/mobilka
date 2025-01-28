import { ENV_VARS_CONFIG } from './environment.config'




export const IS_DEVELOPMENT_ENV = (): boolean => process.env.NODE_ENV === 'development'

export const IS_PRODUCTION_ENV = (): boolean => process.env.NODE_ENV === 'production'

export const ENV_VARS = ENV_VARS_CONFIG
