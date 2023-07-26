
export default function OpponentPlayerDashboard(props){
    return(
        <div id="opponentPlayerDashboard">
            <h6 id="namePlayer">{props.opponentPlayerName}</h6>
            <div id="opponentTimeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}