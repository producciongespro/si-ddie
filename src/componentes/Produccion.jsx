import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

 import axios from 'axios';

import mostrarAlerta from './Alerta.js';

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';

const referencias = referenciasJson[0];

var producto = {
  "id_producto": 0,
  "id_usuario" : 1,
  "cantidad"   : 0,
  "fecha"      : "0001-01-01",
  "cantidad_beneficiarios" : 0,
  "numero_consecutivo" : null,
  "tema_video_divulgacion"  : "",
  "poblacion_1" : 0,
  "poblacion_2" : 0,
  "poblacion_3" : 0,
  "poblacion_4" : 0,
  "poblacion_5" : 0,
  "poblacion_6" : 0,
  "poblacion_7" : 0
},
  poblacion = [],
  me;


class Produccion extends Component {
  constructor(props) {
    super(props);
         // If you want to use the reset state function, you need to have a reference to the ValidationForm component
        //If your React < 16.3, check https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    this.formRef = React.createRef();

    this.state = { 
      tipo_productos : [],
      productos_poblacion_meta : [],
      arreglo_poblacion : [],
      alertaActiva : false,
      loading: false, 
      classSuccess : false,
      verConsecutivo : false,
      verTemaVideo : false,
    
      immediate:true,   //estado de validación del form
      setFocusOnError:true,
      clearInputOnReset:false
    };
  }
  componentDidMount( ) {
    this.obtenerJson("tipo_productos");
    this.obtenerJson("productos_poblacion_meta");
  }


  obtenerJson = (tabla) => {
    me = this;
   let url= referencias.consultageneral+"?tabla=" + tabla;
   axios.get(url)
      .then(res => {     
        me.setState({ [tabla] : res.data  }); 
        const limite = res.data.length;
        console.log("LIMITE TABLA", limite);
        
      if (tabla === 'productos_poblacion_meta') {
        for (let index = 0; index < limite; index++) {
          let componente = "poblacion_"+(index+1);
          var obj = {[componente]:false }
          poblacion.push(obj);
          console.log("I contador", index);
        }
        this.setState({arreglo_poblacion: poblacion}, () => {
          console.log("STATE arreglo_poblacion", this.state.arreglo_poblacion)
        })
      }
            // console.log("POBLACION", poblacion);
      }
      )
      .catch(function (error) {
        console.log("error",error)
      })
      .finally(function () {
      });
  }

  //eventos del formulario
  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();
    this.enviarDatosForm();
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

  enviarDatosForm = () => {
      me = this;
      console.log("producto", producto);
      if(producto.numero_consecutivo === null){
         delete producto["numero_consecutivo"];
      }
      let url = referencias.guardaconsulta+"?tabla_destino=productos";
      console.log("referencia",url);
      
       this.setState({ loading: true }, () => {
        axios.post(referencias.guardaconsulta+"?tabla_destino=productos", producto)    
          .then(function (response) {
            // console.log("response.data",response.data);
             me.setState({loading: false});   
                 mostrarAlerta( "Alerta", response.data['mensaje']);
          })
          .catch(function (error) {
            console.log("Este es el error en envío",error);       
          })
          .finally(function () {
            console.log("Transacción finalizada");        
          });
        });

  }

  activarDatos = (e) => {
    //ojo limpiar el valor si no es 5, en caso de más de un registro
    console.log("Target obtener Poblacion", e.target.value);
    this.setState({ classSuccess: true });
    this.setState({ verConsecutivo: false });
    this.setState({ verTemaVideo: false });

    switch (e.target.value) {
      case '1':
        this.setState({ classSuccess: false });
      break;
      case '4':
        this.setState({ verConsecutivo: true });
      break;      
      case '7':
        this.setState({ verTemaVideo: true });
      break;      
      default:
        break;
    }
    this.obtenerDatosForm(e);    
  }

  obtenerDatosForm = (e) => {
    const opcion = e.target.name;
    // console.log("e.target.name",e.target.name);    
    console.log("e.target.checked",e.target.checked);

    switch (opcion) {
      case "id_producto":
        producto.id_producto = e.target.value;
        break;
      case "cantidad":
        producto.cantidad = e.target.value;  //ojo revisar, que guardo en id_tipo solicitante
      break;
      case "fecha":
        producto.fecha = e.target.value;
        break;
      case "cantidad_beneficiarios":
        producto.cantidad_beneficiarios = e.target.value;
        break;
      case "numero_consecutivo":
        producto.numero_consecutivo = e.target.value;
        break;
      case "tema_video_divulgacion":
        producto.tema_video_divulgacion = e.target.value;
        break;
      case "poblacion_1":
        producto.poblacion_1 = +e.target.checked;
        break;
      case "poblacion_2":
        producto.poblacion_2 = +e.target.checked;
      
        console.log("2", producto.poblacion_2);
        console.log("2", +producto.poblacion_2);
      break;
      case "poblacion_3":
        producto.poblacion_3 = +e.target.checked;
      break;
      case "poblacion_4":
        producto.poblacion_4 = +e.target.checked;
      break;
      case "poblacion_5":
        producto.poblacion_5 = +e.target.checked;
      break;
      case "poblacion_6":
        producto.poblacion_6 = +e.target.checked;
      break;
      case "poblacion_7":
        producto.poblacion_7 = +e.target.checked;
      break;
      default:
       // console.log("Opción fuera de rango");
        break;
    }
  }

