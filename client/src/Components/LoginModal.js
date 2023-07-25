import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function(props){ //posso implementare la password
    const baseUrl = "http://localhost:5000/"

    function handleSubmitLogin(){
        addNewPlayerApi()
        props.setShowLoginModal(false)
        props.setShowSelectorInitModal(true)
        props.setLocalPlayerName(document.querySelector('input[name="nickname"]').value)
    }

    async function addNewPlayerApi(){
        const nickname = document.querySelector('input[name="nickname"]').value;
        const password = 1234;
        const match_id = null;
        const is_online = 0;
        try{
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/players/addPlayer', 
                data:{
                    "nickname": nickname,
                    "password": password,
                    "match_id": match_id,
                    "is_online": is_online,
                }
            });
            const localPlayerId = await response.data;
            props.setLocalPlayerId(parseInt(localPlayerId,10));
            console.log('nuovo giocatore:', response.data);
            console.log('id nuovo giocatore: '+response.data);
            localStorage.setItem("localPlayerId", response.data)
        }
        catch{
            console.error('errore nel creare il giocatore su react');
        }
    }

    return(
        <div id="loginModal">
            <div className="floating-heading">
                <h1>Login</h1>
            </div>
            <input type="text" name="nickname" placeholder="Nickname"/> <br/>
            <button onClick={handleSubmitLogin} >Login</button>
        </div>
    );
}