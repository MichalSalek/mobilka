import { PRICING_POLICY_TYPE } from '../../policies/pricing.policy'




export const pricingPlanDataPLN: PRICING_POLICY_TYPE['pricingPlanDataPLN'] = {
  '1': 30,
  '2': 50,
  '3': 100,
  '4': 24,
  '5': 40,
  '6': 80
} as const


export const bestsellersValues: PRICING_POLICY_TYPE['bestsellersValues'] = {
  monthly: '2',
  annual : '6'
} as const


export const defaultPricingPlanPeriod: PRICING_POLICY_TYPE['defaultPricingPlanPeriod'] = 'annual' as const


export const annualDiscountPercentageNumber: PRICING_POLICY_TYPE['annualDiscountPercentageNumber'] = 30 as const
