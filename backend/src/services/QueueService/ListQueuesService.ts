import Queue from "../../models/Queue";
import User from "../../models/User";

const ListQueuesService = async (): Promise<Queue[]> => {
  const queues = await Queue.findAll({
    order: [["name", "ASC"]],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email", "customer"]
      }
    ]
  });

  return queues;
};

export default ListQueuesService;
