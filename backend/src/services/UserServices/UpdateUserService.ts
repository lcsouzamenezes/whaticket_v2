import * as Yup from "yup";

import AppError from "../../errors/AppError";
import ShowUserService from "./ShowUserService";

interface UserData {
  email?: string;
  password?: string;
  name?: string;
  profile?: string;
  customer?: any;
  queueIds?: number[];
}

interface Request {
  userData: UserData;
  userId: string | number;
}

interface Response {
  id: number;
  name: string;
  email: string;
  profile: string;
  customer: any;
}

const UpdateUserService = async ({
  userData,
  userId
}: Request): Promise<Response | undefined> => {
  const user = await ShowUserService(userId);

  const schema = Yup.object().shape({
    name: Yup.string().min(2),
    email: Yup.string().email(),
    profile: Yup.string(),
    password: Yup.string()
  });

  const { name, email, password, profile, customer, queueIds = [] } = userData;

  try {
    await schema.validate({ name, email, password, profile });
  } catch (err) {
    throw new AppError(err.message);
  }

  await user.update({
    name,
    email,
    password,
    profile,
    customer
  });

  await user.$set("queues", queueIds);

  await user.reload();

  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    profile: user.profile,
    customer: user.customer,
    queues: user.queues
  };

  return serializedUser;
};

export default UpdateUserService;
