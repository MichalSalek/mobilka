import { annualDiscountPercentageNumber, bestsellersValues, defaultPricingPlanPeriod, pricingPlanDataPLN } from '../domain/pricing/pricing.config'




export type PricingPlanTypes = 'monthly' | 'annual'


export type PRICING_POLICY_TYPE = {

  pricingPlanDataPLN: Readonly<Record<string, number>>
  bestsellersValues: Readonly<Record<PricingPlanTypes, PricingPlanValues>>
  defaultPricingPlanPeriod: Readonly<PricingPlanTypes>
  annualDiscountPercentageNumber: Readonly<number>

  utils: {
    GET_ANNUAL_DISCOUNT_PERCENTAGE: () => string
    PRICING_PLANS_VALUES: () => PricingPlanValues[]
    PRICING_PLAN_VALUE_TYPE_NARROWER: (maybePricingPlanValue: string | PricingPlanValues | null) => boolean
    GET_DEFAULT_PRICING_PLANS_VALUE: (type?: PricingPlanTypes | null) => PricingPlanValues
    GET_PRICING_PLAN_TYPE_BY_VALUE: (option: PricingPlanValues | null) => PricingPlanTypes
    GET_BESTSELLER_BY_PRICING_TYPE: (type: PricingPlanTypes) => PricingPlanValues
  }
}
export const PRICING_POLICY: PRICING_POLICY_TYPE = {

  pricingPlanDataPLN            : Object.freeze(pricingPlanDataPLN),
  bestsellersValues             : Object.freeze(bestsellersValues),
  defaultPricingPlanPeriod      : Object.freeze(defaultPricingPlanPeriod),
  annualDiscountPercentageNumber: Object.freeze(annualDiscountPercentageNumber),

  utils: {

    GET_ANNUAL_DISCOUNT_PERCENTAGE: () => `-${PRICING_POLICY.annualDiscountPercentageNumber}%`,


    PRICING_PLANS_VALUES: () => Object.keys(PRICING_POLICY.pricingPlanDataPLN)
                                      .map((el) => el),

    PRICING_PLAN_VALUE_TYPE_NARROWER: (maybePricingPlanValue): maybePricingPlanValue is PricingPlanValues => {
      return PRICING_POLICY.utils.PRICING_PLANS_VALUES()
                           .includes(maybePricingPlanValue as PricingPlanValues)
    },

    GET_DEFAULT_PRICING_PLANS_VALUE: (pricingType) => {
      if (pricingType) {
        return PRICING_POLICY.bestsellersValues[pricingType]
      }
      return PRICING_POLICY.bestsellersValues[PRICING_POLICY.defaultPricingPlanPeriod]
    },

    GET_PRICING_PLAN_TYPE_BY_VALUE: (pricingValue) => {
      if ([ '1',
            '2',
            '3' ].includes(pricingValue ?? '')) {
        return 'monthly'
      }
      if ([ '4',
            '5',
            '6' ].includes(pricingValue ?? '')) {
        return 'annual'
      }
      return PRICING_POLICY.defaultPricingPlanPeriod
    },

    GET_BESTSELLER_BY_PRICING_TYPE: (pricingValue) => {
      return PRICING_POLICY.bestsellersValues[pricingValue]
    }

  }

} as const

export type PricingPlanValues = keyof typeof PRICING_POLICY.pricingPlanDataPLN
