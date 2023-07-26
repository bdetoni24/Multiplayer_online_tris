import React, { useState, useEffect } from 'react'
import './App.css'
import Table from './Components/Table.js'
import RecordTable from'./Components/RecordTable.js'
import SelectorInitModal from './Components/SelectorInitModal.js'
import LocalPlayerDashboard from './Components/LocalPlayerDashboard.js'
import ExitButton from './Components/ExitButton.js'
import VersionLabel from './Components/VersionLabel.js'
import ShadowLayer from './Components/ShadowLayer.js'
import OpponentPlayerDashBoard from './Components/OpponentPlayerDashBoard.js'
import LoginModal from './Components/LoginModal.js'
import LoadingModal from './Components/LoadingModal.js'
import axios from 'axios'

export default function App(){
  //variabili e stati
  const [xWin,setXWin] = useState(0)
  const [oWin,setOWin] = useState(0)
  const [showSelectorInitModal,setShowSelectorInitModal] = useState(false)
  const [showLoginModal,setShowLoginModal] = useState(false)
  const [showLoadingModal,setShowLoadingModal] = useState(false)
  const [localPlayerId,setLocalPlayerId] = useState(-1) //ERRORE
  const [localPlayerName,setLocalPlayerName] = useState("player_name")
  const [opponentPlayerId,setOpponentPlayerId] = useState(-1)
  const [opponentPlayerName,setOpponentPlayerName] = useState("opponent_name")
  const [matchId,setMatchId] = useState(-1) //non occorre salvarlo in memoria? si per evitare che se si aggiorna si esce dal game
  const [myTurn,setMyTurn] = useState(false)

  //funzione post caricamento pagina
  useEffect(() => {
    console.log("---INITIALIZATION---")
    const savedXWin = parseInt(localStorage.getItem('xWin'), 10)
    const savedOWin = parseInt(localStorage.getItem('oWin'), 10)
    const savedMatchId = parseInt(localStorage.getItem('matchId'),10)
    //const savedLocalPlayerId = parseInt(localStorage.getItem('localPlayerId'),10)
    if(savedXWin){
      setXWin(savedXWin)
    }
    if(savedOWin){
      setOWin(savedOWin)
    }
    if(savedMatchId){
      setMatchId(savedMatchId)
    }

    //gestione del login
    if(getLocalPlayerId()==-1){
      //utente non è loggato 
      console.log('utente non loggato')
      setShowSelectorInitModal(false)
      setShowLoginModal(true)
      blurAll()
    }
    else{
      //utente già loggato
      console.log('utente loggato')
      setShowSelectorInitModal(true)
      setShowLoginModal(false)
      blurAll()
      getLocalPlayerNameApi(getLocalPlayerId())

      //gestione del match online (se il player è già dentro un match)
    }
    console.log("localPlayerId: "+localPlayerId)
    console.log("---end INITIALIZATION---")
  },[])

  //
  function getLocalPlayerId(){
    if(localStorage.getItem('localPlayerId')){
      return parseInt(localStorage.getItem('localPlayerId'),10)
    }
    else{
      return -1
    }
  }

  function setSetLocalPlayerId(id){
    localStorage.setItem('localPlayerId',parseInt(id),10)
  }

  //serve a prendere il nickname dato il player_id
  async function getLocalPlayerNameApi (playerId) {
    try {

      const response = await axios.get(`http://localhost:5000/api/players/${playerId}`)
      setLocalPlayerName(response.data.nickname)
      console.log(response.data.nickname)
    } catch (error) {
      console.error('Errore durante la chiamata API per il nickname dato il player_id:', error)
    }
  }

  async function logOut(){
    try{
      const response = await axios.delete(`http://localhost:5000/api/players/delete/${localPlayerId}`)
      console.log(response)
    }
    catch (error){
      console.error(error)
    }
    setShowLoginModal(true)
    setShowSelectorInitModal(false)
    setSetLocalPlayerId(-1)
    setLocalPlayerName("player_name")
    console.log("logOut....")
  }

  //si attiva quando viene cliccato un new game
  function newGameSelected(){
    setShowSelectorInitModal(false)
    setShowLoadingModal(true)
    findOpponent()
  }

  function myMove(){
    setMyTurn(true)
    //document.getElementById('localTimeBar').style.animation = "running"
    //document.getElementById('opponentTimeBar').style.animation = "paused"
  }

  async function findOpponent(){
    let pollingMatchId
    try{
      const response = await axios.post(`http://localhost:5000/api/start-match/${localPlayerId}`)
      if(response.data.match){
        //se viene creato un match
        console.log("Match creato: "+response.data.match.match_id)
        setOpponentPlayerName(response.data.nicknameOpponent)
        setOpponentPlayerId(response.data.playerIdOpponent)
        setShowLoadingModal(false)
        console.log("--OPPONENT INFO--")
        console.log("\t-nome: "+response.data.nicknameOpponent)
        console.log("\t-id: "+response.data.playerIdOpponent)
        window.location.href += response.data.match.match_id
        myMove()
        unBlurAll()
      }
      else{
        console.log("Match NON creato")
        //creazione del polling per controllare ogni 4.5sec se c'è stato un match
        pollingMatchId = setInterval(() => getMatchId(localPlayerId,pollingMatchId), 500)
      }
    }
    catch(error){
      console.log("errore nel trovare un avversario online")
      clearInterval(pollingMatchId)
    }
  }

  async function getMatchId(playerId,pollingMatchId){
    console.log("---getMatchId() in esecuzione")
    try {
      const response = await axios.get(`http://localhost:5000/api/getMatchId/${playerId}`)
      if (response.data.match_id !== null) {
        console.log("Match trovato!: " + response.data.match_id)
        setMatchId(response.data.match_id)
        try{
          const response2 = await axios.get(`http://localhost:5000/api/Match/getPlayer1Id/${response.data.match_id}`)
          const opponentPlayerId = response2.data.player1_id
          console.log("playerOpponentId: "+opponentPlayerId)
          try{
            const response3 = await axios.get(`http://localhost:5000/api/players/${opponentPlayerId}`)
            console.log('opponent name: '+response3.data.nickname)
            setOpponentPlayerName(response3.data.nickname)
            setOpponentPlayerId(opponentPlayerId)
            setShowLoadingModal(false)
            unBlurAll()
            notMyMove()
            window.location.href += response.data.match.match_id
            clearInterval(pollingMatchId)
          }
          catch(error){
            console.error(error)
          }

        }
        catch(error){
          console.error(error)
        }
        //initNewGame()
      }
    } catch (error) {
      console.error(error)
    }
  }

  //funzione che si attiva quando non è il turno del local di gi
  function notMyMove(){
    setMyTurn(false)
  }

  //funzione che istanzia
  function initNewGame(){
    
  }

  //funzione attivata ad ogni cambio di valore di 'xWin'
  useEffect(() => {
    console.log('+++++++++++salvataggio di xWin: ' + xWin)
    localStorage.setItem('xWin',xWin)
  }, [xWin])

  //funzione attivata ad ogni cambio di valore di 'oWin'
  useEffect(() => {
    localStorage.setItem('oWin',oWin)
  }, [oWin])

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
  
  //toglie il blur a tutto
  function unBlurAll(){
    const blurFilter = ""
    document.getElementById("mainTitle").style.filter = blurFilter
    document.getElementById("exitButton").style.filter = blurFilter 
    document.getElementById("recordTable").style.filter = blurFilter
    //document.getElementById("versionLabel").style.filter = blurFilter
    document.getElementById("exitButton").style.filter = blurFilter
    document.getElementById("mainTable").style.filter = blurFilter
    document.getElementById("localPlayerDashboard").style.filter = blurFilter
    document.getElementById("opponentPlayerDashboard").style.filter = blurFilter
  }

  //mette il blur a tutto
  function blurAll(){
    const blurFilter = "blur(100px)"
    document.getElementById("mainTitle").style.filter = blurFilter
    document.getElementById("exitButton").style.filter = blurFilter
    document.getElementById("recordTable").style.filter = blurFilter
    //document.getElementById("versionLabel").style.filter = blurFilter
    document.getElementById("exitButton").style.filter = blurFilter
    document.getElementById("mainTable").style.filter = blurFilter
    document.getElementById("localPlayerDashboard").style.filter = blurFilter
    document.getElementById("opponentPlayerDashboard").style.filter = blurFilter
  }

 

  return( 
    <div>
      <div id="modal">
        {(showSelectorInitModal || showLoginModal || showLoadingModal) && <ShadowLayer/>}
        {showLoadingModal && <LoadingModal/>}
        {showSelectorInitModal && <SelectorInitModal newGameSelected={newGameSelected} setShowLoadingModal={setShowLoadingModal} logOut={logOut} localPlayerName={localPlayerName}/>}
        {showLoginModal && <LoginModal setLocalPlayerName={setLocalPlayerName} setLocalPlayerId={setLocalPlayerId} setShowSelectorInitModal={setShowSelectorInitModal} setShowLoginModal={setShowLoginModal}/>}
        <div id="blurDiv1"></div>
        <div id="blurDiv2"></div>
        <div id="blurDiv3"></div>
      </div>
      <div id="mainDiv">
        <LocalPlayerDashboard localPlayerName={localPlayerName}/>
        <OpponentPlayerDashBoard opponentPlayerName={opponentPlayerName}/>
        <h1 id="mainTitle">Tris Game</h1>
        <RecordTable xWins={xWin} oWins={oWin}/>
        <Table myTurn={myTurn} newXWin={newXWin} newOWin={newOWin}/>
        <ExitButton/>
        <VersionLabel/>
      </div>

    </div>
    )
}
