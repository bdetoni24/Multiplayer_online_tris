
export default function PlayerDashboard(props){
    return(
        <div id="playerDashboard">
            <h6 id="namePlayer">{props.playerName}</h6>
            <div id="timeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}