import React, { useImperativeHandle, useState } from 'react';
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
  
  let team=false;
  let nClick=0; //per fermare il game in caso di pareggio

  //collega App con Table
  useImperativeHandle(ref, () => ({downloadCells,}))

  //funzione che permette di scaricare i dati delle celle
  async function downloadCells(){
    try {
      const response = await axios.get(`http://localhost:5000/api/history-game/${props.matchId}`);
      setCells(convertFromHistoryGameFormat(response.data))
    } catch (error) {
      console.error('Error while fetching history game record:', error);
    }
  }
  
  //traduce i dati dellì'api in quelli in locale
  function convertFromHistoryGameFormat(historyGameData) { //TESTATA
    setCells([0,0,0,0,0,0,0,0,0]);
  
    for (let i = 0; i < 9; i++) {
      const cellKey = `status_cell${i + 1}`;
      const team = historyGameData[cellKey] || 0; //imposta team a 0 se la chiave non esiste
  
      cells[i]=team;
    }
    console.log('dati api tradotti in locale: '+cells)
  }

  //funzione che invia i dati delle celle attuali UPLOAD
  async function uploadCells(){
    try {
      const apiFormat = convertToHistoryGameFormat(cells);
      console.log('apiFORMAT data: '+apiFormat)
  
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
  
    for (let i = 0; i < cells.length; i++) {
      const cellKey = `status_cell${i + 1}`;
      historyGameData[cellKey] = cells[i];
    }
    
    console.log('dati locali tradotti in  formato api: '+JSON.stringify(historyGameData)) //mi esce Object
  
    return JSON.stringify(historyGameData);
  }

  function isCellClicked(nCell){
    console.log("frutta e verdura: "+cells)
    let ret=false;
    console.log('controllo che la cella di indice '+nCell+" sia cliccata "+cells[nCell])
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
      cells[nCella-1]=1;
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