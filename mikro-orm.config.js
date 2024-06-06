const { resolve } = require("path");

const MikroOrmConfig = {
  type: "postgresql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_DATABASE,
  entities: ["dist/**/*.entity.js"],
  baseDir: resolve(__dirname)
};

module.exports = MikroOrmConfig;
