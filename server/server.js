const express = require('express');
const path = require('path');
const port = 5000;
const app = express();

/*API necessarie
  -riprendere lo status delle celle
  -riprendere il punteggio di x
  -riprendere il punteggio di y
  -modificare una cella
  -restituire un giocatore libero per matchare
  -new match in game

*/

// Imposta la cartella di build del progetto React
app.use(express.static(path.join(__dirname,'main-react-app', 'build')));

// Gestisci la richiesta GET
app.get('/', function(req, res) {
  
});

// Avvia il server sulla porta desiderata
app.listen(port, function() {
  console.log('Server Express avviato sulla porta '+port);
});
