import React, { useState, useEffect } from "react";
import axios from 'axios'

const SelectorInitModal = (props) => {

  function handleSubmit(){
  };

  function logOut(){
    console.log("logout..");
    props.logOut()
  }

  function handleSubmitNewGame(){
    props.newGameSelected()
  }

  async function handleSubmitCreateParty(){ //da sistemare per pary id
    try{
      //const response = await axios.put(`http://localhost:5000/api/players/updatePartyId/${player_id}`,{ party_id: partyId })

    }
    catch (error){

    }
  }

  return (
    <>
      <div className="selectorInitModal">
        <div className="floating-heading">
          <h1>Hi {props.localPlayerName}!</h1>
        </div>
        <div className="modal-body">
          <button onClick={handleSubmitNewGame}>New Game</button>
          <button disabled onClick={handleSubmit}>Play Local</button>
          <div id="partyMenu">
            <button onClick={handleSubmitCreateParty}>Enter a Party</button>
            <button onClick={handleSubmit}>Create Party</button>
          </div>
        </div>
        <div>
          <h5 id="logOutLabel" onClick={logOut}><u>Log Out</u></h5>
        </div>
      </div>
    </>
  );
};

export default SelectorInitModal;
