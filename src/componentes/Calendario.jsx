import React, { useState, useEffect } from 'react';

import SalaReuniones from './SalaReuniones';
import {getData} from 'gespro-utils/akiri';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

function Calendario() {

  const [data, setData] = useState(null);
  const [dataFuncionarios, setDataFuncionarios] = useState(null);
  var consulta = referencias.consultareserva;
  var consultaFuncionarios = referencias.consultausuarios;
  console.log("consulta", consulta);
  useEffect(() => {
 
    setup();
  }, []);

  const setup = async ()=> {
    // setData ( await getData ('./reservas.json'))    
    setData ( await getData (consulta));
    // setDataFuncionarios ( await getData (consultaFuncionarios));
  }


  return (
   data ?
  //  <SalaReuniones data={data} funcionarios={dataFuncionarios} />
   <SalaReuniones data={data}/>
   :
   <span>Cargando datos, por favor espere....</span>
  );
}
 
export default Calendario;