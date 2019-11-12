import React, { Component } from 'react';
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';
import mostrarAlerta from './Alerta.js';

// JSON
import referenciasJson from '../data/referencias.json';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

// var nombre, apellido1, apellido2, clave, confirmaClave, correo, tipoUsuario;
const referencias = referenciasJson[0];
var  me;
var registro = {};
class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ajaxOcupado: false,
      loading: false, 
    }
  }

  componentDidMount() {}
    
   handleSubmit = (e, formData, inputs) => {
    // me = this;
    registro = {
      "nombre": formData.nombre,
      "apellido1" : formData.apellido1,
      "apellido2"   : formData.apellido2,
      "tipoUsuario":  formData.tipoUsuario,
      "correo": formData.correo, 
      "clave": formData.clave, 
      "confirmaClave": formData.confirmaClave
    }
    e.preventDefault();
    console.log("FormaData del REGISTRO", formData);
    console.log("Inputs del logueo", inputs);
    // var myJSON = JSON.stringify(formData);
    // console.log("en JSON", myJSON);
    console.log("registro", registro);
    
    this.enviarDatosForm(registro);
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }


  enviarDatosForm = (datos) => {
    console.log("DATOS", datos);
    
    console.log("data desde enviarDatosForm", datos);

    const me = this;
    console.log("URL servicio", referencias.registroUsuario );
    
    axios.post(referencias.registroUsuario, datos)    
      .then(function (response) {
        console.log("response.data",response.data);

        alertify
          .alert( referencias.version, response.data.mensaje, function () {            
            me.cerrarModal();                       
          });
      })
      .catch(function (error) {
        console.log(error);
        alertify
        .alert( referencias.version, "Error de conexión al intentar registrarse", function () {            
          me.cerrarModal();                       
        });

      })
      .finally(function () {

      });
  }

  enviarDatosForm = (datos) => {
    me = this;
    console.log("data desde enviarDatosForm", datos);

    console.log(referencias.setRegistro);

      let url = referencias.registroUsuario;
    console.log("referencia",url);
    
     this.setState({ loading: true }, () => {
      axios.post(referencias.registroUsuario, datos)    
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

  render() {
    const  loading  = this.state.loading;
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                  ref={this.formRef}
                  immediate={this.state.immediate}
                  setFocusOnError={this.state.setFocusOnError}
                  defaultErrorMessage = {
                    { required : "Este campo es requerido"}
                  }>

          {/* <div className="textos control-group form-group"> */}
          <div className="textos control-group form-group mt-2">
            <div className="row">
              <div className="col-12">
                <TextInput key ="nombre" type="text" className="form-control input-ingreso" placeholder="Nombre" id="nombre" name="nombre"  required/>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key ="apellido1" type="text" className="form-control input-ingreso" placeholder="Primer Apellido" id="apellido1" name="apellido1" required  />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key ="apellido2" type="text" className="form-control input-ingreso" placeholder="Segundo Apellido" id="apellido2" name="apellido2" required/> <br />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput key="tipo" type="text" className="form-control input-ingreso" placeholder="Tipo de usuario" id="tipoUsuario" name="tipoUsuario" required /> <br />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <TextInput type="text" className="form-control input-ingreso" placeholder="Correo electrónico"id="correo"  name="correo" required />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-6">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Contraseña" id="clave" name="clave"  required/>
              </div>
              <div className="col-6">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Repita Contraseña"  id="confirmaClave" name="confirmaClave" required />
              </div>
            </div> <br />

            <div className="row">
              <div className="col-md-6 center">
                <button className="btn btn-ingreso float-right"> 
                  Enviar {loading ? <LoadingSpinner key="loading" elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner  key="loading" elementClass={"d-none"} /> } 
                </button>
             </div>
            </div> 
          </div>
        </ValidationForm>

      </React.Fragment>
    );
  }
}

export default Registro;