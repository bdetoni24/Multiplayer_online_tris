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

//selezione dei middleweare da usare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  allowedHeaders: ['X-Requested-With', 'Content-Type'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// define player model
const Player = sequelizeDB.define('players', {
  player_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
    defaultValue: null,
  },
  party_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  last_online: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'players',
  timestamps: false,
});

// define match model
const Match = sequelizeDB.define('matches', {
  match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  player1_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  player2_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  history_match_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  points_p1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  points_p2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  is_end_match: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  is_end_game: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
  player_id_turn: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
}, {
  tableName: 'matches',
  timestamps: false,
});

// define historyGame model
const HistoryGame = sequelizeDB.define('history_game', {
  history_match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  match_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell1: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell2: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell3: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell4: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell5: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell6: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell7: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell8: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  status_cell9: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
}, {
  tableName: 'history_game',
  timestamps: false,
});

Player.hasMany(Match, { foreignKey: 'player1_id', as: 'player1Matches' });
Player.hasMany(Match, { foreignKey: 'player2_id', as: 'player2Matches' });
Player.hasMany(HistoryGame, { foreignKey: 'match_id', as: 'historyGames' });
Match.belongsTo(Player, { foreignKey: 'player1_id', as: 'player1' });
Match.belongsTo(Player, { foreignKey: 'player2_id', as: 'player2' });
Match.hasOne(HistoryGame, { foreignKey: 'match_id', as: 'historyGame' });

//dato il match_id restituisce il playerid_1
app.get('/api/Match/getPlayer1Id/:match_id', async (req, res) => {
  try {
    //presa dei parametri
    const { match_id } = req.params;

    //ricerca del match_id
    const match = await Match.findOne({
      where: { match_id },
      include: [{ model: Player, as: 'player1' }],
    });

    if (!match) {
      //se non trova nessun match_id
      return res.status(404).json({ message: 'Match not found' });
    }

    //se viene trovato il player allore ne estrae il id
    const player1_id = match.player1 ? match.player1.player_id : null;

    return res.json({ player1_id: player1_id });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//dato player_id restituisce il valore di match_id
app.get('/api/getMatchId/:player_id', async (req, res) => {
  const { player_id } = req.params;

  try {
    const player = await Player.findByPk(player_id, { attributes: ['match_id'] });
    if (player) {
      //se viene trovato un player
      res.json({ match_id: player.match_id });
    }
    else{
      //se non viene trovato alcun player
      return res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//controlla se ci sono altri giocatori online per matcharli
app.post('/api/start-match/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;

    //controllo se si trova un giocatore già online
    const onlinePlayer = await Player.findOne({
      where: {
        is_online: true,
        player_id: { [Sequelize.Op.not]: playerId },
        last_online: { [Sequelize.Op.gte]: new Date(Date.now() - 5000) },
      },
    });

    if (onlinePlayer) {
      //se viene trovato un player online che sia stato online negli ultimi 5 sec
      await onlinePlayer.update({ is_online: false });
      const newMatch = await Match.create({
        player1_id: playerId,
        player2_id: onlinePlayer.player_id,
        player_id_turn: playerId, 
      });

      await Player.update(
        { match_id: newMatch.match_id },
        { where: { player_id: { [Sequelize.Op.in]: [playerId, onlinePlayer.player_id] } } }
      );

      console.log("player trovato e match creato");
      return res.status(200).json({ message: 'Match created successfully!', match: newMatch , playerIdOpponent: onlinePlayer.player_id, nicknameOpponent: onlinePlayer.nickname});
    }
    else{
      //se non viene trovato altro player online
      const currentPlayer = await Player.findByPk(playerId);
      if (!currentPlayer) {
        //se non viene trovato il player
        console.log("player non trovato");
        return res.status(404).json({ error: 'Player not found' });
      }
      else{
        //se il player viene trovato, allora ne cambio il valore in true
        await currentPlayer.update({ is_online: true, last_online: new Date() });
        console.log("player modificato con successo");
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

//controlla se un username è già presente nel database
app.get('/api/check-nickname/:username', async (req, res) => {
  const { username } = req.params;
  console.log('chack username')

  try {
    const player = await Player.findOne({ where: { nickname: username } });

    if (player) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
