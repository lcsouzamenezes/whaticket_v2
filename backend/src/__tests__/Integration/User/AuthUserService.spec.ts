import { faker } from "@faker-js/faker";

import { AuthUserService, CreateUserService } from "../../../services";
import { disconnect, truncate } from "../../utils/database";
import AppError from "../../../validations/config/AppError";

describe("Auth", () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to login with an existing user", async () => {
    const password = faker.internet.password();
    const email = faker.internet.email();

    await CreateUserService({
      name: faker.name.fullName(),
      email,
      password
    });

    const response = await AuthUserService({
      email,
      password
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to login with not registered email", async () => {
    try {
      await AuthUserService({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe("ERR_INVALID_CREDENTIALS");
    }
  });

  it("should not be able to login with incorret password", async () => {
    await CreateUserService({
      name: faker.name.fullName(),
      email: "mail@test.com",
      password: faker.internet.password()
    });

    try {
      await AuthUserService({
        email: "mail@test.com",
        password: faker.internet.password()
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe("ERR_INVALID_CREDENTIALS");
    }
  });
});
