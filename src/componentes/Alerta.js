import React, { Component } from 'react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const mostrarAlerta = ( titulo, mensaje) => {
        // mensaje = <FontAwesomeIcon icon={faExclamationCircle}/>+mensaje;
        console.log("Alerta",titulo,mensaje);
             alertify.alert(titulo, mensaje); 
}
 
export default mostrarAlerta;

