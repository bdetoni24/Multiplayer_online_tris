import React, { useState, useEffect } from "react";

const SelectorInitModal = (props) => {

  function handleSubmit(){
    props.setShowSelectorInitModal(false);
    document.getElementById("mainDiv").style.filter = "";
    document.getElementById("timeBar").style.animationPlayState = "running";
    
    document.querySelector('audio').play();

    unBlurAll();
  };

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
  function unBlurAll(){
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

  //parte all'avviamento della pagina
  useEffect(() => {
      document.getElementById("timeBar").style.animationPlayState = "paused";
      document.getElementById("timeBar").style.animationPlayState = "paused";
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
