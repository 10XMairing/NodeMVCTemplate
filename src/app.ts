import * as express from "express";
import "reflect-metadata";

import Loader from "./loaders";

import logger from "./loaders/winston";
const app = express();

async function LoadDependencies(app: express.Express) {
  await Loader(app);
  logger.info(" 💃 Finished loading dependencies 💃");
}

// for testing
export default async function(): Promise<express.Express> {
  await LoadDependencies(app);
  return app;
}
