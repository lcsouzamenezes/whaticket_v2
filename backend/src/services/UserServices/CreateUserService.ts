import { SerializeUser } from "../../helpers/SerializeUser";

import User from "../../models/User";
import { UpdateUserService } from "../index";

interface Request {
  name: string;
  email: string;
  password: string;
  profile?: string;
  customer?: string;
  queueIds?: number[];
}

interface Response {
  id: number;
  name: string;
  email: string;
  profile: string;
  customer: string;
}

const CreateUserService = async ({
  name,
  email,
  password,
  profile = "admin",
  customer,
  queueIds = []
}: Request): Promise<Response> => {
  const user = await User.create(
    {
      name,
      email,
      password,
      profile,
      customer
    },
    { include: ["queues"] }
  );

  const userId = user?.id;

  const userData = {
    name,
    email,
    password,
    profile,
    customer: profile === "user" ? customer : String(userId)
  };

  await UpdateUserService({ userData, userId });

  await user.$set("queues", queueIds);

  await user.reload();

  return SerializeUser(user);
};

export default CreateUserService;
