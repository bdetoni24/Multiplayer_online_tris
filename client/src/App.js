import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Components/Table.js';
import RecordTable from'./Components/RecordTable.js';
import SelectorInitModal from './Components/SelectorInitModal.js';
import PlayerDashboard from './Components/PlayerDashboard.js';
import ExitButton from './Components/ExitButton.js';
import VersionLabel from './Components/VersionLabel.js';

export default function App(){
  //variabili e stati
  const [xWin,setXWin] = useState(0)
  const [oWin,setOWin] = useState(0)
  const [showModal,setShowModal] = useState(false)
  const [playerName,setPlayerName] = useState("player_name")

  //funzione post caricamento pagina
  useEffect(() => {
    const savedXWin = parseInt(localStorage.getItem('xWin'), 10)
    const savedOWin = parseInt(localStorage.getItem('oWin'), 10)

    if(savedXWin){
      setXWin(savedXWin)
    }
    if(savedOWin){
      setOWin(savedOWin)
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

  return( 
    <div>
      {!showModal && <div id="shadow"></div>}
      {!showModal && <SelectorInitModal setShowModal={setShowModal} setPlayerName={setPlayerName}/>}
      <div id="mainDiv">
        <PlayerDashboard playerName={playerName}/>
        <h1 id="mainTitle">Tris Game</h1>
        <RecordTable xWins={xWin} oWins={oWin}/>
        <Table newXWin={newXWin} newOWin={newOWin}/>
        <ExitButton/>
        <VersionLabel/>
      </div>
    </div>
    );
};
