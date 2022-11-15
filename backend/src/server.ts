import gracefulShutdown from "http-graceful-shutdown";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { date, hour } from "./utils/dateTime";

import app from "./app";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT} at ${date} ${hour}`);
});

initIO(server);
StartAllWhatsAppsSessions();
gracefulShutdown(server);
