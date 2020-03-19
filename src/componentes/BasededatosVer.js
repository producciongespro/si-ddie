import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';

import obtener from '../modulos/obtener';
import InputItem from './InputItem';
import moment from 'moment';
import 'moment/locale/es';

import Tabla from './Tabla';
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

const referencias = referenciasJson[0];
const contenidos = contenidosJson[0];
// console.log("contenidos", contenidos[0].nombre);



var urlIngresos = referencias.consultageneral + "?tabla=ingresos",
    urlEliminadosIngresos = referencias.consultaeliminados + "?tabla=ingresos",
    urlTipoIngresos= referencias.consultageneral+"?tabla=tipo_ingreso",
    ingresos = null,
    // ingresosId = null,
    originalIdTipoIngreso = null,
    tmpEditar = null,
    tmpIngresos = null,
    tipoIngresos = null,
    tmpEliminados = null,
    mensaje = "";



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

  //cerrar modal
  const handleClose = () => {setShow(false); originalIdTipoIngreso = null};

  const handlePapelera = () => setModoVisor(false);

  //controla si las consultas están filtradas o no  
  const [sinFiltro, setSinFiltro] = useState(true);

  const { register, handleSubmit, errors, clearError } = useForm();

  const [mesSel, setMesSel] = useState(null);
  //se requiere?

  //Estado para controlar la carga del json de ingresos:
  // const [ingreso, setIngreso] = useState(null);

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
    // console.log("eliminados", tmpEliminados);
    cb();   
  };


  const onSubmit = (data, e) => {
    console.log("data ORIGINAL", data);
    console.log("data ingreso", data['id_ingreso']);
    console.log("originalIdTipoIngreso", originalIdTipoIngreso);
    
    
      // if (parseInt(originalIdTipoIngreso) !== parseInt(data['id_ingreso']) ) {
      //   console.log("cambio el tipo de ingreso de ",originalIdTipoIngreso," a ", data['id_ingreso']);
        
      //     switch (originalIdTipoIngreso) {
      //         case '3':
      //           delete data["mes"];
      //           delete data["anno"];
      //             break;
      //         case '8':
      //           delete data["modificado_reg_antiguo"];
      //           delete data["modificado_datos_corregidos"];
      //           if( data['id_ingreso'] !== '9')
      //           {
      //             delete data["nota"];
      //             delete data["registro"];
      //           }

      //             // $lista_campos .=   "`modificado_reg_antiguo`=NULL,`registro`=NULL,`modificado_datos_corregidos`=NULL,`nota`=NULL";
      //             break;
      //         case '9':
      //           if( data['id_ingreso'] !== '8')
      //           {
      //             delete data["nota"];
      //             delete data["registro"];
      //           }
      //             break;                    
      //         default:
      //             break;
      //     }        
      // }
      // else {
        originalIdTipoIngreso =  data['id_ingreso'];
      // }
      // console.log("data modificado por cambio de ingreso",data );
      
  // }

    let idIngreso = tmpEditar[0].id;
    let url = referencias.actualizar + "?tabla_destino=ingresos&id=" + idIngreso + "&idingreso=" + originalIdTipoIngreso + "";
    console.log("url desde submit", url);

    setEsperando(true);
    enviar(url, data, function (resp) {
      handleClose();
      mostrarAlerta("Alerta", resp.msj);
      actualizaDatos(function () {
        // console.log("Sinfiltro", sinFiltro);
        if (sinFiltro) {
          
          
          tmpEditar = tmpIngresos;
          
        }
        else {
          tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresoSel);
        }
        originalIdTipoIngreso=null;
        setDatosFiltrados(tmpEditar);
        setEsperando(false);
      });
    });
  };

  
  


  // console.log("url desde submit", url);

//   enviar(url, data, function (msj) {
//     console.log(msj);
//   });
//   setIngresoSel(0);
//   e.target.reset(); // reset after form submit

// };
// console.log("errors", errors);


useEffect(() => {
  moment.locale('es');
  //Carga el primer json:
  obtenerDatos(function () {
    setDatosListos(true);
    // console.log("tmpIngresos", tmpIngresos);    
    setDatosFiltrados(tmpIngresos);
  });
  actualizaDatosEliminados(function(){
    setDatosEliminados(tmpEliminados);
  })
}, []);


const handleSeleccionarIngreso = (e) => {
  //obtenr el valor de seleccion
  // console.log("e.target.value", e.target.value);
  clearError();
  setIngresoSel(parseInt(e.target.value));
  ingresos = filtrar(tmpIngresos, "id_ingreso", ingresoSel);
  setDatosFiltrados(ingresos);
  setSinFiltro(false);
}

const handleMonthSelect = (e) => {
  //obtenr el valor de seleccion
  clearError();
  let mesActual = parseInt(e.target.value);
  setMesSel(mesActual)
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
  if(e.target.checked){
    setTimeout(() => { let element = document.getElementById("selectIngreso");
    element.value="";
    setSinFiltro(true);
    // console.log("tmpIngresos", tmpIngresos);
    setDatosFiltrados(tmpIngresos);
  }, 500);
  }
}


