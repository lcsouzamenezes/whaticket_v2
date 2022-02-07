import AppError from "../../validations/config/AppError";
import QuickAnswer from "../../models/QuickAnswer";

interface Request {
  shortcut: string;
  message: string;
  userId?: string;
}

const CreateQuickAnswerService = async ({
  shortcut,
  message,
  userId
}: Request): Promise<QuickAnswer> => {
  const nameExists = await QuickAnswer.findOne({
    where: { shortcut }
  });

  if (nameExists) {
    throw new AppError("ERR__SHORTCUT_DUPLICATED");
  }

  const quickAnswer = await QuickAnswer.create({ shortcut, message, userId });

  return quickAnswer;
};

export default CreateQuickAnswerService;
