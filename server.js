// ===================  Point d'entrée de L'API ===================



// import des differents modules 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');




// instanciation de l'appli
const app = express();



// Utilisation des options CORS (middleware d'accès router)
var corsOptions = {
    origin: "http://localhost:8081"
};



// middlewares
app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



/* simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });*/

// View engine setup
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
  });


// Synchronisation avec la database
const db = require('./models')
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

  // import des routes 
require("./routes/turorial.routes")(app);

// Definition du port d'ecoute
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});