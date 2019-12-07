const env = process.env.NODE_ENV || "development";

export default {
  BASE_URL: env == "production" ? process.env.BASE_URL : "http://localhost",
  PORT_HTTPS: process.env.PORT_HTTPS || 3000,
  PORT_HTTP: process.env.PORT_HTTP || 5000,
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS || 12,
  JWT_AUTH_USER: process.env.JWT_AUTH_USER,
  JWT_AUTH_ADMIN: process.env.JWT_AUTH_ADMIN,
  MLAB_USER: process.env.MLAB_USER,
  MLAB_PASSWORD: process.env.MLAB_PASSWORD,
  CONFIRM_EMAIL_KEY: process.env.CONFIRM_EMAIL_KEY
};
