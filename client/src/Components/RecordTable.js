import '../App.css';

export default function RecordTable(props){

    return(
      <table id="recordTable">
        <thead>
          <tr>
            <td>x</td>
            <td>o</td>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.xWins}</td>
                <td>{props.oWins}</td>
            </tr>
        </tbody>
      </table>
    );
  }