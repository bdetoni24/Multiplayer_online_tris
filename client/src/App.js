
import OpponentPlayerDashBoard from './Components/OpponentPlayerDashBoard.js'
import LocalPlayerDashboard from './Components/LocalPlayerDashboard.js'
import SelectorInitModal from './Components/SelectorInitModal.js'
import VersionLabel from './Components/VersionLabel.js'
import LoadingModal from './Components/LoadingModal.js'
import ShadowLayer from './Components/ShadowLayer.js'
import React, { useState, useEffect } from 'react'
import RecordTable from'./Components/RecordTable.js'
import ExitButton from './Components/ExitButton.js'
import LoginModal from './Components/LoginModal.js'
import Table from './Components/Table.js'
import axios from 'axios'
import './App.css'

export default function App(){
  //variabili e stati
  const [xWin,setXWin] = useState(0)
  const [oWin,setOWin] = useState(0)
  const [showSelectorInitModal,setShowSelectorInitModal] = useState(false)
  const [showLoginModal,setShowLoginModal] = useState(false)
  const [showLoadingModal,setShowLoadingModal] = useState(false)
  let [localPlayerId,setLocalPlayerId] = useState(-1) //ERRORE
  const [localPlayerName,setLocalPlayerName] = useState("player_name")
  const [opponentPlayerId,setOpponentPlayerId] = useState(-1)
  const [opponentPlayerName,setOpponentPlayerName] = useState("opponent_name")
  let [matchId,setMatchId] = useState(-1) //non occorre salvarlo in memoria? si per evitare che se si aggiorna si esce dal game
  const [myTurn,setMyTurn] = useState(false)
  const [secondsRemaining,setSecondsRemaining] = useState(10)
  const url2 = new URL('http://localhost:3000/')
  const history = window.history;
  let timer

  //funzione post caricamento pagina
  useEffect(() => { //FARE CONTROLLO CHE NON SIA GIà DENTRO UN MATCH
    console.log("---INITIALIZATION---")
    const savedXWin = parseInt(localStorage.getItem('xWin'), 10)
    const savedOWin = parseInt(localStorage.getItem('oWin'), 10)
    const savedMatchId = parseInt(localStorage.getItem('matchId'),10) //posso anche andarlo a prendere come parametro
    const savedLocalPlayerId = parseInt(localStorage.getItem('localPlayer_id'),10)
    if(savedXWin){
      setXWin(savedXWin)
    }
    if(savedOWin){
      setOWin(savedOWin)
    }
    if(savedMatchId){
      setMatchId(savedMatchId)
      matchId = savedMatchId 
    }
    if(savedLocalPlayerId){
      setLocalPlayerId(savedLocalPlayerId)
      localPlayerId = savedLocalPlayerId
    }

    //gestione del login
    if(localPlayerId==-1){
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
      getLocalPlayerNameApi(localPlayerId)

      //gestione del match online (se il player è già dentro un match)
    }
    console.log("localPlayerId: "+localPlayerId)
    console.log("---end INITIALIZATION---")
  },[])

  //funzione attivata ad ogni cambiamento di localPlayerId
  useEffect(() => {
    localStorage.setItem('localPlayer_id',localPlayerId)
  }, [localPlayerId]);

  //funzione attivata ad ogni cambio di turno e di secondi rimamenti §(posso integrare tutto dentro un component timer)
  useEffect(() => {
    if(secondsRemaining===10){
      //gestisco la parte grafica delle dashboard alla ripartenza del game in local
      document.getElementById('localTimeBar').style.width = "0px"
      document.getElementById('localTimeBar').style.animation = "running"
      document.getElementById('opponentTimeBar').style.animation = "paused"
      document.getElementById('opponentTimeBar').style.width = '0px'
    }

    if (myTurn && secondsRemaining > 0) {
      timer = setTimeout(() => setSecondsRemaining(secondsRemaining - 1), 1000)
      console.log('secondi rimanenti: '+secondsRemaining)
    }
    else if (myTurn && secondsRemaining === 0) {
      handleTimeout()
      notMyMove()
    }

    //codice da eseguire in caso di componente smontato
    return () => clearTimeout(timer);
  }, [myTurn, secondsRemaining]);

  //funzione avviata a fine timeout
  async function handleTimeout() {
    console.log("FINE TEMPO A DISPOZIONE")

    //impostare il turno al giocatore dopo
    const response = await axios.post(`http://localhost:5000/api/matches/${matchId}/update-player-turn/${opponentPlayerId}`)
    console.log(response.data.message)
    notMyMove()

    document.getElementById('opponentTimeBar').style.width = "0px"
    document.getElementById('opponentTimeBar').style.animation = "running"
    document.getElementById('localTimeBar').style.animation = "paused"
    document.getElementById('localTimeBar').style.width = '0px'
  };


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
    setLocalPlayerId(-1)
    setLocalPlayerName("player_name")
    console.log("logOut....")
  }

  //si attiva quando viene cliccato un new game
  function newGameSelected(){
    setShowSelectorInitModal(false)
    setShowLoadingModal(true)
    findOpponent()
  }



  async function findOpponent(){
    console.log('find opponent')
    let pollingMatchId
    let pollingUpdateDateLastOnline
    try{
      const response = await axios.post(`http://localhost:5000/api/start-match/${localPlayerId}`) //il localplayerId rimane -1
      if(response.data.match){
        //se viene creato un match
        console.log("Match creato: "+response.data.match.match_id)
        setMatchId(response.data.match.match_id)
        matchId = response.data.match.match_id
        setOpponentPlayerName(response.data.nicknameOpponent)
        setOpponentPlayerId(response.data.playerIdOpponent)
        setShowLoadingModal(false)
        console.log("--OPPONENT INFO--")
        console.log("\t-nome: "+response.data.nicknameOpponent)
        console.log("\t-id: "+response.data.playerIdOpponent)
        url2.searchParams.set('matchId',response.data.match.match_id)
        console.log(url2.search)
        
        history.pushState({}, null, url2);
        myMove()
        unBlurAll()
      }
      else{
        console.log("Match NON creato")
        //creazione del polling per controllare ogni 4.5sec se c'è stato un match
        pollingMatchId = setInterval(() => getMatchId(localPlayerId,pollingMatchId,pollingUpdateDateLastOnline), 500)
        pollingUpdateDateLastOnline = setInterval(() => updateDateLastOnline(localPlayerId),4500)
      }
    }
    catch(error){
      console.log("errore nel trovare un avversario online")
      clearInterval(pollingMatchId)
    }
  }

  async function updateDateLastOnline(player_id){
    try{
      const response = axios.put(`http://localhost:5000/api/players/updateDate/${player_id}`)
      console.log('aggiornamento della data in corso..')
    }
    catch (error){
      console.error(error)
    }
  }

  //serve per fare il polling se non si è trovato un'altro giocatore online
  async function getMatchId(playerId,pollingMatchId,pollingUpdateDateLastOnline){
    console.log("---getMatchId() in esecuzione")
    try {
      //serve ad ottenere il match_id
      const response = await axios.get(`http://localhost:5000/api/getMatchId/${playerId}`)

      //controllo che esiste il match
      if (response.data.match_id !== null) {
        console.log("Match trovato!: " + response.data.match_id)
        setMatchId(response.data.match_id)
        matchId = response.data.match_id

        //ottengo il player_id dell'avversario
        try{
          const response2 = await axios.get(`http://localhost:5000/api/Match/getPlayer1Id/${response.data.match_id}`)
          const opponentPlayerId = response2.data.player1_id
          console.log("playerOpponentId: "+opponentPlayerId)

          //ottengo il nome dell'avversario
          try{
            const response3 = await axios.get(`http://localhost:5000/api/players/${opponentPlayerId}`)
            console.log('opponent name: '+response3.data.nickname)
            setOpponentPlayerName(response3.data.nickname)
            setOpponentPlayerId(opponentPlayerId)
            setShowLoadingModal(false)

            //cambio schermata
            unBlurAll()
            notMyMove()

            //cambio dell'url mettendo un nuovo parametro
            url2.searchParams.set('matchId',response.data.match_id)
            console.log(url2.search)
            history.pushState({}, null, url2);
            clearInterval(pollingMatchId)
            clearInterval(pollingUpdateDateLastOnline)
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

  //funzione che fa fetch per vedere quando è il turno del local
  async function fetchMyTurn(currentTime,polling){
    console.log("fetching myTurn")
    if(currentTime-((new Date().getTime())/1000)<15){
      try{
        const response = await axios.get(`http://localhost:5000/api/check-turn/${matchId}/${localPlayerId}`)
        const isMyTurn = response.data.message
        console.log("isMyTurn: "+isMyTurn)
  
        if(isMyTurn){
          console.log("E' il mio turno di giocare")
          myMove(polling)

        }
        else{
          console.error(response.data.message)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    else{
      //non risponde più il player avversario (si è disconnesso in modo anomalo)
      clearInterval(polling)
      console.log("il player avversario non risponde da 15 secondi")
    }
  }

  //funzione che si attiva quando non è il turno del local di gi
  function notMyMove(){
    fetchPoints()
    setMyTurn(false)

    //cambio del cursore
    document.getElementById('mainTable').style.cursor = 'not-allowed'
    document.getElementById('opponentTimeBar').style.width = "0px"
    document.getElementById('opponentTimeBar').style.animation = "running"
    document.getElementById('localTimeBar').style.animation = "paused"
    document.getElementById('localTimeBar').style.width = '0px'

    //far ripartire il polling per vedere se è arrivato il mio turno
    const currentTime = (new Date().getTime())/1000
    const pollingFetchMyTurn = setInterval(() => {fetchMyTurn(currentTime,pollingFetchMyTurn)},500)
  }

  //controlla il punteggio
  async function fetchPoints(){
    try{
      const response = await axios.get(`http://localhost:5000/api/match/getPoints/${matchId}`)
      console.log("Fetch points: p1="+response.data.points_p1+" p2="+response.data.points_p2)
      
      //imposto il punteggio 
      setOWin(response.data.points_p1)
      setXWin(response.data.points_p2)
    }
    catch (error){
      console.error(error)
    }
  }

  //funzione attivata quando tocca a fare la mossa
  function myMove(pollingFetchMyTurn){
    setMyTurn(true)

    //cambio del puntatore sopra la table
    document.getElementById('mainTable').style.cursor = 'pointer'
    document.getElementById('opponentTimeBar').style.width = "0px"
    document.getElementById('opponentTimeBar').style.animation = "paused"
    document.getElementById('localTimeBar').style.width = '0px'
    document.getElementById('localTimeBar').style.animation = "running"

    //controllo del punteggio
    fetchPoints()

    //far partire il polling per iltimer di scadenza
    
    setSecondsRemaining(10)
    clearInterval(pollingFetchMyTurn)

    //cambiare le dashboard
    //document.getElementById('localTimeBar').style.animation = "running"
    //document.getElementById('opponentTimeBar').style.animation = "paused"
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
        <Table handleTimeout={handleTimeout} matchId={matchId} myTurn={myTurn} newXWin={newXWin} newOWin={newOWin}/>
        <ExitButton/>
        <VersionLabel/>
      </div>

    </div>
    )
}
