import React, { useState } from 'react';
import '../App.css';
import SimpleTable from './SimpleTable';
import RematchButton from './RematchButton';
import BannerWinner from './BannerWinner';

export default function Table(props){
  //variabili e stati
  const [isEndGame,setIsEndGame] = useState(false);
  const [rematchVisible, setRematchVisible] = useState(false)
  const [labelWinner,setLabelWinner] = useState('')
  let team=false;
  let nClick=0; //per fermare il game in caso di pareggio
  let clickedCells = [
    {id:1, clicked:false, team: 0},
    {id:2, clicked:false, team: 0},
    {id:3, clicked:false, team: 0},
    {id:4, clicked:false, team: 0},
    {id:5, clicked:false, team: 0},
    {id:6, clicked:false, team: 0},
    {id:7, clicked:false, team: 0},
    {id:8, clicked:false, team: 0},
    {id:9, clicked:false, team: 0},
  ];
  
  //funzione per preparare il gioco ad una nuova partita
  function tableRematch(){
    for(let i=0;i<=8;i++){
      clickedCells[i].team=0;
      clickedCells[i].clicked=false;
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
    if((!clickedCells[nCella-1].clicked && !isEndGame) && props.myTurn){
      nClick++;
      clickedCells[nCella-1].clicked=true;
      team =! team;
      let char;
      let cell = document.getElementById(nCella)

      //se ha cliccato il team 'O'
      if(team){
        char="o";
        clickedCells[nCella-1].team=1;
        cell.style.color = "green"
        checkWinner(1,"green");
      }
      //se ha cliccato il team 'X'
      else{
        char="x";
        clickedCells[nCella-1].team=2;
        cell.style.color = "red"
        checkWinner(2,"red");
      }

      cell.innerHTML = char
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
      if((!clickedCells[nCell-1].clicked && !isEndGame) && props.myTurn){
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