import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';

import Tabla from './Tabla';

import MyContext from '../modulos/MyContext';

import obtenerJson from '../modulos/obtenerJson';
import obtener from '../modulos/obtener';

import enviar from '../modulos/enviar';
import filtrar from '../modulos/filtrar';


// import axios from 'axios';
import mostrarAlerta from './Alerta.js'

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

var tmpConsultas = null,
  tipoIntervencion = null,
  tipoSolicitante = null,
  idSolicitud = null,
  tipoRespuesta = null,
  tmpEditar = null,
  intervenciones = null;

// carga de los JSON de los selects
var urlConsultas = referencias.consultageneral + "?tabla=consultas",
  urlIntervencion = referencias.consultageneral + "?tabla=tipo_intervencion",
  urlSolicitante = referencias.consultageneral + "?tabla=tipo_solicitante",
  urlSolicitud = referencias.consultageneral + "?tabla=tipo_solicitud",
  urlRespuesta = referencias.consultageneral + "?tabla=tipo_respuesta";

export default function ConsultasVer() {

  const [datosFiltrados, setDatosFiltrados] = useState(null);

   //Bandera que indica que la solicitud y retorno de datos están resuletos
   const [datosListos, setDatosListos] = useState(false);

  const { register, handleSubmit, errors, clearError } = useForm();

  const { usuario, setUsuario } = useContext(MyContext);

  // Id de la intervencion filtrado
  const [intervencionId, setIntervencionId] = useState(null);


  //Cargado se cambia a True cuando se termina la carga de json del servidor
  // const [cargado, setCargado] = useState(false);

  // //Estado para controlar la carga del json respectivo
  // const [tipo_intervencion, setTipoIntervencion] = useState(null);

  //  Estado que maneja  información de consultas
  const [consultasDatos, setConsultasDatos] = useState(null);

  //Bandera que se utiliza para tiempo en espera de recuperar un json cuando se ha borrado un registro
  const [esperando, setEsperando] = useState(false);

  //Estado que maneja  la seleccion del usuario
  const [intervencion, setIntervencion] = useState(null);

  //Estado para ocultar o mostrar un modal
  const [show, setShow] = useState(false);
  //cerrar modal
  const handleClose = () => setShow(false);

  //Estado para controlar la carga del json respectivo
  // const [id_solicitud, setIdSolicitud] = useState(null);

  //Estado que maneja  la seleccion del usuario
  const [solicitud, setSolicitud] = useState(null);

  //Estado para controlar la carga del json respectivo
  // const [tipo_solicitante, setTipoSolicitante] = useState(null);

  //Estado que maneja  la seleccion del usuario
  const [solicitante, setSolicitante] = useState(null);

  //Estado para controlar la carga del json respectivo
  // const [tipo_respuesta, setTipoRespuesta] = useState(null);

  // //Estado que maneja  la seleccion del usuario
  const [respuesta, setRespuesta] = useState(null);


  const onSubmit = (data, e) => {
    let idConsulta = tmpEditar[0].id;
    console.log("idConsulta a ACTUALIZAR",idConsulta);
    
    data.fecha_respuesta === "" && delete data["fecha_respuesta"];
    data.id_respuesta === "" && delete data["id_respuesta"];

    let url = referencias.actualizaconsulta + "?tabla_destino=consultas&id="+idConsulta + "";
    console.log("url desde submit", url);

    enviar(url, data, function (resp) {
      console.log("respuesta", resp);
      handleClose();
      mostrarAlerta("Alerta", resp.msj)
          setEsperando(false);
          obtenerDatos(function () {
            tmpEditar = filtrar(consultasDatos, "id", intervencionId);
            setEsperando(false);
        });
    });
    // setIntervencion(0);
    // e.target.reset(); // reset after form submit

  };
  async function obtenerDatos() {
    // Obtiene los datos de los select's


    // // 1 Consultas       
    // let response1 = await fetch(urlConsultas);
    // // console.log("response1",response1);    
    // tmpConsultas = await response1.json()

    // setConsultas(tmpConsultas);
    // // console.log("temporal consultas", tmpConsultas);

    // setDatosFiltrados(tmpConsultas);

    // 2 Intervención
    let response2 = await fetch(urlIntervencion);
    tipoIntervencion = await response2.json();

    //3 Solicitante
    let response3 = await fetch(urlSolicitante);
    tipoSolicitante = await response3.json();


    // 4 Solicitud
    let response4 = await fetch(urlSolicitud);
    idSolicitud = await response4.json();

    // 5 Respuesta
    let response5 = await fetch(urlRespuesta);
    tipoRespuesta = await response5.json();

    //  setDatosFiltrados(consultas);    
    // setCargado(true);
    setDatosListos(true);
  };

//   async function obtenerDatos2(cb) {
//     datosJson = await obtenerJson(config.servidor + "faro/webservices/obtener_recursos.php");
//     //console.log("datosJson", datosJson);
//     cb()
//     //TODO: niveles = await obtener("http://localhost/Faro-Admin/src/data/niveles.php")        
// }

  // async function obtenerDatosConsulta(cb) {
  //   console.log("en obtenerdatos consulta");
    
  //   // carga la tabla de consultas completa   en un temporal y luego al estado
  //   // let response1 = await fetch(urlConsultas);
  //   tmpConsultas = await obtenerJson(urlConsultas);
  //   console.log("tmpConsultas", tmpConsultas);
  //   setConsultasDatos(tmpConsultas);
  //   console.log("datosCOnsultas", consultasDatos);
    
  //   cb();
  // };

  // useEffect(() => {
  //   // console.log("comp montado");      
  //   obtenerDatos();
  // },[])

  useEffect(() => {
      obtenerDatos();
  }, [])

  const handlerSeleccionarIntervencion = (e) => {

    setIntervencionId(parseInt(e.target.value));

    intervenciones = filtrar(consultasDatos, "id_intervencion", intervencionId);
    // console.log("intervenciones FILTRADO",intervenciones);        

    setDatosFiltrados(intervenciones);
  }

  const handlerSeleccion = (e) => {
    console.log("seleccion target NAME", e.target.name);
    console.log("e.target.value", e.target.value);
    // console.log("solicitante", solicitante);

    clearError();
    parseInt(e.target.value);
    switch (e.target.name) {
      case "id_intervencion":
        setIntervencion(parseInt(e.target.value));
        break;
      case "id_solicitud":
        setSolicitud(parseInt(e.target.value));
        break;
      case "id_solicitante":
        setSolicitante(parseInt(e.target.value));
        break;
      case "tipo_respuesta":
        setRespuesta(parseInt(e.target.value));
        break;
      default:
        break;
    }
  }

  const handleEditarConsulta = (e) => {
    let id = parseInt(e.target.id);
    // setIntervencionID(id);
    // alert("Editar")
    // console.log("itemid EDICION DEL ESTADO", intervencionID);
    tmpEditar = filtrar(consultasDatos, "id", id);
    // tmpEditar= tmpEditar[0];
    console.log("tmpEditar[0]", tmpEditar[0]);
    console.log("CONSULTA A EDITAR id", tmpEditar[0].id);
    setShow(true)

  }

  const handleEliminarConsulta = (e) => {
    const id = e.target.id;
    // const data = { "id": id, "id_usuario": "106" };

    // alertify.confirm("¿Desea realmente eliminar el recurso?",
    //     function () {
    //         enviar(config.servidor + "Faro/webservices/eliminar_recurso.php", data, function (param) {
    //             //console.log("param",param);  
    //             alertify.success(param);
    //             setEsperando(true);
    //             obtenerDatos(function () {
    //                 //Array filtrado Por nivel
    //                 datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);
    //                 //Asignatura
    //                 filtrarPorAsignatura();
    //                 setEsperando(false);
    //             });
    //         })
    //     });
  }



  return (
    datosListos ?
      (
        <div className="col-12">
          <h1 className="header-1">Ver consultas</h1><hr />
          <div className="row">
            <div className="col-sm-8 input-group mb-3 input-group-sm">
              <div className="input-group-prepend">
                <span className="font-len input-group-text">Tipo de Intervención</span>
              </div>
              <select className="custom-select" key="iditervencion" defaultValue="" onChange={handlerSeleccionarIntervencion} name="id_intervencion">
                {/* {errors.id_intervencion && <p className="errors">Este campo es requerido</p>} */}
                <option value="" disabled>Seleccione...</option>
                {

                  tipoIntervencion.map((item, i) => (
                    <option key={"intervencion" + i} value={item.id}>{item.tipo}</option>
                  ))
                }
              </select>
            </div>
          </div>
          {
            esperando ?
              (
                <Tabla array={datosFiltrados} clase="table table-striped sombreado" modo="visor" />
              ) :
              (
                <Tabla array={datosFiltrados} handleEliminarRecurso={handleEliminarConsulta} handleEditarConsulta={handleEditarConsulta} clase="table table-striped" modo="visor" />
              )
          }
          {<Modal
            show={show}
            onHide={handleClose}
            size="lg"
          // aria-labelledby="contained-modal-title-vcenter"
          // centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="header-1">Edición</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {tmpEditar &&
                      <React.Fragment>
                        <div className="row">
                          <div className="form-group col-sm-6 ">
                            <label className="font-len" htmlFor="id_intervencion">Tipo de intervención:&nbsp;&nbsp;</label>
                            <select className="custom-select" key="iditervencion" defaultValue={tmpEditar[0].id_intervencion} onChange={handlerSeleccion} name="id_intervencion" ref={register({ required: true })}>
                              {errors.id_intervencion && <p className="errors">Este campo es requerido</p>}
                              <option value="" disabled>Seleccione...</option>
                              {

                                tipoIntervencion.map((item, i) => (
                                  <option key={"intervencion" + i} value={item.id}>{item.tipo}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="form-group col-sm-6 ">
                            <label className="font-len" htmlFor="id_solicitante">Tipo de solicitante:</label>
                            <select className="custom-select" key="idsolicitante" defaultValue={tmpEditar[0].id_solicitante} onChange={handlerSeleccion} name="id_solicitante" ref={register({ required: true })}>
                              {errors.id_solicitante && <p className="errors">Este campo es requerido</p>}
                              <option value="" disabled>Seleccione...</option>
                              {

                                tipoSolicitante.map((item, i) => (
                                  <option key={"solicitante" + i} value={item.id}>{item.tipo}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                        {solicitante === 5 &&
                          <div className="row">
                            <div className="form-group col-sm-12">
                              <label className="font-len" htmlFor="solicitante_otro">Descripción:</label>
                              <input className="form-control" type="text" placeholder="Escriba el otro tipo de solicitante" id="solicitante_otro" name="solicitante_otro" defaultValue={tmpEditar[0].solicitante_otro} ref={register({ required: true })} />
                              {errors.solicitante_otro && <p className="errors">Este campo es requerido</p>}
                            </div>
                          </div>
                        }
                        <div className="row">
                          <div className="form-group col-sm-6 ">
                            <label className="font-len" htmlFor="id_solicitud">Tipo de solicitud:</label>
                            <select className="custom-select" key="idsolicitud" defaultValue={tmpEditar[0].id_solicitud} onChange={handlerSeleccion} name="id_solicitud" ref={register({ required: true })}>
                              {errors.id_solicitud && <p className="errors">Este campo es requerido</p>}
                              <option value="" disabled>Seleccione...</option>
                              {

                                idSolicitud.map((item, i) => (
                                  <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="form-group col-sm-6">
                            <label className="font-len" htmlFor="fecha_solicitud">Fecha:</label>
                            <input type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" defaultValue={tmpEditar[0].fecha_solicitud} placeholder="Digite la fecha" ref={register({ required: true })} />
                            {errors.fecha_solicitud && <p className="errors">Este campo es requerido</p>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-sm-12">
                            <label className="font-len" htmlFor="tema">Tema:</label>
                            <input className="form-control" type="text" id="tema" name="tema" defaultValue={tmpEditar[0].tema} ref={register({ required: true })} />
                            {errors.tema && <p className="errors">Este campo es requerido</p>}
                          </div>
                        </div>
                        <h4 className="header-1">Atención a la consulta</h4>
                        <div className="row">
                          <div className="form-group col-sm-6 ">
                            <label className="font-len" htmlFor="id_respuesta">Tipo de respuesta:</label>
                            <select className="custom-select" key="id_respuesta" defaultValue={tmpEditar.id_respuesta} onChange={handlerSeleccion} name="id_respuesta" ref={register}>
                              {errors.id_respuesta && <p className="errors">Este campo es requerido</p>}
                              <option value="" disabled>Seleccione...</option>
                              {
                                tipoRespuesta.map((item, i) => (
                                  <option key={"solicitud" + i} value={item.id}>{item.tipo}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="form-group col-sm-6">
                            <label className="font-len" htmlFor="fecha_respuesta">Fecha:</label>
                            <input type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" defaultValue={tmpEditar.fecha_respuesta} placeholder="Digite la fecha" ref={register} />
                            {errors.fecha_respuesta && <p className="errors">Este campo es requerido</p>}
                          </div>
                        </div>
                        <div className="form-group d-none">
                          <input type="text" className="form-control" name="id_usuario" id="id_usuario" defaultValue={usuario.idUsuario} ref={register} />
                        </div>
                        <div className="row">
                          <div className="offset-sm-8 col-sm-4 text-center">
                            <input className="btn btn-block btn-main text-center" type="submit" value="Guardar" onClick={handleClose}></input>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  </form>
                </>
              }
            </Modal.Body>
          </Modal>}
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
