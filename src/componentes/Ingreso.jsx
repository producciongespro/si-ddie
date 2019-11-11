import React, { Component } from 'react';

import Logueo from './Logueo';
import Recuperar from './Recuperar';
import  Registro from './Registro';
// import  Inscripcion from './Inscripcion';
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
        key: 'ingresar',
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
        
          <Tabs activeKey={this.state.key} onSelect={key => this.setState({ key })} transition={false} id="noanim-tab">
              <Tab className="" eventKey="ingresar" title="Ingresar">
                <Logueo />
              </Tab>
              <Tab className="" eventKey="inscribir" title="Inscribirse">
                <Registro />
              </Tab>
              <Tab className="" eventKey="recuperar" title="Recuperar contraseña">
                <Recuperar />
              </Tab>
          </Tabs>
      </React.Fragment>
    );
  }
}

export default Ingreso;