module.exports = (sequelize, Sequelize) => {
  const PopulationCounts = sequelize.define("population", {
    year: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    reliability: {
      type: Sequelize.STRING,
    },
  });

  return PopulationCounts;
};
