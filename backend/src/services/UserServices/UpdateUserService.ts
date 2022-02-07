import ShowUserService from "./ShowUserService";

interface UserData {
  email?: string;
  password?: string;
  name?: string;
  profile?: string;
  customer?: string;
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
  customer: string;
}

const UpdateUserService = async ({
  userData,
  userId
}: Request): Promise<Response | undefined> => {
  const user = await ShowUserService(userId);

  const { name, email, password, profile, customer, queueIds = [] } = userData;

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
