import * as mongoose from "mongoose";
import config from "../config";

export default async function() {
  const env = process.env.NODE_ENV;
  let url;
  if (env == "production") {
    //   prod
    url = "mongodb://localhost:27017/node-temp-prod";
  } else if (env == "development") {
    //   dev
    url = "mongodb://localhost:27017/node-temp-dev";
  } else {
    //   test
    url = "mongodb://localhost:27017/node-temp-test";
  }

  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
}
