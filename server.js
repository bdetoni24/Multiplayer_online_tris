const express = require('express');
const path = require('path');

const app = express();

// Imposta la cartella di build del progetto React
app.use(express.static(path.join(__dirname,'main-react-app', 'build')));

// Gestisci la richiesta GET
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'main-react-app','build', 'index.html'));
});

// Avvia il server sulla porta desiderata
app.listen(3000, function() {
  console.log('Server Express avviato sulla porta 3000');
});
