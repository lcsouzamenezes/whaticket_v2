import * as Yup from "yup";

import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import User from "../../models/User";
import UpdateUserService from "./UpdateUserService";

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
  const schema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(2)
      .test(
        "Check-name",
        "An user with this name already exists.",
        async value => {
          if (!value) return false;
          const nameExists = await User.findOne({
            where: { name: value }
          });
          return !nameExists;
        }
      ),
    email: Yup.string()
      .email()
      .required()
      .test(
        "Check-email",
        "An user with this email already exists.",
        async value => {
          if (!value) return false;
          const emailExists = await User.findOne({
            where: { email: value }
          });
          return !emailExists;
        }
      ),
    password: Yup.string().required().min(5)
  });

  try {
    await schema.validate({ email, password, name, customer });
  } catch (err) {
    throw new AppError(err.message);
  }

  {
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

    const userUpdated = await UpdateUserService({ userData, userId });

    await userUpdated.$set("queues", queueIds);

    await userUpdated.reload();

    return SerializeUser(userUpdated);
  }
};

export default CreateUserService;
