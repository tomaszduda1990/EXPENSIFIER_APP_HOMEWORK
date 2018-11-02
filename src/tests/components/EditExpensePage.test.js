import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";
let editExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {
    push: jest.fn()
  };
  wrapper = shallow(
    <EditExpensePage
      history={history}
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      expense={expenses[2]}
    />
  );
});
test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should run onSubmit with edited data", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
test("should run onRemove", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
  expect(history.push).toHaveBeenLastCalledWith("/");
});
