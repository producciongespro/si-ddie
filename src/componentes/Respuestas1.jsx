import React, { Component } from 'react';
import Consultatable from './Consultatable'
import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];

var consulta = {
    "solicitud" :  "",
    "solicitante" : "",
    "id_intervencion": 0,
    "tema": "",
    "respuesta": "",
    "fecha_respuesta": "",
    "fecha_solicitud": "",
    "usuario": "1"
}


class Respuestas extends Component {
  constructor() {
    super();
    this.state = {
        consultas: []
        // tipo_solicitud : [],
        // tipo_solicitante : [],
        // tipo_intervencion : [],
        // tipo_respuesta: []
    };
  }


  componentDidMount() {
    //Obtener datos  
    this.obtenerJsonConsultas("consultas");
    // this.obtenerJson("tipo_solicitud");
    // this.obtenerJson("tipo_solicitante");
    // this.obtenerJson("tipo_intervencion");
    // this.obtenerJson("tipo_respuesta");
  }

  obtenerJsonConsultas = (tabla) => {
      let url= referencias.consultaespecifica+"?tabla=" + tabla+"&id_u="+consulta.usuario;
      console.log("URL",url);
      axios.get(url)
        .then(res => {     
          this.setState({ consultas : res.data  });           
        })
  
        .catch(function (error) {
          console.log("error",error)
        })
        .finally(function () {
        });
    }


    render() { 
      return (
        <React.Fragment>
        <h1 className="header-1">Respuestas</h1>
        
          <div className="form-group">
            <Consultatable estado={this.state.consultas}/>
          </div>
      </React.Fragment>
        );
    }
}
 
export default Respuestas;