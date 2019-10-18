import React, { Component } from 'react';

// import alertify from 'alertifyjs';
import axios from 'axios';

import mostrarAlerta from './Alerta.js'

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';


const referencias = referenciasJson[0];

var consulta = {
    "id_solicitud" :  "",
    "id_solicitante" : "",
    "id_intervencion": 0,
    "tema": "",
    "id_respuesta": "0",
    "fecha_respuesta": "0001-01-01",
    "fecha_solicitud": "",
    "id_usuario": "1",
}

var  me;


class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tipo_solicitud : ['Seleccione una opción'],
      tipo_solicitante : [],
      tipo_intervencion : [],
      tipo_respuesta: [],      
      alertaActiva : false,
      loading: false // will be true when ajax request is running

     }
  }

 

  componentDidMount() {
    //Obtener datos  
    this.obtenerJson("tipo_solicitud");
    this.obtenerJson("tipo_solicitante");
    this.obtenerJson("tipo_intervencion");
    this.obtenerJson("tipo_respuesta");
  }


  obtenerJson = (tabla) => {
   let url= referencias.consultageneral+"?tabla=" + tabla;
    // console.log("URL",url);
    axios.get(url)
      .then(res => {     
        this.setState({ [tabla] : res.data  }); 
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });
  }

  enviarDatosForm = () => {
      me = this;
       this.setState({ loading: true }, () => {

        axios.post(referencias.guardaconsulta+"?tabla_destino=consultas", consulta)    
          .then(function (response) {
            console.log("response.data",response.data);
             me.setState({loading: false});   
                 mostrarAlerta( "Alerta", response.data['mensaje']  );
          })
          .catch(function (error) {
            console.log("Este es el error en envío",error);       
          })
          .finally(function () {
            console.log("Transacción finalizada");        
          });
        });

  }

  obtenerDatosForm = (e) => {
    const opcion = e.target.name;
    // console.log("e.target.value",e.target.value);

    switch (opcion) {
      case "tipo_solicitud":
        consulta.id_solicitud = e.target.value;
        break;
      case "tipo_solicitante":
        consulta.id_solicitante = e.target.value;
        break;
      case "tipo_intervencion":
        consulta.id_intervencion = e.target.value;
        break;
      case "tema":
        consulta.tema = e.target.value;
        break;
      case "respuesta":
        consulta.id_respuesta = e.target.value;
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

    render() { 
      const  loading  = this.state.loading;
      return (
        <React.Fragment>

          <h1 className="header-1">Consultas</h1>        
          <div className="form-group">
            <label className="font-len" htmlFor="tipo_intervencion">Tipo de intervención:</label>
            {/* <select className="form-control" name="tipo_intervencion" onChange={this.obtenerDatosForm} >               */}
            <select defaultValue={'DEFAULT'} className="form-control" name="tipo_intervencion" onChange={this.obtenerDatosForm} >               */}
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
                this.state.tipo_intervencion.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>
            <label className="font-len" htmlFor="tipo_solicitante">Tipo de solicitante:</label>
            <select defaultValue={'DEFAULT'} className="form-control"   name="tipo_solicitante" onChange={this.obtenerDatosForm} >
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
                  this.state.tipo_solicitante.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>

            <label className="font-len" htmlFor="tipo_solicitud">Tipo de solicitud:</label>
            <select defaultValue={'DEFAULT'} className="form-control"  name="tipo_solicitud" onChange={this.obtenerDatosForm} >
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
                  this.state.tipo_solicitud.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>

          </div>
          <div className="form-group">
            <label className="font-len" htmlFor="tema">Tema:</label>
            <input type="text" className="form-control" id="tema" name="tema" onChange={this.obtenerDatosForm} />
          </div>
          <div className="form-group">
            <label className="font-len" htmlFor="fecha_solicitud">Fecha solicitud:</label>
            <input type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" onChange={this.obtenerDatosForm} />
          </div>
          <br />
          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label className="font-len" htmlFor="respuesta">Tipo de respuesta:</label>
            <select defaultValue={'DEFAULT'} className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
               this.state.tipo_respuesta.map((item) => (
               <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>
          <div className="form-group">
            <label className="font-len" htmlFor="fecha_respuesta">Fecha de respuesta:</label>
            <input type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" onChange={this.obtenerDatosForm} />
          </div>

          <div className="row">
            <div className="col-md-6 center">
              <button className="btn btn-block btn-main" onClick={this.enviarDatosForm} > 
              {/* {this.state.showWarning ? 'Hide' : 'Show'} */}
              Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } </button>
              
              
            </div>
          </div>          
          </React.Fragment>

        );
    }
}
 
export default Consultas;