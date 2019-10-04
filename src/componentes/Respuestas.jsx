import React, { Component } from 'react';

import Llenaselects from './Llenaselects';

import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];

var consulta = {
    "id" : "",
    "solicitud" :  "",
    "solicitante" : "",
    "id_intervencion": 0,
    "tema": "",
    "respuesta": "",
    "fecha_respuesta": "",
    "fecha_solicitud": "",
    "usuario": "1",
    "tipo_intervencion": "",
    "tipo_solicitante": "",
    "tipo_solicitud": ""
},
  registro={
    "id" : "",
    "solicitud" :  "",
    "solicitante" : "",
    "id_intervencion": 0,
    "tema": "",
    "respuesta": "",
    "fecha_respuesta": "",
    "fecha_solicitud": "",
    "usuario": "1"
  };



//1 - Definicion de la clase
class Respuestas extends Component {

  //2 - Constructor
  constructor(props) {
    super(props);
    this.state = { 
      consultas : [],
      tipo_solicitud : [],
      tipo_solicitante : [],
      tipo_intervencion : [],
      tipo_respuesta: [],
      registroactual : {}
     }
  }

  // 3 -Definicion de las propiedades

  // registro = {
  //   hghg : "gfgf"
  // }


  // Creacion de los metodos

  // imprimirRegistro = () => {
  //   console.log(this.registro);
    
  // }

  componentDidMount() {
    //Obtener datos  
    this.obtenerJson("consultas");
    // this.obtenerJson("tipo_solicitud");
    // this.obtenerJson("tipo_solicitante");
    // this.obtenerJson("tipo_intervencion");
    this.obtenerJson("tipo_respuesta");
  }


  obtenerJson = (tabla) => {
  console.log("tabla", tabla);
  
    var url="";
    if (tabla ==="consultas") {
      url= referencias.consultaespecifica+"?tabla=" + tabla+"&id_u="+consulta.usuario;
    } else {
      url= referencias.consultageneral+"?tabla=" + tabla;
    }
    // console.log("URL",url);
    axios.get(url)
      .then(res => {     
        this.setState({ [tabla] : res.data  }); 
        console.log("tabla", tabla,"---res.data", res.data);
        
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });
  }

  enviarDatosForm = (     ) => {    
    console.log("data", consulta);
    console.log("URL servicio", referencias.guardaconsulta );
    
   
    axios.post(referencias.guardaconsulta, consulta)    
      .then(function (response) {
        console.log("response.data",response.data);
        
      })
      .catch(function (error) {
        console.log("Este es el error en envío",error);       
      })
      .finally(function () {
        console.log("TRansacción finalizada");        
      });

  }

  obtenerDatosForm = (e) => {
    const opcion = e.target.name;
    console.log("e.target.value",e.target.value);

    switch (opcion) {
      case "tipo_consulta":
        consulta.id = e.target.value;
        break;
      case "tipo_solicitud":
        consulta.solicitud = e.target.value;
        break;
      case "tipo_solicitante":
        consulta.solicitante = e.target.value;
        break;
      case "tipo_intervencion":
        consulta.intervencion = e.target.value;
        break;
      case "tema":
        consulta.tema = e.target.value;
        break;
      case "respuesta":
        consulta.respuesta = e.target.value;
        break;
      case "fecha_solicitud":
        consulta.fecha_solicitud = e.target.value;
        break;
      case "fecha_respuesta":
        consulta.fecha_respuesta = e.target.value;
          break;
      default:
       // console.log("Opción fuera de rango");
        break;
    }
  }

  obtenerDatosConsulta = (e) => {
    // console.log("consulta.id", e.target.value);
    this.state.consultas.map((item,i) =>  {
        if (item.id === e.target.value) {
          console.log("item", item);
          
          this.setState( {registroactual: item }, ()=> {
            console.log("Registro actual", this.state.registroactual); 
          }  );
    }
  });


  
  }

    render() { 
      return (
        <React.Fragment>
        <h1 className="header-1">Respuestas</h1>
        
          <div className="form-group">
            <label htmlFor="consultas">Seleccione la consulta:</label>
            <select className="form-control"  name="consultas" onChange={this.obtenerDatosConsulta}>              
            <option  selected disabled value="0">Seleccione la opción</option>
              { 
                  
                  this.state.consultas.map((item) => (
                  <option key={item.id} value={item.id}>{item.id} - {item.tema}   </option>
                ))
              }
            </select>
            <p>Tipo de intervención: {this.state.registroactual.tipo_intervencion}</p>
            <p>Tipo de solicitud: {this.state.registroactual.tipo_solicitud}</p>
            <p>Tipo de solicitante: {this.state.registroactual.tipo_solicitante}</p>
            <p>Tema: {this.state.registroactual.tema}</p>
            <p>Tipo de solicitante: {this.state.registroactual.fecha_solicitud}</p>

          </div>
          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label htmlFor="respuesta">Tipo de respuesta:</label>
            <select defaultValue={'DEFAULT'}  className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
            {
               this.state.tipo_respuesta.map((item) => (
               <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>
          <div className="form-group">
            <label htmlFor="fecha_respuesta">Fecha de respuesta:</label>
            <input type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" onChange={this.obtenerDatosForm} />
          </div>

          <div className="row">
            <div className="col-md-4 center">
              <button className="btn btn-main" onClick={this.enviarDatosForm} > Guardar registro </button>
              
            </div>
          </div>          
      </React.Fragment>
        );
    }
}
 
export default Respuestas;