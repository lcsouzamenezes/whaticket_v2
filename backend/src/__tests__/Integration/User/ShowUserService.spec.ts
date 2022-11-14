import { faker } from "@faker-js/faker";

import User from "../../../models/User";
import { ShowUserService, CreateUserService } from "../../../services";
import { disconnect, truncate } from "../../utils/database";
import AppError from "../../../validations/config/AppError";

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to find a user", async () => {
    const newUser = await CreateUserService({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const user = await ShowUserService(newUser.id);

    expect(user).toHaveProperty("id");
    expect(user).toBeInstanceOf(User);
  });

  it("should not be able to find a inexisting user", async () => {
    expect(ShowUserService(faker.random.numeric())).rejects.toBeInstanceOf(
      AppError
    );
  });
});
