import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
const createMockStore = configureMockStore([thunk]);
test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});
const uid = "123abc";
beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, amount, description, note, createdAt }) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt
    };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});
test("should setup edit expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});
test("should edit expense from firebase", done => {
  const store = createMockStore({ auth: { uid } });
  const id = expenses[0].id;
  const updates = {
    amount: 1500
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});
test("should setup add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "This was last months rent"
  };
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0]
  });
});
test("should add expense to database and store", done => {
  const store = createMockStore({ auth: { uid } });
  const expenseData = {
    description: "Holidays",
    amount: 3000,
    note: "Cambodia",
    createdAt: 100
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
test("should add expense with defaults to database and store", () => {
  const store = createMockStore({ auth: { uid } });
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
test("should fetch the expenses from firebase", done => {
  const store = createMockStore({ auth: { uid } });
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
test("should remove expense from firebase", done => {
  const store = createMockStore({ auth: { uid } });
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});
