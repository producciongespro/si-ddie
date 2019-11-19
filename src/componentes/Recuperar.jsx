import React, { Component } from 'react';
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import LoadingSpinner from './spinner/LoadingSpinner';
import referenciasJson from '../data/referencias.json';

//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

const referencias = referenciasJson[0];


class Recuperar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
    }
  }

  handleSubmit = (e, formData, inputs) => {  
      e.preventDefault();
      console.log("FormaData del REGISTRO", formData);
      this.enviarDatosForm(formData);
  }

  handleErrorSubmit = (e,formData, errorInputs) => {
      console.log("handleErrorSubmit", errorInputs)
  }

  resetForm = () => {
      let formRef = this.formRef.current;
      formRef.resetValidationState(this.state.clearInputOnReset);
  }

  enviarDatosForm = (datos) => {  
    // datos= { correo: "ana.araya.salazar@mep.go.cr" };  
    console.log("data desde enviarDatosForm", datos);

    const me = this;
    console.log("URL servicio", referencias.recuperarContrasena);
    
    axios.post(referencias.recuperarContrasena, datos)    
      .then(function (response) {
        console.log("response.data",response.data);
        if (response.data.error) {
          
          alertify
          .alert( "Error", '<br><p>'+response.data.msj['0']+'</p>', function () {            
            // me.cerrarModal();                       
          });
        }
        else {
          alertify
          .alert( "Alerta", '<br><p>'+response.data.msj['0']+'</p>', function () {            
          });
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alertify
        .alert( referencias.version, "Error de conexión al intentar registrarse", function () {            
          // me.cerrarModal();                       
        });

      })
      .finally(function () {

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
              <div className="textos control-group form-group mt-2">
                  <div className="row">
                      <div className="col-md-12 ">
                          <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Digite el correo electrónico" id="correo" name="correo" required /> <br />
                      </div>
                  </div>
                  <br/>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <button className="btn btn-ingreso float-right"> 
                      Enviar {loading ? <LoadingSpinner key="loading" elementClass={"spinner-grow text-light spinner-grow-lg"} /> : <LoadingSpinner  key="loading" elementClass={"d-none"} /> } 
                      </button>
                  </div>
              </div> 
          </ValidationForm>
      </React.Fragment>
      );
  }
}

export default Recuperar;