export default function LoadingModal(props){
    return(
        <div id="loadingModal">
            <img src="./Media/loading.gif"/>
            <p>{props.message}cercando game...</p>
        </div>
    );
}