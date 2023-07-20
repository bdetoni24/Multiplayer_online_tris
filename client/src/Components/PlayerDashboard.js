
export default function PlayerDashboard(props){
    return(
        <div id="playerDashboard">
            <div id="player1Dashboard">
                <h6 id="namePlayer1">{props.playerName}</h6>
                <div id="timeBar1"></div>
                <div id="staticTimeBar1"></div>
            </div>
            <div id="player2Dashboard">
                <h6 id="namePlayer1">player_name2</h6>
                <div id="timeBar1"></div>
                <div id="staticTimeBar1"></div>
            </div>
        </div>
    );
}