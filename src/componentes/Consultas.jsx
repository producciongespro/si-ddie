import React, { Component } from 'react';
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


class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tipo_solicitud : [],
      tipo_solicitante : [],
      tipo_intervencion : [],
      tipo_respuesta: []
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
    console.log("URL",url);
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

    render() { 
      return (
        <React.Fragment>
        <h1 className="header-1">Consultas</h1>
        
          <div className="form-group">
            <label htmlFor="tipo_intervencion">Tipo de intervención:</label>
            <select defaultValue={'DEFAULT'} className="form-control"  name="tipo_intervencion" onChange={this.obtenerDatosForm} >              
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
                this.state.tipo_intervencion.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>
            <label htmlFor="tipo_solicitante">Tipo de solicitante:</label>
            <select defaultValue={'DEFAULT'} className="form-control"   name="tipo_solicitante" onChange={this.obtenerDatosForm} >
            <option  disabled value="DEFAULT">Seleccione la opción</option>
            {
                  this.state.tipo_solicitante.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>

            <label htmlFor="tipo_solicitud">Tipo de solicitud:</label>
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
            <label htmlFor="tema">Tema:</label>
            <input type="text" className="form-control" id="tema" name="tema" onChange={this.obtenerDatosForm} />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_solicitud">Fecha solicitud:</label>
            <input type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" onChange={this.obtenerDatosForm} />
          </div>
          <br />
          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label htmlFor="respuesta">Tipo de respuesta:</label>
            <select defaultValue={'DEFAULT'} className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
            <option  disabled value="DEFAULT">Seleccione la opción</option>
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
 
export default Consultas;