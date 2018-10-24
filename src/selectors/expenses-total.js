import React from "react";
import numeral from "numeral";

export default expenses => {
  return expenses
    .map(expense => expense.amount)
    .reduce((sum, nextVal) => sum + nextVal, 0);
};
