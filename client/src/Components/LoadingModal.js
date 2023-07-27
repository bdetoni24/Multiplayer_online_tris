export default function LoadingModal(props){
    return(
        <div>
            <div id="loadingModal">
                <img id="loadingGif" src="./loading.gif"/>
            </div>
            <p id="labelLoading">{props.message}Searching for a game...</p>
        </div>
    );
}