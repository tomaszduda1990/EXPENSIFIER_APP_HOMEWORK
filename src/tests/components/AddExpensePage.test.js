import { shallow } from "enzyme";
import React from "react";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;
beforeEach(() => {
  addExpense = jest.fn();
  history = {
    push: jest.fn()
  };
  wrapper = shallow(
    <AddExpensePage history={history} addExpense={addExpense} />
  );
});

test("should render AddExpensePage correctly", () => {
  //   const onSubmitSpy = jest.fn(); BEFORE EACH FUNCTION RUNS BEFORE EACH TEST AND SET UP VARIABLES NEEDED TO MY TESTS!!!!
  //   const history = {
  //     push: jest.fn()
  //   };
  //   const wrapper = shallow(
  //     <AddExpensePage history={history} onSubmit={onSubmitSpy} />
  //   );
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  //   const onSubmitSpy = jest.fn();
  //   const history = {
  //     push: jest.fn()
  //   };
  //   const wrapper = shallow(
  //     <AddExpensePage history={history} onSubmit={onSubmitSpy} />
  //   );
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
