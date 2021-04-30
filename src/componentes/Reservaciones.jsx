import React, { useState, useEffect } from "react";
import ContTabla from "./Tabla/ContTabla";
import SalaReuniones from "./SalaReuniones";

import obtener from '../modulos/obtener';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

var consulta = referencias.consultareserva,
    arrayDatos = null;

let idMes;

export default function Reservaciones() {
    //Estados para la navegación
    const [vistaMes, setVistaMes] = useState(null); 

  const obtenerIdMes = (mes) => {
    idMes = mes;
    // console.log("idMes", idMes);
  };

  const handleReservaciones = () => {
    setVistaMes(false);
  };

  const handleMes = ()=> {
    setVistaMes(true);
  } 

useEffect(() => {
  obtener(consulta, function (datos) {
    arrayDatos = datos;
    // console.log("data", arrayDatos);
  })
}, []);


  useEffect(() => {
    console.log("vistaMes", vistaMes);
  }, [vistaMes]);

  return vistaMes ? (
    <ContTabla reservas={arrayDatos} idMes={idMes}  handleReservaciones={handleReservaciones} />
  ) : (
    <SalaReuniones handleMes={handleMes} obtenerIdMes={obtenerIdMes} />
  );
}