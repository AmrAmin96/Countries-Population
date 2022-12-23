module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("cities", {
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.INTEGER,
    },
  });

  return User;
};
