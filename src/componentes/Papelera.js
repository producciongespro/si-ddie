import React from 'react';

// imgs
import Papelera from './Papelera1js';
import Imagen from './Imagen';
import papeleraVacia from '../images/papelera-vacia.png';
import papelera from '../images/papelera.png';


const urlEliminadosConsultas = referencias.consultaeliminados + "?tabla=consultas",


var   datosEliminados = null,
      tmpEliminados = null;


export default function Papelera(props) {

  async function obtenerDatos(cb) {
        
    let response6 = await fetch(urlEliminadosConsultas);
    datosEliminados = await response6.json();
    console.log("eliminados", datosEliminados);
  }

  // const handleRecupera = (e) => {
  //   let id = parseInt(e.target.id);
  // }

  return (
      {datosEliminados.length== 0 ?
      ( 
        <Imagen classElement="img-papelera-vacia float-right" origen={papeleraVacia} onClick="handleRecupera"/>
      )
      :
      (
        <Imagen classElement="img-papelera float-right" origen={papelera} />
      )
      }
  )

}
