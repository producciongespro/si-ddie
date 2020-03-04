import React, {useState, useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';

import Tabla from './Tabla';

import MyContext from '../modulos/MyContext';

// import enviar from '../modulos/enviar';
import obtener from '../modulos/obtener';
import filtrar from '../modulos/filtrar';
// import axios from 'axios';
// import mostrarAlerta from './Alerta.js'
import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

var intervenciones = null;

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



  useEffect(() => {
    //Acción que se ejecuta una vez que se monta el componente
    // console.log("Componente montado");

    // carga de los JSON de los selects
    let urlConsultas = referencias.consultageneral+"?tabla=consultas",
        urlIntervencion = referencias.consultageneral+"?tabla=tipo_intervencion",
        urlSolicitante = referencias.consultageneral+"?tabla=tipo_solicitante",
        urlSolicitud= referencias.consultageneral+"?tabla=tipo_solicitud",    
        urlRespuesta = referencias.consultageneral+"?tabla=tipo_respuesta";


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
                obtener(urlConsultas, function (data) {  
                  console.log("data consultas", data);
                  
                  console.log("url consultas",urlConsultas);
                  
                  //Callback del segundo obtener
                    setConsultas(data);
                    setCargado(true)
                  });        
            });
          });
        })
      })
  }, []);

  const handlerSeleccionarIntervencion = (e) => {


    
    var idIntervencion = parseInt(e.target.value);
    
    // intervenciones = filtrar(tipoIntervencion, "id", idIntervencion)[0].asignaturas;
    intervenciones = filtrar(consultas, "id_intervencion", idIntervencion);
    console.log("intervenciones",intervenciones);        
    //Filtra array por nivel y lo carga en el estado datosFiltrados:
    // datosPorNivel = filtrar(datosJson, "id_nivel", idNivel);

    setDatosFiltrados(intervenciones);

    let arrConsulta = intervenciones;
    // console.log("arrConsulta", arrConsulta[]);
    
    // for (const prop in arrConsulta) {
    //   console.log(`arrConsulta[0].${prop} = ${arrConsulta[0][prop]}`);
    // }
    for (let index = 0; index < arrConsulta.length; index++) {
      const element = arrConsulta[index].id_intervencion;
      // console.log("idintervencion",index,":", element);
      // console.log(tipo_intervencion);
      const array = tipo_intervencion;
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   var x = element.indexOf(element);     
      //   console.log("X", x);
        
      }
      let idFiltrado =  arrConsulta[0].id_intervencion
      console.log("tipo_intervnecion", tipo_intervencion);
      
      console.log("lo encontró en: ",tipo_intervencion.map(item => item.id).indexOf(idFiltrado));
      var posElement = tipo_intervencion.map(item => item.id).indexOf(idFiltrado);
      if(posElement === -1){
        console.log("Elemento no existe");        
      }
      else{
      console.log("id: ",tipo_intervencion[posElement].id," nombre: ", tipo_intervencion[posElement].tipo);
      }
      
      // array.indexOf(2);   
      // var idx = array.indexOf(element);
    // }
}

const handleEditarConsulta = (e) => {
  const id = e.target.id;
  // let arrConsulta = consultas;
  // for (const prop in arrConsulta) {
  //   console.log(`arrConsulta.${prop} = ${arrConsulta[prop]}`);
  // }
  //console.log("idItem", id);
  // const tmpConsulta = filtrar(datosPorNivel, "id", id);
  // //console.log("tmpRecursos", tmpRecurso[0]);
  // setDetalleRecurso(tmpConsulta[0]);

  // setShow(true);
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
              <div className="form-group col-sm-12 ">
                <label className="font-len" htmlFor="id_intervencion">Tipo de intervención:&nbsp;&nbsp;</label>
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
                        <Tabla array={datosFiltrados} handleEliminarRecurso={handleEliminarConsulta} handleShow={handleEditarConsulta} clase="table table-striped"  modo="visor"/>
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

// consultasgenerales script INNER JOIN
// if ($tabla === 'consultas'){
//   $sql="SELECT consultas.id_intervencion, tipo_intervencion.tipo AS tipo_intervencion  FROM consultas INNER JOIN tipo_intervencion ON tipo_intervencion.id= consultas.id_intervencion";
// }
// else {
//   $sql="SELECT * FROM $tabla";     
// }