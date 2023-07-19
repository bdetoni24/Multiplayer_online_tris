import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const SelectorInitModal = ({ onCreateParty, onEnterParty, onNewGame }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      Modal.setAppElement(document.body);
      Modal.show("selector-init-modal");
    }, 2000);
  }, []);

  return (
    <Modal
      isOpen={true}
    >
      <div className="selector-init-modal">
        <h1>Select a Party</h1>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={() => onCreateParty(name)}>Create Party</button>
          <button onClick={() => onEnterParty(name)}>Enter Party</button>
          <button onClick={() => onNewGame(name)}>New Game</button>
        </form>
      </div>
    </Modal>
  );
};

export default SelectorInitModal;
