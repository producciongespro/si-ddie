import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'react-bootstrap';

import Tabla from './Tabla';
import FormVerConsulta from './FormVerConsulta'

import MyContext from '../modulos/MyContext';

import enviar from '../modulos/enviar';
import filtrar from '../modulos/filtrar';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import mostrarAlerta from './Alerta.js';

// imágenes de la papelera
import Imagen from './Imagen';
import papeleraVacia from '../images/papelera-vacia.png';
import papelera from '../images/papelera-full.png';

import referenciasJson from '../data/referencias.json';
import contenidosJson from '../data/contenidos.json';

const contenidos = contenidosJson[1];
const referencias = referenciasJson[0];

var tmpConsultas = null,
  tipoIntervencion = null,
  tipoSolicitante = null,
  idSolicitud = null,
  tipoRespuesta = null,
  tmpEditar = null,
  tmpEliminados = null,
  intervenciones = null,
  intervencionId = null,
  mensaje = "",
  itemEditar = {};

// carga de los JSON de los selects
var urlConsultas = referencias.consultageneral + "?tabla=consultas",
  urlEliminadosConsultas = referencias.consultaeliminados + "?tabla=consultas",
  urlIntervencion = referencias.consultageneral + "?tabla=tipo_intervencion",
  urlSolicitante = referencias.consultageneral + "?tabla=tipo_solicitante",
  urlSolicitud = referencias.consultageneral + "?tabla=tipo_solicitud",
  urlRespuesta = referencias.consultageneral + "?tabla=tipo_respuesta";

