import React from 'react';

const Imagen = (props) => {
    return ( 
        <img className = {props.classElement} src={props.origen} alt="imagen" width="75px"/>
    )
}
export default Imagen;