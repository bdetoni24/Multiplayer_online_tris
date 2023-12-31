import React, { useEffect, useImperativeHandle, useState } from 'react';
import '../App.css';
import SimpleTable from './SimpleTable';
import RematchButton from './RematchButton';
import BannerWinner from './BannerWinner';
import { forwardRef } from 'react';
import axios from 'axios'

export default forwardRef(Table)

function Table(props,ref){
  //variabili e stati
  const [isEndGame,setIsEndGame] = useState(false);
  const [rematchVisible, setRematchVisible] = useState(false)
  const [labelWinner,setLabelWinner] = useState('')
  const char = 'o'
  let [cells,setCells] = useState([0,0,0,0,0,0,0,0,0])
  let nClick=0; //per fermare il game in caso di pareggio

  //collega App con Table
  useImperativeHandle(ref, () => ({downloadCells,}))

  useEffect(() => {
    console.log('cells modified: '+cells)
  },[cells])

  //funzione che prende l'array e cambia gli stati delle celle visive
  function fetchTable(){
    //resettare la tabella (lo dovrebbe fare in automatico)
    //tableRematch()

    //impostare il click per ogni cella
    nClick=0;

    //modifica grafica al click
    for(let i=0;i<9;i++){
      let cell = document.getElementById(i+'')
      if(cells[i]==1){
        //cella cliccata dal primo player (lcoal)
        nClick++
        cell.style.color = "green"
        checkWinner(1,"green"); //sarebbe da fare da server
        cell.innerHTML = "o"
      }
      else if(cells[i]==2){
        //cella cliccata dall'opponent 
        nClick++
        cell.style.color = "red"
        checkWinner(2,"red"); //sarebbe da fare da server
        cell.innerHTML = "x"
      }
      else if(cells[i]==0){
        //se nessuno ha cliccato la cella
        //cell.style.color = "white"
        //checkWinner(1,"red");
        //cell.innerHTML = ""
      }
    }
  }

  //funzione che permette di scaricare i dati delle celle
  async function downloadCells(){
    try {
      const response = await axios.get(`http://localhost:5000/api/history-game/${props.matchId}`);

      //converto da json ad array statico
      cells[0] = response.data.status_cell1 ? response.data.status_cell1 : 0
      cells[1] = response.data.status_cell2 ? response.data.status_cell2 : 0
      cells[2] = response.data.status_cell3 ? response.data.status_cell3 : 0
      cells[3] = response.data.status_cell4 ? response.data.status_cell4 : 0
      cells[4] = response.data.status_cell5 ? response.data.status_cell5 : 0
      cells[5] = response.data.status_cell6 ? response.data.status_cell6 : 0
      cells[6] = response.data.status_cell7 ? response.data.status_cell7 : 0
      cells[7] = response.data.status_cell8 ? response.data.status_cell8 : 0
      cells[8] = response.data.status_cell9 ? response.data.status_cell9 : 0
      console.log("---DOWNLOAD (json to local): "+cells)
      fetchTable()
    } catch (error) {
      console.error('Error while fetching history game record:', error);
    }
  }

  //funzione che invia i dati delle celle attuali UPLOAD (non modifica cells)
  async function uploadCells(){
    try {
      //converto l'array in formato json
      const jsonString = JSON.stringify({
        status_cell1: cells[0],
        status_cell2: cells[1],
        status_cell3: cells[2],
        status_cell4: cells[3],
        status_cell5: cells[4],
        status_cell6: cells[5],
        status_cell7: cells[6],
        status_cell8: cells[7],
        status_cell9: cells[8],
      });
      console.log('--UPLOAD (local to json): '+jsonString)
  
      //eeffettua la richiesta PUT all'API con i dati convertiti
      const response = await axios.put(`http://localhost:5000/api/history-game/putData/${props.matchId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonString,
      });
      console.log('History game record updated successfully');
    }
    catch (error) {
      console.error('Error while updating history game record:', error);
    }
  }

  function isCellClicked(nCell){
    let ret=false;
    console.log('controllo che la cella di indice '+nCell+" sia cliccata, value"+cells[nCell])
    if(cells[nCell]!==0){
      ret=true
    }
    return ret
  }
  
  //funzione per preparare il gioco ad una nuova partita
  function tableRematch(){
    for(let i=0;i<=8;i++){
      cells[i]=0;
      let cell = document.getElementById((i+1).toString())
      cell.innerHTML = '';
      cell.style.backgroundColor = "white"
    }

    uploadCells()
    setIsEndGame(false);
    nClick=0;
    setIsStartGameApi()
    setRematchVisible(false)
    setLabelWinner('')
  }
 
  //gestisce il click di una qualsiasi cella
  function tableClicked(nCella){
    //controlli per vedere se il gioco è finito
    if((!isCellClicked(nCella-1) && !isEndGame) && props.myTurn){
      nClick++;
      let cell = document.getElementById(nCella)

      //modifica grafica al click
      cells[nCella-1]=props.team;
      cell.style.color = "green"
      checkWinner(1,"green");
      cell.innerHTML = char

      //una volta cliccato si fa l'invio dei dati
      uploadCells()
      props.handleTimeout()
    }
  }
  
  function checkWinner(team,color){
    let ret = false;
    if(nClick<=9){
      //Combinazioni verticali
      if(Object.is(cells[0], team) && Object.is(cells[3], team) && Object.is(cells[6], team)){
        ret=true
        document.getElementById("1").style.backgroundColor=color
        document.getElementById("4").style.backgroundColor=color
        document.getElementById("7").style.backgroundColor=color
        document.getElementById("1").style.color="white"
        document.getElementById("4").style.color="white"
        document.getElementById("7").style.color="white"
      }
      if(Object.is(cells[1], team) && Object.is(cells[4], team) && Object.is(cells[7], team)){
        ret=true
        document.getElementById("2").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("8").style.backgroundColor=color
        document.getElementById("2").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("8").style.color="white"
      }
      if(Object.is(cells[2], team) && Object.is(cells[5], team) && Object.is(cells[8], team)){
        ret=true
        document.getElementById("3").style.backgroundColor=color
        document.getElementById("6").style.backgroundColor=color
        document.getElementById("9").style.backgroundColor=color
        document.getElementById("3").style.color="white"
        document.getElementById("6").style.color="white"
        document.getElementById("9").style.color="white"
      }
  
      //Combinazioni orizzontali
      if(Object.is(cells[0], team) && Object.is(cells[1], team) && Object.is(cells[2], team)){
        ret=true
        document.getElementById("1").style.backgroundColor=color
        document.getElementById("2").style.backgroundColor=color
        document.getElementById("3").style.backgroundColor=color
        document.getElementById("1").style.color="white"
        document.getElementById("2").style.color="white"
        document.getElementById("3").style.color="white"
      }
      if(Object.is(cells[3], team) && Object.is(cells[4], team) && Object.is(cells[5], team)){
        ret=true
        document.getElementById("4").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("6").style.backgroundColor=color
        document.getElementById("4").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("6").style.color="white"
      }
      if(Object.is(cells[6], team) && Object.is(cells[7], team) && Object.is(cells[8], team)){
        ret=true
        document.getElementById("7").style.backgroundColor=color
        document.getElementById("8").style.backgroundColor=color
        document.getElementById("9").style.backgroundColor=color
        document.getElementById("7").style.color="white"
        document.getElementById("8").style.color="white"
        document.getElementById("9").style.color="white"
      }
      //Combinazioni diagonali
      if(Object.is(cells[0], team) && Object.is(cells[4], team) && Object.is(cells[8], team)){
        ret=true
        document.getElementById("1").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("9").style.backgroundColor=color
        document.getElementById("1").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("9").style.color="white"
      }
      if(Object.is(cells[2], team) && Object.is(cells[4], team) && Object.is(cells[6], team)){
        ret=true
        document.getElementById("3").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("7").style.backgroundColor=color
        document.getElementById("3").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("7").style.color="white"
      }

      //Caso di pareggio
      if((nClick===9)&&!ret){
        setIsEndGame(true)
        setLabelWinner('Pareggio')
        setRematchVisible(true)
      }
      
      //Caso di vittoria
      if (ret){
        setIsEndGame(true);
        setIsEndGameApi()

        //se ha vinto il team 'O'
        if(team===1){
          props.newOWin()
          setLabelWinner('Ha vinto O')
        }

        //se ha vinto il team 'X'
        else{
          props.newXWin()
          setLabelWinner('Ha vinto X')
        }

        //mostra il bottone per aprire una nuova partita
        setRematchVisible(true)
      }
    }
  }

    //funzione che chiude il game
    async function setIsEndGameApi(){
      try{
        const response = await axios.put(`http://localhost:5000/api/matches/${props.matchId}/set-end-game`)
      }
      catch(error){
        console.error(error)
      }
    }

    //funzione che apre il game
    async function setIsStartGameApi(){
      try{
        const response = await axios.put(`http://localhost:5000/api/matches/${props.matchId}/set-start-game`)
      }
      catch(error){
        console.error(error)
      }
    }

    //fa diventare le celle di colore grigio quando ci si passa sopra
    function mouseOverCell(nCell){
      if((!isCellClicked(nCell-1) && !isEndGame) && props.myTurn){
        document.getElementById(nCell.toString()).style.backgroundColor = '#CACACA';
      }
    }

    //fa ritornare le celle bianche quando non si è più sopra alla cella
    function mouseOutCell(nCell){
      if((document.getElementById(nCell.toString()).style.backgroundColor !== "green")&&(document.getElementById(nCell.toString()).style.backgroundColor !== "red") ){
        document.getElementById(nCell.toString()).style.backgroundColor = 'white';
      }
    }

    return(
      <div>
        <SimpleTable tableClicked={tableClicked} mouseOverCell={mouseOverCell} mouseOutCell={mouseOutCell}/>
        <BannerWinner bannerWinner={labelWinner}/>
        {rematchVisible?<RematchButton rematchGame={tableRematch}/>:""}
      </div>
    );
  }