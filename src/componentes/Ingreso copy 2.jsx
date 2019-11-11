import React, { Component } from 'react';

import Logueo from './Logueo';
import Recuperar from './Recuperar';
import  Inscripcion from './Inscripcion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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
          {/* <br/><br/><br/>
          <div className="row btn-group justify-content-center">
            <button type="button" className="btn btn-lg btn-lila">Ingresar</button>
            <button type="button" className="btn btn-lg btn-lila">Inscribirse</button>
            <button type="button" className="btn btn-lg btn-lila">Recuperar contraseña</button>
          </div> */}
          <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
              <Tab className="" eventKey="ingresar" title="Ingresar">
                <Logueo />
              </Tab>
              <Tab className="" eventKey="inscribir" title="Inscribirse">
                <Inscripcion />
              </Tab>
              <Tab className="" eventKey="recuperar" title="Recuperar contraseña">
                <Recuperar />
              </Tab>
          </Tabs>
          {/* <div className="textos control-group form-group mt-2">
            <div className="row">
              <div className="col-md-12 ">
                <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Usuario" onChange={this.obtenerDatosForm} id="txtUsuario" name="txtUsuario" required /> <br />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <TextInput type="password" className="form-control input-ingreso" placeholder="Contraseña" onChange={this.obtenerDatosForm} id="txtContrasena" name="txtContrasena" required />
              </div>
            </div>
            <br/> */}
     

            <div className="row">
                <div className="col-md-12 center">
                  {/* <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button> */}
                  <button className="btn btn-ingreso float-right"  > Enviar </button>
                </div>
            </div>
          {/* </div> */}
        </ValidationForm>

      </React.Fragment>
    );
  }
}

export default Ingreso;