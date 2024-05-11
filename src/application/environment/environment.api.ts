export const IS_DEVELOPMENT_ENV = (): boolean => process.env.NODE_ENV === 'development'

export const IS_PRODUCTION_ENV = (): boolean => process.env.NODE_ENV === 'production'

export const ENV_VARS = {
  WEB_1_INTERNAL_NAME: process.env.NEXT_PUBLIC_WEB_1_INTERNAL,
  WEB_2_INTERNAL_NAME: process.env.NEXT_PUBLIC_WEB_2_INTERNAL,
  WEB_1_EXTERNAL_PORT: process.env.NEXT_PUBLIC_PORT_WEB_1,
  WEB_2_EXTERNAL_PORT: process.env.NEXT_PUBLIC_PORT_WEB_2
} as const
