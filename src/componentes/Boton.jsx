import React from 'react';
const Botones = (props) => {
    return (  
        <button onClick = {props.handlerCargarVistas} id={props.id} className="btn-main btn-lg btn-block">{props.etiqueta}</button>
        // <button onClick = {props.handlerCargarVistas} id={props.id} className="btn button btn-lg btn-block">{props.etiqueta}</button>
    );
}
 
export default Botones;