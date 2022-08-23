import { faker } from "@faker-js/faker";

import { DeleteUserService, CreateUserService } from "../../../services";
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

  it("should be delete a existing user", async () => {
    const { id } = await CreateUserService({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    expect(DeleteUserService(id)).resolves.not.toThrow();
  });

  it("to throw an error if tries to delete a non existing user", async () => {
    expect(DeleteUserService(faker.random.numeric())).rejects.toBeInstanceOf(
      AppError
    );
  });
});
