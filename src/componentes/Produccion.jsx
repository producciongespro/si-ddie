import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

 import axios from 'axios';

import mostrarAlerta from './Alerta.js';

import referenciasJson from '../data/referencias.json';

import LoadingSpinner from './spinner/LoadingSpinner';
import { objectExpression } from '@babel/types';

const referencias = referenciasJson[0];

var producto = {
  "id_producto": "",
  "id_usuario" : 1,
  "cantidad"   : 0,
  "fecha"      : "0001-01-01",
  "poblacion"   : "",
  "cantidad_beneficiarios" : 0,
  "tema_video_divulgacion"  : "",
  "numero_consecutivo" : 'NULL'
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
      7 : false,
    
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
          var obj = {"id":res.data[index].id, "checked": false }
          poblacion.push(obj);
          console.log("I contador", index);
        }
        this.setState({arreglo_poblacion: poblacion}, () => {
          console.log("STATE arreglo poblacion", this.state.arreglo_poblacion)
        })
      }
            console.log("POBLACION", poblacion);
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
    // console.log("formData",e, formData, inputs);
    // alert(JSON.stringify(formData, null, 2));
    this.enviarDatosForm();
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      // console.log("handleErrorSubmit",e,formData, errorInputs);
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

  enviarDatosForm = () => {
      me = this;
      // console.log("producto", producto);
      producto.poblacion = JSON.stringify(this.state.arreglo_poblacion);
       this.setState({ loading: true }, () => {
        axios.post(referencias.guardaconsulta+"?tabla_destino=productos", producto)    
          .then(function (response) {
            // console.log("response.data",response.data);
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
    // e.target.value !== '1'?this.setState({ classSuccess: true }):this.setState({ classSuccess: false });
    // e.target.value === '4'?this.setState({ verConsecutivo: true }):this.setState({ verConsecutivo: false });
    this.obtenerDatosForm(e);    
  }

  obtenerDatosForm = (e) => {
    const opcion = e.target.name;
    // console.log("e.target.name",e.target.name);    
    // console.log("e.target.value",e.target.value);

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
      default:
       // console.log("Opción fuera de rango");
        break;
    }
  }

  handleChangeCheck = (e) => {
    let isChecked = e.target.checked;
    console.log("valor del ",e.target.id," es: ",isChecked);
    var dobles  = this.state.arreglo_poblacion.map(function(obj,i) {
      var rObj = obj;
      if (obj.id === e.target.id) {
        
        rObj.id = obj.id;
        rObj.checked = isChecked;
        return rObj;
      // return item.checked = isChecked;
      }
      else {
        rObj.id = obj.id;
        rObj.checked = obj.checked;
        return rObj;
        // return item.checked;
      }
    });
    console.log("dobles", dobles);
        this.setState({arreglo_poblacion : dobles}, () => {
      console.log("STATE arreglo poblacion", this.state.arreglo_poblacion)
    })
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
          <div className="form-group">
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
            <div className="row">
              <div className={"col-sm-12 my-2 form-group" + (verTemaVideo? "":" d-none")}>
                <label className="font-len" htmlFor="tema_video_divulgacion">Tema del video:</label>
                <TextInput key="video" type="text" className="form-control" id="tema_video_divulgacion" name="tema_video_divulgacion" onChange={this.obtenerDatosForm}/>
              </div>
            </div>
            <div className="row">
              <div className={"col-sm-12 my-2 form-group" + (verConsecutivo? "":" d-none")}>
                <label className="font-len" htmlFor="numero_consecutivo">Número consecutivo:</label>
                <TextInput key="consecutivo" type="number" className="form-control" id="numero_consecutivo" name="numero_consecutivo" onChange={this.obtenerDatosForm}/>
              </div>
            </div>
            <div className="row">
              <div className={"col-sm-12 my-2" + (classSuccess? "":" d-none")}>
               <p className="font-len">Población meta: </p>
              {
                  this.state.productos_poblacion_meta.map((item) => (
                    <div className="pretty p-default p-curve">
                    <TextInput key={"poblacion"+ item.id} id={item.id}  name = {"poblacion"+ item.id} type="checkbox" onChange={this.handleChangeCheck}/>
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