 render() { 
    const  loading  = this.state.loading;
    const  classSuccess  = this.state.classSuccess;
    const verConsecutivo = this.state.verConsecutivo;
    const verTemaVideo = this.state.verTemaVideo;
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                        ref={this.formRef}
                        immediate={this.state.immediate}
                        setFocusOnError={this.state.setFocusOnError}
                        defaultErrorMessage = {
                          { required : "Este campo es requerido",
                          min : "El número debe ser mayor a 0",
                          max : "El número debe ser menor igual a 20"}
                        }
                        >
          <h1 className="header-1">Producción</h1>
          <hr/>
          <div className="row">
            <div className="form-group col-sm-6 ">
              <label className="font-len" htmlFor="tipo_producto">Seleccione el tipo de producto:</label>
              <SelectGroup  key="selectproducto" defaultValue={'DEFAULT'} className="form-control" name="id_producto" required onChange={this.activarDatos} >
                <option  disabled value="DEFAULT">Seleccione la opción</option>
                {
                    this.state.tipo_productos.map((item) => (
                    <option key={item.id} value={item.id}>{item.tipo}   </option>
                  ))
                }
              </SelectGroup>
            </div>
              <div className="col-sm-6  my-2 form-group">
                <div className={(verTemaVideo? "":" d-none")}>
                  <label className="font-len" htmlFor="tema_video_divulgacion">Tema del video:</label>
                  <TextInput key="video" type="text" className="form-control" id="tema_video_divulgacion" name="tema_video_divulgacion" onChange={this.obtenerDatosForm}/>
                </div>
              {/* </div> */}
            {/* </div> */}
              <div className={(verConsecutivo? "":" d-none")}>
                <label className="font-len" htmlFor="numero_consecutivo">Número consecutivo:</label>
                <TextInput key="consecutivo" type="number" className="form-control" id="numero_consecutivo" name="numero_consecutivo" onChange={this.obtenerDatosForm}/>
              </div>
            </div>
          </div>
            <div className="row">
              <div className={"col-sm-12 my-2" + (classSuccess? "":" d-none")}>
               <p className="font-len">Población meta: </p>
              {
                  this.state.productos_poblacion_meta.map((item) => (
                    <div className="pretty p-default p-curve">
                    <TextInput key={"poblacion"+ item.id} id={"poblacion_"+item.id}  name = {"poblacion_"+ item.id} type="checkbox" onChange={this.obtenerDatosForm}/>
                    {/* <TextInput key={"poblacion"+ item.id} id={item.id}  name = {"poblacion"+ item.id} type="checkbox"/>                     */}
                    <div className="state">
                        <label>{item.nombre}</label>
                    </div>
                  </div>
                ))
              } 
              </div>
            </div>               
         
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="cantidad">Cantidad:</label>
              <TextInput key="cantidad" type="number" className="form-control" id="cantidad" name="cantidad" min="1" max="20" required onChange={this.obtenerDatosForm}/>
            </div>

            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="fecha_solicitud">Fecha:</label>
              <TextInput key="fecha" type="date" className="form-control" id="fecha" name="fecha" onChange={this.obtenerDatosForm} required />
            </div>
          </div>
          <hr/>

          <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="cantidad_beneficiarios">Cantidad de beneficiarios:</label>
              <TextInput key="beneficiario" type="number" className="form-control" id="cantidad_beneficiarios" name="cantidad_beneficiarios" onChange={this.obtenerDatosForm} required />
            </div>
          <hr/>

          <div className="row">
            <div className="col-md-6 center">
              <button className="btn btn-block btn-main"> 
                Guardar registro {loading ? <LoadingSpinner key="loading" elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner  key="loading" elementClass={"d-none"} /> } 
              </button>
            </div>
          </div>       
        </ValidationForm>   
      </React.Fragment>
      );
  }
}

export default Produccion;