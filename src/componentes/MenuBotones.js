import React  from 'react';
import botones from '../data/lista_botones.json';

function MenuBotones (props) {   
    return (
        <React.Fragment>
            {
                botones.map((item, i)=>(
                    <button onClick={props.handleCargarComponentes} value={i}  className="btn btn-outline-info btn-block" key={"btn"+i} >  {item.nombre}  </button>
                ))
            }
        </React.Fragment>
    )
}

export default MenuBotones;