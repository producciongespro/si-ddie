import React, { useState, useEffect } from 'react';
import { fecha } from 'gespro-utils/fecha';

//Parámetros fijos;
let hoy = {
  dia: 24,
  mes: 7,
  anno: 2021,
};

//Parámetros dados por la fucnión fecha (obtiene la fecha actual del sistema)
hoy = fecha("objHoy");
console.log("hoy es:", hoy);
console.log("mes", hoy.mes);
console.log("día", hoy.dia);

export default function VerSemana() {
  const [mes, setMes] = useState(hoy.mes);
  const [dia, setDia] = useState(hoy.dia);


  useEffect(() => {
    // obtenerMes(idMes);
    console.log("mes", mes);
    console.log("día", dia);
  });


  return (
    <React.Fragment>
    <div className="row"><p>Ver semanal</p></div>
    </React.Fragment>
  );
};