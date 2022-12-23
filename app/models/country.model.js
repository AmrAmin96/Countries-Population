module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("countries", {
    country: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    iso3: {
      type: Sequelize.STRING,
    },
  });

  return Country;
};
