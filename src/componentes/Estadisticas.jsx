import React, {useEffect, useState } from 'react';
import Grafico1 from './Grafico1';
// import Grafico2 from './Grafico2';
// import obtener from '../modulos/obtener';

import coloresGraficos1 from '../data/coloresGraficos1.json';
import coloresGraficos2 from '../data/coloresGraficos2.json';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

export default function Estadisticas() {

const [tipoRespuesta, setTipoRespuesta ] = useState(null);
const [tipoSolicitante, setTipoSolicitante ] = useState(null);
const [tipoSolicitud, setTipoSolicitud ] = useState(null);

function obtenerDatos () {
 var url = referencias.consultaestadistica,
     urlConsulta= url + "?tabla=1";
  obtener(urlConsulta, function (data) {
    setTipoRespuesta(data);
  });
  urlConsulta = url + "?tabla=2";
  obtener(urlConsulta, function (data) {
    setTipoSolicitud(data);
  });
  urlConsulta = url + "?tabla=3";
  obtener(urlConsulta, function (data) {
    setTipoSolicitante(data);
  });
};

 async function obtener () {
  var url = referencias.consultaestadistica,
       urlConsulta= url + "?tabla=1";
     let resp=null;      
    
    resp= await fetch(urlConsulta);
    setTipoRespuesta( await resp.json());    
    
    urlConsulta= url + "?tabla=2";
    resp= await fetch(urlConsulta);
    setTipoSolicitante (await resp.json());    
  
    urlConsulta= url + "?tabla=3";
    resp= await fetch(urlConsulta);
    setTipoSolicitud( await resp.json());
    
    // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_respuesta.php");
    // setTipoRespuesta( await resp.json());    
    
    // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_solicitante.php");
    // setTipoSolicitante (await resp.json());    
  
    // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_solicitud.php");
    // setTipoSolicitud( await resp.json());
  }

  // async function obtener () {
    
  //      let resp=null;      
      
  //     resp= await fetch("http://localhost/webservices/si-ddie/obtener_consultas_por_respuesta.php");
  //     setTipoRespuesta( await resp.json());    
      
  //     resp= await fetch("http://localhost/webservices/si-ddie/obtener_consultas_por_solicitante.php");
  //     setTipoSolicitante (await resp.json());    
    
  //     resp= await fetch("http://localhost/webservices/si-ddie/obtener_consultas_por_solicitud.php");
  //     setTipoSolicitud( await resp.json());
      
  //     // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_respuesta.php");
  //     // setTipoRespuesta( await resp.json());    
      
  //     // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_solicitante.php");
  //     // setTipoSolicitante (await resp.json());    
    
  //     // resp= await fetch("http://pruebarecursos.mep.go.cr/webservices/si-ddie/obtener_consultas_por_solicitud.php");
  //     // setTipoSolicitud( await resp.json());
  //   }
  useEffect(()=>{
    obtenerDatos();
    // obtener();
  },[]);

  useEffect(()=>{
    console.log("tipoRespuesta",tipoRespuesta);   
    console.log("tipoRespuesta",tipoSolicitud);    
  })

  return (
    <div className="container">      
      <div className="row">
        <div className="col-sm-12">
        {
        tipoRespuesta &&
        <Grafico1 array={tipoRespuesta} coloresGraficos={coloresGraficos1}  titulo='Consultas por tipo de respuestas' />
        }
        </div>
      </div>
      <hr/>

        <div className="row">
          <div className="col-sm-12">
          {
          tipoSolicitante &&
            <Grafico1 array={tipoSolicitante} coloresGraficos={coloresGraficos2} titulo='Consultas por tipo de solicitante' />
          }
          </div>
        </div>
      <hr/>

      <div className="row">
          <div className="col-sm-12">
          {
          tipoSolicitud &&
            <Grafico1 array={tipoSolicitud} coloresGraficos={coloresGraficos1} titulo='Consultas por tipo de solicitud' />
          }
          </div>
        </div>
    </div>
  );
}