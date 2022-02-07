import User from "../../models/User";
import Ticket from "../../models/Ticket";

import UpdateDeletedUserOpenTicketsStatus from "../../helpers/UpdateDeletedUserOpenTicketsStatus";

import HttpStatus from "../../validations/config/HttpStatus";
import AppError from "../../validations/config/AppError";

const DeleteUserService = async (id: string | number): Promise<void> => {
  const user = await User.findOne({
    where: { id }
  });

  if (!user) {
    throw new AppError("ERR_NO_USER_FOUND", HttpStatus.NOT_FOUND);
  }

  const userOpenTickets: Ticket[] = await user.$get("tickets", {
    where: { status: "open" }
  });

  if (userOpenTickets.length > 0) {
    UpdateDeletedUserOpenTicketsStatus(userOpenTickets);
  }

  await user.destroy();
};

export default DeleteUserService;
