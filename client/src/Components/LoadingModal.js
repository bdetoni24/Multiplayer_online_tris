export default function LoadingModal(props){
    return(
        <div>
            <div id="loadingModal">
                <img src="./loading.gif"/>
            </div>
            <p>{props.message}Searching for a game...</p>
        </div>
    );
}