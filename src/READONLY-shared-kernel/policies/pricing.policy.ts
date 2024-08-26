export type PricingPlanTypes = 'monthly' | 'annual'


type PRICING_POLICY_TYPE = {
  pricingPlanSearchParamKeyword: string
  pricingPlanDataPLN: Record<string, number>
  annualDiscountPercentage: number
  bestsellers: Record<PricingPlanTypes, PricingPlanOptions>

  utils: {
    isSearchParamIncludesPricingPlan: () => boolean
    pricingPlansPossibilities: () => PricingPlanOptions[]
    pricingPlanTypeNarrower: (maybePricingPlanOption: string | PricingPlanOptions | null) => boolean
    getDefaultPricingPlanOption: (type: PricingPlanTypes) => PricingPlanOptions
    getPricingPlanTypeByOption: (option: PricingPlanOptions) => PricingPlanTypes
    getBestsellerByPricingType: (type: PricingPlanTypes) => PricingPlanOptions
  }
}
export const PRICING_POLICY: PRICING_POLICY_TYPE = {

  pricingPlanSearchParamKeyword: 'pricingplan',

  pricingPlanDataPLN: {
    '1': 30,
    '2': 50,
    '3': 100,
    '4': 24,
    '5': 40,
    '6': 80
  } as const,

  bestsellers: {
    monthly: '2',
    annual: '6'
  },

  annualDiscountPercentage: 20,

  utils: {
    isSearchParamIncludesPricingPlan: (): boolean => {
      if (!location) {
        return false
      }
      return Boolean(location.search?.includes(PRICING_POLICY.pricingPlanSearchParamKeyword))
    },

    pricingPlansPossibilities: () => Object.keys(PRICING_POLICY.pricingPlanDataPLN).map((el) => el),

    pricingPlanTypeNarrower: (maybePricingPlanOption): maybePricingPlanOption is PricingPlanOptions => {
      return PRICING_POLICY.utils.pricingPlansPossibilities().includes(maybePricingPlanOption as PricingPlanOptions)
    },

    getDefaultPricingPlanOption: (type) => {
      if (type === 'monthly') {
        return '2'
      }

      if (type === 'annual') {
        return '6'
      }

      return '2' // Default case
    },

    getPricingPlanTypeByOption: (option) => {
      if ([ '1', '2', '3' ].includes(option)) {
        return 'monthly'
      }
      if ([ '4', '5', '6' ].includes(option)) {
        return 'annual'
      }
      return 'monthly'
    },

    getBestsellerByPricingType: (option) => {
      return PRICING_POLICY.bestsellers[option]
    }

  }

} as const

export type PricingPlanOptions = keyof typeof PRICING_POLICY.pricingPlanDataPLN
