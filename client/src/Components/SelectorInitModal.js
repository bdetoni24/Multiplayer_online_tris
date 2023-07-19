import React, { useState, useEffect } from "react";

const SelectorInitModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const options = ["New Game", "Create Party", "Enter a Party"];

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    props.setShowModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  }, []);

  //parte all'avviamento della pagina
  useEffect(() => {
      setShowModal(true);
  }, []);


  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="floating-heading">
            <h1>Enter nickname</h1>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="nickname"
              />
              <br/>
              <button type="submit" >Create Party</button>
              <button type="submit">New Game</button>
              <button type="submit">Enter a Party</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectorInitModal;
