const express = require('express');
const sequelize = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
var cors = require('cors');
const port = 5000;
const app = express();
app.use(express.json());

// creazione istanza del database
const sequelizeDB = new Sequelize('database_tris', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//inizializazzione di cors
app.use(cors({
  origin: '*',
  allowedHeaders: ['X-Requested-With', 'Content-Type'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//creazione del modello player
const Player = sequelizeDB.define('players', {
  player_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  match_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

//restituisce tutta la tabella players
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
    console.log(players);
  } catch (error) {
    res.status(500).json({ error: 'Errore del server' });
    console.log(error);
  }
});

//dato il playerId elimina il record del player
app.delete('/api/players/delete/:player_id', async (req, res) => {
  const player_id = req.params.player_id;

  try{
    await Player.destroy({
      where: {
        player_id: player_id,
      },
    });
  }
  catch(error){
    console.error(error)
  }

  res.status(200).send();
});

//aggiunge un nuovo record player
app.post('/api/players/addPlayer', async (req, res) => {
  const { nickname, password, match_id, is_online } = req.body;
  try {
    console.log('nickname: '+nickname);
    const newPlayer = await Player.create({
      nickname: nickname,
      password:password,
      match_id:match_id,
      is_online: is_online,
    });

    const newPlayerId = newPlayer.player_id;
    console.log('id new player: '+newPlayerId);

    // Ritorna il nuovo giocatore appena creato come risposta
    res.status(201).json(newPlayerId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore del server' });
  }
});

//dato un player_id restituisce il nickname
app.get('/api/players/:playerId', async (req, res) => {
  const playerId = req.params.playerId; // Ottieni il player_id dalla richiesta URL

  try {
    const player = await Player.findByPk(playerId, {
      attributes: ['nickname'], 
    });

    if (!player) {
      //se il non viene trovato restituisce lo status 404 error
      return res.status(404).json({ error: 'Player_not_found' });
    }

    res.json({ nickname: player.nickname });
  } catch (error) {
    res.status(500).json({ error: 'server_error' });
  }
});

// Imposta la cartella di build del progetto React
app.use(express.static(path.join(__dirname,'main-react-app', 'build')));


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
