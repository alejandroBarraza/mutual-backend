const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  if ("NODE_ENV" === "production") {
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
          },
          options: {
            ssl: false,
          },
        },
      },
    };
  }

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: env("DATABASE_HOST"),
          port: env.int("DATABASE_PORT"),
          database: env("DATABASE_NAME"),
          username: env("DATABASE_USERNAME"),
          password: env("DATABASE_PASSWORD"),
          ssl: env.bool("DATABASE_SSL"),
        },
        options: {},
      },
    },
  };
};
