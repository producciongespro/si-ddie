import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

import Tabla from './Tabla';
import { eliminar } from "gespro-utils/crud_array";
import FormVerProduccion from './FormVerProduccion';


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

// import obtenerValoresCheck from '../modulos/obtenerValoresCheck';


import "../css/form.css";

import referenciasJson from '../data/referencias.json';
import contenidosJson from '../data/contenidos.json';

const contenidos = contenidosJson[2];
const referencias = referenciasJson[0];

var tmpProductos = null,
  tipoProducto = null,
  tipoPoblacion = null,
  idProducto = null,
  tmpEditar = null,
  tmpEliminados = null,
  productosFiltrados = null,
  productoId = null,
  originalIdTipoProducto = null,
  mensaje = "",
  itemEditar = {},
  valoresCheck = [];

// carga de los JSON de los selects
var urlProductos = referencias.consultageneral + "?tabla=productos",
  urlEliminadosConsultas = referencias.consultaeliminados + "?tabla=productos",
  urlTipoProductos = referencias.consultageneral + "?tabla=tipo_productos",
  urlPoblacion = referencias.consultageneral + "?tabla=productos_poblacion_meta";

export default function ProduccionVer() {
  // grupo de datos filtrados 
  const [datosFiltrados, setDatosFiltrados] = useState(null);

  // grupo de datos eliminados que se mantienen actualizados
  const [datosEliminados, setDatosEliminados] = useState(null);

  //Bandera que indica que la solicitud y retorno de datos están resueltos
  const [datosListos, setDatosListos] = useState(false);


  const { register, handleSubmit, errors, clearError } = useForm();


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

  const handlePapelera = () => setModoVisor(false);

  //controla si las consultas están filtradas o no  
  const [sinFiltro, setSinFiltro] = useState(true);

  //Estado que maneja  la seleccion del usuario
  const [productoSel, setProductoSel] = useState(null);


  // ----------------------

  //Estado para controlar la carga del json de productos:
  const [productos, setProductos] = useState(null);

  //Estado que maneja el producto seleccionado por el usuario
  const [producto, setProducto] = useState(null);

  //Estado que maneja el mes seleccionado por el usuario
  const [mesSel, setMesSel] = useState(null);

  //Estado que carga las poblaciones del json del servidor
  const [poblaciones, setPoblaciones] = useState(null);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [cargado, setCargado] = useState(false);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [otraPoblacion, setOtraPoblacion] = useState(false);

  const handlerEnviarEdicion = (data) => {

    let idProducto = tmpEditar[0].id;
    if (originalIdTipoProducto === null) {
      originalIdTipoProducto = data['id_producto'];
    }
console.log('data recibida',data);
console.log("poblacion recibida",data.poblacion);
    // data.poblacion = JSON.stringify(valoresCheck);

    // if (valoresCheck.length > 0) {
    //   data.poblacion = JSON.stringify(valoresCheck);
    // }
    // else
    // {
    //   console.log("viene vacío y entré eb ekse");
    //   data.poblacion = JSON.stringify(valoresCheck);
    // }

    // let arrayPoblacion = obtenerValoresCheck("beneficiario");

    // delete data["beneficiario"]; //borrar el check

    // data.poblacion = arrayPoblacion;
    data.id_usuario = usuario.idUsuario;

    let url = referencias.actualizar + "?tabla_destino=productos&id=" + idProducto + "&idAnterior=" + originalIdTipoProducto + "";

    setEsperando(true);
    enviar(url, data, function (resp) {
      handleClose();
      mostrarAlerta("Alerta", resp.data.mensaje);
      if (!resp.data.error) {
        setShow(false);
        valoresCheck = [];
      }
      actualizaDatos(function () {
        if (sinFiltro) {
          tmpEditar = tmpProductos;
        }
        else {
          tmpEditar = filtrar(tmpProductos, "id_producto", productoId);
        }
        originalIdTipoProducto = null;
        setDatosFiltrados(tmpEditar);
        setEsperando(false);
      });
    });
  };

  async function actualizaDatos(cb) {
    let response1 = await fetch(urlProductos);
    tmpProductos = await response1.json();
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
    let response1 = await fetch(urlProductos);
    tmpProductos = await response1.json()

    // 2 Intervención
    let response2 = await fetch(urlTipoProductos);
    tipoProducto = await response2.json();

    // 3 Población
    let response3 = await fetch(urlPoblacion);
    tipoPoblacion = await response3.json();

    // 4 Eliminados
    let response4 = await fetch(urlEliminadosConsultas);
    tmpEliminados = await response4.json();

    cb();

  };


  useEffect(() => {
    obtenerDatos(function () {
      setProductos(tipoProducto);
      setPoblaciones(tipoPoblacion);
      setDatosListos(true);
      setDatosFiltrados(tmpProductos);
    });
    actualizaDatosEliminados(function () {
      setDatosEliminados(tmpEliminados)
    });
  }, []);


  const handleSeleccionarProducto = (e) => {
    //obtiene el valor de selección

    productoId = parseInt(e.target.value);
    productosFiltrados = filtrar(tmpProductos, "id_producto", productoId);
    setDatosFiltrados(productosFiltrados);
    setSinFiltro(false);

  }

  // const handleCambiarProducto = (e) => {
  //   if (parseInt(e.target.value) === 1) {   //no tiene población
  //     let arrayPoblacion = obtenerValoresCheck("beneficiario");
  //   }
  //   setProductoSel(parseInt(e.target.value));
  // }

  // const handleMonthSelect =(e)=>{
  //   //obtiene el valor de seleccion
  //   setMesSel(parseInt(e.target.value));
  // }


  // function handleDefaultMes ( ) {
  //   let mesActual;
  //   if(tmpEditar[0].mes_revista){
  //     mesActual = tmpEditar[0].mes_revista
  //   }
  //   else {
  //     mesActual = ""
  //   }
  //   return mesActual;
  // }

  // const handleChangeCheck =(e)=>{
  //     (e.target.checked)?setOtraPoblacion(true):setOtraPoblacion(false);
  // }

  const handleGetCheck = (e) => {
    const item = e.target;
    (item.id === "12" && e.target.checked) ? setOtraPoblacion(true) : setOtraPoblacion(false);
    if (item.checked) {
      //si es vardadero simplemente lo agrega en el array:
      const tmpObj = {
        // nombre: item.name,
        id: item.id,
        // valor: item.checked,
      };
      valoresCheck.push(tmpObj);
      //console.log(valoresCheck);
    } else {
      //Si es falso lo busca del array para eliminarlo
      const itemEliminado = eliminar(item.id, valoresCheck);
      //console.log("Objeto eliminado", itemEliminado);
    }
  };

  const handleModoVisor = () => {
    setModoVisor(true);
    obtenerDatos(
      function () {
        setDatosListos(true);
        setDatosFiltrados(tmpProductos);
      }
    );
  };

  const handleSinFiltro = (e) => {
    if (e.target.checked) {
      setTimeout(() => {
        let element = document.getElementById("selectProducto");
        element.value = "";
        setSinFiltro(true);
        setDatosFiltrados(tmpProductos);
      }, 500);
    }
  }

  const handleEditarProducto = (e) => {
    let id = parseInt(e.target.id);

    tmpEditar = filtrar(tmpProductos, "id", id);
    itemEditar = tmpEditar[0];

    // console.log("registro a editar", tmpEditar);

    // let array = JSON.parse(tmpEditar[0].poblacion);
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    //   if (element.id === '12') {
    //     setOtraPoblacion(true);
    //   }        
    // }

    setProductoSel(parseInt(tmpEditar[0].id_producto));
    setEsperando(true);
    setShow(true);
  }

  const handleEliminarProducto = (e) => {
    const idProducto = e.target.id;
    alertify.confirm('Eliminar', '¿Desea realmente eliminar este registro?',
      function () {
        // var data = {};
        let url = referencias.actualizaconsulta + "?tabla_destino=productos&id=" + idProducto + "";
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
              tmpEditar = tmpProductos;
            }
            else {

              tmpEditar = filtrar(tmpProductos, "producto", productoId);
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
    console.log("usuario.idUsuario", usuario.idUsuario)
    const data = {
      "borrado": 0,
      "id_usuario": usuario.idUsuario
    };

    let url = referencias.actualizaconsulta + "?tabla_destino=productos&id=" + idRecuperar + "";
    setEsperando(true);
    enviar(url, data, function (resp) {
      mensaje = resp.data.mensaje;
      actualizaDatosEliminados(function () {
        setDatosEliminados(tmpEliminados);
        if (tmpEliminados.length === 0) {
          mensaje += ". Se ha recuperado el último registro y la papelera está vacía";
          mostrarAlerta("Alerta", mensaje);
          actualizaDatos(function () {
            tmpEditar = tmpProductos;
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
          <h1 className="header-1">Ver productos</h1><hr />

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
                    <div className="form-group col-sm-6 ">
                      <label className="font-len" htmlFor="id_producto">Ver por tipo de producto:&nbsp;&nbsp;</label>
                      <select id="selectProducto" className="custom-select" defaultValue="" onChange={handleSeleccionarProducto} name="id_producto">
                        <option value="" disabled>Seleccione...</option>
                        {
                          tipoProducto.map((item, i) => (
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
                      <Tabla array={datosFiltrados} contenidos={contenidos} handleEliminarConsulta={handleEliminarProducto} handleEditarConsulta={handleEditarProducto} clase="table table-striped" modo="visor" />
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
              <Modal.Title ><h1>Edición - Productos</h1></Modal.Title>
              <button type="button" className="close" data-dismiss="modal" onClick={onCloseModal}>&times;</button>
            </Modal.Header>
            <Modal.Body>
              <FormVerProduccion datos={itemEditar} handlerEnviarEdicion={handlerEnviarEdicion} productos={productos} poblaciones={poblaciones} handleGetCheck={handleGetCheck} />
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
