import { login, logout } from "../../actions/auth";

test("should generate login obj correctly", () => {
  const uid = "qwerty";
  const action = login(uid);

  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});
test("should generate logout obj correctly", () => {
  const action = logout();
  expect(action).toEqual({ type: "LOGOUT" });
});
