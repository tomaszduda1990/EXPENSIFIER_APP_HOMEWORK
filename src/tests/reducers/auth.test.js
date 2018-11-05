import authReducer from "../../reducers/auth";

test("should add uid to state", () => {
  const action = {
    type: "LOGIN",
    uid: "TEST"
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid: "TEST"
  });
});
test("should logout correctly", () => {
  const action = {
    type: "LOGOUT"
  };
  const state = authReducer({ uid: "TEST" }, action);

  expect(state).toEqual({});
});
