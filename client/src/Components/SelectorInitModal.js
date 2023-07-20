import React, { useState, useEffect } from "react";

const SelectorInitModal = (props) => {

  function handleSubmit(){
    props.closeSelectorInitModal();
    //document.getElementById("timeBar").style.animationPlayState = "running";
    
  };


  //parte all'avviamento della pagina
  useEffect(() => {
  }, []);

  function logOut(){
    console.log("logout..");
  }

  return (
    <>
      <div className="selectorInitModal">
        <div className="floating-heading">
          <h1>Hi {props.playerName}!</h1>
        </div>
        <div className="modal-body">
          <button onClick={handleSubmit}>New Game</button>
          <button onClick={handleSubmit}>Play Local</button>
          <div id="partyMenu">
            <button onClick={handleSubmit}>Enter a Party</button>
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
