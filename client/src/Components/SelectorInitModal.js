import React, { useState, useEffect } from "react";

const SelectorInitModal = () => {
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
    e.preventDefault();
    setShowModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  }, []);

  useEffect(() => {
    window.onload = () => {
      setShowModal(true);
      changeBackground();
    };
  }, []);

  const changeBackground = () => {
    document.getElementById("mainDiv").style.opacity = 0.1;
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-header">
            <h1>Modal Title</h1>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={input}
                onChange={handleChange}
              />
              <br/>
              <button type="submit">Create Party</button>
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
