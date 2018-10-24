import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const response = selectExpensesTotal([]);
  expect(response).toBe(0);
});

test("should return 300", () => {
  const response = selectExpensesTotal(expenses);
  expect(response).toBe(600);
});