const handleEditarIngreso = (e) => {
  let id = parseInt(e.target.id);
  
  tmpEditar = filtrar(tmpIngresos, "id", id);
  setIngresoSel(parseInt(tmpEditar[0].id_ingreso));
  originalIdTipoIngreso = tmpEditar[0].id_ingreso;
  setEsperando(true);
  setShow(true);
}

const handleEliminarIngreso = (e) => {
  const idIngreso = e.target.id;
  alertify.confirm('Eliminar', '¿Desea realmente eliminar este registro?',
    function () {    
      var data = {};
      let url = referencias.actualizaconsulta + "?tabla_destino=ingresos&id="+idIngreso + "";
      // console.log("url desde submit", url);
      
      data.borrado = 1;   
      // console.log("DATA",data);
      setEsperando(true);
      enviar(url, data, function (resp) {
              mostrarAlerta("Alerta", resp.msj);
              // console.log("Sinfiltro", sinFiltro);
              actualizaDatos(function () {
                if(sinFiltro){
                  tmpEditar=tmpIngresos;
                }
                else {
                  
                  tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresoSel);
                }
                //actualizando el registro de eliminados
                actualizaDatosEliminados(function(){
                  setDatosEliminados(tmpEliminados);})
                // console.log("LARGO", tmpEditar.lenght);        
                setDatosFiltrados(tmpEditar);
                setEsperando(false);
          })
      });
  }, function(){ });
}

