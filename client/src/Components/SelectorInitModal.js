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
  };

  //parte all'avviamento della pagina
  useEffect(() => {
      setShowModal(true);
      document.getElementById("timeBar").style.animationPlayState = "paused";
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
            <button onClick={handleSubmit}>Create Party</button>
            <button onClick={handleSubmit}>New Game</button>
            <button onClick={handleSubmit}>Enter a Party</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectorInitModal;
