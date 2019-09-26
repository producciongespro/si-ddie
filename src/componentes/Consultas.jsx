import React, { Component } from 'react';
import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];

// var solicitante = []; // array de solicitante de la BD
var solicitud, solicitante, intervencion, tema, respuesta, fecha_respuesta, fecha_solicitud, usuario = 1;

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
        console.log("DATAS",res.data); 
        console.log(  "Estado", tabla   );
        console.log( this.state.tipo_intervencion  );
        console.log( this.state.tipo_solicitud  );
        console.log( this.state.tipo_solicitante );        
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });
  }

  enviarDatosForm = () => {
    let data =
    {
      "usuario": usuario,
      "intervencion" : intervencion,
      "solicitante" : solicitante,
      "solicitud": solicitud,
      "fecha_solicitud": fecha_solicitud,
      "tema": tema,
      "respuesta": respuesta, 
      "fecha_respuesta": fecha_respuesta
    };

    console.log("data", data);

    const me = this;
    console.log("URL servicio", referencias.registroUsuario );
    
    axios.post(referencias.registroUsuario, data)    
      .then(function (response) {
        console.log("response.data",response.data);

        // alertify
        //   .alert( response.data.mensaje, function () {            
        //     me.cerrarModal();                       
        //   });
      })
      .catch(function (error) {
        console.log("Este es el error en envío",error);
        // alertify
        // .alert( "Error de conexión al intentar registrarse", function () {            
        //   me.cerrarModal();                       
        // });

      })
      .finally(function () {

      });

  }

  obtenerDatosForm = (e) => {
    const opcion = e.target.id;
    console.log("e.target.value",e.target.value);

    switch (opcion) {
      case "tipo_solicitud":
        solicitud = e.target.value;
        break;
      case "tipo_solicitante":
        solicitante = e.target.value;
        break;
      case "tipo_intervencion":
        intervencion = e.target.value;
        break;
      case "tema":
        tema = e.target.value;
        break;
      case "respuesta":
        respuesta = e.target.value;
        break;
      case "fecha_solicitud":
        fecha_solicitud = e.target.value;
        break;
      case "fecha_respuesta":
        fecha_respuesta = e.target.value;
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
            {
                this.state.tipo_intervencion.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>
            <label htmlFor="tipo_solicitante">Tipo de solicitante:</label>
            <select className="form-control"  id="tipo_solicitante" name="tipo_solicitante" onChange={this.obtenerDatosForm} >
            {
                  this.state.tipo_solicitante.map((item) => (
                <option key={item.id} value={item.id}>  {item.tipo}   </option>
              ))
            }
            </select>

            <label htmlFor="tipo_solicitud">Tipo de solicitud:</label>
            <select className="form-control" id="tipo_solicitud" name="tipo_solicitud" onChange={this.obtenerDatosForm} >
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
          <h2>Atención a la consulta</h2>
          <hr />
          <label htmlFor="respuesta">Tipo de respuesta:</label>
            <select className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
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
              <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button>
            </div>
          </div>
          {/* <button type="submit" id="btnEnviar" className="btn btn-primary">Enviar</button> */}
        </form>
      </React.Fragment>
        );
    }
}
 
export default Consultas;