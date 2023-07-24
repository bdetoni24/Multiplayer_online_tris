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
import axios from 'axios';

export default function App(){
  //variabili e stati
  const [xWin,setXWin] = useState(0)
  const [oWin,setOWin] = useState(0)
  const [showSelectorInitModal,setShowSelectorInitModal] = useState(false)
  const [showLoginModal,setShowLoginModal] = useState(false)
  const [localPlayerId,setLocalPlayerId] = useState(-1);
  const [localPlayerName,setLocalPlayerName] = useState("player_name")
  const [opponentPlayerId,setOpponentPlayerId] = useState(-1);
  const [opponentPlayerName,setOpponentPlayerName] = useState("opponent_name")

  //funzione post caricamento pagina
  useEffect(() => {
    const savedXWin = parseInt(localStorage.getItem('xWin'), 10)
    const savedOWin = parseInt(localStorage.getItem('oWin'), 10)
    const savedLocalPlayerId = parseInt(localStorage.getItem('localPlayerId'),10)

    
    console.log("savedPlayer id: "+savedLocalPlayerId);

    if(savedXWin){
      setXWin(savedXWin)
    }
    if(savedOWin){
      setOWin(savedOWin)
    }
    if(!(savedLocalPlayerId==-1)){
      //se l'id è stato cambiato
      console.log("LOGGATO");
      setLocalPlayerId(savedLocalPlayerId);
      if(savedLocalPlayerId===-1){
        //l'utente non è loggato
        setShowSelectorInitModal(false);
        setShowLoginModal(true);
        blurAll();
        console.log('not logged')
      }
      else{
        //l'utente è già loggato
        setShowSelectorInitModal(true);
        setShowLoginModal(false);
        blurAll();
        getLocalPlayerNameApi(parseInt(localPlayerId,10));
      }
    }
    else{
      //se non è stato salvato nulla
      console.log("NON LOGGATO")
      if(localPlayerId===-1){
        //l'utente non è loggato
        setShowSelectorInitModal(false);
        setShowLoginModal(true);
        blurAll();
      }
      else{
        //l'utente è già loggato
        setShowSelectorInitModal(true);
        setShowLoginModal(false);
        blurAll();
        getLocalPlayerNameApi(parseInt(localPlayerId,10));
      }
    }
    console.log("INIT, localPlayerId: "+localPlayerId);



    document.getElementById("timeBar").style.animationPlayState = "paused";
    document.getElementById("timeBar").style.animationPlayState = "paused";
  },[]);

  //serve a prendere il nickname dato il player_id
  async function getLocalPlayerNameApi (playerId) {
    try {

      const response = await axios.get(`http://localhost:5000/api/players/${playerId}`);
      setLocalPlayerName(response.data.nickname);
      console.log(response.data.nickname);
    } catch (error) {
      console.error('Errore durante la chiamata API per il nickname dato il player_id:', error);
    }
  };

  //chiude il selector init modal
  function closeSelectorInitModal(){
    unBlurAll();
    setShowSelectorInitModal(false);
  }

  //funzione attivata ad ogni cambio di playerId
  useEffect(() => {
    localStorage.setItem('localPlayerId',localPlayerId)
    console.log('salvataggio di localPlayerIddd: '+localPlayerId)
  }, [localPlayerId]);

  //funzione attivata ad ogni cambio di valore di 'xWin'
  useEffect(() => {
    localStorage.setItem('xWin',xWin)
  }, [xWin]);

  //funzione attivata ad ogni cambio di valore di 'oWin'
  useEffect(() => {
    localStorage.setItem('oWin',oWin)
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

  
  //toglie il blur a tutto
  function unBlurAll(){
    const blurFilter = ""
    document.getElementById("mainTitle").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter; 
    document.getElementById("recordTable").style.filter = blurFilter;
    document.getElementById("versionLabel").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter;
    document.getElementById("mainTable").style.filter = blurFilter;
    document.getElementById("localPlayerDashboard").style.filter = blurFilter;
    document.getElementById("opponentPlayerDashboard").style.filter = blurFilter;
  }

  //mette il blur a tutto
  function blurAll(){
    const blurFilter = "blur(100px)"
    document.getElementById("mainTitle").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter;
    document.getElementById("recordTable").style.filter = blurFilter;
    document.getElementById("versionLabel").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter;
    document.getElementById("mainTable").style.filter = blurFilter;
    document.getElementById("localPlayerDashboard").style.filter = blurFilter;
    document.getElementById("opponentPlayerDashboard").style.filter = blurFilter;
  }

  return( 
    <div>
      <div id="modal">
        {(showSelectorInitModal || showLoginModal) && <ShadowLayer/>}
        {showSelectorInitModal && <SelectorInitModal closeSelectorInitModal={closeSelectorInitModal} localPlayerName={localPlayerName}/>}
        {showLoginModal && <LoginModal setLocalPlayerId={setLocalPlayerId} setShowSelectorInitModal={setShowSelectorInitModal} setShowLoginModal={setShowLoginModal}/>}
        <div id="blurDiv1"></div>
        <div id="blurDiv2"></div>
        <div id="blurDiv3"></div>
      </div>
      <div id="mainDiv">
        <LocalPlayerDashboard localPlayerName={localPlayerName}/>
        <OpponentPlayerDashBoard opponentPlayerName={opponentPlayerName}/>
        <h1 id="mainTitle">Tris Game</h1>
        <RecordTable xWins={xWin} oWins={oWin}/>
        <Table newXWin={newXWin} newOWin={newOWin}/>
        <ExitButton/>
        <VersionLabel/>
      </div>

    </div>
    );
};
