import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import mostrarAlerta from './Alerta.js';

import MyContext from '../modulos/MyContext';

import enviar from '../modulos/enviar';
import obtener from '../modulos/obtener';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

export default function Consultas() {


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors } } = useForm();

  const valueOfSolicitante = watch('id_solicitante');

  const { usuario, setUsuario } = useContext(MyContext);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [cargado, setCargado] = useState(false);

  //Estado para controlar la carga del json respectivo
  const [tipo_intervencion, setTipoIntervencion] = useState(null);
  //Estado que maneja  la seleccion del usuario
  const [intervencion, setIntervencion] = useState(null);

  //Estado para controlar la carga del json respectivo
  const [id_solicitud, setIdSolicitud] = useState(null);
  //Estado que maneja  la seleccion del usuario
  const [solicitud, setSolicitud] = useState(null);

  //Estado para controlar la carga del json respectivo
  const [tipo_solicitante, setTipoSolicitante] = useState(null);
  //Estado que maneja  la seleccion del usuario
  const [solicitante, setSolicitante] = useState(null);

  //Estado para controlar la carga del json respectivo
  const [tipo_respuesta, setTipoRespuesta] = useState(null);
  //Estado que maneja  la seleccion del usuario
  const [respuesta, setRespuesta] = useState(null);

  const onSubmit = (data, e) => {
    // console.log(JSON.stringify(data));
    data.fecha_respuesta === "" && delete data["fecha_respuesta"];
    data.id_respuesta === "" && delete data["id_respuesta"];
    data.id_usuario = usuario.idUsuario
    let url = referencias.guardaconsulta + "?tabla_destino=consultas";
    // console.log("url desde submit", url);
    // console.log("data", data);

    enviar(url, data, function (resp) {
      console.log(resp);
    });
    setIntervencion(0);
    e.target.reset(); // reset after form submit
  };
  // console.log("errors",errors);

  useEffect(() => {
    //Acción que se ejecuta una vez que se monta el componente

    // carga de los JSON de los selects
    let urlIntervencion = referencias.consultageneral + "?tabla=tipo_intervencion",
      urlSolicitante = referencias.consultageneral + "?tabla=tipo_solicitante",
      urlSolicitud = referencias.consultageneral + "?tabla=tipo_solicitud",
      urlRespuesta = referencias.consultageneral + "?tabla=tipo_respuesta";

    obtener(urlIntervencion, function (data) {
      // console.log("datos", data);
      setTipoIntervencion(data);
      //Carga el segundo select en el callback del primer "obtner":
      obtener(urlSolicitante, function (data) {
        //Callback del segundo obtener
        setTipoSolicitante(data);
        //Activa cargado para que meuistre el formulario:
        obtener(urlSolicitud, function (data) {
          //Callback del segundo obtener
          setIdSolicitud(data);
          obtener(urlRespuesta, function (data) {
            //Callback del segundo obtener
            setTipoRespuesta(data);

            setCargado(true)
          });
        });
      })
    })
  }, []);

 return (
    cargado ?
      (
        <div className="col-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="header-1">Agregar consulta</h1><hr />
            <div className="row">
              <div className="form-group col-sm-12 ">
                <label className="item-negrilla font-len" htmlFor="id_intervencion">Tipo de intervención:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" {...register("id_intervencion", { required: true })} >
                {errors.id_intervencion && <p className="item-error">Este campo es requerido</p>}
                  <option value="" disabled>Seleccione...</option>
                  {
                    tipo_intervencion.map((item, i) => (
                      <option key={"intervencion" + i} value={item.id}>{item.tipo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12 ">
                <label className="item-negrilla font-len" htmlFor="id_solicitante">Tipo de solicitante:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" {...register("id_solicitante", { required: true })} >
                {errors.id_solicitante && <p className="item-error">Este campo es requerido</p>}
                  <option value="" disabled>Seleccione...</option>
                  {
                    tipo_solicitante.map((item, i) => (
                      <option key={"solicitante" + i} value={item.id}>{item.tipo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            {valueOfSolicitante === "5" &&
              <div className="row">
                <div className="form-group col-sm-12">
                  <label className="item-negrilla font-len" htmlFor="solicitante_otro">Descripción:&nbsp;&nbsp;</label>
                  <input type="text" className="form-control" placeholder="Escriba el otro tipo de solicitante" {...register("solicitante_otro", { required: true })} />
                  {errors.solicitante_otro && <p className="item-error">Este campo es requerido</p>}
                </div>
              </div>
            }
            <div className="row">
              <div className="form-group col-sm-12 ">

                <label className="item-negrilla font-len" htmlFor="id_solicitud">Tipo de solicitud:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" {...register("id_solicitud", { required: true })} >
                {errors.id_solicitud && <p className="item-error">Este campo es requerido</p>}
                  <option value="" disabled>Seleccione...</option>
                  {
                    id_solicitud.map((item, i) => (
                      <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label className="item-negrilla font-len" htmlFor="tema">Tema:&nbsp;&nbsp;</label>
                <input type="text" className="form-control" placeholder="Tema" {...register("tema", { required: true })} />
                {errors.tema && <p className="item-error">Este campo es requerido</p>}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">

                <label className="item-negrilla font-len" htmlFor="fecha_solicitud">Fecha:&nbsp;&nbsp;</label>
                <input type="date" className="form-control" placeholder="Digite la fecha" {...register("fecha_solicitud", { required: true })} />
                {errors.fecha_solicitud && <p className="item-error">Este campo es requerido</p>}
              </div>
            </div>
            <br />
            <h2 className="header-2">Atención a la consulta</h2>
            <hr />
            <div className="row">
              <div className="form-group col-sm-12 ">

                <label className="item-negrilla font-len" htmlFor="id_respuesta">Tipo de respuesta:&nbsp;&nbsp;</label>
                <select className="custom-select form-control" defaultValue="" {...register("id_respuesta")} >
                {errors.id_respuesta && <p className="item-error">Este campo es requerido</p>}
                <option value="" disabled>Seleccione...</option>
                  {
                    tipo_respuesta.map((item, i) => (
                      <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label className="item-negrilla font-len" htmlFor="fecha_respuesta">Fecha:&nbsp;&nbsp;</label>
                <input type="date" className="form-control" placeholder="Digite la fecha" {...register("fecha_respuesta")} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 center">
                <input className="btn btn-block btn-main" type="submit" value="Guardar registro" />
              </div>
            </div>
          </form>
        </div>
      )
      :
      (
        <div>
          <span className="spinner-grow spinner-grow-lg text-danger"></span>
          <span className=""> Cargando datos. Por favor espere...</span>
        </div>

      )

  );
}