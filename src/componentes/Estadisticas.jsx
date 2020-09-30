import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Grafico1 from './Grafico1';

import coloresGraficos1 from '../data/coloresGraficos1.json';
import coloresGraficos2 from '../data/coloresGraficos2.json';
import opcionesGraficos from '../data/opcionesGraficos.json';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

export default function Estadisticas() {

  const [tipoRespuesta, setTipoRespuesta] = useState(null);
  const [tipoSolicitante, setTipoSolicitante] = useState(null);
  const [tipoSolicitud, setTipoSolicitud] = useState(null);
  const [tipoIngreso, setTipoIngreso] = useState(null);
  const [tipoProducto, setTipoProducto] = useState(null);
  const [opcionGrafico, setOpcionGrafico] = useState(null);
  const { register, handleSubmit, errors, clearError } = useForm();

  async function obtener() {
    var url = referencias.consultaestadistica,
      urlConsulta = url + "?tabla=1";
    let resp = null;

    resp = await fetch(urlConsulta);
    setTipoRespuesta(await resp.json());

    urlConsulta = url + "?tabla=2";
    resp = await fetch(urlConsulta);
    setTipoSolicitante(await resp.json());

    urlConsulta = url + "?tabla=3";
    resp = await fetch(urlConsulta);
    setTipoSolicitud(await resp.json());

    urlConsulta = url + "?tabla=4";
    resp = await fetch(urlConsulta);
    setTipoIngreso(await resp.json());

    urlConsulta = url + "?tabla=5";
    resp = await fetch(urlConsulta);
    setTipoProducto(await resp.json());
    setOpcionGrafico(0);
  }

  const handlerSeleccion = (e) => {
    clearError();
    let opcion = parseInt(e.target.value);
    setOpcionGrafico(opcion);

    // setNombreTabla(parseInt(e.target.value));
  }

  useEffect(() => {
    obtener();
  }, []);

  useEffect(() => {
    
  })

  return (
    <div className="container">
      <div className="row">
      <h1 className="header-1">Estadísticas</h1>
      <hr/>
        <div className="form-group col-sm-4 ">
          <label className="font-len" htmlFor="id_table">Seleccionar el gráfico:&nbsp;&nbsp;</label>
          <select className="custom-select" key="id_table" defaultValue="0" onChange={handlerSeleccion} name="id_table" ref={register({ required: true })}>
            {errors.id_intervencion && <p className="errors">Este campo es requerido</p>}
            {
              opcionesGraficos.map((item, i) => (
                <option key={"opcion" + i} value={item.id}>{item.etiqueta}</option>
              ))
            }
          </select>
        </div>
      </div>
      {
      (opcionGrafico <= 1) 
      &&
      <>
        <div className="row">
          <div className="col-sm-12">
            {
              tipoRespuesta &&
              <Grafico1 array={tipoRespuesta} coloresGraficos={coloresGraficos1} titulo='Consultas por tipo de respuestas' />
            }
          </div>
        </div>
      <hr />
      </>
      }
      {
      (opcionGrafico == 0 || opcionGrafico == 2) &&
      <>
        <div className="row">
          <div className="col-sm-12">
            {
              tipoSolicitante &&
              <Grafico1 array={tipoSolicitante} coloresGraficos={coloresGraficos2} titulo='Consultas por tipo de solicitante' />
            }
          </div>
        </div>
        <hr />
      </>
      }
      {
        (opcionGrafico == 0 || opcionGrafico == 3) &&
        <>
        <div className="row">
          <div className="col-sm-12">
            {
              tipoSolicitud &&
              <Grafico1 array={tipoSolicitud} coloresGraficos={coloresGraficos1} titulo='Consultas por tipo de solicitud' />
            }
          </div>
        </div>
        <hr/>
      </>
      }
      {
       (opcionGrafico == 0 || opcionGrafico == 4) &&
       <>
        <div className="row">
          <div className="col-sm-12">
            {
              tipoIngreso &&
              <Grafico1 array={tipoIngreso} coloresGraficos={coloresGraficos1} titulo='Consultas por tipo de ingreso' />
            }
          </div>
        </div>
        <hr/>
      </>
      }
      {
       (opcionGrafico == 0 || opcionGrafico == 5) &&
       <>
        <div className="row">
          <div className="col-sm-12">
            {
              tipoProducto &&
              <Grafico1 array={tipoProducto} coloresGraficos={coloresGraficos1} titulo='Consultas por tipo de producto' />
            }
          </div>
        </div>
      </>
      }
    </div>
  
  );
}