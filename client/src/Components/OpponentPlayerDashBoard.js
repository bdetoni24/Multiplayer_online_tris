
export default function OpponentPlayerDashboard(props){
    return(
        <div id="opponentPlayerDashboard">
            <h6 id="namePlayer">{props.opponentPlayerName}</h6>
            <div id="timeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}