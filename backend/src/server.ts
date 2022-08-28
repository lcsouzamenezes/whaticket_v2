import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";

const date = new Date().toISOString().slice(0, 10);
const hour = new Date().toLocaleTimeString("pt-BR", {
  timeZone: "America/Sao_Paulo"
});
const dateNow = `${date} ${hour}`;

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT} at ⌚ ${dateNow}`);
});

initIO(server);
StartAllWhatsAppsSessions();
gracefulShutdown(server);
