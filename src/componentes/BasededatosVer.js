import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

import Tabla from './Tabla';
import ForVerBD from './FormVerBD';
import enviar from '../modulos/enviar';
import filtrar from '../modulos/filtrar';


import MyContext from '../modulos/MyContext';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

import Imagen from './Imagen';
import papeleraVacia from '../images/papelera-vacia.png';
import papelera from '../images/papelera-full.png';

import "../css/form.css";

import referenciasJson from '../data/referencias.json';

import mostrarAlerta from './Alerta.js';

import contenidosJson from '../data/contenidos.json';
import FormVerBD from './FormVerBD';

const referencias = referenciasJson[0];
const contenidos = contenidosJson[0];

var urlIngresos = referencias.consultageneral + "?tabla=ingresos",
  urlEliminadosIngresos = referencias.consultaeliminados + "?tabla=ingresos",
  urlTipoIngresos = referencias.consultageneral + "?tabla=tipo_ingreso",
  ingresos = null,
  ingresosId = null,
  originalIdTipoIngreso = null,
  tmpEditar = [],
  tmpIngresos = null,
  tipoIngresos = null,
  tmpEliminados = null,
  mensaje = "",
  itemEditar = {};

export default function BasededatosVer() {

  const { usuario, setUsuario } = useContext(MyContext);


  const [datosFiltrados, setDatosFiltrados] = useState(null);

  const [datosEliminados, setDatosEliminados] = useState(null);

  //Bandera que indica que la solicitud y retorno de datos están resueltos
  const [datosListos, setDatosListos] = useState(false);

  //Bandera que se utiliza para tiempo en espera de recuperar un json cuando se ha borrado un registro
  const [esperando, setEsperando] = useState(false);

  // Estado que indica el desplegar la tabla en modo papelera
  const [modoVisor, setModoVisor] = useState(true);

  //Estado que maneja el ingreso seleccionado por el usuario
  const [ingresoSel, setIngresoSel] = useState(null);

  //Estado para ocultar o mostrar un modal
  const [show, setShow] = useState(false);

  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];

  //cerrar modal
  const handleClose = () => setShow(true);

  const onCloseModal = () => {
    setShow(false);
    setEsperando(false);
  };

  const [mesSel, setMesSel] = useState(null);

  const handlePapelera = () => setModoVisor(false);

  //controla si las consultas están filtradas o no  
  const [sinFiltro, setSinFiltro] = useState(true);

  const handlerEnviarEdicion = (data) => {
    // console.log("recibiendo....",data);
    // agregar id usuario !!!

    if (originalIdTipoIngreso === null) {
      originalIdTipoIngreso = data.ingreso;
    }
   
    let idRegistro = tmpEditar[0].id;
    data.id_usuario = usuario.idUsuario;
    // console.log("al enviar originalIdTipoIngreso",originalIdTipoIngreso, "nuevo...",  );
    let url = referencias.actualizar + "?tabla_destino=ingresos&id=" + idRegistro + "&idAnterior=" + originalIdTipoIngreso + "";
    // console.log("url desde submit", url);

    setEsperando(true);
    enviar(url, data, function (resp) {
      // console.log("resp luego de guardar", resp);
      mostrarAlerta("Alerta", resp.data.mensaje);
      if (!resp.data.error) {
        setShow(false);
      }
      actualizaDatos(function () {
        if (sinFiltro) {
          tmpEditar = tmpIngresos;
        }
        else {
          tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresosId);
        }
        originalIdTipoIngreso = null;
        setDatosFiltrados(tmpEditar);
        setEsperando(false);
      });
    });
  };


  async function actualizaDatos(cb) {
    let response1 = await fetch(urlIngresos);
    tmpIngresos = await response1.json();
    cb();
  }

  async function actualizaDatosEliminados(cb) {
    let response1 = await fetch(urlEliminadosIngresos);
    tmpEliminados = await response1.json();
    // setDatosEliminados(tmpEliminados)
    cb();
  }

  async function obtenerDatos(cb) {

    // // 1 Consultas       
    let response1 = await fetch(urlIngresos);
    tmpIngresos = await response1.json()


    // 2 Intervención
    let response2 = await fetch(urlTipoIngresos);
    tipoIngresos = await response2.json();

    // 6 Eliminados
    let response6 = await fetch(urlEliminadosIngresos);
    tmpEliminados = await response6.json();

    cb();
  };


  useEffect(() => {
    //Carga el primer json:
    obtenerDatos(function () {
      setDatosListos(true);
      setDatosFiltrados(tmpIngresos);
    });
    actualizaDatosEliminados(function () {
      setDatosEliminados(tmpEliminados);
    })
  }, []);

  const handleSeleccionarIngreso = (e) => {
    //obtenr el valor de seleccion desde el filtro
    ingresosId = parseInt(e.target.value);
    ingresos = filtrar(tmpIngresos, "id_ingreso", ingresosId);
    // console.log("ingresos", ingresos);
    setDatosFiltrados(ingresos);
    setSinFiltro(false);
  }

  const handleCambiarIngreso = (e) => {
    setIngresoSel(parseInt(e.target.value));
  }

  const handleMonthSelect = (e) => {
    //obtenr el valor de seleccion
    let mesActual = parseInt(e.target.value);
    setMesSel(mesActual)
  }

  function handleDefaultMes() {
    let mesActual;
    if (tmpEditar[0].mes) {
      mesActual = tmpEditar[0].mes;
    }
    else {
      mesActual = ""
    }
    return mesActual;
  }


  const handleModoVisor = () => {
    setModoVisor(true);
    obtenerDatos(
      function () {
        setDatosListos(true);
        setDatosFiltrados(tmpIngresos);
      }
    );
  };

  const handleSinFiltro = (e) => {
    if (e.target.checked) {
      setTimeout(() => {
        let element = document.getElementById("selectIngreso");
        element.value = "";
        setSinFiltro(true);
        setDatosFiltrados(tmpIngresos);
      }, 500);
    }
  }




  const handleEditarIngreso = (e) => {
    let id = parseInt(e.target.id);
    tmpEditar = filtrar(tmpIngresos, "id", id);
    setIngresoSel(parseInt(tmpEditar[0].id_ingreso));
    itemEditar = tmpEditar[0];
    originalIdTipoIngreso = tmpEditar[0].id_ingreso;
    setEsperando(true);
    setShow(true);
  }

  const handleEliminarIngreso = (e) => {
    const idIngreso = e.target.id;
    alertify.confirm('Eliminar', '¿Desea realmente eliminar este registro?',
      function () {
        // var data = {};
        let url = referencias.actualizaconsulta + "?tabla_destino=ingresos&id=" + idIngreso + "";
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
              tmpEditar = tmpIngresos;
            }
            else {

              tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresosId);
            }
            actualizaDatosEliminados(function () { setDatosEliminados(tmpEliminados); })
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
    }

    let url = referencias.actualizaconsulta + "?tabla_destino=ingresos&id=" + idRecuperar + "";
    setEsperando(true);
    enviar(url, data, function (resp) {
      mensaje = resp.data.mensaje;
      actualizaDatosEliminados(function () {
        setDatosEliminados(tmpEliminados);
        if (tmpEliminados.length === 0) {
          mensaje += ". Se ha recuperado el último registro y la papelera está vacía";
          mostrarAlerta("Alerta", mensaje);
          actualizaDatos(function () {
            tmpEditar = tmpIngresos;
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
          <h1 className="header-1">Ver ingresos a la Base de Datos</h1><hr />

          <div className="col-sm-12">
            {datosEliminados.length == 0 ?
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
                    <div className="form-group col-sm-6 ">
                      <label className="font-len" htmlFor="id_ingreso">Ver por tipo de ingreso:&nbsp;&nbsp;</label>
                      <select id="selectIngreso" className="custom-select" defaultValue="" onChange={handleSeleccionarIngreso} name="id_ingreso">
                        <option value="" disabled>Seleccione...</option>
                        {
                          tipoIngresos.map((item, i) => (
                            <option key={"ingreso" + i} value={item.id}>{item.tipo}</option>
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
                      <Tabla array={datosFiltrados} contenidos={contenidos} handleEliminarConsulta={handleEliminarIngreso} handleEditarConsulta={handleEditarIngreso} clase="table table-striped" modo="visor" />
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
                <Modal.Title ><h1>Edición - Ingresos</h1></Modal.Title>
                <button type="button" class="close" data-dismiss="modal" onClick={onCloseModal}>&times;</button>
              </Modal.Header>
              <Modal.Body>
                  <FormVerBD datos ={itemEditar} meses = {meses} handlerEnviarEdicion = {handlerEnviarEdicion} handleMonthSelect={handleMonthSelect} tipoIngresos = {tipoIngresos} id_ingreso = {itemEditar.id_ingreso}/>
              </Modal.Body>
              <Modal.Footer className="modal-footer-edicion">
              </Modal.Footer>
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
