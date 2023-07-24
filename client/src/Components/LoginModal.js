import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function(){ //posso implementare la password
    const [isUsernamePresent,setIsUsernamePresent] = useState(true)
    const [isPasswordPresent,setIsPasswordPresent] = useState(true)
    const baseUrl = "http://localhost:5000/"

    async function addNewPlayerApi(){
        const nickname = document.querySelector('input[name="nickname"]').value;
        const password = 1234;
        const match_id = -1;
        const is_online = 0;
        try{
            const response = await axios.post('http://localhost:500/api/players/addPlayer', {
                nickname: nickname,
                password: password,
                match_id: match_id,
                is_online: is_online,
            });
            console.log('nuovo giocatore:', response.data);
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
            <button onClick={addNewPlayerApi} >Login</button>
        </div>
    );
}