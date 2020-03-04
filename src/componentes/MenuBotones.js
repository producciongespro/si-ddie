import React  from 'react';
import botones from '../data/lista_botones.json';
import {faPlus,faEye,faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// css
// import "../css/dropdown.css";

function MenuBotones (props) {   
    // botones.map((item, i)=>(
    //     i<3 &&
    //             // console.log("item ==>",i,":",item['textoboton'],
    //         console.log("item opciones==>",i,":",item['opciones'][0]['ref'])
    // ))
    return (
        <React.Fragment>
             {/* {botones.map((item, i)=>(console.log("item ==>",i,":",item['textoboton'])
             ))} */}
            <div id="col1" className={"col-botonera col-sm-3"}>
            {
                botones.map((item, i)=>(               
                    (i < 3)?
                    <div className="dropdown">
                        <button className=" btn-main btn-lg btn-block " type="button" id={item['botonprincipal']+"dropdownMenuButton"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  name="botones">
                        {item['textoboton']}  <span className="float-right">  <FontAwesomeIcon icon={faCaretDown} size="1x" /></span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby={item['botonprincipal']+"dropdownMenuButton"}>
                            <a className="dropdown-item menu-lateral" href="www.nada.com"  onClick={props.handleCargarComponentes} id={item['botonprincipal']} data-referencia={item['opciones'][0]['ref']}>Agregar <span className="float-right"><FontAwesomeIcon icon={faPlus} size="1x" /></span></a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item menu-lateral" href="www.nada.com" onClick={props.handleCargarComponentes} id={item['botonprincipal']} data-referencia={item['opciones'][1]['ref']}>Ver <span className="float-right"><FontAwesomeIcon icon={faEye} size="1x" /></span></a>
                        </div>
                    </div>
                    :
                    <button onClick={props.handleCargarComponentes} value={item['ref']}  id={item['botonprincipal']} className="btn-main btn-lg btn-block" key={"btn"+item['ref']} name="botones" >  {item['textoboton']}  </button>
                    )
                )
            }
            </div>
        </React.Fragment>
    )
}

export default MenuBotones;