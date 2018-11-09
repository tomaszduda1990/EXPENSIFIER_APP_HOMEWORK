import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";
export class AddExpensePage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = expense => {
    // props.dispatch(addExpense(expense));
    this.props.startAddExpense(expense); // added mapDispatch to props so the component is more testable :)
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
});
export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
