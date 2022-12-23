module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("cities", {
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
      foreign_key: true,
    },
  });

  return User;
};
