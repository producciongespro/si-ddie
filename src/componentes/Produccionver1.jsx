import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

import axios from 'axios';

import mostrarAlerta from './Alerta.js';

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';

const referencias = referenciasJson[0];

  var poblacion = [],
      idUser = sessionStorage.getItem("id_usuario"),
      me;



export default function Produccion() {
  // const [classRevista, setclassRevista]= useState(false),
        // [tipoProductos, setTipoProductos] = useState([]),
        // const [tipoProductos, setTipoProductos] = useState(()=>getInitialState("tipo_productos"));
      //   const [myState,setMyState] = useState(() => {
      //   const initialState = getInitialState("tipo_productos");
      //   return initialState;
      // });
              // [productosPoblacionMeta, setproductosPoblacionMeta] = useState([]),
              // [arregloPoblacion, setArregloPoblacion] = useState([]);
              // const [myState,setMyState] = useState([]);
              // getInitialState("tipo_productos");
      console.log("tipoProductos", myState);
       
  
      function obtenerJson(tabla) {
        let url= referencias.consultageneral+"?tabla=" + tabla;
         console.log("url", url);
         
         axios.get(url)
            .then(res => {  
              setMyState(res.data)
              console.log("res.data", res.data); 
              return (res.data);
            }
              
              me.setState({ [tabla] : res.data  }); 
              const limite = res.data.length;
              console.log("LIMITE TABLA", limite);
              
              if (tabla === 'productos_poblacion_meta') {
                for (let index = 0; index < limite; index++) {
                  let componente = "poblacion_"+(index+1);
                  var obj = {[componente]:false }
                  poblacion.push(obj);
                }
              }
            })
            .catch(function (error) {
              console.log("error",error)
            })
            .finally(function () {
            });   
            console.log("datos", datos);
               
            return (datos);
};  

  // handleSubmit = (e, producto) => {
  //     e.preventDefault();

  //     for (let index = 1; index < 9 ; index++) {
  //       const element = producto["poblacion_"+ index];
  //       producto["poblacion_"+ index] = +element;                                
  //     };
  //     me = this;
  //     me.excluyeCampos(producto);
  //     let url = referencias.guardaconsulta+"?tabla_destino=productos";
  //     console.log("referencia",url);
      
  //      this.setState({ loading: true }, () => {
  //       axios.post(referencias.guardaconsulta+"?tabla_destino=productos", producto)    
  //         .then(function (response) {
  //           // console.log("response.data",response.data);
  //            me.setState({loading: false});   
  //            mostrarAlerta( "Alerta", response.data['mensaje']);
  //            if(!response.data['error']){
  //             me.resetDatos();
  //             // me.resetForm(); 
  //            }
  //         })
  //         .catch(function (error) {
  //           console.log("Este es el error en envío",error);       
  //         })
  //         .finally(function () {
  //           console.log("Transacción finalizada");        
  //         });
  //       });

  // }

  // excluyeCampos = (obj) => {
  //   for (const prop in obj) {
  //     if(obj[prop]=== ''){
  //       delete obj[prop];
  //     }
  //   }
  // } 


  // activarDatos = (value) => {
  //   //ojo limpiar el valor si no es 5, en caso de más de un registro
  //   // console.log("Target obtener Poblacion", e.target.value);
  //   this.setState({ classSuccess: true });
  //   this.setState({ verConsecutivo: false });
  //   this.setState({ verTemaVideo: false });

  //   // switch (e.target.value) {
  //   switch (value) {
  //     case '1':
  //       this.setState({ classSuccess: false });
  //       this.setState({ classRevista: true });
  //     break;
  //     case '4':
  //       this.setState({ verConsecutivo: true });
  //     break;      
  //     case '7':
  //       this.setState({ verTemaVideo: true });
  //     break;      
  //     default:
  //       break;
  //   }
  //   // this.obtenerDatosForm(e);    
  // }

//   handleChange = (e, value) => {
    
    
//     if (e.target.name === 'id_producto')
//     {
//       // this.activarDatos(e)
//       this.activarDatos(value)
//     }
//     this.setState({
//         [e.target.name]: value
//     })
// }

//  render() { 
    // const loading  = this.state.loading;
    // const classSuccess  = this.state.classSuccess;
    // const verConsecutivo = this.state.verConsecutivo;
    // const verTemaVideo = this.state.verTemaVideo;
    // const classRevista = this.state.classRevista;
    return (
      <React.Fragment>
      <div className="row">
        <h1 className="header-1">Producción</h1>
        <br/>
        <p>Tipo productos     </p>
        <div> My state: {JSON.stringify(myState)} </div>
      </div>
      </React.Fragment>
    )
  // }
}
