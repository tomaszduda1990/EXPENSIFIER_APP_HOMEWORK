import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";
test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render expenseform correctly with data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "TEST";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "TEST";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount on amount input change correctly", () => {
  const value = "23.5";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("should set amount on amount input change", () => {
  const value = "12.222";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[2].description,
    note: expenses[2].note,
    amount: expenses[2].amount,
    createdAt: expenses[2].createdAt
  });
});

test("should set new date on datechange", () => {
  const wrapper = shallow(<ExpenseForm />);
  const now = moment();
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendarFocused to true", () => {
  const wrapper = shallow(<ExpenseForm />);
  const focused = true;
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toEqual(true);
});
