import appLoader from "../app";
import mongooseLoader from "../loaders/mongoose";
import { Express } from "express";
import { Connection } from "mongoose";

export default async function(): Promise<{
  app: Express;
  dbConn: Connection;
}> {
  const app = await appLoader();
  const database = await mongooseLoader();

  return { app, dbConn: database.connection };
}
