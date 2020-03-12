import React from 'react';

const Imagen = (props) => {
    // {console.log(props.origen)}
    return ( 
               
        <img className = {props.classElement} src={props.origen} alt="imagen" width="75px" onClick={props.handlerPapelera}/>
    )
}
export default Imagen;