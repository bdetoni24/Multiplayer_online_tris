import React, { useState, useEffect } from "react";

const SelectorInitModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(){
    props.setShowModal(true);
    document.getElementById("mainDiv").style.filter = "";
    document.getElementById("timeBar").style.animationPlayState = "running";
    
    document.querySelector('audio').play();

    const blurFilter = ""
    document.getElementById("mainTitle").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter; 
    document.getElementById("recordTable").style.filter = blurFilter;
    document.getElementById("versionLabel").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter;
    document.getElementById("mainTable").style.filter = blurFilter;
    document.getElementById("localPlayerDashboard").style.filter = blurFilter;
    document.getElementById("opponentPlayerDashboard").style.filter = blurFilter;
  };

  //parte all'avviamento della pagina
  useEffect(() => {
      setShowModal(true);
      document.getElementById("timeBar").style.animationPlayState = "paused";
      document.getElementById("timeBar").style.animationPlayState = "paused";
      
      const blurFilter = "blur(100px)"
      document.getElementById("mainTitle").style.filter = blurFilter;
      document.getElementById("exitButton").style.filter = blurFilter;
      document.getElementById("recordTable").style.filter = blurFilter;
      document.getElementById("versionLabel").style.filter = blurFilter;
      document.getElementById("exitButton").style.filter = blurFilter;
      document.getElementById("mainTable").style.filter = blurFilter;
      document.getElementById("localPlayerDashboard").style.filter = blurFilter;
      document.getElementById("opponentPlayerDashboard").style.filter = blurFilter;
  }, []);

  return (
    <>
      {showModal && (
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
            <h5 id="loginLabel"><u>Log Out</u></h5>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectorInitModal;
