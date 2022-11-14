import { faker } from "@faker-js/faker";

import User from "../../../models/User";
import { ListUsersService, CreateUserService } from "../../../services";
import { disconnect, truncate } from "../../utils/database";

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

  it("should be able to list users", async () => {
    await CreateUserService({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const response = await ListUsersService({
      pageNumber: 1
    });

    expect(response).toHaveProperty("users");
    expect(response.users[0]).toBeInstanceOf(User);
  });
});
