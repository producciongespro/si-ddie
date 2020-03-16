import React, { useState, useEffect } from 'react';
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



const referencias = referenciasJson[0];

var urlIngresos = referencias.consultageneral + "?tabla=ingresos",
    urlEliminadosIngresos = referencias.consultaeliminados + "?tabla=ingresos",
    urlIngreso= referencias.consultageneral+"?tabla=tipo_ingreso",
    ingresos = null,
    ingresosId = null,
    tmpEditar = null,
    tmpIngresos = null,
    tipoIngresos = null,
    tmpEliminados = null,
    mensaje = "";

// intervenciones = null

// var idUser = sessionStorage.getItem("id_usuario");
// , {months: 'Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre'});
// moment.locale('es');


export default function BasededatosVer() {

  const [datosFiltrados, setDatosFiltrados] = useState(null);

  const [datosEliminados, setDatosEliminados] = useState(null);

  //Bandera que indica que la solicitud y retorno de datos están resueltos
  const [datosListos, setDatosListos] = useState(false);

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
  const [sinFiltro, setSinFiltro] = useState(true);

  const { register, handleSubmit, errors, clearError } = useForm();

  const [mesSel, setMesSel] = useState(null);
  //se requiere?


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
    let response2 = await fetch(urlIngreso);
    tipoIngresos = await response2.json();

    // 6 Eliminados
    let response6 = await fetch(urlEliminadosIngresos);
    tmpEliminados = await response6.json();
    console.log("eliminados", tmpEliminados);
    cb();   
  };


  const onSubmit = (data, e) => {
    let idIngreso = tmpEditar[0].id;

    console.log("id ingreso", idIngreso);

    let url = referencias.actualizaconsulta + "?tabla_destino=ingresos&id=" + idIngreso + "";
    console.log("url desde submit", url);

    setEsperando(true);
    enviar(url, data, function (resp) {
      handleClose();
      mostrarAlerta("Alerta", resp.msj);
      actualizaDatos(function () {
        if (ingresosId) {
          tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresosId);
        }
        else {
          tmpEditar = tmpIngresos;
        }
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
  obtenerDatos(function (data) {
    console.log("datos", data);
    setDatosListos(true);
    //Activa cargado para que meuistre el formulario:
    setDatosFiltrados(tmpIngresos);
  });
  actualizaDatosEliminados(function(){
    setDatosEliminados(tmpEliminados);
  })
}, []);


const handleSeleccionarIngreso = (e) => {

  //obtenr el valor de seleccion
  clearError();
  console.log(parseInt(e.target.value));
  ingresosId = parseInt(e.target.value);
  // console.log("e.target.value", e.target.value);
  ingresos = filtrar(tmpIngresos, "id_intervencion", ingresosId);
  setDatosFiltrados(ingresos);
  setSinFiltro(false);

  // setIngresoSel(parseInt(e.target.value));
}

const handleMonthSelect = (e) => {
  //obtenr el valor de seleccion
  clearError();
  let mesActual = parseInt(e.target.value);
  setMesSel(mesActual);
  // console.log("mesSel", mesSel);
  // console.log("mes", mesSel);

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
    setDatosFiltrados(tmpIngresos);
  }, 500);
  }
}


const handleEditarIngreso = (e) => {
  let id = parseInt(e.target.id);
  tmpEditar = filtrar(tmpIngresos, "id", id);
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
              actualizaDatos(function () {
                if(ingresosId){
                  tmpEditar = filtrar(tmpIngresos, "id_ingreso", ingresosId);
                }
                else {
                  tmpEditar=tmpIngresos;
                }
                //actualizando el registro de eliminados
                actualizaDatosEliminados(function(){
                  setDatosEliminados(tmpEliminados);})
                console.log("LARGO", tmpEditar.lenght);        
                setDatosFiltrados(tmpEditar);
                setEsperando(false);
          })
      });
  }, function(){ });
}

const handleRecuperarRegistro = (e) => {
  console.log("e.target de registro a recuperar", e.target.id);
  
  console.log("Ha recuperar");

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
                    <Tabla array={datosEliminados} clase="table table-striped sombreado" modo="papelera" />
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
                    <Tabla array={datosEliminados} clase="table table-striped sombreado" modo="papelera" handleRecuperar={handleRecuperarRegistro} />
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
                  <Tabla array={datosFiltrados} clase="table table-striped sombreado" modo="visor" />
                </>
              )
              :
              (
                <Tabla array={datosFiltrados} handleEliminarConsulta={handleEliminarIngreso} handleEditarConsulta={handleEditarIngreso} clase="table table-striped" modo="visor" />
              )
            }
          </>
            )
        }

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
