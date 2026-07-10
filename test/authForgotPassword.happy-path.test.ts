import assert from "node:assert/strict";
import test from "node:test";
import { authForgotPassword } from "../src/index.js";
import { buildHappyPathContract } from "./mocks/authForgotPassword.mocks.js";

test("authForgotPassword happy path returns generic success", async () => {
  const contract = buildHappyPathContract({ username: "validuser" });
  const result = await authForgotPassword(contract);

  assert.deepEqual(result, {
    message: "Si el usuario existe, recibiras una notificacion de recuperacion",
  });
});
