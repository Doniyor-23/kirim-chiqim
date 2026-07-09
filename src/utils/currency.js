export function formatCurrency(amount, currency = 'USD') {
  const symbols = { USD: '$', EUR: '€', GBP: '£', UZS: "so'm" };
  const symbol = symbols[currency] || currency;
  const formatted = Math.abs(Number(amount) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? '-' : '';

  return currency === 'UZS' ? `${sign}${formatted} ${symbol}` : `${sign}${symbol}${formatted}`;
}
