
export default function OpponentPlayerDashboard(props){
    return(
        <div id="opponentPlayerDashboard">
            <h6 id="namePlayer">{props.opponentPlayerName}</h6>
            <p id="opponentRemainingSeconds">10s</p>
            <div id="opponentTimeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}