const express = require('express');
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');
const path = require('path');
var cors = require('cors');
const port = 5000;
const app = express();

// creazione istanza del database
const sequelizeDB = new Sequelize('database_tris', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
});

/*API necessarie
  -riprendere lo status delle celle
  -riprendere il punteggio di x
  -riprendere il punteggio di y
  -modificare una cella
  -restituire un giocatore libero per matchare
  -new match in game

*/

// Abilita le richieste cross-origin da tutte le origini
app.use(cors());

// Imposta la cartella di build del progetto React
app.use(express.static(path.join(__dirname,'main-react-app', 'build')));

app.get('/', (req, res) => {
  console.log("connection...");
  const players = sequelizeDB.query('SELECT * FROM players');
  res.json(players);
});

// Avvia il server sulla porta desiderata
app.listen(port, function() {
  console.log('Server Express avviato sulla porta '+port);
  try {
    sequelizeDB.authenticate();
    console.log('Connection with the databasehas been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:');
  }
});
