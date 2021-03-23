// ============== modelisation de la table : tutorials =======================

module.exports = (sequelize, Sequelize) => {

    const Tutorial = sequelize.define("tutorial", {

      //  following columns will be generated automatically :
      // id
      // createdAt
      // updatedAt

      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };