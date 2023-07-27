
export default function SimpleTable(props){
    {/*Posso integrare già qua le funcioni */}
    return(
        <div>
            <table id="mainTable">
            <thead></thead>
            <tbody>
                <tr>
                    <td id="1" onClick={()=>props.tableClicked(1)} onMouseOver={()=>props.mouseOverCell(1)} onMouseOut={()=>props.mouseOutCell(1)}></td>
                    <td id="2" onClick={()=>props.tableClicked(2)} onMouseOver={()=>props.mouseOverCell(2)} onMouseOut={()=>props.mouseOutCell(2)}></td>
                    <td id="3" onClick={()=>props.tableClicked(3)} onMouseOver={()=>props.mouseOverCell(3)} onMouseOut={()=>props.mouseOutCell(3)}></td>
                </tr>
                <tr>
                    <td id="4" onClick={()=>props.tableClicked(4)} onMouseOver={()=>props.mouseOverCell(4)} onMouseOut={()=>props.mouseOutCell(4)}></td>
                    <td id="5" onClick={()=>props.tableClicked(5)} onMouseOver={()=>props.mouseOverCell(5)} onMouseOut={()=>props.mouseOutCell(5)}></td>
                    <td id="6" onClick={()=>props.tableClicked(6)} onMouseOver={()=>props.mouseOverCell(6)} onMouseOut={()=>props.mouseOutCell(6)}></td>
                </tr>
                <tr>
                    <td id="7" onClick={()=>props.tableClicked(7)} onMouseOver={()=>props.mouseOverCell(7)} onMouseOut={()=>props.mouseOutCell(7)}></td>
                    <td id="8" onClick={()=>props.tableClicked(8)} onMouseOver={()=>props.mouseOverCell(8)} onMouseOut={()=>props.mouseOutCell(8)}></td>
                    <td id="9" onClick={()=>props.tableClicked(9)} onMouseOver={()=>props.mouseOverCell(9)} onMouseOut={()=>props.mouseOutCell(9)}></td>
                </tr>
            </tbody>
            <tfoot></tfoot>
            </table>
        </div>
    );
}