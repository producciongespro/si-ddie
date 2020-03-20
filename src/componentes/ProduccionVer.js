import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';

import Tabla from './Tabla';

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


import obtener from '../modulos/obtener';

import obtenerValoresCheck from '../modulos/obtenerValoresCheck';
import CheckBox from './CheckBox';
import InputItem from './InputItem';

import moment from 'moment';
import 'moment/locale/es';

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
    mensaje = "";

// carga de los JSON de los selects
var urlProductos = referencias.consultageneral + "?tabla=productos",
    urlEliminadosConsultas = referencias.consultaeliminados + "?tabla=productos",
    urlTipoProductos = referencias.consultageneral + "?tabla=tipo_productos",
    urlPoblacion = referencias.consultageneral+"?tabla=productos_poblacion_meta";
    


// console.log("usuario datos posteriores", usuario)   
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

    const handlePapelera = () => setModoVisor(false);

    //controla si las consultas están filtradas o no  
    const[sinFiltro, setSinFiltro] = useState(true); 

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


    const onSubmit = (data, e) => {
      let idProducto = tmpEditar[0].id;

      let arrayPoblacion = obtenerValoresCheck("beneficiario");

      delete data["beneficiario"]; //borrar el check
      data.poblacion = arrayPoblacion
      
            
      let url = referencias.guardaconsulta+"?tabla_destino=productos";
      // console.log("url desde submit", url);
      
      setEsperando(true);
      enviar(url, data, function (resp) {
        handleClose();
        mostrarAlerta("Alerta", resp.msj);
        if(!resp.data.error) {
          setShow(false);
        }
        actualizaDatos(function () {
          if(sinFiltro){
            tmpEditar=tmpProductos;
          }
          else {
            tmpEditar = filtrar(tmpProductos, "id_producto", productoId);
          }        
          setDatosFiltrados(tmpEditar);
          setEsperando(false);
      });
      });
      // setProducto(0);
      // e.target.reset(); // reset after form submit
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
      // console.log("Componente montado");
      obtenerDatos(function () {
        //se usan donde?
        setProductos(tipoProducto);
        setPoblaciones(tipoPoblacion);
        // -----------

        setDatosListos(true);
        setDatosFiltrados(tmpProductos);     
    });
    actualizaDatosEliminados(function () {
      setDatosEliminados(tmpEliminados)
    });
  }, []);

  
    const handleSeleccionarProducto =(e)=>{
        //obtiene el valor de selección
        
        clearError();
        // setProducto(parseInt(e.target.value));

        productoId = parseInt(e.target.value);
        productosFiltrados = filtrar(tmpProductos, "id_producto", productoId);
        setDatosFiltrados(productosFiltrados);
        setSinFiltro(false);

    }
 
    const handleCambiarProducto = (e) => {
      clearError();
      console.log("PRODUCTO",e.target.value);  
      setProductoSel(parseInt(e.target.value));
    }

    const handleMonthSelect =(e)=>{
      //obtiene el valor de seleccion
      clearError();
      setMesSel(parseInt(e.target.value));
    }

    function handleDefaultMes ( ) {
      // console.log("tmpEditar[0].mes ", tmpEditar[0].mes );
      
      let mesActual;
      if(tmpEditar[0].mes){
        mesActual = tmpEditar[0].mes
      }
      else {
        mesActual = ""
      }
      return mesActual;
    }
    
    const handleChangeCheck =(e)=>{
      (e.target.checked)?setOtraPoblacion(true):setOtraPoblacion(false);
    }

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
      if(e.target.checked){
        setTimeout(() => { let element = document.getElementById("selectProducto");
        element.value="";
        setSinFiltro(true);
        setDatosFiltrados(tmpProductos);
      }, 500);
      }
    }

    const handleEditarProducto = (e) => {
      let id = parseInt(e.target.id);
      
      tmpEditar = filtrar(tmpProductos, "id", id);
      setProductoSel(parseInt(tmpEditar[0].id_producto));
      originalIdTipoProducto = tmpEditar[0].id_producto;
      setEsperando(true);
      setShow(true);
    }
    
    const handleEliminarProducto = (e) => {
      const idProducto = e.target.id;
      alertify.confirm('Eliminar', '¿Desea realmente eliminar este registro?',
        function () {    
          var data = {};
          let url = referencias.actualizaconsulta + "?tabla_destino=productos&id="+idProducto + "";
          console.log("url desde submit", url);
          
          data.borrado = 1;   
          
          setEsperando(true);
          enviar(url, data, function (resp) {                
                  alertify.success(resp.data.mensaje,2);
                  actualizaDatos(function () {
                    if(sinFiltro){
                      tmpEditar=tmpProductos;
                    }
                    else {
                      
                      tmpEditar = filtrar(tmpProductos, "id_ingreso", productoId);
                    }
                    actualizaDatosEliminados(function(){setDatosEliminados(tmpEliminados);})
                    setDatosFiltrados(tmpEditar);
                    setEsperando(false);
              })
          });
      }, function(){ });
    }
    
    const handleRecuperarRegistro = (e) => {
      let idRecuperar = e.target.id;
      const data = {    
              "borrado" : 0
            }
    
      let url = referencias.actualizaconsulta + "?tabla_destino=productos&id="+idRecuperar + "";
      setEsperando(true);
      enviar(url, data, function (resp) {
        mensaje =  resp.data.mensaje;  
        actualizaDatosEliminados(function(){
          setDatosEliminados(tmpEliminados);
          if(tmpEliminados.length === 0){
            mensaje += ". Se ha recuperado el último registro y la papelera está vacía";
            mostrarAlerta("Alerta",  mensaje);
            actualizaDatos(function () {
              tmpEditar=tmpProductos;
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
                  <label className="font-len" htmlFor="id_ingreso">Ver por tipo de producto:&nbsp;&nbsp;</label>
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
            backdrop = "static"
       >
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton className="modal-header-edicion">
              <Modal.Title ><h1>Edición - Productos</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <>
                    {(tmpEditar && tmpEditar[0]) &&
                      <React.Fragment>
                        <div className="row">
                          <div className="form-group col-sm-6 ">
                            <label className="font-len" htmlFor="id_producto">Seleccione el tipo de producto:&nbsp;&nbsp;</label>
                            <select className="custom-select"  defaultValue={tmpEditar[0].id_ingreso} onChange={handleCambiarProducto} ref={register({required: true})}>
                            {errors.id_producto && <p className="errors">Este campo es requerido</p>}
                            <option value="" disabled>Seleccione...</option>
                              {
                                  
                                  tipoProducto.map((item,i)=>(
                                  <option key={"producto"+i} value={item.id}>{item.tipo}</option>
                                  ))
                              }
                            </select>
                          </div>

                          {(producto > 1 && producto < 7 )&&
                              <div className="form-group col-sm-6 my-2">
                                <InputItem placeholderText="Digite el número consecutivo" defaultValor= {tmpEditar[0].numero_consecutivo} tipo="number" nombre= "numero_consecutivo" textlabel="Número consecutivo"  referencia={register({required: true})}/>
                                {errors.numero_consecutivo && <p className="errors">Este campo es requerido</p>}
                              </div>
                              }
                            {producto === 7 &&
                              <div className="form-group col-sm-6 my-2">
                                  <InputItem tipo="text" defaultValor= {tmpEditar[0].tema_video_divulgacion} placeholderText="Escriba el tema del video" nombre= "tema_video_divulgacion" textlabel="Tema del video"  referencia={register({required: true})} />
                                  {errors.tema_video_divulgacion && <p className="errors">Este campo es requerido</p>}
                              </div>
                            }   
                        </div>   

                        {producto === 8 && 
                          <div className="row">
                            <div className="form-group col-sm-12 my-2">
                              <InputItem  tipo="text" defaultValor= {tmpEditar[0].desc_otro} placeholderText="Describa el tipo de producto" nombre= "desc_otro" textlabel="Descripción"  referencia={register({required: true})} />
                              {errors.desc_otro && <p className="errors">Este campo es requerido</p>}
                            </div>
                          </div> 
                        }
                        {producto > 1 && 
                          <div className="row">
                            <div className="form-group col-sm-12 my-2">
                              <p className="font-len" >Población beneficiaria</p>
                              <CheckBox array={poblaciones} nombre="beneficiario" register={register} handleChange={handleChangeCheck} />
                            </div>
                          </div> }
            
                          {otraPoblacion && 
                            <React.Fragment>
                              <InputItem tipo="text" nombre= "poblacion_otro" defaultValor= {tmpEditar[0].poblacion_otro} placeholderText="Escriba el otro tipo de población" textlabel="Descripción"  referencia={register({required: true})} />
                              {errors.poblacion_otro && <p className="errors">Este campo es requerido</p>}
                            </React.Fragment>
                          }

                          {producto === 1 && (
                            <React.Fragment>
                              <div className="row">
                                <div className="form-group col-sm-6 my-2">
                                  <InputItem tipo="number" nombre= "volumen_revista" defaultValor= {tmpEditar[0].volumen_revista} placeholderText="No. volumen" textlabel="Volumen"  referencia={register({required: true})} />
                                  {errors.volumen_revista && <p className="errors">Este campo es requerido</p>}
                                </div>
                                <div className="form-group col-sm-6 my-2">
                                  <InputItem  tipo="number" nombre= "numero_revista"  defaultValor= {tmpEditar[0].numero_revista} placeholderText="No. revista" textlabel="Número"   referencia={register({required: true})} />
                                  {errors.numero_revista && <p className="errors">Este campo es requerido</p>}
                                </div>
                              </div>
                              <div className="row">
                                <div className="form-group col-sm-6 my-2">
                                <label className="font-len" htmlFor="mes_revista">Mes:</label>
                                    <select className="custom-select"  defaultValue= {handleDefaultMes()} onChange={handleMonthSelect} name="mes_revista" id="mes_revista" ref={register({required: true})}>
                                    {errors.mes_revista && <p className="errors">Este campo es requerido</p>}
                                      <option value="" disabled>Seleccione...</option>
                                        {
                                          moment.months().map((label, i) => (
                                          <option key={"mes"+label} value={i+1}>{label}</option>
                                          ))}
                                    </select>
                                </div>
                                <div className="form-group col-sm-6 my-2">
                                  <InputItem tipo="number" nombre= "anno_revista" defaultValor= {tmpEditar[0].anno_revista} textlabel="Año" placeholderText="Digite el año" referencia={register({required: true})}  />
                                  {errors.anno_revista && <p className="errors">Este campo es requerido</p>}
                                </div>
                              </div>
                            </React.Fragment>
                            )
                          }
                          <div className="row">
                            <div className="form-group col-sm-6">
                              <label className="font-len" htmlFor="cantidad">Cantidad:</label>
                              <input className="form-control" type="number" defaultValue={tmpEditar[0].cantidad} placeholder="Digite la cantidad" id="cantidad" name="cantidad" ref={register({required: true})} />
                              {errors.cantidad && <p className="errors">Este campo es requerido</p>}
                          </div>

                          <div className="form-group col-sm-6">
                            <label className="font-len" htmlFor="fecha">Fecha:</label>
                            <input  type="date" className="form-control" defaultValue={tmpEditar[0].fecha} id="fecha" name="fecha" placeholder="Digite la fecha" ref={register({required: true})} />
                            {errors.fecha && <p className="errors">Este campo es requerido</p>}
                          </div>
                          
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="form-group col-sm-6">
                            <label className="font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:</label>
                            <input type="number" className="form-control" defaultValue={tmpEditar[0].cantidad_beneficiarios}  id="cantidad_beneficiarios" name="cantidad_beneficiarios" placeholder="Digite la cantidad de beneficiarios" ref={register({required: true})} />
                            {errors.cantidad_beneficiarios && <p className="errors">Este campo es requerido</p>}
                          </div>
                          <hr/>
                        </div>

                        <div className={"form-group d-none"}>
                            <input type="text" className="form-control"  defaultValue={usuario.idUsuario}  name="id_usuario" id="id_usuario" ref={register}/>    
                        </div>
                        </React.Fragment>
                        }
                          </>
                        }
                      </Modal.Body>
                      <Modal.Footer className="modal-footer-edicion">
                        <input className="btn btn-main text-center" type="submit" value="Guardar"></input>
                      </Modal.Footer>

                    </form>
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
