import LoadApp from "./app";
import config from "./config";
import logger from "./loaders/winston";
import * as http from "http";

async function startServer() {
  logger.info(` 👽  Starting server in ${process.env.NODE_ENV} mode   👽 `);
  const app = await LoadApp();
  http.createServer(app).listen(config.PORT, () => {
    logger.info(` 🔥 Listening on http://localhost:${config.PORT} 🔥`);
  });
}

startServer();
