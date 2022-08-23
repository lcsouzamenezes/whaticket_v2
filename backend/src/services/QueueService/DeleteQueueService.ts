import { ShowQueueService } from "../index";

const DeleteQueueService = async (queueId: number | string): Promise<void> => {
  const queue = await ShowQueueService(queueId);

  await queue.destroy();
};

export default DeleteQueueService;
