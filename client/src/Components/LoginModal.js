
export default function(){
    return(
        <div id="loginModal">
            <div className="floating-heading">
                <h1>Login</h1>
            
            </div>
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="Nickname"/> <br/>
                <input type="password" name="password" placeholder="Password"/><br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}