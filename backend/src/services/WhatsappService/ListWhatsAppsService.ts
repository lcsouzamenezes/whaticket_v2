import Queue from "../../models/Queue";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import Whatsapp from "../../models/Whatsapp";

const ListWhatsAppsService = async (): Promise<Whatsapp[]> => {
  const whatsapps = await Whatsapp.findAll({
    include: [
      {
        model: Ticket,
        as: "tickets",
        attributes: ["whatsappId", "userId"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email", "customer"]
          }
        ]
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "customer"]
      },
      {
        model: Queue,
        as: "queues",
        attributes: ["id", "name", "color", "greetingMessage"]
      }
    ]
  });

  return whatsapps;
};

export default ListWhatsAppsService;
