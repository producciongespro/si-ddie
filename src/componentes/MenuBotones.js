import React  from 'react';
import botones from '../data/lista_botones.json';
import {faPlus,faEye,faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// css
// import "../css/dropdown.css";

function MenuBotones (props) {   
    
    return (
        <React.Fragment>
            <div id="col1" className={"col-botonera col-sm-3"}>
            {
                botones.map((item, i)=>(
                    (i <= 3)?
                    <div class="dropdown">
                    <button class=" btn-main btn-lg btn-block " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {item.nombre}  <span className="float-right">  <FontAwesomeIcon icon={faCaretDown} size="1x" /></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item menu-lateral" href="#">Agregar <span className="float-right"><FontAwesomeIcon icon={faPlus} size="1x" /></span></a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item menu-lateral" href="#">Ver <span className="float-right"><FontAwesomeIcon icon={faEye} size="1x" /></span></a>
                    </div>
                    </div>
                    :
                    <button onClick={props.handleCargarComponentes} value={i}  id={"btn"+i} className="btn-main btn-lg btn-block" key={"btn"+i} name="botones" >  {item.nombre}  </button>
                    )
                )
            }
            </div>
        </React.Fragment>
    )
}

export default MenuBotones;