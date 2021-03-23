// ================= CONFIGURATION DE LA DATABASE ==================


module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "API_mapping",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };