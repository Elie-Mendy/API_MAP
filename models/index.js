// ================== MODELISATION DE LA DATABASE =========================


// import de la config de la database
const config = (__dirname + '../config/db.config.js');


// import de l'ORM Sequelize + connexion a la DATABASE
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorsAliases : false,

    pool : {
        max : dbConfig.pool.max,
        min : dbConfig.pool.min,
        acquire : dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
});



// instantiation de la Database avec ses parametres
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize

// instanciation des tables de la database
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
