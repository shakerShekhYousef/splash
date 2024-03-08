import { config } from "dotenv";
import * as path from "path";

config({
  path: path.join(
    process.cwd(),
    "environments",
    `${process.env.NODE_ENV || "development"}.env`
  ),
});

export const ENV_DEVELOPMENT = "development";
export const ENV_PRODUCTION = "production";
export const ENV_STAGING = "staging";
export const ENV_QA = "qa";

export const ENV = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isTest: process.env.NODE_ENV === ENV_QA,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  api: {
    API_PREFIX: process.env.API_PREFIX,
    API_VERSION: process.env.API_VERSION,
    API_TITLE: process.env.API_TITLE,
    API_DESCRIPTION: process.env.API_DESCRIPTION,
  },


  logger: {
    LOG_FOLDER: process.env.LOG_FOLDER,
  },
};