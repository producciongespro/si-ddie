import React, {useState, useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import Consultas1 from './Consultas1';

import Tabla from './Tabla';

import MyContext from '../modulos/MyContext';
import Modalc from './Modalc';

// import enviar from '../modulos/enviar';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
// import axios from 'axios';
// import mostrarAlerta from './Alerta.js'
import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

var tmpConsultas= [],
    tmpEditar =[];
var intervenciones = null;

  // carga de los JSON de los selects
  var urlConsultas = referencias.consultageneral+"?tabla=consultas",
  urlIntervencion = referencias.consultageneral+"?tabla=tipo_intervencion",
  urlSolicitante = referencias.consultageneral+"?tabla=tipo_solicitante",
  urlSolicitud= referencias.consultageneral+"?tabla=tipo_solicitud",    
  urlRespuesta = referencias.consultageneral+"?tabla=tipo_respuesta";

export default function ConsultasVer() {

  const [datosFiltrados, setDatosFiltrados] = useState(null);

  // const { register, handleSubmit, errors, clearError } = useForm();
  
  const { usuario, setUsuario } = useContext(MyContext);

  //Cargado se cambia a True cuando se termina la carga de json del servidor
  const [cargado, setCargado] = useState(false);

  //Estado para controlar la carga del json respectivo
  const [tipo_intervencion, setTipoIntervencion] = useState(null);

  //  Estado que maneja  información de consultas
  const [consultas, setConsultas] = useState(null);

  //Bandera que se utiliza para tiempo en espera de recuperar un json cuando se ha borrado un registro
  const [esperando, setEsperando] = useState(false);

  //Estado que maneja  la seleccion del usuario
  // const [intervencion, setIntervencion] = useState(null);

  //Estado para ocultar o mostrar un modal
  const [show, setShow] = useState(false);
  //cerrar modal
  const handleClose = () => setShow(false);

  //Estado para controlar la carga del json respectivo
  const [id_solicitud, setIdSolicitud] = useState(null);

  // //Estado que maneja  la seleccion del usuario
  // const [solicitud, setSolicitud] = useState(null);

  //Estado para controlar la carga del json respectivo
  const [tipo_solicitante, setTipoSolicitante] = useState(null);
  //Estado que maneja  la seleccion del usuario
  // const [solicitante, setSolicitante] = useState(null);

  //Estado para controlar la carga del json respectivo
  const [tipo_respuesta, setTipoRespuesta] = useState(null);      
  // //Estado que maneja  la seleccion del usuario
  // const [respuesta, setRespuesta] = useState(null);      

  // registro de consulta a editar
  const [consultaEditar,setConsultaEditar] = useState(null);

  //Estado para ocultar o mostrar un modal
  // const [show, setShow] = useState(false);

  async function obtenerDatos() {
    // 1 Consultas       
    let response1 = await fetch(urlConsultas);        
    // console.log("response1",response1);    
    tmpConsultas = await response1.json()
    setConsultas(tmpConsultas);  
    console.log("temporal consultas", tmpConsultas);
    
    setDatosFiltrados(tmpConsultas);    
    

    // 2 Intervención
    let response2 = await fetch(urlIntervencion);    
    // datosJson1 = await response1.json();
    // setConsultas(datosJson1);
    setTipoIntervencion(await response2.json());

    //3 Solicitante
    let response3 = await fetch(urlSolicitante);    
    // datosJson1 = await response1.json();
    // setConsultas(datosJson1);
    setTipoSolicitante(await response3.json());

    // 4 Solicitud
    let response4 = await fetch(urlSolicitud);    
    // datosJson1 = await response1.json();
    // setConsultas(datosJson1);
    setIdSolicitud(await response4.json());

    // 4 Respuesta
    let response5 = await fetch(urlRespuesta);    
    // datosJson1 = await response1.json();
    // setConsultas(datosJson1);
    setTipoRespuesta(await response5.json());
    // console.log("CONSULTAS",consultas);
    
    //  setDatosFiltrados(consultas);    
    setCargado(true);    
  };
  

    // useEffect(() => {
    //   // console.log("comp montado");      
    //   obtenerDatos();
    // },[])

    useEffect(() => {
      console.log("comp montado");      
      obtenerDatos();
      // obtenerDatos(function(){
      //   // setDatosFiltrados(consultas);
      //   // console.log("datos fitlrado desde effect", datosFiltrados);
      //           // setCargado(true);    
      // });
    },[])
  
  const handlerSeleccionarIntervencion = (e) => {

    var idIntervencion = parseInt(e.target.value);
    
    intervenciones = filtrar(consultas, "id_intervencion", idIntervencion);
    // console.log("intervenciones FILTRADO",intervenciones);        

    setDatosFiltrados(intervenciones);
}


const handleEditarConsulta = (e) => {
  const id = parseInt(e.target.id);
  // alert("Editar")
  console.log("itemid EDICION", id);
  tmpEditar = filtrar(tmpConsultas, "id", id);
  setConsultaEditar(tmpEditar[0]);
  console.log("CONSULTA A EDITAR", tmpEditar);
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
      cargado ?                    
      (
        <div className="col-12">
          <h1 className="header-1">Ver consultas</h1><hr/>
            <div className="row">
              <div className="col-sm-8 input-group mb-3 input-group-sm">
                <div className="input-group-prepend">
                  <span className="font-len input-group-text">Tipo de Intervención</span>
                </div>
                <select className="custom-select"  key="iditervencion" defaultValue="" onChange={handlerSeleccionarIntervencion} name="id_intervencion">
                {/* {errors.id_intervencion && <p className="errors">Este campo es requerido</p>} */}
                <option value="" disabled>Seleccione...</option>
                  {
                      
                      tipo_intervencion.map((item,i)=>(
                      <option key={"intervencion"+i} value={item.id}>{item.tipo}</option>
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
                        <Tabla array={datosFiltrados} handleEliminarRecurso={handleEliminarConsulta} handleEditarConsulta={handleEditarConsulta} clase="table table-striped"  modo="visor"/>
                    )
            }
               { <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edición</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                          <Consultas1 valoresIniciales ={tmpEditar} />
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            <i className="far fa-save"></i>
                        </Button>
                    </Modal.Footer>
                      </Modal> }


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