export default function ConsultasVer() {

  // grupo de datos filtrados 
  const [datosFiltrados, setDatosFiltrados] = useState(null);

  // grupo de datos eliminados que se mantienen actualizados
  const [datosEliminados, setDatosEliminados] = useState(null);

  //Bandera que indica que la solicitud y retorno de datos están resueltos
  const [datosListos, setDatosListos] = useState(false);

  // datos del usuario 
  const { usuario, setUsuario } = useContext(MyContext);

  //Bandera que se utiliza para tiempo en espera de recuperar un json cuando se ha borrado un registro
  const [esperando, setEsperando] = useState(false);

  // Estado que indica el desplegar la tabla en modo papelera
  const [modoVisor, setModoVisor] = useState(true);

  //Estado para ocultar o mostrar un modal
  const [show, setShow] = useState(false);

  //cerrar modal
  const handleClose = () => setShow(false);

  const onCloseModal = () => {
    setShow(false);
    setEsperando(false);
  };

  //controla si las consultas están filtradas o no  
  const [sinFiltro, setSinFiltro] = useState(true);

  //Estado que maneja  la seleccion del usuario
  const [intervencion, setIntervencion] = useState(null);

  //Estado que maneja  la seleccion del usuario
  const [solicitud, setSolicitud] = useState(null);

  //Estado que maneja  la seleccion del usuario
  const [solicitante, setSolicitante] = useState(null);

  //Estado que maneja  la seleccion del usuario
  const [respuesta, setRespuesta] = useState(null);

  // Controla el estado de modo de la tabla
  const handlePapelera = () => setModoVisor(false);

  const handlerEnviarEdicion = (data) => {
    let idConsulta = tmpEditar[0].id;

    data.fecha_respuesta === "" && delete data["fecha_respuesta"];
    data.id_respuesta === "" && delete data["id_respuesta"];
    data.id_usuario = usuario.idUsuario;

    let url = referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + idConsulta + "";
    console.log("data a enviar con cambios", data);
    console.log("url desde submit", url);
    setEsperando(true);
    enviar(url, data, function (resp) {
      handleClose();
      // console.log("resp", resp);        
      mostrarAlerta("Alerta", resp.data.mensaje);
      if (!resp.data.error) {
        setShow(false);
      }
      actualizaDatos(function () {
        if (sinFiltro) {
          tmpEditar = tmpConsultas;
        }
        else {
          tmpEditar = filtrar(tmpConsultas, "id_intervencion", intervencionId);
        }
        setDatosFiltrados(tmpEditar);
        setEsperando(false);
      });
    });
  };

  async function actualizaDatos(cb) {
    let response1 = await fetch(urlConsultas);
    tmpConsultas = await response1.json();
    cb();
  }

  async function actualizaDatosEliminados(cb) {
    let response1 = await fetch(urlEliminadosConsultas);
    tmpEliminados = await response1.json();
    // setDatosEliminados(tmpEliminados)
    cb();
  }

  async function obtenerDatos(cb) {

    // // 1 Consultas       
    let response1 = await fetch(urlConsultas);
    tmpConsultas = await response1.json()


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

    // 6 Eliminados
    let response6 = await fetch(urlEliminadosConsultas);
    tmpEliminados = await response6.json();

    cb();

  };

  useEffect(() => {
    // console.log("Componente montado");
    obtenerDatos(function () {
      setDatosListos(true);
      setDatosFiltrados(tmpConsultas);
    });
    actualizaDatosEliminados(function () {
      setDatosEliminados(tmpEliminados)
    });
  }, []);


  const handlerSeleccionarIntervencion = (e) => {
    // evento que lee la selección del usuario del tipo de intervenció e invoca ella llamado para filtrar
    intervencionId = parseInt(e.target.value);
    // console.log("e.target.value", e.target.value);
    intervenciones = filtrar(tmpConsultas, "id_intervencion", intervencionId);
    setDatosFiltrados(intervenciones);
    setSinFiltro(false);
  }


  const valor = () => {
    // colocar por el valor por defecto al campo respuesta 
    let valor = "";
    tmpEditar[0].id_respuesta !== null ? (valor = tmpEditar[0].id_respuesta) : valor = "";
    return valor
  }

  const handlerSeleccion = (e) => {
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

  const handleModoVisor = () => {
    setModoVisor(true);
    setSinFiltro(true);
    obtenerDatos(
      function () {
        setDatosListos(true);
        setDatosFiltrados(tmpConsultas);
      }
    );
  };

  const handleSinFiltro = (e) => {
    // desactiva el check del filtro y el estado
    if (e.target.checked) {
      setTimeout(() => {
        let element = document.getElementById("selectIntervencion");
        element.value = "";
        setSinFiltro(true);
        setDatosFiltrados(tmpConsultas);
      }, 500);
    }
  }


  const handleEditarConsulta = (e) => {
    let id = parseInt(e.target.id);
    tmpEditar = filtrar(tmpConsultas, "id", id);
    setSolicitante(parseInt(tmpEditar[0].id_solicitante));
    itemEditar = tmpEditar[0];
    setEsperando(true);
    setShow(true);
  }

  const handleEliminarConsulta = (e) => {
    const idConsulta = e.target.id;
    alertify.confirm('Eliminar', '¿Desea realmente eliminar la consulta?',
      function () {
        // var data = {};
        let url = referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + idConsulta + "";
        // console.log("url desde submit", url);
        const data = {
          "borrado": 1,
          "id_usuario": usuario.idUsuario
        };
        setEsperando(true);
        enviar(url, data, function (resp) {
          // alertify.success(resp.data.mensaje,2);
          alertify.success("El registro se ha eliminado exitosamente", 2);
          actualizaDatos(function () {
            if (sinFiltro) {
              tmpEditar = tmpConsultas;
            }
            else {
              tmpEditar = filtrar(tmpConsultas, "id_intervencion", intervencionId);
            }
            //actualizando el registro de eliminados
            actualizaDatosEliminados(function () {
              setDatosEliminados(tmpEliminados);
            })
            console.log("LARGO", tmpEditar.lenght);
            setDatosFiltrados(tmpEditar);
            setEsperando(false);
          })
        });
      }, function () { })
      .set('labels', { ok: 'Aceptar', cancel: 'Cancelar' });
  }

  const handleRecuperarRegistro = (e) => {

    let idRecuperar = e.target.id;
    const data = {
      "borrado": 0,
      "id_usuario": usuario.idUsuario
    };

    let url = referencias.actualizaconsulta + "?tabla_destino=consultas&id=" + idRecuperar + "";
    setEsperando(true);
    enviar(url, data, function (resp) {
      mensaje = resp.data.mensaje
      actualizaDatosEliminados(function () {
        setDatosEliminados(tmpEliminados);
        if (tmpEliminados.length === 0) {
          mensaje += ". Se ha recuperado el último registro y la papelera está vacía";
          mostrarAlerta("Alerta", mensaje);
          actualizaDatos(function () {
            tmpEditar = tmpConsultas;
            setDatosFiltrados(tmpEditar);
            mensaje = "";
            setSinFiltro(true);
            setEsperando(false);
            setModoVisor(true);
          });
        }
        else {
          mensaje += ". Se ha recuperado el registro"
          mostrarAlerta("Alerta", mensaje);
          setEsperando(false);
        }
      });
    });
  };


  return (
    datosListos ?
      (
        <div className="col-12">
          <h1 className="header-1">Ver consultas</h1><hr />

          <div className="col-sm-12">
            {datosEliminados.length === 0 ?
              (
                <Imagen classElement="img-papelera-vacia float-right" origen={papeleraVacia} />
              )
              :
              (esperando ?
                (
                  <Imagen classElement="img-papelera float-right disabled" origen={papelera} />
                )
                :
                (
                  <Imagen classElement="img-papelera float-right" origen={papelera} handlerPapelera={handlePapelera} />
                )
              )
            }
          </div>
          {
            !modoVisor ?
              (
                esperando ?

                  (
                    <>
                      <div>
                        <span className="spinner-grow spinner-grow-lg text-danger"></span>
                        <span className=""> En proceso... Por favor espere.</span>
                      </div>
                      <Tabla array={datosEliminados} contenidos={contenidos} clase="table table-striped sombreado" modo="papelera" />
                    </>
                  )
                  :
                  (
                    <>
                      <div className="row">
                        <hr />
                        <div className="float-right divBoton">
                          <button className="btn btn-regresar float-right" onClick={handleModoVisor}> Regresar</button>
                        </div>
                      </div>
                      <Tabla array={datosEliminados} contenidos={contenidos} clase="table table-striped sombreado" modo="papelera" handleRecuperar={handleRecuperarRegistro} />
                    </>
                  )
              )
              :
              (
                <>
                  <div className="row">
                    <div className="col-sm-8 input-group mb-3 input-group-sm">
                      <div className="input-group-prepend">
                        <span className="font-len">Tipo de Intervención:</span>&nbsp;&nbsp;
                    </div>
                      <select id="selectIntervencion" className="custom-select" key="iditervencion" defaultValue="" onChange={handlerSeleccionarIntervencion} name="id_intervencion">
                        <option value="" disabled>Seleccione...</option>
                        {

                          tipoIntervencion.map((item, i) => (
                            <option key={"intervencion" + i} value={item.id}>{item.tipo}</option>
                          ))
                        }
                      </select>
                    </div>

                    {!sinFiltro &&
                      <div className="col-sm-4">
                        <div className="pretty p-switch p-fill">
                          <input type="checkbox" value="" onChange={handleSinFiltro} />
                          <div className="state">
                            <label>Ver todos</label>
                          </div>
                        </div>
                      </div>

                    }
                  </div>
                  {esperando ?
                    (
                      <>

                        <div>
                          <span className="spinner-grow spinner-grow-lg text-danger"></span>
                          <span className=""> En proceso... Por favor espere.</span>
                        </div>
                        <Tabla array={datosFiltrados} contenidos={contenidos} clase="table table-striped sombreado" modo="visor" />
                      </>
                    )
                    :
                    (
                      <Tabla array={datosFiltrados} contenidos={contenidos} handleEliminarConsulta={handleEliminarConsulta} handleEditarConsulta={handleEditarConsulta} clase="table table-striped" modo="visor" />
                    )
                  }
                </>
              )
          }
          {<Modal
            show={show}
            onHide={handleClose}
            size="xl"
            backdrop="static"
          >
            <Modal.Header className="modal-header-edicion">
              <Modal.Title ><h1>Edición</h1></Modal.Title>
              <button type="button" class="close" data-dismiss="modal" onClick={onCloseModal}>&times;</button>
            </Modal.Header>
            <Modal.Body>
                <FormVerConsulta datos={itemEditar} handlerEnviarEdicion={handlerEnviarEdicion} tipoIntervencion = {tipoIntervencion} tipoSolicitante = {tipoSolicitante} idSolicitud = {idSolicitud } tipoRespuesta = {tipoRespuesta}/>
            </Modal.Body>
            <Modal.Footer className="modal-footer-edicion"></Modal.Footer>
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
