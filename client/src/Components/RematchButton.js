import React, { useState } from 'react';
import '../App.css'

export default function RematchButton(props){

  return(
    <div>
      <h3 id="rematchButton" onClick={props.rematchGame} ><u>Play Again</u></h3>
    </div>
  );
}