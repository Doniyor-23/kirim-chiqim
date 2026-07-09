function daysAgoISO(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const initialIncome = [
  { id: 'inc-1', date: daysAgoISO(0), category: 'Food Sales', amount: 620.5, note: 'Lunch rush' },
  { id: 'inc-2', date: daysAgoISO(0), category: 'Drinks', amount: 145.0, note: 'Bar sales' },
  { id: 'inc-3', date: daysAgoISO(1), category: 'Food Sales', amount: 780.25, note: 'Dinner service' },
  { id: 'inc-4', date: daysAgoISO(1), category: 'Delivery', amount: 210.0, note: 'Uber Eats orders' },
  { id: 'inc-5', date: daysAgoISO(2), category: 'Food Sales', amount: 540.0, note: 'Weekday lunch' },
  { id: 'inc-6', date: daysAgoISO(3), category: 'Drinks', amount: 98.5, note: 'Happy hour' },
  { id: 'inc-7', date: daysAgoISO(4), category: 'Food Sales', amount: 690.0, note: 'Dinner service' },
  { id: 'inc-8', date: daysAgoISO(5), category: 'Delivery', amount: 175.75, note: 'DoorDash orders' },
  { id: 'inc-9', date: daysAgoISO(6), category: 'Food Sales', amount: 810.0, note: 'Weekend brunch' },
  { id: 'inc-10', date: daysAgoISO(7), category: 'Drinks', amount: 220.0, note: 'Weekend bar sales' },
  { id: 'inc-11', date: daysAgoISO(10), category: 'Food Sales', amount: 505.0, note: 'Lunch service' },
  { id: 'inc-12', date: daysAgoISO(14), category: 'Other', amount: 300.0, note: 'Private event' },
  { id: 'inc-13', date: daysAgoISO(18), category: 'Delivery', amount: 195.0, note: 'Delivery orders' },
  { id: 'inc-14', date: daysAgoISO(22), category: 'Food Sales', amount: 640.0, note: 'Dinner service' },
  { id: 'inc-15', date: daysAgoISO(27), category: 'Drinks', amount: 110.0, note: 'Bar sales' },
];

export const initialExpenses = [
  { id: 'exp-1', date: daysAgoISO(0), category: 'Salary', amount: 850.0, note: 'Staff wages' },
  { id: 'exp-2', date: daysAgoISO(0), category: 'Gas', amount: 65.0, note: 'Kitchen gas refill' },
  { id: 'exp-3', date: daysAgoISO(1), category: 'Rent', amount: 1200.0, note: 'Monthly rent' },
  { id: 'exp-4', date: daysAgoISO(2), category: 'Electricity', amount: 210.5, note: 'Electric bill' },
  { id: 'exp-5', date: daysAgoISO(3), category: 'Internet', amount: 45.0, note: 'Internet bill' },
  { id: 'exp-6', date: daysAgoISO(4), category: 'Other', amount: 130.0, note: 'Cleaning supplies' },
  { id: 'exp-7', date: daysAgoISO(5), category: 'Salary', amount: 850.0, note: 'Staff wages' },
  { id: 'exp-8', date: daysAgoISO(6), category: 'Gas', amount: 58.0, note: 'Kitchen gas refill' },
  { id: 'exp-9', date: daysAgoISO(9), category: 'Other', amount: 90.0, note: 'Repairs' },
  { id: 'exp-10', date: daysAgoISO(12), category: 'Electricity', amount: 195.0, note: 'Electric bill' },
  { id: 'exp-11', date: daysAgoISO(16), category: 'Rent', amount: 1200.0, note: 'Monthly rent' },
  { id: 'exp-12', date: daysAgoISO(20), category: 'Salary', amount: 850.0, note: 'Staff wages' },
  { id: 'exp-13', date: daysAgoISO(24), category: 'Internet', amount: 45.0, note: 'Internet bill' },
  { id: 'exp-14', date: daysAgoISO(28), category: 'Other', amount: 75.0, note: 'Misc supplies' },
];
