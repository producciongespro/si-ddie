import React, { Component } from 'react';
import axios from 'axios';
import referenciasJson from '../data/referencias.json';


const referencias = referenciasJson[0];


class Consultas extends Component {
  constructor(props) {
    super(props);
    this.state = {				
				arrayTipoSolicitud :  "",
				arrayTipoSolicitante : "",
        arrayTipoIntervencion: "",
        arrayTipoRespuesta: ""				
     }
  }
  
  consulta = {
    "id_usuario": "1",
    "id_solicitud" :  "",
    "id_solicitante" : "",
    "id_intervencion": 0,
    "id_respuesta": "",
    "tema": "",    
    "fecha_solicitud": "",
    "fecha_respuesta": ""    
  }
 
  componentDidMount() {    
    //Obtener datos  
    this.obtenerJson("tipo_solicitud");
    this.obtenerJson("tipo_solicitante");
    this.obtenerJson("tipo_intervencion");
    this.obtenerJson("tipo_respuesta");
  }


  obtenerJson = (tabla) => {
    //console.log("tabla nombre", tabla);
    
   let url= referencias.consultageneral+"?tabla=" + tabla;
   // console.log("URL",url);
    axios.get(url)
      .then(res => {     
      //ESTE CÓDIGO DEBERIA FUNCIONAR, pero como creí que esto podía ser el error lo cambié por un switch
      // no debería el switch, porque es más largo el código
      //  this['tabla'] = res.data;       
      //   console.log("res.data", res.data);
      //   console.log("tabla", this['tabla']);
      // console.log("tipo_solicitud", tipo_solicitud);


      
      const arreglo  = res.data;      
      //console.log("arreglo", arreglo);
        
      switch (tabla) {
		case 'tipo_solicitud':
			this.setState ({ arrayTipoSolicitud : arreglo   })                  
        break;
        case 'tipo_intervencion':
			this.setState ({ arrayTipoIntervencion:  arreglo   })            
        break;
        case 'tipo_solicitante':
			this.setState ({ arrayTipoSolicitante  : arreglo   })                                   
        break;
        case 'tipo_respuesta':
			      this.setState ({ arrayTipoRespuesta : arreglo   })                                                          
        break;
        default:
			console.log ("Opcion fuera de rango")
        break;
      }
	  
	  
      })

      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
        console.log("Fin de consulta en ", tabla );            
      });
  }
  
  
  

  enviarDatosForm = () => {    
    console.log("data", this.consulta);
    console.log("URL servicio", referencias.guardaconsulta );
    
   /*
    axios.post(referencias.guardaconsulta, consulta)    
      .then(function (response) {
        //console.log("response.data",response.data);
      })
      .catch(function (error) {
        console.log("Este es el error en envío",error);       
      })
      .finally(function () {
        console.log("TRansacción finalizada");        
      });
*/
  }


  /*
  obtenerDatosForm = (e) => {
    const opcion = e.target.name;
	const valor = e.target.value
    //console.log("e.target.value",e.target.value);

    switch (opcion) {
      case "tipo_solicitud":
          
        break;
      case "tipo_solicitante":
		this.setState ({tipo_solicitante : valor})		        
        break;
      case "tipo_intervencion":
		this.setState ({tipo_intervencion : valor})		                
        break;
      case "tema":
		this.setState ({tema : valor})		                        
        break;
      case "respuesta":
		this.setState ({consulta.tipo_respuesta : valor})		                                
        break;
      case "fecha_solicitud":
		this.setState ({consulta.fecha_solicitud : valor})        
        break;
      case "fecha_respuesta":
		this.setState ({consulta.fecha_respuesta : valor})                
        break;
      default:
       // console.log("Opción fuera de rango");
        break;
    }
  }

  */

    render() { 
      return (
        <React.Fragment>
      
      <h1>prueba</h1>
      {
        console.log( "Tipo respuesta", this.state.arrayTipoRespuesta)
        
      }
                 
      </React.Fragment>
        );
    }
}
 
export default Consultas;