const handleRecuperarRegistro = (e) => {
  // console.log("e.target de registro a recuperar", e.target.id);
  
  // console.log("Ha recuperar");

  let idRecuperar = e.target.id;
  const data = {    
          "borrado" : 0
        }

  let url = referencias.actualizaconsulta + "?tabla_destino=ingresos&id="+idRecuperar + "";
  setEsperando(true);
  enviar(url, data, function (resp) {
    mensaje =  resp.data.mensaje 
 
    actualizaDatosEliminados(function(){
      setDatosEliminados(tmpEliminados);
      if(tmpEliminados.length === 0){
        mensaje += ". Se ha recuperado el último registro y la papelera está vacía";
        mostrarAlerta("Alerta",  mensaje);
        mensaje = "";
        // setDatosEliminados(tmpEliminados);
        setEsperando(false);  
        setModoVisor(true); 
      }
      else {
        mensaje += ". Se ha recuperado el registro"
        mostrarAlerta("Alerta", mensaje);
        setEsperando(false);  
      }
    });
  });
    
  // }
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
                    {/* <button onClick={handleModoVisor}>Regresar</button> */}
                  </>
                )
            )
            :
            (
            <>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="header-1">Base de datos</h1> */}
            <div className="row">
              <div className="form-group col-sm-6 ">
                <label className="font-len" htmlFor="id_ingreso">Ver por tipo de ingreso:&nbsp;&nbsp;</label>
                <select id="selectIngreso" className="custom-select" defaultValue="" onChange={handleSeleccionarIngreso} name="id_ingreso">
                  {/* {errors.id_ingreso && <p className="errors">Este campo es requerido</p>} */}
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
            backdrop = "static"
          // aria-labelledby="contained-modal-title-vcenter"
          // centered

          >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton className="modal-header-edicion">
              <Modal.Title ><h1>Edición - Ingresos</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <>
                    {(tmpEditar && tmpEditar[0]) &&
                      <React.Fragment>
                        <div className="row">
                        <div className="form-group col-sm-6 ">
                        <label className="font-len" htmlFor="id_ingreso">Nuevo ingreso:&nbsp;&nbsp;</label>
                      <select className="custom-select"  defaultValue= {tmpEditar[0].id_ingreso} onChange={handleSeleccionarIngreso} name="id_ingreso" ref={register({required: true})}>
                      {errors.id_ingreso && <p className="errors">Este campo es requerido</p>}
                      <option value="" disabled>Seleccione...</option>
                        {
                            tipoIngresos.map((item,i)=>(
                            <option key={"ingreso"+i} value={item.id}>{item.tipo}</option>
                            ))
                        }
                      </select>
                    </div>
                    <div className="form-group col-sm-6 my-2">
                      <InputItem  elementClass= "col-sm-6 my-2 form-group" defaultValor= {tmpEditar[0].descriptor} placeholderText="Número de descriptor" tipo="text" nombre= "descriptor" textlabel="Descriptor"  referencia={register({required: true})}/>
                      {errors.descriptor && <p className="errors">Este campo es requerido</p>}
                    </div>
                  </div>
                  { ingresoSel === 3 &&
                    <div className="row">
                      <div className="col-sm-6">
                      <label className="font-len" htmlFor="mes">Mes:</label>
                        <select className="custom-select"   defaultValue= {tmpEditar[0].mes} onChange={handleMonthSelect} name="mes" id="mes" ref={register({required: true})}>
                        {errors.mes && <p className="errors">Este campo es requerido</p>}
                          <option value="" disabled>Seleccione...</option>
                            {
                              moment.months().map((label, i) => (
                              <option key={"mes"+label} value={i+1}>{label}</option>
                             ))}
                        </select>
                      </div>
                    <div className="col-sm-6">
                        <InputItem tipo="number" nombre= "anno"  defaultValor= {tmpEditar[0].anno} placeholderText="Escriba el año" textlabel="Año:"  referencia={register({required: true})} />
                        {errors.anno && <p className="errors">Este campo es requerido</p>}
                      </div>
                    </div>
                  }
                  { ingresoSel === 8 &&
                  <React.Fragment>
                    <div className="row">
                      <div className="form-group col-sm-6 my-2">
                        <InputItem  placeholderText="Número...." defaultValor= {tmpEditar[0].modificado_reg_antiguo} tipo="text" nombre= "modificado_reg_antiguo" textlabel="Número registro antiguo"  referencia={register({required: true})}/>
                        {errors.modificado_reg_antiguo && <p className="errors">Este campo es requerido</p>}
                      </div>
                      <div className="form-group col-sm-6 my-2">
                        <InputItem placeholderText="Número..." defaultValor= {tmpEditar[0].registro}  tipo="text" nombre= "registro" textlabel="Número de registro"  referencia={register({required: true})}/>
                        {errors.registro && <p className="errors">Este campo es requerido</p>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6 my-2">
                        <p><label className="font-len" htmlFor="modificado_datos_corregidos">Ingrese los datos corregidos:</label> </p>
                        <textarea  className="form-control" defaultValue={tmpEditar[0].modificado_datos_corregidos} name="modificado_datos_corregidos"  id="modificado_datos_corregidos" ref={register({required: true})} />
                        {errors.modificado_datos_corregidos && <p className="errors">Este campo es requerido</p>}
                      </div>
                      <div className="form-group col-sm-6 my-2">
                      <p><label className="font-len" htmlFor="nota">Ingrese las notas:</label></p>
                        <textarea className="form-control" defaultValue={tmpEditar[0].nota} name="nota" ref={register({required: true})} />
                        {errors.nota && <p className="errors">Este campo es requerido</p>}
                      </div>
                    </div>
                  </React.Fragment>
                  }
                  {ingresoSel === 9 &&
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <InputItem placeholderText="número...." defaultValor= {tmpEditar[0].registro} tipo="text" nombre= "registro" textlabel="Número de registro"  referencia={register({required: true})}/>
                        {errors.registro && <p className="errors">Este campo es requerido</p>}
                      </div>
                      <div className="form-group col-sm-6">
                        <label className="font-len" htmlFor="nota">Ingrese las notas:</label> 
                        <textarea className="form-control"  defaultValue={tmpEditar[0].nota}  placeholderText="Ingrese las notas" name="nota" ref={register({required: true})} />
                        {errors.nota && <p className="errors">Este campo es requerido</p>}
                      </div>
                    </div>
                  }   
                <div className="row">
                  <div className="form-group col-sm-6 my-2">
                    <InputItem tipo="number" defaultValor= {tmpEditar[0].portada} nombre= "portada" textlabel="Portada:"  placeholderText="No. portada" referencia={register({required: true})} />
                    {errors.portada && <p className="errors">Este campo es requerido</p>}
                  </div>
                  <div className="form-group col-sm-6 my-2">
                    <InputItem tipo="number" defaultValor= {tmpEditar[0].texto_completo} nombre= "texto_completo" textlabel="Texto completo:"  placeholderText="No. del texto" referencia={register({required: true})} />
                    {errors.texto_completo && <p className="errors">Este campo es requerido</p>}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-6 my-2">
                    <InputItem tipo="number" defaultValor= {tmpEditar[0].enlace} nombre= "enlace" textlabel="Enlace:"  placeholderText="No. enlace" referencia={register({required: true})} />
                    {errors.enlace && <p className="errors">Este campo es requerido</p>}
                  </div>
                  <div className="form-group col-sm-6 my-2">
                    <InputItem tipo="date" defaultValor= {tmpEditar[0].fecha} nombre= "fecha" textlabel="Fecha:"  referencia={register({required: true})} />
                    {/* <InputItem tipo="date" defaultValor= {moment.utc(tmpEditar[0].fecha).format('L')} nombre= "fecha" textlabel="Fecha:"  referencia={register({required: true})} /> */}
                    {errors.fecha && <p className="errors">Este campo es requerido</p>}
                  </div>
                </div>
                <div className="form-group d-none">
                  <input type="text" className="form-control" name="id_usuario" id="id_usuario" defaultValue={usuario.idUsuario} ref={register} />
                </div>
              </React.Fragment>
              }
                </>
              }
            </Modal.Body>
            <Modal.Footer className="modal-footer-edicion">
              <input className="btn btn-main text-center" type="submit" value="Guardar" onClick={handleClose}></input>
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
