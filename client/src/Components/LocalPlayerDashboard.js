
export default function LocalPlayerDashboard(props){
    return(
        <div id="localPlayerDashboard">
            <h6 id="namePlayer">{props.localPlayerName}</h6>
            <div id="timeBar"></div>
            <div id="staticTimeBar"></div>
        </div>
    );
}