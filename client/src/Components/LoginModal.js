import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function(){ //posso fare a meno deglis tati?
    const [isUsernamePresent,setIsUsernamePresent] = useState(true)
    const [isPasswordPresent,setIsPasswordPresent] = useState(true)
    const baseUrl = "http://localhost:5000/"

    function usernameCheck(){
        //richiesta ad express per vedere se nel server è presente l'utente
        /*const username='admin'
        try {
            const response = Axios.get(`/api/checkUsername/${username}`);
            return response.data.exists;
          } catch (error) {
            console.error('Errore durante la richiesta:', error);
            return false;
          }*/
          console.log('invio richiesta get')
        const response = axios.get("http://localhost:5000/test")
        console.log('data receved: '+response.data)
    };

    return(
        <div id="loginModal">
            <div className="floating-heading">
                <h1>Login</h1>
            </div>
            <input type="text" name="username" placeholder="Nickname"/> <br/>
            <input type="password" name="password" placeholder="Password"/><br/>
            <button onClick={usernameCheck} >Login</button>
        </div>
    );
}