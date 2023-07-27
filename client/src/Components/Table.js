import React, { useState } from 'react';
import '../App.css';
import SimpleTable from './SimpleTable';
import RematchButton from './RematchButton';
import BannerWinner from './BannerWinner';
import axios from 'axios'

export default function Table(props){
  //variabili e stati
  const [isEndGame,setIsEndGame] = useState(false);
  const [rematchVisible, setRematchVisible] = useState(false)
  const [labelWinner,setLabelWinner] = useState('')
  const char = 'o'
  const [clickedCells,setClickedCells] = useState([
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
    {team: 0},
  ])
  
  let team=false;
  let nClick=0; //per fermare il game in caso di pareggio

  //funzione che permette di scaricare i dati delle celle
  async function downloadCells(){
    try {
      const response = await axios.get(`http://localhost:5000/api/history-game/${props.matchId}`);
      setClickedCells(convertFromHistoryGameFormat(response.data))
    } catch (error) {
      console.error('Error while fetching history game record:', error);
    }
  }
  
  //traduce i dati dellì'api in quelli in locale
  function convertFromHistoryGameFormat(historyGameData) {
    clickedCells = [];
  
    for (let i = 0; i < 9; i++) {
      const cellKey = `status_cell${i + 1}`;
      const team = historyGameData[cellKey] || 0; //imposta team a 0 se la chiave non esiste
  
      clickedCells.push({ team });
      console.log('dati api tradotti in locale')
    }
  }

  //funzione che invia i dati delle celle attuali UPLOAD
  async function uploadCells(){
    try {
      const apiFormat = convertToHistoryGameFormat(clickedCells);
  
      //eeffettua la richiesta PUT all'API con i dati convertiti
      const response = await axios.put(`http://localhost:5000/api/history-game/putData/${props.matchId}`, apiFormat);
      console.log('History game record updated successfully');
    } catch (error) {
      console.error('Error while updating history game record:', error);
    }
  }


  //traduce la rappresentazione dei dati in locale in un vormato leggibile per l'api
  function convertToHistoryGameFormat() {
    const historyGameData = {};
  
    for (let i = 0; i < clickedCells.length; i++) {
      const cellKey = `status_cell${i + 1}`;
      historyGameData[cellKey] = clickedCells[i].team;
      console.log('dati locali tradotti in  formato api')
    }
  
    return historyGameData;
  }

  function isCellClicked(nCell){
    let ret=false;
    if(clickedCells[nCell].team!=0){
      ret=true
    }
    return ret
  }
  
  //funzione per preparare il gioco ad una nuova partita
  function tableRematch(){
    for(let i=0;i<=8;i++){
      clickedCells[i].team=0;
      let cell = document.getElementById((i+1).toString())
      cell.innerHTML = '';
      cell.style.backgroundColor = "white"
    }

    setIsEndGame(false);
    nClick=0;
    setRematchVisible(false)
    setLabelWinner('')
  }
 
  //gestisce il click di una qualsiasi cella
  function tableClicked(nCella){
    //controlli per vedere se il gioco è finito
    if((!isCellClicked(nCella-1) && !isEndGame) && props.myTurn){
      nClick++;
      team =! team;
      let cell = document.getElementById(nCella)

      //modifica grafica al click
      clickedCells[nCella-1].team=1;
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
      if(Object.is(clickedCells[0].team, team) && Object.is(clickedCells[3].team, team) && Object.is(clickedCells[6].team, team)){
        ret=true
        document.getElementById("1").style.backgroundColor=color
        document.getElementById("4").style.backgroundColor=color
        document.getElementById("7").style.backgroundColor=color
        document.getElementById("1").style.color="white"
        document.getElementById("4").style.color="white"
        document.getElementById("7").style.color="white"
      }
      if(Object.is(clickedCells[1].team, team) && Object.is(clickedCells[4].team, team) && Object.is(clickedCells[7].team, team)){
        ret=true
        document.getElementById("2").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("8").style.backgroundColor=color
        document.getElementById("2").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("8").style.color="white"
      }
      if(Object.is(clickedCells[2].team, team) && Object.is(clickedCells[5].team, team) && Object.is(clickedCells[8].team, team)){
        ret=true
        document.getElementById("3").style.backgroundColor=color
        document.getElementById("6").style.backgroundColor=color
        document.getElementById("9").style.backgroundColor=color
        document.getElementById("3").style.color="white"
        document.getElementById("6").style.color="white"
        document.getElementById("9").style.color="white"
      }
  
      //Combinazioni orizzontali
      if(Object.is(clickedCells[0].team, team) && Object.is(clickedCells[1].team, team) && Object.is(clickedCells[2].team, team)){
        ret=true
        document.getElementById("1").style.backgroundColor=color
        document.getElementById("2").style.backgroundColor=color
        document.getElementById("3").style.backgroundColor=color
        document.getElementById("1").style.color="white"
        document.getElementById("2").style.color="white"
        document.getElementById("3").style.color="white"
      }
      if(Object.is(clickedCells[3].team, team) && Object.is(clickedCells[4].team, team) && Object.is(clickedCells[5].team, team)){
        ret=true
        document.getElementById("4").style.backgroundColor=color
        document.getElementById("5").style.backgroundColor=color
        document.getElementById("6").style.backgroundColor=color
        document.getElementById("4").style.color="white"
        document.getElementById("5").style.color="white"
        document.getElementById("6").style.color="white"
      }
      if(Object.is(clickedCells[6].team, team) && Object.is(clickedCells[7].team, team) && Object.is(clickedCells[8].team, team)){
        ret=true
        document.getElementById("7").style.backgroundColor=color
        document.getElementById("8").style.backgroundColor=color
        document.getElementById("9").style.backgroundColor=color
        document.getElementById("7").style.color="white"
        document.getElementById("8").style.color="white"
        document.getElementById("9").style.color="white"
      }
      //Combinazioni diagonali
       if(Object.is(clickedCells[0].team, team) && Object.is(clickedCells[4].team, team) && Object.is(clickedCells[8].team, team)){
          ret=true
          document.getElementById("1").style.backgroundColor=color
          document.getElementById("5").style.backgroundColor=color
          document.getElementById("9").style.backgroundColor=color
          document.getElementById("1").style.color="white"
          document.getElementById("5").style.color="white"
          document.getElementById("9").style.color="white"
        }
        if(Object.is(clickedCells[2].team, team) && Object.is(clickedCells[4].team, team) && Object.is(clickedCells[6].team, team)){
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