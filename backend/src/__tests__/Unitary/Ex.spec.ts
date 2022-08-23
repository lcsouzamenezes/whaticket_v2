import { faker } from "@faker-js/faker";

const randomName = faker.name.fullName();

describe("User", () => {
  it("example", async () => {
    console.log(randomName);
  });
});
