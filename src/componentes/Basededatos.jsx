import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';
 //https://andyhu92.github.io/react-bootstrap4-form-validation/#/example/basic-usage
//  https://andyhu92.github.io/react-bootstrap4-form-validation/#/api/validation-form

 import axios from 'axios';

 import referenciasJson from '../data/referencias.json';

import mostrarAlerta from './Alerta.js';

import LoadingSpinner from './spinner/LoadingSpinner';

const referencias = referenciasJson[0];

var ingresos = {
                id_usuario      : 1,
                id_ingreso      : 0,
                descriptor      : 0,
                portada         : 0,
                texto_completo  : 0,
                enlace          : 0,
                fecha           :  "0001-01-01"
}

var  me;

class Basededatos extends Component {
  constructor(props) {
    super(props);
    

    this.formRef = React.createRef();

    this.state = { 
      
      tipo_ingreso : [],
      alertaActiva : false,
      loading: false, 
    
      immediate:true,   //estado de validación del form
      setFocusOnError:true,
      clearInputOnReset:false
    };
  }

//   static defaultErrorMessage = {
//     required: "This field is requiredddddddddddddddddddddd",
//     pattern: "Input value does not match the pattern",
//     type: "Input value does not match the type",
//     step: "Step mismatch",
//     minLength: "Please enter at least {minLength} characters",
//     min: "Number is too low",
//     max: "Number is too high",
//     fileType:"File type mismatch",
//     maxFileSize:"File size exceed limit",
//     validator: "Validator check failed"
// }

  componentDidMount( ) {
    this.obtenerJson("tipo_ingreso");
  }

  obtenerJson = (tabla) => {
    let url= referencias.consultageneral+"?tabla=" + tabla;
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



  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();
    console.log("formData",e, formData, inputs);
    // alert(JSON.stringify(formData, null, 2));
    this.enviarDatosForm();
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      // console.log("handleErrorSubmit", errorInputs.descriptor.props.type);
      console.log("handleErrorSubmit", errorInputs);
      

  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

  enviarDatosForm = () => {
      me = this;
      console.log("producto", ingresos);
      
       this.setState({ loading: true }, () => {
        axios.post(referencias.guardaconsulta+"?tabla_destino=ingresos", ingresos)    
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
    console.log("e.target.name",e.target.name);    
    console.log("e.target.value",e.target.value);

    switch (opcion) {
      case "id_ingreso":
        ingresos.id_ingreso = e.target.value;
        break;
      case "descriptor":
        ingresos.descriptor = e.target.value;  //ojo revisar, que guardo en id_tipo solicitante
      break;
      case "portada":
        ingresos.portada = e.target.value;  //ojo revisar, que guardo en id_tipo solicitante
      break;
      case "texto_completo":
        ingresos.texto_completo = e.target.value;  //ojo revisar, que guardo en id_tipo solicitante
      break;
      case "enlace":
        ingresos.enlace = e.target.value;  //ojo revisar, que guardo en id_tipo solicitante
      break;
      case "fecha":
        ingresos.fecha = e.target.value;
        break;
      default:
       // console.log("Opción fuera de rango");
        break;
    }
  }

  render() { 
    const  loading  = this.state.loading;
    // const  classSuccess  = this.state.classSuccess;
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}
          defaultErrorMessage = {
            { required : "Este campo es requerido y debe ser numérico",
              min : "El número debe ser mayor a 0",
              type: "El valor debe ser numérico",
            }
          }
        >
          <h1 className="header-1">Ingreso a la base de datos</h1>
          <hr/>
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="font-len" htmlFor="id_ingreso">Nuevo ingreso:</label>
              <SelectGroup  defaultValue={'DEFAULT'} className="form-control" name="id_ingreso" id="id_ingreso" required onChange={this.obtenerDatosForm}   errorMessage={{ required:"Este campo es requerido"}}>
                <option  disabled value="DEFAULT">Seleccione la opción</option>
                {
                    this.state.tipo_ingreso.map((item) => (
                    <option key={item.id} value={item.id}>{item.tipo} </option>
                  ))
                }
              </SelectGroup>
            </div>

            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="descriptor">Descriptor:</label>
              <TextInput type="number" className="form-control" id="descriptor" name="descriptor" min="1" required onChange={this.obtenerDatosForm} />
            </div>
          </div>
          <div className="row">  
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="portada">Portada:</label>
              <TextInput key ="portada" type="number" className="form-control" id="portada" name="portada" min="1" required onChange={this.obtenerDatosForm} />
            </div>
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="texto_completo">Texto completo:</label>
              <TextInput type="number" className="form-control" id="texto_completo" name="texto_completo" min="1" required onChange={this.obtenerDatosForm} />
            </div>
          </div>
          <div className="row">  
            <div className="form-group col-sm-6">
              <label  className="font-len"  htmlFor="enlace">Enlace:</label>
              <TextInput type="number" className="form-control" id="enlace" name="enlace" min="1" required onChange={this.obtenerDatosForm} />
            </div>
            <div className="form-group col-sm-6">
              <label  className="font-len" htmlFor="fecha">Fecha</label>
              <TextInput type="date" className="form-control" id="fecha" name="fecha" required onChange={this.obtenerDatosForm}  errorMessage={{ required:"Este campo es requerido"}}/>
            </div>
          </div>
          <hr/>
          <div className="row">
              <div className="col-md-6 center">
                <button className="btn btn-block btn-main"> 
                  Guardar registro {loading ? <LoadingSpinner elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner elementClass={"d-none"} /> } 
                </button>
              </div>
          </div>     
        </ValidationForm>   
      </React.Fragment>
    );
  }
}
 
export default Basededatos;