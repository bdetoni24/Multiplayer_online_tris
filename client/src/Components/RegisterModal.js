
export default function RegisterModal(){

    function handleSubmitRegister(){

    }

    return(
        <div>
            <div className="floating-heading">
                <h1>Registration</h1>
            </div>
                <input type="text" name="nickname" placeholder="Nickname"/> <br/>
                <input type="password" name="password" placeholder="Password"/> <br/>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button onClick={handleSubmitRegister} >Register</button>
            
        </div>
    );
}