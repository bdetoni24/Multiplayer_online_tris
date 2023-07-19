import React, { useEffect, useState } from 'react';

const SelectorInitModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateParty = () => {
    // Logica per il pulsante "Create Party"
  };

  const handleEnterParty = () => {
    // Logica per il pulsante "Enter Party"
  };

  const handleFindGame = () => {
    // Logica per il pulsante "Find Game"
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input type="text" placeholder="Nome" />
            <button onClick={handleCreateParty}>Create Party</button>
            <button onClick={handleEnterParty}>Enter Party</button>
            <button onClick={handleFindGame}>Find Game</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectorInitModal;
