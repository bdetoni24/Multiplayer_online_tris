import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function(props){ //posso implementare la password
    const baseUrl = "http://localhost:5000/"
    const [error, setError] = useState('');

    function handleSubmitLogin(){
        const nickname = document.querySelector('input[name="nickname"]').value
        if(!validateNickname(nickname)){
            //se il nickname supera i requisiti
            try{
                const response = axios.get(`http://localhost:5000/api/check-nickname/${nickname}`)
                if(response.data.exists===false){
                    //non esiste un doppione
                    addNewPlayerApi()
                    props.setShowLoginModal(false)
                    props.setShowSelectorInitModal(true)
                    props.setLocalPlayerName(nickname)
                }
                else{
                    //esiste un doppione
                    setError('Il nome è già stato creato.');
                }
            }
            catch(error){
                console.error(error)
            }
        }
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

    function validateNickname (nick){
        //controllo se il nome supera i 16 caratteri o contiene spazi
        let isError=false;

        if (nick.length > 14) {
          setError('Il nome deve essere lungo al massimo 14 caratteri.');
          isError=true;
        } else if (nick.includes(' ')) {
          setError('Il nome non può contenere spazi.');
          isError=true;
        } else {
          setError('');
        }
        return isError
      };

    return(
        <div id="loginModal">
            <div className="floating-heading">
                <h1>Login</h1>
            </div>
                <input type="text" name="nickname" placeholder="Nickname"/> <br/>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button onClick={handleSubmitLogin} >Login</button>
            
        </div>
    );
}