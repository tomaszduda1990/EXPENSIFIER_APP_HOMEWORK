import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";
export class AddExpensePage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = expense => {
    // props.dispatch(addExpense(expense));
    this.props.addExpense(expense); // added mapDispatch to props so the component is more testable :)
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense))
});
export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
