import expressLoader from "./express";
import { Express } from "express";
import mongooseLoader from "./mongoose";
import logger from "./winston";
import { Container } from "typedi";

export default async function(app: Express) {
  Container.set("logger", logger);
  logger.info("Logger set to DI Container");
  await expressLoader(app);
  logger.info("express loaded");

  await mongooseLoader();
  logger.info("mongoose loaded");
}
