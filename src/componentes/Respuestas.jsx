import React, { Component } from 'react';
import axios from 'axios';

import referenciasJson from '../data/referencias.json';

const referencias = referenciasJson[0];

var consulta = {  //guarda los registros del usuario actual
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
    datos = { };



//1 - Definicion de la clase
class Respuestas extends Component {

  //2 - Constructor
  constructor(props) {
    super(props);
    this.state = { 
      consultas : [],
      tipo_respuesta: [],
      registroactual : {}  //guarda información de registro a actualizar
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
    this.obtenerJson("consultas"); // obtiene listado de registros del usuario actual
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
    console.log("URL servicio", referencias.actualizaconsulta );
    
    axios.post(referencias.actualizaconsulta+"?tabla_destino=consultas", datos)  
    // axios.post(referencias.guardaconsulta, consulta)    
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
      case "respuesta":
        datos.respuesta = e.target.value;
        break;
      case "fecha_respuesta":
        datos.fecha_respuesta = e.target.value;
          break;
      default:
       // console.log("Opción fuera de rango");
        break;
    }
    console.log("datos", datos);
    
  }

  obtenerDatosConsulta = (e) => {
    // console.log("consulta.id", e.target.value);
    // eslint-disable-next-line array-callback-return
    this.state.consultas.map((item) =>  {
        if (item.id === e.target.value) {
          console.log("item", item);
          
          this.setState( {registroactual: item }, ()=> {
            datos.id = item.id;
            console.log("Registro actual", this.state.registroactual); 
            console.log("id del registro", datos.id);
            
          }  );
    }
  });

  }

    render() { 
      return (
        <React.Fragment>
        <h1 className="header-1">Respuestas</h1>
        
          <div className="form-group">
            <label className="font-len" htmlFor="consultas">Seleccione la consulta:</label>
            <select  defaultValue={'0'} className="form-control"  name="consultas" onChange={this.obtenerDatosConsulta}>              
              <option  disabled value="0">Seleccione la opción</option>
              { 
                  this.state.consultas.map((item) => (
                  <option key={item.id} value={item.id}>{item.tema}</option>
                ))
              }
            </select>
          </div>
            <div className="form-group module">
              <p><span className="font-len">Tipo de solicitud: </span>{this.state.registroactual.tipo_solicitud}</p>
              <p><span className="font-len">Tipo de solicitante: </span> {this.state.registroactual.tipo_solicitante}</p>
              <p><span className="font-len">Tema: </span>{this.state.registroactual.tema}</p>
              <p><span className="font-len">Fecha de solicitud: </span> {this.state.registroactual.fecha_solicitud}</p>
            </div>
          
          <h2 className="header-2">Atención a la consulta</h2>
          <hr />
          <label className="font-len" htmlFor="respuesta">Tipo de respuesta:</label>
            <select defaultValue={'DEFAULT'}  className="form-control" id="respuesta" name="respuesta" onChange={this.obtenerDatosForm} >
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
            <div className="col-md-4 center">
              <button className="btn btn-main" onClick={this.enviarDatosForm} > Guardar registro </button>
            </div>
          </div>          
      </React.Fragment>
        );
    }
}
 
export default Respuestas;