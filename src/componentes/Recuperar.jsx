import React, { Component } from 'react';
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation';
import referenciasJson from '../data/referencias.json';
const referencias = referenciasJson[0];


var user, password;

const getUser = (e) => {
    user = e.target.value;
    //console.log(user);
}
const getPassword = (e) => {
    password = e.target.value;
    //console.log(password);
}

class Recuperar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // ajaxOcupado: false,
        // nombre: "",
        // contrasena: ""
      }
    //   user = "";
    //   password = "";
    }

    handleSubmit = (e, formData, inputs) => {
        // me = this;
        e.preventDefault();
        console.log("FormaData del logueo", formData.txtContrasena);
        console.log("Inputs del logueo", inputs);
        this.props.handlerLogin(formData.txtUsuario,formData.txtContrasena);
      }
    
      handleErrorSubmit = (e,formData, errorInputs) => {
          console.log("handleErrorSubmit", errorInputs)
      }
    
      resetForm = () => {
          let formRef = this.formRef.current;
          formRef.resetValidationState(this.state.clearInputOnReset);
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
                    <div className="textos control-group form-group mt-2">
                        <div className="row">
                            <div className="col-md-12 ">
                                <TextInput key="usuario" type="text" className="form-control input-ingreso" placeholder="Digite el correo electrónico" onChange={this.obtenerDatosForm} id="txtUsuario" name="txtUsuario" required /> <br />
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 center">
                            {/* <button className="btn btn-warning" onClick={this.enviarDatosForm} > Guardar registro </button> */}
                            <button className="btn btn-ingreso float-right"  > Enviar </button>
                        </div>
                     </div>
                </ValidationForm>
            </React.Fragment>
        );
    }
}

export default Recuperar;