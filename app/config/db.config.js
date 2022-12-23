module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "Countries Population",
  port: 3000,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
