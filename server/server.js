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
const Match = sequelizeDB.define(
  'matches',
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    player1_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    player2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    history_match_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    play_again: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    player_id_turn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'matches',
  }
);

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

//funzione che imposta il inizio MATCH
app.put('/api/matches/:match_id/set-start-match', async (req, res) => { //works
  try {
    const { match_id } = req.params;

    //cerca il record del match corrispondente
    const match = await Match.findByPk(match_id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    //imposta "is_end_match" su true
    match.is_end_match = false;

    //salva le modifiche nel database
    await match.save();

    return res.json({ message: 'is_end_match updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//funzione che imposta il fine MATCH
app.put('/api/matches/:match_id/set-end-match', async (req, res) => { //works
  try {
    const { match_id } = req.params;

    //cerca il record del match corrispondente
    const match = await Match.findByPk(match_id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    //imposta "is_end_game" su true
    match.is_end_match = true;

    //salva le modifiche nel database
    await match.save();

    return res.json({ message: 'is_end_match updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//funzione che imposta il inizio GAME
app.put('/api/matches/:match_id/set-start-game', async (req, res) => { //works
  try {
    const { match_id } = req.params;

    //cerca il record del match corrispondente
    const match = await Match.findByPk(match_id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    //imposta "is_end_game" su true
    match.is_end_game = false;

    //salva le modifiche nel database
    await match.save();

    return res.json({ message: 'is_end_game updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//funzione che imposta il fine GAME
app.put('/api/matches/:match_id/set-end-game', async (req, res) => { //workd
  try {
    const { match_id } = req.params;

    //cerca il record del match corrispondente
    const match = await Match.findByPk(match_id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    //imposta "is_end_game" su true
    match.is_end_game = true;

    //salva le modifiche nel database
    await match.save();

    return res.json({ message: 'is_end_game updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//funzione che cambia il matchId
app.put('api/players/updatePartyId/:player_id', async (req, res) => {
  try {
    const { player_id } = req.params;
    const { party_id } = req.body;

    //controlla se il player esiste
    const player = await Player.findByPk(player_id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    //ne cambia il playerid
    player.party_id = party_id;
    await player.save();

    return res.status(200).json({ message: 'Player party_id updated successfully' });
  } catch (error) {
    console.error('Error updating party_id:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


//api che permette di inviare i dati della table
app.put('/api/history-game/putData/:match_id', async (req,res)=> {
  console.log("START SENDING DATA TABLE")
  try {
    const matchId = req.params.match_id;
    const updatedData = req.body;
    console.log('----data body: '+updatedData)
    //trova il match con l'ID fornito
    const match = await Match.findByPk(matchId);

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    //trova il record history_game corrispondente al match_id
    let historyGame = await HistoryGame.findByPk(match.history_match_id);

    if (!historyGame) {
      return res.status(404).json({ message: 'History game record not found' });
    }
  
    //aggiorna i dati del record history_game con quelli forniti in input
    historyGame = await historyGame.update(updatedData);
    
    //restituisci il record history_game aggiornato
    res.json({historyGame});
  } catch (error) {
    console.error('Error while updating history game record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//api che restituisce il valore di ogni cella dato historymatchId
app.get('/api/history-game/:match_id', async (req, res) => {
  try {
    const matchId = req.params.match_id;

    //cerca il match
    const match = await Match.findByPk(matchId);

    //guarda se non c'è un match
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    //trova il record history_game corrispondente al match_id
    const historyGame = await HistoryGame.findByPk(match.history_match_id);

    if (!historyGame) {
      return res.status(404).json({ message: 'History game record not found' });
    }

    //restituisci il record history_game
    res.json(historyGame);
  } catch (error) {
    console.error('Error while fetching history game record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//api che dato il match id restituisca il punteggio di p1 che di p2
app.get('/api/match/getPoints/:match_id', async (req, res) => {
  const { match_id } = req.params;
  try {
    //cerca il record match
    const match = await Match.findByPk(match_id, {
      include: [
        { model: Player, as: 'player1' },
        { model: Player, as: 'player2' },
      ],
    });

    //controlla se esiste il match
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    //prende i punti
    const points_p1 = match.points_p1;
    const points_p2 = match.points_p2;

    return res.json({ points_p1: points_p1, points_p2: points_p2 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error for points request' });
  }
});

//api che dato il player_id e il match_id controlli se il player_id_turn è lo stesso del player_id dato in input
app.get('/api/check-turn/:match_id/:player_id', async (req, res) => {
  try {
    const { match_id, player_id } = req.params;

    //trova il match corrispondente al match_id dato in input
    const match = await Match.findOne({
      where: { match_id },
      include: [
        { model: Player, as: 'player1' },
        { model: Player, as: 'player2' },
      ],
    });

    //controlla se il match esiste
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    //controlla se il player_id dato corrisponde al player_id_turn del match
    if (match.player_id_turn === parseInt(player_id)) {
      return res.json({ message: true });
    } else {
      return res.json({ message: false });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//dato il match_id e il player_id cambia il valore di player_id_turn
app.post('/api/matches/:match_id/update-player-turn/:player_id', async (req, res) => {
  const { match_id, player_id } = req.params;

  try {
    //trova il match
    const match = await Match.findOne({ where: { match_id } });

    if (!match) {
      //se il match non esiste
      return res.status(404).json({ message: 'Match not found' });
    }

    //aggiorna il valore del player_id_turn
    match.player_id_turn = player_id;
    await match.save();

    return res.status(200).json({ message: 'Player ID Turn updated successfully' });
  }
  catch (error){
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' });
  }
});


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

//dato un player_id ne aggiorna il valore lastonline
app.put('/api/players/updateDate/:player_id', async (req, res) => {
  try {
    const playerId = req.params.player_id;

    //trova ilo giocatore
    const player = await Player.findByPk(playerId);

    if (!player) {
      //giocatore non esiste
      return res.status(404).json({ error: 'Player not found' });
    }

    //ne aggiorna la data con quella odierna
    await player.update({ last_online: new Date() });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
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
    let onlinePlayer
    try{
      onlinePlayer = await Player.findOne({
        where: {
          is_online: true,
          player_id: { [Sequelize.Op.not]: playerId },
          last_online: { [Sequelize.Op.gte]: new Date(Date.now() - 5000) },
        },
      });
    }
    catch(error){
      console.error({error: 'errore nel trovare player online'})
    }

    if (onlinePlayer) {
      //se viene trovato un player online che sia stato online negli ultimi 5 sec
      await onlinePlayer.update({ is_online: false }); //cambia in false il is_online dell'altro player

      //viene creato un nuovo record historyGame
      const newHistoryGame = await HistoryGame.create({});

      // Create a new match and associate it with the history game
      const newMatch = await Match.create({
        player1_id: playerId,
        player2_id: onlinePlayer.player_id,
        player_id_turn: playerId,
        history_match_id: newHistoryGame.history_match_id,
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
        console.log("player impostato in online con successo");
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

//api che controlla se è presente l'username e la sua password ----DA SISTEMARE
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    //cerca se esiste l'username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    //controlla se la password è giusta
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ message: 'Login successful' });
  }
  catch (error) {
    console.error('Error nel login:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
      console.log("nickname già presente")
    } else {
      res.json({ exists: false });
      console.log("nickname non preente")
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
