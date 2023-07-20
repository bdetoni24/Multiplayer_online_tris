
export default function PlayerDashboard(props){
    return(
        <div id="playerDashboard">
            <div id="player1Dashboard">
                <h6 id="namePlayer">{props.playerName}</h6>
                <div id="timeBar"></div>
                <div id="staticTimeBar"></div>
            </div>
            <div id="player2Dashboard">
                <h6 id="namePlayer">player_name2</h6>
                <div id="timeBar"></div>
                <div id="staticTimeBar"></div>
            </div>
        </div>
    );
}