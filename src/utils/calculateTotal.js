import { isToday, isThisWeek, isThisMonth } from './date';

export function sumAmounts(items) {
  return items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

export function getTodayTotal(items) {
  return sumAmounts(items.filter((i) => isToday(i.date)));
}

export function getWeekTotal(items) {
  return sumAmounts(items.filter((i) => isThisWeek(i.date)));
}

export function getMonthTotal(items) {
  return sumAmounts(items.filter((i) => isThisMonth(i.date)));
}

export function getBalance(income, expenses) {
  return sumAmounts(income) - sumAmounts(expenses);
}

export function groupByCategory(items) {
  const map = {};
  items.forEach((item) => {
    map[item.category] = (map[item.category] || 0) + Number(item.amount || 0);
  });
  return Object.entries(map).map(([category, total]) => ({ category, total }));
}
