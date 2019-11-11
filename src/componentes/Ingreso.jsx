import React, { Component } from 'react';
import {ValidationForm, TextInput, SelectGroup} from 'react-bootstrap4-form-validation';

import referenciasJson from '../data/referencias.json';


//Librerias
import alertify from 'alertifyjs';
import axios from 'axios';

var nombre, apellido1, apellido2, provincia = "NA", clave, confirmaClave, usuario, fechaNacimiento;
const referencias = referenciasJson[0];



class Ingreso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ajaxOcupado: false,
      // nombre: "",
      // contrasena: ""
    }
  }

  
  cerrarModal = () => {
    this.props.handlerCerrarModal();
  }

  datosLogin = () => {
    
  }
  
 
  render() {
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}
                  ref={this.formRef}
                  immediate={this.state.immediate}
                  setFocusOnError={this.state.setFocusOnError}
                  defaultErrorMessage = {
                    { required : "Este campo es requerido"}
                  }>
          {/* <h1 className="titmodal">INGRESAR</h1> <hr /> */}
          <br/><br/><br/>
          <div class="row btn-group justify-content-center">
            <button type="button" class="btn btn-lg btn-lila">Ingresar</button>
            <button type="button" class="btn btn-lg btn-lila">Inscribirse</button>
            <button type="button" class="btn btn-lg btn-lila">Recuperar contraseña</button>
          </div>

          <div className="textos control-group form-group mt-2">
            <div className="row">
              <div className="col-md-12 ">
                <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Usuario" onChange={this.obtenerDatosForm} id="txtUsuario" required /> <br />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Contraseña" onChange={this.obtenerDatosForm} id="txtContrasena" name="txtContrasena" required />
              </div>
            </div>
            <br/>
     

            <div className="row">
                <div className="col-md-12 center">
                  {/* <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button> */}
                  <button className="btn btn-ingreso float-right"  > Enviar </button>
                </div>
            </div>
          </div>
        </ValidationForm>

      </React.Fragment>
    );
  }
}

export default Ingreso;