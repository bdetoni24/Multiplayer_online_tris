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

// Define the "Player" model
const Player = sequelizeDB.define('Player', {
  player_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: "Player's primary key",
  },
  nickname: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Player's nickname",
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "Player's password",
  },
  match_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "Shows in which match the player is in. If the parameter is empty means the player isn't in a match yet.",
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "Value to check if the player wants to join an online match",
  },
  last_online: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: "Value to check if the player is online in recent seconds",
  },
}, {
  tableName: 'players',
  timestamps: false,
});

// Define the "Match" model
const Match = sequelizeDB.define('Match', {
  match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: "Unique match ID",
  },
  player1_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "Foreign key of player 1's id",
  },
  player2_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "Foreign key of player 2's id",
  },
  history_match_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "Foreign key of a history match to store the table's status",
  },
  points_p1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "Player 1's points",
  },
  points_p2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "Player 2's points",
  },
}, {
  tableName: 'matches',
  timestamps: false,
});

// Define the "HistoryGame" model
const HistoryGame = sequelizeDB.define('HistoryGame', {
  history_match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    comment: "History match primary key",
  },
  match_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "Refers to the match",
  },
  status_cell1: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell2: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell3: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell4: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell5: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell6: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell7: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell8: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
  status_cell9: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    comment: "This parameter shows which player clicked it, if it's null means that the cell isn't being clicked yet",
  },
}, {
  tableName: 'history_game',
  timestamps: false,
});

// Define associations
Player.hasMany(Match, { foreignKey: 'player1_id', as: 'player1Matches' });
Player.hasMany(Match, { foreignKey: 'player2_id', as: 'player2Matches' });
Player.hasMany(HistoryGame, { foreignKey: 'match_id', as: 'historyGames' });
Match.belongsTo(Player, { foreignKey: 'player1_id', as: 'player1' });
Match.belongsTo(Player, { foreignKey: 'player2_id', as: 'player2' });
Match.hasOne(HistoryGame, { foreignKey: 'match_id', as: 'historyGame' });


//controlla se ci sono altri giocatori online per matcharli
app.post('/api/start-match/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;

    //controllo se si trova un giocatore già online
    const onlinePlayer = await Player.findOne({
      where: { is_online: true, player_id: { [Sequelize.Op.not]: playerId } },
    });

    if (onlinePlayer) {
      //se viene trovato un player online 
      await onlinePlayer.update({ is_online: false });
      const newMatch = await Match.create({
        player1_id: playerId,
        player2_id: onlinePlayer.player_id,
      });

      return res.status(200).json({ message: 'Match created successfully!', match: newMatch });
    } else {
      //se non viene trovato altro player online
      const currentPlayer = await Player.findByPk(playerId);
      if (!currentPlayer) {
        //se non viene trovato il player
        return res.status(404).json({ error: 'Player not found' });
      }
      else{
        //se il player viene trovato, allora ne cambio il valore in true
        await currentPlayer.update({ is_online: true });
        return res.status(200).json({ message: 'Player status updated successfully!' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
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
