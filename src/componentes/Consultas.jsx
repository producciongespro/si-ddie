import React, { Component } from 'react';
import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];

// var solicitante = []; // array de solicitante de la BD
var solicitud, solicitante, intervencion, tema, respuesta;

class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tipo_solicitud : [],
      tipo_solicitante : [],
      tipo_intervencion : []
     }
  }

  componentDidMount() {
    //Obtener datos  
    this.obtenerJson("tipo_solicitud");
    this.obtenerJson("tipo_solicitante");
    this.obtenerJson("tipo_intervencion");
 
  }


  obtenerJson = (tabla) => {
   let url= referencias.consultageneral+"?tabla=" + tabla;
    console.log("URL",url);
    axios.get(url)
      .then(res => {        
        this.setState({ tabla : res.data  });
        //console.log("DATAS",res.data); 
        console.log(  "Estado", tabla   );
        console.log( this.state.tipo_intervencion  );
        
        
        
        // solicitante = res.data;
        // console.log("solicitante", solicitante);
        
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
        //console.log("fin obtener paises");
      });
  }


  obtenerDatosForm = (e) => {
    const opcion = e.target.id;
    console.log(e.target.value);

    switch (opcion) {
      case "tipo_solicitud":
        solicitud = e.target.value;
        break;
      case "tipo_solicitante":
        solicitante = e.target.value;
        break;
      case "tipo_intervencia":
        intervencion = e.target.value;
        break;
      case "tema":
        tema = e.target.value;
        break;
      case "respuesta":
        respuesta = e.target.value;
        break;
      default:
        console.log("Opción fuera de rango");
        break;
    }
  }

    render() { 
      return (
        <React.Fragment>
        <h1>Consultas</h1>
        <form>
          <div className="form-group">
            <label htmlFor="tipo_intervencion">Tipo de intervención:</label>
            <select className="form-control" id="tipo_intervencion" name="tipo_intervencion" onChange={this.obtenerDatosForm} >
              <option></option>
              <option>Presencial</option>
              <option>Telefónica</option>
              <option>Correo</option>
            </select>
            <label htmlFor="tipo_solicitante">Tipo de solicitante:</label>
            <select className="form-control"  id="tipo_solicitante" name="tipo_solicitante" onChange={this.obtenerDatosForm} >
            {
            
            }
            </select>

            <label htmlFor="tipo_solicitud">Tipo de solicitud:</label>
            <select className="form-control" id="tipo_solicitud" name="tipo_solicitud" onChange={this.obtenerDatosForm} >
              <option></option>
              <option>Presencial</option>
              <option>Telefónica</option>
              <option>Correo</option>
            </select>

          </div>
          <div className="form-group">
            <label htmlFor="tema">Tema:</label>
            <input type="text" className="form-control" id="tema" name="tema" onChange={this.obtenerDatosForm} />
          </div>
          <div className="form-group">
            <label htmlFor="fecha_solicitud">Fecha solicitud:</label>
            <input type="date" className="form-control" id="fecha_solicitud" name="fecha_solicitud" />
          </div>
          <br />
          <h2>Atención a la consulta</h2>
          <hr />
          <label htmlFor="respuesta">Tipo de respuesta:</label>
            <select className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
              <option></option>
              <option>Presencial</option>
              <option>Telefónica</option>
              <option>Correo</option>
            </select>
          <div className="form-group">
            <label htmlFor="fecha_respuesta">Fecha de respuesta:</label>
            <input type="date" className="form-control" id="fecha_respuesta" name="fecha_respuesta" />
          </div>

          <button type="submit" id="btnEnviar" className="btn btn-primary">Enviar</button>
        </form>
      </React.Fragment>
        );
    }
}
 
export default Consultas;