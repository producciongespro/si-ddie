import React  from 'react';
import botones from '../data/lista_botones.json';

function MenuBotones (props) {   
    
    return (
        <React.Fragment><div id="col1" className={"col-botonera col-sm-3"}>
            {
                botones.map((item, i)=>(
                      <button onClick={props.handleCargarComponentes} value={i}  id={"btn"+i} className="btn-main btn-lg btn-block" key={"btn"+i} name="botones" >  {item.nombre}  </button>
                    )
                )
            }
            </div>
        </React.Fragment>
    )
}

export default MenuBotones;