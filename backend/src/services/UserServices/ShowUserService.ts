import User from "../../models/User";
import Queue from "../../models/Queue";

import AppError from "../../validations/config/AppError";
import HttpStatus from "../../validations/config/HttpStatus";

const ShowUserService = async (id: string | number): Promise<User> => {
  const user = await User.findByPk(id, {
    attributes: ["name", "id", "email", "profile", "customer", "tokenVersion"],
    include: [
      { model: Queue, as: "queues", attributes: ["id", "name", "color"] }
    ],
    order: [[{ model: Queue, as: "queues" }, "name", "asc"]]
  });

  if (!user) {
    throw new AppError("ERR_NO_USER_FOUND", HttpStatus.NOT_FOUND);
  }

  return user;
};

export default ShowUserService;
