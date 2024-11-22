export type PricingPlanTypes = 'monthly' | 'annual'


type PRICING_POLICY_TYPE = {
  pricingPlanSearchParamKeyword: string
  pricingPlanDataPLN: Record<string, number>
  bestsellersValues: Record<PricingPlanTypes, PricingPlanValues>
  defaultPricingPlanPeriod: PricingPlanTypes
  annualDiscountPercentageNumber: number

  utils: {
    getAnnualDiscountPercentage: () => string
    isSearchParamIncludesPricingPlan: () => boolean
    pricingPlansValues: () => PricingPlanValues[]
    pricingPlanValueTypeNarrower: (maybePricingPlanValue: string | PricingPlanValues | null) => boolean
    getDefaultPricingPlansValue: (type?: PricingPlanTypes | null) => PricingPlanValues
    getPricingPlanTypeByValue: (option: PricingPlanValues | null) => PricingPlanTypes
    getBestsellerByPricingType: (type: PricingPlanTypes) => PricingPlanValues
  }
}
export const PRICING_POLICY: PRICING_POLICY_TYPE = {

  pricingPlanSearchParamKeyword: 'pricingplan',

  pricingPlanDataPLN: Object.freeze({
    '1': 30,
    '2': 50,
    '3': 100,
    '4': 24,
    '5': 40,
    '6': 80
  } as const),

  bestsellersValues: {
    monthly: '2',
    annual : '6'
  },

  defaultPricingPlanPeriod: 'annual',

  annualDiscountPercentageNumber: 30,

  utils: {

    getAnnualDiscountPercentage: () => `-${PRICING_POLICY.annualDiscountPercentageNumber}%`,

    isSearchParamIncludesPricingPlan: (): boolean => {
      if (!location) {
        return false
      }
      return Boolean(location.search?.includes(PRICING_POLICY.pricingPlanSearchParamKeyword))
    },

    pricingPlansValues: () => Object.keys(PRICING_POLICY.pricingPlanDataPLN)
                                    .map((el) => el),

    pricingPlanValueTypeNarrower: (maybePricingPlanValue): maybePricingPlanValue is PricingPlanValues => {
      return PRICING_POLICY.utils.pricingPlansValues()
                           .includes(maybePricingPlanValue as PricingPlanValues)
    },

    getDefaultPricingPlansValue: (pricingType) => {
      if (pricingType) {
        return PRICING_POLICY.bestsellersValues[pricingType]
      }
      return PRICING_POLICY.bestsellersValues[PRICING_POLICY.defaultPricingPlanPeriod]
    },

    getPricingPlanTypeByValue: (pricingValue) => {
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

    getBestsellerByPricingType: (pricingValue) => {
      return PRICING_POLICY.bestsellersValues[pricingValue]
    }

  }

} as const

export type PricingPlanValues = keyof typeof PRICING_POLICY.pricingPlanDataPLN
