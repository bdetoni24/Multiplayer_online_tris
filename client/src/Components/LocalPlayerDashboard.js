
export default function LocalPlayerDashboard(props){
    return(
        <div id="localPlayerDashboard">
            <h6 id="namePlayer">{props.localPlayerName}</h6>
            <p id="localRemainingSeconds">10s</p>
            <div id="localTimeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}