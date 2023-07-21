const express = require('express');
const path = require('path');
var cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const port = 5000;
const app = express();

// Configura la connessione al database MySQL
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
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

//controlla se è presente un username
app.get('/api/checkUsername/:username', async (req, res) => {
  console.log("activation of:  /api/checkUsername/:username");
  const { username } = req.params;

  try {
    const player = await Players.findOne({ where: { nickname: username } });
    const exists = !!player; // Converti il risultato in un booleano
    res.json({ exists });
  } catch (error) {
    console.error('Errore durante la ricerca dell\'username:', error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

app.get('/test', (req, res) => {
  console.log("connection...");
  res.send('Hello from Express!');
});

// Avvia il server sulla porta desiderata
app.listen(port, function() {
  console.log('Server Express avviato sulla porta '+port);
});
