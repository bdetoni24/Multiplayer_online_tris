import React, { useState, useEffect } from "react";

const SelectorInitModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  function handleSubmit(){
    props.setShowModal(true);
    document.getElementById("mainDiv").style.filter = "";
    document.getElementById("timeBar").style.animationPlayState = "running";
    const name = document.getElementById("inputName").value;
    props.setPlayerName(name);
    
    document.querySelector('audio').play();

    const blurFilter = ""
    document.getElementById("mainTitle").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter; 
    document.getElementById("recordTable").style.filter = blurFilter;
    document.getElementById("versionLabel").style.filter = blurFilter;
    document.getElementById("exitButton").style.filter = blurFilter;
    document.getElementById("mainTable").style.filter = blurFilter;
    document.getElementById("playerDashboard").style.filter = blurFilter;
  };

  //parte all'avviamento della pagina
  useEffect(() => {
      setShowModal(true);
      document.getElementById("timeBar").style.animationPlayState = "paused";
      
      const blurFilter = "blur(100px)"
      document.getElementById("mainTitle").style.filter = blurFilter;
      document.getElementById("exitButton").style.filter = blurFilter;
      document.getElementById("recordTable").style.filter = blurFilter;
      document.getElementById("versionLabel").style.filter = blurFilter;
      document.getElementById("exitButton").style.filter = blurFilter;
      document.getElementById("mainTable").style.filter = blurFilter;
      document.getElementById("playerDashboard").style.filter = blurFilter;
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="floating-heading">
            <h1>Enter nickname:</h1>
          </div>
          <div className="modal-body">
            <input id="inputName" placeholder="nickname" required/>
            <br/>
            <button onClick={handleSubmit}>New Game</button>
            <button onClick={handleSubmit}>Play Local</button>
            <div id="partyMenu">
              <button onClick={handleSubmit}>Enter a Party</button>
              <button onClick={handleSubmit}>Create Party</button>
            </div>
          </div>
        </div>
      )}
      <div>
        <h2 id="loginLabel">Log In</h2>
      </div>
    </>
  );
};

export default SelectorInitModal;
