import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Components/Table.js';
import RecordTable from'./Components/RecordTable.js';
import SelectorInitModal from './Components/SelectorInitModal.js';
import LocalPlayerDashboard from './Components/LocalPlayerDashboard.js';
import ExitButton from './Components/ExitButton.js';
import VersionLabel from './Components/VersionLabel.js';
import ShadowLayer from './Components/ShadowLayer.js';
import OpponentPlayerDashBoard from './Components/OpponentPlayerDashBoard.js'
import LoginModal from './Components/LoginModal.js';

export default function App(){
  //variabili e stati
  const [xWin,setXWin] = useState(0)
  const [oWin,setOWin] = useState(0)
  const [showSelectorInitModal,setShowSelectorInitModal] = useState(false)
  const [playerName,setPlayerName] = useState("player_name")
  const [showLoginModal,setShowLoginModal] = useState(false)

  //funzione post caricamento pagina
  useEffect(() => {
    const savedXWin = parseInt(localStorage.getItem('xWin'), 10)
    const savedOWin = parseInt(localStorage.getItem('oWin'), 10)
    const savedPlayerId = localStorage.getItem('playerId')

    if(savedXWin){
      setXWin(savedXWin)
    }
    if(savedOWin){
      setOWin(savedOWin)
    }
    if(savedPlayerId==-1){
      //l'utente non è loggato
      setShowSelectorInitModal(false);
      setShowLoginModal(true);
    }
    else{
      //l'utente è già loggato
      setShowSelectorInitModal(true);
      setShowLoginModal(false);
    }
  },[]);


  //funzione attivata ad ogni cambio di valore di 'xWin'
  useEffect(() => {
    localStorage.setItem('xWin',xWin)
    console.log('salvataggio di xWin: '+xWin)
  }, [xWin]);

  //funzione attivata ad ogni cambio di valore di 'oWin'
  useEffect(() => {
    localStorage.setItem('oWin',oWin)
    console.log('salvataggio di oWin: '+oWin)
  }, [oWin]);

  //aggiunge una nuova vittoria al team X
  function newXWin(){
    setXWin(xWin+1)
  }
  
  //aggiunge una nuova vittoria al team O
  function newOWin(){
    setOWin(oWin+1)
  }

  //resetta il record delle vittorie
  function resetRecord(){
    setXWin(0)
    setOWin(0)
  } 

  //funzione per gestire il gioco locale
  function newLocalGameSelected(){
    //document.getElementById("timeBar").style.animationPlayState = "running";
  }

  return( 
    <div>
      <div id="modal">
        {(showSelectorInitModal || showLoginModal) && <ShadowLayer/>}
        {showSelectorInitModal && <SelectorInitModal setShowSelectorInitModal={setShowSelectorInitModal} />}
        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal}/>}
        <div id="blurDiv1"></div>
        <div id="blurDiv2"></div>
        <div id="blurDiv3"></div>
      </div>
      <div id="mainDiv">
        <LocalPlayerDashboard playerName={playerName}/>
        <OpponentPlayerDashBoard/>
        <h1 id="mainTitle">Tris Game</h1>
        <RecordTable xWins={xWin} oWins={oWin}/>
        <Table newXWin={newXWin} newOWin={newOWin}/>
        <ExitButton/>
        <VersionLabel/>
      </div>
      <audio autoplay loop>
        <source src="Media/music_arcade.mp3" type="audio/mp3"></source>
        Your browser does not support the audio element.
      </audio>

    </div>
    );
};
