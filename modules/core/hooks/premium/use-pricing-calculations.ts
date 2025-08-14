export const usePricingCalculations = (selectedPlan: string) => {
  const basePrice = 24;
  const yearlyPrice = 240;

  const totalPrice = selectedPlan === 'yearly' ? yearlyPrice : basePrice;
  const period = selectedPlan === 'yearly' ? 'year' : 'month';
  const originalYearlyPrice = basePrice * 12;
  const savingsAmount = originalYearlyPrice - yearlyPrice;

  return {
    totalPrice,
    period,
    originalYearlyPrice,
    savingsAmount
  };
};
